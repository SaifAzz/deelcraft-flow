import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowDown, ArrowRight, Database, Server, Globe, Layers, Zap, Lock, MessageSquare } from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";

const TechnicalArchitecture = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-backend-service/10 to-primary/10">
        <div className="container mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Flow Diagram
          </Button>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Technical Architecture Flow
            </h1>
            <p className="text-lg text-muted-foreground">
              Complete system architecture with service interactions and data flow
            </p>
          </div>
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="container mx-auto px-6 py-12">
        {/* Frontend Layer */}
        <div className="space-y-8 mb-12">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <Globe className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-bold text-foreground">Frontend Layer</h2>
            </div>
            <p className="text-muted-foreground">Next.js 15 applications deployed on Vercel</p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { name: "Landing Page", tech: ["Next.js 15", "SSR", "SEO"] },
              { name: "Client Dashboard", tech: ["Next.js 15", "TanStack Query", "Clerk"] },
              { name: "Contractor Dashboard", tech: ["Next.js 15", "RBAC"] },
              { name: "Contract Wizard", tech: ["React Hook Form", "Zod", "PDF Preview"] },
              { name: "Admin Dashboard", tech: ["Next.js 15", "TanStack Table"] },
            ].map((module, idx) => (
              <Card key={idx} className="p-4 border-2 border-secondary/30 bg-secondary/5">
                <h3 className="font-semibold mb-2">{module.name}</h3>
                <div className="space-y-1">
                  {module.tech.map((tech, i) => (
                    <Badge key={i} variant="outline" className="text-xs mr-1 mb-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center my-8">
          <div className="flex flex-col items-center gap-2">
            <ArrowDown className="w-8 h-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">API Gateway</span>
          </div>
        </div>

        {/* API Gateway */}
        <Card className="p-6 mb-12 border-2 border-backend-service/30 bg-backend-service/5">
          <div className="flex items-center gap-3 mb-4">
            <Layers className="w-6 h-6 text-backend-service" />
            <h2 className="text-2xl font-bold text-foreground">API Gateway</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">NestJS API Gateway</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• JWT validation middleware</li>
                <li>• Rate limiting</li>
                <li>• Request routing</li>
                <li>• Error handling</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Features</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Role-based access control (RBAC)</li>
                <li>• Request logging</li>
                <li>• CORS configuration</li>
                <li>• API versioning</li>
              </ul>
            </div>
          </div>
        </Card>

        <div className="flex justify-center my-8">
          <div className="flex flex-col items-center gap-2">
            <ArrowDown className="w-8 h-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Backend Services</span>
          </div>
        </div>

        {/* Backend Services Layer */}
        <div className="space-y-8 mb-12">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <Server className="w-6 h-6 text-backend-service" />
              <h2 className="text-2xl font-bold text-foreground">Backend Services (Microservices-Ready)</h2>
            </div>
            <p className="text-muted-foreground">NestJS services with clear boundaries</p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              {
                name: "Auth & Identity",
                icon: Lock,
                tech: ["Clerk/Auth0", "JWT", "OAuth2", "Redis"],
                description: "User authentication, session management, OAuth2 integration"
              },
              {
                name: "User Service",
                icon: Server,
                tech: ["NestJS", "Prisma", "PostgreSQL", "RBAC"],
                description: "User profiles, company details, roles & permissions"
              },
              {
                name: "Contract Service",
                icon: Layers,
                tech: ["NestJS", "PDFKit", "DocuSign", "State Machine"],
                description: "Contract lifecycle, PDF generation, e-signature"
              },
              {
                name: "Payment Service",
                icon: Zap,
                tech: ["NestJS", "Stripe/Adyen", "Escrow", "Currency API"],
                description: "Payment processing, escrow management, payouts"
              },
              {
                name: "Notification Service",
                icon: MessageSquare,
                tech: ["NestJS", "SendGrid", "Queue", "Templates"],
                description: "Email, SMS, in-app notifications"
              },
            ].map((service, idx) => (
              <Card key={idx} className="p-6 border-2 border-backend-service/30 bg-backend-service/5">
                <div className="flex items-center gap-2 mb-3">
                  <service.icon className="w-5 h-5 text-backend-service" />
                  <h3 className="font-semibold">{service.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{service.description}</p>
                <div className="space-y-1">
                  {service.tech.map((tech, i) => (
                    <Badge key={i} variant="outline" className="text-xs mr-1 mb-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center my-8">
          <div className="flex flex-col items-center gap-2">
            <ArrowDown className="w-8 h-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Data Layer</span>
          </div>
        </div>

        {/* Data Layer */}
        <div className="space-y-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <Database className="w-6 h-6 text-database" />
              <h2 className="text-2xl font-bold text-foreground">Data & Infrastructure Layer</h2>
            </div>
            <p className="text-muted-foreground">Storage, caching, and infrastructure services</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* PostgreSQL */}
            <Card className="p-6 border-2 border-database/30 bg-database/5">
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-6 h-6 text-database" />
                <h3 className="text-lg font-semibold">PostgreSQL</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Primary database for all application data
              </p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-semibold mb-1">Tables:</p>
                  <div className="flex flex-wrap gap-1">
                    {["users", "contracts", "payments", "transactions", "kyc_documents", "notifications"].map((table) => (
                      <Badge key={table} variant="outline" className="text-xs">
                        {table}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-1">Features:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Prisma ORM</li>
                    <li>• Indexed queries</li>
                    <li>• Encrypted at rest</li>
                    <li>• Audit logs</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Redis */}
            <Card className="p-6 border-2 border-database/30 bg-database/5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-6 h-6 text-database" />
                <h3 className="text-lg font-semibold">Redis Cache</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                In-memory cache for sessions and frequently accessed data
              </p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-semibold mb-1">Usage:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• JWT sessions</li>
                    <li>• User profile cache (TTL 1hr)</li>
                    <li>• Contract status cache</li>
                    <li>• Rate limiting counters</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* S3 Storage */}
            <Card className="p-6 border-2 border-database/30 bg-database/5">
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-6 h-6 text-database" />
                <h3 className="text-lg font-semibold">AWS S3 Storage</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                File storage for documents and media
              </p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-semibold mb-1">Storage:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Contract PDFs</li>
                    <li>• KYC documents</li>
                    <li>• Profile images</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-1">Features:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Signed URLs</li>
                    <li>• Versioning</li>
                    <li>• Lifecycle policies</li>
                    <li>• CDN integration</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Service Interactions */}
        <Separator className="my-12" />

        <div className="space-y-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">Service Interaction Flow</h2>
            <p className="text-muted-foreground">How services communicate during a contract creation flow</p>
          </div>

          <Card className="p-8">
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-backend-service flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Client Creates Contract</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline">Frontend: Contract Wizard</Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <Badge variant="outline">API Gateway</Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <Badge variant="outline">Contract Service</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Contract Wizard validates form → API Gateway authenticates → Contract Service creates contract record
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-backend-service flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">PDF Generation</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline">Contract Service</Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <Badge variant="outline">PDFKit/Puppeteer</Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <Badge variant="outline">S3 Storage</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Contract Service generates PDF → Uploads to S3 → Returns signed URL
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-backend-service flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Notification Sent</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline">Contract Service</Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <Badge variant="outline">Notification Service</Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <Badge variant="outline">SendGrid</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Contract Service triggers notification → Notification Service queues email → SendGrid sends to contractor
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-backend-service flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Payment Processing</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline">Frontend: Payment Form</Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <Badge variant="outline">Payment Service</Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <Badge variant="outline">Stripe/Adyen</Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <Badge variant="outline">PostgreSQL</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Client submits payment → Payment Service processes → Stripe charges card → Webhook updates escrow in DB
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tech Stack Summary */}
        <Separator className="my-12" />

        <Card className="p-8 bg-gradient-to-br from-backend-service/10 to-primary/10">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Complete Tech Stack</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Frontend</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Next.js 15 (React framework)</li>
                <li>• TanStack Query (data fetching)</li>
                <li>• Tailwind CSS (styling)</li>
                <li>• React Hook Form + Zod (validation)</li>
                <li>• shadcn/ui (components)</li>
                <li>• Vercel (hosting)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Backend</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• NestJS (Node.js + TypeScript)</li>
                <li>• PostgreSQL (database)</li>
                <li>• Prisma (ORM)</li>
                <li>• Redis (cache/sessions)</li>
                <li>• Clerk/Auth0 (authentication)</li>
                <li>• AWS ECS / Cloud Run (hosting)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Integrations</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Stripe/Adyen (payments - sandbox)</li>
                <li>• SendGrid (email)</li>
                <li>• DocuSign (e-signature - sandbox)</li>
                <li>• AWS S3 (storage)</li>
                <li>• CloudWatch (monitoring)</li>
                <li>• ExchangeRate-API (currency)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TechnicalArchitecture;

