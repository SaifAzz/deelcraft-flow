# Mind-Links Database Schemas & Infrastructure Integration

## Overview

This document provides complete DynamoDB database schemas for both the main platform backend (8 microservices) and the website backend (3 microservices), along with detailed infrastructure integration using Terraform, IAM roles, and AWS SDK configuration.

---

## Main Platform Backend - Database Schemas

### Total: 16 DynamoDB Tables across 8 Services

---

## 1. Auth Service Tables

### Table: `auth-users`

**Purpose:** User accounts and authentication data

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID, primary key
  
  // Attributes
  email: string,                 // Unique, indexed via GSI
  passwordHash: string,          // bcrypt hashed password
  role: 'company' | 'contractor' | 'admin',
  status: 'active' | 'inactive' | 'suspended',
  emailVerified: boolean,
  createdAt: string,             // ISO 8601
  updatedAt: string              // ISO 8601
}
```

**Indexes:**
- **GSI: email-index**
  - Partition Key: `email`
  - Projection: ALL
  - Use Case: Get user by email for login

**Terraform Configuration:**
```hcl
resource "aws_dynamodb_table" "auth_users" {
  name           = "${var.environment}-auth-users"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "email"
    type = "S"
  }

  global_secondary_index {
    name     = "email-index"
    hash_key = "email"
    projection_type = "ALL"
  }

  server_side_encryption {
    enabled     = true
    kms_key_id  = aws_kms_key.dynamodb.arn
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = {
    Service     = "auth-service"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}
```

**Access Patterns:**
1. Get user by ID: `GetItem` with partition key `id`
2. Get user by email: `Query` on GSI `email-index`
3. Create user: `PutItem` with generated UUID
4. Update user: `UpdateItem` with conditional expressions

---

### Table: `auth-sessions`

**Purpose:** Active user sessions and refresh tokens

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID, session ID
  
  // Attributes
  userId: string,                // Reference to auth-users.id
  refreshToken: string,          // JWT refresh token
  ipAddress: string,             // Hashed for privacy
  userAgent: string,
  createdAt: string,             // ISO 8601
  expiresAt: number             // Unix timestamp, TTL attribute
}
```

**Indexes:**
- None (lookup by session ID only)

**TTL:**
- Attribute: `expiresAt`
- Purpose: Automatic cleanup of expired sessions (7 days)

**Terraform Configuration:**
```hcl
resource "aws_dynamodb_table" "auth_sessions" {
  name           = "${var.environment}-auth-sessions"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "expiresAt"
    type = "N"
  }

  ttl {
    attribute_name = "expiresAt"
    enabled        = true
  }

  server_side_encryption {
    enabled     = true
    kms_key_id  = aws_kms_key.dynamodb.arn
  }

  tags = {
    Service     = "auth-service"
    Environment = var.environment
  }
}
```

---

## 2. User Service Tables

### Table: `user-profiles`

**Purpose:** User profile information

**Schema:**
```typescript
{
  // Partition Key
  userId: string,                // UUID, matches auth-users.id
  
  // Attributes
  firstName: string,
  lastName: string,
  phone: string,
  avatarUrl: string,             // S3 URL
  createdAt: string,
  updatedAt: string
}
```

**Indexes:**
- None (lookup by userId only)

---

### Table: `user-preferences`

**Purpose:** User settings and preferences

**Schema:**
```typescript
{
  // Partition Key
  userId: string,                // UUID
  
  // Attributes
  language: string,              // Default: 'en'
  timezone: string,
  notifications: {
    email: boolean,
    sms: boolean,
    push: boolean
  },
  updatedAt: string
}
```

---

## 3. Client Service Tables

### Table: `client-companies`

**Purpose:** Company profiles and verification data

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  userId: string,                // Reference to auth-users.id, indexed
  legalName: string,
  country: string,
  taxId: string,
  verificationStatus: 'pending' | 'verified' | 'rejected',
  businessRegistryData: {
    // From OpenCorporates API
    companyNumber: string,
    jurisdiction: string,
    registeredAddress: string,
    // ... other fields
  },
  createdAt: string,
  updatedAt: string
}
```

**Indexes:**
- **GSI: userId-index**
  - Partition Key: `userId`
  - Projection: ALL
  - Use Case: Get company by user ID

**Terraform Configuration:**
```hcl
resource "aws_dynamodb_table" "client_companies" {
  name           = "${var.environment}-client-companies"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "userId"
    type = "S"
  }

  global_secondary_index {
    name     = "userId-index"
    hash_key = "userId"
    projection_type = "ALL"
  }

  server_side_encryption {
    enabled     = true
    kms_key_id  = aws_kms_key.dynamodb.arn
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = {
    Service     = "client-service"
    Environment = var.environment
  }
}
```

---

### Table: `client-invitations`

**Purpose:** Contractor invitation tokens

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  clientId: string,              // Reference to client-companies.id, indexed
  contractorEmail: string,
  token: string,                 // Unique invitation token, indexed
  status: 'pending' | 'accepted' | 'expired',
  expiresAt: number              // Unix timestamp, TTL attribute
}
```

