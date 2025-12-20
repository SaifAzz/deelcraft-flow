# Quick Reference: Deel-like Platform POC

## 🎯 One-Page Overview

### Target Market
**MENA Contractors** (UAE, Egypt, Saudi Arabia) + **Global Clients** (US, EU)

### Core Features (MVP)
1. Client registration & dashboard
2. Contractor KYC & onboarding
3. Contract creation (fixed/hourly) with PDF & e-signature
4. Payment processing (simulated) with escrow
5. Contractor payouts (mocked)
6. Admin panel

### Timeline
**12 Weeks** | **6 Phases** | **3 Test Users Each**

---

## 🔄 Complete Flow (Visual)

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND MODULES                          │
├─────────────────────────────────────────────────────────────┤
│  Landing  │  Client  │  Contractor  │  Contract  │  Admin   │
│   Page    │ Dashboard│  Dashboard   │   Wizard   │ Dashboard│
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      USER FLOWS                               │
├──────────────┬──────────────┬───────────────────────────────┤
│ CLIENT FLOW  │ CONTRACTOR   │      ADMIN OVERSIGHT           │
│              │    FLOW      │                                │
├──────────────┼──────────────┼───────────────────────────────┤
│ 1. Register │ 1. KYC       │ 1. Database Oversight          │
│ 2. Dashboard│ 2. Dashboard │ 2. Logs & Monitoring           │
│ 3. Contract │ 3. Contracts │ 3. Monitor Contracts/Payments │
│ 4. Add Funds│ 4. Payments  │                                │
│ 5. Complete │              │                                │
└──────────────┴──────────────┴───────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              BACKEND SERVICES (Microservices-Ready)         │
├─────────────────────────────────────────────────────────────┤
│  Auth &    │  User    │  Contract │  Payment │ Notification │
│  Identity  │ Service  │  Service │  Service │   Service     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│           DATABASE & INFRASTRUCTURE                          │
├─────────────────────────────────────────────────────────────┤
│  PostgreSQL  │  Redis  │  S3 Storage  │  CloudWatch        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack (Quick)

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15 + Tailwind + TanStack Query |
| **Backend** | NestJS + PostgreSQL + Prisma |
| **Auth** | Clerk (JWT + OAuth2) |
| **Payments** | Stripe (sandbox) |
| **Email** | SendGrid |
| **Storage** | AWS S3 |
| **Hosting** | Vercel (frontend) + AWS ECS (backend) |
| **CI/CD** | GitHub Actions |
| **Monitoring** | CloudWatch |

---

## 📅 Phase Breakdown

| Phase | Weeks | Focus | Deliverable |
|-------|-------|-------|-------------|
| **1** | 1-2 | Vision & Scope | Product brief, wireframes |
| **2** | 2-3 | Architecture | API contracts, DB schema |
| **3** | 3-6 | Backend MVP | Auth, Contract, Payment services |
| **4** | 6-9 | Frontend | All 5 modules |
| **5** | 9-10 | Testing | Working POC + demo |
| **6** | 10-12 | Iteration | Feedback + fixes |

---

## 💰 Cost (POC - 3 months)

**Total: ~$85/month**
- Clerk: $0 (free tier)
- Stripe: $0 (sandbox)
- SendGrid: $0 (free tier)
- AWS: ~$85/month (S3 + RDS + ECS)

---

## ✅ Success Criteria

### Technical
- [ ] 5 frontend modules working
- [ ] 5 backend services deployed
- [ ] CI/CD active
- [ ] Monitoring functional

### Business
- [ ] 3 clients onboarded
- [ ] 3 contractors verified
- [ ] 2 contracts created & signed
- [ ] 1 payment processed (simulated)

---

## 🎯 Key Decisions Needed

1. **Backend**: NestJS ✅ or FastAPI?
2. **Auth**: Clerk ✅ or Custom JWT?
3. **Payments**: Stripe ✅ or Adyen?
4. **Hosting**: AWS ✅ or Google Cloud?
5. **Timeline**: 12 weeks acceptable?

✅ = Recommended for POC

---

## 📊 Database Schema (Core Tables)

```
users
├── id, email, password_hash, role
├── company_name, country, verified
└── created_at

contracts
├── id, client_id, contractor_id
├── type, amount, currency, status
├── milestones, pdf_url, signed_at
└── created_at

payments
├── id, contract_id, client_id
├── amount, currency, status
├── escrow_balance, transaction_id
└── created_at

kyc_documents
├── id, user_id, document_type
├── s3_url, status, verified_at
└── created_at
```

---

## 🔐 Security (POC)

- ✅ JWT with refresh tokens
- ✅ HTTPS everywhere
- ✅ Encrypted database
- ✅ S3 signed URLs
- ✅ Audit logging
- ✅ Rate limiting

---

## 🚀 Microservices Path

**Current**: Modular monolith (all services in one app)

**Future**:
1. Extract Payment Service (PCI compliance)
2. Extract Notification Service (high volume)
3. Extract Auth Service (global deployment)
4. Full microservices (event-driven)

---

## 📝 Next Steps (Post-Meeting)

1. ✅ Get tool approvals
2. ✅ Assign team members
3. ✅ Setup accounts (Stripe, AWS, etc.)
4. ✅ Initialize GitHub repo
5. ✅ Start Phase 1 (wireframes)

---

**For Detailed Info**: See `POC_DETAILED_FLOW.md`  
**For Tools Comparison**: See `TOOLS_COMPARISON.md`  
**For Meeting Agenda**: See `MEETING_AGENDA.md`

