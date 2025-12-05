import * as React from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ArrowDown, 
  ArrowRight, 
  Database, 
  Server, 
  Globe, 
  Layers, 
  Zap, 
  Lock, 
  MessageSquare,
  FileText,
  Users,
  Building2,
  CheckCircle2,
  FileSignature,
  Shield,
  Wallet,
  BookOpen,
  AlertCircle,
  Clock,
  CheckSquare
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import EcsFargateArchitectureDiagram from "@/components/EcsFargateArchitectureDiagram";

const FullSystemArchitecture = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
        <div className="container mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Mind-Links Full System Architecture
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Complete end-to-end workflow covering Client Registration, Contractor KYC, 
              Contract Creation, E-Signature, and Ledger Management
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge variant="outline" className="text-sm">
                <Building2 className="w-3 h-3 mr-1" />
                Client Registration
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Shield className="w-3 h-3 mr-1" />
                KYC Verification
              </Badge>
              <Badge variant="outline" className="text-sm">
                <FileText className="w-3 h-3 mr-1" />
                Contract Management
              </Badge>
              <Badge variant="outline" className="text-sm">
                <FileSignature className="w-3 h-3 mr-1" />
                E-Signature
              </Badge>
              <Badge variant="outline" className="text-sm">
                <BookOpen className="w-3 h-3 mr-1" />
                Immutable Ledger
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-4xl mx-auto mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="dataflow">Data Flow</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-8">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">System Overview</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Mind-Links is a comprehensive platform for managing international contractors, 
                handling the complete lifecycle from registration and verification to contract 
                management, payments, and compliance tracking.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 border-2 border-blue-500/30 bg-blue-500/5">
                  <Building2 className="w-10 h-10 text-blue-500 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Client Portal</h3>
                  <p className="text-sm text-muted-foreground">
                    Companies register, verify their business, invite contractors, 
                    create contracts, and manage payments.
                  </p>
                </Card>

                <Card className="p-6 border-2 border-purple-500/30 bg-purple-500/5">
                  <Users className="w-10 h-10 text-purple-500 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Contractor Portal</h3>
                  <p className="text-sm text-muted-foreground">
                    Independent contractors complete KYC verification, sign contracts, 
                    track work, and receive payments.
                  </p>
                </Card>

                <Card className="p-6 border-2 border-pink-500/30 bg-pink-500/5">
                  <Shield className="w-10 h-10 text-pink-500 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Admin Dashboard</h3>
                  <p className="text-sm text-muted-foreground">
                    Platform administrators monitor compliance, review documents, 
                    and manage platform operations.
                  </p>
                </Card>
              </div>

              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Key Differentiator:</strong> Built-in KYC verification (Veriff/Onfido), 
                  in-platform e-signature (no DocuSign), and immutable ledger (QLDB) for complete 
                  audit trails and compliance.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Core Capabilities</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: Building2, title: "Client Registration", desc: "Company verification with external business registries" },
                    { icon: Shield, title: "KYC Verification", desc: "ID capture, liveness check, document validation" },
                    { icon: FileText, title: "Contract Management", desc: "Direct hire and Employer of Record (EOR) contracts" },
                    { icon: FileSignature, title: "E-Signature", desc: "In-platform signing with cryptographic verification" },
                    { icon: Wallet, title: "Payment Processing", desc: "Multi-currency payments with escrow management" },
                    { icon: BookOpen, title: "Immutable Ledger", desc: "QLDB-based audit trail for all critical transactions" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
              <h3 className="text-2xl font-bold mb-4">5 Major Workflows</h3>
              <div className="space-y-4">
                {[
                  { 
                    num: "1", 
                    title: "Client Registration", 
                    desc: "Company submits registration → External registry validation → Profile creation",
                    color: "bg-blue-500"
                  },
                  { 
                    num: "2", 
                    title: "Contractor Invitation & KYC", 
                    desc: "Client invites contractor → KYC session (ID + selfie + video) → Verification result stored",
                    color: "bg-purple-500"
                  },
                  { 
                    num: "3", 
                    title: "Contract Creation", 
                    desc: "Client creates contract → Template selection → Draft saved → Ready for signature",
                    color: "bg-pink-500"
                  },
                  { 
                    num: "4", 
                    title: "E-Signature (Client & Contractor)", 
                    desc: "Client signs → Signature to QLDB & DB → Contractor notified → Contractor signs → Contract active",
                    color: "bg-orange-500"
                  },
                  { 
                    num: "5", 
                    title: "Ledger Activation", 
                    desc: "Contract activation recorded in QLDB → Payment schedule created → Immutable audit trail",
                    color: "bg-green-500"
                  },
                ].map((workflow, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className={`w-10 h-10 rounded-full ${workflow.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                      {workflow.num}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{workflow.title}</h4>
                      <p className="text-sm text-muted-foreground">{workflow.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* ARCHITECTURE TAB */}
          <TabsContent value="architecture" className="space-y-8">
            {/* Frontend Layer */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Globe className="w-6 h-6 text-blue-500" />
                  <h2 className="text-3xl font-bold text-foreground">Frontend Layer</h2>
                </div>
                <p className="text-muted-foreground">Next.js 15 applications with role-based dashboards</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { 
                    name: "Client Dashboard", 
                    icon: Building2,
                    tech: ["Next.js 15", "TanStack Query", "Clerk Auth"],
                    features: ["Company registration", "Contractor invitations", "Contract creation", "Payment management"]
                  },
                  { 
                    name: "Contractor Dashboard", 
                    icon: Users,
                    tech: ["Next.js 15", "React Hook Form", "Zod"],
                    features: ["KYC verification", "Contract signing", "Milestone tracking", "Payment history"]
                  },
                  { 
                    name: "Admin Dashboard", 
                    icon: Shield,
                    tech: ["Next.js 15", "TanStack Table", "Charts"],
                    features: ["Document review", "Compliance monitoring", "Audit logs", "Platform analytics"]
                  },
                ].map((dashboard, idx) => (
                  <Card key={idx} className="p-6 border-2 border-blue-500/30 bg-blue-500/5">
                    <div className="flex items-center gap-2 mb-3">
                      <dashboard.icon className="w-6 h-6 text-blue-500" />
                      <h3 className="font-semibold text-lg">{dashboard.name}</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">TECH STACK</p>
                        <div className="flex flex-wrap gap-1">
                          {dashboard.tech.map((tech, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">FEATURES</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {dashboard.features.map((feature, i) => (
                            <li key={i}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-2">
                <ArrowDown className="w-8 h-8 text-muted-foreground animate-bounce" />
                <span className="text-sm font-semibold text-muted-foreground">API Gateway</span>
              </div>
            </div>

            {/* API Gateway */}
            <Card className="p-8 border-2 border-purple-500/30 bg-purple-500/5">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="w-8 h-8 text-purple-500" />
                <h2 className="text-3xl font-bold text-foreground">API Gateway</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Core Responsibilities</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Authentication:</strong> JWT validation, session management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Authorization:</strong> Role-based access control (RBAC)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Rate Limiting:</strong> Prevent abuse and DDoS</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Request Routing:</strong> Direct to appropriate services</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Technology</h3>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Badge className="bg-purple-500">NestJS</Badge>
                      <Badge variant="outline">TypeScript</Badge>
                      <Badge variant="outline">Express</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Built with NestJS for structured, scalable API development with built-in 
                      dependency injection, middleware support, and excellent TypeScript integration.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-2">
                <ArrowDown className="w-8 h-8 text-muted-foreground animate-bounce" />
                <span className="text-sm font-semibold text-muted-foreground">Backend Services</span>
              </div>
            </div>

            {/* Backend Services Layer */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Server className="w-6 h-6 text-pink-500" />
                  <h2 className="text-3xl font-bold text-foreground">Backend Services (Microservices-Ready)</h2>
                </div>
                <p className="text-muted-foreground">NestJS services with clear domain boundaries</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Client Service",
                    icon: Building2,
                    color: "blue",
                    tech: ["NestJS", "Prisma", "PostgreSQL"],
                    responsibilities: [
                      "Company registration & verification",
                      "Business registry integration",
                      "Company profile management",
                      "Contractor invitation tokens"
                    ]
                  },
                  {
                    name: "KYC Service",
                    icon: Shield,
                    color: "purple",
                    tech: ["Veriff/Onfido API", "Webhook Processing", "Document Storage"],
                    responsibilities: [
                      "Identity verification sessions",
                      "Document capture (ID + selfie)",
                      "Liveness detection",
                      "Verification result handling"
                    ]
                  },
                  {
                    name: "Contract Service",
                    icon: FileText,
                    color: "pink",
                    tech: ["NestJS", "State Machine", "PDF Generation"],
                    responsibilities: [
                      "Contract lifecycle management",
                      "Template selection (Direct/EOR)",
                      "Draft contract creation",
                      "Status tracking"
                    ]
                  },
                  {
                    name: "E-Signature Module",
                    icon: FileSignature,
                    color: "orange",
                    tech: ["Cryptographic Signing", "QLDB Integration", "Webhook Events"],
                    responsibilities: [
                      "Signature capture & validation",
                      "Immutable signature recording",
                      "Multi-party signing workflow",
                      "Signature verification"
                    ]
                  },
                  {
                    name: "Ledger Service (QLDB)",
                    icon: BookOpen,
                    color: "green",
                    tech: ["Amazon QLDB", "Cryptographic Verification", "Audit Trail"],
                    responsibilities: [
                      "Contract activation entries",
                      "Signature event recording",
                      "Payment schedule creation",
                      "Immutable audit logs"
                    ]
                  },
                  {
                    name: "Notification Service",
                    icon: MessageSquare,
                    color: "yellow",
                    tech: ["SendGrid", "Queue Processing", "Templates"],
                    responsibilities: [
                      "Email notifications",
                      "In-app alerts",
                      "SMS (optional)",
                      "Notification history"
                    ]
                  },
                ].map((service, idx) => (
                  <Card key={idx} className={`p-6 border-2 border-${service.color}-500/30 bg-${service.color}-500/5`}>
                    <div className="flex items-center gap-2 mb-3">
                      <service.icon className={`w-6 h-6 text-${service.color}-500`} />
                      <h3 className="font-semibold text-lg">{service.name}</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">TECHNOLOGY</p>
                        <div className="flex flex-wrap gap-1">
                          {service.tech.map((tech, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">RESPONSIBILITIES</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {service.responsibilities.map((resp, i) => (
                            <li key={i}>• {resp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-2">
                <ArrowDown className="w-8 h-8 text-muted-foreground animate-bounce" />
                <span className="text-sm font-semibold text-muted-foreground">Data & Infrastructure Layer</span>
              </div>
            </div>

            {/* Data Layer */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Database className="w-6 h-6 text-green-500" />
                  <h2 className="text-3xl font-bold text-foreground">Data & Infrastructure Layer</h2>
                </div>
                <p className="text-muted-foreground">Storage, caching, and immutable ledger</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* PostgreSQL */}
                <Card className="p-6 border-2 border-green-500/30 bg-green-500/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="w-6 h-6 text-green-500" />
                    <h3 className="text-lg font-semibold">PostgreSQL (DynamoDB)</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Primary operational database for application data
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold mb-2">KEY TABLES</p>
                      <div className="flex flex-wrap gap-1">
                        {["companies", "contractors", "contracts", "kyc_sessions", "signatures", "payments"].map((table) => (
                          <Badge key={table} variant="outline" className="text-xs">
                            {table}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-2">FEATURES</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• ACID transactions</li>
                        <li>• Prisma ORM</li>
                        <li>• Indexed queries</li>
                        <li>• Encrypted at rest</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* QLDB */}
                <Card className="p-6 border-2 border-yellow-500/30 bg-yellow-500/5">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-6 h-6 text-yellow-500" />
                    <h3 className="text-lg font-semibold">Amazon QLDB</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Immutable ledger for audit trails and compliance
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold mb-2">RECORDED EVENTS</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Contract signatures (client)</li>
                        <li>• Contract signatures (contractor)</li>
                        <li>• Contract activation</li>
                        <li>• Payment schedules</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-2">FEATURES</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Cryptographically verifiable</li>
                        <li>• Tamper-proof history</li>
                        <li>• SQL-like queries</li>
                        <li>• Compliance-ready</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* Redis + S3 */}
                <Card className="p-6 border-2 border-red-500/30 bg-red-500/5">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-red-500" />
                        <h3 className="text-base font-semibold">Redis Cache</h3>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Session storage & caching
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• JWT sessions (TTL 1hr)</li>
                        <li>• User profile cache</li>
                        <li>• Rate limiting counters</li>
                      </ul>
                    </div>
                    <Separator />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="w-5 h-5 text-red-500" />
                        <h3 className="text-base font-semibold">AWS S3 Storage</h3>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Document & file storage
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Contract PDFs</li>
                        <li>• KYC documents (ID scans)</li>
                        <li>• Signed URLs (expiring)</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* External Integrations */}
            <Card className="p-8 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
              <h2 className="text-2xl font-bold mb-6">External Integrations</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "Veriff/Onfido", purpose: "KYC Verification", type: "Identity" },
                  { name: "OpenCorporates", purpose: "Business Registry", type: "Verification" },
                  { name: "SendGrid", purpose: "Email Notifications", type: "Communication" },
                  { name: "Stripe (Sandbox)", purpose: "Payment Processing", type: "Payments" },
                ].map((integration, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <Badge variant="outline" className="mb-2">{integration.type}</Badge>
                    <h4 className="font-semibold">{integration.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{integration.purpose}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Separator className="my-12" />

            {/* System Architecture using ECS Fargate */}
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Server className="w-8 h-8 text-blue-500" />
                  <h2 className="text-4xl font-bold text-foreground">System Architecture using ECS Fargate</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  Production-ready AWS architecture with zero public backend access
                </p>
              </div>

              {/* Overview Card */}
              <Card className="p-8 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border-2 border-blue-500/30">
                <h3 className="text-2xl font-bold mb-4">Architecture Overview</h3>
                <p className="text-muted-foreground mb-6">
                  This design provides a production-ready platform running on AWS using ECS Fargate with 
                  frontend dashboards, backend microservices, private service discovery, managed data stores, 
                  and comprehensive security controls.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Zero Public Backend</h4>
                      <p className="text-sm text-muted-foreground">All backend services in private subnets</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Strong Perimeter</h4>
                      <p className="text-sm text-muted-foreground">ALB + WAF + TLS termination</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0">
                      <Layers className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Service Discovery</h4>
                      <p className="text-sm text-muted-foreground">AWS Cloud Map for private DNS</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* High-level Components */}
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6">High-Level Components</h3>
                
                <div className="space-y-6">
                  {/* VPC & Networking */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Layers className="w-6 h-6 text-blue-500" />
                      <h4 className="text-xl font-semibold">VPC & Network Layout</h4>
                    </div>
                    <div className="ml-9 space-y-3">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                          <h5 className="font-semibold mb-2">Public Subnets (3 AZs)</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Application Load Balancer (ALB)</li>
                            <li>• NAT Gateways (for outbound traffic)</li>
                            <li>• Internet-facing resources only</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg">
                          <h5 className="font-semibold mb-2">Private Subnets (3 AZs)</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• All ECS Fargate tasks (frontend + backend)</li>
                            <li>• No public IPs assigned</li>
                            <li>• VPC endpoints for AWS services</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* ECS Fargate Clusters */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Server className="w-6 h-6 text-green-500" />
                      <h4 className="text-xl font-semibold">ECS Fargate Clusters</h4>
                    </div>
                    <div className="ml-9 space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Frontend Cluster */}
                        <Card className="p-5 border-2 border-green-500/30 bg-green-500/5">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className="bg-green-500">Frontend Cluster</Badge>
                          </div>
                          <h5 className="font-semibold mb-3">3 Dashboard Services</h5>
                          <div className="space-y-2">
                            {[
                              { name: "Client Dashboard", icon: Building2, port: "3001" },
                              { name: "Contractor Dashboard", icon: Users, port: "3002" },
                              { name: "Admin Dashboard", icon: Shield, port: "3003" },
                            ].map((dash, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-2 bg-background rounded">
                                <dash.icon className="w-4 h-4 text-green-500" />
                                <span className="text-sm flex-1">{dash.name}</span>
                                <Badge variant="outline" className="text-xs">:{dash.port}</Badge>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-xs text-muted-foreground">
                              • Behind ALB with path-based routing<br/>
                              • TLS termination at ALB<br/>
                              • Auto-scaling enabled
                            </p>
                          </div>
                        </Card>

                        {/* Backend Cluster */}
                        <Card className="p-5 border-2 border-pink-500/30 bg-pink-500/5">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className="bg-pink-500">Backend Cluster</Badge>
                          </div>
                          <h5 className="font-semibold mb-3">Microservices</h5>
                          <div className="space-y-2">
                            {[
                              { name: "Auth Service", icon: Lock },
                              { name: "Payments Service", icon: Wallet },
                              { name: "Orders Service", icon: FileText },
                              { name: "File Service", icon: Database },
                              { name: "Notifications Service", icon: MessageSquare },
                            ].map((service, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-2 bg-background rounded">
                                <service.icon className="w-4 h-4 text-pink-500" />
                                <span className="text-sm">{service.name}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-xs text-muted-foreground">
                              • Private subnet only<br/>
                              • Cloud Map service discovery<br/>
                              • Internal communication via security groups
                            </p>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Service Discovery */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Layers className="w-6 h-6 text-purple-500" />
                      <h4 className="text-xl font-semibold">AWS Cloud Map (Service Discovery)</h4>
                    </div>
                    <div className="ml-9">
                      <Card className="p-5 bg-purple-500/5">
                        <p className="text-sm text-muted-foreground mb-4">
                          Private DNS namespace for backend services within the VPC. Frontend services discover 
                          backend services using DNS names instead of hardcoded IPs.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-semibold text-sm mb-2">Example Service Names</h5>
                            <div className="space-y-1">
                              <code className="text-xs bg-muted p-2 rounded block">auth.internal.mindlinks.local</code>
                              <code className="text-xs bg-muted p-2 rounded block">payments.internal.mindlinks.local</code>
                              <code className="text-xs bg-muted p-2 rounded block">orders.internal.mindlinks.local</code>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-semibold text-sm mb-2">Benefits</h5>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              <li>✓ Automatic health checking</li>
                              <li>✓ Dynamic service registration</li>
                              <li>✓ No hardcoded endpoints</li>
                              <li>✓ Seamless service scaling</li>
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  <Separator />

                  {/* Data Stores */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Database className="w-6 h-6 text-yellow-500" />
                      <h4 className="text-xl font-semibold">Data Stores & VPC Endpoints</h4>
                    </div>
                    <div className="ml-9">
                      <div className="grid md:grid-cols-3 gap-4">
                        {/* DynamoDB */}
                        <Card className="p-5 bg-yellow-500/5 border border-yellow-500/20">
                          <Database className="w-8 h-8 text-yellow-500 mb-3" />
                          <h5 className="font-semibold mb-2">DynamoDB</h5>
                          <Badge variant="outline" className="mb-3 text-xs">Gateway Endpoint</Badge>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Primary operational data</li>
                            <li>• No internet egress needed</li>
                            <li>• IAM-restricted access</li>
                            <li>• Point-in-time recovery</li>
                          </ul>
                        </Card>

                        {/* QLDB */}
                        <Card className="p-5 bg-orange-500/5 border border-orange-500/20">
                          <BookOpen className="w-8 h-8 text-orange-500 mb-3" />
                          <h5 className="font-semibold mb-2">QLDB</h5>
                          <Badge variant="outline" className="mb-3 text-xs">Interface Endpoint</Badge>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Immutable ledger data</li>
                            <li>• PrivateLink access</li>
                            <li>• Cryptographically verifiable</li>
                            <li>• Scheduled ledger exports</li>
                          </ul>
                        </Card>

                        {/* S3 */}
                        <Card className="p-5 bg-blue-500/5 border border-blue-500/20">
                          <Database className="w-8 h-8 text-blue-500 mb-3" />
                          <h5 className="font-semibold mb-2">S3 Storage</h5>
                          <Badge variant="outline" className="mb-3 text-xs">Gateway Endpoint</Badge>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Contract PDFs</li>
                            <li>• KYC documents</li>
                            <li>• Bucket policy restricted</li>
                            <li>• Signed URLs for clients</li>
                          </ul>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Network & Access Patterns */}
              <Card className="p-8 bg-gradient-to-br from-green-500/5 to-blue-500/5">
                <h3 className="text-2xl font-bold mb-6">Network & Access Patterns</h3>
                
                <div className="space-y-6">
                  {[
                    {
                      step: "1",
                      title: "External Traffic Flow",
                      from: "Internet Users",
                      to: "ALB (Public Subnets)",
                      description: "Traffic hits ALB with TLS termination (ACM certificates) → WAF inspection → Routes to frontend ECS tasks in private subnets",
                      color: "blue"
                    },
                    {
                      step: "2",
                      title: "Frontend to Backend",
                      from: "Frontend ECS Tasks",
                      to: "Backend Microservices",
                      description: "Frontend calls backend using Cloud Map DNS names (e.g., auth.internal.mindlinks.local) → Security group rules restrict port access",
                      color: "purple"
                    },
                    {
                      step: "3",
                      title: "Backend to Data Stores",
                      from: "Backend Microservices",
                      to: "DynamoDB / QLDB / S3",
                      description: "Backend services access data via VPC endpoints only → No internet egress required → IAM task roles provide scoped permissions",
                      color: "pink"
                    },
                    {
                      step: "4",
                      title: "Administrative Access",
                      from: "DevOps/Admins",
                      to: "AWS Systems Manager",
                      description: "Session Manager for troubleshooting → No bastion hosts or direct SSH → All access logged and audited",
                      color: "green"
                    },
                  ].map((pattern, idx) => (
                    <Card key={idx} className={`p-5 border-2 border-${pattern.color}-500/30 bg-${pattern.color}-500/5`}>
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full bg-${pattern.color}-500 flex items-center justify-center text-white font-bold flex-shrink-0`}>
                          {pattern.step}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold mb-2">{pattern.title}</h4>
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <Badge variant="outline">{pattern.from}</Badge>
                            <ArrowRight className="w-4 h-4" />
                            <Badge variant="outline">{pattern.to}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{pattern.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Security Recommendations */}
              <Card className="p-8 border-2 border-red-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-8 h-8 text-red-500" />
                  <h3 className="text-2xl font-bold">Security Recommendations</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      category: "Perimeter Security",
                      icon: Lock,
                      items: [
                        "AWS WAF with OWASP managed rule groups",
                        "Rate-based rules for DDoS protection",
                        "TLS 1.2+ enforcement on ALB",
                        "HTTP Strict Transport Security (HSTS)",
                        "Shield Advanced for large-scale DDoS"
                      ]
                    },
                    {
                      category: "Network Controls",
                      icon: Layers,
                      items: [
                        "Security groups as primary network control",
                        "Separate SGs for ALB, frontend, backend",
                        "VPC endpoints with specific SGs",
                        "No public IPs on ECS tasks",
                        "VPC Flow Logs enabled"
                      ]
                    },
                    {
                      category: "IAM & Access",
                      icon: Shield,
                      items: [
                        "IAM task roles with least privilege",
                        "Fine-grained resource-level permissions",
                        "Short-lived credentials only",
                        "S3 bucket policies with VPC endpoint restriction",
                        "CloudTrail for all API calls"
                      ]
                    },
                    {
                      category: "Data Protection",
                      icon: Database,
                      items: [
                        "Encryption at rest for all data stores",
                        "Encryption in transit (TLS)",
                        "DynamoDB point-in-time recovery",
                        "S3 versioning and lifecycle policies",
                        "QLDB ledger exports for backups"
                      ]
                    },
                  ].map((section, idx) => (
                    <Card key={idx} className="p-5 bg-muted/50">
                      <div className="flex items-center gap-2 mb-3">
                        <section.icon className="w-5 h-5 text-red-500" />
                        <h4 className="font-semibold">{section.category}</h4>
                      </div>
                      <ul className="space-y-2">
                        {section.items.map((item, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Operational Notes */}
              <Card className="p-8 bg-gradient-to-br from-blue-500/5 to-green-500/5">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-8 h-8 text-blue-500" />
                  <h3 className="text-2xl font-bold">Operational Notes</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      Scaling & Performance
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• ECS Service Auto Scaling with target tracking (CPU/Memory)</li>
                      <li>• ALB health checks per service with custom paths</li>
                      <li>• ECS deployment circuit-breaker for safe rollbacks</li>
                      <li>• Container Insights for detailed metrics</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Database className="w-5 h-5 text-green-500" />
                      Data Management
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• DynamoDB PITR (Point-in-Time Recovery) enabled</li>
                      <li>• QLDB ledger exports scheduled daily</li>
                      <li>• S3 lifecycle policies for archival</li>
                      <li>• CloudWatch Logs retention policies</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Server className="w-5 h-5 text-purple-500" />
                      CI/CD & Deployment
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• CodePipeline / CodeBuild or GitHub Actions</li>
                      <li>• Blue/green or rolling deployments</li>
                      <li>• Automated container image scanning (ECR)</li>
                      <li>• Infrastructure as Code (Terraform/CDK)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-pink-500" />
                      Observability
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• CloudWatch Logs for all services</li>
                      <li>• Container Insights enabled</li>
                      <li>• X-Ray for distributed tracing (optional)</li>
                      <li>• VPC Flow Logs for network analysis</li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Architecture Diagram */}
              <Card className="p-8 border-2 border-purple-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <Layers className="w-8 h-8 text-purple-500" />
                  <h3 className="text-2xl font-bold">Interactive Architecture Diagram</h3>
                </div>

                <Alert className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Below is an interactive, visual representation of the ECS Fargate architecture. 
                    Hover over components to see them scale up. This diagram shows all major components, 
                    their connections, and data flow patterns.
                  </AlertDescription>
                </Alert>

                <EcsFargateArchitectureDiagram />
              </Card>

              {/* Key Takeaways */}
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  <strong>Key Takeaways:</strong> This ECS Fargate architecture provides production-grade 
                  security with zero public backend access, comprehensive WAF protection, private service 
                  discovery via Cloud Map, and VPC endpoints for all AWS services. The design is highly 
                  scalable, cost-effective, and maintains strong operational visibility.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>

          {/* WORKFLOWS TAB */}
          <TabsContent value="workflows" className="space-y-8">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">Complete End-to-End Workflows</h2>
              <p className="text-muted-foreground mb-8">
                Detailed step-by-step breakdown of all major workflows in the Mind-Links platform
              </p>

              {/* Workflow 1: Client Registration */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Client Registration</h3>
                    <p className="text-sm text-muted-foreground">Company verification and profile creation</p>
                  </div>
                </div>

                <div className="ml-6 border-l-2 border-blue-500/30 pl-6 space-y-4">
                  {[
                    { 
                      step: "Client starts registration", 
                      from: "Client", 
                      to: "Client Dashboard",
                      action: "Fills registration form with company details + uploads documents"
                    },
                    { 
                      step: "Submit registration", 
                      from: "Client Dashboard", 
                      to: "API Gateway → Client Service",
                      action: "POST /api/clients/register with company data"
                    },
                    { 
                      step: "Validate registration", 
                      from: "Client Service", 
                      to: "External Registry (OpenCorporates)",
                      action: "Query business registry to verify company exists and is legitimate"
                    },
                    { 
                      step: "Verification result", 
                      from: "External Registry", 
                      to: "Client Service",
                      action: "Returns verification status (verified/pending/failed)"
                    },
                    { 
                      step: "Save company profile", 
                      from: "Client Service", 
                      to: "DynamoDB",
                      action: "INSERT company record with verification_status"
                    },
                    { 
                      step: "Registration complete", 
                      from: "Client Service", 
                      to: "Client Dashboard",
                      action: "Returns success message + company ID"
                    },
                  ].map((item, idx) => (
                    <Card key={idx} className="p-4 bg-blue-500/5">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-sm flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold mb-1">{item.step}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Badge variant="outline" className="text-xs">{item.from}</Badge>
                            <ArrowRight className="w-3 h-3" />
                            <Badge variant="outline" className="text-xs">{item.to}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.action}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Workflow 2: Contractor Invitation & KYC */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Contractor Invitation & KYC</h3>
                    <p className="text-sm text-muted-foreground">Identity verification with Veriff/Onfido</p>
                  </div>
                </div>

                <div className="ml-6 border-l-2 border-purple-500/30 pl-6 space-y-4">
                  {[
                    { 
                      step: "Invite contractor", 
                      from: "Client", 
                      to: "Client Dashboard → API Gateway",
                      action: "Client enters contractor email and clicks 'Invite'"
                    },
                    { 
                      step: "Generate invite token", 
                      from: "API Gateway", 
                      to: "Client Service",
                      action: "POST /api/contractors/invite → Generate unique token"
                    },
                    { 
                      step: "Store invitation", 
                      from: "Client Service", 
                      to: "DynamoDB",
                      action: "INSERT contractor_invites with token, expiry, status=pending"
                    },
                    { 
                      step: "Send invite link", 
                      from: "Client Service", 
                      to: "Notification Service → Contractor",
                      action: "Email with link: /contractor/onboard?token=xyz"
                    },
                    { 
                      step: "Contractor opens invite", 
                      from: "Contractor", 
                      to: "Contractor Dashboard",
                      action: "Clicks email link, sees welcome screen + KYC instructions"
                    },
                    { 
                      step: "Start KYC session", 
                      from: "Contractor Dashboard", 
                      to: "API Gateway → KYC Service",
                      action: "POST /api/kyc/sessions/create"
                    },
                    { 
                      step: "Create verification session", 
                      from: "KYC Service", 
                      to: "Veriff/Onfido API",
                      action: "API call to create verification session, returns session_id + verification_url"
                    },
                    { 
                      step: "Capture ID + selfie + video", 
                      from: "Veriff/Onfido", 
                      to: "Contractor",
                      action: "Contractor uploads ID document, takes selfie, records liveness video"
                    },
                    { 
                      step: "Verification processing", 
                      from: "Veriff/Onfido", 
                      to: "KYC Service (webhook)",
                      action: "POST /webhooks/kyc with verification result (approved/rejected)"
                    },
                    { 
                      step: "Update contractor status", 
                      from: "KYC Service", 
                      to: "DynamoDB",
                      action: "UPDATE contractors SET kyc_status='verified', kyc_verified_at=NOW()"
                    },
                    { 
                      step: "KYC complete notification", 
                      from: "KYC Service", 
                      to: "Contractor Dashboard",
                      action: "Shows success message: 'KYC completed! You can now accept contracts.'"
                    },
                  ].map((item, idx) => (
                    <Card key={idx} className="p-4 bg-purple-500/5">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 font-bold text-sm flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold mb-1">{item.step}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Badge variant="outline" className="text-xs">{item.from}</Badge>
                            <ArrowRight className="w-3 h-3" />
                            <Badge variant="outline" className="text-xs">{item.to}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.action}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Workflow 3: Contract Creation */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Contract Creation</h3>
                    <p className="text-sm text-muted-foreground">Draft contract with template selection</p>
                  </div>
                </div>

                <div className="ml-6 border-l-2 border-pink-500/30 pl-6 space-y-4">
                  {[
                    { 
                      step: "Create new contract", 
                      from: "Client", 
                      to: "Client Dashboard",
                      action: "Clicks 'Create Contract' button"
                    },
                    { 
                      step: "Request contract creation", 
                      from: "Client Dashboard", 
                      to: "API Gateway → Contract Service",
                      action: "POST /api/contracts/create with contractor_id, type (direct/EOR), terms"
                    },
                    { 
                      step: "Start contract flow", 
                      from: "Contract Service", 
                      to: "Contract Service (internal)",
                      action: "Load appropriate template (Direct Hire or Employer of Record)"
                    },
                    { 
                      step: "Save draft contract", 
                      from: "Contract Service", 
                      to: "DynamoDB",
                      action: "INSERT contracts with status='draft', template_type, terms, parties"
                    },
                    { 
                      step: "Contract ready for review", 
                      from: "Contract Service", 
                      to: "Client Dashboard",
                      action: "Returns contract_id + 'Draft saved. Ready for signature.'"
                    },
                  ].map((item, idx) => (
                    <Card key={idx} className="p-4 bg-pink-500/5">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500 font-bold text-sm flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold mb-1">{item.step}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Badge variant="outline" className="text-xs">{item.from}</Badge>
                            <ArrowRight className="w-3 h-3" />
                            <Badge variant="outline" className="text-xs">{item.to}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.action}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Workflow 4: E-Signature (Client & Contractor) */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">E-Signature (Client & Contractor)</h3>
                    <p className="text-sm text-muted-foreground">In-platform signing with immutable recording</p>
                  </div>
                </div>

                <div className="ml-6 border-l-2 border-orange-500/30 pl-6 space-y-4">
                  {[
                    { 
                      step: "Client signs contract", 
                      from: "Client", 
                      to: "Client Dashboard",
                      action: "Reviews contract, clicks 'Sign Contract' button"
                    },
                    { 
                      step: "Submit signature", 
                      from: "Client Dashboard", 
                      to: "API Gateway → E-Signature Module",
                      action: "POST /api/contracts/:id/sign with signature_data (e.g., digital signature)"
                    },
                    { 
                      step: "Validate & capture signature", 
                      from: "E-Signature Module", 
                      to: "E-Signature Module (internal)",
                      action: "Validate signature format, generate signature hash"
                    },
                    { 
                      step: "Record to immutable ledger", 
                      from: "E-Signature Module", 
                      to: "QLDB",
                      action: "INSERT ledger entry: {contract_id, signer='client', signature_hash, timestamp}"
                    },
                    { 
                      step: "Update operational status", 
                      from: "E-Signature Module", 
                      to: "DynamoDB",
                      action: "UPDATE contracts SET status='client_signed', client_signed_at=NOW()"
                    },
                    { 
                      step: "Signature complete", 
                      from: "E-Signature Module", 
                      to: "Client Dashboard",
                      action: "Shows 'Signature recorded! Awaiting contractor signature.'"
                    },
                    { 
                      step: "Notify contractor", 
                      from: "Contract Service", 
                      to: "Notification Service → Contractor",
                      action: "Email: 'Your contract is ready to sign' + link"
                    },
                    { 
                      step: "Contractor signs", 
                      from: "Contractor", 
                      to: "Contractor Dashboard → API Gateway → E-Signature Module",
                      action: "POST /api/contracts/:id/sign (same flow as client)"
                    },
                    { 
                      step: "Record contractor signature", 
                      from: "E-Signature Module", 
                      to: "QLDB",
                      action: "INSERT ledger entry: {contract_id, signer='contractor', signature_hash, timestamp}"
                    },
                    { 
                      step: "Contract fully signed", 
                      from: "E-Signature Module", 
                      to: "DynamoDB",
                      action: "UPDATE contracts SET status='fully_signed', contractor_signed_at=NOW()"
                    },
                    { 
                      step: "Signing complete", 
                      from: "E-Signature Module", 
                      to: "Contractor Dashboard",
                      action: "Shows 'Contract fully executed! Work can begin.'"
                    },
                  ].map((item, idx) => (
                    <Card key={idx} className="p-4 bg-orange-500/5">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold text-sm flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold mb-1">{item.step}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">{item.from}</Badge>
                            <ArrowRight className="w-3 h-3" />
                            <Badge variant="outline" className="text-xs">{item.to}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.action}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Workflow 5: Ledger Activation */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
                    5
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Ledger Activation</h3>
                    <p className="text-sm text-muted-foreground">Contract activation and payment schedule</p>
                  </div>
                </div>

                <div className="ml-6 border-l-2 border-green-500/30 pl-6 space-y-4">
                  {[
                    { 
                      step: "Record contract activation", 
                      from: "Contract Service", 
                      to: "QLDB",
                      action: "INSERT activation entry: {contract_id, status='active', start_date, end_date}"
                    },
                    { 
                      step: "Create payment schedule", 
                      from: "Contract Service", 
                      to: "DynamoDB",
                      action: "INSERT payment_schedules based on contract terms (monthly, milestone, etc.)"
                    },
                    { 
                      step: "Contract active", 
                      from: "Contract Service", 
                      to: "Client Dashboard & Contractor Dashboard",
                      action: "Both parties see contract status: 'Active' with payment schedule"
                    },
                  ].map((item, idx) => (
                    <Card key={idx} className="p-4 bg-green-500/5">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold text-sm flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold mb-1">{item.step}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Badge variant="outline" className="text-xs">{item.from}</Badge>
                            <ArrowRight className="w-3 h-3" />
                            <Badge variant="outline" className="text-xs">{item.to}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.action}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* SERVICES TAB */}
          <TabsContent value="services" className="space-y-8">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">Service Details & APIs</h2>
              
              {/* Client Service */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-8 h-8 text-blue-500" />
                  <h3 className="text-2xl font-bold">Client Service</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    Manages company registration, verification, and contractor invitations.
                  </p>
                  <div>
                    <h4 className="font-semibold mb-2">API Endpoints</h4>
                    <div className="space-y-2">
                      {[
                        { method: "POST", path: "/api/clients/register", desc: "Register new company" },
                        { method: "GET", path: "/api/clients/:id", desc: "Get company profile" },
                        { method: "POST", path: "/api/contractors/invite", desc: "Send contractor invitation" },
                        { method: "GET", path: "/api/contractors/invites", desc: "List all invitations" },
                      ].map((endpoint, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <Badge className={endpoint.method === "POST" ? "bg-green-500" : "bg-blue-500"}>
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm flex-1">{endpoint.path}</code>
                          <span className="text-sm text-muted-foreground">{endpoint.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* KYC Service */}
              <div className="mb-8 mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-purple-500" />
                  <h3 className="text-2xl font-bold">KYC Service</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    Handles identity verification through Veriff/Onfido integration.
                  </p>
                  <div>
                    <h4 className="font-semibold mb-2">API Endpoints</h4>
                    <div className="space-y-2">
                      {[
                        { method: "POST", path: "/api/kyc/sessions/create", desc: "Start KYC verification session" },
                        { method: "GET", path: "/api/kyc/sessions/:id", desc: "Get verification status" },
                        { method: "POST", path: "/webhooks/kyc", desc: "Receive Veriff/Onfido webhook" },
                      ].map((endpoint, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <Badge className={endpoint.method === "POST" ? "bg-green-500" : "bg-blue-500"}>
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm flex-1">{endpoint.path}</code>
                          <span className="text-sm text-muted-foreground">{endpoint.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>External Integration:</strong> Uses Veriff or Onfido for liveness detection, 
                      document capture, and identity verification. Webhook receives async verification results.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>

              <Separator />

              {/* Contract Service */}
              <div className="mb-8 mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-8 h-8 text-pink-500" />
                  <h3 className="text-2xl font-bold">Contract Service</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    Manages contract lifecycle from creation to activation.
                  </p>
                  <div>
                    <h4 className="font-semibold mb-2">API Endpoints</h4>
                    <div className="space-y-2">
                      {[
                        { method: "POST", path: "/api/contracts/create", desc: "Create new contract" },
                        { method: "GET", path: "/api/contracts/:id", desc: "Get contract details" },
                        { method: "PATCH", path: "/api/contracts/:id", desc: "Update contract status" },
                        { method: "GET", path: "/api/contracts", desc: "List all contracts (filtered by user)" },
                      ].map((endpoint, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <Badge className={endpoint.method === "POST" ? "bg-green-500" : endpoint.method === "PATCH" ? "bg-yellow-500" : "bg-blue-500"}>
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm flex-1">{endpoint.path}</code>
                          <span className="text-sm text-muted-foreground">{endpoint.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* E-Signature Module */}
              <div className="mb-8 mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <FileSignature className="w-8 h-8 text-orange-500" />
                  <h3 className="text-2xl font-bold">E-Signature Module</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    Captures and validates signatures with immutable recording to QLDB.
                  </p>
                  <div>
                    <h4 className="font-semibold mb-2">API Endpoints</h4>
                    <div className="space-y-2">
                      {[
                        { method: "POST", path: "/api/contracts/:id/sign", desc: "Submit signature (client or contractor)" },
                        { method: "GET", path: "/api/contracts/:id/signatures", desc: "Get all signatures for contract" },
                      ].map((endpoint, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <Badge className={endpoint.method === "POST" ? "bg-green-500" : "bg-blue-500"}>
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm flex-1">{endpoint.path}</code>
                          <span className="text-sm text-muted-foreground">{endpoint.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Immutable Recording:</strong> Every signature is written to Amazon QLDB 
                      (Quantum Ledger Database) providing cryptographically verifiable, tamper-proof audit trails.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>

              <Separator />

              {/* Ledger Service */}
              <div className="mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-8 h-8 text-green-500" />
                  <h3 className="text-2xl font-bold">Ledger Service (QLDB)</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    Provides immutable, cryptographically verifiable record of all critical events.
                  </p>
                  <div>
                    <h4 className="font-semibold mb-2">Recorded Events</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        { event: "Contract Signature (Client)", data: "contract_id, signer, signature_hash, timestamp" },
                        { event: "Contract Signature (Contractor)", data: "contract_id, signer, signature_hash, timestamp" },
                        { event: "Contract Activation", data: "contract_id, status, start_date, end_date" },
                        { event: "Payment Schedule Creation", data: "contract_id, schedule_data, created_at" },
                      ].map((item, idx) => (
                        <Card key={idx} className="p-4 bg-green-500/5">
                          <h5 className="font-semibold mb-1">{item.event}</h5>
                          <code className="text-xs text-muted-foreground">{item.data}</code>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <Alert>
                    <BookOpen className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Why QLDB?</strong> Provides cryptographic proof of data integrity. 
                      Each entry includes a hash of previous entries, making it impossible to alter 
                      historical records. Perfect for compliance and audit requirements.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* DATA FLOW TAB */}
          <TabsContent value="dataflow" className="space-y-8">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">Data Flow Example: Contract Creation to Activation</h2>
              <p className="text-muted-foreground mb-8">
                Complete data flow showing how information moves through the system during the 
                contract creation and signing process.
              </p>

              <div className="space-y-6">
                {/* Step 1 */}
                <Card className="p-6 bg-blue-500/5 border-2 border-blue-500/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">Client Creates Contract</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-semibold mb-2">Request Data</p>
                          <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
{`POST /api/contracts/create
{
  "client_id": "client_123",
  "contractor_id": "contractor_456",
  "type": "direct_hire",
  "terms": {
    "duration": "12 months",
    "rate": "$5000/month",
    "start_date": "2025-01-01"
  }
}`}
                          </pre>
                        </div>
                        <div>
                          <p className="text-sm font-semibold mb-2">Database Write (DynamoDB)</p>
                          <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
{`INSERT INTO contracts
{
  "id": "contract_789",
  "client_id": "client_123",
  "contractor_id": "contractor_456",
  "status": "draft",
  "type": "direct_hire",
  "terms": {...},
  "created_at": "2025-11-19T10:00:00Z"
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowDown className="w-8 h-8 text-muted-foreground" />
                </div>

                {/* Step 2 */}
                <Card className="p-6 bg-purple-500/5 border-2 border-purple-500/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">Client Signs Contract</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-semibold mb-2">Request Data</p>
                          <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
{`POST /api/contracts/789/sign
{
  "signer_id": "client_123",
  "signature_data": "base64..."
}`}
                          </pre>
                        </div>
                        <div>
                          <p className="text-sm font-semibold mb-2">QLDB Write (Immutable)</p>
                          <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
{`INSERT INTO signatures_ledger
{
  "contract_id": "contract_789",
  "signer": "client",
  "signer_id": "client_123",
  "signature_hash": "sha256...",
  "timestamp": "2025-11-19T10:05:00Z"
}`}
                          </pre>
                        </div>
                        <div>
                          <p className="text-sm font-semibold mb-2">DynamoDB Update</p>
                          <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
{`UPDATE contracts
SET 
  status = 'client_signed',
  client_signed_at = '2025-11-19T10:05:00Z'
WHERE id = 'contract_789'`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowDown className="w-8 h-8 text-muted-foreground" />
                </div>

                {/* Step 3 */}
                <Card className="p-6 bg-pink-500/5 border-2 border-pink-500/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">Notification Sent to Contractor</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-semibold mb-2">Notification Service Call</p>
                          <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
{`POST /api/notifications/send
{
  "recipient_id": "contractor_456",
  "type": "contract_ready_to_sign",
  "data": {
    "contract_id": "contract_789",
    "client_name": "TechCorp Inc."
  }
}`}
                          </pre>
                        </div>
                        <div>
                          <p className="text-sm font-semibold mb-2">Email via SendGrid</p>
                          <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
{`To: contractor@example.com
Subject: Contract Ready to Sign

Hi John,

TechCorp Inc. has signed your contract.
Please review and sign:

[Sign Contract Button]`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowDown className="w-8 h-8 text-muted-foreground" />
                </div>

                {/* Step 4 */}
                <Card className="p-6 bg-orange-500/5 border-2 border-orange-500/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">Contractor Signs Contract</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-semibold mb-2">Request Data</p>
                          <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
{`POST /api/contracts/789/sign
{
  "signer_id": "contractor_456",
  "signature_data": "base64..."
}`}
                          </pre>
                        </div>
                        <div>
                          <p className="text-sm font-semibold mb-2">QLDB Write (Immutable)</p>
                          <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
{`INSERT INTO signatures_ledger
{
  "contract_id": "contract_789",
  "signer": "contractor",
  "signer_id": "contractor_456",
  "signature_hash": "sha256...",
  "timestamp": "2025-11-19T10:15:00Z"
}`}
                          </pre>
                        </div>
                        <div>
                          <p className="text-sm font-semibold mb-2">DynamoDB Update</p>
                          <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
{`UPDATE contracts
SET 
  status = 'fully_signed',
  contractor_signed_at = '2025-11-19T10:15:00Z'
WHERE id = 'contract_789'`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowDown className="w-8 h-8 text-muted-foreground" />
                </div>

                {/* Step 5 */}
                <Card className="p-6 bg-green-500/5 border-2 border-green-500/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      5
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">Contract Activation & Ledger Entry</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-semibold mb-2">QLDB Write (Activation Event)</p>
                          <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
{`INSERT INTO contract_activations
{
  "contract_id": "contract_789",
  "status": "active",
  "start_date": "2025-01-01",
  "end_date": "2025-12-31",
  "activated_at": "2025-11-19T10:16:00Z"
}`}
                          </pre>
                        </div>
                        <div>
                          <p className="text-sm font-semibold mb-2">DynamoDB (Payment Schedule)</p>
                          <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
{`INSERT INTO payment_schedules
{
  "contract_id": "contract_789",
  "frequency": "monthly",
  "amount": 5000,
  "next_payment_date": "2025-02-01",
  "created_at": "2025-11-19T10:16:00Z"
}`}
                          </pre>
                        </div>
                      </div>
                      <Alert className="mt-4">
                        <CheckSquare className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Contract Active!</strong> Both parties can now see the active contract status. 
                          All signature events are cryptographically recorded in QLDB for compliance and audit.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>

            {/* Database Architecture */}
            <Card className="p-8 bg-gradient-to-br from-green-500/5 to-blue-500/5">
              <h3 className="text-2xl font-bold mb-6">Database Architecture Summary</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-green-500" />
                    DynamoDB (Operational Data)
                  </h4>
                  <div className="space-y-3">
                    {[
                      { table: "companies", desc: "Client company profiles and verification status" },
                      { table: "contractors", desc: "Contractor profiles, KYC status, payment info" },
                      { table: "contractor_invites", desc: "Invitation tokens and status" },
                      { table: "contracts", desc: "Contract details, status, terms, parties" },
                      { table: "payment_schedules", desc: "Payment frequency, amounts, next payment dates" },
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 bg-muted rounded-lg">
                        <code className="text-sm font-semibold">{item.table}</code>
                        <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-yellow-500" />
                    Amazon QLDB (Immutable Ledger)
                  </h4>
                  <div className="space-y-3">
                    {[
                      { table: "signatures_ledger", desc: "All signature events (client & contractor)" },
                      { table: "contract_activations", desc: "Contract activation events with timestamps" },
                      { table: "payment_events", desc: "Payment processing audit trail (future)" },
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 bg-muted rounded-lg">
                        <code className="text-sm font-semibold">{item.table}</code>
                        <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <Alert className="mt-4">
                    <BookOpen className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      QLDB entries are immutable and cryptographically chained. Each entry contains 
                      a hash of the previous entry, making historical tampering impossible.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FullSystemArchitecture;

