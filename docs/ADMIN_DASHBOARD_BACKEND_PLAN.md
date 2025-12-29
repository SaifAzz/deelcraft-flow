# Admin Dashboard Backend Plan

## Overview

This document provides a comprehensive backend plan for the **Admin Dashboard** in the Mind-Links platform. The Admin Dashboard is the central control panel for platform administrators to manage clients, contractors, documents, compliance, payroll oversight, and system configuration.

---

## Table of Contents

1. [Dashboard Features](#dashboard-features)
2. [Admin Roles & Permissions](#admin-roles--permissions)
3. [Microservices Architecture](#microservices-architecture)
4. [API Endpoints](#api-endpoints)
5. [DynamoDB Schemas](#dynamodb-schemas)
6. [Service Integration](#service-integration)
7. [Infrastructure](#infrastructure)
8. [Security & Authorization](#security--authorization)

---

## Dashboard Features

### Core Admin Features

| Feature | Description |
|---------|-------------|
| **Dashboard Overview** | Platform-wide analytics, KPIs, system alerts |
| **Client Management** | Review, approve, manage all client companies |
| **Document Review** | Approve/reject KYC documents, track pending reviews |
| **Contract Oversight** | View all contracts across the platform |
| **Payroll Monitoring** | Review and process payroll runs |
| **Compliance Management** | Monitor contractor compliance status |
| **Analytics & Reporting** | Revenue, growth metrics, document statistics |
| **Country Configuration** | Manage country-specific document requirements |
| **Audit Logs** | Track all admin actions and system events |
| **Admin User Management** | Manage admin accounts and roles |
| **System Alerts** | Monitor and resolve platform issues |

### Admin Dashboard Pages

```
┌─────────────────────────────────────────────────────────────────────┐
│                       ADMIN DASHBOARD                               │
├─────────────────────────────────────────────────────────────────────┤
│  Dashboard │ Clients │ Documents │ Contracts │ Payroll │ Compliance │
│  Analytics │ Countries │ Audit Logs │ Settings                      │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │  Revenue    │  │   Active    │  │  Pending    │  │   Growth    │ │
│  │  $125,000   │  │   Users     │  │   Docs: 12  │  │   +27.5%    │ │
│  │  +27% ↑     │  │    283      │  │   Urgent: 4 │  │   Revenue   │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                    PENDING DOCUMENTS                           │ │
│  │  Contractor    │ Type       │ Client     │ Days │ Actions      │ │
│  │  Layla Mostafa │ Passport   │ TechWave   │  13  │ [✓] [✗] [👁] │ │
│  │  Omar Khalil   │ Tax ID     │ DesignCo   │   5  │ [✓] [✗] [👁] │ │
│  │  Ahmed Hassan  │ Work Permit│ TechWave   │  10  │ [✓] [✗] [👁] │ │
│  └────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────┐  ┌───────────────────────────────┐   │
│  │      SYSTEM ALERTS        │  │        RECENT ACTIVITY        │   │
│  │  ⚠ High pending docs      │  │  • Document approved          │   │
│  │  ℹ Payroll deadline       │  │  • Country rule updated       │   │
│  │  ✓ Payment issue resolved │  │  • Payroll processed          │   │
│  └───────────────────────────┘  └───────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Admin Roles & Permissions

### Role Hierarchy

| Role | Description | Permissions |
|------|-------------|-------------|
| **Super Admin** | Full platform access | All operations |
| **Compliance Admin** | Document & KYC management | Documents, compliance, contractors |
| **Support Admin** | Client & contractor support | View access, limited modifications |
| **Finance Admin** | Payment & payroll oversight | Payroll, escrow, transactions |

### Permission Matrix

| Action | Super Admin | Compliance Admin | Support Admin | Finance Admin |
|--------|:-----------:|:----------------:|:-------------:|:-------------:|
| View Dashboard | ✓ | ✓ | ✓ | ✓ |
| Manage Clients | ✓ | ✗ | Read | ✗ |
| Review Documents | ✓ | ✓ | Read | ✗ |
| Approve/Reject Docs | ✓ | ✓ | ✗ | ✗ |
| View Contracts | ✓ | ✓ | ✓ | ✓ |
| Process Payroll | ✓ | ✗ | ✗ | ✓ |
| Manage Country Rules | ✓ | ✓ | ✗ | ✗ |
| View Audit Logs | ✓ | ✓ | ✓ | ✓ |
| Manage Admin Users | ✓ | ✗ | ✗ | ✗ |
| Manual Ledger Adjustments | ✓ | ✗ | ✗ | ✓ |

---

## Microservices Architecture

### Services Involved

The Admin Dashboard interacts with **9 microservices**:

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ADMIN DASHBOARD                              │
│                          (Frontend)                                 │
└─────────────────────┬───────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      API GATEWAY                                    │
│               (AWS API Gateway / ALB)                               │
│                 Admin-only routes                                   │
└─────────────────────┬───────────────────────────────────────────────┘
                      │
   ┌──────┬──────┬────┴────┬──────┬──────┬──────┬──────┬──────┐
   │      │      │         │      │      │      │      │      │
   ▼      ▼      ▼         ▼      ▼      ▼      ▼      ▼      ▼
┌─────┐┌─────┐┌─────┐ ┌─────┐┌─────┐┌─────┐┌─────┐┌─────┐┌─────┐
│Admin││Auth ││Client││Contr-││KYC  ││Contr-││Paymt││Notif││Audit│
│Svc  ││Svc  ││Svc   ││actor ││Svc  ││act   ││Svc  ││Svc  ││Svc  │
│:3002││:3001││:3003 ││:3004 ││:3005││:3006 ││:3008││:3010││:3011│
└─────┘└─────┘└─────┘ └─────┘└─────┘└─────┘└─────┘└─────┘└─────┘
```

### Service Responsibilities

| Service | Port | Admin Dashboard Responsibilities |
|---------|------|----------------------------------|
| **Admin Service** | 3002 | Admin users, settings, country rules, system alerts |
| **Auth Service** | 3001 | Admin authentication, JWT validation |
| **Client Service** | 3003 | Client company management, approvals |
| **Contractor Service** | 3004 | Contractor oversight, suspensions |
| **KYC Service** | 3005 | Document review, approval/rejection |
| **Contract Service** | 3006 | Contract monitoring, oversight |
| **Payment Service** | 3008 | Payroll processing, ledger adjustments |
| **Notification Service** | 3010 | System notifications, alerts |
| **Audit Service** | 3011 | Audit logging, activity tracking |

---

## API Endpoints

### 1. Admin Service (Port 3002)

#### Dashboard & Analytics

```yaml
# Get admin dashboard overview
GET /api/admin/dashboard
Headers:
  Authorization: Bearer <admin_jwt_token>
Response:
  {
    "stats": {
      "totalClients": 45,
      "activeClients": 42,
      "pendingClients": 3,
      "totalContractors": 230,
      "activeContracts": 125,
      "pendingDocuments": 12,
      "urgentDocuments": 4
    },
    "revenue": {
      "thisMonth": 125000,
      "lastMonth": 98000,
      "allTime": 1250000,
      "growth": 27.5
    },
    "recentActivity": [...],
    "systemAlerts": [...]
  }

# Get platform analytics
GET /api/admin/analytics
Query: period=30d, metrics=revenue,users,documents
Response:
  {
    "totalRevenue": {
      "thisMonth": 125000,
      "lastMonth": 98000,
      "allTime": 1250000
    },
    "activeUsers": {
      "clients": 45,
      "contractors": 230,
      "adminUsers": 8
    },
    "growthMetrics": {
      "revenueGrowth": 27.5,
      "clientGrowth": 15.2,
      "contractorGrowth": 22.1
    },
    "documentMetrics": {
      "pending": 12,
      "approved": 156,
      "rejected": 12,
      "avgReviewTime": 1.8
    },
    "payrollMetrics": {
      "runsThisMonth": 12,
      "totalProcessed": 125000,
      "avgProcessingTime": 24
    },
    "chartData": {
      "revenueByMonth": [...],
      "userGrowth": [...],
      "documentsByStatus": [...]
    }
  }

# Get system alerts
GET /api/admin/alerts
Query: status=unresolved, page=1
Response:
  {
    "data": [
      {
        "id": "uuid",
        "type": "warning",
        "title": "High Volume of Pending Documents",
        "message": "4 documents have been pending review for more than 3 days",
        "timestamp": "2024-11-30T08:00:00Z",
        "resolved": false
      }
    ]
  }

# Resolve system alert
PUT /api/admin/alerts/:alertId/resolve
Body:
  {
    "resolution": "Documents reviewed and processed"
  }
```

#### Admin User Management

```yaml
# Get all admin users
GET /api/admin/users
Query: role=all, status=active, page=1
Response:
  {
    "data": [
      {
        "id": "uuid",
        "name": "Sarah Admin",
        "email": "sarah@mindlinks.com",
        "role": "super_admin",
        "status": "active",
        "lastLogin": "2024-11-30T14:30:00Z",
        "actionsCount": 1247
      }
    ]
  }

# Create admin user
POST /api/admin/users
Body:
  {
    "name": "New Admin",
    "email": "newadmin@mindlinks.com",
    "role": "compliance_admin",
    "temporaryPassword": "temp123!"
  }

# Update admin user
PUT /api/admin/users/:userId
Body:
  {
    "role": "support_admin",
    "status": "active"
  }

# Deactivate admin user
DELETE /api/admin/users/:userId
```

#### Country Configuration

```yaml
# Get all country rules
GET /api/admin/countries
Response:
  {
    "data": {
      "SY": {
        "countryCode": "SY",
        "countryName": "Syria",
        "requiredDocuments": ["Passport", "Tax ID", "Proof of Address"],
        "optionalDocuments": ["Bank Statement"],
        "currency": "SYP"
      },
      "EG": {
        "countryCode": "EG",
        "countryName": "Egypt",
        "requiredDocuments": ["National ID", "Tax Certificate", "Proof of Address"],
        "optionalDocuments": ["Passport", "Bank Statement"],
        "currency": "EGP"
      }
    }
  }

# Get single country rule
GET /api/admin/countries/:countryCode

# Update country rule
PUT /api/admin/countries/:countryCode
Body:
  {
    "requiredDocuments": ["Passport", "Tax ID", "Proof of Address", "Bank Statement"],
    "optionalDocuments": []
  }

# Create new country rule
POST /api/admin/countries
Body:
  {
    "countryCode": "QA",
    "countryName": "Qatar",
    "requiredDocuments": ["Qatar ID", "Passport", "Proof of Address"],
    "optionalDocuments": ["Tax ID", "Bank Statement"],
    "currency": "QAR"
  }
```

### 2. Client Management (via Client Service)

```yaml
# Get all clients
GET /api/admin/clients
Query: status=all, verification=all, page=1, limit=20
Response:
  {
    "data": [
      {
        "id": "uuid",
        "companyName": "TechWave LLC",
        "country": "United States",
        "industry": "Technology / Software",
        "status": "active",
        "verificationStatus": "verified",
        "registrationDate": "2024-01-15",
        "activeContracts": 5,
        "totalContractors": 5,
        "monthlySpend": 25000,
        "pointOfContact": {
          "firstName": "John",
          "lastName": "Smith",
          "email": "john.smith@techwave.com"
        }
      }
    ],
    "meta": {
      "total": 45,
      "page": 1,
      "limit": 20
    }
  }

# Get client details
GET /api/admin/clients/:clientId
Response:
  {
    "id": "uuid",
    "companyName": "TechWave LLC",
    "country": "United States",
    "industry": "Technology / Software",
    "productsServices": "We build enterprise SaaS solutions...",
    "workType": "We're expanding our development team...",
    "status": "active",
    "verificationStatus": "verified",
    "entityInfo": {
      "countryOfIncorporation": "United States",
      "entityName": "TechWave LLC",
      "entityType": "Limited Liability Company (LLC)",
      "taxId": "US-TAX-123456789",
      "licenseNumber": "LLC-2024-001234",
      "registeredAddress": {...},
      "operatingAddress": {...}
    },
    "contractors": [...],
    "contracts": [...],
    "documents": [...],
    "payrollRuns": [...]
  }

# Approve client registration
POST /api/admin/clients/:clientId/approve
Body:
  {
    "notes": "All documents verified"
  }

# Reject client registration
POST /api/admin/clients/:clientId/reject
Body:
  {
    "reason": "Missing business license"
  }

# Suspend client
POST /api/admin/clients/:clientId/suspend
Body:
  {
    "reason": "Payment issues"
  }
```

### 3. Document Management (via KYC Service)

```yaml
# Get all pending documents
GET /api/admin/documents/pending
Query: priority=all, daysOld=3, page=1
Response:
  {
    "data": [
      {
        "id": "uuid",
        "contractorId": "uuid",
        "contractorName": "Layla Mostafa",
        "contractorEmail": "layla@example.com",
        "clientId": "uuid",
        "clientName": "TechWave LLC",
        "documentType": "Passport",
        "uploadedDate": "2024-11-17",
        "priority": "high",
        "fileUrl": "https://s3.../document.pdf",
        "status": "pending",
        "daysOld": 13
      }
    ],
    "meta": {
      "total": 12,
      "urgent": 4
    }
  }

# Get document details
GET /api/admin/documents/:documentId
Response:
  {
    "id": "uuid",
    "contractorId": "uuid",
    "contractorName": "Layla Mostafa",
    "clientId": "uuid",
    "clientName": "TechWave LLC",
    "documentType": "Passport",
    "uploadedDate": "2024-11-17",
    "fileUrl": "https://s3.../document.pdf",
    "status": "pending",
    "metadata": {
      "documentNumber": "AB123456",
      "expiryDate": "2029-01-20",
      "issuingCountry": "UAE"
    }
  }

# Approve document
POST /api/admin/documents/:documentId/approve
Body:
  {
    "notes": "Document verified and valid"
  }
Response:
  {
    "success": true,
    "auditLogId": "uuid"
  }

# Reject document
POST /api/admin/documents/:documentId/reject
Body:
  {
    "reason": "Document is not recent enough, please upload current statement"
  }
Response:
  {
    "success": true,
    "auditLogId": "uuid"
  }

# Request additional document
POST /api/admin/documents/request
Body:
  {
    "contractorId": "uuid",
    "documentType": "proof_of_address",
    "message": "Please upload a recent utility bill"
  }
```

### 4. Contract Oversight (via Contract Service)

```yaml
# Get all contracts
GET /api/admin/contracts
Query: status=all, clientId=uuid, page=1
Response:
  {
    "data": [
      {
        "id": "C-001",
        "contractorId": "uuid",
        "contractorName": "Ahmed Hassan",
        "clientId": "uuid",
        "clientName": "TechWave LLC",
        "type": "fixed",
        "amount": 5000,
        "currency": "USD",
        "status": "active",
        "startDate": "2024-10-01",
        "endDate": "2024-12-31",
        "progress": 60
      }
    ]
  }

# Get contract details
GET /api/admin/contracts/:contractId

# Terminate contract (admin override)
POST /api/admin/contracts/:contractId/terminate
Body:
  {
    "reason": "Compliance violation",
    "effectiveDate": "2024-12-01"
  }
```

### 5. Payroll Oversight (via Payment Service)

```yaml
# Get all payroll runs
GET /api/admin/payroll
Query: status=all, clientId=uuid, page=1
Response:
  {
    "data": [
      {
        "id": "PR-001",
        "clientId": "uuid",
        "clientName": "TechWave LLC",
        "period": "November 2024",
        "contractors": 5,
        "totalAmount": 12500,
        "status": "draft",
        "createdAt": "2024-11-28"
      }
    ]
  }

# Get payroll details
GET /api/admin/payroll/:payrollId

# Review payroll
POST /api/admin/payroll/:payrollId/review
Body:
  {
    "approved": true,
    "notes": "Verified all amounts"
  }

# Process payroll (admin trigger)
POST /api/admin/payroll/:payrollId/process

# Get contractor balances
GET /api/admin/balances
Query: clientId=uuid, page=1
Response:
  {
    "data": [
      {
        "contractorId": "uuid",
        "contractorName": "Ahmed Hassan",
        "contractorEmail": "ahmed@example.com",
        "currentBalance": 6000,
        "totalEarned": 20000,
        "totalWithdrawn": 14000,
        "currency": "USD",
        "lastTransaction": "2024-11-30",
        "clientName": "TechWave LLC"
      }
    ]
  }

# Manual ledger adjustment
POST /api/admin/ledger/adjust
Body:
  {
    "contractorId": "uuid",
    "amount": 500,
    "type": "credit",
    "reason": "Bonus for exceptional performance",
    "notes": "Approved by manager"
  }
Response:
  {
    "success": true,
    "adjustment": {
      "id": "uuid",
      "balanceBefore": 5500,
      "balanceAfter": 6000,
      "auditLogId": "uuid"
    }
  }
```

### 6. Compliance Overview (via KYC Service)

```yaml
# Get compliance overview
GET /api/admin/compliance/overview
Response:
  {
    "totalContractors": 230,
    "byStatus": {
      "approved": 180,
      "pending": 25,
      "incomplete": 15,
      "expiring": 10
    },
    "requiresAttention": 15,
    "byCountry": {
      "UAE": { "total": 45, "compliant": 40 },
      "Egypt": { "total": 35, "compliant": 30 },
      "Syria": { "total": 25, "compliant": 22 }
    }
  }

# Get contractors requiring attention
GET /api/admin/compliance/attention
Query: type=expiring,incomplete, page=1
Response:
  {
    "data": [
      {
        "contractorId": "uuid",
        "contractorName": "Mohammed Ali",
        "kycStatus": "expiring",
        "expiringDocuments": [
          {
            "type": "Passport",
            "expiryDate": "2024-12-15"
          }
        ],
        "clientName": "TechWave LLC"
      }
    ]
  }

# Suspend contractor
POST /api/admin/contractors/:contractorId/suspend
Body:
  {
    "reason": "Failed compliance check"
  }

# Reactivate contractor
POST /api/admin/contractors/:contractorId/reactivate
```

### 7. Audit Service (Port 3011)

```yaml
# Get audit logs
GET /api/admin/audit
Query: action=all, adminId=uuid, entityType=all, startDate=2024-01-01, page=1
Response:
  {
    "data": [
      {
        "id": "uuid",
        "timestamp": "2024-11-30T14:30:00Z",
        "adminId": "uuid",
        "adminName": "Sarah Admin",
        "action": "document_approved",
        "entityType": "document",
        "entityId": "uuid",
        "details": {
          "contractorName": "Ahmed Hassan",
          "documentType": "Passport",
          "clientName": "TechWave LLC"
        },
        "ipAddress": "192.168.1.1"
      }
    ],
    "meta": {
      "total": 1500,
      "page": 1
    }
  }

# Get audit log details
GET /api/admin/audit/:logId

# Export audit logs
GET /api/admin/audit/export
Query: format=csv, startDate=2024-01-01, endDate=2024-12-31
Response: CSV file download

# Log admin action (internal)
POST /api/admin/audit/log
Body:
  {
    "adminId": "uuid",
    "action": "document_approved",
    "entityType": "document",
    "entityId": "uuid",
    "details": {...}
  }
```

### 8. Notifications (via Notification Service)

```yaml
# Get admin notifications
GET /api/admin/notifications
Query: read=false, type=all, page=1
Response:
  {
    "data": [
      {
        "id": "uuid",
        "type": "client_registration",
        "title": "New Client Registration",
        "message": "TechWave LLC is waiting for review and approval.",
        "timestamp": "2024-11-30T10:00:00Z",
        "read": false,
        "entityId": "uuid",
        "entityName": "TechWave LLC",
        "actionUrl": "/clients"
      }
    ],
    "meta": {
      "total": 15,
      "unread": 8
    }
  }

# Mark notification as read
PUT /api/admin/notifications/:notificationId/read

# Get notification preferences
GET /api/admin/settings/notifications

# Update notification preferences
PUT /api/admin/settings/notifications
Body:
  {
    "emailAlerts": true,
    "slackIntegration": true,
    "alertTypes": ["client_registration", "urgent_documents", "payroll_ready"]
  }
```

---

## DynamoDB Schemas

### Entity Relationship Diagram

```mermaid
erDiagram
    ADMIN_USERS {
        string id PK "UUID"
        string email UK
        string name
        string passwordHash "bcrypt"
        string role "super_admin|compliance_admin|support_admin|finance_admin"
        string status "active|inactive|suspended"
        list permissions "Granular permissions"
        string lastLogin "ISO 8601"
        number actionsCount
        boolean mfaEnabled
        string mfaSecret "Encrypted"
        string createdAt "ISO 8601"
        string updatedAt "ISO 8601"
        string createdBy "Admin who created"
    }

    ADMIN_COUNTRY_RULES {
        string countryCode PK "ISO 3166-1 alpha-2"
        string countryName
        list requiredDocuments "Passport, Tax ID, etc"
        list optionalDocuments "Bank Statement, etc"
        string currency "ISO 4217"
        list taxRequirements
        string specialRequirements
        boolean isActive
        string updatedAt "ISO 8601"
        string updatedBy "Admin ID"
    }

    ADMIN_SYSTEM_ALERTS {
        string id PK "UUID"
        string type "error|warning|info"
        string title
        string message
        string timestamp "ISO 8601"
        boolean resolved
        string resolvedAt "ISO 8601"
        string resolvedBy "Admin ID"
        string resolution
        string relatedEntityType "document|payroll|client"
        string relatedEntityId
        number ttl "Auto-delete 90 days"
    }

    ADMIN_SETTINGS {
        string id PK "UUID"
        string settingKey UK
        string settingValue
        string category "notifications|security|platform"
        string dataType "string|number|boolean|json"
        string description
        string updatedAt "ISO 8601"
        string updatedBy "Admin ID"
    }

    AUDIT_LOGS {
        string id PK "UUID"
        string timestamp SK "ISO 8601"
        string adminId FK "admin-users.id"
        string adminName
        string adminEmail
        string action "document_approved|client_suspended|etc"
        string entityType "document|client|contractor|payroll"
        string entityId
        string entityName
        map details "Action-specific details"
        string ipAddress
        string userAgent
        string sessionId
        string createdAt "ISO 8601"
    }

    AUDIT_EVENTS {
        string id PK "UUID"
        string timestamp SK "ISO 8601"
        string eventType "system_error|security_alert|etc"
        string source "Service name"
        string severity "low|medium|high|critical"
        string message
        map details
        string stackTrace "For errors"
        boolean resolved
        number ttl "Auto-delete 365 days"
    }

    QLDB_LEDGER_ENTRIES {
        string id PK "UUID"
        string transactionType "ledger_adjustment|payment_approval|refund"
        string adminId FK "admin-users.id"
        string contractorId FK "contractor-profiles.id"
        number amount
        string currency
        number balanceBefore
        number balanceAfter
        string reason
        map metadata "Immutable record"
        string timestamp "ISO 8601"
    }

    ADMIN_USERS ||--o{ AUDIT_LOGS : "creates"
    ADMIN_USERS ||--o{ QLDB_LEDGER_ENTRIES : "authorizes"
    ADMIN_USERS ||--o{ ADMIN_SYSTEM_ALERTS : "resolves"
```

---

### Tables for Admin Dashboard

| Table | Service | Purpose |
|-------|---------|---------|
| admin-users | Admin | Admin user accounts |
| admin-country-rules | Admin | Country-specific requirements |
| admin-system-alerts | Admin | System alerts and notifications |
| admin-settings | Admin | Platform configuration |
| audit-logs | Audit | All admin actions |
| audit-events | Audit | System events |

### New Tables for Admin Dashboard

#### Table: `admin-users`

```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  email: string,                 // Unique
  name: string,
  passwordHash: string,          // bcrypt hash
  role: 'super_admin' | 'compliance_admin' | 'support_admin' | 'finance_admin',
  status: 'active' | 'inactive' | 'suspended',
  permissions: string[],         // Granular permissions
  lastLogin: string,             // ISO 8601
  actionsCount: number,
  mfaEnabled: boolean,
  mfaSecret: string,             // Encrypted
  createdAt: string,
  updatedAt: string,
  createdBy: string              // Admin who created this user
}
```

**Indexes:**
- **GSI: email-index** - Lookup by email
- **GSI: role-index** - Filter by role
- **GSI: status-index** - Filter by status

---

#### Table: `admin-country-rules`

```typescript
{
  // Partition Key
  countryCode: string,           // ISO 3166-1 alpha-2 (e.g., "SY", "EG")
  
  // Attributes
  countryName: string,
  requiredDocuments: string[],   // ["Passport", "Tax ID", "Proof of Address"]
  optionalDocuments: string[],   // ["Bank Statement"]
  currency: string,              // ISO 4217 (e.g., "USD", "EGP")
  taxRequirements: string[],
  specialRequirements: string,   // Notes
  isActive: boolean,
  createdAt: string,
  updatedAt: string,
  updatedBy: string              // Admin ID
}
```

---

#### Table: `admin-system-alerts`

```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  type: 'error' | 'warning' | 'info',
  title: string,
  message: string,
  timestamp: string,             // ISO 8601
  resolved: boolean,
  resolvedAt: string,
  resolvedBy: string,            // Admin ID
  resolution: string,
  relatedEntityType: string,     // 'document', 'payroll', 'client'
  relatedEntityId: string,
  ttl: number                    // Auto-delete after 90 days
}
```

**Indexes:**
- **GSI: resolved-index** - Filter by resolved status
- **GSI: type-index** - Filter by alert type

---

#### Table: `audit-logs`

```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Sort Key
  timestamp: string,             // ISO 8601
  
  // Attributes
  adminId: string,
  adminName: string,
  adminEmail: string,
  action: string,                // 'document_approved', 'client_suspended', etc.
  entityType: string,            // 'document', 'client', 'contractor', etc.
  entityId: string,
  entityName: string,
  details: Map,                  // Action-specific details
  ipAddress: string,
  userAgent: string,
  sessionId: string,
  createdAt: string
}
```

**Indexes:**
- **GSI: adminId-timestamp-index** - Get actions by admin
- **GSI: action-timestamp-index** - Filter by action type
- **GSI: entityType-entityId-index** - Get history for entity

---

#### Table: `audit-events`

```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Sort Key
  timestamp: string,             // ISO 8601
  
  // Attributes
  eventType: string,             // 'system_error', 'security_alert', etc.
  source: string,                // Service name
  severity: 'low' | 'medium' | 'high' | 'critical',
  message: string,
  details: Map,
  stackTrace: string,            // For errors
  resolved: boolean,
  ttl: number                    // Auto-delete after 365 days
}
```

**Indexes:**
- **GSI: eventType-timestamp-index** - Filter by event type
- **GSI: severity-timestamp-index** - Filter by severity

---

## Service Integration

### Service Communication Flow

```
1. Dashboard Load Flow:
   Admin Frontend → API Gateway (admin auth check)
   ├── → Admin Service (GET /dashboard) → Overview stats
   ├── → KYC Service (GET /documents/pending) → Pending docs
   ├── → Payment Service (GET /payroll) → Payroll runs
   ├── → Admin Service (GET /alerts) → System alerts
   └── → Audit Service (GET /audit?limit=10) → Recent activity

2. Document Approval Flow:
   Admin → KYC Service (POST /documents/:id/approve)
   → Update document status in DynamoDB
   → EventBridge Event (document.approved)
   → Audit Service (log action)
   → Notification Service (notify contractor)
   → Email via SendGrid
   → Response to admin

3. Client Approval Flow:
   Admin → Client Service (POST /clients/:id/approve)
   → Update client status
   → EventBridge Event (client.approved)
   → Audit Service (log action)
   → Notification Service (notify client)
   → Email welcome message
   → Response to admin

4. Manual Ledger Adjustment Flow:
   Admin → Payment Service (POST /ledger/adjust)
   → Validate admin permissions
   → Calculate new balance
   → Update contractor-wallet in DynamoDB
   → Write to QLDB (immutable record)
   → EventBridge Event (ledger.adjusted)
   → Audit Service (log with full details)
   → Response to admin
```

### EventBridge Events for Admin Dashboard

| Event | Source | Consumers | Admin Triggers |
|-------|--------|-----------|----------------|
| `document.approved` | KYC Service | Notification, Audit | ✓ |
| `document.rejected` | KYC Service | Notification, Audit | ✓ |
| `client.approved` | Client Service | Notification, Audit | ✓ |
| `client.rejected` | Client Service | Notification, Audit | ✓ |
| `client.suspended` | Client Service | Notification, Audit | ✓ |
| `contractor.suspended` | Contractor Service | Notification, Audit | ✓ |
| `payroll.reviewed` | Payment Service | Notification, Audit | ✓ |
| `payroll.processed` | Payment Service | Notification, Audit | ✓ |
| `ledger.adjusted` | Payment Service | QLDB, Audit | ✓ |
| `country.rule.updated` | Admin Service | Audit | ✓ |
| `admin.user.created` | Admin Service | Audit | ✓ |
| `system.alert.resolved` | Admin Service | Audit | ✓ |

---

## Infrastructure

### ECS Task Definition - Admin Service

```hcl
resource "aws_ecs_task_definition" "admin_service" {
  family                   = "mindlinks-admin-service-${var.environment}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"

  execution_role_arn = aws_iam_role.ecs_execution_role.arn
  task_role_arn      = aws_iam_role.admin_service_role.arn

  container_definitions = jsonencode([{
    name  = "admin-service"
    image = "${aws_ecr_repository.admin_service.repository_url}:latest"

    portMappings = [{
      containerPort = 3002
      protocol      = "tcp"
    }]

    environment = [
      { name = "AWS_REGION", value = var.aws_region },
      { name = "NODE_ENV", value = var.environment },
      { name = "SERVICE_NAME", value = "admin-service" },
      { name = "SERVICE_PORT", value = "3002" }
    ]

    secrets = [
      { name = "ADMIN_USERS_TABLE", valueFrom = aws_ssm_parameter.admin_users_table.arn },
      { name = "COUNTRY_RULES_TABLE", valueFrom = aws_ssm_parameter.country_rules_table.arn },
      { name = "SYSTEM_ALERTS_TABLE", valueFrom = aws_ssm_parameter.system_alerts_table.arn },
      { name = "REDIS_HOST", valueFrom = aws_ssm_parameter.redis_host.arn },
      { name = "JWT_SECRET", valueFrom = aws_secretsmanager_secret.jwt_secret.arn }
    ]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.admin_service.name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "ecs"
      }
    }
  }])
}
```

### ECS Task Definition - Audit Service

```hcl
resource "aws_ecs_task_definition" "audit_service" {
  family                   = "mindlinks-audit-service-${var.environment}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  execution_role_arn = aws_iam_role.ecs_execution_role.arn
  task_role_arn      = aws_iam_role.audit_service_role.arn

  container_definitions = jsonencode([{
    name  = "audit-service"
    image = "${aws_ecr_repository.audit_service.repository_url}:latest"

    portMappings = [{
      containerPort = 3011
      protocol      = "tcp"
    }]

    environment = [
      { name = "AWS_REGION", value = var.aws_region },
      { name = "NODE_ENV", value = var.environment },
      { name = "SERVICE_NAME", value = "audit-service" },
      { name = "SERVICE_PORT", value = "3011" }
    ]

    secrets = [
      { name = "AUDIT_LOGS_TABLE", valueFrom = aws_ssm_parameter.audit_logs_table.arn },
      { name = "AUDIT_EVENTS_TABLE", valueFrom = aws_ssm_parameter.audit_events_table.arn },
      { name = "QLDB_LEDGER_NAME", valueFrom = aws_ssm_parameter.qldb_ledger.arn }
    ]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.audit_service.name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "ecs"
      }
    }
  }])
}
```

### IAM Role for Admin Service

```hcl
resource "aws_iam_role" "admin_service_role" {
  name = "mindlinks-admin-service-role-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy" "admin_service_policy" {
  name = "admin-service-policy"
  role = aws_iam_role.admin_service_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = [
          aws_dynamodb_table.admin_users.arn,
          "${aws_dynamodb_table.admin_users.arn}/index/*",
          aws_dynamodb_table.country_rules.arn,
          aws_dynamodb_table.system_alerts.arn,
          "${aws_dynamodb_table.system_alerts.arn}/index/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "events:PutEvents"
        ]
        Resource = aws_cloudwatch_event_bus.mindlinks.arn
      }
    ]
  })
}
```

### IAM Role for Audit Service (with QLDB)

```hcl
resource "aws_iam_role_policy" "audit_service_qldb" {
  name = "audit-service-qldb-policy"
  role = aws_iam_role.audit_service_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "qldb:SendCommand",
          "qldb:PartiQL*"
        ]
        Resource = aws_qldb_ledger.mindlinks_audit.arn
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:Query"
        ]
        Resource = [
          aws_dynamodb_table.audit_logs.arn,
          "${aws_dynamodb_table.audit_logs.arn}/index/*",
          aws_dynamodb_table.audit_events.arn,
          "${aws_dynamodb_table.audit_events.arn}/index/*"
        ]
      }
    ]
  })
}
```

---

## Security & Authorization

### JWT Token Claims for Admin

```typescript
interface AdminJwtPayload {
  sub: string;           // Admin user ID
  email: string;
  role: 'super_admin' | 'compliance_admin' | 'support_admin' | 'finance_admin';
  permissions: string[]; // Granular permissions
  sessionId: string;
  mfaVerified: boolean;
  iat: number;
  exp: number;
}
```

### Role-Based Access Control (RBAC)

```typescript
// NestJS Guard for Admin Role
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // Must be an admin user
    if (!['super_admin', 'compliance_admin', 'support_admin', 'finance_admin'].includes(user.role)) {
      throw new ForbiddenException('Admin access required');
    }
    
    // Check specific permission if required
    const requiredPermission = this.reflector.get<string>('permission', context.getHandler());
    if (requiredPermission && !user.permissions.includes(requiredPermission)) {
      throw new ForbiddenException(`Permission required: ${requiredPermission}`);
    }
    
    return true;
  }
}

// Usage in controller
@Controller('admin')
@UseGuards(AuthGuard, AdminGuard)
export class AdminController {
  
  @Post('clients/:id/approve')
  @SetMetadata('permission', 'clients:approve')
  async approveClient(@Param('id') clientId: string) {
    // Only admins with 'clients:approve' permission
  }
  
  @Post('ledger/adjust')
  @SetMetadata('permission', 'ledger:adjust')
  async adjustLedger(@Body() dto: LedgerAdjustmentDto) {
    // Only super_admin and finance_admin
  }
}
```

### MFA Enforcement

```typescript
// MFA verification for sensitive operations
@Injectable()
export class MfaGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user.mfaVerified) {
      throw new ForbiddenException('MFA verification required for this operation');
    }
    
    return true;
  }
}

// Sensitive operations requiring MFA
@Post('ledger/adjust')
@UseGuards(MfaGuard)
async adjustLedger() {}

@Post('users')
@UseGuards(MfaGuard)
async createAdminUser() {}
```

### Audit Trail Requirements

Every admin action must be logged with:
- Admin user ID and name
- Action type
- Affected entity (type and ID)
- Full details of the change
- IP address
- User agent
- Session ID
- Timestamp

---

## API Summary

### Admin Service Endpoints (25 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/dashboard | Dashboard overview |
| GET | /api/admin/analytics | Platform analytics |
| GET | /api/admin/alerts | Get system alerts |
| PUT | /api/admin/alerts/:id/resolve | Resolve alert |
| GET | /api/admin/users | List admin users |
| POST | /api/admin/users | Create admin user |
| PUT | /api/admin/users/:id | Update admin user |
| DELETE | /api/admin/users/:id | Deactivate admin user |
| GET | /api/admin/countries | Get country rules |
| GET | /api/admin/countries/:code | Get single country |
| PUT | /api/admin/countries/:code | Update country rule |
| POST | /api/admin/countries | Create country rule |
| GET | /api/admin/settings/notifications | Get notification settings |
| PUT | /api/admin/settings/notifications | Update notification settings |

### Client Management Endpoints (6 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/clients | List all clients |
| GET | /api/admin/clients/:id | Get client details |
| POST | /api/admin/clients/:id/approve | Approve client |
| POST | /api/admin/clients/:id/reject | Reject client |
| POST | /api/admin/clients/:id/suspend | Suspend client |
| POST | /api/admin/clients/:id/reactivate | Reactivate client |

### Document Management Endpoints (5 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/documents/pending | Get pending documents |
| GET | /api/admin/documents/:id | Get document details |
| POST | /api/admin/documents/:id/approve | Approve document |
| POST | /api/admin/documents/:id/reject | Reject document |
| POST | /api/admin/documents/request | Request new document |

### Contract & Payroll Endpoints (8 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/contracts | List all contracts |
| GET | /api/admin/contracts/:id | Get contract details |
| POST | /api/admin/contracts/:id/terminate | Terminate contract |
| GET | /api/admin/payroll | List payroll runs |
| GET | /api/admin/payroll/:id | Get payroll details |
| POST | /api/admin/payroll/:id/review | Review payroll |
| POST | /api/admin/payroll/:id/process | Process payroll |
| POST | /api/admin/ledger/adjust | Manual adjustment |

### Compliance Endpoints (4 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/compliance/overview | Compliance overview |
| GET | /api/admin/compliance/attention | Contractors needing attention |
| POST | /api/admin/contractors/:id/suspend | Suspend contractor |
| POST | /api/admin/contractors/:id/reactivate | Reactivate contractor |

### Audit Endpoints (4 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/audit | Get audit logs |
| GET | /api/admin/audit/:id | Get audit log details |
| GET | /api/admin/audit/export | Export audit logs |
| POST | /api/admin/audit/log | Log admin action (internal) |

### Notification Endpoints (3 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/notifications | Get admin notifications |
| PUT | /api/admin/notifications/:id/read | Mark as read |
| GET | /api/admin/balances | Get contractor balances |

---

## Summary

The Admin Dashboard backend plan includes:

- **9 microservices** integration (Admin, Auth, Client, Contractor, KYC, Contract, Payment, Notification, Audit)
- **6 new DynamoDB tables** (admin-users, admin-country-rules, admin-system-alerts, admin-settings, audit-logs, audit-events)
- **55+ API endpoints** for admin operations
- **4 admin roles** with granular permissions (Super Admin, Compliance Admin, Support Admin, Finance Admin)
- **Full audit trail** with QLDB integration for immutable records
- **MFA enforcement** for sensitive operations
- **AWS infrastructure** with Terraform examples

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-XX  
**Status:** Complete Backend Plan for Admin Dashboard
