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
  CheckSquare,
  Network,
  Cloud,
  Activity,
  GitBranch,
  Settings,
  Code,
  Cpu,
  HardDrive,
  Mail,
  CreditCard,
  Eye,
  TrendingUp,
  ShieldCheck
} from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";

const BackendMicroservicesArchitecture = () => {
  const navigate = useNavigate();

  const colorClasses: Record<string, { border: string; bg: string; text: string }> = {
    blue: {
      border: "border-blue-500/30",
      bg: "bg-blue-500/5",
      text: "text-blue-500"
    },
    purple: {
      border: "border-purple-500/30",
      bg: "bg-purple-500/5",
      text: "text-purple-500"
    },
    pink: {
      border: "border-pink-500/30",
      bg: "bg-pink-500/5",
      text: "text-pink-500"
    },
    orange: {
      border: "border-orange-500/30",
      bg: "bg-orange-500/5",
      text: "text-orange-500"
    },
    green: {
      border: "border-green-500/30",
      bg: "bg-green-500/5",
      text: "text-green-500"
    },
    yellow: {
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/5",
      text: "text-yellow-500"
    },
    red: {
      border: "border-red-500/30",
      bg: "bg-red-500/5",
      text: "text-red-500"
    }
  };

  const services = [
    {
      name: "Auth Service",
      port: 3001,
      color: "blue",
      icon: Lock,
      description: "User authentication, JWT token generation, session management",
      responsibilities: [
        "User registration (company/contractor)",
        "Login/logout",
        "JWT token generation & validation",
        "Refresh token management",
        "Password reset flow",
        "Email verification"
      ],
      endpoints: [
        "POST /auth/register",
        "POST /auth/login",
        "POST /auth/refresh",
        "POST /auth/logout",
        "GET /internal/auth/validate"
      ],
      dependencies: ["DynamoDB (auth-users, auth-sessions)", "Redis (refresh tokens)", "SendGrid"],
      tables: ["auth-users", "auth-sessions"]
    },
    {
      name: "User Service",
      port: 3002,
      color: "purple",
      icon: Users,
      description: "User profile management and user data operations",
      responsibilities: [
        "User profile management",
        "User search & filtering",
        "User preferences",
        "Profile updates"
      ],
      endpoints: [
        "GET /users/me",
        "PUT /users/me",
        "GET /users/:id",
        "GET /internal/users/:id"
      ],
      dependencies: ["DynamoDB (user-profiles)", "Auth Service"],
      tables: ["user-profiles", "user-preferences"]
    },
    {
      name: "Client Service",
      port: 3003,
      color: "blue",
      icon: Building2,
      description: "Company registration, verification, and contractor invitations",
      responsibilities: [
        "Company registration & verification",
        "Business registry integration",
        "Company profile management",
        "Contractor invitation generation"
      ],
      endpoints: [
        "POST /clients/register",
        "GET /clients/me",
        "POST /clients/verify",
        "POST /clients/invite-contractor"
      ],
      dependencies: ["DynamoDB (client-companies)", "OpenCorporates API", "Notification Service"],
      tables: ["client-companies", "client-invitations"]
    },
    {
      name: "Contractor Service",
      port: 3004,
      color: "purple",
      icon: Users,
      description: "Contractor profile management and invitation acceptance",
      responsibilities: [
        "Contractor profile management",
        "Invitation acceptance",
        "Profile completion",
        "Bank details management"
      ],
      endpoints: [
        "GET /contractors/me",
        "PUT /contractors/me",
        "POST /contractors/accept-invitation",
        "GET /internal/contractors/:id"
      ],
      dependencies: ["DynamoDB (contractor-profiles)", "Client Service", "Auth Service"],
      tables: ["contractor-profiles", "contractor-bank-details"]
    },
    {
      name: "KYC Service",
      port: 3005,
      color: "purple",
      icon: Shield,
      description: "KYC verification sessions and document management",
      responsibilities: [
        "KYC session creation",
        "Webhook processing",
        "Document storage",
        "KYC status management"
      ],
      endpoints: [
        "POST /kyc/create-session",
        "GET /kyc/session/:id",
        "POST /kyc/webhook",
        "GET /internal/kyc/contractor/:id"
      ],
      dependencies: ["DynamoDB (kyc-sessions)", "Veriff/Onfido API", "S3", "Notification Service"],
      tables: ["kyc-sessions", "kyc-documents"]
    },
    {
      name: "Contract Service",
      port: 3006,
      color: "pink",
      icon: FileText,
      description: "Contract lifecycle management and PDF generation",
      responsibilities: [
        "Contract CRUD operations",
        "Contract state machine",
        "PDF generation",
        "Contract versioning"
      ],
      endpoints: [
        "POST /contracts",
        "GET /contracts",
        "GET /contracts/:id",
        "GET /contracts/:id/pdf",
        "PUT /internal/contracts/:id/status"
      ],
      dependencies: ["DynamoDB (contract-contracts)", "S3", "Client Service", "Contractor Service"],
      tables: ["contract-contracts", "contract-templates"]
    },
    {
      name: "Signature Service",
      port: 3007,
      color: "orange",
      icon: FileSignature,
      description: "E-signature capture and QLDB integration",
      responsibilities: [
        "Signature capture & validation",
        "Multi-party signing workflow",
        "QLDB integration",
        "Signature verification"
      ],
      endpoints: [
        "POST /signatures/contracts/:id/sign",
        "GET /signatures/contracts/:id/status",
        "POST /internal/signatures/record"
      ],
      dependencies: ["QLDB", "Contract Service", "Ledger Service"],
      tables: ["None (QLDB only)"]
    },
    {
      name: "Ledger Service",
      port: 3008,
      color: "green",
      icon: BookOpen,
      description: "Immutable ledger for audit trails and contract activation",
      responsibilities: [
        "QLDB integration",
        "Contract activation recording",
        "Payment schedule creation",
        "Immutable event logging"
      ],
      endpoints: [
        "GET /ledger/contracts/:id/history",
        "GET /ledger/audit-logs",
        "POST /internal/ledger/contracts/:id/activate"
      ],
      dependencies: ["QLDB", "Signature Service", "Contract Service"],
      tables: ["None (QLDB only)"]
    },
    {
      name: "Payment Service",
      port: 3009,
      color: "green",
      icon: Wallet,
      description: "Payment processing and escrow management",
      responsibilities: [
        "Payment processing",
        "Escrow management",
        "Currency conversion",
        "Transaction logging"
      ],
      endpoints: [
        "POST /payments/create-intent",
        "POST /payments/confirm",
        "GET /payments",
        "POST /payments/webhook"
      ],
      dependencies: ["DynamoDB (payment-transactions)", "Stripe API", "Contract Service"],
      tables: ["payment-transactions", "payment-escrow"]
    },
    {
      name: "Notification Service",
      port: 3010,
      color: "yellow",
      icon: MessageSquare,
      description: "Email, SMS, and in-app notifications",
      responsibilities: [
        "Email notifications",
        "In-app notifications",
        "Notification templates",
        "Notification history"
      ],
      endpoints: [
        "GET /notifications",
        "PUT /notifications/:id/read",
        "POST /internal/notifications/send"
      ],
      dependencies: ["DynamoDB (notification-notifications)", "SendGrid API", "Redis"],
      tables: ["notification-notifications", "notification-templates"]
    },
    {
      name: "Admin Service",
      port: 3011,
      color: "pink",
      icon: Shield,
      description: "Platform administration and data aggregation",
      responsibilities: [
        "User management",
        "KYC approval/rejection",
        "Contract oversight",
        "Audit log viewing",
        "Platform statistics"
      ],
      endpoints: [
        "GET /admin/users",
        "GET /admin/kyc/pending",
        "POST /admin/kyc/:id/approve",
        "GET /admin/stats"
      ],
      dependencies: ["All other services (aggregator)", "Ledger Service"],
      tables: ["None (aggregates from other services)"]
    }
  ];

  const infrastructureComponents = [
    {
      name: "API Gateway",
      icon: Network,
      color: "purple",
      description: "REST API Gateway for external routing",
      features: ["Custom domain", "SSL certificates", "Rate limiting", "Authentication"]
    },
    {
      name: "Application Load Balancer",
      icon: Layers,
      color: "blue",
      description: "Internal service routing and load distribution",
      features: ["Target groups per service", "Health checks", "SSL termination"]
    },
    {
      name: "Service Discovery",
      icon: GitBranch,
      color: "purple",
      description: "AWS Cloud Map for service-to-service communication",
      features: ["DNS-based discovery", "Private namespace", "Health check registration"]
    },
    {
      name: "EventBridge",
      icon: Zap,
      color: "yellow",
      description: "Event-driven communication between services",
      features: ["Event bus", "Rules & targets", "Dead-letter queues"]
    },
    {
      name: "DynamoDB",
      icon: Database,
      color: "green",
      description: "NoSQL database for operational data",
      features: ["On-demand billing", "Encryption at rest", "Global Secondary Indexes"]
    },
    {
      name: "QLDB",
      icon: BookOpen,
      color: "green",
      description: "Immutable ledger for audit trails",
      features: ["Cryptographic verification", "Tamper-proof", "SQL-like queries"]
    },
    {
      name: "ElastiCache Redis",
      icon: HardDrive,
      color: "red",
      description: "Session storage and caching",
      features: ["Single node", "Encryption in transit", "TTL support"]
    },
    {
      name: "S3",
      icon: Cloud,
      color: "blue",
      description: "Document storage for contracts and KYC",
      features: ["Versioning", "Encryption", "Signed URLs", "Lifecycle policies"]
    },
    {
      name: "CloudWatch",
      icon: Activity,
      color: "orange",
      description: "Logging, metrics, and monitoring",
      features: ["Log groups", "Custom metrics", "Alarms", "Dashboards"]
    },
    {
      name: "X-Ray",
      icon: Eye,
      color: "purple",
      description: "Distributed tracing across services",
      features: ["Service map", "Trace analysis", "Performance insights"]
    }
  ];

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
              Backend Microservices Architecture
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Full microservices architecture with 8 independent services deployed on AWS ECS Fargate,
              integrated with API Gateway, Service Discovery, and distributed data storage
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge variant="outline" className="text-sm">
                <Server className="w-3 h-3 mr-1" />
                8 Microservices
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Cloud className="w-3 h-3 mr-1" />
                AWS ECS Fargate
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Network className="w-3 h-3 mr-1" />
                API Gateway
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Database className="w-3 h-3 mr-1" />
                DynamoDB + QLDB
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-7 w-full max-w-6xl mx-auto mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="dataflow">Data Flow</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-8">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">Microservices Architecture Overview</h2>
              <p className="text-lg text-muted-foreground mb-6">
                The Mind-Links backend is built as a full microservices architecture with 8 independent services,
                each deployed separately on AWS ECS Fargate. Services communicate via HTTP REST (synchronous) and
                EventBridge (asynchronous), with API Gateway handling external requests.
              </p>

              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Key Architecture Decision:</strong> Full microservices architecture enables independent scaling,
                  deployment, and technology choices per service. Each service owns its data (DynamoDB tables) and
                  communicates via well-defined APIs.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 border-2 border-blue-500/30 bg-blue-500/5">
                  <Server className="w-10 h-10 text-blue-500 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">8 Independent Services</h3>
                  <p className="text-sm text-muted-foreground">
                    Each service is a separate NestJS application with its own deployment,
                    scaling policies, and database tables.
                  </p>
                </Card>

                <Card className="p-6 border-2 border-purple-500/30 bg-purple-500/5">
                  <Network className="w-10 h-10 text-purple-500 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Service Communication</h3>
                  <p className="text-sm text-muted-foreground">
                    HTTP REST for synchronous calls, EventBridge for asynchronous events,
                    Service Discovery for routing.
                  </p>
                </Card>

                <Card className="p-6 border-2 border-green-500/30 bg-green-500/5">
                  <Database className="w-10 h-10 text-green-500 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Data Storage</h3>
                  <p className="text-sm text-muted-foreground">
                    DynamoDB for operational data (per-service), QLDB for immutable ledger,
                    Redis for caching, S3 for documents.
                  </p>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Architecture Principles</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: CheckCircle2, title: "Service Independence", desc: "Each service can be developed, tested, and deployed independently" },
                    { icon: TrendingUp, title: "Independent Scaling", desc: "Scale each service based on its own load and requirements" },
                    { icon: ShieldCheck, title: "Fault Isolation", desc: "Failures in one service don't cascade to others" },
                    { icon: Code, title: "Technology Flexibility", desc: "Each service can use different technologies if needed" },
                    { icon: GitBranch, title: "Team Autonomy", desc: "Different teams can own and develop services independently" },
                    { icon: Activity, title: "Observability", desc: "Distributed tracing, logging, and metrics per service" },
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
              <h3 className="text-2xl font-bold mb-4">Service Overview</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service, idx) => {
                  const colors = colorClasses[service.color] || colorClasses.blue;
                  return (
                    <Card key={idx} className={`p-4 border-2 ${colors.border} ${colors.bg}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <service.icon className={`w-5 h-5 ${colors.text}`} />
                        <h4 className="font-semibold">{service.name}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{service.description}</p>
                      <Badge variant="outline" className="text-xs">Port {service.port}</Badge>
                    </Card>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          {/* SERVICES TAB */}
          <TabsContent value="services" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Microservices Details</h2>
              <p className="text-muted-foreground">Each service is independently deployable with its own responsibilities</p>
            </div>

            {services.map((service, idx) => {
              const colors = colorClasses[service.color] || colorClasses.blue;
              return (
                <Card key={idx} className={`p-6 border-2 ${colors.border} ${colors.bg}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <service.icon className={`w-8 h-8 ${colors.text}`} />
                      <div>
                        <h3 className="text-2xl font-bold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">Port {service.port} | ECS Service: mindlinks-{service.name.toLowerCase().replace(' ', '-')}</p>
                      </div>
                    </div>
                    <Badge className={`bg-${service.color}-500`}>Microservice</Badge>
                  </div>

                  <p className="text-muted-foreground mb-6">{service.description}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <CheckSquare className="w-4 h-4" />
                        Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {service.responsibilities.map((resp, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        Key Endpoints
                      </h4>
                      <div className="space-y-2">
                        {service.endpoints.map((endpoint, i) => (
                          <Badge key={i} variant="outline" className="text-xs font-mono block w-fit">
                            {endpoint}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        DynamoDB Tables
                      </h4>
                      <div className="space-y-2">
                        {service.tables.map((table, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {table}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <GitBranch className="w-4 h-4" />
                        Dependencies
                      </h4>
                      <ul className="space-y-2">
                        {service.dependencies.map((dep, i) => (
                          <li key={i} className="text-sm text-muted-foreground">
                            • {dep}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              );
            })}
          </TabsContent>

          {/* DATABASE SCHEMA TAB */}
          <TabsContent value="database" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">DynamoDB Database Schemas</h2>
              <p className="text-muted-foreground">Complete database schema for all microservices with infrastructure integration</p>
            </div>

            {/* Database Overview */}
            <Card className="p-8 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
              <h3 className="text-2xl font-bold mb-6">Database Overview</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold mb-2">Total Tables</p>
                  <p className="text-3xl font-bold text-blue-500">16</p>
                  <p className="text-sm text-muted-foreground">Across 8 services</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold mb-2">Global Secondary Indexes</p>
                  <p className="text-3xl font-bold text-green-500">24+</p>
                  <p className="text-sm text-muted-foreground">For query optimization</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-semibold mb-2">Tables with TTL</p>
                  <p className="text-3xl font-bold text-purple-500">2</p>
                  <p className="text-sm text-muted-foreground">Auto-cleanup enabled</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { service: "Auth Service", tables: 2, color: "blue" },
                  { service: "User Service", tables: 2, color: "purple" },
                  { service: "Client Service", tables: 2, color: "blue" },
                  { service: "Contractor Service", tables: 2, color: "purple" },
                  { service: "KYC Service", tables: 2, color: "purple" },
                  { service: "Contract Service", tables: 2, color: "pink" },
                  { service: "Payment Service", tables: 2, color: "green" },
                  { service: "Notification Service", tables: 2, color: "yellow" },
                ].map((item, idx) => {
                  const colors = colorClasses[item.color] || colorClasses.blue;
                  return (
                    <Card key={idx} className={`p-4 border-2 ${colors.border} ${colors.bg}`}>
                      <p className="font-semibold text-sm mb-1">{item.service}</p>
                      <p className="text-2xl font-bold">{item.tables} tables</p>
                    </Card>
                  );
                })}
              </div>
            </Card>

            {/* Auth Service Tables */}
            <Card className="p-8 border-2 border-blue-500/30 bg-blue-500/5">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-8 h-8 text-blue-500" />
                <h3 className="text-2xl font-bold">Auth Service Tables</h3>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: auth-users</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> email-index (email as partition key)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• email (String, indexed)</li>
                        <li>• passwordHash (String)</li>
                        <li>• role (String: company|contractor|admin)</li>
                        <li>• status (String: active|inactive|suspended)</li>
                        <li>• emailVerified (Boolean)</li>
                        <li>• createdAt (String, ISO 8601)</li>
                        <li>• updatedAt (String, ISO 8601)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`// Access Pattern: Get user by email
const user = await dynamodb.query({
  TableName: 'auth-users',
  IndexName: 'email-index',
  KeyConditionExpression: 'email = :email',
  ExpressionAttributeValues: { ':email': 'user@example.com' }
});`}</pre>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: auth-sessions</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>TTL:</strong> expiresAt (Number, Unix timestamp)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• userId (String, reference to auth-users)</li>
                        <li>• refreshToken (String)</li>
                        <li>• ipAddress (String)</li>
                        <li>• userAgent (String)</li>
                        <li>• createdAt (String)</li>
                        <li>• expiresAt (Number, TTL)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* User Service Tables */}
            <Card className="p-8 border-2 border-purple-500/30 bg-purple-500/5">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-purple-500" />
                <h3 className="text-2xl font-bold">User Service Tables</h3>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: user-profiles</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> userId (String, UUID)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• userId (String, UUID)</li>
                        <li>• firstName (String)</li>
                        <li>• lastName (String)</li>
                        <li>• phone (String)</li>
                        <li>• avatarUrl (String, S3 URL)</li>
                        <li>• createdAt (String)</li>
                        <li>• updatedAt (String)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: user-preferences</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> userId (String, UUID)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• userId (String, UUID)</li>
                        <li>• language (String, default: 'en')</li>
                        <li>• timezone (String)</li>
                        <li>• notifications (Map: email, sms, push)</li>
                        <li>• updatedAt (String)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Client Service Tables */}
            <Card className="p-8 border-2 border-blue-500/30 bg-blue-500/5">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-8 h-8 text-blue-500" />
                <h3 className="text-2xl font-bold">Client Service Tables</h3>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: client-companies</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> userId-index (userId as partition key)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• userId (String, reference to auth-users)</li>
                        <li>• legalName (String)</li>
                        <li>• country (String)</li>
                        <li>• taxId (String)</li>
                        <li>• verificationStatus (String: pending|verified|rejected)</li>
                        <li>• businessRegistryData (Map, from OpenCorporates)</li>
                        <li>• createdAt (String)</li>
                        <li>• updatedAt (String)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: client-invitations</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> token-index (token as partition key)</li>
                        <li>• <strong>GSI:</strong> clientId-index (clientId as partition key)</li>
                        <li>• <strong>TTL:</strong> expiresAt (Number, 7 days)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• clientId (String, reference to client-companies)</li>
                        <li>• contractorEmail (String)</li>
                        <li>• token (String, unique, indexed)</li>
                        <li>• status (String: pending|accepted|expired)</li>
                        <li>• expiresAt (Number, TTL)</li>
                        <li>• createdAt (String)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contractor Service Tables */}
            <Card className="p-8 border-2 border-purple-500/30 bg-purple-500/5">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-purple-500" />
                <h3 className="text-2xl font-bold">Contractor Service Tables</h3>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: contractor-profiles</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> userId-index (userId as partition key)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• userId (String, reference to auth-users)</li>
                        <li>• name (String)</li>
                        <li>• country (String)</li>
                        <li>• kycStatus (String: pending|verified|rejected)</li>
                        <li>• createdAt (String)</li>
                        <li>• updatedAt (String)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: contractor-bank-details</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> contractorId-index (contractorId as partition key)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• contractorId (String, reference to contractor-profiles)</li>
                        <li>• bankName (String)</li>
                        <li>• accountNumber (String, encrypted)</li>
                        <li>• routingNumber (String, encrypted)</li>
                        <li>• currency (String)</li>
                        <li>• createdAt (String)</li>
                        <li>• updatedAt (String)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* KYC Service Tables */}
            <Card className="p-8 border-2 border-purple-500/30 bg-purple-500/5">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-purple-500" />
                <h3 className="text-2xl font-bold">KYC Service Tables</h3>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: kyc-sessions</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> contractorId-index (contractorId as partition key)</li>
                        <li>• <strong>GSI:</strong> status-index (status as partition key)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• contractorId (String, reference to contractor-profiles)</li>
                        <li>• veriffSessionId (String, from Veriff API)</li>
                        <li>• status (String: pending|processing|verified|rejected)</li>
                        <li>• verificationResult (Map, from Veriff webhook)</li>
                        <li>• documents (List of Maps: type, s3Url, status)</li>
                        <li>• createdAt (String)</li>
                        <li>• updatedAt (String)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: kyc-documents</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> contractorId-index (contractorId as partition key)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• contractorId (String)</li>
                        <li>• kycSessionId (String)</li>
                        <li>• documentType (String: passport|id|selfie|proof_of_address)</li>
                        <li>• s3Key (String)</li>
                        <li>• s3Url (String)</li>
                        <li>• status (String: uploaded|verified|rejected)</li>
                        <li>• uploadedAt (String)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contract Service Tables */}
            <Card className="p-8 border-2 border-pink-500/30 bg-pink-500/5">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-pink-500" />
                <h3 className="text-2xl font-bold">Contract Service Tables</h3>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-pink-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: contract-contracts</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> clientId-index (clientId as partition key)</li>
                        <li>• <strong>GSI:</strong> contractorId-index (contractorId as partition key)</li>
                        <li>• <strong>GSI:</strong> status-index (status as partition key)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• clientId (String, reference to client-companies)</li>
                        <li>• contractorId (String, reference to contractor-profiles)</li>
                        <li>• type (String: fixed|hourly)</li>
                        <li>• currency (String: USD|EUR|AED|EGP)</li>
                        <li>• rate (Number)</li>
                        <li>• startDate (String, ISO 8601)</li>
                        <li>• endDate (String, ISO 8601, optional)</li>
                        <li>• status (String: draft|pending|client_signed|contractor_signed|active|completed|cancelled)</li>
                        <li>• clientSignedAt (String, ISO 8601, optional)</li>
                        <li>• contractorSignedAt (String, ISO 8601, optional)</li>
                        <li>• pdfUrl (String, S3 URL)</li>
                        <li>• createdAt (String)</li>
                        <li>• updatedAt (String)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`// Access Pattern: Get contracts by client
const contracts = await dynamodb.query({
  TableName: 'contract-contracts',
  IndexName: 'clientId-index',
  KeyConditionExpression: 'clientId = :clientId',
  ExpressionAttributeValues: { ':clientId': 'client-uuid' }
});`}</pre>
                  </div>
                </div>

                <div className="border-l-4 border-pink-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: contract-templates</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> type-index (type as partition key)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• name (String)</li>
                        <li>• type (String: fixed|hourly)</li>
                        <li>• templateContent (String, HTML/Markdown)</li>
                        <li>• variables (List of Strings: placeholders)</li>
                        <li>• isDefault (Boolean)</li>
                        <li>• createdAt (String)</li>
                        <li>• updatedAt (String)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Payment Service Tables */}
            <Card className="p-8 border-2 border-green-500/30 bg-green-500/5">
              <div className="flex items-center gap-3 mb-6">
                <Wallet className="w-8 h-8 text-green-500" />
                <h3 className="text-2xl font-bold">Payment Service Tables</h3>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: payment-transactions</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> contractId-index (contractId as partition key)</li>
                        <li>• <strong>GSI:</strong> contractorId-index (contractorId as partition key)</li>
                        <li>• <strong>GSI:</strong> status-index (status as partition key)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• contractId (String, reference to contract-contracts)</li>
                        <li>• contractorId (String)</li>
                        <li>• clientId (String)</li>
                        <li>• amount (Number)</li>
                        <li>• currency (String)</li>
                        <li>• status (String: pending|processing|completed|failed|cancelled)</li>
                        <li>• stripePaymentId (String, from Stripe API)</li>
                        <li>• createdAt (String)</li>
                        <li>• updatedAt (String)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: payment-escrow</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> contractId (String, UUID)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• contractId (String, UUID)</li>
                        <li>• contractorId (String)</li>
                        <li>• clientId (String)</li>
                        <li>• balance (Number, current escrow balance)</li>
                        <li>• currency (String)</li>
                        <li>• transactions (List of Maps: transaction history)</li>
                        <li>• updatedAt (String)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Notification Service Tables */}
            <Card className="p-8 border-2 border-yellow-500/30 bg-yellow-500/5">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-8 h-8 text-yellow-500" />
                <h3 className="text-2xl font-bold">Notification Service Tables</h3>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: notification-notifications</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> userId-index (userId as partition key)</li>
                        <li>• <strong>GSI:</strong> read-index (read as partition key, userId as sort key)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• userId (String, reference to auth-users)</li>
                        <li>• type (String: email|sms|in_app)</li>
                        <li>• title (String)</li>
                        <li>• message (String)</li>
                        <li>• read (Boolean, indexed)</li>
                        <li>• createdAt (String)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: notification-templates</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> type-index (type as partition key)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• name (String)</li>
                        <li>• type (String: email|sms)</li>
                        <li>• subject (String, for email)</li>
                        <li>• body (String, HTML/text template)</li>
                        <li>• variables (List of Strings: placeholders)</li>
                        <li>• createdAt (String)</li>
                        <li>• updatedAt (String)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Infrastructure Integration */}
            <Card className="p-8 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
              <h3 className="text-2xl font-bold mb-6">Infrastructure Integration</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Terraform Configuration
                  </h4>
                  <Card className="p-6 bg-slate-900">
                    <pre className="text-green-400 font-mono text-xs overflow-x-auto">
                      {`# Example: auth-users table
resource "aws_dynamodb_table" "auth_users" {
  name           = "mindlinks-auth-users"
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
  }
}`}
                    </pre>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    IAM Roles & Permissions
                  </h4>
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold mb-2">Auth Service IAM Role</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• DynamoDB: Read/Write on auth-users, auth-sessions</li>
                          <li>• ElastiCache: Read/Write on Redis cluster</li>
                          <li>• Secrets Manager: Read JWT secrets</li>
                        </ul>
                      </div>
                      <div className="border-l-4 border-pink-500 pl-4">
                        <p className="font-semibold mb-2">Contract Service IAM Role</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• DynamoDB: Read/Write on contract-contracts, contract-templates</li>
                          <li>• S3: Read/Write on contract-pdfs bucket</li>
                          <li>• Service Discovery: Resolve other services</li>
                        </ul>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4">
                        <p className="font-semibold mb-2">Payment Service IAM Role</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• DynamoDB: Read/Write on payment-transactions, payment-escrow</li>
                          <li>• Secrets Manager: Read Stripe API keys</li>
                          <li>• EventBridge: Publish payment events</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Service-to-Database Connection
                  </h4>
                  <Card className="p-6">
                    <div className="space-y-4">
                      {[
                        {
                          step: "1",
                          action: "Service starts up",
                          detail: "Reads DynamoDB table names from environment variables"
                        },
                        {
                          step: "2",
                          action: "AWS SDK initialization",
                          detail: "Uses IAM role credentials (no hardcoded keys)"
                        },
                        {
                          step: "3",
                          action: "DynamoDB client creation",
                          detail: "DynamoDBClient from @aws-sdk/client-dynamodb"
                        },
                        {
                          step: "4",
                          action: "Query/Write operations",
                          detail: "Uses DocumentClient for easy data access"
                        },
                        {
                          step: "5",
                          action: "Error handling",
                          detail: "Retries with exponential backoff, circuit breaker pattern"
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{item.action}</p>
                            <p className="text-sm text-muted-foreground">{item.detail}</p>
                          </div>
                          {idx < 4 && <ArrowRight className="w-5 h-5 text-muted-foreground" />}
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4">Access Patterns Summary</h4>
                  <Card className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="font-semibold mb-3">Common Query Patterns</p>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>• Get user by email → auth-users (GSI: email-index)</li>
                          <li>• Get contracts by client → contract-contracts (GSI: clientId-index)</li>
                          <li>• Get contracts by contractor → contract-contracts (GSI: contractorId-index)</li>
                          <li>• Get KYC session by contractor → kyc-sessions (GSI: contractorId-index)</li>
                          <li>• Get payments by contract → payment-transactions (GSI: contractId-index)</li>
                          <li>• Get unread notifications → notification-notifications (GSI: read-index)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-3">Write Patterns</p>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>• Create operations: PutItem with generated UUID</li>
                          <li>• Update operations: UpdateItem with conditional expressions</li>
                          <li>• Batch operations: BatchWriteItem for bulk operations</li>
                          <li>• Transactions: TransactWriteItems for multi-table updates</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Cloud className="w-5 h-5" />
                    Terraform Infrastructure Setup
                  </h4>
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold mb-2">Complete Terraform Module Structure</p>
                        <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                          <pre>{`# terraform/modules/dynamodb/main.tf

# Auth Service Tables
resource "aws_dynamodb_table" "auth_users" {
  name           = "\${var.environment}-auth-users"
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

# Contract Service Tables
resource "aws_dynamodb_table" "contract_contracts" {
  name           = "\${var.environment}-contract-contracts"
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
}`}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold mb-2">IAM Role for ECS Tasks</p>
                        <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                          <pre>{`# IAM Role for Contract Service
resource "aws_iam_role" "contract_service_role" {
  name = "mindlinks-contract-service-role"

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

# DynamoDB Permissions
resource "aws_iam_role_policy" "contract_service_dynamodb" {
  name = "contract-service-dynamodb-policy"
  role = aws_iam_role.contract_service_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Query",
        "dynamodb:Scan",
        "dynamodb:BatchGetItem",
        "dynamodb:BatchWriteItem"
      ]
      Resource = [
        aws_dynamodb_table.contract_contracts.arn,
        "\${aws_dynamodb_table.contract_contracts.arn}/index/*"
      ]
    }]
  })
}

# S3 Permissions
resource "aws_iam_role_policy" "contract_service_s3" {
  name = "contract-service-s3-policy"
  role = aws_iam_role.contract_service_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ]
      Resource = "\${aws_s3_bucket.contract_pdfs.arn}/*"
    }]
  })
}`}</pre>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4">Service Connection to DynamoDB</h4>
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold mb-2">NestJS DynamoDB Integration</p>
                        <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                          <pre>{`// src/config/dynamodb.config.ts
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  // Credentials from IAM role (ECS task role)
});

export const dynamoClient = DynamoDBDocumentClient.from(client);

// src/services/contract.service.ts
import { dynamoClient } from '../config/dynamodb.config';

async getContractById(id: string) {
  const result = await dynamoClient.get({
    TableName: process.env.CONTRACT_TABLE_NAME,
    Key: { id }
  });
  return result.Item;
}

async getContractsByClient(clientId: string) {
  const result = await dynamoClient.query({
    TableName: process.env.CONTRACT_TABLE_NAME,
    IndexName: 'clientId-index',
    KeyConditionExpression: 'clientId = :clientId',
    ExpressionAttributeValues: {
      ':clientId': clientId
    }
  });
  return result.Items;
}`}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold mb-2">Environment Variables in ECS Task Definition</p>
                        <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                          <pre>{`# ECS Task Definition Environment Variables
environment = [
  {
    name  = "AWS_REGION"
    value = "us-east-1"
  },
  {
    name  = "CONTRACT_TABLE_NAME"
    value = aws_dynamodb_table.contract_contracts.name
  },
  {
    name  = "REDIS_HOST"
    value = aws_elasticache_cluster.redis.cache_nodes[0].address
  },
  {
    name  = "S3_BUCKET_NAME"
    value = aws_s3_bucket.contract_pdfs.bucket
  }
]`}</pre>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4">Complete Table List</h4>
                  <Card className="p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { service: "Auth", tables: ["auth-users", "auth-sessions"] },
                        { service: "User", tables: ["user-profiles", "user-preferences"] },
                        { service: "Client", tables: ["client-companies", "client-invitations"] },
                        { service: "Contractor", tables: ["contractor-profiles", "contractor-bank-details"] },
                        { service: "KYC", tables: ["kyc-sessions", "kyc-documents"] },
                        { service: "Contract", tables: ["contract-contracts", "contract-templates"] },
                        { service: "Payment", tables: ["payment-transactions", "payment-escrow"] },
                        { service: "Notification", tables: ["notification-notifications", "notification-templates"] },
                      ].map((item, idx) => (
                        <div key={idx} className="border-l-4 border-blue-500 pl-3 py-2">
                          <p className="font-semibold text-sm mb-2">{item.service} Service</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {item.tables.map((table, i) => (
                              <li key={i}>• {table}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4">DynamoDB Best Practices</h4>
                  <Card className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="font-semibold mb-3">Design Principles</p>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>• One table per entity type (not single-table design)</li>
                          <li>• GSI for all common query patterns</li>
                          <li>• TTL for automatic data cleanup (sessions, events)</li>
                          <li>• On-demand billing for flexibility</li>
                          <li>• Point-in-time recovery enabled</li>
                          <li>• Encryption at rest with KMS</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-3">Performance Optimization</p>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>• Redis caching for frequently accessed data</li>
                          <li>• Batch operations for bulk reads/writes</li>
                          <li>• Projection expressions to limit data transfer</li>
                          <li>• Consistent reads only when necessary</li>
                          <li>• Parallel queries for multiple GSIs</li>
                          <li>• Monitor CloudWatch metrics for throttling</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* INFRASTRUCTURE TAB */}
          <TabsContent value="infrastructure" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">AWS Infrastructure Components</h2>
              <p className="text-muted-foreground">Complete infrastructure stack supporting microservices architecture</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {infrastructureComponents.map((component, idx) => {
                const colors = colorClasses[component.color] || colorClasses.blue;
                return (
                  <Card key={idx} className={`p-6 border-2 ${colors.border} ${colors.bg}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <component.icon className={`w-8 h-8 ${colors.text}`} />
                      <h3 className="text-xl font-bold">{component.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{component.description}</p>
                    <div>
                      <p className="text-xs font-semibold mb-2">FEATURES</p>
                      <ul className="space-y-1">
                        {component.features.map((feature, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Infrastructure Architecture</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold mb-2">VPC & Networking</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• VPC: mindlinks-vpc with public and private subnets</li>
                    <li>• Internet Gateway for public access</li>
                    <li>• NAT Gateway for outbound connections</li>
                    <li>• Security Groups with minimal access rules</li>
                    <li>• Network ACLs for subnet-level security</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold mb-2">Compute & Containers</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• ECS Fargate cluster: mindlinks-cluster</li>
                    <li>• 8 separate ECS services (one per microservice)</li>
                    <li>• Auto-scaling: 1-5 tasks per service</li>
                    <li>• CPU: 0.25-0.5 vCPU, Memory: 512MB-1GB per service</li>
                    <li>• ECR repositories for container images</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold mb-2">Data Storage</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• DynamoDB: 16+ tables (2 per service)</li>
                    <li>• QLDB: mindlinks-contracts-ledger</li>
                    <li>• ElastiCache Redis: Single node for sessions</li>
                    <li>• S3: Document storage with versioning</li>
                  </ul>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold mb-2">Communication & Routing</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• API Gateway: REST API for external requests</li>
                    <li>• Application Load Balancer: Internal routing</li>
                    <li>• Service Discovery: AWS Cloud Map (mindlinks.internal)</li>
                    <li>• EventBridge: Event-driven communication</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* COMMUNICATION TAB */}
          <TabsContent value="communication" className="space-y-8">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">Service Communication Patterns</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-500" />
                    Synchronous Communication (HTTP REST)
                  </h3>
                  <Card className="p-6 bg-blue-500/5 border-blue-500/30">
                    <p className="text-muted-foreground mb-4">
                      Services communicate directly via HTTP REST calls using Service Discovery for routing.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-semibold">Service Discovery</p>
                          <p className="text-sm text-muted-foreground">
                            AWS Cloud Map resolves service names (e.g., auth-service.internal) to IP addresses
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-semibold">Circuit Breaker</p>
                          <p className="text-sm text-muted-foreground">
                            Resilience pattern to prevent cascading failures when services are unavailable
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-semibold">Retry Logic</p>
                          <p className="text-sm text-muted-foreground">
                            Exponential backoff retry (3 attempts) with 5-second timeout
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    Asynchronous Communication (EventBridge)
                  </h3>
                  <Card className="p-6 bg-yellow-500/5 border-yellow-500/30">
                    <p className="text-muted-foreground mb-4">
                      Event-driven architecture for decoupled, scalable communication between services.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-semibold">Event Publishing</p>
                          <p className="text-sm text-muted-foreground">
                            Services publish events: user.created, contract.signed, payment.processed, etc.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-semibold">Event Rules</p>
                          <p className="text-sm text-muted-foreground">
                            EventBridge rules route events to target services based on event patterns
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-semibold">Dead-Letter Queues</p>
                          <p className="text-sm text-muted-foreground">
                            Failed event processing goes to DLQ for manual inspection and retry
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Example: Contract Signing Flow</h3>
                  <Card className="p-6">
                    <div className="space-y-4">
                      {[
                        { step: "1", action: "Client signs contract", service: "Signature Service", method: "HTTP POST" },
                        { step: "2", action: "Record signature in QLDB", service: "Signature Service", method: "QLDB Write" },
                        { step: "3", action: "Update contract status", service: "Contract Service", method: "HTTP PUT (internal)" },
                        { step: "4", action: "Publish signature.completed event", service: "Signature Service", method: "EventBridge" },
                        { step: "5", action: "Listen to event, activate contract", service: "Ledger Service", method: "EventBridge Listener" },
                        { step: "6", action: "Create payment schedule", service: "Ledger Service", method: "QLDB Write" },
                        { step: "7", action: "Notify both parties", service: "Notification Service", method: "HTTP POST (internal)" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{item.action}</p>
                            <p className="text-sm text-muted-foreground">{item.service} • {item.method}</p>
                          </div>
                          {idx < 6 && <ArrowDown className="w-5 h-5 text-muted-foreground" />}
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* DATA FLOW TAB */}
          <TabsContent value="dataflow" className="space-y-8">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">Data Flow Architecture</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Data Storage Strategy</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="p-6 border-2 border-green-500/30 bg-green-500/5">
                      <Database className="w-8 h-8 text-green-500 mb-3" />
                      <h4 className="font-semibold mb-2">DynamoDB (Operational)</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Fast, scalable NoSQL database for operational data
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• 2 tables per service (16+ total)</li>
                        <li>• On-demand billing</li>
                        <li>• Global Secondary Indexes</li>
                        <li>• Encryption at rest (KMS)</li>
                      </ul>
                    </Card>

                    <Card className="p-6 border-2 border-yellow-500/30 bg-yellow-500/5">
                      <BookOpen className="w-8 h-8 text-yellow-500 mb-3" />
                      <h4 className="font-semibold mb-2">QLDB (Immutable Ledger)</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Append-only ledger for audit trails
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Contract signatures</li>
                        <li>• Contract activations</li>
                        <li>• Payment schedules</li>
                        <li>• Cryptographically verified</li>
                      </ul>
                    </Card>

                    <Card className="p-6 border-2 border-red-500/30 bg-red-500/5">
                      <HardDrive className="w-8 h-8 text-red-500 mb-3" />
                      <h4 className="font-semibold mb-2">Redis + S3</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Caching and document storage
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Redis: Sessions, cache (1hr TTL)</li>
                        <li>• S3: PDFs, KYC docs</li>
                        <li>• Signed URLs (15min expiry)</li>
                        <li>• Versioning enabled</li>
                      </ul>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">End-to-End Data Flow: Contract Creation</h3>
                  <Card className="p-6">
                    <div className="space-y-4">
                      {[
                        {
                          step: "1",
                          action: "Client creates contract",
                          data: "Contract data (clientId, contractorId, terms)",
                          storage: "DynamoDB: contract-contracts",
                          service: "Contract Service"
                        },
                        {
                          step: "2",
                          action: "Generate PDF from template",
                          data: "Contract PDF document",
                          storage: "S3: contract-pdfs/{contractId}.pdf",
                          service: "Contract Service"
                        },
                        {
                          step: "3",
                          action: "Publish contract.created event",
                          data: "Event: {contractId, clientId, contractorId}",
                          storage: "EventBridge",
                          service: "Contract Service → EventBridge"
                        },
                        {
                          step: "4",
                          action: "Notify contractor",
                          data: "Email notification",
                          storage: "DynamoDB: notification-notifications",
                          service: "Notification Service"
                        },
                        {
                          step: "5",
                          action: "Client signs contract",
                          data: "Signature data + metadata",
                          storage: "QLDB: contract-signatures",
                          service: "Signature Service"
                        },
                        {
                          step: "6",
                          action: "Contractor signs contract",
                          data: "Signature data + metadata",
                          storage: "QLDB: contract-signatures",
                          service: "Signature Service"
                        },
                        {
                          step: "7",
                          action: "Activate contract in ledger",
                          data: "Activation record + payment schedule",
                          storage: "QLDB: contract-activations, payment-schedules",
                          service: "Ledger Service"
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs">
                              {item.step}
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{item.action}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                <strong>Data:</strong> {item.data}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                <strong>Storage:</strong> {item.storage}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                <strong>Service:</strong> {item.service}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* DEPLOYMENT TAB */}
          <TabsContent value="deployment" className="space-y-8">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">Deployment Architecture</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">CI/CD Pipeline</h3>
                  <Card className="p-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
                    <div className="space-y-4">
                      {[
                        { step: "1", action: "Developer pushes code", location: "GitHub repository" },
                        { step: "2", action: "GitHub Actions triggered", location: "CI pipeline" },
                        { step: "3", action: "Run tests (unit, integration)", location: "GitHub Actions runner" },
                        { step: "4", action: "Build Docker image", location: "Per service" },
                        { step: "5", action: "Push to ECR", location: "AWS ECR repository" },
                        { step: "6", action: "Deploy to ECS Fargate", location: "AWS ECS service" },
                        { step: "7", action: "Health check & smoke tests", location: "ECS service" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{item.action}</p>
                            <p className="text-sm text-muted-foreground">{item.location}</p>
                          </div>
                          {idx < 6 && <ArrowRight className="w-5 h-5 text-muted-foreground" />}
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Environments</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="p-6 border-2 border-green-500/30 bg-green-500/5">
                      <h4 className="font-semibold mb-3">Development</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• Local DynamoDB (DynamoDB Local)</li>
                        <li>• Local Redis</li>
                        <li>• Mock external APIs</li>
                        <li>• Hot reload enabled</li>
                        <li>• 1 task per service</li>
                      </ul>
                    </Card>

                    <Card className="p-6 border-2 border-yellow-500/30 bg-yellow-500/5">
                      <h4 className="font-semibold mb-3">Staging</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• AWS DynamoDB (on-demand)</li>
                        <li>• ElastiCache Redis</li>
                        <li>• Sandbox external APIs</li>
                        <li>• 1-2 tasks per service</li>
                        <li>• Integration tests</li>
                      </ul>
                    </Card>

                    <Card className="p-6 border-2 border-red-500/30 bg-red-500/5">
                      <h4 className="font-semibold mb-3">Production</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• AWS DynamoDB (on-demand)</li>
                        <li>• ElastiCache Redis (cluster)</li>
                        <li>• Live external APIs</li>
                        <li>• 2+ tasks per service</li>
                        <li>• Auto-scaling enabled</li>
                      </ul>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Scaling Configuration</h3>
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-semibold">Auto-Scaling Policies</p>
                          <p className="text-sm text-muted-foreground">
                            Each service has independent auto-scaling based on CPU utilization (target: 70%),
                            memory utilization, and request count. Scales from 1-5 tasks per service.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Cpu className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-semibold">Resource Allocation</p>
                          <p className="text-sm text-muted-foreground">
                            Auth/User/Notification: 0.25 vCPU, 512MB RAM<br />
                            Contract/Payment: 0.5 vCPU, 1GB RAM<br />
                            Other services: 0.25-0.5 vCPU, 512MB-1GB RAM
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Activity className="w-5 h-5 text-purple-500 mt-0.5" />
                        <div>
                          <p className="font-semibold">Load Balancing</p>
                          <p className="text-sm text-muted-foreground">
                            Application Load Balancer distributes requests across service tasks using
                            round-robin algorithm with health checks.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BackendMicroservicesArchitecture;


