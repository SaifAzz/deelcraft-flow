# Mind-Links Backend Microservices Architecture - Visualization Diagrams

## Overview

This document contains comprehensive visualization diagrams for the Mind-Links backend microservices architecture integrated with AWS infrastructure. The architecture consists of 8 independent microservices deployed on AWS ECS Fargate with API Gateway, service discovery, and distributed data storage.

---

## 1. Complete System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        CD[Client Dashboard<br/>Next.js]
        COD[Contractor Dashboard<br/>Next.js]
        AD[Admin Dashboard<br/>Next.js]
    end

    subgraph "API Gateway Layer"
        AG[AWS API Gateway<br/>REST API<br/>api.mindlinks.com]
    end

    subgraph "Load Balancer"
        ALB[Application Load Balancer<br/>Internal Routing]
    end

    subgraph "Microservices Layer - ECS Fargate"
        AS[Auth Service<br/>:3001<br/>ECS: auth-service]
        US[User Service<br/>:3002<br/>ECS: user-service]
        CS[Client Service<br/>:3003<br/>ECS: client-service]
        COS[Contractor Service<br/>:3004<br/>ECS: contractor-service]
        KS[KYC Service<br/>:3005<br/>ECS: kyc-service]
        CTS[Contract Service<br/>:3006<br/>ECS: contract-service]
        SS[Signature Service<br/>:3007<br/>ECS: signature-service]
        LS[Ledger Service<br/>:3008<br/>ECS: ledger-service]
        PS[Payment Service<br/>:3009<br/>ECS: payment-service]
        NS[Notification Service<br/>:3010<br/>ECS: notification-service]
        ADS[Admin Service<br/>:3011<br/>ECS: admin-service]
    end

    subgraph "Service Discovery"
        SD[AWS Cloud Map<br/>Service Registry<br/>mindlinks.internal]
    end

    subgraph "Event Bus"
        EB[AWS EventBridge<br/>Event-Driven Communication]
    end

    subgraph "Data Layer"
        subgraph "DynamoDB Tables"
            DBA[auth-users<br/>auth-sessions]
            DBU[user-profiles<br/>user-preferences]
            DBC[client-companies<br/>client-invitations]
            DBCO[contractor-profiles<br/>contractor-bank-details]
            DBK[kyc-sessions<br/>kyc-documents]
            DBCT[contract-contracts<br/>contract-templates]
            DBP[payment-transactions<br/>payment-escrow]
            DBN[notification-notifications<br/>notification-templates]
        end
        QLDB[Amazon QLDB<br/>Immutable Ledger<br/>contract-signatures<br/>contract-activations]
        REDIS[ElastiCache Redis<br/>Sessions & Cache]
        S3[AWS S3<br/>Document Storage<br/>Contracts & KYC Docs]
    end

    subgraph "External Services"
        VERIFF[Veriff/Onfido<br/>KYC Verification]
        STRIPE[Stripe<br/>Payment Processing]
        SENDGRID[SendGrid<br/>Email Notifications]
        OPCORP[OpenCorporates<br/>Business Registry]
    end

    subgraph "Monitoring & Observability"
        CW[CloudWatch<br/>Logs & Metrics]
        XRAY[AWS X-Ray<br/>Distributed Tracing]
    end

    CD --> AG
    COD --> AG
    AD --> AG

    AG --> ALB
    ALB --> AS
    ALB --> US
    ALB --> CS
    ALB --> COS
    ALB --> KS
    ALB --> CTS
    ALB --> SS
    ALB --> LS
    ALB --> PS
    ALB --> NS
    ALB --> ADS

    AS -.-> SD
    US -.-> SD
    CS -.-> SD
    COS -.-> SD
    KS -.-> SD
    CTS -.-> SD
    SS -.-> SD
    LS -.-> SD
    PS -.-> SD
    NS -.-> SD
    ADS -.-> SD

    AS --> DBA
    US --> DBU
    CS --> DBC
    COS --> DBCO
    KS --> DBK
    CTS --> DBCT
    PS --> DBP
    NS --> DBN

    AS --> REDIS
    NS --> REDIS

    SS --> QLDB
    LS --> QLDB

    KS --> S3
    CTS --> S3

    KS --> VERIFF
    PS --> STRIPE
    NS --> SENDGRID
    CS --> OPCORP

    AS --> EB
    US --> EB
    CS --> EB
    COS --> EB
    KS --> EB
    CTS --> EB
    SS --> EB
    LS --> EB
    PS --> EB
    NS --> EB

    AS --> CW
    US --> CW
    CS --> CW
    COS --> CW
    KS --> CW
    CTS --> CW
    SS --> CW
    LS --> CW
    PS --> CW
    NS --> CW
    ADS --> CW

    AS --> XRAY
    US --> XRAY
    CS --> XRAY
    CTS --> XRAY
    PS --> XRAY