**Indexes:**
- **GSI: token-index**
  - Partition Key: `token`
  - Projection: ALL
  - Use Case: Validate invitation token
- **GSI: clientId-index**
  - Partition Key: `clientId`
  - Projection: ALL
  - Use Case: List all invitations by client

**TTL:**
- Attribute: `expiresAt`
- Purpose: Automatic cleanup of expired invitations (7 days)

---

## 4. Contractor Service Tables

### Table: `contractor-profiles`

**Purpose:** Contractor profile information

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  userId: string,                // Reference to auth-users.id, indexed
  name: string,
  country: string,
  kycStatus: 'pending' | 'verified' | 'rejected',
  createdAt: string,
  updatedAt: string
}
```

**Indexes:**
- **GSI: userId-index**
  - Partition Key: `userId`
  - Projection: ALL
  - Use Case: Get contractor by user ID

---

### Table: `contractor-bank-details`

**Purpose:** Payment information for contractors

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  contractorId: string,          // Reference to contractor-profiles.id, indexed
  bankName: string,
  accountNumber: string,        // Encrypted
  routingNumber: string,         // Encrypted
  currency: string,              // USD, EUR, AED, EGP, etc.
  createdAt: string,
  updatedAt: string
}
```

**Indexes:**
- **GSI: contractorId-index**
  - Partition Key: `contractorId`
  - Projection: ALL
  - Use Case: Get bank details by contractor

**Security Note:** Account numbers and routing numbers should be encrypted at the application level before storing in DynamoDB.

---

## 5. KYC Service Tables

### Table: `kyc-sessions`

**Purpose:** KYC verification sessions from Veriff/Onfido

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  contractorId: string,          // Reference to contractor-profiles.id, indexed
  veriffSessionId: string,       // From Veriff API
  status: 'pending' | 'processing' | 'verified' | 'rejected', // indexed
  verificationResult: {
    // From Veriff webhook
    status: string,
    code: number,
    reason: string,
    // ... other fields
  },
  documents: [
    {
      type: 'passport' | 'id' | 'selfie' | 'proof_of_address',
      s3Url: string,
      status: 'uploaded' | 'verified' | 'rejected'
    }
  ],
  createdAt: string,
  updatedAt: string
}
```

**Indexes:**
- **GSI: contractorId-index**
  - Partition Key: `contractorId`
  - Projection: ALL
  - Use Case: Get KYC session by contractor
- **GSI: status-index**
  - Partition Key: `status`
  - Projection: ALL
  - Use Case: List pending KYC sessions (admin)

---

### Table: `kyc-documents`

**Purpose:** Individual KYC documents metadata

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  contractorId: string,          // Reference to contractor-profiles.id, indexed
  kycSessionId: string,          // Reference to kyc-sessions.id
  documentType: 'passport' | 'id' | 'selfie' | 'proof_of_address',
  s3Key: string,                 // S3 object key
  s3Url: string,                 // S3 URL (signed URL for access)
  status: 'uploaded' | 'verified' | 'rejected',
  uploadedAt: string
}
```

**Indexes:**
- **GSI: contractorId-index**
  - Partition Key: `contractorId`
  - Projection: ALL
  - Use Case: Get all documents for a contractor

---

## 6. Contract Service Tables

### Table: `contract-contracts`

