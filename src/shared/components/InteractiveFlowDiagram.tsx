import * as React from "react";
import { FlowNode } from "./FlowNode";
import { Card } from "./ui/card";
import { ArrowDown, ArrowRight, Database } from "lucide-react";

export const InteractiveFlowDiagram = () => {
  return (
    <div className="w-full space-y-8 p-6">
      {/* Frontend Modules */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground text-center">Frontend Modules</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <FlowNode
            id="landing-page"
            title="Landing Page"
            color="frontend"
            realWorld="Marketing & user acquisition: Product info, pricing, sign-up CTAs targeting MENA contractors and global clients"
            underHood="Next.js 15 with SSR for SEO, optimized meta tags, lazy loading. Deployed on Vercel CDN for global performance"
            example="A visitor from UAE lands on the site, reads about the platform targeting MENA contractors, and clicks 'Get Started' → routed to registration"
            modularAdvantage="Standalone module that can be deployed independently on CDN, updated without affecting dashboards, and A/B tested separately. POC Focus: Basic landing with signup routing"
          />
          <FlowNode
            id="client-dashboard"
            title="Client Dashboard"
            color="frontend"
            realWorld="Client's primary interface: Active contracts overview, payment status & escrow balance, contractor invitations, transaction history"
            underHood="Next.js 15 + TanStack Query for data fetching, protected routes with Clerk auth, real-time updates via polling/WebSocket"
            example="US startup logs in to see 3 active contracts with contractors in UAE and Egypt, checks $10k escrow balance, initiates new contract via wizard"
            modularAdvantage="Independent deployment cycle from contractor dashboard, can scale UI updates without affecting backend, reusable components across admin panel. POC Focus: Core contract management UI"
          />
          <FlowNode
            id="contractor-dashboard"
            title="Contractor Dashboard"
            color="frontend"
            realWorld="Contractor's primary interface: Incoming contract notifications, payment balance & history, KYC status & document upload, payout requests"
            underHood="Next.js 15 + TanStack Query, role-based access control (RBAC), contractor-specific data filtering via API Gateway"
            example="UAE contractor logs in to see new contract from US client, reviews terms, signs digitally, tracks $5k payment milestone, views balance in AED"
            modularAdvantage="Isolated from client dashboard for security (no cross-access), can be localized independently for MENA regions, separate analytics tracking. POC Focus: Contract acceptance & payment tracking"
          />
          <FlowNode
            id="contract-wizard"
            title="Contract Wizard"
            color="frontend"
            realWorld="Guided contract creation: Select contractor, choose type (Fixed/Hourly), set payment terms (amount, currency, milestones), review & generate PDF, send for signature"
            underHood="React Hook Form + Zod validation, multi-step form with draft saving to DB, PDF preview generation (PDFKit/Puppeteer), e-signature integration (DocuSign sandbox)"
            example="Client creates contract: fills contractor email, selects Fixed contract, sets $10k USD with 50% upfront milestone, reviews PDF, sends for signature"
            modularAdvantage="Reusable across client and admin panels, can be embedded in other products, independently testable, PDF generation can become separate microservice. POC Focus: Complete wizard with PDF preview"
          />
          <FlowNode
            id="admin-dashboard"
            title="Admin Dashboard"
            color="frontend"
            realWorld="System oversight & management: User list (clients/contractors) with filters, contract review & approval, KYC verification queue, payment logs & audit trail, system metrics"
            underHood="Next.js 15 admin UI with data tables (TanStack Table), real-time updates, role-based access control (admin role), aggregated data from all services"
            example="Admin reviews 45 pending KYC verifications, approves UAE contractor, monitors $2.5M in escrow, views payment logs for dispute resolution"
            modularAdvantage="Single admin interface consuming all backend services, can add new monitoring features without touching user-facing apps. POC Focus: Basic oversight with user/contract management"
          />
        </div>
      </div>

      {/* Arrow indicating flow */}
      <div className="flex justify-center">
        <ArrowDown className="w-8 h-8 text-muted-foreground animate-pulse" />
      </div>

      {/* User Flow Layer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Client Flow */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-client text-center">Client Flow</h3>
          <div className="space-y-3">
            <FlowNode
              id="client-registration"
              title="Registration & Onboarding"
              color="client"
              realWorld="Client signs up with email/password or OAuth (Google/LinkedIn), provides company name, country, and verifies email"
              underHood="Clerk/Auth0 handles auth → JWT token generated → Session stored in Redis → User record created in PostgreSQL (role: client) → Email verification sent via SendGrid → Client redirected to dashboard"
              example="UAE startup registers with company email, verifies via email link, and logs in to access dashboard"
              modularAdvantage="Auth Service (Clerk) handles registration independently, can add OAuth providers (LinkedIn, Microsoft) without changing other services. POC Tools: Clerk, PostgreSQL, SendGrid"
            />
            <FlowNode
              id="client-dashboard-access"
              title="Dashboard Access"
              color="client"
              realWorld="Client logs in and views dashboard: Active contracts overview, escrow balance, contractor invitations, transaction history"
              underHood="JWT validated via Clerk → NestJS API Gateway → User Service fetches profile → Contract Service loads active contracts → Payment Service returns escrow balance → UI renders aggregated data"
              example="Client sees 3 active contracts, $10k escrow balance, 1 pending payment, and notification about new contractor application"
              modularAdvantage="Dashboard aggregates data from multiple services via API Gateway, services can be updated independently. POC Tools: NestJS API Gateway, JWT middleware"
            />
            <FlowNode
              id="client-contract-creation"
              title="Contract Creation"
              color="client"
              realWorld="Client creates new contract via wizard: Fills contractor email, selects type (Fixed/Hourly), sets amount, currency (USD/EUR/AED), and payment milestones"
              underHood="Contract Wizard (React Hook Form + Zod) → Contract Service (NestJS) validates → PDF generated (PDFKit/Puppeteer) → Contract stored in PostgreSQL (status: pending_signature) → Notification Service sends email to contractor → Client sees confirmation"
              example="Client creates contract for Egyptian contractor: $10k USD, Fixed type, 50% upfront ($5k), 50% on delivery ($5k), PDF generated and sent"
              modularAdvantage="Contract Service is isolated, can switch PDF generation libraries, add e-signature providers, or handle complex contract types without affecting payment flow. POC Tools: PDFKit/Puppeteer, Contract Service API"
            />
            <FlowNode
              id="client-add-funds"
              title="Add Funds (Escrow)"
              color="client"
              realWorld="Client adds funds for contract: Enters card details, Payment Service processes via Stripe/Adyen sandbox, escrow balance updated"
              underHood="Payment form → Payment Service (NestJS) → Stripe/Adyen sandbox charges card → Webhook received → Escrow balance updated in PostgreSQL → Contract status: payment_secured → Notification sent to contractor"
              example="Client adds $5k USD via credit card (Stripe sandbox), funds appear in escrow, contractor sees 'Payment Secured' status notification"
              modularAdvantage="Payment Service decoupled for PCI compliance, can add multiple payment gateways (ACH, crypto), currency conversion microservice can be added separately. POC Tools: Stripe/Adyen sandbox, Payment Service, Webhook handling"
            />
            <FlowNode
              id="client-platform-complete"
              title="Platform Integration Complete"
              color="client"
              realWorld="Client fully onboarded: Can create contracts, add funds, track payments, invite contractors, manage full workflow"
              underHood="All services integrated: Auth (Clerk), User Service, Contract Service, Payment Service, Notification Service → Client has full access to platform features via API Gateway"
              example="Client now manages 5 contractors across UAE, Egypt, and Saudi Arabia, tracking payments in real-time with multi-currency support"
              modularAdvantage="Modular services allow adding new features (time tracking, invoicing) without disrupting existing workflows. POC Validation: End-to-end client journey working"
            />
          </div>
        </div>

        {/* Contractor Flow */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-contractor text-center">Contractor Flow</h3>
          <div className="space-y-3">
            <FlowNode
              id="contractor-kyc"
              title="KYC Verification"
              color="contractor"
              realWorld="Contractor registers & uploads documents: Passport/ID, proof of address, bank statement, tax ID for MENA compliance"
              underHood="Registration form → Documents uploaded to AWS S3 → KYC Service validates (basic OCR/Tesseract or cloud API) → Status: pending_verification → Admin reviews → Status: verified → Contractor can receive contracts"
              example="UAE contractor uploads Emirates ID and bank statement, documents stored in S3, admin approves in 2 hours, contractor verified to receive payments"
              modularAdvantage="KYC Service isolated for regulatory compliance, can integrate third-party KYC providers (Onfido, Jumio), country-specific rules managed separately. POC Tools: AWS S3, Basic OCR, Admin approval workflow"
            />
            <FlowNode
              id="contractor-dashboard-access"
              title="Dashboard Access"
              color="contractor"
              realWorld="Contractor logs in and views dashboard: Contracts assigned to contractor, payment balance & history, KYC status"
              underHood="JWT validated via Clerk → User Service fetches contractor profile → Contract Service loads contracts (role-based filtering) → Payment Service shows balance → UI renders contractor-specific data"
              example="Contractor sees 2 active contracts, 1 pending signature, $3k pending payment release, and KYC status: verified"
              modularAdvantage="Contractor dashboard consumes same backend services as client dashboard, but with different permissions via API Gateway. POC Tools: Role-based access control (RBAC)"
            />
            <FlowNode
              id="contractor-incoming-contracts"
              title="Incoming Contracts"
              color="contractor"
              realWorld="Contractor receives & signs contract: Receives notification (email + in-app), reviews PDF, clicks 'Sign', e-signature captured, contract becomes active"
              underHood="Notification Service (SendGrid) alerts contractor → Contract displayed → E-signature captured (DocuSign sandbox API or signature pad) → Contract status: signed → PDF updated with signatures → Status: active → Notification sent to client"
              example="Contractor reviews contract from UAE client, signs digitally via DocuSign sandbox, contract becomes active, work can begin"
              modularAdvantage="E-signature integration modular, can switch providers (HelloSign, Adobe Sign), contract workflow can handle complex approval chains. POC Tools: DocuSign sandbox or signature pad component"
            />
            <FlowNode
              id="contractor-receive-payments"
              title="Receive Payments"
              color="contractor"
              realWorld="Contractor receives payment after milestone: Client marks milestone complete, Payment Service releases escrow, currency conversion (if needed), payout initiated (mocked in POC)"
              underHood="Client marks milestone complete → Payment Service releases escrow → Currency conversion (ExchangeRate-API): USD → Contractor's currency → Payout initiated (Stripe Connect or bank transfer mock) → Transaction logged → Contractor balance updated → Notification sent"
              example="Contractor receives $5k USD converted to 18,375 AED (UAE contractor) or 155,000 EGP (Egypt contractor), sees transaction in dashboard with exchange rate, balance updated"
              modularAdvantage="Payment Service handles multi-currency, can add crypto payouts, instant payment options, or integrate local payment rails per country (UPI, Alipay). POC Tools: Payment Service, Currency API (ExchangeRate-API), Mock payout"
            />
          </div>
        </div>

        {/* Admin Flow */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-admin text-center">Admin Oversight</h3>
          <div className="space-y-3">
            <FlowNode
              id="admin-database-oversight"
              title="Database Oversight"
              color="admin"
              realWorld="Admin monitors system: Total users (clients/contractors), active contracts, escrow balance, pending KYC verifications, real-time metrics"
              underHood="Admin logs in (role: admin) → Admin Dashboard queries: User Service, Contract Service, Payment Service → Aggregated data displayed → Real-time metrics via WebSocket or polling → Direct DB read access for deep inspection"
              example="Admin sees 150 active clients, 320 contractors, $2.5M in escrow, 45 pending KYC verifications, 12 contracts pending signature"
              modularAdvantage="Admin consumes all backend APIs, can add new services (dispute resolution, analytics) without changing user-facing apps. POC Tools: Admin dashboard, Aggregation API"
            />
            <FlowNode
              id="admin-logs-monitoring"
              title="Logs & Monitoring"
              color="admin"
              realWorld="Admin reviews system health: API errors, performance metrics, payment failures, service status, system logs"
              underHood="All services send structured logs to CloudWatch (AWS) or Grafana → Admin views via dashboard → Alerts configured for critical errors → Performance metrics tracked (response time, error rate)"
              example="Admin sees Payment Service had 3 failed transactions due to Stripe API timeout, views logs, triggers investigation, fixes webhook handler"
              modularAdvantage="Centralized logging across all microservices, can trace request flow across services, add custom alerts per service. POC Tools: CloudWatch (AWS) or Grafana, Structured logging"
            />
            <FlowNode
              id="admin-monitor-contracts-payments"
              title="Monitor Contracts & Payments"
              color="admin"
              realWorld="Admin tracks contract lifecycle: Contract list with status filters, payment logs & audit trail, dispute resolution, anomaly detection"
              underHood="Real-time dashboard with WebSocket updates or polling → Contract Service events → Payment Service events → Notification triggers for anomalies → Admin can approve/reject contracts, resolve disputes"
              example="Admin notices contract stuck in 'Pending Signature' for 10 days, sends reminder to contractor via Notification Service, views payment logs for audit trail"
              modularAdvantage="Event-driven architecture allows adding workflow automation, SLA monitoring, and automated escalation without code changes. POC Tools: Event-driven architecture, Audit logging"
            />
          </div>
        </div>
      </div>

      {/* Arrow indicating flow to backend */}
      <div className="flex justify-center">
        <ArrowDown className="w-8 h-8 text-muted-foreground animate-pulse" />
      </div>

      {/* Backend Service Modules */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground text-center">Backend Service Modules (Microservices Ready)</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <FlowNode
            id="auth-service"
            title="Auth & Identity Service"
            color="backend"
            realWorld="Handles user authentication, session management, password resets, OAuth2 (Google, LinkedIn)"
            underHood="Clerk or Auth0 for JWT generation/validation, OAuth2 integration, Redis for session storage, rate limiting, email verification, 2FA support (future)"
            example="Client logs in with Google OAuth via Clerk → Auth Service validates → JWT issued → Session stored in Redis → User redirected to dashboard"
            modularAdvantage="Isolated auth logic, can scale independently during login spikes, add biometric auth, support SAML for enterprise clients, deploy globally for low latency. POC Stack: NestJS/FastAPI, Clerk/Auth0, Redis"
          />
          <FlowNode
            id="user-service"
            title="User Service"
            color="backend"
            realWorld="Manages user profiles, company details, roles & permissions (client, contractor, admin), user CRUD operations"
            underHood="NestJS API with Prisma ORM, PostgreSQL for user data, RBAC (Role-Based Access Control), profile update APIs, user search/filtering, audit logging"
            example="Contractor updates profile with new bank details → User Service validates → PostgreSQL updated via Prisma → Change logged for audit"
            modularAdvantage="User data centralized, can add analytics (user segmentation), integrate CRM, support multi-tenancy for enterprise clients. POC Stack: NestJS, Prisma, PostgreSQL"
          />
          <FlowNode
            id="contract-service"
            title="Contract Service"
            color="backend"
            realWorld="Creates, stores, and manages contract lifecycle: CRUD operations, PDF generation, e-signature integration, contract versioning"
            underHood="NestJS API, PostgreSQL for contract storage via Prisma, state machine for contract status (Draft → Pending → Signed → Active → Completed), PDF generation (PDFKit/Puppeteer), DocuSign integration, audit logs"
            example="Client creates contract → Contract Service validates → PDF generated → Contractor signs via DocuSign → Status updated → Both parties notified via Notification Service"
            modularAdvantage="Contract logic isolated, can add complex approval workflows, template management, integrate DocuSign/HelloSign, support multiple contract types (freelance, employment, NDA). POC Stack: NestJS, Prisma, PDFKit/Puppeteer, DocuSign sandbox"
          />
          <FlowNode
            id="payment-service"
            title="Payment Service"
            color="backend"
            realWorld="Processes payments (simulated in POC), manages escrow, handles payouts, currency conversion"
            underHood="NestJS API, Stripe/Adyen sandbox integration, escrow balance tracking in PostgreSQL, currency conversion (ExchangeRate-API), transaction logging, webhook handling, retry logic for failed payments"
            example="Client adds $10k via Stripe sandbox → Payment Service charges card → Funds in escrow → Contractor completes work → Payment released → $10k converted to contractor's currency → Mock payout initiated"
            modularAdvantage="Payment logic decoupled for PCI compliance, can add multiple gateways, support crypto, instant payouts, region-specific payment methods (UPI, Alipay), separate microservice for currency conversion. POC Stack: NestJS, Stripe/Adyen sandbox, ExchangeRate-API"
          />
          <FlowNode
            id="notification-service"
            title="Notification Service"
            color="backend"
            realWorld="Sends email, SMS (optional), in-app notifications: Contract sent, payment received, KYC approved, etc."
            underHood="NestJS API, queue-based (RabbitMQ/AWS SQS), email via SendGrid, SMS via Twilio (optional), in-app notifications stored in PostgreSQL, template management, delivery tracking"
            example="Contractor signs contract → Notification Service queues email to client via SendGrid → 'Contract Signed' email sent → In-app notification displayed in client dashboard"
            modularAdvantage="Notification logic isolated, can add push notifications, WhatsApp, Slack integrations, prioritize critical alerts, scale independently for high-volume campaigns. POC Stack: NestJS, SendGrid, PostgreSQL for in-app notifications"
          />
        </div>
      </div>

      {/* Database & Infrastructure */}
      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-bold text-foreground text-center flex items-center justify-center gap-2">
          <Database className="w-6 h-6" />
          Database & Infrastructure Layer
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FlowNode
            id="postgresql"
            title="PostgreSQL Database"
            color="database"
            realWorld="Primary database for users, contracts, payments, transactions, KYC documents, notifications"
            underHood="Tables: users, contracts, payments, transactions, kyc_documents, notifications, audit_logs. Prisma ORM for access, indexed for fast queries, encrypted at rest, can be replicated for high availability"
            example="Every contract creation, payment, and user action is stored here with timestamps and audit trails. POC: Seeded with demo data (3 clients, 3 contractors)"
            modularAdvantage="Single source of truth, can shard by region (EU DB, US DB), add read replicas for analytics, separate DB per microservice in future. POC Stack: PostgreSQL, Prisma ORM"
          />
          <FlowNode
            id="redis"
            title="Redis Cache"
            color="database"
            realWorld="In-memory cache for sessions, frequently accessed data, rate limiting"
            underHood="JWT sessions (Clerk/Auth0), user profile cache (TTL 1hr), contract status cache, rate limiting counters, session storage"
            example="Client logs in → Session stored in Redis → Subsequent API calls validate from cache instead of DB → 10x faster response"
            modularAdvantage="Cache isolated, can scale independently, add regional caches, use for real-time features (typing indicators, live updates). POC Stack: Redis for sessions"
          />
          <FlowNode
            id="s3-storage"
            title="S3 Storage"
            color="database"
            realWorld="File storage for contract PDFs, KYC documents (passport, ID, bank statements), profile images"
            underHood="AWS S3 buckets with versioning, signed URLs for secure access, lifecycle policies for archival, CDN for fast delivery, document upload API"
            example="Contractor uploads Emirates ID → Stored in S3 → Admin accesses via signed URL → After KYC approval, document archived to Glacier. POC: S3 for all document storage"
            modularAdvantage="Storage decoupled from services, can switch providers (Google Cloud Storage), add virus scanning, OCR processing, image optimization. POC Stack: AWS S3"
          />
        </div>
      </div>

      {/* Microservices Expansion Guide */}
      <Card className="p-6 bg-gradient-to-br from-backend-service/10 to-primary/10 border-2 border-backend-service/30">
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          🚀 Microservices Expansion Path
        </h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div>
            <strong className="text-foreground">Current Architecture:</strong> Modular monolith with clear service boundaries. All services run in a single application but with isolated logic.
          </div>
          <div>
            <strong className="text-foreground">Phase 1 (Quick Wins):</strong> Extract Payment Service into separate microservice for PCI compliance and independent scaling during payment spikes.
          </div>
          <div>
            <strong className="text-foreground">Phase 2 (Growth):</strong> Extract Notification Service for high-volume email/SMS campaigns without affecting core platform performance.
          </div>
          <div>
            <strong className="text-foreground">Phase 3 (Scale):</strong> Extract Auth Service for global deployment (auth servers closer to users for low latency), add regional databases.
          </div>
          <div>
            <strong className="text-foreground">Phase 4 (Advanced):</strong> Extract Contract Service, add Currency Conversion microservice, implement event-driven architecture with Kafka for real-time analytics.
          </div>
          <div className="pt-2 border-t border-border">
            <strong className="text-backend-service">Why Modular First?</strong> Start with a modular monolith to validate product-market fit. Extracting to microservices is straightforward since service boundaries are already defined. Avoid premature optimization and operational complexity of microservices until scale demands it.
          </div>
        </div>
      </Card>

      {/* Technical Stack */}
      <Card className="p-6 bg-muted/30">
        <h3 className="text-lg font-bold text-foreground mb-3">🛠️ Technical Stack (POC - All Modules)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-semibold text-foreground mb-2">Frontend:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Next.js 15 (React framework)</li>
              <li>• TanStack Query (data fetching)</li>
              <li>• Tailwind CSS (styling)</li>
              <li>• React Hook Form + Zod (validation)</li>
              <li>• shadcn/ui (components)</li>
              <li>• Vercel (hosting)</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-2">Backend Services:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• NestJS (Node.js + TypeScript)</li>
              <li>• PostgreSQL (database)</li>
              <li>• Prisma (ORM)</li>
              <li>• Redis (cache/sessions)</li>
              <li>• Clerk/Auth0 (authentication)</li>
              <li>• AWS ECS / Cloud Run (hosting)</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-2">Integrations:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Stripe/Adyen (payments - sandbox)</li>
              <li>• SendGrid (email)</li>
              <li>• DocuSign (e-signature - sandbox)</li>
              <li>• AWS S3 (storage)</li>
              <li>• CloudWatch (monitoring)</li>
              <li>• ExchangeRate-API (currency)</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">POC Focus:</strong> MENA contractors (UAE, Egypt, Saudi Arabia) + Global clients. 
            Simulated payments with Stripe/Adyen sandbox. Multi-currency support (USD, EUR, AED, EGP). 
            12-week timeline with 6 phases.
          </p>
        </div>
      </Card>
    </div>
  );
};
