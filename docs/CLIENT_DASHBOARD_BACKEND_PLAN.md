# Client Dashboard Backend Plan

## Overview

This document provides a comprehensive backend plan for the **Client Dashboard** in the Mind-Links platform. The client dashboard is the primary interface for companies to manage their contractors, create contracts, process payroll, monitor compliance, and handle payments.

---

## Table of Contents

1. [Dashboard Features](#dashboard-features)
2. [Microservices Architecture](#microservices-architecture)
3. [API Endpoints](#api-endpoints)
4. [DynamoDB Schemas](#dynamodb-schemas)
5. [Service Integration](#service-integration)
6. [Infrastructure](#infrastructure)
7. [Security & Authorization](#security--authorization)

---

## Dashboard Features

### Core Features for Clients

| Feature | Description |
|---------|-------------|
| **Company Profile** | Manage company information, business registration, tax details |
| **Contractor Management** | Invite, onboard, and manage contractors |
| **Contract Creation** | Create fixed-rate, hourly, or milestone-based contracts |
| **Payroll Management** | Process payroll runs, manage payment schedules |
| **Compliance Monitoring** | Track KYC status, document expiry, compliance scores |
| **Escrow & Payments** | Manage escrow balance, fund accounts, track transactions |
| **Document Management** | Upload and manage business documents |
| **Notifications** | Contract updates, payment alerts, compliance notifications |
| **Activity Feed** | Recent actions, milestones, and system events |
| **Reporting** | Financial reports, contractor analytics, compliance reports |

### Dashboard Sections

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT DASHBOARD                             │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   Active    │  │    Total    │  │   Escrow    │  │   Pending   │ │
│  │  Contracts  │  │ Contractors │  │   Balance   │  │  Approvals  │ │
│  │     12      │  │     18      │  │  $45,250    │  │      7      │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                    CONTRACTOR LIST                              │ │
│  │  Name          │ Country │ KYC Status │ Contracts │ Earned     │ │
│  │  Ahmed Hassan  │ Syria   │ ✓ Approved │    2      │ $12,000    │ │
│  │  Sara Ibrahim  │ Egypt   │ ✓ Approved │    1      │ $8,000     │ │
│  │  Layla Mostafa │ UAE     │ ⚠ Incomplete│   1      │ $3,000     │ │
│  └────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────┐  ┌───────────────────────────────┐   │
│  │    RECENT ACTIVITY        │  │      UPCOMING DEADLINES       │   │
│  │  • Milestone completed    │  │  • Payroll Due - Nov 30       │   │
│  │  • Payment processed      │  │  • Contract Renewal - Dec 5   │   │
│  │  • New contractor joined  │  │  • Document Expiry - Dec 10   │   │
│  └───────────────────────────┘  └───────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Microservices Architecture

### Services Involved

The Client Dashboard interacts with **7 microservices**:

```
┌─────────────────────────────────────────────────────────────────────┐
│                       CLIENT DASHBOARD                              │
│                         (Frontend)                                  │
└─────────────────────┬───────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      API GATEWAY                                    │
│               (AWS API Gateway / ALB)                               │
└─────────────────────┬───────────────────────────────────────────────┘
                      │
   ┌──────┬──────┬────┴────┬──────┬──────┬──────┐
   │      │      │         │      │      │      │
   ▼      ▼      ▼         ▼      ▼      ▼      ▼
┌─────┐┌─────┐┌─────┐ ┌─────┐┌─────┐┌─────┐┌─────┐
│Auth ││Client││Contr-││Contr-││Paymt││Notif││KYC  │
│Svc  ││Svc   ││actor ││act   ││Svc  ││Svc  ││Svc  │
│:3001││:3003 ││:3004 ││:3006 ││:3008││:3010││:3005│
└─────┘└─────┘└─────┘ └─────┘└─────┘└─────┘└─────┘
```

### Service Responsibilities

| Service | Port | Responsibilities for Client Dashboard |
|---------|------|---------------------------------------|
| **Auth Service** | 3001 | Login, JWT validation, company registration |
| **Client Service** | 3003 | Company profile, documents, settings |
| **Contractor Service** | 3004 | Contractor invitations, onboarding |
| **KYC Service** | 3005 | Contractor KYC status, document verification |
| **Contract Service** | 3006 | Contract creation, management, milestones |
| **Payment Service** | 3008 | Payroll, escrow, transactions |
| **Notification Service** | 3010 | Alerts, activity feed, deadlines |

---

## API Endpoints

### 1. Client Service (Port 3003)

#### Company Profile Management

```yaml
# Get company profile
GET /api/clients/me
Headers:
  Authorization: Bearer <jwt_token>
Response:
  {
    "id": "uuid",
    "userId": "uuid",
    "legalName": "ABC Corporation",
    "tradingName": "ABC Corp",
    "country": "UAE",
    "taxId": "123456789",
    "registrationNumber": "UAE-2024-001",
    "address": {
      "street": "123 Business Bay",
      "city": "Dubai",
      "state": "Dubai",
      "postalCode": "12345",
      "country": "UAE"
    },
    "verificationStatus": "verified",
    "businessType": "technology",
    "employeeCount": "50-100",
    "createdAt": "2024-01-01T00:00:00Z"
  }

# Update company profile
PUT /api/clients/me
Headers:
  Authorization: Bearer <jwt_token>
Body:
  {
    "tradingName": "ABC Corporation Ltd",
    "address": {...},
    "businessType": "technology"
  }

# Get company documents
GET /api/clients/me/documents
Response:
  {
    "data": [
      {
        "id": "uuid",
        "type": "business_license",
        "name": "Business_License_2024.pdf",
        "status": "approved",
        "uploadedAt": "2024-01-10T00:00:00Z",
        "reviewedAt": "2024-01-12T00:00:00Z",
        "requiredFor": ["UAE", "Saudi Arabia"]
      }
    ]
  }

# Upload company document
POST /api/clients/me/documents
Headers:
  Content-Type: multipart/form-data
Body:
  type: "tax_registration"
  file: <pdf_file>
  requiredFor: ["Egypt"]
```

#### Dashboard Stats

```yaml
# Get dashboard statistics
GET /api/clients/me/dashboard/stats
Response:
  {
    "activeContracts": 12,
    "totalContractors": 18,
    "escrowBalance": 45250.00,
    "pendingApprovals": 7,
    "complianceScore": 92,
    "thisMonthPayroll": 25000.00,
    "upcomingPayroll": 28000.00
  }

# Get activity feed
GET /api/clients/me/dashboard/activity
Query: limit=10, offset=0
Response:
  {
    "data": [
      {
        "id": "uuid",
        "type": "contract",
        "text": "Ahmed Hassan completed Milestone 1",
        "timestamp": "2024-11-28T10:00:00Z",
        "icon": "CheckCircle2",
        "contractorId": "uuid",
        "contractId": "uuid"
      }
    ]
  }

# Get upcoming deadlines
GET /api/clients/me/dashboard/deadlines
Response:
  {
    "data": [
      {
        "id": "uuid",
        "title": "Payroll Due",
        "date": "2024-11-30",
        "type": "payroll",
        "urgent": true
      }
    ]
  }
```

### 2. Contractor Management (via Contractor Service)

```yaml
# Get all contractors for client
GET /api/clients/me/contractors
Query: status=active, page=1, limit=20
Response:
  {
    "data": [
      {
        "id": "uuid",
        "name": "Ahmed Hassan",
        "email": "ahmed@example.com",
        "country": "Syria",
        "kycStatus": "approved",
        "complianceScore": 100,
        "activeContracts": 2,
        "totalEarned": 12000.00,
        "joinedDate": "2024-01-15T00:00:00Z"
      }
    ],
    "meta": {
      "total": 18,
      "page": 1,
      "limit": 20
    }
  }

# Get contractor details
GET /api/clients/me/contractors/:contractorId
Response:
  {
    "id": "uuid",
    "name": "Ahmed Hassan",
    "email": "ahmed@example.com",
    "country": "Syria",
    "kycStatus": "approved",
    "kycInfo": {
      "status": "approved",
      "submittedDate": "2024-01-20",
      "approvedDate": "2024-01-25",
      "verificationLevel": "enhanced",
      "documents": [...]
    },
    "contracts": [...],
    "paymentHistory": [...]
  }

# Invite contractor
POST /api/clients/me/contractors/invite
Body:
  {
    "email": "contractor@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "contractType": "fixed-rate",
    "message": "Welcome to the team!"
  }
Response:
  {
    "invitationId": "uuid",
    "email": "contractor@example.com",
    "status": "pending",
    "expiresAt": "2024-12-07T00:00:00Z",
    "inviteLink": "https://app.mindlinks.com/invite/abc123"
  }

# Get pending invitations
GET /api/clients/me/contractors/invitations
Response:
  {
    "data": [
      {
        "id": "uuid",
        "email": "contractor@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "status": "pending",
        "sentAt": "2024-11-28T00:00:00Z",
        "expiresAt": "2024-12-05T00:00:00Z"
      }
    ]
  }

# Resend invitation
POST /api/clients/me/contractors/invitations/:invitationId/resend

# Cancel invitation
DELETE /api/clients/me/contractors/invitations/:invitationId
```

### 3. Contract Management (via Contract Service)

```yaml
# Get all contracts
GET /api/clients/me/contracts
Query: status=active, type=fixed, page=1, limit=20
Response:
  {
    "data": [
      {
        "id": "C-001",
        "contractorId": "uuid",
        "contractorName": "Ahmed Hassan",
        "type": "fixed",
        "amount": 5000.00,
        "currency": "USD",
        "status": "active",
        "startDate": "2024-10-01",
        "endDate": "2024-12-31",
        "progress": 60,
        "milestones": [
          {
            "id": "m1",
            "title": "Design Mockups",
            "amount": 1000,
            "dueDate": "2024-11-10",
            "status": "completed"
          }
        ]
      }
    ]
  }

# Create contract
POST /api/clients/me/contracts
Body:
  {
    "contractorId": "uuid",
    "type": "fixed",
    "contractName": "Web Development Project",
    "currency": "USD",
    "amount": 5000.00,
    "startDate": "2024-12-01",
    "endDate": "2025-02-28",
    "scopeOfWork": "Full-stack web application development...",
    "invoicePolicy": "monthly",
    "coverage": "full-coverage",
    "benefits": {
      "equipment": true,
      "coworkingSpace": false,
      "equity": false
    },
    "milestones": [
      {
        "title": "Phase 1 - Design",
        "amount": 1500,
        "dueDate": "2024-12-15"
      }
    ]
  }
Response:
  {
    "id": "uuid",
    "status": "draft",
    "pdfUrl": "https://s3.../contract.pdf",
    "createdAt": "2024-11-28T00:00:00Z"
  }

# Sign contract (client)
POST /api/clients/me/contracts/:contractId/sign
Body:
  {
    "signature": "base64_signature_image"
  }

# Get contract details
GET /api/clients/me/contracts/:contractId

# Update contract
PUT /api/clients/me/contracts/:contractId

# Terminate contract
POST /api/clients/me/contracts/:contractId/terminate
Body:
  {
    "reason": "Project completed",
    "effectiveDate": "2024-12-31"
  }
```

#### Milestone Management

```yaml
# Get milestones for contract
GET /api/clients/me/contracts/:contractId/milestones

# Approve milestone
POST /api/clients/me/contracts/:contractId/milestones/:milestoneId/approve

# Reject milestone
POST /api/clients/me/contracts/:contractId/milestones/:milestoneId/reject
Body:
  {
    "reason": "Deliverables incomplete"
  }
```

#### Timesheet Management

```yaml
# Get pending timesheets
GET /api/clients/me/timesheets
Query: status=pending, contractorId=uuid

# Approve timesheet
POST /api/clients/me/timesheets/:timesheetId/approve

# Reject timesheet
POST /api/clients/me/timesheets/:timesheetId/reject
Body:
  {
    "reason": "Hours do not match project logs"
  }
```

### 4. Payment Service (Port 3008)

#### Escrow Management

```yaml
# Get escrow balance
GET /api/clients/me/escrow
Response:
  {
    "balance": 45250.00,
    "currency": "USD",
    "pendingPayments": 12500.00,
    "availableBalance": 32750.00,
    "lastFunded": "2024-11-25T00:00:00Z"
  }

# Fund escrow
POST /api/clients/me/escrow/fund
Body:
  {
    "amount": 20000.00,
    "currency": "USD",
    "paymentMethod": "bank_transfer"
  }
Response:
  {
    "transactionId": "uuid",
    "amount": 20000.00,
    "status": "processing",
    "estimatedCompletion": "2024-12-02T00:00:00Z"
  }

# Get transaction history
GET /api/clients/me/transactions
Query: type=all, startDate=2024-01-01, endDate=2024-12-31, page=1
Response:
  {
    "data": [
      {
        "id": "uuid",
        "date": "2024-11-30",
        "type": "payment",
        "description": "Payroll - November 2024",
        "amount": -12500.00,
        "currency": "USD",
        "status": "completed"
      }
    ]
  }
```

#### Payroll Management

```yaml
# Get payroll runs
GET /api/clients/me/payroll
Query: status=all, page=1
Response:
  {
    "data": [
      {
        "id": "PR-001",
        "period": "November 2024",
        "startDate": "2024-11-01",
        "endDate": "2024-11-30",
        "contractors": 5,
        "totalAmount": 12500.00,
        "status": "draft",
        "lineItems": [...]
      }
    ]
  }

# Create payroll run
POST /api/clients/me/payroll
Body:
  {
    "period": "December 2024",
    "startDate": "2024-12-01",
    "endDate": "2024-12-31"
  }

# Get payroll details
GET /api/clients/me/payroll/:payrollId

# Add line item to payroll
POST /api/clients/me/payroll/:payrollId/line-items
Body:
  {
    "contractorId": "uuid",
    "contractId": "uuid",
    "amount": 3000.00,
    "description": "Milestone completion"
  }

# Submit payroll for processing
POST /api/clients/me/payroll/:payrollId/submit

# Process payroll
POST /api/clients/me/payroll/:payrollId/process

# Cancel payroll
DELETE /api/clients/me/payroll/:payrollId
```

### 5. KYC/Compliance (via KYC Service)

```yaml
# Get compliance overview
GET /api/clients/me/compliance/overview
Response:
  {
    "overallScore": 92,
    "totalContractors": 18,
    "approved": 12,
    "pending": 3,
    "incomplete": 2,
    "expiring": 1,
    "requiresAttention": 3
  }

# Get contractor KYC status
GET /api/clients/me/contractors/:contractorId/kyc
Response:
  {
    "status": "approved",
    "submittedDate": "2024-01-20",
    "approvedDate": "2024-01-25",
    "verificationLevel": "enhanced",
    "documents": [
      {
        "id": "uuid",
        "type": "passport",
        "name": "Passport - Ahmed Hassan",
        "status": "approved",
        "expiryDate": "2029-01-20"
      }
    ]
  }

# Request document from contractor
POST /api/clients/me/contractors/:contractorId/documents/request
Body:
  {
    "documentType": "proof_of_address",
    "message": "Please upload a recent utility bill"
  }
```

### 6. Notification Service (Port 3010)

```yaml
# Get notifications
GET /api/clients/me/notifications
Query: read=false, page=1
Response:
  {
    "data": [
      {
        "id": "uuid",
        "type": "compliance",
        "title": "Ahmed Hassan is ready to work!",
        "message": "Ahmed has completed KYC verification.",
        "timestamp": "2024-11-22T10:30:00Z",
        "read": false,
        "actionUrl": "/compliance"
      }
    ],
    "meta": {
      "total": 15,
      "unread": 3
    }
  }

# Mark notification as read
PUT /api/clients/me/notifications/:notificationId/read

# Mark all as read
PUT /api/clients/me/notifications/read-all
```

---

## DynamoDB Schemas

### Tables for Client Dashboard

| Table | Service | Purpose |
|-------|---------|---------|
| client-companies | Client | Company profiles and settings |
| client-documents | Client | Business documents |
| client-invitations | Client | Contractor invitations |
| contract-contracts | Contract | Contract data |
| contract-milestones | Contract | Milestone tracking |
| payment-escrow | Payment | Escrow balances |
| payment-payroll | Payment | Payroll runs |
| payment-payroll-items | Payment | Payroll line items |
| payment-transactions | Payment | Transaction history |

### New Tables for Client Dashboard

#### Table: `client-companies`

```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  userId: string,                // Reference to auth-users.id
  legalName: string,
  tradingName: string,
  country: string,
  taxId: string,                 // Encrypted
  registrationNumber: string,
  address: {
    street: string,
    city: string,
    state: string,
    postalCode: string,
    country: string
  },
  verificationStatus: 'pending' | 'verified' | 'rejected',
  businessType: string,
  employeeCount: string,
  businessRegistryData: Map,     // From OpenCorporates
  createdAt: string,
  updatedAt: string
}
```

**Indexes:**
- **GSI: userId-index** - Get company by user ID

---

#### Table: `client-documents`

```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  clientId: string,              // Reference to client-companies.id
  type: string,                  // 'business_license', 'tax_registration', etc.
  name: string,                  // Original filename
  s3Key: string,
  s3Url: string,
  status: 'pending' | 'approved' | 'rejected',
  requiredFor: string[],         // Countries requiring this document
  uploadedAt: string,
  reviewedAt: string,
  reviewedBy: string,            // Admin user ID
  rejectionReason: string,
  createdAt: string,
  updatedAt: string
}
```

**Indexes:**
- **GSI: clientId-index** - Get documents by client
- **GSI: status-index** - List pending documents

---

#### Table: `payment-payroll`

```typescript
{
  // Partition Key
  id: string,                    // UUID (PR-001)
  
  // Attributes
  clientId: string,              // Reference to client-companies.id
  period: string,                // "November 2024"
  startDate: string,             // ISO 8601
  endDate: string,               // ISO 8601
  contractorCount: number,
  totalAmount: number,
  currency: string,
  status: 'draft' | 'submitted' | 'processing' | 'processed' | 'failed',
  createdAt: string,
  submittedAt: string,
  processedAt: string,
  updatedAt: string
}
```

**Indexes:**
- **GSI: clientId-index** - Get payroll runs by client
- **GSI: status-index** - List pending payroll runs

---

#### Table: `payment-payroll-items`

```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  payrollId: string,             // Reference to payment-payroll.id
  clientId: string,              // Reference to client-companies.id
  contractorId: string,          // Reference to contractor-profiles.id
  contractorName: string,
  contractId: string,            // Reference to contract-contracts.id
  contractType: string,          // 'Fixed', 'Hourly'
  amount: number,
  currency: string,
  details: string,               // "Milestone 1, Milestone 2" or "40 hours × $50/hr"
  status: 'pending' | 'processing' | 'paid' | 'failed',
  paidAt: string,
  createdAt: string,
  updatedAt: string
}
```

**Indexes:**
- **GSI: payrollId-index** - Get items by payroll run
- **GSI: contractorId-index** - Get payments by contractor

---

#### Table: `contract-milestones`

```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  contractId: string,            // Reference to contract-contracts.id
  title: string,
  description: string,
  amount: number,
  currency: string,
  dueDate: string,               // ISO 8601
  status: 'pending' | 'submitted' | 'approved' | 'rejected' | 'paid',
  submittedAt: string,
  approvedAt: string,
  approvedBy: string,            // Client user ID
  rejectionReason: string,
  completedAt: string,
  createdAt: string,
  updatedAt: string
}
```

**Indexes:**
- **GSI: contractId-index** - Get milestones by contract
- **GSI: status-index** - List pending milestones

---

## Service Integration

### Service Communication Flow

```
1. Dashboard Load Flow:
   Frontend (with JWT) → API Gateway
   ├── → Client Service (GET /me) → Company Profile
   ├── → Client Service (GET /dashboard/stats) → Stats
   ├── → Contractor Service (GET /contractors) → Contractor List
   ├── → Contract Service (GET /contracts) → Contract List
   ├── → Payment Service (GET /escrow) → Escrow Balance
   └── → Notification Service (GET /notifications) → Notifications

2. Contract Creation Flow:
   Frontend → Contract Service (POST /contracts)
   → Validate contractor
   → Generate PDF
   → Save to DynamoDB
   → Upload PDF to S3
   → EventBridge Event (contract.created)
   → Notification Service (notify contractor)
   → Email via SendGrid

3. Payroll Processing Flow:
   Frontend → Payment Service (POST /payroll/:id/process)
   → Validate escrow balance
   → Lock funds
   → Create payment transactions
   → Stripe payout API
   → Update contractor wallets
   → EventBridge Event (payroll.processed)
   → Notification Service (notify all contractors)
   → Update escrow balance

4. Contractor Invitation Flow:
   Frontend → Contractor Service (POST /invite)
   → Generate invitation token
   → Save invitation to DynamoDB
   → EventBridge Event (invitation.sent)
   → Email Service (SendGrid)
   → Contractor receives email
   → Contractor clicks link
   → Registration flow
```

### EventBridge Events for Client Dashboard

| Event | Source | Consumers |
|-------|--------|-----------|
| `client.profile.updated` | Client Service | Notification Service |
| `contractor.invited` | Contractor Service | Email Service |
| `contractor.joined` | Contractor Service | Notification Service |
| `contract.created` | Contract Service | Notification Service |
| `contract.signed` | Contract Service | Notification Service, Ledger |
| `milestone.submitted` | Contract Service | Notification Service |
| `milestone.approved` | Contract Service | Payment Service, Notification |
| `timesheet.submitted` | Contract Service | Notification Service |
| `timesheet.approved` | Contract Service | Payment Service, Notification |
| `payroll.created` | Payment Service | - |
| `payroll.processed` | Payment Service | Notification Service |
| `escrow.funded` | Payment Service | Notification Service |

---

## Infrastructure

### ECS Task Definition - Client Service

```hcl
resource "aws_ecs_task_definition" "client_service" {
  family                   = "mindlinks-client-service-${var.environment}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"

  execution_role_arn = aws_iam_role.ecs_execution_role.arn
  task_role_arn      = aws_iam_role.client_service_role.arn

  container_definitions = jsonencode([{
    name  = "client-service"
    image = "${aws_ecr_repository.client_service.repository_url}:latest"

    portMappings = [{
      containerPort = 3003
      protocol      = "tcp"
    }]

    environment = [
      { name = "AWS_REGION", value = var.aws_region },
      { name = "NODE_ENV", value = var.environment },
      { name = "SERVICE_NAME", value = "client-service" },
      { name = "SERVICE_PORT", value = "3003" }
    ]

    secrets = [
      { name = "CLIENT_COMPANIES_TABLE", valueFrom = aws_ssm_parameter.client_companies_table.arn },
      { name = "CLIENT_DOCUMENTS_TABLE", valueFrom = aws_ssm_parameter.client_documents_table.arn },
      { name = "S3_BUCKET_NAME", valueFrom = aws_ssm_parameter.client_documents_bucket.arn },
      { name = "REDIS_HOST", valueFrom = aws_ssm_parameter.redis_host.arn },
      { name = "JWT_SECRET", valueFrom = aws_secretsmanager_secret.jwt_secret.arn }
    ]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.client_service.name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "ecs"
      }
    }
  }])
}
```

### IAM Role for Client Service

```hcl
resource "aws_iam_role" "client_service_role" {
  name = "mindlinks-client-service-role-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy" "client_service_dynamodb" {
  name = "client-service-dynamodb-policy"
  role = aws_iam_role.client_service_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
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
        aws_dynamodb_table.client_companies.arn,
        "${aws_dynamodb_table.client_companies.arn}/index/*",
        aws_dynamodb_table.client_documents.arn,
        "${aws_dynamodb_table.client_documents.arn}/index/*",
        aws_dynamodb_table.client_invitations.arn,
        "${aws_dynamodb_table.client_invitations.arn}/index/*"
      ]
    }]
  })
}
```

---

## Security & Authorization

### JWT Token Claims for Client

```typescript
interface ClientJwtPayload {
  sub: string;           // User ID
  email: string;
  role: 'company';
  clientId: string;      // Company profile ID
  companyName: string;
  verificationStatus: string;
  iat: number;
  exp: number;
}
```

### Role-Based Access Control (RBAC)

```typescript
// NestJS Guard for Client Role
@Injectable()
export class ClientGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (user.role !== 'company') {
      throw new ForbiddenException('Access denied. Company role required.');
    }
    
    return true;
  }
}
```

### Data Access Rules

| Resource | Client Can Access |
|----------|-------------------|
| Own company profile | ✅ Read, Write |
| Other company profiles | ❌ No access |
| Own contractors | ✅ Read, Invite, Remove |
| Own contracts | ✅ Full access |
| Own payroll | ✅ Full access |
| Own escrow | ✅ Read, Fund |
| Contractor KYC status | ✅ Read only (summary) |
| Contractor bank details | ❌ No access |

---

## API Summary

### Client Service Endpoints (22 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/clients/me | Get company profile |
| PUT | /api/clients/me | Update company profile |
| GET | /api/clients/me/documents | List company documents |
| POST | /api/clients/me/documents | Upload document |
| GET | /api/clients/me/dashboard/stats | Get dashboard stats |
| GET | /api/clients/me/dashboard/activity | Get activity feed |
| GET | /api/clients/me/dashboard/deadlines | Get upcoming deadlines |
| GET | /api/clients/me/contractors | List contractors |
| GET | /api/clients/me/contractors/:id | Get contractor details |
| POST | /api/clients/me/contractors/invite | Invite contractor |
| GET | /api/clients/me/contractors/invitations | List invitations |
| POST | /api/clients/me/contractors/invitations/:id/resend | Resend invitation |
| DELETE | /api/clients/me/contractors/invitations/:id | Cancel invitation |
| GET | /api/clients/me/compliance/overview | Compliance overview |

### Contract Service Endpoints (12 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/clients/me/contracts | List contracts |
| POST | /api/clients/me/contracts | Create contract |
| GET | /api/clients/me/contracts/:id | Get contract |
| PUT | /api/clients/me/contracts/:id | Update contract |
| POST | /api/clients/me/contracts/:id/sign | Sign contract |
| POST | /api/clients/me/contracts/:id/terminate | Terminate contract |
| GET | /api/clients/me/contracts/:id/milestones | Get milestones |
| POST | /api/clients/me/contracts/:id/milestones/:mid/approve | Approve milestone |
| POST | /api/clients/me/contracts/:id/milestones/:mid/reject | Reject milestone |
| GET | /api/clients/me/timesheets | Get pending timesheets |
| POST | /api/clients/me/timesheets/:id/approve | Approve timesheet |
| POST | /api/clients/me/timesheets/:id/reject | Reject timesheet |

### Payment Service Endpoints (10 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/clients/me/escrow | Get escrow balance |
| POST | /api/clients/me/escrow/fund | Fund escrow |
| GET | /api/clients/me/transactions | Transaction history |
| GET | /api/clients/me/payroll | List payroll runs |
| POST | /api/clients/me/payroll | Create payroll run |
| GET | /api/clients/me/payroll/:id | Get payroll details |
| POST | /api/clients/me/payroll/:id/line-items | Add line item |
| POST | /api/clients/me/payroll/:id/submit | Submit payroll |
| POST | /api/clients/me/payroll/:id/process | Process payroll |
| DELETE | /api/clients/me/payroll/:id | Cancel payroll |

### Notification Endpoints (3 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/clients/me/notifications | Get notifications |
| PUT | /api/clients/me/notifications/:id/read | Mark as read |
| PUT | /api/clients/me/notifications/read-all | Mark all read |

---

## Summary

The Client Dashboard backend plan includes:

- **7 microservices** integration (Auth, Client, Contractor, KYC, Contract, Payment, Notification)
- **5 new DynamoDB tables** (client-documents, payment-payroll, payment-payroll-items, contract-milestones, client-companies enhanced)
- **47+ API endpoints** for client operations
- **Full AWS infrastructure** integration (ECS, API Gateway, DynamoDB, S3, EventBridge)
- **RBAC security** with JWT authentication
- **Payroll and escrow management** with Stripe integration

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-XX  
**Status:** Complete Backend Plan for Client Dashboard