**Purpose:** Contract documents and lifecycle

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  clientId: string,              // Reference to client-companies.id, indexed
  contractorId: string,          // Reference to contractor-profiles.id, indexed
  type: 'fixed' | 'hourly',
  currency: 'USD' | 'EUR' | 'AED' | 'EGP',
  rate: number,                  // Rate per hour or fixed amount
  startDate: string,             // ISO 8601
  endDate: string,               // ISO 8601, optional
  status: 'draft' | 'pending' | 'client_signed' | 'contractor_signed' | 'active' | 'completed' | 'cancelled', // indexed
  clientSignedAt: string,        // ISO 8601, optional
  contractorSignedAt: string,     // ISO 8601, optional
  pdfUrl: string,                // S3 URL
  createdAt: string,
  updatedAt: string
}
```

**Indexes:**
- **GSI: clientId-index**
  - Partition Key: `clientId`
  - Projection: ALL
  - Use Case: Get all contracts for a client
- **GSI: contractorId-index**
  - Partition Key: `contractorId`
  - Projection: ALL
  - Use Case: Get all contracts for a contractor
- **GSI: status-index**
  - Partition Key: `status`
  - Projection: ALL
  - Use Case: List contracts by status (admin)

**Terraform Configuration:**
```hcl
resource "aws_dynamodb_table" "contract_contracts" {
  name           = "${var.environment}-contract-contracts"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "clientId"
    type = "S"
  }

  attribute {
    name = "contractorId"
    type = "S"
  }

  attribute {
    name = "status"
    type = "S"
  }

  global_secondary_index {
    name     = "clientId-index"
    hash_key = "clientId"
    projection_type = "ALL"
  }

  global_secondary_index {
    name     = "contractorId-index"
    hash_key = "contractorId"
    projection_type = "ALL"
  }

  global_secondary_index {
    name     = "status-index"
    hash_key = "status"
    projection_type = "ALL"
  }

  server_side_encryption {
    enabled     = true
    kms_key_id  = aws_kms_key.dynamodb.arn
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = {
    Service     = "contract-service"
    Environment = var.environment
  }
}
```

---

### Table: `contract-templates`

**Purpose:** Contract templates for PDF generation

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  name: string,                  // Template name
  type: 'fixed' | 'hourly',      // indexed
  templateContent: string,        // HTML/Markdown template
  variables: string[],            // List of placeholder variables
  isDefault: boolean,
  createdAt: string,
  updatedAt: string
}
```

**Indexes:**
- **GSI: type-index**
  - Partition Key: `type`
  - Projection: ALL
  - Use Case: Get templates by contract type

---

## 7. Payment Service Tables

### Table: `payment-transactions`

**Purpose:** Payment transaction records

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  contractId: string,            // Reference to contract-contracts.id, indexed
  contractorId: string,          // Reference to contractor-profiles.id, indexed
  clientId: string,              // Reference to client-companies.id
  amount: number,
  currency: string,
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled', // indexed
  stripePaymentId: string,       // From Stripe API
  createdAt: string,
  updatedAt: string
}
```

**Indexes:**
- **GSI: contractId-index**
  - Partition Key: `contractId`
  - Projection: ALL
  - Use Case: Get all payments for a contract
- **GSI: contractorId-index**
  - Partition Key: `contractorId`
  - Projection: ALL
  - Use Case: Get payment history for contractor
- **GSI: status-index**
  - Partition Key: `status`
  - Projection: ALL
  - Use Case: List pending payments (admin)

---

### Table: `payment-escrow`

**Purpose:** Escrow balance tracking per contract

**Schema:**
```typescript
{
  // Partition Key
  contractId: string,            // UUID, matches contract-contracts.id
  
  // Attributes
  contractorId: string,
  clientId: string,
  balance: number,               // Current escrow balance
  currency: string,
  transactions: [
    {
      transactionId: string,
      type: 'deposit' | 'withdrawal' | 'payment',
      amount: number,
      timestamp: string
    }
  ],
  updatedAt: string
}
```

**Indexes:**
- None (lookup by contractId only)

---

## 8. Notification Service Tables

### Table: `notification-notifications`

**Purpose:** In-app notifications for users

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  userId: string,                // Reference to auth-users.id, indexed
  type: 'email' | 'sms' | 'in_app',
  title: string,
  message: string,
  read: boolean,                 // indexed
  createdAt: string
}
```

**Indexes:**
- **GSI: userId-index**
  - Partition Key: `userId`
  - Projection: ALL
  - Use Case: Get all notifications for a user
- **GSI: read-index**
  - Partition Key: `read`
  - Sort Key: `userId`
  - Projection: ALL
  - Use Case: Get unread notifications for a user

