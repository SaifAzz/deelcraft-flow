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
            title="Landing Page"
            color="frontend"
            realWorld="Public-facing homepage with product info, pricing, and sign-up CTAs"
            underHood="Static React component with routing to auth flows, optimized for SEO with meta tags and lazy loading"
            example="A visitor from UAE lands on the site, reads about the platform, and clicks 'Get Started' → routed to registration"
            modularAdvantage="Standalone module that can be deployed independently on CDN, updated without affecting dashboards, and A/B tested separately"
          />
          <FlowNode
            title="Client Dashboard"
            color="frontend"
            realWorld="Client's main interface to manage contracts, view payments, and add funds"
            underHood="React dashboard with protected routes, state management (React Query), real-time updates via WebSocket/polling"
            example="US startup logs in to see active contracts with contractors in India and Egypt, checks payment status, initiates new hire"
            modularAdvantage="Independent deployment cycle from contractor dashboard, can scale UI updates without affecting backend, reusable components across admin panel"
          />
          <FlowNode
            title="Contractor Dashboard"
            color="frontend"
            realWorld="Contractor's view to see incoming contracts, track earnings, and manage KYC"
            underHood="Separate React app with contractor-specific state, integrated with payment status APIs and notification system"
            example="Indian contractor logs in to see new contract from US client, reviews terms, signs digitally, and tracks payment milestone"
            modularAdvantage="Isolated from client dashboard for security (no cross-access), can be localized independently for different regions, separate analytics tracking"
          />
          <FlowNode
            title="Contract Wizard"
            color="frontend"
            realWorld="Multi-step form to create contracts with terms, milestones, and payment schedules"
            underHood="React form with validation (Zod), draft saving to DB, PDF preview generation, e-signature integration"
            example="Client creates contract: fills contractor details, sets payment milestones ($5k upfront, $5k on delivery), reviews PDF, sends for signature"
            modularAdvantage="Reusable across client and admin panels, can be embedded in other products, independently testable, PDF generation can become separate microservice"
          />
          <FlowNode
            title="Admin Dashboard"
            color="frontend"
            realWorld="Admin panel for monitoring users, contracts, payments, and resolving disputes"
            underHood="React admin interface with role-based access control, data tables with filtering/search, real-time metrics"
            example="Admin reviews flagged contract dispute between UAE client and Egypt contractor, views payment history, and initiates refund"
            modularAdvantage="Single admin interface consuming all backend services, can add new monitoring features without touching user-facing apps"
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
              title="Registration"
              color="client"
              realWorld="Client signs up with email/Google, provides company details"
              underHood="JWT token created → User record in DB (PostgreSQL) → Email verification sent via Notification Service → Session stored"
              example="Startup in UAE registers with company email, verifies, and logs in"
              modularAdvantage="Auth Service handles registration independently, can add OAuth providers (LinkedIn, Microsoft) without changing other services"
            />
            <FlowNode
              title="Dashboard Access"
              color="client"
              realWorld="Client lands on dashboard to view contracts and payments"
              underHood="Auth middleware validates JWT → User Service fetches user data → Contract Service loads active contracts → UI renders"
              example="Client sees 3 active contracts, 1 pending payment, and a notification about a new contractor application"
              modularAdvantage="Dashboard aggregates data from multiple services via API Gateway, services can be updated independently"
            />
            <FlowNode
              title="Contract Creation"
              color="client"
              realWorld="Client creates contract with terms, milestones, payment schedule"
              underHood="Contract Wizard collects data → Contract Service validates → PDF generated (Document Service) → Stored in DB → Notification sent to contractor"
              example="Client creates contract for Egyptian contractor: $10k total, 50% upfront, 50% on delivery"
              modularAdvantage="Contract Service is isolated, can switch PDF generation libraries, add e-signature providers, or handle complex contract types without affecting payment flow"
            />
            <FlowNode
              title="Add Funds"
              color="client"
              realWorld="Client adds funds to escrow for contract"
              underHood="Payment Service integrates Stripe/Adyen → Card charged → Balance updated in DB → Escrow locked for contract → Notification sent"
              example="Client adds $5k USD via credit card, funds appear in escrow, contractor can see 'Payment Secured' status"
              modularAdvantage="Payment Service decoupled for PCI compliance, can add multiple payment gateways (ACH, crypto), currency conversion microservice can be added separately"
            />
            <FlowNode
              title="Connect to Platform"
              color="client"
              realWorld="Client is fully onboarded and can manage all contracts"
              underHood="All services integrated: Auth, User, Contract, Payment, Notification → Client has full access to platform features"
              example="Client now manages 5 contractors across 3 countries, tracking payments in real-time"
              modularAdvantage="Modular services allow adding new features (time tracking, invoicing) without disrupting existing workflows"
            />
          </div>
        </div>

        {/* Contractor Flow */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-contractor text-center">Contractor Flow</h3>
          <div className="space-y-3">
            <FlowNode
              title="KYC Verification"
              color="contractor"
              realWorld="Contractor uploads ID, proof of address for verification"
              underHood="Document upload to Storage (S3) → KYC Service validates documents → AI verification (OCR) → Admin review if flagged → Status updated in DB"
              example="Indian contractor uploads Aadhaar card and bank statement, verified in 2 hours, approved to receive payments"
              modularAdvantage="KYC Service isolated for regulatory compliance, can integrate third-party KYC providers (Onfido, Jumio), country-specific rules managed separately"
            />
            <FlowNode
              title="Dashboard Access"
              color="contractor"
              realWorld="Contractor views incoming contracts and payment status"
              underHood="Auth validation → User Service fetches contractor profile → Contract Service loads contracts assigned to contractor → Payment Service shows balance"
              example="Contractor sees 2 active contracts, 1 pending signature, and $3k pending payment release"
              modularAdvantage="Contractor dashboard consumes same backend services as client dashboard, but with different permissions via API Gateway"
            />
            <FlowNode
              title="Incoming Contracts"
              color="contractor"
              realWorld="Contractor reviews contract, signs digitally"
              underHood="Notification Service alerts contractor → Contract displayed → E-signature captured (DocuSign API) → Contract status updated → PDF generated with signatures"
              example="Contractor reviews contract from UAE client, signs digitally, and contract becomes active"
              modularAdvantage="E-signature integration modular, can switch providers (HelloSign, Adobe Sign), contract workflow can handle complex approval chains"
            />
            <FlowNode
              title="Receive Payments"
              color="contractor"
              realWorld="Contractor receives payment to bank account or wallet"
              underHood="Payment Service releases escrow → Currency conversion (USD to INR) → Transfer to contractor's account (Stripe Connect/bank transfer) → Transaction logged → Notification sent"
              example="Contractor receives $5k converted to ₹415k in Indian bank account, sees transaction in dashboard with exchange rate"
              modularAdvantage="Payment Service handles multi-currency, can add crypto payouts, instant payment options, or integrate local payment rails per country"
            />
          </div>
        </div>

        {/* Admin Flow */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-admin text-center">Admin Oversight</h3>
          <div className="space-y-3">
            <FlowNode
              title="Database Oversight"
              color="admin"
              realWorld="Admin monitors all users, contracts, payments in real-time"
              underHood="Admin Dashboard queries User Service, Contract Service, Payment Service → Aggregated data displayed → Direct DB read access for deep inspection"
              example="Admin sees 150 active clients, 320 contractors, $2.5M in escrow, 45 pending KYC verifications"
              modularAdvantage="Admin consumes all backend APIs, can add new services (dispute resolution, analytics) without changing user-facing apps"
            />
            <FlowNode
              title="Logs & Monitoring"
              color="admin"
              realWorld="Admin reviews system logs, API errors, performance metrics"
              underHood="Centralized logging (CloudWatch/Grafana) → All services send logs → Admin views via dashboard → Alerts configured for critical errors"
              example="Admin sees Payment Service had 3 failed transactions due to Stripe API timeout, triggers investigation"
              modularAdvantage="Centralized logging across all microservices, can trace request flow across services, add custom alerts per service"
            />
            <FlowNode
              title="Monitor Contracts & Payments"
              color="admin"
              realWorld="Admin tracks contract lifecycle, payment releases, dispute resolution"
              underHood="Real-time dashboard with WebSocket updates → Contract Service events → Payment Service events → Notification triggers for anomalies"
              example="Admin notices contract stuck in 'Pending Signature' for 10 days, sends reminder to contractor via Notification Service"
              modularAdvantage="Event-driven architecture allows adding workflow automation, SLA monitoring, and automated escalation without code changes"
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
            title="Auth & Identity Service"
            color="backend"
            realWorld="Handles user authentication, session management, password resets"
            underHood="JWT generation/validation, OAuth2 integration, Redis for session storage, rate limiting, 2FA support"
            example="Client logs in with Google OAuth → Auth Service validates → JWT issued → Session stored in Redis → User redirected to dashboard"
            modularAdvantage="Isolated auth logic, can scale independently during login spikes, add biometric auth, support SAML for enterprise clients, deploy globally for low latency"
          />
          <FlowNode
            title="User Service"
            color="backend"
            realWorld="Manages user profiles, company details, roles & permissions"
            underHood="PostgreSQL for user data, RBAC (Role-Based Access Control), profile update APIs, user search/filtering"
            example="Contractor updates profile with new bank details → User Service validates → DB updated → Change logged for audit"
            modularAdvantage="User data centralized, can add analytics (user segmentation), integrate CRM, support multi-tenancy for enterprise clients"
          />
          <FlowNode
            title="Contract Service"
            color="backend"
            realWorld="Creates, stores, and manages contract lifecycle"
            underHood="PostgreSQL for contract storage, state machine for contract status (Draft → Pending → Signed → Active → Completed), versioning, audit logs"
            example="Client creates contract → Contract Service validates → PDF generated → Contractor signs → Status updated → Both parties notified"
            modularAdvantage="Contract logic isolated, can add complex approval workflows, template management, integrate DocuSign/HelloSign, support multiple contract types (freelance, employment, NDA)"
          />
          <FlowNode
            title="Payment Service"
            color="backend"
            realWorld="Processes payments, manages escrow, handles payouts"
            underHood="Stripe/Adyen integration, escrow balance tracking, currency conversion API, transaction logging, webhook handling, retry logic for failed payments"
            example="Client adds $10k → Payment Service charges card → Funds in escrow → Contractor completes work → Payment released → $10k (minus fees) transferred to contractor"
            modularAdvantage="Payment logic decoupled for PCI compliance, can add multiple gateways, support crypto, instant payouts, region-specific payment methods (UPI, Alipay), separate microservice for currency conversion"
          />
          <FlowNode
            title="Notification Service"
            color="backend"
            realWorld="Sends email, SMS, in-app notifications"
            underHood="Queue-based (RabbitMQ/SQS), email via SendGrid, SMS via Twilio, in-app via WebSocket, template management, delivery tracking"
            example="Contractor signs contract → Notification Service queues email to client → 'Contract Signed' email sent → In-app notification displayed"
            modularAdvantage="Notification logic isolated, can add push notifications, WhatsApp, Slack integrations, prioritize critical alerts, scale independently for high-volume campaigns"
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
            title="PostgreSQL Database"
            color="database"
            realWorld="Primary database for users, contracts, payments, transactions"
            underHood="Tables: users, contracts, payments, transactions, notifications, audit_logs. Indexed for fast queries, replicated for high availability, encrypted at rest"
            example="Every contract creation, payment, and user action is stored here with timestamps and audit trails"
            modularAdvantage="Single source of truth, can shard by region (EU DB, US DB), add read replicas for analytics, separate DB per microservice in future"
          />
          <FlowNode
            title="Redis Cache"
            color="database"
            realWorld="In-memory cache for sessions, frequently accessed data"
            underHood="JWT sessions, user profile cache (TTL 1hr), contract status cache, rate limiting counters"
            example="Client logs in → Session stored in Redis → Subsequent API calls validate from cache instead of DB → 10x faster response"
            modularAdvantage="Cache isolated, can scale independently, add regional caches, use for real-time features (typing indicators, live updates)"
          />
          <FlowNode
            title="S3 Storage"
            color="database"
            realWorld="File storage for contract PDFs, KYC documents, profile images"
            underHood="AWS S3 buckets with versioning, signed URLs for secure access, lifecycle policies for archival, CDN for fast delivery"
            example="Contractor uploads ID → Stored in S3 → Admin accesses via signed URL → After KYC approval, document archived to Glacier"
            modularAdvantage="Storage decoupled from services, can switch providers (Google Cloud Storage), add virus scanning, OCR processing, image optimization"
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
        <h3 className="text-lg font-bold text-foreground mb-3">🛠️ Technical Stack (All Modules)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-semibold text-foreground mb-2">Frontend:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• React 18 with TypeScript</li>
              <li>• TanStack Query (data fetching)</li>
              <li>• React Router (routing)</li>
              <li>• Tailwind CSS (styling)</li>
              <li>• Zod (validation)</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-2">Backend Services:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Node.js + Express (API)</li>
              <li>• PostgreSQL (database)</li>
              <li>• Redis (cache/sessions)</li>
              <li>• JWT (authentication)</li>
              <li>• Prisma (ORM)</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-2">Integrations:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Stripe/Adyen (payments)</li>
              <li>• SendGrid (email)</li>
              <li>• Twilio (SMS)</li>
              <li>• AWS S3 (storage)</li>
              <li>• CloudWatch/Grafana (monitoring)</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
