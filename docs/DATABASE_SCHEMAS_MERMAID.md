# Mind-Links Platform - Database Schemas (Mermaid ER Diagrams)

This document contains Entity-Relationship diagrams for all DynamoDB tables across the three main dashboards.

---

## 1. Contractor Dashboard Database Schema

```mermaid
erDiagram
    CONTRACTOR_PROFILES {
        string id PK "UUID"
        string userId FK "auth-users.id"
        string email UK "Unique"
        string firstName
        string lastName
        string phone
        string country
        string timezone
        string profilePictureUrl
        string status "active|inactive|suspended"
        string onboardingStatus "pending|in_progress|completed"
        string createdAt "ISO 8601"
        string updatedAt "ISO 8601"
    }

    CONTRACTOR_BANK_DETAILS {
        string id PK "UUID"
        string contractorId FK "contractor-profiles.id"
        string bankName
        string accountNumber "Encrypted"
        string routingNumber "Encrypted"
        string swiftCode
        string iban "Encrypted"
        string accountHolderName
        string currency
        boolean isPrimary
        string verificationStatus "pending|verified|failed"
        string createdAt "ISO 8601"
        string updatedAt "ISO 8601"
    }

    CONTRACTOR_TAX_INFO {
        string id PK "UUID"
        string contractorId FK "contractor-profiles.id"
        string taxIdNumber "Encrypted"
        string taxResidenceCountry
        string taxFormType "W9|W8BEN|Other"
        string taxFormUrl
        boolean isVerified
        string verifiedAt "ISO 8601"
        string expiresAt "ISO 8601"
        string createdAt "ISO 8601"
        string updatedAt "ISO 8601"
    }

    CONTRACTOR_WALLET {
        string id PK "UUID"
        string contractorId FK "contractor-profiles.id"
        number availableBalance
        number pendingBalance
        number totalEarned
        number totalWithdrawn
        string currency
        string lastTransactionAt "ISO 8601"
        string createdAt "ISO 8601"
        string updatedAt "ISO 8601"
    }

    KYC_SESSIONS {
        string id PK "UUID"
        string contractorId FK "contractor-profiles.id"
        string veriffSessionId
        string status "pending|approved|rejected|expired"
        string verificationLevel "basic|standard|enhanced"
        string submittedAt "ISO 8601"
        string completedAt "ISO 8601"
        map verificationResult
        string expiresAt "ISO 8601"
        string createdAt "ISO 8601"
    }

    KYC_DOCUMENTS {
        string id PK "UUID"
        string contractorId FK "contractor-profiles.id"
        string sessionId FK "kyc-sessions.id"
        string documentType "passport|national_id|proof_of_address"
        string s3Key
        string s3Url
        string status "pending|approved|rejected"
        string expiryDate
        string reviewedAt "ISO 8601"
        string reviewedBy "Admin ID"
        string rejectionReason
        string createdAt "ISO 8601"
    }

    CONTRACT_TIMESHEETS {
        string id PK "UUID"
        string contractId FK "contract-contracts.id"
        string contractorId FK "contractor-profiles.id"
        string periodStart "ISO 8601"
        string periodEnd "ISO 8601"
        number hoursWorked
        number hourlyRate
        number totalAmount
        string status "draft|submitted|approved|rejected|paid"
        string submittedAt "ISO 8601"
        string approvedAt "ISO 8601"
        string approvedBy "Client ID"
        string notes
        string createdAt "ISO 8601"
    }

    PAYMENT_INVOICES {
        string id PK "UUID"
        string contractorId FK "contractor-profiles.id"
        string contractId FK "contract-contracts.id"
        string invoiceNumber UK
        string periodStart "ISO 8601"
        string periodEnd "ISO 8601"
        number amount
        string currency
        string status "draft|sent|paid|cancelled"
        string pdfUrl
        string paidAt "ISO 8601"
        string createdAt "ISO 8601"
    }

    PAYMENT_WITHDRAWALS {
        string id PK "UUID"
        string contractorId FK "contractor-profiles.id"
        string bankDetailsId FK "contractor-bank-details.id"
        number amount
        string currency
        string status "pending|processing|completed|failed"
        string stripePayoutId
        string requestedAt "ISO 8601"
        string processedAt "ISO 8601"
        string failureReason
        string createdAt "ISO 8601"
    }

    CONTRACTOR_PROFILES ||--o{ CONTRACTOR_BANK_DETAILS : "has"
    CONTRACTOR_PROFILES ||--o| CONTRACTOR_TAX_INFO : "has"
    CONTRACTOR_PROFILES ||--|| CONTRACTOR_WALLET : "has"
    CONTRACTOR_PROFILES ||--o{ KYC_SESSIONS : "has"
    CONTRACTOR_PROFILES ||--o{ KYC_DOCUMENTS : "uploads"
    KYC_SESSIONS ||--o{ KYC_DOCUMENTS : "contains"
    CONTRACTOR_PROFILES ||--o{ CONTRACT_TIMESHEETS : "submits"
    CONTRACTOR_PROFILES ||--o{ PAYMENT_INVOICES : "receives"
    CONTRACTOR_PROFILES ||--o{ PAYMENT_WITHDRAWALS : "requests"
    CONTRACTOR_BANK_DETAILS ||--o{ PAYMENT_WITHDRAWALS : "used for"
```

