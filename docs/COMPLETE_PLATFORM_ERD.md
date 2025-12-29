# Mind-Links Platform - Complete Database ERD

## Full Platform Entity Relationship Diagram

> **Note:** Due to the large number of tables (37+), the ERD is split into logical sections below. Each section can be rendered independently.

---

## 1. Core Authentication & User Management

```mermaid
erDiagram
    AUTH_USERS {
        string id PK
        string email UK
        string passwordHash
        string role
        string status
        boolean emailVerified
        string lastLogin
        string createdAt
    }

    AUTH_SESSIONS {
        string id PK
        string userId FK
        string token
        string deviceInfo
        string ipAddress
        string expiresAt
        boolean isActive
    }

    AUTH_PASSWORD_RESETS {
        string id PK
        string userId FK
        string token UK
        string expiresAt
        boolean used
    }

    CLIENT_COMPANIES {
        string id PK
        string userId FK
        string legalName
        string tradingName
        string country
        string taxId
        string verificationStatus
        string businessType
    }

    CONTRACTOR_PROFILES {
        string id PK
        string userId FK
        string email UK
        string firstName
        string lastName
        string country
        string status
        string onboardingStatus
    }

    ADMIN_USERS {
        string id PK
        string email UK
        string name
        string role
        string status
        boolean mfaEnabled
        string createdBy FK
    }

    AUTH_USERS ||--o{ AUTH_SESSIONS : "has"
    AUTH_USERS ||--o{ AUTH_PASSWORD_RESETS : "requests"
    AUTH_USERS ||--o| CLIENT_COMPANIES : "is_client"
    AUTH_USERS ||--o| CONTRACTOR_PROFILES : "is_contractor"
    AUTH_USERS ||--o| ADMIN_USERS : "is_admin"
```

---

## 2. Client & Contractor Details

```mermaid
erDiagram
    CLIENT_COMPANIES {
        string id PK
        string userId FK
        string legalName
        string country
        string taxId
        string verificationStatus
    }

    CLIENT_DOCUMENTS {
        string id PK
        string clientId FK
        string type
        string name
        string s3Key
        string status
        string reviewedBy FK
    }

    CLIENT_INVITATIONS {
        string id PK
        string clientId FK
        string email
        string invitationToken UK
        string status
        string expiresAt
    }

    CONTRACTOR_PROFILES {
        string id PK
        string userId FK
        string email UK
        string firstName
        string lastName
        string status
    }

    CONTRACTOR_BANK_DETAILS {
        string id PK
        string contractorId FK
        string bankName
        string accountNumber
        string currency
        boolean isPrimary
        string verificationStatus
    }

    CONTRACTOR_TAX_INFO {
        string id PK
        string contractorId FK
        string taxIdNumber
        string taxResidenceCountry
        string taxFormType
        boolean isVerified
    }

    CONTRACTOR_WALLET {
        string id PK
        string contractorId FK
        number availableBalance
        number pendingBalance
        number totalEarned
        string currency
    }

    CLIENT_COMPANIES ||--o{ CLIENT_DOCUMENTS : "uploads"
    CLIENT_COMPANIES ||--o{ CLIENT_INVITATIONS : "sends"
    CONTRACTOR_PROFILES ||--o{ CONTRACTOR_BANK_DETAILS : "has"
    CONTRACTOR_PROFILES ||--o| CONTRACTOR_TAX_INFO : "has"
    CONTRACTOR_PROFILES ||--|| CONTRACTOR_WALLET : "has"
```

---

## 3. KYC & Compliance

```mermaid
erDiagram
    CONTRACTOR_PROFILES {
        string id PK
        string userId FK
        string email UK
        string status
        string onboardingStatus
    }

    KYC_SESSIONS {
        string id PK
        string contractorId FK
        string veriffSessionId
        string status
        string verificationLevel
        string submittedAt
        string completedAt
    }

    KYC_DOCUMENTS {
        string id PK
        string contractorId FK
        string sessionId FK
        string documentType
        string s3Key
        string status
        string reviewedBy FK
        string rejectionReason
    }

    ADMIN_USERS {
        string id PK
        string email UK
        string role
        string status
    }

    CONTRACTOR_PROFILES ||--o{ KYC_SESSIONS : "completes"
    CONTRACTOR_PROFILES ||--o{ KYC_DOCUMENTS : "uploads"
    KYC_SESSIONS ||--o{ KYC_DOCUMENTS : "contains"
    ADMIN_USERS ||--o{ KYC_DOCUMENTS : "reviews"
```