---

### Table: `notification-templates`

**Purpose:** Email and SMS notification templates

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  name: string,                  // Template name
  type: 'email' | 'sms',         // indexed
  subject: string,               // For email
  body: string,                  // HTML/text template
  variables: string[],            // List of placeholder variables
  createdAt: string,
  updatedAt: string
}
```

**Indexes:**
- **GSI: type-index**
  - Partition Key: `type`
  - Projection: ALL
  - Use Case: Get templates by type

---

## Website Backend - Database Schemas

### Total: 9 DynamoDB Tables across 3 Services

---

## 1. Content Service Tables

### Table: `website-blog-posts`

**Purpose:** Blog post content and metadata

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  title: string,
  slug: string,                  // Unique, indexed
  excerpt: string,
  content: string,                // Markdown or HTML
  author: string,
  category: string,               // indexed
  tags: string[],
  featuredImage: string,          // S3 URL
  status: 'draft' | 'published' | 'archived', // indexed
  publishedAt: string,            // ISO 8601
  seoTitle: string,
  seoDescription: string,
  seoKeywords: string[],
  createdAt: string,
  updatedAt: string
}
```

**Indexes:**
- **GSI: slug-index** - Get post by slug (public API)
- **GSI: status-index** - List published posts
- **GSI: category-index** - Get posts by category

**Terraform Configuration:**
```hcl
resource "aws_dynamodb_table" "website_blog_posts" {
  name           = "${var.environment}-website-blog-posts"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "slug"
    type = "S"
  }

  attribute {
    name = "status"
    type = "S"
  }

  attribute {
    name = "category"
    type = "S"
  }

  global_secondary_index {
    name     = "slug-index"
    hash_key = "slug"
    projection_type = "ALL"
  }

  global_secondary_index {
    name     = "status-index"
    hash_key = "status"
    projection_type = "ALL"
  }

  global_secondary_index {
    name     = "category-index"
    hash_key = "category"
    projection_type = "ALL"
  }

  server_side_encryption {
    enabled     = true
    kms_key_id  = aws_kms_key.dynamodb.arn
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = {
    Service     = "content-service"
    Environment = var.environment
  }
}
```

---

### Table: `website-pages`

**Purpose:** Static page content

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  slug: string,                  // Unique, indexed (e.g., 'home', 'about', 'pricing')
  title: string,
  content: string,               // HTML content
  template: string,               // 'home' | 'about' | 'services' | 'pricing'
  seoTitle: string,
  seoDescription: string,
  status: 'draft' | 'published',  // indexed
  createdAt: string,
  updatedAt: string
}
```

**Indexes:**
- **GSI: slug-index** - Get page by slug (public API)
- **GSI: status-index** - List published pages

---

### Table: `website-media`

**Purpose:** Media files metadata (images, documents)

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  filename: string,
  originalName: string,
  mimeType: string,
  size: number,                  // bytes
  s3Key: string,                 // S3 object key
  s3Url: string,                 // CloudFront URL
  type: 'image' | 'document' | 'video', // indexed
  alt: string,                   // For images (SEO)
  uploadedAt: string,           // indexed
  uploadedBy: string             // Admin user ID
}
```

**Indexes:**
- **GSI: type-index** - List media by type
- **GSI: uploadedAt-index** - List recent uploads

---

## 2. Lead Service Tables

### Table: `website-contacts`

**Purpose:** Contact form submissions

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  name: string,
  email: string,                  // indexed
  company: string,                // optional
  phone: string,                  // optional
  message: string,
  source: string,                 // 'website' | 'landing-page' | 'referral'
  status: 'new' | 'contacted' | 'qualified' | 'converted', // indexed
  createdAt: string,             // indexed
  updatedAt: string
}
```

**Indexes:**
- **GSI: email-index** - Check if email already submitted
- **GSI: status-index** - List leads by status (admin)
- **GSI: createdAt-index** - List recent leads

---

### Table: `website-demo-requests`

**Purpose:** Demo request submissions

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  name: string,
  email: string,                  // indexed
  company: string,
  companySize: '1-10' | '11-50' | '51-200' | '201+',
  useCase: string,
  preferredDate: string,         // ISO 8601, indexed
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled', // indexed
  notes: string,                 // Admin notes
  createdAt: string,
  updatedAt: string
}
```

