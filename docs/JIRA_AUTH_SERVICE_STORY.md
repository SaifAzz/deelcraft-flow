# Jira Story: Authentication Service Implementation

## Story Details

**Story Type:** Epic/Story  
**Priority:** High  
**Sprint:** TBD  
**Story Points:** 34  
**Assignee:** Backend Team  
**Reporter:** Product Owner  

---

## Story Title
**Implement Authentication Service with JWT-based Authentication and Token Management**

---

## Story Description

As a **platform user (Client, Contractor, or Admin)**,  
I want to **authenticate securely using email and password**,  
So that **I can access protected resources and my session is managed securely**.

### Business Value
- Enable secure user authentication for all platform users
- Foundation for role-based access control (RBAC)
- Support for multi-tenant access patterns
- Compliance with security best practices (OWASP Top 10)

### Acceptance Criteria
- [ ] Users can register with email and password
- [ ] Users can login and receive JWT access token (15 min expiry) and refresh token (30 days)
- [ ] Users can refresh their access token using refresh token
- [ ] Users can logout and invalidate their tokens
- [ ] API Gateway validates JWT tokens without calling backend
- [ ] Rate limiting prevents brute force attacks (5 attempts per minute per IP)
- [ ] All authentication events are logged for audit purposes
- [ ] Service handles token rotation and invalidation correctly
- [ ] Health check endpoint returns service status
- [ ] Service is deployed to AWS ECS Fargate and accessible via API Gateway

---

## Technical Context

### Architecture
- **Service:** NestJS microservice
- **Database:** PostgreSQL (RDS) for user data and refresh token metadata
- **Cache:** Redis (ElastiCache) for refresh token lookups
- **Token Strategy:** JWT with RS256 signing, refresh token rotation
- **Infrastructure:** AWS ECS Fargate, API Gateway, Secrets Manager
- **CI/CD:** GitHub Actions → ECR → Terraform

### Key Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout and invalidate tokens
- `GET /.well-known/jwks.json` - Public keys for JWT validation
- `GET /health` - Health check endpoint

---

## Tasks

### Phase 1: Infrastructure Setup (Story Points: 8)

#### Task 1.1: Set up Terraform Infrastructure
**Story Points:** 3  
**Assignee:** DevOps Engineer  
**Priority:** High

**Description:**
Create Terraform configuration for auth service infrastructure components.

**Acceptance Criteria:**
- [ ] VPC and networking configuration
- [ ] RDS PostgreSQL instance (db.t3.micro for POC)
- [ ] ElastiCache Redis cluster (cache.t3.micro for POC)
- [ ] ECS Fargate cluster and service definition
- [ ] ECR repository for auth-service Docker image
- [ ] Secrets Manager secrets for JWT keys, DB credentials, Redis credentials
- [ ] Security groups with proper ingress/egress rules
- [ ] IAM roles and policies for ECS tasks
- [ ] Terraform state backend (S3 + DynamoDB)

**Technical Notes:**
- Use Terraform modules for reusability
- Enable encryption at rest for RDS and ElastiCache
- Configure backup retention for RDS
- Set up CloudWatch log groups

**Dependencies:** None

---

#### Task 1.2: Set up Database Schema
**Story Points:** 2  
**Assignee:** Backend Developer  
**Priority:** High

**Description:**
Create Prisma schema and migrations for authentication-related tables.

**Acceptance Criteria:**
- [ ] `users` table with: id, email, password_hash, role, token_version, created_at, updated_at
- [ ] `refresh_tokens` table with: id, user_id, jti, token_family, created_at, expires_at, revoked_at, last_used_at, ip_address, user_agent
- [ ] `audit_logs` table with: id, user_id, action, ip_address, user_agent, success, error_message, created_at
- [ ] Proper indexes on user_id, email, jti, expires_at
- [ ] Foreign key constraints
- [ ] Prisma migrations created and tested

**Technical Notes:**
- Use UUID for primary keys
- Add unique constraint on email
- Add unique constraint on jti (JWT ID)
- Index on (user_id, expires_at) for efficient queries

**Dependencies:** Task 1.1 (RDS must exist)

---

#### Task 1.3: Set up CI/CD Pipeline
**Story Points:** 3  
**Assignee:** DevOps Engineer  
**Priority:** High

**Description:**
Create GitHub Actions workflow for building, testing, and deploying auth service.

**Acceptance Criteria:**
- [ ] GitHub Actions workflow file created
- [ ] Build step: Run `npm install` and `npm run build`
- [ ] Test step: Run unit tests and integration tests
- [ ] Docker build step: Build Docker image for auth-service
- [ ] Push to ECR step: Authenticate and push image to ECR
- [ ] Terraform apply step: Run `terraform apply` to update infrastructure
- [ ] Workflow triggers on push to main branch and PRs
- [ ] Secrets configured in GitHub (AWS credentials, etc.)