---

## 4. Contracts & Work Tracking

```mermaid
erDiagram
    CLIENT_COMPANIES {
        string id PK
        string legalName
    }

    CONTRACTOR_PROFILES {
        string id PK
        string firstName
        string lastName
    }

    CONTRACT_CONTRACTS {
        string id PK
        string clientId FK
        string contractorId FK
        string type
        number amount
        string currency
        string status
        string startDate
        string endDate
    }

    CONTRACT_MILESTONES {
        string id PK
        string contractId FK
        string title
        number amount
        string dueDate
        string status
        string approvedBy FK
    }

    CONTRACT_TIMESHEETS {
        string id PK
        string contractId FK
        string contractorId FK
        string clientId FK
        string periodStart
        string periodEnd
        number hoursWorked
        number totalAmount
        string status
    }

    CLIENT_COMPANIES ||--o{ CONTRACT_CONTRACTS : "creates"
    CONTRACTOR_PROFILES ||--o{ CONTRACT_CONTRACTS : "signs"
    CONTRACT_CONTRACTS ||--o{ CONTRACT_MILESTONES : "has"
    CONTRACT_CONTRACTS ||--o{ CONTRACT_TIMESHEETS : "tracks"
```

---

## 5. Payments & Financial

```mermaid
erDiagram
    CLIENT_COMPANIES {
        string id PK
        string legalName
    }

    CONTRACTOR_PROFILES {
        string id PK
        string firstName
    }

    CONTRACTOR_WALLET {
        string id PK
        string contractorId FK
        number availableBalance
        number pendingBalance
    }

    CONTRACTOR_BANK_DETAILS {
        string id PK
        string contractorId FK
        string bankName
        string accountNumber
    }

    PAYMENT_ESCROW {
        string id PK
        string clientId FK
        number balance
        number pendingPayments
        number availableBalance
        string currency
    }

    PAYMENT_PAYROLL {
        string id PK
        string clientId FK
        string period
        number contractorCount
        number totalAmount
        string status
    }

    PAYMENT_PAYROLL_ITEMS {
        string id PK
        string payrollId FK
        string contractorId FK
        string contractId FK
        number amount
        string status
    }

    PAYMENT_INVOICES {
        string id PK
        string contractorId FK
        string contractId FK
        string invoiceNumber UK
        number amount
        string status
    }

    PAYMENT_WITHDRAWALS {
        string id PK
        string contractorId FK
        string bankDetailsId FK
        number amount
        string status
        string stripePayoutId
    }

    PAYMENT_TRANSACTIONS {
        string id PK
        string clientId FK
        string type
        number amount
        string status
    }

    CLIENT_COMPANIES ||--|| PAYMENT_ESCROW : "has"
    CLIENT_COMPANIES ||--o{ PAYMENT_PAYROLL : "processes"
    CLIENT_COMPANIES ||--o{ PAYMENT_TRANSACTIONS : "has"
    PAYMENT_PAYROLL ||--o{ PAYMENT_PAYROLL_ITEMS : "contains"
    PAYMENT_PAYROLL_ITEMS }o--|| CONTRACTOR_WALLET : "credits"
    CONTRACTOR_PROFILES ||--o{ PAYMENT_INVOICES : "receives"
    CONTRACTOR_PROFILES ||--o{ PAYMENT_WITHDRAWALS : "requests"
    CONTRACTOR_BANK_DETAILS ||--o{ PAYMENT_WITHDRAWALS : "used_for"
```

---

## 6. Admin & Audit