**Indexes:**
- **GSI: email-index** - Check existing requests
- **GSI: status-index** - List pending requests
- **GSI: preferredDate-index** - Schedule demos

---

### Table: `website-newsletter-subscriptions`

**Purpose:** Newsletter email subscriptions

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  email: string,                  // Unique, indexed
  name: string,                   // optional
  source: string,                 // 'website' | 'landing-page'
  status: 'pending' | 'verified' | 'unsubscribed', // indexed
  verificationToken: string,      // For email verification
  verifiedAt: string,             // ISO 8601, optional
  subscribedAt: string,          // ISO 8601
  unsubscribedAt: string         // ISO 8601, optional
}
```

**Indexes:**
- **GSI: email-index** - Unique constraint, get subscription by email
- **GSI: status-index** - List verified subscribers

---

## 3. Analytics Service Tables

### Table: `website-events`

**Purpose:** Event tracking (page views, clicks, conversions)

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  type: string,                   // 'pageview' | 'click' | 'conversion' | 'form_submit', indexed
  sessionId: string,              // indexed
  userId: string,                 // optional, if logged in
  page: string,                   // URL path
  properties: {
    // Custom event properties (Map)
    buttonId: string,
    element: string,
    // ... other custom fields
  },
  timestamp: string,             // ISO 8601, indexed
  expiresAt: number              // Unix timestamp, TTL (90 days)
}
```

**Indexes:**
- **GSI: sessionId-index** - Get all events for a session
- **GSI: type-index** - List events by type
- **GSI: timestamp-index** - Time-series queries

**TTL:**
- Attribute: `expiresAt`
- Purpose: Automatic cleanup after 90 days

---

### Table: `website-sessions`

**Purpose:** User session tracking

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID, session ID
  
  // Attributes
  userId: string,                 // optional, indexed
  startTime: string,             // ISO 8601, indexed
  endTime: string,               // ISO 8601
  duration: number,              // seconds
  pageViews: number,
  referrer: string,
  userAgent: string,
  ipAddress: string,             // Hashed for privacy
  country: string,
  device: 'desktop' | 'mobile' | 'tablet',
  expiresAt: number              // Unix timestamp, TTL (30 days)
}
```

**Indexes:**
- **GSI: userId-index** - Get sessions for a user
- **GSI: startTime-index** - Time-series queries

**TTL:**
- Attribute: `expiresAt`
- Purpose: Automatic cleanup after 30 days

---

### Table: `website-metrics`

**Purpose:** Aggregated analytics metrics

**Schema:**
```typescript
{
  // Partition Key
  id: string,                    // UUID
  
  // Attributes
  date: string,                  // YYYY-MM-DD, indexed
  metric: string,                // 'pageviews' | 'unique_visitors' | 'conversions', indexed
  value: number,
  dimensions: {
    // Map of dimension values
    page: string,
    country: string,
    device: string,
    // ... other dimensions
  },
  createdAt: string
}
```

**Indexes:**
- **GSI: date-index** - Get metrics by date
- **GSI: metric-index**
  - Partition Key: `metric`
  - Sort Key: `date`
  - Projection: ALL
  - Use Case: Time-series metrics queries

---

## Infrastructure Integration

### 1. Terraform Module Structure

**Directory Structure:**
```
terraform/
├── modules/
│   ├── dynamodb/
│   │   ├── main.tf              # Table definitions
│   │   ├── variables.tf          # Input variables
│   │   ├── outputs.tf            # Table names/ARNs
│   │   └── versions.tf           # Provider versions
│   ├── iam/
│   │   ├── main.tf              # IAM roles and policies
│   │   └── variables.tf
│   └── ecs/
│       ├── main.tf              # ECS services
│       └── variables.tf
├── environments/
│   ├── dev/
│   │   └── main.tf              # Dev environment config
│   ├── staging/
│   │   └── main.tf              # Staging environment config
│   └── prod/
│       └── main.tf              # Production environment config
└── main.tf                      # Root module
```

### 2. IAM Roles & Permissions

**ECS Task Role Pattern:**
Each service has its own IAM role with least-privilege access to only its tables.

**Example: Contract Service IAM Role**
```hcl
resource "aws_iam_role" "contract_service_role" {
  name = "mindlinks-contract-service-role-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy" "contract_service_dynamodb" {
  name = "contract-service-dynamodb-policy"
  role = aws_iam_role.contract_service_role.id

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
          "dynamodb:Scan",
          "dynamodb:BatchGetItem",
          "dynamodb:BatchWriteItem",
          "dynamodb:TransactWriteItems"
        ]
        Resource = [
          aws_dynamodb_table.contract_contracts.arn,
          "${aws_dynamodb_table.contract_contracts.arn}/index/*",
          aws_dynamodb_table.contract_templates.arn,
          "${aws_dynamodb_table.contract_templates.arn}/index/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy" "contract_service_s3" {
  name = "contract-service-s3-policy"
  role = aws_iam_role.contract_service_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:PutObjectAcl"
        ]
        Resource = "${aws_s3_bucket.contract_pdfs.arn}/*"
      },
      {
        Effect = "Allow"
        Action = [
          "s3:ListBucket"
        ]
        Resource = aws_s3_bucket.contract_pdfs.arn
      }
    ]
  })
}
```

### 3. Service-to-Database Connection

**NestJS DynamoDB Client Setup:**
```typescript
// src/config/dynamodb.config.ts
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  // Credentials automatically from IAM role (ECS task role)
  // No need to provide credentials explicitly
});

