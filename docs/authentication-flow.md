# **Authentication Service – Full Flow Documentation (AWS + Terraform + API Gateway)**

*Version: POC Architecture*

---

## **1. Overview**

This document describes the complete Authentication Service architecture and runtime flow in an AWS-based microservices environment deployed using Terraform and orchestrated from an Nx monorepo.

It covers:

* File structure
* CI/CD flow (GitHub Actions → Terraform → AWS)
* Infrastructure components
* Runtime behavior (login, access, refresh)
* Token lifecycle
* Inter-service communication
* Example payloads & responses

---

# **2. Monorepo Structure (Nx)**

```
root/
 ├── apps/
 │    ├── auth-service/
 │    │     ├── src/
 │    │     │    ├── auth.module.ts
 │    │     │    ├── auth.controller.ts
 │    │     │    ├── auth.service.ts
 │    │     │    ├── strategies/
 │    │     │    ├── guards/
 │    │     │    ├── dtos/
 │    │     │    ├── entities/
 │    │     └── Dockerfile
 │    ├── user-service/
 │    ├── contract-service/
 │    └── api-gateway/ (optional)
 ├── libs/
 │    ├── shared-types/
 │    ├── shared-utils/
 │    └── shared-dtos/
 ├── infra/
 │    ├── terraform/
 │    └── modules/
 └── package.json
```

### **Key principles**

* Each microservice lives in **apps/**
* Shared DTOs & validations live in **libs/**
* Terraform lives in **infra/terraform**
* GitHub Actions pipelines live in `.github/workflows/`

---

# **3. CI/CD Pipeline**

## **3.1 Developer Flow**

1. Developer writes code in `apps/auth-service`
2. Pushes to GitHub → triggers CI pipeline

---

## **3.2 GitHub Actions Stages**

### **1. Build & Test**

```
nx build auth-service
nx test auth-service
```

### **2. Build Docker Image**

```
docker build -t auth-service:latest .
```

### **3. Push to AWS ECR**

```
aws ecr get-login-password | docker login --username AWS
docker push <ECR_REPO_URL>/auth-service:latest
```

### **4. Apply Terraform**

```
terraform apply -auto-approve
```

Terraform updates:

* ECS service task definition
* API Gateway integration
* Secrets
* Security groups
* Load balancer
* Redis + RDS networking

---

# **4. AWS Infrastructure Components**

## **4.1 ECS Fargate**

Runs the Auth Service container.

* CPU/memory configurable
* Auto-scaling optional
* Behind an Application Load Balancer (if used)
* Pulls image from ECR

---

## **4.2 PostgreSQL (RDS)**

Stores:

* Users
* Password hashes
* User metadata
* Refresh token metadata (optional)

---

## **4.3 Redis**

Used for:

* Refresh token rotation
* JTI Blacklist
* Session invalidation
* Rate-limiting (optional)

---

## **4.4 Secrets Manager**

Stores:

* JWT private key (RS256)
* JWT public key (for API Gateway Authorizer)
* DB password
* Redis credentials

---

## **4.5 API Gateway**

Manages:

* Routing traffic to microservices
* JWT validation
* Rate limiting
* CORS
* Versioning

---

# **5. Token Architecture**

## **JWT Access Token**

* Signed using RS256
* Contains user ID, roles, permissions
* Short lifespan: **15 minutes**

Example payload:

```json
{
  "sub": "user_12345",
  "email": "john@example.com",
  "roles": ["CLIENT"],
  "iat": 1731333100,
  "exp": 1731334000,
  "iss": "auth.yourcompany.com"
}
```

---

## **Refresh Token**

* Stored in Redis
* Expiry: 7–30 days
* Rotated on every refresh
* Old token invalidated using JTI

Example Redis entry:

```
refresh:user_12345:jti_98271398 → valid (expires in 30d)
```

---

# **6. Runtime Flow**

## **6.1 Login Flow**

### **Step-by-step**

1. **Client → API Gateway**

```
POST /auth/login
{
  "email": "john@example.com",
  "password": "12345678"
}
```

2. **API Gateway → Auth Service (ECS)**

   For `/auth/login`, JWT Authorizer is disabled.

3. **Auth Service → RDS**

   Validate user & password.

4. **Auth Service → Redis**

   Store refresh token with JTI.

5. **Auth Service → Signs JWT**

   Using *private key from Secrets Manager*.

6. **Auth Service → API Gateway → Client**

   Returns:

```json
{
  "accessToken": "xxx",
  "refreshToken": "yyy",
  "expiresIn": 900
}
```

---

## **6.2 Accessing Protected Routes**

Client includes their access token:

```
GET /user/profile
Authorization: Bearer <accessToken>
```

### **Flow**

1. API Gateway (JWT Authorizer)
   * Reads public key from **JWKS endpoint**
   * Validates signature
   * Validates expiry

2. If valid → forwards to service

3. If invalid → 401 returned immediately

---

## **6.3 Refresh Token Flow**

```
POST /auth/refresh
{
  "refreshToken": "yyy"
}
```

### **Flow**

1. API Gateway forwards to Auth Service
2. Auth Service fetches refresh token JTI from Redis
3. Validates token
4. Rotates JTI (old invalidated)
5. Issues new `accessToken` + `refreshToken`
6. Stores new JTI in Redis

Example response:

```json
{
  "accessToken": "newAccess",
  "refreshToken": "newRefresh"
}
```

---

# **7. EventBridge Integration (Optional)**

Events published:

### `user.created`

```json
{
  "type": "user.created",
  "data": {
    "id": "user_12345",
    "email": "john@example.com"
  }
}
```

### `user.login`

Contains timestamp + IP metadata.

Used for:

* Notifications
* Audit logs
* Communication with other services

---

# **8. Example Terraform Snippets**

## **ECS Task Definition**

```hcl
resource "aws_ecs_task_definition" "auth" {
  family                   = "auth-service"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  container_definitions = jsonencode([
    {
      name  = "auth-service"
      image = "${aws_ecr_repository.auth.repository_url}:latest"
      portMappings = [{
        containerPort = 3000
      }]
      environment = [
        { name = "DATABASE_URL", value = var.database_url }
      ]
    }
  ])
}
```

---

# **9. Sequence Diagrams (Text Version)**

## **Login Flow**

```
Client → API Gateway : POST /auth/login
API Gateway → Auth Service : Forward request
Auth Service → RDS : Validate credentials
Auth Service → Redis : Store refresh token (JTI)
Auth Service → Secrets Manager : Load private key
Auth Service → API Gateway : Send {accessToken, refreshToken}
API Gateway → Client : Return tokens
```

---

# **10. Summary of End-to-End Flow**

**1. Developer pushes code**

→ GitHub Actions builds + tests

→ Docker pushed to ECR

→ Terraform deploys ECS update

**2. API Gateway receives requests**

→ Validates JWT

→ Routes to services

**3. Auth Service handles identity**

→ Logins

→ Token issuance

→ Refresh rotation

→ Event publishing

**4. AWS services support**

* Redis = token sessions
* RDS = user storage
* Secrets Manager = keys
* ECS = compute
* Terraform = IaC