---

## 2. Client Dashboard Database Schema

```mermaid
erDiagram
    CLIENT_COMPANIES {
        string id PK "UUID"
        string userId FK "auth-users.id"
        string legalName
        string tradingName
        string country
        string taxId "Encrypted"
        string registrationNumber
        map address "street, city, state, postalCode, country"
        string verificationStatus "pending|verified|rejected"
        string businessType
        string employeeCount
        map businessRegistryData "From OpenCorporates"
        string createdAt "ISO 8601"
        string updatedAt "ISO 8601"
    }

    CLIENT_DOCUMENTS {
        string id PK "UUID"
        string clientId FK "client-companies.id"
        string type "business_license|tax_registration|incorporation"
        string name "Original filename"
        string s3Key
        string s3Url
        string status "pending|approved|rejected"
        list requiredFor "Countries requiring this doc"
        string uploadedAt "ISO 8601"
        string reviewedAt "ISO 8601"
        string reviewedBy "Admin user ID"
        string rejectionReason
        string createdAt "ISO 8601"
    }

    CLIENT_INVITATIONS {
        string id PK "UUID"
        string clientId FK "client-companies.id"
        string email
        string firstName
        string lastName
        string invitationToken UK
        string status "pending|accepted|expired|cancelled"
        string contractType "fixed|hourly|milestone"
        string message
        string sentAt "ISO 8601"
        string expiresAt "ISO 8601"
        string acceptedAt "ISO 8601"
        number ttl "Auto-delete after 30 days"
        string createdAt "ISO 8601"
    }

    PAYMENT_ESCROW {
        string id PK "UUID"
        string clientId FK "client-companies.id"
        number balance
        number pendingPayments
        number availableBalance
        string currency
        string lastFundedAt "ISO 8601"
        string createdAt "ISO 8601"
        string updatedAt "ISO 8601"
    }

    PAYMENT_PAYROLL {
        string id PK "UUID (PR-001)"
        string clientId FK "client-companies.id"
        string period "November 2024"
        string startDate "ISO 8601"
        string endDate "ISO 8601"
        number contractorCount
        number totalAmount
        string currency
        string status "draft|submitted|processing|processed|failed"
        string createdAt "ISO 8601"
        string submittedAt "ISO 8601"
        string processedAt "ISO 8601"
        string updatedAt "ISO 8601"
    }

    PAYMENT_PAYROLL_ITEMS {
        string id PK "UUID"
        string payrollId FK "payment-payroll.id"
        string clientId FK "client-companies.id"
        string contractorId FK "contractor-profiles.id"
        string contractorName
        string contractId FK "contract-contracts.id"
        string contractType "Fixed|Hourly"
        number amount
        string currency
        string details "Milestone 1, Milestone 2"
        string status "pending|processing|paid|failed"
        string paidAt "ISO 8601"
        string createdAt "ISO 8601"
    }

    CONTRACT_CONTRACTS {
        string id PK "UUID (C-001)"
        string clientId FK "client-companies.id"
        string contractorId FK "contractor-profiles.id"
        string contractorName
        string type "fixed|hourly|milestone"
        number amount
        string currency
        string status "draft|pending_signature|active|completed|terminated"
        string startDate "ISO 8601"
        string endDate "ISO 8601"
        number progress "0-100"
        string scopeOfWork
        string invoicePolicy
        string coverage "full|limited"
        map benefits "equipment, coworking, equity"
        string pdfUrl
        string signedByClientAt "ISO 8601"
        string signedByContractorAt "ISO 8601"
        string createdAt "ISO 8601"
        string updatedAt "ISO 8601"
    }

    CONTRACT_MILESTONES {
        string id PK "UUID"
        string contractId FK "contract-contracts.id"
        string title
        string description
        number amount
        string currency
        string dueDate "ISO 8601"
        string status "pending|submitted|approved|rejected|paid"
        string submittedAt "ISO 8601"
        string approvedAt "ISO 8601"
        string approvedBy "Client user ID"
        string rejectionReason
        string completedAt "ISO 8601"
        string createdAt "ISO 8601"
    }

    PAYMENT_TRANSACTIONS {
        string id PK "UUID"
        string clientId FK "client-companies.id"
        string date "ISO 8601"
        string type "payment|funding|refund"
        string description
        number amount
        string currency
        string status "pending|completed|failed"
        string stripeTransactionId
        string relatedEntityType "payroll|escrow"
        string relatedEntityId
        string createdAt "ISO 8601"
    }

    CLIENT_COMPANIES ||--o{ CLIENT_DOCUMENTS : "uploads"
    CLIENT_COMPANIES ||--o{ CLIENT_INVITATIONS : "sends"
    CLIENT_COMPANIES ||--|| PAYMENT_ESCROW : "has"
    CLIENT_COMPANIES ||--o{ PAYMENT_PAYROLL : "creates"
    CLIENT_COMPANIES ||--o{ CONTRACT_CONTRACTS : "creates"
    CLIENT_COMPANIES ||--o{ PAYMENT_TRANSACTIONS : "has"
    PAYMENT_PAYROLL ||--o{ PAYMENT_PAYROLL_ITEMS : "contains"
    CONTRACT_CONTRACTS ||--o{ CONTRACT_MILESTONES : "has"
```