**Technical Notes:**
- Use matrix strategy for testing multiple Node.js versions
- Cache Docker layers for faster builds
- Use Terraform plan before apply in PRs
- Add approval step for production deployments

**Dependencies:** Task 1.1 (ECR repository must exist)

---

### Phase 2: Core Authentication Features (Story Points: 13)

#### Task 2.1: Implement User Registration
**Story Points:** 3  
**Assignee:** Backend Developer  
**Priority:** High

**Description:**
Implement user registration endpoint with email validation and password hashing.

**Acceptance Criteria:**
- [ ] `POST /auth/register` endpoint created
- [ ] Request validation using DTOs (email, password, role, company_name, country)
- [ ] Email uniqueness check
- [ ] Password strength validation (min 8 chars, complexity requirements)
- [ ] Password hashing using bcrypt (cost factor 12)
- [ ] User record created in database with default token_version = 0
- [ ] Audit log entry created for registration
- [ ] Rate limiting: 3 registrations per hour per IP
- [ ] Returns 201 Created with user ID (no sensitive data)
- [ ] Error handling for duplicate email, invalid input

**Technical Notes:**
- Use class-validator for DTO validation
- Use bcrypt for password hashing (never store plain passwords)
- Generate UUID for user ID
- Set default role based on registration type (CLIENT, CONTRACTOR)

**Dependencies:** Task 1.2 (Database schema)

---

#### Task 2.2: Implement Login Endpoint
**Story Points:** 4  
**Assignee:** Backend Developer  
**Priority:** High

**Description:**
Implement login endpoint that validates credentials and issues JWT tokens.

**Acceptance Criteria:**
- [ ] `POST /auth/login` endpoint created
- [ ] Request validation (email, password)
- [ ] User lookup by email
- [ ] Password verification using bcrypt
- [ ] Generate JWT access token (RS256, 15 min expiry) with payload: sub, email, roles, iat, exp, iss, tv (token version)
- [ ] Generate refresh token (UUID-based JTI)
- [ ] Store refresh token in Redis with key: `refresh:{user_id}:{jti}` (TTL: 30 days)
- [ ] Store refresh token metadata in PostgreSQL (refresh_tokens table)
- [ ] Load JWT private key from Secrets Manager (with caching)
- [ ] Return response: { accessToken, refreshToken, expiresIn: 900 }
- [ ] Audit log entry for successful/failed login attempts
- [ ] Rate limiting: 5 attempts per minute per IP
- [ ] Account lockout after 5 failed attempts (15 min lockout)
- [ ] Error handling: invalid credentials, locked account, user not found

**Technical Notes:**
- Use jsonwebtoken library for JWT signing
- Cache JWT private key in memory (refresh every 5 minutes)
- Use Redis INCR for tracking failed login attempts
- Include IP address and user agent in audit logs

**Dependencies:** Task 1.2 (Database schema), Task 2.1 (User registration)

---

#### Task 2.3: Implement Refresh Token Flow
**Story Points:** 3  
**Assignee:** Backend Developer  
**Priority:** High

**Description:**
Implement refresh token endpoint with token rotation for security.

**Acceptance Criteria:**
- [ ] `POST /auth/refresh` endpoint created
- [ ] Request validation (refreshToken)
- [ ] Lookup refresh token in Redis (fallback to PostgreSQL if Redis unavailable)
- [ ] Validate token exists and not expired
- [ ] Check token not revoked
- [ ] Verify user token_version matches current user token_version
- [ ] Generate new access token and new refresh token
- [ ] Invalidate old refresh token (delete from Redis, mark revoked in PostgreSQL)
- [ ] Store new refresh token in Redis and PostgreSQL
- [ ] Update last_used_at in PostgreSQL
- [ ] Return new tokens: { accessToken, refreshToken }
- [ ] Audit log entry for refresh operation
- [ ] Rate limiting: 10 refreshes per minute per user
- [ ] Error handling: invalid token, expired token, revoked token

**Technical Notes:**
- Implement token rotation (old token cannot be reused)
- Use transaction for PostgreSQL updates
- Handle Redis failures gracefully (fallback to PostgreSQL)

**Dependencies:** Task 2.2 (Login endpoint)

---

#### Task 2.4: Implement Logout Endpoint
**Story Points:** 2  
**Assignee:** Backend Developer  
**Priority:** Medium

**Description:**
Implement logout endpoint to invalidate user tokens.

