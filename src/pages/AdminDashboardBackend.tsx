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
  Shield,
  FileText,
  Bell,
  Building2,
  Wallet,
  Users,
  CreditCard,
  ClipboardList,
  Zap,
  GitBranch,
  BarChart3,
  ScrollText,
  Settings,
  UserCog,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Lock,
  Key,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


const AdminDashboardBackend = () => {
  const navigate = useNavigate();

  const dashboardFeatures = [
    {
      name: "Dashboard Overview",
      icon: BarChart3,
      description: "Platform-wide analytics, KPIs, system alerts"
    },
    {
      name: "Client Management",
      icon: Building2,
      description: "Review, approve, manage all client companies"
    },
    {
      name: "Document Review",
      icon: FileText,
      description: "Approve/reject KYC documents, track pending"
    },
    {
      name: "Payroll Monitoring",
      icon: CreditCard,
      description: "Review and process payroll runs"
    },
    {
      name: "Compliance Management",
      icon: ShieldCheck,
      description: "Monitor contractor compliance status"
    },
    {
      name: "Country Configuration",
      icon: Globe,
      description: "Manage country-specific document requirements"
    },
    {
      name: "Audit Logs",
      icon: ScrollText,
      description: "Track all admin actions and system events"
    },
    {
      name: "Admin User Management",
      icon: UserCog,
      description: "Manage admin accounts and roles"
    }
  ];

  const adminRoles = [
    {
      role: "Super Admin",
      description: "Full platform access",
      permissions: ["All operations"],
      color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
    },
    {
      role: "Compliance Admin",
      description: "Document & KYC management",
      permissions: ["Documents", "Compliance", "Contractors"],
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
      role: "Finance Admin",
      description: "Payment & payroll oversight",
      permissions: ["Payroll", "Escrow", "Transactions"],
      color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
    },
    {
      role: "Support Admin",
      description: "Client & contractor support",
      permissions: ["View access", "Limited modifications"],
      color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
    }
  ];

  const services = [
    {
      name: "Admin Service",
      port: 3002,
      icon: Shield,
      description: "Admin users, settings, country rules, alerts",
      endpoints: [
        "GET /api/admin/dashboard",
        "GET /api/admin/users",
        "PUT /api/admin/countries/:code",
        "PUT /api/admin/alerts/:id/resolve"
      ],
      tables: ["admin-users", "admin-country-rules", "admin-system-alerts"]
    },
    {
      name: "Audit Service",
      port: 3011,
      icon: ScrollText,
      description: "Audit logging, activity tracking, QLDB",
      endpoints: [
        "GET /api/admin/audit",
        "GET /api/admin/audit/export",
        "POST /api/admin/audit/log"
      ],
      tables: ["audit-logs", "audit-events", "QLDB Ledger"]
    },
    {
      name: "Client Service",
      port: 3003,
      icon: Building2,
      description: "Client company management, approvals",
      endpoints: [
        "GET /api/admin/clients",
        "POST /api/admin/clients/:id/approve",
        "POST /api/admin/clients/:id/suspend"
      ],
      tables: ["client-companies"]
    },
    {
      name: "KYC Service",
      port: 3005,
      icon: FileText,
      description: "Document review, approval/rejection",
      endpoints: [
        "GET /api/admin/documents/pending",
        "POST /api/admin/documents/:id/approve",
        "POST /api/admin/documents/:id/reject"
      ],
      tables: ["kyc-documents", "kyc-sessions"]
    },
    {
      name: "Payment Service",
      port: 3008,
      icon: Wallet,
      description: "Payroll processing, ledger adjustments",
      endpoints: [
        "GET /api/admin/payroll",
        "POST /api/admin/payroll/:id/process",
        "POST /api/admin/ledger/adjust"
      ],
      tables: ["payment-payroll", "contractor-wallet"]
    },
    {
      name: "Contractor Service",
      port: 3004,
      icon: Users,
      description: "Contractor oversight, suspensions",
      endpoints: [
        "GET /api/admin/compliance/overview",
        "POST /api/admin/contractors/:id/suspend"
      ],
      tables: ["contractor-profiles"]
    }
  ];

  const apiEndpoints = {
    dashboard: [
      { method: "GET", path: "/api/admin/dashboard", description: "Dashboard overview" },
      { method: "GET", path: "/api/admin/analytics", description: "Platform analytics" },
      { method: "GET", path: "/api/admin/alerts", description: "System alerts" },
      { method: "PUT", path: "/api/admin/alerts/:id/resolve", description: "Resolve alert" }
    ],
    clients: [
      { method: "GET", path: "/api/admin/clients", description: "List all clients" },
      { method: "GET", path: "/api/admin/clients/:id", description: "Client details" },
      { method: "POST", path: "/api/admin/clients/:id/approve", description: "Approve client" },
      { method: "POST", path: "/api/admin/clients/:id/reject", description: "Reject client" },
      { method: "POST", path: "/api/admin/clients/:id/suspend", description: "Suspend client" }
    ],
    documents: [
      { method: "GET", path: "/api/admin/documents/pending", description: "Pending documents" },
      { method: "GET", path: "/api/admin/documents/:id", description: "Document details" },
      { method: "POST", path: "/api/admin/documents/:id/approve", description: "Approve document" },
      { method: "POST", path: "/api/admin/documents/:id/reject", description: "Reject document" },
      { method: "POST", path: "/api/admin/documents/request", description: "Request document" }
    ],
    payroll: [
      { method: "GET", path: "/api/admin/payroll", description: "List payroll runs" },
      { method: "POST", path: "/api/admin/payroll/:id/review", description: "Review payroll" },
      { method: "POST", path: "/api/admin/payroll/:id/process", description: "Process payroll" },
      { method: "GET", path: "/api/admin/balances", description: "Contractor balances" },
      { method: "POST", path: "/api/admin/ledger/adjust", description: "Manual adjustment" }
    ],
    admin: [
      { method: "GET", path: "/api/admin/users", description: "List admin users" },
      { method: "POST", path: "/api/admin/users", description: "Create admin user" },
      { method: "PUT", path: "/api/admin/users/:id", description: "Update admin user" },
      { method: "DELETE", path: "/api/admin/users/:id", description: "Deactivate admin" },
      { method: "GET", path: "/api/admin/countries", description: "Country rules" },
      { method: "PUT", path: "/api/admin/countries/:code", description: "Update country rule" }
    ],
    audit: [
      { method: "GET", path: "/api/admin/audit", description: "Get audit logs" },
      { method: "GET", path: "/api/admin/audit/:id", description: "Audit log details" },
      { method: "GET", path: "/api/admin/audit/export", description: "Export audit logs" }
    ]
  };

  const newTables = [
    {
      name: "admin-users",
      service: "Admin Service",
      attributes: ["id", "email", "name", "role", "status", "permissions", "mfaEnabled"],
      indexes: ["email-index", "role-index", "status-index"]
    },
    {
      name: "admin-country-rules",
      service: "Admin Service",
      attributes: ["countryCode", "countryName", "requiredDocuments", "optionalDocuments", "currency"],
      indexes: []
    },
    {
      name: "admin-system-alerts",
      service: "Admin Service",
      attributes: ["id", "type", "title", "message", "resolved", "resolvedBy", "ttl"],
      indexes: ["resolved-index", "type-index"]
    },
    {
      name: "audit-logs",
      service: "Audit Service",
      attributes: ["id", "timestamp", "adminId", "action", "entityType", "entityId", "details", "ipAddress"],
      indexes: ["adminId-timestamp-index", "action-timestamp-index", "entityType-entityId-index"]
    },
    {
      name: "audit-events",
      service: "Audit Service",
      attributes: ["id", "timestamp", "eventType", "source", "severity", "message", "resolved"],
      indexes: ["eventType-timestamp-index", "severity-timestamp-index"]
    }
  ];

  const eventBridgeEvents = [
    { event: "document.approved", source: "KYC Service", consumers: "Notification, Audit" },
    { event: "document.rejected", source: "KYC Service", consumers: "Notification, Audit" },
    { event: "client.approved", source: "Client Service", consumers: "Notification, Audit" },
    { event: "client.suspended", source: "Client Service", consumers: "Notification, Audit" },
    { event: "contractor.suspended", source: "Contractor Service", consumers: "Notification, Audit" },
    { event: "payroll.processed", source: "Payment Service", consumers: "Notification, Audit" },
    { event: "ledger.adjusted", source: "Payment Service", consumers: "QLDB, Audit" },
    { event: "country.rule.updated", source: "Admin Service", consumers: "Audit" },
    { event: "admin.user.created", source: "Admin Service", consumers: "Audit" }
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
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard Backend</h1>
                <p className="text-slate-400">Platform Management & Oversight APIs</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Complete backend architecture for the Admin Dashboard, featuring client management,
              document review, payroll oversight, compliance monitoring, and comprehensive audit logging.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Badge className="bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700">
                <Server className="w-3 h-3 mr-1.5" />
                9 Microservices
              </Badge>
              <Badge className="bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700">
                <Code className="w-3 h-3 mr-1.5" />
                55+ Endpoints
              </Badge>
              <Badge className="bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700">
                <Database className="w-3 h-3 mr-1.5" />
                6 New Tables
              </Badge>
              <Badge className="bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700">
                <Lock className="w-3 h-3 mr-1.5" />
                4 Admin Roles
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl mx-auto mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
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
                  <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <span className="font-medium text-red-700 dark:text-red-300">Admin Dashboard</span>
                    </div>
                    <span className="text-xs text-red-600 dark:text-red-400">Next.js / React / Tailwind CSS</span>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-px h-6 bg-slate-300 dark:bg-slate-600" />
                  </div>

                  {/* API Gateway */}
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Network className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-blue-700 dark:text-blue-300">AWS API Gateway (Admin Routes)</span>
                    </div>
                    <span className="text-xs text-blue-600 dark:text-blue-400">JWT Auth • MFA Required • Role Validation • Audit Logging</span>
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
                  <div className="grid grid-cols-4 gap-3">
                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-center">
                      <Database className="w-5 h-5 mx-auto mb-1 text-amber-600 dark:text-amber-400" />
                      <p className="text-xs font-medium text-amber-700 dark:text-amber-300">DynamoDB</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 text-center">
                      <ScrollText className="w-5 h-5 mx-auto mb-1 text-purple-600 dark:text-purple-400" />
                      <p className="text-xs font-medium text-purple-700 dark:text-purple-300">QLDB Ledger</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center">
                      <Cloud className="w-5 h-5 mx-auto mb-1 text-green-600 dark:text-green-400" />
                      <p className="text-xs font-medium text-green-700 dark:text-green-300">S3 Storage</p>
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
                { label: "Microservices", value: "9", icon: Server },
                { label: "API Endpoints", value: "55+", icon: Code },
                { label: "New DynamoDB Tables", value: "6", icon: Database },
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

          {/* ROLES TAB */}
          <TabsContent value="roles" className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Admin Roles & Permissions</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {adminRoles.map((role, idx) => (
                <Card key={idx} className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={role.color}>{role.role}</Badge>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{role.description}</p>
                  <div>
                    <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Permissions</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {role.permissions.map((perm, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                          {perm}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Permission Matrix */}
            <Card className="overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Permission Matrix</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-slate-600 dark:text-slate-400 font-medium">Action</th>
                      <th className="px-4 py-3 text-center text-slate-600 dark:text-slate-400 font-medium">Super Admin</th>
                      <th className="px-4 py-3 text-center text-slate-600 dark:text-slate-400 font-medium">Compliance</th>
                      <th className="px-4 py-3 text-center text-slate-600 dark:text-slate-400 font-medium">Finance</th>
                      <th className="px-4 py-3 text-center text-slate-600 dark:text-slate-400 font-medium">Support</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {[
                      { action: "View Dashboard", super: true, compliance: true, finance: true, support: true },
                      { action: "Approve/Reject Documents", super: true, compliance: true, finance: false, support: false },
                      { action: "Process Payroll", super: true, compliance: false, finance: true, support: false },
                      { action: "Manual Ledger Adjustments", super: true, compliance: false, finance: true, support: false },
                      { action: "Manage Country Rules", super: true, compliance: true, finance: false, support: false },
                      { action: "Manage Admin Users", super: true, compliance: false, finance: false, support: false },
                      { action: "View Audit Logs", super: true, compliance: true, finance: true, support: true }
                    ].map((row, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{row.action}</td>
                        <td className="px-4 py-3 text-center">
                          {row.super ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" /> : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {row.compliance ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" /> : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {row.finance ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" /> : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {row.support ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" /> : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Security Features */}
            <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Security Features
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <Key className="w-5 h-5 text-slate-500 mb-2" />
                  <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-1">MFA Required</h4>
                  <p className="text-xs text-slate-500">Sensitive operations require multi-factor authentication</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <ScrollText className="w-5 h-5 text-slate-500 mb-2" />
                  <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-1">Audit Trail</h4>
                  <p className="text-xs text-slate-500">Every admin action logged with IP, timestamp, and details</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <Database className="w-5 h-5 text-slate-500 mb-2" />
                  <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-1">QLDB Ledger</h4>
                  <p className="text-xs text-slate-500">Immutable records for financial adjustments</p>
                </div>
              </div>
            </Card>
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
                <p className="text-sm text-slate-500">GET /api/admin/dashboard</p>
              </div>
              <div className="p-6">
                <pre className="bg-slate-900 text-slate-300 p-4 rounded-lg text-xs overflow-x-auto">
                  {`{
  "stats": {
    "totalClients": 45,
    "activeClients": 42,
    "pendingClients": 3,
    "totalContractors": 230,
    "pendingDocuments": 12,
    "urgentDocuments": 4
  },
  "revenue": {
    "thisMonth": 125000,
    "lastMonth": 98000,
    "growth": 27.5
  },
  "systemAlerts": [
    {
      "type": "warning",
      "title": "High Volume of Pending Documents",
      "resolved": false
    }
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
                    {table.indexes.length > 0 && (
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
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* QLDB Ledger */}
            <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <ScrollText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">AWS QLDB Ledger</h3>
                  <p className="text-xs text-slate-500">Immutable audit records for financial operations</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                All ledger adjustments and financial modifications are recorded in QLDB for immutable,
                cryptographically verifiable audit trail. This ensures complete transparency and compliance.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">Ledger Adjustments</Badge>
                <Badge variant="outline" className="text-xs">Payment Approvals</Badge>
                <Badge variant="outline" className="text-xs">Refunds</Badge>
                <Badge variant="outline" className="text-xs">Corrections</Badge>
              </div>
            </Card>
          </TabsContent>

          {/* DATA FLOWS TAB */}
          <TabsContent value="flows" className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Data Flow Diagrams</h2>

            {/* Document Approval Flow */}
            <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-slate-500" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Document Approval Flow</h3>
              </div>
              <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
                {[
                  { step: "1", label: "Admin Reviews" },
                  { step: "2", label: "Approve/Reject" },
                  { step: "3", label: "Update Status" },
                  { step: "4", label: "Audit Log" },
                  { step: "5", label: "Notify Contractor" }
                ].map((item, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center min-w-[100px]">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium mb-2">
                        {item.step}
                      </div>
                      <span className="text-xs text-slate-600 dark:text-slate-400 text-center">{item.label}</span>
                    </div>
                    {idx < 4 && <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                  </React.Fragment>
                ))}
              </div>
            </Card>

            {/* Ledger Adjustment Flow */}
            <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-6">
                <Wallet className="w-5 h-5 text-slate-500" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Manual Ledger Adjustment Flow</h3>
              </div>
              <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
                {[
                  { step: "1", label: "MFA Verify" },
                  { step: "2", label: "Validate Perms" },
                  { step: "3", label: "Calculate Balance" },
                  { step: "4", label: "Update Wallet" },
                  { step: "5", label: "Write to QLDB" },
                  { step: "6", label: "Audit Log" }
                ].map((item, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center min-w-[85px]">
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

            {/* Client Approval Flow */}
            <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-6">
                <Building2 className="w-5 h-5 text-slate-500" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Client Approval Flow</h3>
              </div>
              <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
                {[
                  { step: "1", label: "Review Details" },
                  { step: "2", label: "Verify Documents" },
                  { step: "3", label: "Approve/Reject" },
                  { step: "4", label: "Update Status" },
                  { step: "5", label: "Email Client" }
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

            {/* Services Grid */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Services Architecture</h2>
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
                            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tables</h4>
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboardBackend;
