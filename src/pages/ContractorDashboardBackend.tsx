import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Database,
  Server,
  Globe,
  Lock,
  FileText,
  Users,
  Shield,
  Wallet,
  Network,
  Cloud,
  Code,
  TrendingUp,
  ShieldCheck,
  User,
  FileSignature,
  Bell,
  Receipt,
  Timer,
  Layers,
  Zap,
  GitBranch
} from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

const ContractorDashboardBackend = () => {
  const navigate = useNavigate();

  const dashboardFeatures = [
    {
      name: "Profile Management",
      icon: User,
      description: "Personal info, bank details, tax information management"
    },
    {
      name: "KYC Verification",
      icon: ShieldCheck,
      description: "Identity verification status and document uploads"
    },
    {
      name: "Contract Management",
      icon: FileSignature,
      description: "View, review, and sign contracts electronically"
    },
    {
      name: "Earnings Dashboard",
      icon: TrendingUp,
      description: "Track total earned, pending, and available balance"
    },
    {
      name: "Timesheet Tracking",
      icon: Timer,
      description: "Submit and manage timesheets for hourly contracts"
    },
    {
      name: "Invoice Management",
      icon: Receipt,
      description: "View and download invoices and payment history"
    },
    {
      name: "Wallet & Withdrawals",
      icon: Wallet,
      description: "View balance and request fund withdrawals"
    },
    {
      name: "Notifications",
      icon: Bell,
      description: "Contract updates, payment alerts, and system notifications"
    }
  ];

  const services = [
    {
      name: "Contractor Service",
      port: 3004,
      icon: User,
      description: "Profile management, bank details, tax documents",
      endpoints: [
        "GET /api/contractors/me",
        "PUT /api/contractors/me",
        "PUT /api/contractors/me/bank-details",
        "POST /api/contractors/me/tax-info"
      ],
      tables: ["contractor-profiles", "contractor-bank-details", "contractor-tax-info"]
    },
    {
      name: "KYC Service",
      port: 3005,
      icon: ShieldCheck,
      description: "Identity verification via Veriff integration",
      endpoints: [
        "GET /api/kyc/contractor/me/status",
        "POST /api/kyc/contractor/me/start",
        "POST /api/kyc/contractor/me/documents"
      ],
      tables: ["kyc-sessions", "kyc-documents"]
    },
    {
      name: "Contract Service",
      port: 3006,
      icon: FileSignature,
      description: "Contract lifecycle management and timesheets",
      endpoints: [
        "GET /api/contracts/contractor/me",
        "GET /api/contracts/:id",
        "POST /api/contracts/:id/sign",
        "POST /api/timesheets"
      ],
      tables: ["contract-contracts", "contract-templates", "contract-timesheets"]
    },
    {
      name: "Payment Service",
      port: 3008,
      icon: Wallet,
      description: "Earnings tracking, invoices, and withdrawals",
      endpoints: [
        "GET /api/payments/contractor/me/earnings",
        "GET /api/payments/contractor/me/invoices",
        "GET /api/payments/contractor/me/wallet",
        "POST /api/payments/contractor/me/withdrawals"
      ],
      tables: ["payment-transactions", "payment-invoices", "payment-withdrawals"]
    },
    {
      name: "Notification Service",
      port: 3010,
      icon: Bell,
      description: "In-app notifications and email alerts",
      endpoints: [
        "GET /api/notifications/me",
        "PUT /api/notifications/:id/read",
        "PUT /api/notifications/me/read-all"
      ],
      tables: ["notification-notifications", "notification-templates"]
    }
  ];

  const apiEndpoints = {
    profile: [
      { method: "GET", path: "/api/contractors/me", description: "Get contractor profile" },
      { method: "PUT", path: "/api/contractors/me", description: "Update contractor profile" },
      { method: "POST", path: "/api/contractors/me/avatar", description: "Upload avatar" },
      { method: "GET", path: "/api/contractors/me/bank-details", description: "Get bank details" },
      { method: "PUT", path: "/api/contractors/me/bank-details", description: "Update bank details" },
      { method: "GET", path: "/api/contractors/me/tax-info", description: "Get tax information" },
      { method: "POST", path: "/api/contractors/me/tax-info", description: "Submit tax form" }
    ],
    contracts: [
      { method: "GET", path: "/api/contracts/contractor/me", description: "List contracts" },
      { method: "GET", path: "/api/contracts/:id", description: "Get contract details" },
      { method: "POST", path: "/api/contracts/:id/sign", description: "Sign contract" },
      { method: "GET", path: "/api/contracts/:id/download", description: "Download PDF" },
      { method: "GET", path: "/api/timesheets/contractor/me", description: "List timesheets" },
      { method: "POST", path: "/api/timesheets", description: "Submit timesheet" },
      { method: "PUT", path: "/api/timesheets/:id", description: "Update timesheet" }
    ],
    payments: [
      { method: "GET", path: "/api/payments/contractor/me/earnings", description: "Earnings summary" },
      { method: "GET", path: "/api/payments/contractor/me/history", description: "Payment history" },
      { method: "GET", path: "/api/payments/contractor/me/invoices", description: "List invoices" },
      { method: "GET", path: "/api/payments/contractor/me/wallet", description: "Wallet balance" },
      { method: "POST", path: "/api/payments/contractor/me/withdrawals", description: "Request withdrawal" },
      { method: "GET", path: "/api/payments/contractor/me/withdrawals", description: "List withdrawals" }
    ],
    kyc: [
      { method: "GET", path: "/api/kyc/contractor/me/status", description: "KYC status" },
      { method: "POST", path: "/api/kyc/contractor/me/start", description: "Start KYC session" },
      { method: "GET", path: "/api/kyc/contractor/me/documents", description: "List documents" },
      { method: "POST", path: "/api/kyc/contractor/me/documents", description: "Upload document" }
    ],
    notifications: [
      { method: "GET", path: "/api/notifications/me", description: "Get notifications" },
      { method: "PUT", path: "/api/notifications/:id/read", description: "Mark as read" },
      { method: "PUT", path: "/api/notifications/me/read-all", description: "Mark all read" }
    ]
  };

  const newTables = [
    {
      name: "contractor-tax-info",
      service: "Contractor Service",
      attributes: ["id", "contractorId", "taxId", "taxCountry", "taxFormType", "taxFormUrl", "status"],
      indexes: ["contractorId-index"]
    },
    {
      name: "contract-timesheets",
      service: "Contract Service",
      attributes: ["id", "contractId", "contractorId", "weekEnding", "entries", "totalHours", "status"],
      indexes: ["contractorId-index", "contractId-index", "status-index"]
    },
    {
      name: "payment-invoices",
      service: "Payment Service",
      attributes: ["id", "invoiceNumber", "contractId", "amount", "status", "dueDate", "pdfUrl"],
      indexes: ["contractorId-index", "contractId-index", "status-index"]
    },
    {
      name: "payment-withdrawals",
      service: "Payment Service",
      attributes: ["id", "contractorId", "amount", "fee", "status", "withdrawalMethod"],
      indexes: ["contractorId-index", "status-index"]
    }
  ];

  const eventBridgeEvents = [
    { event: "contractor.profile.updated", source: "Contractor Service", consumers: "Notification" },
    { event: "contractor.kyc.completed", source: "KYC Service", consumers: "Contractor, Notification" },
    { event: "contract.signed", source: "Contract Service", consumers: "Notification, Ledger" },
    { event: "timesheet.submitted", source: "Contract Service", consumers: "Notification" },
    { event: "timesheet.approved", source: "Contract Service", consumers: "Payment, Notification" },
    { event: "payment.received", source: "Payment Service", consumers: "Notification" },
    { event: "withdrawal.requested", source: "Payment Service", consumers: "Notification" },
    { event: "withdrawal.completed", source: "Payment Service", consumers: "Notification" }
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
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <User className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Contractor Dashboard Backend</h1>
                <p className="text-slate-400">API Architecture & Service Design</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Complete backend architecture for the Contractor Dashboard, featuring microservices design,
              RESTful APIs, and AWS infrastructure integration.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Badge className="bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700">
                <Server className="w-3 h-3 mr-1.5" />
                5 Microservices
              </Badge>
              <Badge className="bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700">
                <Code className="w-3 h-3 mr-1.5" />
                30+ Endpoints
              </Badge>
              <Badge className="bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700">
                <Database className="w-3 h-3 mr-1.5" />
                4 New Tables
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
                <div className="max-w-3xl mx-auto space-y-4">
                  {/* Frontend Layer */}
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Globe className="w-5 h-5 text-slate-500" />
                      <span className="font-medium text-slate-700 dark:text-slate-300">Contractor Dashboard</span>
                    </div>
                    <span className="text-xs text-slate-500">Next.js / React / Tailwind CSS</span>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-px h-6 bg-slate-300 dark:bg-slate-600" />
                  </div>

                  {/* API Gateway */}
                  <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Network className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-medium text-emerald-700 dark:text-emerald-300">AWS API Gateway</span>
                    </div>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400">JWT Auth • Rate Limiting • Routing</span>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-px h-6 bg-slate-300 dark:bg-slate-600" />
                  </div>

                  {/* Services Layer */}
                  <div className="grid grid-cols-5 gap-2">
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
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-center">
                      <Cloud className="w-5 h-5 mx-auto mb-1 text-blue-600 dark:text-blue-400" />
                      <p className="text-xs font-medium text-blue-700 dark:text-blue-300">S3 Storage</p>
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
                { label: "Microservices", value: "5", icon: Server },
                { label: "API Endpoints", value: "30+", icon: Code },
                { label: "New DynamoDB Tables", value: "4", icon: Database },
                { label: "EventBridge Events", value: "8", icon: GitBranch }
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
                              : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
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
                <p className="text-sm text-slate-500">GET /api/payments/contractor/me/earnings</p>
              </div>
              <div className="p-6">
                <pre className="bg-slate-900 text-slate-300 p-4 rounded-lg text-xs overflow-x-auto">
                  {`{
  "totalEarned": 52340.00,
  "thisMonth": 9120.00,
  "lastMonth": 8500.00,
  "pendingPayments": 4000.00,
  "availableBalance": 48340.00,
  "currency": "USD",
  "earningsByMonth": [
    { "month": "2024-01", "amount": 8500 },
    { "month": "2024-02", "amount": 9120 }
  ],
  "earningsByContract": [
    { "contractId": "uuid", "clientName": "ABC Corp", "amount": 30000 }
  ]
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
                          <Badge key={i} className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-0">
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
                  {`resource "aws_dynamodb_table" "contract_timesheets" {
  name           = "\${var.environment}-contract-timesheets"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "contractorId"
    type = "S"
  }

  global_secondary_index {
    name     = "contractorId-index"
    hash_key = "contractorId"
    projection_type = "ALL"
  }

  server_side_encryption {
    enabled = true
  }

  tags = {
    Service = "contract-service"
  }
}`}
                </pre>
              </div>
            </Card>
          </TabsContent>

          {/* DATA FLOWS TAB */}
          <TabsContent value="flows" className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Data Flow Diagrams</h2>

            {/* Contract Signing Flow */}
            <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-6">
                <FileSignature className="w-5 h-5 text-slate-500" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Contract Signing Flow</h3>
              </div>
              <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
                {[
                  { step: "1", label: "Sign Request" },
                  { step: "2", label: "API Call" },
                  { step: "3", label: "Validation" },
                  { step: "4", label: "DynamoDB Update" },
                  { step: "5", label: "Event Publish" },
                  { step: "6", label: "Notification" }
                ].map((item, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center min-w-[100px]">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm font-medium mb-2">
                        {item.step}
                      </div>
                      <span className="text-xs text-slate-600 dark:text-slate-400 text-center">{item.label}</span>
                    </div>
                    {idx < 5 && <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                  </React.Fragment>
                ))}
              </div>
            </Card>

            {/* Withdrawal Flow */}
            <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-6">
                <Wallet className="w-5 h-5 text-slate-500" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Withdrawal Request Flow</h3>
              </div>
              <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
                {[
                  { step: "1", label: "Request" },
                  { step: "2", label: "Balance Check" },
                  { step: "3", label: "Create Record" },
                  { step: "4", label: "Stripe Transfer" },
                  { step: "5", label: "Update Wallet" },
                  { step: "6", label: "Notify" }
                ].map((item, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center min-w-[100px]">
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

export default ContractorDashboardBackend;