```

---

## 2. Service Communication Flow

```mermaid
sequenceDiagram
    participant Client
    participant API Gateway
    participant Auth Service
    participant User Service
    participant Client Service
    participant Contractor Service
    participant Contract Service
    participant Signature Service
    participant Ledger Service
    participant Payment Service
    participant Notification Service
    participant EventBridge

    Note over Client,EventBridge: User Registration & Company Setup Flow

    Client->>API Gateway: POST /v1/auth/register
    API Gateway->>Auth Service: Register user
    Auth Service->>Auth Service: Create user in DynamoDB
    Auth Service->>EventBridge: Publish: user.created
    Auth Service->>Notification Service: Send verification email
    Auth Service-->>API Gateway: JWT tokens
    API Gateway-->>Client: Registration success

    Client->>API Gateway: POST /v1/clients/register
    API Gateway->>Client Service: Register company
    Client Service->>Auth Service: Validate user (internal)
    Client Service->>Client Service: Create company in DynamoDB
    Client Service->>OPCORP: Verify business registry
    Client Service->>EventBridge: Publish: company.registered
    Client Service-->>API Gateway: Company created
    API Gateway-->>Client: Company registered

    Note over Client,EventBridge: Contractor Invitation Flow

    Client->>API Gateway: POST /v1/clients/invite-contractor
    API Gateway->>Client Service: Create invitation
    Client Service->>Client Service: Generate token, save to DynamoDB
    Client Service->>Notification Service: Send invitation email
    Client Service->>EventBridge: Publish: invitation.created
    Client Service-->>API Gateway: Invitation sent
    API Gateway-->>Client: Success

    Note over Client,EventBridge: Contract Creation & Signing Flow

    Client->>API Gateway: POST /v1/contracts
    API Gateway->>Contract Service: Create contract
    Contract Service->>Client Service: Validate client (internal)
    Contract Service->>Contractor Service: Validate contractor (internal)
    Contract Service->>Contract Service: Create contract in DynamoDB
    Contract Service->>Contract Service: Generate PDF, upload to S3
    Contract Service->>EventBridge: Publish: contract.created
    Contract Service->>Notification Service: Notify contractor
    Contract Service-->>API Gateway: Contract created
    API Gateway-->>Client: Contract ID

    Client->>API Gateway: POST /v1/signatures/contracts/:id/sign
    API Gateway->>Signature Service: Sign contract
    Signature Service->>Contract Service: Get contract (internal)
    Signature Service->>Signature Service: Record signature in QLDB
    Signature Service->>EventBridge: Publish: signature.client-signed
    Signature Service->>Contract Service: Update status (internal)
    Signature Service->>Notification Service: Notify contractor
    Signature Service-->>API Gateway: Signed
    API Gateway-->>Client: Success

    Note over Client,EventBridge: Event-Driven Contract Activation

    EventBridge->>Ledger Service: signature.completed event
    Ledger Service->>Contract Service: Get contract details (internal)
    Ledger Service->>Ledger Service: Record activation in QLDB
    Ledger Service->>EventBridge: Publish: ledger.contract-activated
    Ledger Service->>Payment Service: Create payment schedule (internal)
    Ledger Service->>Notification Service: Notify both parties