---

## 3. Admin Dashboard Database Schema

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
        string createdAt "ISO 8601"
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

## 4. Shared/Core Tables (Used Across All Dashboards)

```mermaid
erDiagram
    AUTH_USERS {
        string id PK "UUID"
        string email UK
        string passwordHash "bcrypt"
        string role "company|contractor|admin"
        string status "active|inactive|suspended|pending_verification"
        boolean emailVerified
        string emailVerifiedAt "ISO 8601"
        string lastLogin "ISO 8601"
        string lastLoginIp
        number loginCount
        string createdAt "ISO 8601"
        string updatedAt "ISO 8601"
    }

    AUTH_SESSIONS {
        string id PK "UUID"
        string userId FK "auth-users.id"
        string token "JWT token hash"
        string deviceInfo
        string ipAddress
        string userAgent
        string expiresAt "ISO 8601"
        boolean isActive
        string createdAt "ISO 8601"
        number ttl "Auto-delete expired"
    }

    AUTH_PASSWORD_RESETS {
        string id PK "UUID"
        string userId FK "auth-users.id"
        string token UK "Reset token hash"
        string expiresAt "ISO 8601"
        boolean used
        string usedAt "ISO 8601"
        string createdAt "ISO 8601"
        number ttl "Auto-delete 24 hours"
    }

    NOTIFICATION_NOTIFICATIONS {
        string id PK "UUID"
        string recipientId FK "User ID"
        string recipientType "client|contractor|admin"
        string type "contract|payment|compliance|system"
        string title
        string message
        string timestamp "ISO 8601"
        boolean read
        string readAt "ISO 8601"
        string actionUrl
        map metadata
        number ttl "Auto-delete 90 days"
        string createdAt "ISO 8601"
    }

    NOTIFICATION_PREFERENCES {
        string id PK "UUID"
        string userId FK "auth-users.id"
        boolean emailEnabled
        boolean pushEnabled
        boolean smsEnabled
        list enabledTypes "contract, payment, etc"
        string digestFrequency "realtime|daily|weekly"
        string createdAt "ISO 8601"
        string updatedAt "ISO 8601"
    }

    AUTH_USERS ||--o{ AUTH_SESSIONS : "has"
    AUTH_USERS ||--o{ AUTH_PASSWORD_RESETS : "requests"
    AUTH_USERS ||--o{ NOTIFICATION_NOTIFICATIONS : "receives"
    AUTH_USERS ||--o| NOTIFICATION_PREFERENCES : "has"
```

---

## 5. Complete Platform ERD (High-Level Overview)

