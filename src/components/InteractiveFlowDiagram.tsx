import * as React from "react";
import { FlowNode } from "./FlowNode";
import { ArrowRight, ArrowDown, Database, Activity, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

export const InteractiveFlowDiagram = () => {
  return (
    <div className="w-full overflow-x-auto pb-8">
      <div className="min-w-[1200px] p-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Client Flow Column */}
          <div className="col-span-3 space-y-4">
            <h3 className="text-lg font-bold text-client mb-4 text-center">Client Flow</h3>
            
            <FlowNode
              title="Registration & Verification"
              color="client"
              realWorld="Client signs up with email, verifies identity with documents (passport/business registration), passes compliance checks."
              underHood="POST /api/auth/register → User record created in DB → Email verification sent → Document upload to S3 → KYC service API call → Status updated to 'verified'"
              example="A US startup founder uploads their EIN and passport. System verifies via Stripe Identity API within 2 minutes."
            />
            
            <ArrowDown className="w-6 h-6 text-client mx-auto" />
            
            <FlowNode
              title="Client Dashboard"
              color="client"
              realWorld="View active contracts, payment history, contractor profiles, and upcoming milestones."
              underHood="GET /api/dashboard → Query contracts, payments, milestones from DB → Calculate totals → Render charts with Recharts"
              example="Dashboard shows 5 active contractors, $12,450 in pending payments, and 3 milestones due this week."
            />
            
            <ArrowDown className="w-6 h-6 text-client mx-auto" />
            
            <FlowNode
              title="Contract Creation"
              color="client"
              realWorld="Select contractor, define scope (fixed or hourly), set milestones, payment terms, start/end dates."
              underHood="POST /api/contracts → Generate contract PDF via Puppeteer → Store in S3 → Create DB record → Trigger notification service → Send email to contractor"
              example="Create 3-month contract for React developer: $6,000 fixed, 3 milestones ($2k each), payment within 7 days of approval."
            />
            
            <ArrowDown className="w-6 h-6 text-client mx-auto" />
            
            <FlowNode
              title="Add Funds"
              color="client"
              realWorld="Client adds funds via credit card, bank transfer, or wire. Funds held in escrow until milestone completion."
              underHood="POST /api/payments/fund → Stripe/Adyen API integration → Create payment intent → On success: Update wallet balance in DB → Log transaction → Update contract status to 'funded'"
              example="Add $6,000 via credit card (Visa). Funds show in escrow immediately. Stripe fee: $180 (3%)."
            />
          </div>

          {/* Central System Column */}
          <div className="col-span-6 flex flex-col justify-center items-center space-y-6">
            <Card className="p-6 bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary shadow-soft">
              <div className="text-center space-y-3">
                <Database className="w-12 h-12 text-primary mx-auto" />
                <h3 className="text-xl font-bold text-foreground">POC Platform Core</h3>
                <p className="text-sm text-muted-foreground">Central orchestration system</p>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <Activity className="w-8 h-8 text-secondary mb-2" />
                <h4 className="font-semibold text-sm text-foreground mb-1">Payment Engine</h4>
                <p className="text-xs text-muted-foreground">Stripe/Adyen integration, currency conversion, escrow management</p>
              </Card>
              
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <Database className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-semibold text-sm text-foreground mb-1">Database</h4>
                <p className="text-xs text-muted-foreground">PostgreSQL with users, contracts, payments, transactions tables</p>
              </Card>
              
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <FileText className="w-8 h-8 text-accent mb-2" />
                <h4 className="font-semibold text-sm text-foreground mb-1">Document Service</h4>
                <p className="text-xs text-muted-foreground">Contract PDF generation, e-signatures, document storage (S3)</p>
              </Card>
              
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <Activity className="w-8 h-8 text-admin mb-2" />
                <h4 className="font-semibold text-sm text-foreground mb-1">Notification Hub</h4>
                <p className="text-xs text-muted-foreground">Email (SendGrid), in-app notifications, SMS alerts</p>
              </Card>
            </div>

            <div className="flex gap-8 items-center">
              <ArrowRight className="w-8 h-8 text-client" />
              <span className="text-sm font-medium text-muted-foreground">Data Flow</span>
              <ArrowRight className="w-8 h-8 text-contractor" />
            </div>
          </div>

          {/* Contractor Flow Column */}
          <div className="col-span-3 space-y-4">
            <h3 className="text-lg font-bold text-contractor mb-4 text-center">Contractor Flow</h3>
            
            <FlowNode
              title="Registration & KYC"
              color="contractor"
              realWorld="Contractor signs up, uploads identity documents (passport, address proof), tax forms (W-9/W-8BEN), bank details."
              underHood="POST /api/contractors/register → Create user record → Upload docs to S3 → Trigger Persona/Onfido KYC check → Webhook updates verification status → Email confirmation sent"
              example="Indian contractor uploads Aadhaar, PAN card, and Indian bank account. KYC approved in 24 hours."
            />
            
            <ArrowDown className="w-6 h-6 text-contractor mx-auto" />
            
            <FlowNode
              title="Contractor Dashboard"
              color="contractor"
              realWorld="View incoming contract requests, active work, payment history, available balance, and withdrawal options."
              underHood="GET /api/contractor/dashboard → Fetch contracts, earnings, pending payments → Calculate currency conversions → Display balance in local currency"
              example="Dashboard shows 2 active clients, $3,200 earned this month, ₹268,000 available to withdraw."
            />
            
            <ArrowDown className="w-6 h-6 text-contractor mx-auto" />
            
            <FlowNode
              title="View & Accept Contracts"
              color="contractor"
              realWorld="Receive contract offer, review terms, accept or negotiate. Once accepted, work begins."
              underHood="GET /api/contracts/:id → Render contract details → On accept: PUT /api/contracts/:id/accept → Update status to 'active' → Trigger notification to client → Log event"
              example="Receive $6,000 React contract offer, review scope and milestones, click 'Accept'. Client notified instantly."
            />
            
            <ArrowDown className="w-6 h-6 text-contractor mx-auto" />
            
            <FlowNode
              title="Receive Payments"
              color="contractor"
              realWorld="When client approves milestone, funds released from escrow. Contractor receives payment in their bank account."
              underHood="POST /api/payments/release → Check escrow balance → Currency conversion (USD → INR via Wise API) → Initiate bank transfer → Update contractor wallet → Send payment receipt email → Log in transaction table"
              example="Milestone approved: $2,000 released. Converted to ₹168,000 at current rate. Bank transfer initiated, arrives in 1-2 days."
            />
          </div>
        </div>

        {/* Admin Flow - Bottom Section */}
        <div className="mt-12 pt-8 border-t-2 border-border">
          <h3 className="text-lg font-bold text-admin mb-6 text-center">Admin Oversight & Monitoring</h3>
          
          <div className="grid grid-cols-4 gap-4">
            <FlowNode
              title="Admin Dashboard"
              color="admin"
              realWorld="Real-time system overview: active users, contracts, payment volume, pending verifications, system health."
              underHood="GET /api/admin/dashboard → Aggregate queries across all tables → Calculate KPIs → Real-time WebSocket updates for live data → Render analytics charts"
              example="Dashboard shows 1,247 active users, 89 pending KYC verifications, $145,000 processed today across 56 countries."
            />
            
            <FlowNode
              title="User Management"
              color="admin"
              realWorld="View all clients and contractors, verify documents, approve/reject KYC, manage account status, handle disputes."
              underHood="GET /api/admin/users → Paginated user list with filters → Manual KYC review interface → PUT /api/admin/users/:id/verify → Update verification status → Audit log entry created"
              example="Admin reviews flagged KYC document, verifies authenticity, approves account. User notified via email immediately."
            />
            
            <FlowNode
              title="Contract & Payment Logs"
              color="admin"
              realWorld="Monitor all contracts, track payment flows, identify failed transactions, review disputed contracts, generate reports."
              underHood="GET /api/admin/logs → Query contracts, payments, transactions with join queries → Filter by status, date, amount → Export to CSV → CloudWatch/Grafana dashboards for monitoring"
              example="Review payment logs: 523 successful, 3 failed (insufficient funds). Drill down to see failed payment details and retry status."
            />
            
            <FlowNode
              title="Analytics & Reporting"
              color="admin"
              realWorld="Platform metrics: GMV, user growth, geographic distribution, payment success rates, average contract value, retention."
              underHood="Complex SQL aggregations → Data warehouse (Snowflake/BigQuery) → Scheduled ETL jobs → Visualization via Metabase/Looker → Alerts for anomalies"
              example="Monthly report: $2.3M GMV, 34% user growth, 98.7% payment success rate, top countries: US, UK, India, Brazil."
            />
          </div>
        </div>

        {/* Technical Stack Note */}
        <Card className="mt-8 p-6 bg-muted/50">
          <h4 className="font-semibold text-foreground mb-3">🔧 Under-the-Hood Technical Stack</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-1">Backend Services:</p>
              <ul className="space-y-1 text-xs">
                <li>• REST API (Node.js/Express)</li>
                <li>• PostgreSQL database</li>
                <li>• Redis for caching</li>
                <li>• S3 for file storage</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Payment Integration:</p>
              <ul className="space-y-1 text-xs">
                <li>• Stripe/Adyen sandbox</li>
                <li>• Wise API for FX conversion</li>
                <li>• Escrow wallet management</li>
                <li>• Webhook handling</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Monitoring & DevOps:</p>
              <ul className="space-y-1 text-xs">
                <li>• CloudWatch/Grafana logs</li>
                <li>• Error tracking (Sentry)</li>
                <li>• Performance monitoring (New Relic)</li>
                <li>• CI/CD (GitHub Actions)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