```

---

## 3. Infrastructure Components

```mermaid
graph TB
    subgraph "VPC - mindlinks-vpc"
        subgraph "Public Subnets"
            IGW[Internet Gateway]
            NAT[NAT Gateway]
        end

        subgraph "Private Subnets - Application"
            subgraph "ECS Cluster - mindlinks-cluster"
                subgraph "Auth Service Tasks"
                    AST1[Task 1<br/>0.25 vCPU<br/>512 MB]
                    AST2[Task 2<br/>0.25 vCPU<br/>512 MB]
                end
                subgraph "Contract Service Tasks"
                    CTST1[Task 1<br/>0.5 vCPU<br/>1 GB]
                    CTST2[Task 2<br/>0.5 vCPU<br/>1 GB]
                end
                subgraph "Payment Service Tasks"
                    PST1[Task 1<br/>0.5 vCPU<br/>1 GB]
                    PST2[Task 2<br/>0.5 vCPU<br/>1 GB]
                end
                subgraph "Other Services"
                    OTHERS[User, Client, Contractor<br/>KYC, Signature, Ledger<br/>Notification, Admin Services]
                end
            end
        end

        subgraph "Private Subnets - Data"
            subgraph "DynamoDB"
                DDB1[DynamoDB Tables<br/>On-Demand Billing<br/>Encryption at Rest]
            end
            subgraph "ElastiCache"
                REDIS1[Redis Cluster<br/>cache.t3.micro<br/>Single Node]
            end
            subgraph "QLDB"
                QLDB1[QLDB Ledger<br/>mindlinks-contracts-ledger]
            end
        end

        subgraph "Load Balancers"
            ALB1[Application Load Balancer<br/>Internal Service Routing<br/>Target Groups per Service]
            ALB2[Application Load Balancer<br/>API Gateway Integration]
        end
    end

    subgraph "AWS Services - Regional"
        AG1[API Gateway<br/>REST API<br/>Custom Domain<br/>SSL Certificate]
        SD1[Cloud Map<br/>Service Discovery<br/>Private DNS]
        EB1[EventBridge<br/>Event Bus<br/>Rules & Targets]
        S31[S3 Buckets<br/>Documents Storage<br/>Versioning Enabled]
        CW1[CloudWatch<br/>Logs, Metrics, Alarms]
        XRAY1[X-Ray<br/>Distributed Tracing]
        ECR1[ECR Repositories<br/>Container Images<br/>Per Service]
    end

    subgraph "CI/CD"
        GH[GitHub<br/>Source Code]
        GHA[GitHub Actions<br/>CI/CD Pipelines]
        ECR2[ECR<br/>Push Images]
    end

    IGW --> AG1
    AG1 --> ALB2
    ALB2 --> ALB1
    ALB1 --> AST1
    ALB1 --> AST2
    ALB1 --> CTST1
    ALB1 --> CTST2
    ALB1 --> PST1
    ALB1 --> PST2
    ALB1 --> OTHERS

    AST1 -.-> SD1
    CTST1 -.-> SD1
    PST1 -.-> SD1
    OTHERS -.-> SD1

    AST1 --> EB1
    CTST1 --> EB1
    PST1 --> EB1
    OTHERS --> EB1

    AST1 --> DDB1
    CTST1 --> DDB1
    PST1 --> DDB1
    OTHERS --> DDB1

    AST1 --> REDIS1
    OTHERS --> REDIS1

    OTHERS --> QLDB1
    OTHERS --> S31

    AST1 --> CW1
    CTST1 --> CW1
    PST1 --> CW1
    OTHERS --> CW1

    AST1 --> XRAY1
    CTST1 --> XRAY1
    PST1 --> XRAY1

    GH --> GHA
    GHA --> ECR2
    ECR2 --> ECR1
```

---

## 4. Service-to-Service Communication Patterns

```mermaid
graph LR
    subgraph "Synchronous Communication - HTTP REST"
        S1[Service A] -->|HTTP Request<br/>Service Discovery| SD[Cloud Map<br/>DNS Resolution]
        SD -->|Resolve to<br/>service-b.internal| S2[Service B]
        S2 -->|HTTP Response| S1
    end

    subgraph "Asynchronous Communication - EventBridge"
        S3[Service A] -->|Publish Event<br/>user.created| EB[EventBridge<br/>Event Bus]
        EB -->|Event Rule| S4[Service B<br/>Event Listener]
        EB -->|Event Rule| S5[Service C<br/>Event Listener]
    end

    subgraph "Circuit Breaker Pattern"
        S6[Service A] -->|Request| CB[Circuit Breaker<br/>Resilience4j]
        CB -->|Open/Closed| S7[Service B]
        CB -->|Fallback| FB[Fallback Handler]
    end

    subgraph "Retry Pattern"
        S8[Service A] -->|Request| RT[Retry Logic<br/>Exponential Backoff]
        RT -->|Retry 3x| S9[Service B]
        RT -->|Timeout 5s| TO[Timeout Handler]
    end