```mermaid
erDiagram
    AUTH_USERS ||--o| CLIENT_COMPANIES : "is"
    AUTH_USERS ||--o| CONTRACTOR_PROFILES : "is"
    AUTH_USERS ||--o| ADMIN_USERS : "is"

    CLIENT_COMPANIES ||--o{ CONTRACT_CONTRACTS : "creates"
    CLIENT_COMPANIES ||--o{ CLIENT_INVITATIONS : "sends"
    CLIENT_COMPANIES ||--|| PAYMENT_ESCROW : "funds"
    CLIENT_COMPANIES ||--o{ PAYMENT_PAYROLL : "processes"

    CONTRACTOR_PROFILES ||--o{ CONTRACT_CONTRACTS : "signs"
    CONTRACTOR_PROFILES ||--|| CONTRACTOR_WALLET : "has"
    CONTRACTOR_PROFILES ||--o{ KYC_SESSIONS : "completes"
    CONTRACTOR_PROFILES ||--o{ PAYMENT_WITHDRAWALS : "requests"

    CONTRACT_CONTRACTS ||--o{ CONTRACT_MILESTONES : "has"
    CONTRACT_CONTRACTS ||--o{ CONTRACT_TIMESHEETS : "tracks"
    CONTRACT_CONTRACTS ||--o{ PAYMENT_INVOICES : "generates"

    PAYMENT_PAYROLL ||--o{ PAYMENT_PAYROLL_ITEMS : "contains"
    PAYMENT_PAYROLL_ITEMS }o--|| CONTRACTOR_WALLET : "credits"

    KYC_SESSIONS ||--o{ KYC_DOCUMENTS : "contains"
    KYC_DOCUMENTS }o--|| ADMIN_USERS : "reviewed by"

    ADMIN_USERS ||--o{ AUDIT_LOGS : "creates"
    ADMIN_USERS ||--o{ QLDB_LEDGER_ENTRIES : "authorizes"
```

---

## Table Summary by Service

### Auth Service Tables
| Table | Purpose | GSIs |
|-------|---------|------|
| `auth-users` | User accounts | email-index, role-index |
| `auth-sessions` | Active sessions | userId-index |
| `auth-password-resets` | Reset tokens | userId-index, token-index |

### Contractor Service Tables
| Table | Purpose | GSIs |
|-------|---------|------|
| `contractor-profiles` | Contractor data | userId-index, email-index |
| `contractor-bank-details` | Bank accounts | contractorId-index |
| `contractor-tax-info` | Tax documents | contractorId-index |
| `contractor-wallet` | Balance tracking | contractorId-index |

### KYC Service Tables
| Table | Purpose | GSIs |
|-------|---------|------|
| `kyc-sessions` | Verification sessions | contractorId-index, status-index |
| `kyc-documents` | Uploaded documents | contractorId-index, status-index |

### Client Service Tables
| Table | Purpose | GSIs |
|-------|---------|------|
| `client-companies` | Company profiles | userId-index |
| `client-documents` | Business documents | clientId-index, status-index |
| `client-invitations` | Contractor invites | clientId-index, email-index |

### Contract Service Tables
| Table | Purpose | GSIs |
|-------|---------|------|
| `contract-contracts` | All contracts | clientId-index, contractorId-index, status-index |
| `contract-milestones` | Milestone tracking | contractId-index, status-index |
| `contract-timesheets` | Hourly tracking | contractId-index, contractorId-index |

### Payment Service Tables
| Table | Purpose | GSIs |
|-------|---------|------|
| `payment-escrow` | Client escrow | clientId-index |
| `payment-payroll` | Payroll runs | clientId-index, status-index |
| `payment-payroll-items` | Line items | payrollId-index, contractorId-index |
| `payment-invoices` | Contractor invoices | contractorId-index, contractId-index |
| `payment-withdrawals` | Withdrawal requests | contractorId-index, status-index |
| `payment-transactions` | Transaction history | clientId-index, type-index |

### Admin Service Tables
| Table | Purpose | GSIs |
|-------|---------|------|
| `admin-users` | Admin accounts | email-index, role-index |
| `admin-country-rules` | Country config | - |
| `admin-system-alerts` | System alerts | resolved-index, type-index |
| `admin-settings` | Platform config | settingKey-index |

### Audit Service Tables
| Table | Purpose | GSIs |
|-------|---------|------|
| `audit-logs` | Admin actions | adminId-timestamp-index, action-timestamp-index |
| `audit-events` | System events | eventType-timestamp-index, severity-timestamp-index |
| `qldb-ledger` (QLDB) | Immutable records | - |

### Notification Service Tables
| Table | Purpose | GSIs |
|-------|---------|------|
| `notification-notifications` | All notifications | recipientId-index, type-index |
| `notification-preferences` | User preferences | userId-index |

---

## Total Tables Summary

| Dashboard | New Tables | Shared Tables | Total |
|-----------|------------|---------------|-------|
| Contractor | 8 | 6 | 14 |
| Client | 7 | 6 | 13 |
| Admin | 6 | 6 | 12 |
| **Platform Total** | **21 unique tables** | **+1 QLDB Ledger** |

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-XX