export const dynamoClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertEmptyValues: false,
  },
  unmarshallOptions: {
    wrapNumbers: false,
  },
});
```

**Service Implementation Example:**
```typescript
// src/services/contract.service.ts
import { Injectable } from '@nestjs/common';
import { dynamoClient } from '../config/dynamodb.config';

@Injectable()
export class ContractService {
  private readonly contractsTable = process.env.CONTRACT_TABLE_NAME;
  private readonly templatesTable = process.env.CONTRACT_TEMPLATES_TABLE_NAME;

  async getContractById(id: string) {
    const result = await dynamoClient.get({
      TableName: this.contractsTable,
      Key: { id }
    });
    return result.Item;
  }

  async getContractsByClient(clientId: string) {
    const result = await dynamoClient.query({
      TableName: this.contractsTable,
      IndexName: 'clientId-index',
      KeyConditionExpression: 'clientId = :clientId',
      ExpressionAttributeValues: {
        ':clientId': clientId
      }
    });
    return result.Items || [];
  }

  async createContract(contractData: CreateContractDto) {
    const contract = {
      id: uuidv4(),
      ...contractData,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await dynamoClient.put({
      TableName: this.contractsTable,
      Item: contract
    });

    return contract;
  }

  async updateContractStatus(id: string, status: string) {
    const result = await dynamoClient.update({
      TableName: this.contractsTable,
      Key: { id },
      UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':status': status,
        ':updatedAt': new Date().toISOString()
      },
      ReturnValues: 'ALL_NEW'
    });
    return result.Attributes;
  }
}
```

### 4. ECS Task Definition with Environment Variables

**Terraform Configuration:**
```hcl
resource "aws_ecs_task_definition" "contract_service" {
  family                   = "mindlinks-contract-service-${var.environment}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"   # 0.5 vCPU
  memory                   = "1024"  # 1 GB

  execution_role_arn = aws_iam_role.ecs_execution_role.arn
  task_role_arn      = aws_iam_role.contract_service_role.arn

  container_definitions = jsonencode([{
    name  = "contract-service"
    image = "${aws_ecr_repository.contract_service.repository_url}:latest"

    portMappings = [{
      containerPort = 3006
      protocol      = "tcp"
    }]

    environment = [
      {
        name  = "AWS_REGION"
        value = var.aws_region
      },
      {
        name  = "NODE_ENV"
        value = var.environment
      },
      {
        name  = "SERVICE_NAME"
        value = "contract-service"
      },
      {
        name  = "SERVICE_PORT"
        value = "3006"
      }
    ]

    secrets = [
      {
        name      = "CONTRACT_TABLE_NAME"
        valueFrom = aws_ssm_parameter.contract_table_name.arn
      },
      {
        name      = "CONTRACT_TEMPLATES_TABLE_NAME"
        valueFrom = aws_ssm_parameter.contract_templates_table_name.arn
      },
      {
        name      = "S3_BUCKET_NAME"
        valueFrom = aws_ssm_parameter.contract_pdfs_bucket.arn
      },
      {
        name      = "REDIS_HOST"
        valueFrom = aws_ssm_parameter.redis_host.arn
      },
      {
        name      = "JWT_SECRET"
        valueFrom = aws_secretsmanager_secret.jwt_secret.arn
      }
    ]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.contract_service.name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "ecs"
      }
    }

    healthCheck = {
      command     = ["CMD-SHELL", "curl -f http://localhost:3006/health || exit 1"]
      interval    = 30
      timeout     = 5
      retries     = 3
      startPeriod = 60
    }
  }])
}
```

### 5. AWS Systems Manager Parameter Store

**Store Table Names as Parameters:**
```hcl
# Store DynamoDB table names in Parameter Store
resource "aws_ssm_parameter" "contract_table_name" {
  name  = "/mindlinks/${var.environment}/dynamodb/contract-contracts"
  type  = "String"
  value = aws_dynamodb_table.contract_contracts.name

  tags = {
    Environment = var.environment
    Service     = "contract-service"
  }
}