```

---

## 5. Data Flow - Contract Creation to Activation

```mermaid
flowchart TD
    Start([Client Creates Contract]) --> CS[Contract Service]
    CS -->|1. Validate Client| CS2[Client Service<br/>Internal Call]
    CS2 -->|2. Validate Contractor| COS[Contractor Service<br/>Internal Call]
    COS -->|3. Create Contract| CS3[Contract Service<br/>Save to DynamoDB]
    CS3 -->|4. Generate PDF| PDF[PDF Generation<br/>PDFKit]
    PDF -->|5. Upload PDF| S3[S3 Bucket<br/>contract-pdfs/]
    CS3 -->|6. Publish Event| EB1[EventBridge<br/>contract.created]
    CS3 -->|7. Send Notification| NS1[Notification Service<br/>Internal Call]
    NS1 -->|8. Send Email| SG[SendGrid]
    
    EB1 -->|Event Listener| NS2[Notification Service<br/>Async Processing]
    
    Start2([Client Signs Contract]) --> SS[Signature Service]
    SS -->|1. Get Contract| CS4[Contract Service<br/>Internal Call]
    SS -->|2. Record Signature| QLDB1[QLDB<br/>contract-signatures table]
    SS -->|3. Update Contract Status| CS5[Contract Service<br/>Internal Call]
    SS -->|4. Publish Event| EB2[EventBridge<br/>signature.client-signed]
    SS -->|5. Notify Contractor| NS3[Notification Service]
    
    Start3([Contractor Signs Contract]) --> SS2[Signature Service]
    SS2 -->|1. Record Signature| QLDB2[QLDB<br/>contract-signatures table]
    SS2 -->|2. Publish Event| EB3[EventBridge<br/>signature.completed]
    
    EB3 -->|Event Listener| LS[Ledger Service]
    LS -->|1. Get Contract Details| CS6[Contract Service<br/>Internal Call]
    LS -->|2. Record Activation| QLDB3[QLDB<br/>contract-activations table]
    LS -->|3. Create Payment Schedule| QLDB4[QLDB<br/>payment-schedules table]
    LS -->|4. Publish Event| EB4[EventBridge<br/>ledger.contract-activated]
    LS -->|5. Notify Both Parties| NS4[Notification Service]
    
    EB4 -->|Event Listener| PS[Payment Service]
    PS -->|1. Create Payment Intent| STRIPE[Stripe API]
    PS -->|2. Save Transaction| DDB[Payment Service<br/>DynamoDB]
    
    End([Contract Active<br/>Payment Scheduled])
```

---

## 6. Authentication & Authorization Flow

```mermaid
sequenceDiagram
    participant Client
    participant API Gateway
    participant Auth Service
    participant User Service
    participant Other Services
    participant Redis
    participant DynamoDB

    Note over Client,DynamoDB: Login Flow

    Client->>API Gateway: POST /v1/auth/login<br/>{email, password}
    API Gateway->>Auth Service: Forward request
    Auth Service->>DynamoDB: Query auth-users table
    Auth Service->>Auth Service: Verify password (bcrypt)
    Auth Service->>Auth Service: Generate JWT tokens
    Auth Service->>Redis: Store refresh token (TTL: 7 days)
    Auth Service-->>API Gateway: {accessToken, refreshToken}
    API Gateway-->>Client: Tokens

    Note over Client,DynamoDB: Protected API Call Flow

    Client->>API Gateway: GET /v1/contracts<br/>Header: Authorization: Bearer {token}
    API Gateway->>Auth Service: Validate token (internal)
    Auth Service->>Auth Service: Verify JWT signature
    Auth Service->>DynamoDB: Get user from auth-users
    Auth Service-->>API Gateway: {userId, role, permissions}
    
    alt Token Valid
        API Gateway->>Other Services: Forward request with user context
        Other Services->>Other Services: Check RBAC permissions
        Other Services-->>API Gateway: Response
        API Gateway-->>Client: Data
    else Token Invalid
        API Gateway-->>Client: 401 Unauthorized
    end

    Note over Client,DynamoDB: Token Refresh Flow

    Client->>API Gateway: POST /v1/auth/refresh<br/>{refreshToken}
    API Gateway->>Auth Service: Refresh token
    Auth Service->>Redis: Validate refresh token
    alt Token Valid
        Auth Service->>Auth Service: Generate new access token
        Auth Service-->>API Gateway: {accessToken}
        API Gateway-->>Client: New token
    else Token Invalid
        Auth Service-->>API Gateway: 401 Unauthorized
        API Gateway-->>Client: Refresh required
    end