```mermaid
erDiagram
    ADMIN_USERS {
        string id PK
        string email UK
        string name
        string role
        string status
        boolean mfaEnabled
        string createdBy FK
    }

    ADMIN_COUNTRY_RULES {
        string countryCode PK
        string countryName
        string currency
        boolean isActive
        string updatedBy FK
    }

    ADMIN_SYSTEM_ALERTS {
        string id PK
        string type
        string title
        string message
        boolean resolved
        string resolvedBy FK
    }

    AUDIT_LOGS {
        string id PK
        string timestamp SK
        string adminId FK
        string action
        string entityType
        string entityId
        string ipAddress
    }

    AUDIT_EVENTS {
        string id PK
        string timestamp SK
        string eventType
        string severity
        string message
        boolean resolved
    }

    QLDB_LEDGER {
        string id PK
        string transactionType
        string adminId FK
        string contractorId FK
        number amount
        number balanceBefore
        number balanceAfter
        string reason
    }

    ADMIN_USERS ||--o{ AUDIT_LOGS : "creates"
    ADMIN_USERS ||--o{ QLDB_LEDGER : "authorizes"
    ADMIN_USERS ||--o{ ADMIN_SYSTEM_ALERTS : "resolves"
    ADMIN_USERS ||--o{ ADMIN_COUNTRY_RULES : "updates"
```

---

## 7. Notifications

```mermaid
erDiagram
    AUTH_USERS {
        string id PK
        string email UK
        string role
    }

    NOTIFICATION_NOTIFICATIONS {
        string id PK
        string recipientId FK
        string recipientType
        string type
        string title
        string message
        boolean read
        string actionUrl
    }

    NOTIFICATION_PREFERENCES {
        string id PK
        string userId FK
        boolean emailEnabled
        boolean pushEnabled
        boolean smsEnabled
        string digestFrequency
    }

    AUTH_USERS ||--o{ NOTIFICATION_NOTIFICATIONS : "receives"
    AUTH_USERS ||--o| NOTIFICATION_PREFERENCES : "has"
```

---

## 8. Website Backend

```mermaid
erDiagram
    WEBSITE_BLOG_POSTS {
        string id PK
        string slug UK
        string title
        string content
        string author
        string category
        string status
        string publishedAt
    }

    WEBSITE_PAGES {
        string id PK
        string slug UK
        string title
        string content
        string template
        string status
    }

    WEBSITE_MEDIA {
        string id PK
        string filename
        string mimeType
        string s3Key
        string s3Url
        string type
    }

    WEBSITE_CONTACTS {
        string id PK
        string name
        string email
        string company
        string message
        string status
    }

    WEBSITE_DEMO_REQUESTS {
        string id PK
        string name
        string email
        string company
        string companySize
        string status
    }

    WEBSITE_NEWSLETTER {
        string id PK
        string email UK
        string status
        string subscribedAt
    }

    WEBSITE_SESSIONS {
        string id PK
        string visitorId
        string referrer
        string utmSource
        number pageViews
    }

    WEBSITE_EVENTS {
        string id PK
        string sessionId FK
        string type
        string page
        string timestamp
    }

    WEBSITE_BLOG_POSTS ||--o{ WEBSITE_MEDIA : "uses"
    WEBSITE_PAGES ||--o{ WEBSITE_MEDIA : "uses"
    WEBSITE_SESSIONS ||--o{ WEBSITE_EVENTS : "contains"
```

---

## 9. Complete Platform Overview (Simplified)

