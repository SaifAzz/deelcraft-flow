import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Database,
  Server,
  Globe,
  Network,
  Cloud,
  Code,
  ShieldCheck,
  User,
  FileSignature,
  Bell,
  Building2,
  Wallet,
  Users,
  CreditCard,
  FileText,
  ClipboardList,
  Zap,
  GitBranch,
  UserPlus,
  DollarSign,
  BarChart3,
  Send
} from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

const ClientDashboardBackend = () => {
  const navigate = useNavigate();

  const dashboardFeatures = [
    {
      name: "Company Profile",
      icon: Building2,
      description: "Manage company info, business registration, tax details"
    },
    {
      name: "Contractor Management",
      icon: Users,
      description: "Invite, onboard, and manage contractors"
    },
    {
      name: "Contract Creation",
      icon: FileSignature,
      description: "Create fixed-rate, hourly, or milestone contracts"
    },
    {
      name: "Payroll Management",
      icon: CreditCard,
      description: "Process payroll runs, manage payment schedules"
    },
    {
      name: "Compliance Monitoring",
      icon: ShieldCheck,
      description: "Track KYC status, document expiry, scores"
    },
    {
      name: "Escrow & Payments",
      icon: Wallet,
      description: "Manage escrow balance, fund accounts"
    },
    {
      name: "Document Management",
      icon: FileText,
      description: "Upload and manage business documents"
    },
    {
      name: "Notifications",
      icon: Bell,
      description: "Contract updates, payment alerts, compliance"
    }
  ];

  const services = [
    {
      name: "Client Service",
      port: 3003,
      icon: Building2,
      description: "Company profile, documents, settings",
      endpoints: [
        "GET /api/clients/me",
        "PUT /api/clients/me",
        "GET /api/clients/me/documents",
        "GET /api/clients/me/dashboard/stats"
      ],
      tables: ["client-companies", "client-documents", "client-invitations"]
    },
    {
      name: "Contractor Service",
      port: 3004,
      icon: Users,
      description: "Contractor invitations, onboarding management",
      endpoints: [
        "GET /api/clients/me/contractors",
        "POST /api/clients/me/contractors/invite",
        "GET /api/clients/me/contractors/invitations"
      ],
      tables: ["contractor-profiles", "client-invitations"]
    },
    {
      name: "Contract Service",
      port: 3006,
      icon: FileSignature,
      description: "Contract creation, milestones, timesheets",
      endpoints: [
        "GET /api/clients/me/contracts",
        "POST /api/clients/me/contracts",
        "POST /api/clients/me/contracts/:id/sign",
        "POST /api/clients/me/milestones/:id/approve"
      ],
      tables: ["contract-contracts", "contract-milestones", "contract-timesheets"]
    },
    {
      name: "Payment Service",
      port: 3008,
      icon: Wallet,
      description: "Escrow, payroll, transactions",
      endpoints: [
        "GET /api/clients/me/escrow",
        "POST /api/clients/me/escrow/fund",
        "POST /api/clients/me/payroll",
        "POST /api/clients/me/payroll/:id/process"
      ],
      tables: ["payment-escrow", "payment-payroll", "payment-transactions"]
    },
    {
      name: "KYC Service",
      port: 3005,
      icon: ShieldCheck,
      description: "Contractor KYC status, compliance overview",
      endpoints: [
        "GET /api/clients/me/compliance/overview",
        "GET /api/clients/me/contractors/:id/kyc"
      ],
      tables: ["kyc-sessions", "kyc-documents"]
    },
    {
      name: "Notification Service",
      port: 3010,
      icon: Bell,
      description: "Alerts, activity feed, deadlines",
      endpoints: [
        "GET /api/clients/me/notifications",
        "GET /api/clients/me/dashboard/activity",
        "GET /api/clients/me/dashboard/deadlines"
      ],
      tables: ["notification-notifications"]
    }
  ];

  const apiEndpoints = {
    company: [
      { method: "GET", path: "/api/clients/me", description: "Get company profile" },
      { method: "PUT", path: "/api/clients/me", description: "Update company profile" },
      { method: "GET", path: "/api/clients/me/documents", description: "List documents" },
      { method: "POST", path: "/api/clients/me/documents", description: "Upload document" },
      { method: "GET", path: "/api/clients/me/dashboard/stats", description: "Dashboard stats" },
      { method: "GET", path: "/api/clients/me/dashboard/activity", description: "Activity feed" },
      { method: "GET", path: "/api/clients/me/dashboard/deadlines", description: "Deadlines" }
    ],
    contractors: [
      { method: "GET", path: "/api/clients/me/contractors", description: "List contractors" },
      { method: "GET", path: "/api/clients/me/contractors/:id", description: "Get contractor" },
      { method: "POST", path: "/api/clients/me/contractors/invite", description: "Invite contractor" },
      { method: "GET", path: "/api/clients/me/contractors/invitations", description: "List invitations" },
      { method: "POST", path: "/api/clients/me/contractors/invitations/:id/resend", description: "Resend invite" },
      { method: "DELETE", path: "/api/clients/me/contractors/invitations/:id", description: "Cancel invite" },
      { method: "GET", path: "/api/clients/me/compliance/overview", description: "Compliance overview" }
    ],
    contracts: [
      { method: "GET", path: "/api/clients/me/contracts", description: "List contracts" },
      { method: "POST", path: "/api/clients/me/contracts", description: "Create contract" },
      { method: "GET", path: "/api/clients/me/contracts/:id", description: "Get contract" },
      { method: "PUT", path: "/api/clients/me/contracts/:id", description: "Update contract" },
      { method: "POST", path: "/api/clients/me/contracts/:id/sign", description: "Sign contract" },
      { method: "POST", path: "/api/clients/me/contracts/:id/terminate", description: "Terminate" },
      { method: "POST", path: "/api/clients/me/milestones/:id/approve", description: "Approve milestone" },
      { method: "POST", path: "/api/clients/me/timesheets/:id/approve", description: "Approve timesheet" }
    ],
    payments: [
      { method: "GET", path: "/api/clients/me/escrow", description: "Get escrow balance" },
      { method: "POST", path: "/api/clients/me/escrow/fund", description: "Fund escrow" },
      { method: "GET", path: "/api/clients/me/transactions", description: "Transaction history" },
      { method: "GET", path: "/api/clients/me/payroll", description: "List payroll runs" },
      { method: "POST", path: "/api/clients/me/payroll", description: "Create payroll" },
      { method: "POST", path: "/api/clients/me/payroll/:id/process", description: "Process payroll" }
    ]
  };

  const newTables = [
    {
      name: "client-companies",
      service: "Client Service",
      attributes: ["id", "userId", "legalName", "country", "taxId", "verificationStatus", "address"],
      indexes: ["userId-index"]
    },
    {
      name: "client-documents",
      service: "Client Service",
      attributes: ["id", "clientId", "type", "name", "s3Key", "status", "requiredFor"],
      indexes: ["clientId-index", "status-index"]
    },
    {
      name: "payment-payroll",
      service: "Payment Service",
      attributes: ["id", "clientId", "period", "totalAmount", "status", "contractorCount"],
      indexes: ["clientId-index", "status-index"]
    },
    {
      name: "payment-payroll-items",
      service: "Payment Service",
      attributes: ["id", "payrollId", "contractorId", "amount", "status", "details"],
      indexes: ["payrollId-index", "contractorId-index"]
    },
    {
      name: "contract-milestones",
      service: "Contract Service",
      attributes: ["id", "contractId", "title", "amount", "dueDate", "status"],
      indexes: ["contractId-index", "status-index"]
    }
  ];

  const eventBridgeEvents = [
    { event: "client.profile.updated", source: "Client Service", consumers: "Notification" },
    { event: "contractor.invited", source: "Contractor Service", consumers: "Email Service" },
    { event: "contractor.joined", source: "Contractor Service", consumers: "Notification" },
    { event: "contract.created", source: "Contract Service", consumers: "Notification" },
    { event: "contract.signed", source: "Contract Service", consumers: "Notification, Ledger" },
    { event: "milestone.approved", source: "Contract Service", consumers: "Payment, Notification" },
    { event: "timesheet.approved", source: "Contract Service", consumers: "Payment, Notification" },
    { event: "payroll.processed", source: "Payment Service", consumers: "Notification" },
    { event: "escrow.funded", source: "Payment Service", consumers: "Notification" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="container mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Client Dashboard Backend</h1>
                <p className="text-slate-400">API Architecture & Service Design</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Complete backend architecture for the Client Dashboard, featuring contractor management,
              contract creation, payroll processing, and compliance monitoring.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Badge className="bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700">
                <Server className="w-3 h-3 mr-1.5" />
                6 Microservices
              </Badge>
              <Badge className="bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700">
                <Code className="w-3 h-3 mr-1.5" />
                47+ Endpoints
              </Badge>
              <Badge className="bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700">
                <Database className="w-3 h-3 mr-1.5" />
                5 New Tables
              </Badge>
              <Badge className="bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700">
                <Cloud className="w-3 h-3 mr-1.5" />
                AWS Infrastructure
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl mx-auto mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="flows">Data Flows</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-8">
            {/* Features Grid */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Dashboard Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardFeatures.map((feature, idx) => (
                  <Card key={idx} className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
                      <feature.icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <h3 className="font-medium text-slate-800 dark:text-slate-200 mb-1">{feature.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{feature.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Architecture Diagram */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">System Architecture</h2>
              <Card className="p-8 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <div className="max-w-4xl mx-auto space-y-4">
                  {/* Frontend Layer */}
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Globe className="w-5 h-5 text-slate-500" />
                      <span className="font-medium text-slate-700 dark:text-slate-300">Client Dashboard</span>
                    </div>
                    <span className="text-xs text-slate-500">Next.js / React / Tailwind CSS</span>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-px h-6 bg-slate-300 dark:bg-slate-600" />
                  </div>

                  {/* API Gateway */}
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Network className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-blue-700 dark:text-blue-300">AWS API Gateway</span>
                    </div>
                    <span className="text-xs text-blue-600 dark:text-blue-400">JWT Auth • Rate Limiting • Routing</span>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-px h-6 bg-slate-300 dark:bg-slate-600" />
                  </div>

                  {/* Services Layer */}
                  <div className="grid grid-cols-6 gap-2">
                    {services.map((service, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                        <service.icon className="w-5 h-5 mx-auto mb-1 text-slate-500 dark:text-slate-400" />
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{service.name.split(' ')[0]}</p>
                        <p className="text-[10px] text-slate-500">:{service.port}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <div className="w-px h-6 bg-slate-300 dark:bg-slate-600" />
                  </div>

                  {/* Data Layer */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-center">
                      <Database className="w-5 h-5 mx-auto mb-1 text-amber-600 dark:text-amber-400" />
                      <p className="text-xs font-medium text-amber-700 dark:text-amber-300">DynamoDB</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 text-center">
                      <Cloud className="w-5 h-5 mx-auto mb-1 text-purple-600 dark:text-purple-400" />
                      <p className="text-xs font-medium text-purple-700 dark:text-purple-300">S3 Storage</p>
                    </div>
                    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-center">
                      <Zap className="w-5 h-5 mx-auto mb-1 text-red-600 dark:text-red-400" />
                      <p className="text-xs font-medium text-red-700 dark:text-red-300">Redis Cache</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Microservices", value: "6", icon: Server },
                { label: "API Endpoints", value: "47+", icon: Code },
                { label: "New DynamoDB Tables", value: "5", icon: Database },
                { label: "EventBridge Events", value: "9", icon: GitBranch }
              ].map((stat, idx) => (
                <Card key={idx} className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{stat.value}</p>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* SERVICES TAB */}
          <TabsContent value="services" className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Microservices Architecture</h2>

            <div className="space-y-4">
              {services.map((service, idx) => (
                <Card key={idx} className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">{service.name}</h3>
                        <Badge variant="outline" className="text-xs bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                          Port {service.port}
                        </Badge>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 mb-4">{service.description}</p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Endpoints</h4>
                          <div className="space-y-1">
                            {service.endpoints.map((endpoint, i) => (
                              <code key={i} className="block text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1.5 rounded text-slate-600 dark:text-slate-400">
                                {endpoint}
                              </code>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">DynamoDB Tables</h4>
                          <div className="space-y-1">
                            {service.tables.map((table, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                <Database className="w-3 h-3" />
                                {table}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* API ENDPOINTS TAB */}
          <TabsContent value="api" className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">API Endpoints</h2>

            <div className="space-y-6">
              {Object.entries(apiEndpoints).map(([category, endpoints]) => (
                <Card key={category} className="overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 capitalize">{category}</h3>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {endpoints.map((endpoint, idx) => (
                      <div key={idx} className="px-6 py-3 flex items-center gap-4">
                        <Badge
                          className={`w-16 justify-center text-xs font-medium ${endpoint.method === "GET"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : endpoint.method === "POST"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : endpoint.method === "PUT"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm text-slate-600 dark:text-slate-400 font-mono flex-1">{endpoint.path}</code>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{endpoint.description}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Example Response */}
            <Card className="overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Example Response</h3>
                <p className="text-sm text-slate-500">GET /api/clients/me/dashboard/stats</p>
              </div>
              <div className="p-6">
                <pre className="bg-slate-900 text-slate-300 p-4 rounded-lg text-xs overflow-x-auto">
                  {`{
  "activeContracts": 12,
  "totalContractors": 18,
  "escrowBalance": 45250.00,
  "pendingApprovals": 7,
  "complianceScore": 92,
  "thisMonthPayroll": 25000.00,
  "upcomingPayroll": 28000.00
}`}
                </pre>
              </div>
            </Card>
          </TabsContent>

          {/* DATABASE TAB */}
          <TabsContent value="database" className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">New DynamoDB Tables</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {newTables.map((table, idx) => (
                <Card key={idx} className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <Database className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200">{table.name}</h3>
                      <p className="text-xs text-slate-500">{table.service}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Attributes</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {table.attributes.map((attr, i) => (
                          <Badge key={i} variant="outline" className="text-xs bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                            {attr}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Global Secondary Indexes</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {table.indexes.map((index, i) => (
                          <Badge key={i} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-0">
                            {index}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Terraform Example */}
            <Card className="overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Terraform Configuration</h3>
              </div>
              <div className="p-6">
                <pre className="bg-slate-900 text-slate-300 p-4 rounded-lg text-xs overflow-x-auto">
                  {`resource "aws_dynamodb_table" "payment_payroll" {
  name           = "\${var.environment}-payment-payroll"
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

  global_secondary_index {
    name     = "clientId-index"
    hash_key = "clientId"
    projection_type = "ALL"
  }

  server_side_encryption {
    enabled = true
  }

  tags = {
    Service = "payment-service"
  }
}`}
                </pre>
              </div>
            </Card>
          </TabsContent>

          {/* DATA FLOWS TAB */}
          <TabsContent value="flows" className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Data Flow Diagrams</h2>

            {/* Contract Creation Flow */}
            <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-6">
                <FileSignature className="w-5 h-5 text-slate-500" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Contract Creation Flow</h3>
              </div>
              <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
                {[
                  { step: "1", label: "Create Contract" },
                  { step: "2", label: "Generate PDF" },
                  { step: "3", label: "Upload to S3" },
                  { step: "4", label: "Save to DB" },
                  { step: "5", label: "Notify Contractor" }
                ].map((item, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center min-w-[100px]">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm font-medium mb-2">
                        {item.step}
                      </div>
                      <span className="text-xs text-slate-600 dark:text-slate-400 text-center">{item.label}</span>
                    </div>
                    {idx < 4 && <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                  </React.Fragment>
                ))}
              </div>
            </Card>

            {/* Payroll Processing Flow */}
            <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5 text-slate-500" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Payroll Processing Flow</h3>
              </div>
              <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
                {[
                  { step: "1", label: "Create Payroll" },
                  { step: "2", label: "Add Line Items" },
                  { step: "3", label: "Check Escrow" },
                  { step: "4", label: "Lock Funds" },
                  { step: "5", label: "Stripe Payout" },
                  { step: "6", label: "Notify All" }
                ].map((item, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center min-w-[90px]">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium mb-2">
                        {item.step}
                      </div>
                      <span className="text-xs text-slate-600 dark:text-slate-400 text-center">{item.label}</span>
                    </div>
                    {idx < 5 && <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                  </React.Fragment>
                ))}
              </div>
            </Card>

            {/* Contractor Invitation Flow */}
            <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-6">
                <UserPlus className="w-5 h-5 text-slate-500" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Contractor Invitation Flow</h3>
              </div>
              <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
                {[
                  { step: "1", label: "Send Invite" },
                  { step: "2", label: "Generate Token" },
                  { step: "3", label: "Email Contractor" },
                  { step: "4", label: "Click Link" },
                  { step: "5", label: "Complete KYC" },
                  { step: "6", label: "Create Contract" }
                ].map((item, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center min-w-[90px]">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-medium mb-2">
                        {item.step}
                      </div>
                      <span className="text-xs text-slate-600 dark:text-slate-400 text-center">{item.label}</span>
                    </div>
                    {idx < 5 && <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                  </React.Fragment>
                ))}
              </div>
            </Card>

            {/* EventBridge Events */}
            <Card className="overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-slate-500" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">EventBridge Events</h3>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {eventBridgeEvents.map((item, idx) => (
                  <div key={idx} className="px-6 py-3 flex items-center gap-4">
                    <code className="text-sm font-mono text-slate-700 dark:text-slate-300 flex-1">{item.event}</code>
                    <span className="text-sm text-slate-500">{item.source}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-500">{item.consumers}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDashboardBackend;