```

---

## 7. Deployment Architecture

```mermaid
graph TB
    subgraph "Development Environment"
        DEV[Developer] -->|Push Code| GH1[GitHub<br/>main branch]
        GH1 -->|Trigger| GHA1[GitHub Actions<br/>CI Pipeline]
        GHA1 -->|Build & Test| DOCKER1[Docker Build<br/>Per Service]
        DOCKER1 -->|Push| ECR1[ECR<br/>dev images]
        ECR1 -->|Deploy| ECS1[ECS Fargate<br/>Dev Environment<br/>1 task per service]
    end

    subgraph "Staging Environment"
        GH2[GitHub<br/>release/* branch] -->|Trigger| GHA2[GitHub Actions<br/>Staging Pipeline]
        GHA2 -->|Build & Test| DOCKER2[Docker Build<br/>Per Service]
        DOCKER2 -->|Push| ECR2[ECR<br/>staging images]
        ECR2 -->|Deploy| ECS2[ECS Fargate<br/>Staging Environment<br/>1-2 tasks per service]
        ECS2 -->|Integration Tests| TEST[Automated Tests]
    end

    subgraph "Production Environment"
        GH3[GitHub<br/>Tag: v*] -->|Trigger| GHA3[GitHub Actions<br/>Production Pipeline]
        GHA3 -->|Build & Test| DOCKER3[Docker Build<br/>Per Service]
        DOCKER3 -->|Push| ECR3[ECR<br/>production images]
        ECR3 -->|Blue-Green Deploy| ECS3[ECS Fargate<br/>Production Environment<br/>2+ tasks per service<br/>Auto-scaling]
        ECS3 -->|Smoke Tests| SMOKE[Smoke Tests]
    end

    subgraph "Infrastructure as Code"
        TERRAFORM[Terraform<br/>Infrastructure Definition]
        TERRAFORM -->|Apply| AWS[AWS Resources<br/>VPC, ECS, DynamoDB<br/>API Gateway, etc.]
    end

    ECS1 --> TERRAFORM
    ECS2 --> TERRAFORM
    ECS3 --> TERRAFORM
```

---

## 8. Monitoring & Observability

```mermaid
graph TB
    subgraph "Application Services"
        AS[Auth Service]
        CS[Contract Service]
        PS[Payment Service]
        OTHERS[Other Services]
    end

    subgraph "Logging"
        AS -->|Structured Logs| CW1[CloudWatch Logs<br/>/aws/ecs/auth-service]
        CS -->|Structured Logs| CW2[CloudWatch Logs<br/>/aws/ecs/contract-service]
        PS -->|Structured Logs| CW3[CloudWatch Logs<br/>/aws/ecs/payment-service]
        OTHERS -->|Structured Logs| CW4[CloudWatch Logs<br/>/aws/ecs/*]
    end

    subgraph "Metrics"
        AS -->|Custom Metrics| METRICS1[CloudWatch Metrics<br/>API Request Count<br/>Error Rate<br/>Latency]
        CS -->|Custom Metrics| METRICS1
        PS -->|Custom Metrics| METRICS1
        OTHERS -->|Custom Metrics| METRICS1
    end

    subgraph "Tracing"
        AS -->|Trace Segments| XRAY[AWS X-Ray<br/>Service Map<br/>Trace Analysis]
        CS -->|Trace Segments| XRAY
        PS -->|Trace Segments| XRAY
        OTHERS -->|Trace Segments| XRAY
    end

    subgraph "Alarms"
        METRICS1 -->|Thresholds| ALARMS[CloudWatch Alarms<br/>High Error Rate >5%<br/>High Latency >2s<br/>Service Down]
        ALARMS -->|Notifications| SNS[SNS Topics<br/>Email Alerts<br/>Slack Notifications]
    end

    subgraph "Dashboards"
        METRICS1 -->|Aggregated Data| DASH[CloudWatch Dashboards<br/>Service Health<br/>API Performance<br/>Error Rates]
        XRAY -->|Trace Data| DASH
    end
```

---

## 9. Security Architecture

```mermaid
graph TB
    subgraph "Network Security"
        VPC[VPC<br/>mindlinks-vpc]
        IGW[Internet Gateway<br/>Public Access]
        NAT[NAT Gateway<br/>Outbound Only]
        SG[Security Groups<br/>Minimal Access Rules]
        NACL[Network ACLs<br/>Subnet Level]
    end

    subgraph "Application Security"
        AG[API Gateway<br/>Authentication<br/>Rate Limiting]
        JWT[JWT Tokens<br/>RS256 Algorithm<br/>15min Expiry]
        RBAC[RBAC Guards<br/>Role-Based Access]
        VALID[Input Validation<br/>class-validator]
    end

    subgraph "Data Security"
        KMS[KMS<br/>Encryption Keys]
        DDBENC[DynamoDB<br/>Encryption at Rest<br/>KMS Keys]
        S3ENC[S3<br/>Encryption at Rest<br/>SSE-S3]
        QLDBENC[QLDB<br/>Encryption at Rest<br/>KMS Keys]
        REDISENC[ElastiCache<br/>Encryption in Transit<br/>TLS]
    end

    subgraph "Access Control"
        IAM[IAM Roles<br/>Least Privilege<br/>Per Service]
        SECRETS[Secrets Manager<br/>API Keys<br/>Database Credentials]
        PARAMS[Parameter Store<br/>Configuration<br/>Environment Variables]
    end

    IGW --> AG
    AG --> JWT
    JWT --> RBAC
    RBAC --> VALID
    
    VPC --> SG
    VPC --> NACL
    
    DDBENC --> KMS
    S3ENC --> KMS
    QLDBENC --> KMS
    REDISENC --> KMS
    
    IAM --> SECRETS
    IAM --> PARAMS
```

---

## 10. Service Dependencies Graph

```mermaid
graph TD
    AS[Auth Service<br/>Independent]
    US[User Service<br/>Depends: Auth]
    CS[Client Service<br/>Depends: Auth, Notification]
    COS[Contractor Service<br/>Depends: Auth, Client]
    KS[KYC Service<br/>Depends: Contractor, Notification]
    CTS[Contract Service<br/>Depends: Client, Contractor,<br/>Signature, Notification]
    SS[Signature Service<br/>Depends: Contract, Ledger]
    LS[Ledger Service<br/>Depends: Contract, Signature]
    PS[Payment Service<br/>Depends: Contract, Contractor,<br/>Notification]
    NS[Notification Service<br/>Independent]
    ADS[Admin Service<br/>Depends: All Services]

    AS --> US
    AS --> CS
    AS --> COS
    AS --> KS
    AS --> CTS
    AS --> PS
    
    CS --> COS
    COS --> KS
    CS --> CTS
    COS --> CTS
    
    CTS --> SS
    SS --> LS
    LS --> PS
    
    NS --> CS
    NS --> KS
    NS --> CTS
    NS --> PS
    
    ADS --> AS
    ADS --> US
    ADS --> CS
    ADS --> COS
    ADS --> KS
    ADS --> CTS
    ADS --> SS
    ADS --> LS
    ADS --> PS
    ADS --> NS
```

---

## 11. Event-Driven Architecture

```mermaid
graph LR
    subgraph "Event Publishers"
        AS[Auth Service] -->|user.created| EB[EventBridge<br/>Event Bus]
        CS[Client Service] -->|company.registered<br/>invitation.created| EB
        COS[Contractor Service] -->|contractor.created<br/>invitation.accepted| EB
        KS[KYC Service] -->|kyc.verified<br/>kyc.rejected| EB
        CTS[Contract Service] -->|contract.created<br/>contract.sent-for-signature| EB
        SS[Signature Service] -->|signature.client-signed<br/>signature.completed| EB
        LS[Ledger Service] -->|ledger.contract-activated<br/>ledger.payment-scheduled| EB
        PS[Payment Service] -->|payment.intent-created<br/>payment.confirmed| EB
    end

    subgraph "Event Rules"
        EB -->|Rule: user.created| R1[Target: User Service<br/>Create Profile]
        EB -->|Rule: invitation.created| R2[Target: Notification Service<br/>Send Email]
        EB -->|Rule: signature.completed| R3[Target: Ledger Service<br/>Activate Contract]
        EB -->|Rule: ledger.contract-activated| R4[Target: Payment Service<br/>Create Schedule]
        EB -->|Rule: payment.confirmed| R5[Target: Notification Service<br/>Send Receipt]
    end

    subgraph "Event Consumers"
        R1 --> US[User Service]
        R2 --> NS[Notification Service]
        R3 --> LS[Ledger Service]
        R4 --> PS[Payment Service]
        R5 --> NS2[Notification Service]
    end
```

---

## 12. Scalability & Auto-Scaling

```mermaid
graph TB
    subgraph "Auto-Scaling Configuration"
        METRIC[CloudWatch Metrics<br/>CPU Utilization<br/>Memory Utilization<br/>Request Count]
        METRIC -->|Threshold >70%| ASG[Auto Scaling Group<br/>ECS Service]
        ASG -->|Scale Out| ADD[Add Tasks<br/>+1 task]
        METRIC -->|Threshold <30%| ASG2[Auto Scaling Group]
        ASG2 -->|Scale In| REMOVE[Remove Tasks<br/>-1 task]
    end

    subgraph "Service Scaling Limits"
        AS_LIM[Auth Service<br/>Min: 1, Max: 5<br/>CPU: 0.25, Mem: 512MB]
        CTS_LIM[Contract Service<br/>Min: 2, Max: 10<br/>CPU: 0.5, Mem: 1GB]
        PS_LIM[Payment Service<br/>Min: 2, Max: 10<br/>CPU: 0.5, Mem: 1GB]
        NS_LIM[Notification Service<br/>Min: 1, Max: 5<br/>CPU: 0.25, Mem: 512MB]
    end

    subgraph "Load Distribution"
        ALB[Application Load Balancer<br/>Round Robin<br/>Health Checks]
        ALB -->|Distribute| TASK1[Task 1]
        ALB -->|Distribute| TASK2[Task 2]
        ALB -->|Distribute| TASK3[Task 3]
        ALB -->|Distribute| TASK4[Task 4]
    end

    ADD --> ALB
    REMOVE --> ALB
```

---

## Key Architecture Highlights

### Service Independence
- Each microservice is independently deployable
- Own database tables (DynamoDB)
- Separate ECS Fargate service
- Independent scaling policies

### Communication Patterns
- **Synchronous**: HTTP REST via Service Discovery
- **Asynchronous**: EventBridge for event-driven flows
- **Circuit Breaker**: Resilience patterns for fault tolerance
- **Retry Logic**: Exponential backoff for transient failures

### Infrastructure Components
- **API Gateway**: Single entry point for external requests
- **Service Discovery**: AWS Cloud Map for internal routing
- **Load Balancer**: ALB for service-to-service communication
- **Event Bus**: EventBridge for decoupled communication

### Data Storage
- **DynamoDB**: Operational data (per-service tables)
- **QLDB**: Immutable audit ledger (signatures, activations)
- **Redis**: Session storage and caching
- **S3**: Document storage (contracts, KYC docs)

### Observability
- **CloudWatch**: Logs, metrics, alarms
- **X-Ray**: Distributed tracing across services
- **Dashboards**: Service health and performance monitoring

### Security
- **Network**: VPC with private subnets, security groups
- **Authentication**: JWT tokens with RBAC
- **Encryption**: KMS for data at rest, TLS for data in transit
- **IAM**: Least privilege access per service

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-XX  
**Architecture Type:** Full Microservices on AWS