resource "aws_ssm_parameter" "contract_templates_table_name" {
  name  = "/mindlinks/${var.environment}/dynamodb/contract-templates"
  type  = "String"
  value = aws_dynamodb_table.contract_templates.name

  tags = {
    Environment = var.environment
    Service     = "contract-service"
  }
}
```

**IAM Permission for Parameter Store:**
```hcl
resource "aws_iam_role_policy" "contract_service_ssm" {
  name = "contract-service-ssm-policy"
  role = aws_iam_role.contract_service_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ssm:GetParameter",
          "ssm:GetParameters",
          "ssm:GetParametersByPath"
        ]
        Resource = [
          "arn:aws:ssm:${var.aws_region}:${data.aws_caller_identity.current.account_id}:parameter/mindlinks/${var.environment}/*"
        ]
      }
    ]
  })
}
```

### 6. DynamoDB Streams (Optional, for Event-Driven Updates)

**Enable Streams for Critical Tables:**
```hcl
resource "aws_dynamodb_table" "contract_contracts" {
  # ... existing configuration ...

  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  # ... rest of configuration ...
}

# Lambda function to process stream events
resource "aws_lambda_event_source_mapping" "contract_stream" {
  event_source_arn  = aws_dynamodb_table.contract_contracts.stream_arn
  function_name     = aws_lambda_function.contract_stream_processor.arn
  starting_position = "LATEST"
}
```

---

## Access Patterns Reference

### Main Platform Backend

| Query Pattern | Table | Index | Use Case |
|--------------|-------|-------|----------|
| Get user by email | auth-users | email-index | Login flow |
| Get user by ID | auth-users | Primary key | User lookup |
| Get company by user | client-companies | userId-index | Client dashboard |
| Get contracts by client | contract-contracts | clientId-index | Client contract list |
| Get contracts by contractor | contract-contracts | contractorId-index | Contractor contract list |
| Get KYC by contractor | kyc-sessions | contractorId-index | KYC status check |
| Get payments by contract | payment-transactions | contractId-index | Payment history |
| Get unread notifications | notification-notifications | read-index | Notification badge |

### Website Backend

| Query Pattern | Table | Index | Use Case |
|--------------|-------|-------|----------|
| Get blog post by slug | website-blog-posts | slug-index | Public blog page |
| Get published posts | website-blog-posts | status-index | Blog listing |
| Get posts by category | website-blog-posts | category-index | Category page |
| Get page by slug | website-pages | slug-index | Public page |
| Get contact by email | website-contacts | email-index | Duplicate check |
| Get demo requests | website-demo-requests | status-index | Admin dashboard |
| Get events by session | website-events | sessionId-index | Session analysis |
| Get metrics by date | website-metrics | date-index | Analytics dashboard |

---

## Infrastructure Deployment Flow

### Step 1: Create DynamoDB Tables
```bash
# Using Terraform
cd terraform/environments/dev
terraform init
terraform plan
terraform apply
```

### Step 2: Create IAM Roles
```bash
# IAM roles are created automatically by Terraform
# Each service gets its own role with table-specific permissions
```

### Step 3: Store Table Names in Parameter Store
```bash
# Table names stored in SSM Parameter Store
# Services read from Parameter Store at startup
```

### Step 4: Deploy ECS Services
```bash
# ECS services reference IAM roles and environment variables
# DynamoDB client automatically uses IAM role credentials
```

### Step 5: Verify Connection
```bash
# Health check endpoint tests DynamoDB connectivity
# GET /health → Checks all dependencies (DynamoDB, Redis, S3)
```

---

## Monitoring & Observability

### CloudWatch Metrics

**DynamoDB Metrics (Automatic):**
- `ConsumedReadCapacityUnits`
- `ConsumedWriteCapacityUnits`
- `ThrottledRequests`
- `UserErrors`
- `SystemErrors`

**Custom Application Metrics:**
- Query latency per table
- Cache hit rate
- Error rate by operation type

### CloudWatch Alarms

```hcl
resource "aws_cloudwatch_metric_alarm" "dynamodb_throttling" {
  alarm_name          = "dynamodb-throttling-${var.environment}"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ThrottledRequests"
  namespace           = "AWS/DynamoDB"
  period              = "60"
  statistic           = "Sum"
  threshold           = "10"
  alarm_description   = "Alert when DynamoDB throttling occurs"
  alarm_actions       = [aws_sns_topic.alerts.arn]

  dimensions = {
    TableName = aws_dynamodb_table.contract_contracts.name
  }
}
```

---

## Security Best Practices

### 1. Encryption

**At Rest:**
- All tables encrypted with AWS KMS
- Customer-managed KMS keys
- Key rotation enabled

**In Transit:**
- All API calls use HTTPS
- DynamoDB API uses TLS 1.2+

### 2. Access Control

**IAM Roles:**
- Least privilege principle
- Service-specific roles
- No cross-service table access (unless needed)

**VPC Endpoints:**
- DynamoDB VPC endpoint for private access
- No internet gateway required
- Reduced data transfer costs

### 3. Data Protection

**PII Handling:**
- Email addresses: Can be hashed in analytics tables
- IP addresses: Hashed for privacy
- Bank details: Encrypted at application level

**Backup & Recovery:**
- Point-in-time recovery enabled
- Regular backups (automated)
- Cross-region replication (optional, for DR)

---

## Cost Optimization

### DynamoDB On-Demand Billing

**Benefits:**
- Pay per request (no capacity planning)
- Automatic scaling
- No minimum charges

**Cost Estimate (Monthly):**
- 16 tables × ~$0.25/table = ~$4/month (base)
- Requests: ~$1.25 per million reads, ~$1.25 per million writes
- Storage: ~$0.25 per GB
- **Total: ~$20-50/month** (depending on traffic)

### Optimization Strategies

1. **Caching:** Redis cache for frequently accessed data (reduces DynamoDB reads)
2. **Batch Operations:** BatchGetItem, BatchWriteItem for bulk operations
3. **Projection Expressions:** Only fetch needed attributes
4. **GSI Optimization:** Only project needed attributes to GSIs

---

## Migration & Data Management

### Initial Data Seeding

**Seed Script Example:**
```typescript
// scripts/seed-dynamodb.ts
import { dynamoClient } from '../src/config/dynamodb.config';