```mermaid
erDiagram
    AUTH_USERS ||--o| CLIENT_COMPANIES : "is_client"
    AUTH_USERS ||--o| CONTRACTOR_PROFILES : "is_contractor"
    AUTH_USERS ||--o| ADMIN_USERS : "is_admin"
    
    CLIENT_COMPANIES ||--o{ CONTRACT_CONTRACTS : "creates"
    CLIENT_COMPANIES ||--|| PAYMENT_ESCROW : "has"
    CLIENT_COMPANIES ||--o{ PAYMENT_PAYROLL : "processes"
    
    CONTRACTOR_PROFILES ||--o{ CONTRACT_CONTRACTS : "signs"
    CONTRACTOR_PROFILES ||--|| CONTRACTOR_WALLET : "has"
    CONTRACTOR_PROFILES ||--o{ KYC_SESSIONS : "completes"
    
    CONTRACT_CONTRACTS ||--o{ CONTRACT_MILESTONES : "has"
    CONTRACT_CONTRACTS ||--o{ CONTRACT_TIMESHEETS : "tracks"
    CONTRACT_CONTRACTS ||--o{ PAYMENT_INVOICES : "generates"
    
    PAYMENT_PAYROLL ||--o{ PAYMENT_PAYROLL_ITEMS : "contains"
    PAYMENT_PAYROLL_ITEMS }o--|| CONTRACTOR_WALLET : "credits"
    CONTRACTOR_WALLET ||--o{ PAYMENT_WITHDRAWALS : "funds"
    
    ADMIN_USERS ||--o{ AUDIT_LOGS : "creates"
    ADMIN_USERS ||--o{ KYC_DOCUMENTS : "reviews"
    
    AUTH_USERS ||--o{ NOTIFICATION_NOTIFICATIONS : "receives"
```

---

## Table Summary

| # | Service | Table Name | Primary Key |
|---|---------|------------|-------------|
| 1 | Auth | `auth-users` | id (UUID) |
| 2 | Auth | `auth-sessions` | id (UUID) |
| 3 | Auth | `auth-password-resets` | id (UUID) |
| 4 | Client | `client-companies` | id (UUID) |
| 5 | Client | `client-documents` | id (UUID) |
| 6 | Client | `client-invitations` | id (UUID) |
| 7 | Contractor | `contractor-profiles` | id (UUID) |
| 8 | Contractor | `contractor-bank-details` | id (UUID) |
| 9 | Contractor | `contractor-tax-info` | id (UUID) |
| 10 | Contractor | `contractor-wallet` | id (UUID) |
| 11 | KYC | `kyc-sessions` | id (UUID) |
| 12 | KYC | `kyc-documents` | id (UUID) |
| 13 | Contract | `contract-contracts` | id (UUID) |
| 14 | Contract | `contract-milestones` | id (UUID) |
| 15 | Contract | `contract-timesheets` | id (UUID) |
| 16 | Payment | `payment-escrow` | id (UUID) |
| 17 | Payment | `payment-payroll` | id (UUID) |
| 18 | Payment | `payment-payroll-items` | id (UUID) |
| 19 | Payment | `payment-invoices` | id (UUID) |
| 20 | Payment | `payment-withdrawals` | id (UUID) |
| 21 | Payment | `payment-transactions` | id (UUID) |
| 22 | Admin | `admin-users` | id (UUID) |
| 23 | Admin | `admin-country-rules` | countryCode |
| 24 | Admin | `admin-system-alerts` | id (UUID) |
| 25 | Audit | `audit-logs` | id + timestamp |
| 26 | Audit | `audit-events` | id + timestamp |
| 27 | Audit | `qldb-ledger` | QLDB (immutable) |
| 28 | Notification | `notification-notifications` | id (UUID) |
| 29 | Notification | `notification-preferences` | id (UUID) |
| 30 | Website | `website-blog-posts` | id (UUID) |
| 31 | Website | `website-pages` | id (UUID) |
| 32 | Website | `website-media` | id (UUID) |
| 33 | Website | `website-contacts` | id (UUID) |
| 34 | Website | `website-demo-requests` | id (UUID) |
| 35 | Website | `website-newsletter` | id (UUID) |
| 36 | Website | `website-sessions` | id (UUID) |
| 37 | Website | `website-events` | id (UUID) |

---

## Quick Stats

| Metric | Count |
|--------|-------|
| **Total DynamoDB Tables** | 37 |
| **AWS QLDB Ledger** | 1 |
| **Microservices** | 10 |
| **User Roles** | 3 (Client, Contractor, Admin) |

---

**Document Version:** 1.0  
**Last Updated:** 2025