**Acceptance Criteria:**
- [ ] `POST /auth/logout` endpoint created
- [ ] Requires valid JWT token (authenticated user)
- [ ] Extract refresh token from request (if provided)
- [ ] Invalidate refresh token in Redis (delete)
- [ ] Mark refresh token as revoked in PostgreSQL
- [ ] Optionally invalidate all user tokens (if logout all devices requested)
- [ ] Audit log entry for logout
- [ ] Return 200 OK on success
- [ ] Error handling for invalid token

**Technical Notes:**
- Support both single-device and all-devices logout
- Consider adding token family for device tracking

**Dependencies:** Task 2.2 (Login endpoint)

---

#### Task 2.5: Implement JWKS Endpoint
**Story Points:** 1  
**Assignee:** Backend Developer  
**Priority:** High

**Description:**
Implement JWKS (JSON Web Key Set) endpoint for API Gateway JWT validation.

**Acceptance Criteria:**
- [ ] `GET /.well-known/jwks.json` endpoint created
- [ ] Returns public key in JWKS format
- [ ] Includes key ID (kid), algorithm (RS256), and public key (n, e)
- [ ] Public key loaded from Secrets Manager
- [ ] Response cached for 1 hour
- [ ] Proper Content-Type header (application/json)
- [ ] CORS headers configured

**Technical Notes:**
- Use jose library or similar for JWKS generation
- Support key rotation (multiple keys with different kids)
- Cache public key in memory

**Dependencies:** Task 1.1 (Secrets Manager setup)

---

### Phase 3: Security Features (Story Points: 8)

#### Task 3.1: Implement Rate Limiting
**Story Points:** 3  
**Assignee:** Backend Developer  
**Priority:** High

**Description:**
Implement multi-layer rate limiting to prevent brute force attacks.

**Acceptance Criteria:**
- [ ] Install and configure @nestjs/throttler
- [ ] API Gateway level rate limiting configured (100 req/sec, 200 burst)
- [ ] Application level rate limiting:
  - `/auth/login`: 5 attempts per minute per IP
  - `/auth/refresh`: 10 attempts per minute per user
  - `/auth/register`: 3 attempts per hour per IP
- [ ] User-level rate limiting (track failed login attempts per email)
- [ ] Account lockout after 5 failed attempts (15 min lockout)
- [ ] Redis-based rate limiting counters
- [ ] Rate limit headers in response (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset)
- [ ] Proper error messages (429 Too Many Requests)

**Technical Notes:**
- Use Redis for distributed rate limiting
- Implement sliding window algorithm
- Track both IP-based and user-based limits

**Dependencies:** Task 1.1 (Redis setup), Task 2.2 (Login endpoint)

---

#### Task 3.2: Implement Audit Logging
**Story Points:** 2  
**Assignee:** Backend Developer  
**Priority:** High

**Description:**
Implement comprehensive audit logging for all authentication events.

**Acceptance Criteria:**
- [ ] Audit log interceptor/middleware created
- [ ] Log all authentication events:
  - User registration (success/failure)
  - Login attempts (success/failure with IP, user agent)
  - Token refresh (success/failure)
  - Logout events
  - Password change requests
  - Account lockout events