async function seedData() {
  // Seed contract templates
  const templates = [
    {
      id: uuidv4(),
      name: 'Fixed Contract Template',
      type: 'fixed',
      templateContent: '...',
      isDefault: true,
      createdAt: new Date().toISOString()
    },
    // ... more templates
  ];

  for (const template of templates) {
    await dynamoClient.put({
      TableName: process.env.CONTRACT_TEMPLATES_TABLE_NAME,
      Item: template
    });
  }
}
```

### Data Migration

**Export/Import:**
- Use AWS Data Pipeline or DMS for large migrations
- Or custom scripts with batch operations
- Test in staging first

---

## Summary

### Main Platform Backend
- **16 DynamoDB Tables** across 8 services
- **24+ Global Secondary Indexes** for query optimization
- **2 Tables with TTL** (auth-sessions, website-events)
- **On-demand billing** for flexibility
- **KMS encryption** for all tables

### Website Backend
- **9 DynamoDB Tables** across 3 services
- **15+ Global Secondary Indexes**
- **2 Tables with TTL** (website-events, website-sessions)
- **Optimized for high read traffic** with Redis caching

### Infrastructure Integration
- **Terraform** for Infrastructure as Code
- **IAM Roles** with least-privilege access
- **Parameter Store** for configuration
- **CloudWatch** for monitoring
- **VPC Endpoints** for private access

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-XX  
**Status:** Complete Database Schema Documentation