- [ ] Store logs in PostgreSQL (audit_logs table)
- [ ] Include fields: user_id, action, ip_address, user_agent, success, error_message, created_at
- [ ] Async logging (don't block request)
- [ ] Log rotation/archival strategy (optional for POC)

**Technical Notes:**
- Use async queue for logging to avoid blocking requests
- Consider sending critical events to CloudWatch
- Mask sensitive data in logs (passwords, tokens)

**Dependencies:** Task 1.2 (Database schema)

---

#### Task 3.3: Implement Token Version Management
**Story Points:** 2  
**Assignee:** Backend Developer  
**Priority:** High

**Description:**
Implement token version system for instant invalidation of all user tokens.

**Acceptance Criteria:**
- [ ] Add token_version field to users table (default 0)
- [ ] Include token_version (tv) in JWT payload
- [ ] Validate token_version on token refresh
- [ ] Increment token_version on password change
- [ ] Increment token_version on admin-initiated logout
- [ ] Invalidate all tokens when token_version changes
- [ ] Update all refresh token validation to check token_version

**Technical Notes:**
- Token version allows instant invalidation without blacklisting individual tokens
- More efficient than maintaining large blacklists

**Dependencies:** Task 1.2 (Database schema), Task 2.3 (Refresh token flow)

---

#### Task 3.4: Implement Security Headers and CORS
**Story Points:** 1  
**Assignee:** Backend Developer  
**Priority:** Medium

**Description:**
Configure security headers and CORS for production readiness.

**Acceptance Criteria:**
- [ ] Helmet middleware configured for security headers
- [ ] CORS configured with allowed origins
- [ ] HTTPS enforcement
- [ ] Content Security Policy headers
- [ ] X-Frame-Options, X-Content-Type-Options headers
- [ ] Proper error messages (no stack traces in production)

**Technical Notes:**
- Use @nestjs/config for environment-based CORS origins
- Whitelist specific origins, not wildcard

**Dependencies:** None

---

### Phase 4: Integration and Infrastructure (Story Points: 5)

#### Task 4.1: Configure API Gateway JWT Authorizer
**Story Points:** 2  
**Assignee:** DevOps Engineer  
**Priority:** High

**Description:**
Configure API Gateway to validate JWT tokens using JWKS endpoint.

**Acceptance Criteria:**
- [ ] API Gateway JWT Authorizer configured
- [ ] Authorizer points to JWKS endpoint: `https://auth-service/.well-known/jwks.json`
- [ ] Configured audience and issuer validation
- [ ] Authorizer result caching enabled (5 min TTL)
- [ ] Protected routes configured (all routes except /auth/login, /auth/register, /health, /.well-known/jwks.json)
- [ ] Unauthorized requests return 401
- [ ] Test JWT validation with valid and invalid tokens

**Technical Notes:**
- Use AWS API Gateway v2 (HTTP API) for better performance
- Configure authorizer for each route that needs protection

**Dependencies:** Task 2.5 (JWKS endpoint), Task 1.1 (API Gateway setup)

---

#### Task 4.2: Implement Health Check Endpoint
**Story Points:** 1  
**Assignee:** Backend Developer  
**Priority:** Medium

**Description:**
Implement health check endpoint for monitoring and load balancer health checks.

**Acceptance Criteria:**
- [ ] `GET /health` endpoint created
- [ ] Returns service status (ok/degraded/down)
- [ ] Checks database connectivity
- [ ] Checks Redis connectivity
- [ ] Returns response time metrics
- [ ] Returns timestamp
- [ ] No authentication required
- [ ] Response format: { status, database, redis, timestamp }

**Technical Notes:**
- Use @nestjs/terminus for health checks
- Health checks should be fast (< 100ms)

**Dependencies:** Task 1.1 (Infrastructure setup)

---

#### Task 4.3: Set up Monitoring and Logging
**Story Points:** 2  
**Assignee:** DevOps Engineer  
**Priority:** Medium

**Description:**
Configure CloudWatch monitoring, logging, and alerting for auth service.

**Acceptance Criteria:**
- [ ] CloudWatch log group created for auth-service
- [ ] ECS task logs forwarded to CloudWatch
- [ ] Custom metrics configured:
  - Login attempts (success/failure)
  - Token refresh count
  - Rate limit hits
  - Response times (p50, p95, p99)
- [ ] CloudWatch dashboard created
- [ ] Alarms configured for:
  - High error rate (> 5% failures)
  - High response time (> 1 second p95)
  - Service down (health check failures)
- [ ] SNS topic for alerts

**Technical Notes:**
- Use structured logging (JSON format)
- Include correlation IDs for request tracing

**Dependencies:** Task 1.1 (ECS setup)

---

### Phase 5: Testing (Story Points: 5)

#### Task 5.1: Write Unit Tests
**Story Points:** 2  
**Assignee:** Backend Developer  
**Priority:** High

**Description:**
Write comprehensive unit tests for auth service components.

**Acceptance Criteria:**
- [ ] Unit tests for auth.service.ts (login, register, refresh, logout)
- [ ] Unit tests for JWT token generation and validation
- [ ] Unit tests for password hashing and verification
- [ ] Unit tests for rate limiting logic
- [ ] Unit tests for token version management
- [ ] Test coverage > 80%
- [ ] All tests passing in CI/CD pipeline

**Technical Notes:**
- Use Jest for testing
- Mock external dependencies (Redis, PostgreSQL, Secrets Manager)
- Test edge cases and error scenarios

**Dependencies:** Tasks 2.1-2.5 (Core features)

---

#### Task 5.2: Write Integration Tests
**Story Points:** 2  
**Assignee:** Backend Developer  
**Priority:** High

**Description:**
Write integration tests for complete authentication flows.

**Acceptance Criteria:**
- [ ] Integration test: Register → Login → Refresh → Logout flow
- [ ] Integration test: Failed login attempts → Account lockout
- [ ] Integration test: Token refresh with invalid token
- [ ] Integration test: Token version invalidation
- [ ] Integration test: Rate limiting behavior
- [ ] Integration test: JWKS endpoint response
- [ ] Tests use test database and Redis
- [ ] All integration tests passing

**Technical Notes:**
- Use Testcontainers for PostgreSQL and Redis in tests
- Clean up test data after each test

**Dependencies:** Tasks 2.1-2.5 (Core features)

---

#### Task 5.3: Security Testing
**Story Points:** 1  
**Assignee:** Security Engineer / Backend Developer  
**Priority:** High

**Description:**
Perform security testing and vulnerability scanning.

**Acceptance Criteria:**
- [ ] OWASP ZAP automated scan completed
- [ ] Manual penetration testing:
  - Brute force attack prevention
  - SQL injection attempts
  - JWT token manipulation
  - Rate limiting bypass attempts
- [ ] Dependency vulnerability scan (npm audit)
- [ ] Security findings documented and fixed
- [ ] Security test report created

**Technical Notes:**
- Use OWASP ZAP for automated scanning
- Test with invalid tokens, expired tokens, tampered tokens

**Dependencies:** Tasks 2.1-2.5 (Core features), Task 3.1 (Rate limiting)

---

### Phase 6: Documentation and Deployment (Story Points: 3)

#### Task 6.1: Write API Documentation
**Story Points:** 1  
**Assignee:** Backend Developer  
**Priority:** Medium

**Description:**
Create comprehensive API documentation for auth service endpoints.

**Acceptance Criteria:**
- [ ] OpenAPI/Swagger specification created
- [ ] All endpoints documented with:
  - Request/response schemas
  - Example payloads
  - Error responses
  - Authentication requirements
- [ ] Swagger UI accessible at `/api-docs`
- [ ] Postman collection created
- [ ] README with setup instructions

**Technical Notes:**
- Use @nestjs/swagger for automatic OpenAPI generation
- Include authentication examples

**Dependencies:** Tasks 2.1-2.5 (Core features)

---

#### Task 6.2: Deployment and Smoke Testing
**Story Points:** 2  
**Assignee:** DevOps Engineer / Backend Developer  
**Priority:** High

**Description:**
Deploy auth service to staging/production and perform smoke tests.

**Acceptance Criteria:**
- [ ] Service deployed to ECS Fargate
- [ ] API Gateway routes configured correctly
- [ ] Database migrations applied
- [ ] Secrets configured in Secrets Manager
- [ ] Smoke tests executed:
  - Health check endpoint accessible
  - Registration endpoint working
  - Login endpoint working
  - Token refresh working
  - JWKS endpoint accessible
- [ ] All smoke tests passing
- [ ] Service accessible via API Gateway URL

**Technical Notes:**
- Use blue-green deployment strategy if possible
- Monitor logs during deployment

**Dependencies:** All previous tasks

---

## Definition of Done

- [ ] All tasks completed and code reviewed
- [ ] All unit tests passing (> 80% coverage)
- [ ] All integration tests passing
- [ ] Security testing completed with no critical findings
- [ ] API documentation complete and reviewed
- [ ] Service deployed to staging environment
- [ ] Smoke tests passing in staging
- [ ] Monitoring and alerting configured
- [ ] Runbook/documentation for operations team
- [ ] Product Owner sign-off

---

## Dependencies

**External Dependencies:**
- AWS account and IAM permissions
- Domain name (optional for POC)
- GitHub repository access
- Terraform state backend (S3 + DynamoDB)

**Internal Dependencies:**
- User Service (for user profile data)
- Shared libraries (common DTOs, types, utilities)

---

## Risks and Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Secrets Manager API rate limits | High | Medium | Cache secrets in memory, refresh periodically |
| Redis single point of failure | High | Low | Fallback to PostgreSQL, implement Redis cluster for production |
| JWT key compromise | Critical | Low | Automated key rotation, monitoring for unusual patterns |
| Database migration failures | Medium | Medium | Test migrations in staging, have rollback plan |
| API Gateway configuration errors | High | Medium | Use Terraform for configuration, test in staging first |

---

## Notes

- This story should be broken down into smaller stories if needed for sprint planning
- Consider implementing MFA (Multi-Factor Authentication) as a follow-up story
- Social login (Google, LinkedIn) can be added in a future iteration
- Session management UI (view active sessions, revoke devices) can be added later

---

## Related Stories

- **User Service Implementation** - Depends on auth service for authentication
- **Contract Service Implementation** - Requires authenticated users
- **Payment Service Implementation** - Requires authenticated users
- **Admin Dashboard** - Requires admin authentication

---

**Created:** [Date]  
**Last Updated:** [Date]  
**Status:** Ready for Development