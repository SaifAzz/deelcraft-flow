import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  DollarSign,
  Shield,
  BarChart3,
  Globe,
  ScrollText,
  Settings,
  Bell,
  Menu,
  X,
  Moon,
  Sun,
  ChevronDown,
  HelpCircle,
  TrendingUp,
  Users,
  User,
  CheckCircle,
  Clock,
  AlertTriangle,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Calendar,
  Wallet,
  FileCheck,
  ArrowRight,
  Upload,
  AlertCircle,
  Building2,
  UserCog,
  Activity,
  Zap,
  Server,
  Database,
  Link,
  MapPin,
  UserPlus,
  CreditCard,
} from "lucide-react";
import { useTheme } from "@/shared/hooks/use-theme";
import { useToast } from "@/shared/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Progress } from "@/shared/components/ui/progress";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { MindLinksLogo } from "@/shared/components/MindLinksLogo";
import {
  mockPendingDocuments,
  mockAuditLogs,
  mockCountryRules,
  mockPlatformAnalytics,
  mockContractorBalances,
  mockAdminUsers,
  mockSystemAlerts,
  mockAdminPayrollRuns,
  mockContractors,
  mockContracts,
  mockClientProfiles,
  type PendingDocument,
  type AuditLog,
  type CountryRule,
  type ContractorBalance,
  type AdminUser,
  type SystemAlert,
  type PayrollRunWithClient,
  type Contract,
  type ClientProfile,
} from "@/dashboards/admin/data/adminData";

type Page = "dashboard" | "clients" | "documents" | "contracts" | "payroll" | "compliance" | "analytics" | "countries" | "audit" | "settings";

// Notification interface
interface AdminNotification {
  id: string;
  type: "client_registration" | "contractor_registration" | "payment_ready";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  entityId?: string;
  entityName?: string;
  actionUrl?: string;
}

// Animated Number Counter Component
const AnimatedNumber = ({ value }: { value: number }) => {
  return <span>{value}</span>;
};

// Animated Currency Counter
const AnimatedCurrency = ({ value }: { value: string }) => {
  return <span>{value}</span>;
};

const AdminDashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Mock data state
  const [pendingDocs, setPendingDocs] = useState<PendingDocument[]>(mockPendingDocuments);
  const [auditLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [countryRules, setCountryRules] = useState(mockCountryRules);
  const [contractorBalances] = useState<ContractorBalance[]>(mockContractorBalances);
  const [payrollRuns] = useState<PayrollRunWithClient[]>(mockAdminPayrollRuns);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);

  // Generate notifications from mock data
  React.useEffect(() => {
    const newNotifications: AdminNotification[] = [];

    // Clients being registered (pending_review status)
    const pendingClients = mockClientProfiles.filter(c => c.status === "pending_review");
    pendingClients.forEach((client, index) => {
      newNotifications.push({
        id: `client-reg-${client.id}`,
        type: "client_registration",
        title: "New Client Registration",
        message: `${client.companyName} is waiting for review and approval.`,
        timestamp: new Date(client.registrationDate).toISOString(),
        read: false,
        entityId: client.id,
        entityName: client.companyName,
        actionUrl: "/clients",
      });
    });

    // Contractors being registered (recently joined)
    const recentContractors = mockContractors
      .filter(c => {
        const joinDate = new Date(c.joinedDate);
        const daysSinceJoin = (Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceJoin <= 7; // Show contractors joined in last 7 days
      })
      .slice(0, 5); // Limit to 5 most recent
    recentContractors.forEach((contractor) => {
      newNotifications.push({
        id: `contractor-reg-${contractor.id}`,
        type: "contractor_registration",
        title: "New Contractor Registered",
        message: `${contractor.name} from ${contractor.country} has joined the platform.`,
        timestamp: new Date(contractor.joinedDate).toISOString(),
        read: false,
        entityId: contractor.id,
        entityName: contractor.name,
        actionUrl: "/compliance",
      });
    });

    // Payments ready (payroll runs in draft or approved status)
    const readyPayments = payrollRuns.filter(pr => pr.status === "draft" || pr.status === "approved");
    readyPayments.forEach((payroll) => {
      newNotifications.push({
        id: `payment-ready-${payroll.id}`,
        type: "payment_ready",
        title: "Payment Ready for Processing",
        message: `Payroll run for ${payroll.clientName} (${payroll.period}) - $${payroll.totalAmount.toLocaleString()} ready to process.`,
        timestamp: new Date(payroll.createdAt).toISOString(),
        read: false,
        entityId: payroll.id,
        entityName: payroll.clientName,
        actionUrl: "/payroll",
      });
    });

    // Sort by timestamp (newest first)
    newNotifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setNotifications(newNotifications);
  }, [payrollRuns]);

  const navigation = [
    { id: "dashboard" as Page, name: "Dashboard", icon: LayoutDashboard },
    { id: "clients" as Page, name: "Clients", icon: Building2 },
    { id: "documents" as Page, name: "Documents", icon: FileText },
    { id: "contracts" as Page, name: "Contracts", icon: FileCheck },
    { id: "payroll" as Page, name: "Payroll", icon: DollarSign },
    { id: "compliance" as Page, name: "Compliance", icon: Shield },
    { id: "analytics" as Page, name: "Analytics", icon: BarChart3 },
    { id: "countries" as Page, name: "Countries", icon: Globe },
    { id: "audit" as Page, name: "Audit Logs", icon: ScrollText },
    { id: "settings" as Page, name: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="border-b border-slate-200/30 bg-gradient-to-r from-background/10 via-background/5 to-background/10 backdrop-blur-xl supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-background/8 supports-[backdrop-filter]:via-background/3 supports-[backdrop-filter]:to-background/8 sticky top-0 z-50"
        style={{
          boxShadow: `
            0 20px 40px -10px rgba(71, 85, 105, 0.15),
            0 10px 30px -5px rgba(51, 65, 85, 0.1),
            0 4px 20px -2px rgba(30, 41, 59, 0.08),
            0 0 0 1px rgba(71, 85, 105, 0.08),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1)
          `
        }}
      >
        <div className="flex h-16 items-center px-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center mr-8 flex-shrink-0"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MindLinksLogo size="md" />
            </motion.div>
          </motion.div>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 overflow-x-auto scrollbar-hide">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActivePage(item.id)}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0 ${isActive
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-500 rounded-lg shadow-sm"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </span>
                </motion.button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-2 flex-shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          <div className="flex-1 lg:flex-none" />

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setHelpOpen(true)}
                title="Help & Instructions"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative"
                title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              >
                <AnimatePresence mode="wait">
                  {theme === "light" ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
            <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
              <PopoverTrigger asChild>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute top-1 right-1 h-5 w-5 rounded-full bg-blue-500 border-2 border-background flex items-center justify-center text-[10px] font-bold text-white">
                        {notifications.filter(n => !n.read).length > 9 ? '9+' : notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </Button>
                </motion.div>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-semibold text-lg">Notifications</h3>
                  {notifications.filter(n => !n.read).length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setNotifications(notifications.map(n => ({ ...n, read: true })));
                      }}
                      className="text-xs"
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>
                <div className="max-h-[500px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No notifications</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {notifications.map((notification) => {
                        const Icon = notification.type === "client_registration" ? Building2
                          : notification.type === "contractor_registration" ? UserPlus
                            : CreditCard;
                        const color = notification.type === "client_registration" ? "text-slate-700"
                          : notification.type === "contractor_registration" ? "text-emerald-700"
                            : "text-amber-700";
                        const bgColor = notification.type === "client_registration" ? "bg-slate-50"
                          : notification.type === "contractor_registration" ? "bg-emerald-50"
                            : "bg-amber-50";

                        return (
                          <div
                            key={notification.id}
                            className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${!notification.read ? bgColor : ""}`}
                            onClick={() => {
                              setNotifications(notifications.map(n =>
                                n.id === notification.id ? { ...n, read: true } : n
                              ));
                              if (notification.actionUrl) {
                                setActivePage(notification.actionUrl.split("/")[1] as Page || "dashboard");
                                setNotificationOpen(false);
                              }
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${bgColor}`}>
                                <Icon className={`h-4 w-4 ${color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <p className={`text-sm font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                                    {notification.title}
                                  </p>
                                  {!notification.read && (
                                    <span className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">
                                  {new Date(notification.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="p-3 border-t text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setActivePage("dashboard");
                        setNotificationOpen(false);
                      }}
                      className="text-xs"
                    >
                      View all notifications
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
            <div className="flex items-center gap-3 pl-3 border-l border-border/40">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-primary/10 hover:ring-primary/30 transition-all">
                  <AvatarFallback className="bg-gradient-to-br from-slate-600 to-slate-700 text-white font-medium text-xs">
                    SA
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium leading-none">Sarah Admin</p>
                <p className="text-xs text-muted-foreground">admin@mindlinks.com</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-border bg-background"
            >
              <nav className="px-4 py-3 space-y-1">
                {navigation.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        setActivePage(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="bg-muted/30 min-h-[calc(100vh-4rem)]">
        <div className="p-6 max-w-[1600px] mx-auto">
          <AnimatePresence mode="wait">
            {activePage === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DashboardOverview setActivePage={setActivePage} />
              </motion.div>
            )}
            {activePage === "clients" && (
              <motion.div
                key="clients"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ClientsManagement toast={toast} />
              </motion.div>
            )}
            {activePage === "documents" && (
              <motion.div
                key="documents"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DocumentReviewQueue
                  pendingDocs={pendingDocs}
                  setPendingDocs={setPendingDocs}
                  toast={toast}
                />
              </motion.div>
            )}
            {activePage === "contracts" && (
              <motion.div
                key="contracts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ContractsManagement toast={toast} />
              </motion.div>
            )}
            {activePage === "payroll" && (
              <motion.div
                key="payroll"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <PayrollMonitoring
                  payrollRuns={payrollRuns}
                  contractorBalances={contractorBalances}
                />
              </motion.div>
            )}
            {activePage === "compliance" && (
              <motion.div
                key="compliance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ComplianceMonitoring />
              </motion.div>
            )}
            {activePage === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AnalyticsDashboard />
              </motion.div>
            )}
            {activePage === "countries" && (
              <motion.div
                key="countries"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CountryRulesManagement
                  countryRules={countryRules}
                  setCountryRules={setCountryRules}
                  toast={toast}
                />
              </motion.div>
            )}
            {activePage === "audit" && (
              <motion.div
                key="audit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AuditLogs auditLogs={auditLogs} />
              </motion.div>
            )}
            {activePage === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AdminSettings />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

// ==================== CLIENTS MANAGEMENT ====================
const ClientsManagement = ({ toast }: { toast: any }) => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "pending_review" | "suspended">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredClients = mockClientProfiles.filter(client => {
    const matchesStatus = filterStatus === "all" || client.status === filterStatus;
    const matchesSearch = searchQuery === "" ||
      client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.pointOfContact.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Search and Filter Section */}
      <div className="flex items-center justify-end gap-3 mb-8">
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)}>
          <SelectTrigger className="w-[180px] h-10 border border-border/30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clients</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending_review">Pending Review</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <Card className="border border-border/30 shadow-sm bg-gradient-to-br from-slate-50/50 to-slate-50/20 hover:shadow-md transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Total Clients</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform border border-slate-200/50">
              <Building2 className="h-5 w-5 text-slate-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-1">{mockClientProfiles.length}</div>
            <p className="text-xs font-medium text-muted-foreground">Registered companies</p>
          </CardContent>
        </Card>
        <Card className="border border-border/30 shadow-sm bg-gradient-to-br from-emerald-50/50 to-emerald-50/20 hover:shadow-md transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Clients</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform border border-emerald-200/50">
              <CheckCircle className="h-5 w-5 text-emerald-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-1">
              {mockClientProfiles.filter(c => c.status === "active").length}
            </div>
            <p className="text-xs font-medium text-muted-foreground">Verified & active</p>
          </CardContent>
        </Card>
        <Card className="border border-border/30 shadow-sm bg-gradient-to-br from-amber-50/50 to-amber-50/20 hover:shadow-md transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Pending Review</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform border border-amber-200/50">
              <Clock className="h-5 w-5 text-amber-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-1">
              {mockClientProfiles.filter(c => c.status === "pending_review").length}
            </div>
            <p className="text-xs font-medium text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card className="border border-border/30 shadow-sm bg-gradient-to-br from-slate-50/50 to-slate-50/20 hover:shadow-md transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Total Contractors</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform border border-slate-200/50">
              <Users className="h-5 w-5 text-slate-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-1">
              {mockClientProfiles.reduce((sum, c) => sum + c.totalContractors, 0)}
            </div>
            <p className="text-xs font-medium text-muted-foreground">Across all clients</p>
          </CardContent>
        </Card>
      </div>

      {/* Clients Table */}
      <Card className="border border-border/30 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-semibold">Company</TableHead>
                  <TableHead className="font-semibold">Industry</TableHead>
                  <TableHead className="font-semibold">Country</TableHead>
                  <TableHead className="font-semibold">Contact</TableHead>
                  <TableHead className="font-semibold text-right">Monthly Spend</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center py-8">
                        <Building2 className="h-12 w-12 text-muted-foreground/30 mb-3" />
                        <h3 className="text-sm font-semibold text-foreground mb-1">No clients found</h3>
                        <p className="text-xs text-muted-foreground">Try adjusting your search or filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedClients.map((client) => (
                    <TableRow key={client.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-sm font-bold text-slate-700">
                              {client.companyName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            {client.verificationStatus === "verified" && (
                              <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center">
                                <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-foreground truncate">{client.companyName}</p>
                            <div className="flex gap-1.5 mt-1">
                              {client.status === "active" && (
                                <Badge className="text-[10px] px-1.5 py-0 h-4 bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100">
                                  Active
                                </Badge>
                              )}
                              {client.status === "pending_review" && (
                                <Badge className="text-[10px] px-1.5 py-0 h-4 bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100">
                                  Pending Review
                                </Badge>
                              )}
                              {client.status === "suspended" && (
                                <Badge className="text-[10px] px-1.5 py-0 h-4 bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100">
                                  Suspended
                                </Badge>
                              )}
                              {client.verificationStatus === "verified" && (
                                <Badge className="text-[10px] px-1.5 py-0 h-4 bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-100">
                                  Verified
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-foreground">{client.industry}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm text-foreground">{client.country}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {client.pointOfContact.firstName} {client.pointOfContact.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {client.pointOfContact.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-sm font-semibold text-emerald-700">
                          ${(client.monthlySpend / 1000).toFixed(1)}k
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-slate-100"
                          onClick={() => navigate(`/admin/client/${client.id}`)}
                        >
                          View Details
                          <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        {/* Pagination */}
        {filteredClients.length > 0 && (
          <div className="border-t border-border/30 px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{startIndex + 1}</span> to{' '}
              <span className="font-medium text-foreground">{Math.min(endIndex, filteredClients.length)}</span> of{' '}
              <span className="font-medium text-foreground">{filteredClients.length}</span> clients
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8"
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="h-8 w-8 p-0"
                      >
                        {page}
                      </Button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="text-muted-foreground px-1">...</span>;
                  }
                  return null;
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-8"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

// ==================== ANALYTICS GRAPHS ====================
const AnalyticsGraphs = () => {
  // Revenue data for the last 6 months
  const revenueData = [
    { month: "Jul", revenue: 85000, contractors: 180, clients: 35 },
    { month: "Aug", revenue: 92000, contractors: 195, clients: 38 },
    { month: "Sep", revenue: 98000, contractors: 210, clients: 40 },
    { month: "Oct", revenue: 105000, contractors: 225, clients: 42 },
    { month: "Nov", revenue: 118000, contractors: 245, clients: 44 },
    { month: "Dec", revenue: 125000, contractors: 275, clients: 45 },
  ];

  // Contract completion rates - Sophisticated color palette
  const contractData = [
    { status: "Completed", count: 145, fill: "#059669" },     // Deep emerald
    { status: "In Progress", count: 89, fill: "#6366f1" },    // Refined indigo
    { status: "Pending", count: 34, fill: "#d97706" },        // Warm amber
    { status: "Cancelled", count: 12, fill: "#dc2626" },      // Elegant red
  ];

  // Payment processing trends
  const paymentData = [
    { week: "Week 1", processed: 45, pending: 12, failed: 2 },
    { week: "Week 2", processed: 52, pending: 8, failed: 1 },
    { week: "Week 3", processed: 48, pending: 15, failed: 3 },
    { week: "Week 4", processed: 58, pending: 10, failed: 2 },
  ];

  // Document review metrics
  const documentData = [
    { day: "Mon", approved: 24, rejected: 3, pending: 8 },
    { day: "Tue", approved: 28, rejected: 2, pending: 12 },
    { day: "Wed", approved: 31, rejected: 4, pending: 6 },
    { day: "Thu", approved: 26, rejected: 1, pending: 15 },
    { day: "Fri", approved: 35, rejected: 5, pending: 10 },
    { day: "Sat", approved: 18, rejected: 2, pending: 7 },
    { day: "Sun", approved: 15, rejected: 1, pending: 9 },
  ];

  const chartConfig = {
    revenue: { label: "Revenue", color: "#3b82f6" },
    contractors: { label: "Contractors", color: "#10b981" },
    clients: { label: "Clients", color: "#8b5cf6" },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Document Review Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-amber-700" />
            Document Review Activity
          </CardTitle>
          <CardDescription>Daily document processing metrics for the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={documentData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
              <XAxis dataKey="day" className="text-xs" stroke="#64748b" />
              <YAxis className="text-xs" stroke="#64748b" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="approved" fill="#059669" radius={[6, 6, 0, 0]} />
              <Bar dataKey="rejected" fill="#dc2626" radius={[6, 6, 0, 0]} />
              <Bar dataKey="pending" fill="#d97706" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Contract Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-indigo-600" />
            Contract Status Distribution
          </CardTitle>
          <CardDescription>Breakdown of contract statuses across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={contractData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
              <XAxis dataKey="status" className="text-xs" stroke="#64748b" />
              <YAxis className="text-xs" stroke="#64748b" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {contractData.map((entry, index) => (
                  <Bar key={`cell-${index}`} dataKey="count" fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Payment Processing Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-emerald-700" />
            Payment Processing Trends
          </CardTitle>
          <CardDescription>Weekly payment status breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart data={paymentData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
              <XAxis dataKey="week" className="text-xs" stroke="#64748b" />
              <YAxis className="text-xs" stroke="#64748b" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="processed"
                stroke="#059669"
                strokeWidth={2.5}
                dot={{ fill: "#059669", r: 5, strokeWidth: 2, stroke: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="pending"
                stroke="#d97706"
                strokeWidth={2.5}
                dot={{ fill: "#d97706", r: 5, strokeWidth: 2, stroke: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="failed"
                stroke="#dc2626"
                strokeWidth={2.5}
                dot={{ fill: "#dc2626", r: 5, strokeWidth: 2, stroke: "#fff" }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Revenue Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            Revenue & Growth Trends
          </CardTitle>
          <CardDescription>Monthly revenue with user growth over 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
              <XAxis dataKey="month" className="text-xs" stroke="#64748b" />
              <YAxis className="text-xs" stroke="#64748b" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={3}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

// ==================== DASHBOARD OVERVIEW ====================
const DashboardOverview = ({ setActivePage }: { setActivePage: (page: Page) => void }) => {
  const analytics = mockPlatformAnalytics;
  const alerts = mockSystemAlerts.filter(a => !a.resolved);

  // Helper function to check if a date is within N days
  const isWithinDays = (dateStr: string, days: number) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= days;
  };

  // Helper function to check if probation period is complete (90 days)
  const isProbationComplete = (joinedDate: string) => {
    const joined = new Date(joinedDate);
    const today = new Date();
    const diffTime = today.getTime() - joined.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 90 && diffDays <= 100; // Show alert for 10 days window after probation ends
  };

  // Get contracts expiring in next 30 days
  const expiringContracts = mockContracts.filter(c =>
    c.status === "active" && c.endDate && isWithinDays(c.endDate, 30)
  );

  // Get contractors who completed probation period
  const completedProbation = mockContractors.filter(c =>
    c.complianceStatus === "approved" && isProbationComplete(c.joinedDate)
  );

  // Get contractor-related actions
  const contractorActions = [
    ...mockPendingDocuments.filter(doc => doc.priority === "high").slice(0, 3).map(doc => ({
      id: doc.id,
      type: "document_review" as const,
      title: `${doc.documentType} - ${doc.contractorName}`,
      description: `Pending review from ${doc.clientName}`,
      priority: doc.priority,
      timestamp: doc.uploadedDate,
    })),
    ...mockContractors.filter(c => c.complianceStatus === "incomplete").slice(0, 2).map(c => ({
      id: c.id,
      type: "onboarding" as const,
      title: `${c.name} - Compliance`,
      description: `${c.missingDocs} documents missing for ${c.country}`,
      priority: c.missingDocs > 2 ? "high" as const : "normal" as const,
      timestamp: c.joinedDate,
    })),
    ...mockContracts.filter(c => c.status === "draft").slice(0, 2).map(c => ({
      id: c.id,
      type: "contract" as const,
      title: `Contract - ${c.contractorName}`,
      description: `Awaiting signature`,
      priority: "normal" as const,
      timestamp: c.startDate,
    })),
    ...expiringContracts.map(c => ({
      id: `exp-${c.id}`,
      type: "contract_expiring" as const,
      title: `Contract Expiring - ${c.contractorName}`,
      description: `Contract ends on ${new Date(c.endDate!).toLocaleDateString()}`,
      priority: isWithinDays(c.endDate!, 7) ? "high" as const : "normal" as const,
      timestamp: c.endDate!,
    })),
    ...completedProbation.map(c => ({
      id: `prob-${c.id}`,
      type: "probation_complete" as const,
      title: `${c.name} - Probation Complete`,
      description: `Review performance and confirm permanent status`,
      priority: "normal" as const,
      timestamp: c.joinedDate,
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Side (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Analytics Graphs */}
          <AnalyticsGraphs />
        </div>

        {/* Right Sidebar - Alerts Section (1/3 width) */}
        <div className="lg:col-span-1 space-y-4">
          {/* System Alerts Card */}
          <Card className="border-2 border-amber-200/50 bg-gradient-to-b from-amber-50/30 to-background">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  System Alerts
                </CardTitle>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-300">
                  {alerts.length}
                </Badge>
              </div>
              <CardDescription className="text-xs">Critical system notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[300px] overflow-y-auto">
              {alerts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                  <p className="text-sm">All clear! No active alerts</p>
                </div>
              ) : (
                alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-3 rounded-lg border text-sm ${alert.type === "error"
                      ? "bg-red-50/50 border-red-200/50"
                      : alert.type === "warning"
                        ? "bg-amber-50/50 border-amber-200/50"
                        : "bg-blue-50/50 border-blue-200/50"
                      }`}
                  >
                    <div className="flex items-start gap-2">
                      {alert.type === "error" && <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />}
                      {alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />}
                      {alert.type === "info" && <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs">{alert.title}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{alert.message}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Contractor Actions Card */}
          <Card className="border-2 border-blue-200/50 bg-gradient-to-b from-blue-50/30 to-background">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <UserCog className="h-5 w-5 text-blue-600" />
                  Contractor Actions
                </CardTitle>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-300">
                  {contractorActions.length}
                </Badge>
              </div>
              <CardDescription className="text-xs">Pending contractor activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[500px] overflow-y-auto">
              {contractorActions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                  <p className="text-sm">No pending actions</p>
                </div>
              ) : (
                contractorActions.map((action) => (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 rounded-lg border bg-background hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 flex-shrink-0">
                        {action.type === "document_review" && (
                          <FileText className="h-4 w-4 text-orange-600" />
                        )}
                        {action.type === "onboarding" && (
                          <UserPlus className="h-4 w-4 text-blue-600" />
                        )}
                        {action.type === "contract" && (
                          <FileCheck className="h-4 w-4 text-purple-600" />
                        )}
                        {action.type === "contract_expiring" && (
                          <Clock className="h-4 w-4 text-amber-600" />
                        )}
                        {action.type === "probation_complete" && (
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-xs line-clamp-1">{action.title}</p>
                          {action.priority === "high" && (
                            <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">
                              HIGH
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {action.description}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {new Date(action.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Quick Stats Card - Collapsible */}
          <Card className="border-2 border-emerald-200/50 bg-gradient-to-b from-emerald-50/30 to-background">
            <Accordion type="single" collapsible defaultValue="stats">
              <AccordionItem value="stats" className="border-none">
                <AccordionTrigger className="px-6 pt-6 pb-3 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-emerald-600" />
                    <span className="text-base font-semibold">Quick Stats</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-3 pt-2">
                    <button
                      onClick={() => setActivePage("compliance")}
                      className="w-full flex items-center justify-between p-2 rounded-lg bg-background border hover:bg-muted/50 hover:border-blue-300 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-medium">Active Contractors</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {mockContractors.filter(c => c.complianceStatus === "approved").length}
                        </Badge>
                        <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>

                    <button
                      onClick={() => setActivePage("contracts")}
                      className="w-full flex items-center justify-between p-2 rounded-lg bg-background border hover:bg-muted/50 hover:border-purple-300 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-purple-600 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-medium">Active Contracts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {mockContracts.filter(c => c.status === "active").length}
                        </Badge>
                        <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>

                    <button
                      onClick={() => setActivePage("compliance")}
                      className="w-full flex items-center justify-between p-2 rounded-lg bg-background border hover:bg-muted/50 hover:border-orange-300 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-600 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-medium">Incomplete Compliance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {mockContractors.filter(c => c.complianceStatus === "incomplete").length}
                        </Badge>
                        <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>

                    <button
                      onClick={() => setActivePage("documents")}
                      className="w-full flex items-center justify-between p-2 rounded-lg bg-background border hover:bg-muted/50 hover:border-red-300 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-600 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-medium">High Priority Docs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {mockPendingDocuments.filter(d => d.priority === "high").length}
                        </Badge>
                        <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>

                    <button
                      onClick={() => setActivePage("contracts")}
                      className="w-full flex items-center justify-between p-2 rounded-lg bg-background border hover:bg-muted/50 hover:border-amber-300 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-medium">Expiring Contracts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {expiringContracts.length}
                        </Badge>
                        <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>

                    <button
                      onClick={() => setActivePage("compliance")}
                      className="w-full flex items-center justify-between p-2 rounded-lg bg-background border hover:bg-muted/50 hover:border-emerald-300 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-medium">Probation Complete</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {completedProbation.length}
                        </Badge>
                        <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

// ==================== CONTRACTS MANAGEMENT ====================
const ContractsManagement = ({ toast }: { toast: any }) => {
  const [viewMode, setViewMode] = useState<"all" | "by-client" | "by-contractor">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "draft" | "completed">("all");
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // For this POC, we'll assign mock clients to contracts
  const contractsWithClients = mockContracts.map(contract => ({
    ...contract,
    clientName: contract.contractorName.includes("Ahmed") || contract.contractorName.includes("Layla")
      ? "TechWave LLC"
      : contract.contractorName.includes("Sara")
        ? "Global Innovations Inc"
        : contract.contractorName.includes("Mohammed")
          ? "Digital Solutions Ltd"
          : "StartupHub Co",
    clientId: "client1",
  }));

  const filteredContracts = contractsWithClients
    .filter(c => filterStatus === "all" || c.status === filterStatus)
    .filter(c =>
      searchQuery === "" ||
      c.contractorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const totalItems = filteredContracts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedContracts = filteredContracts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Group by client
  const contractsByClient = filteredContracts.reduce((acc, contract) => {
    if (!acc[contract.clientName]) {
      acc[contract.clientName] = [];
    }
    acc[contract.clientName].push(contract);
    return acc;
  }, {} as Record<string, typeof contractsWithClients>);

  // Group by contractor
  const contractsByContractor = filteredContracts.reduce((acc, contract) => {
    if (!acc[contract.contractorName]) {
      acc[contract.contractorName] = {
        contractorId: contract.contractorId,
        contracts: []
      };
    }
    acc[contract.contractorName].contracts.push(contract);
    return acc;
  }, {} as Record<string, { contractorId: string; contracts: typeof contractsWithClients }>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-end mb-8">
        <div className="flex gap-3">
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search contracts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 h-10"
            />
          </div>
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="w-auto">
            <TabsList>
              <TabsTrigger value="all">All Contracts</TabsTrigger>
              <TabsTrigger value="by-client">By Client</TabsTrigger>
              <TabsTrigger value="by-contractor">By Contractor</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select value={filterStatus} onValueChange={(v) => {
            setFilterStatus(v as any);
            setCurrentPage(1);
          }}>
            <SelectTrigger className="w-[150px] h-10 border border-border/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Contracts ({totalItems})</CardTitle>
          <CardDescription>COR (Contractor of Record) agreements managed by Mind Links</CardDescription>
        </CardHeader>
        <CardContent>
          {/* All Contracts View */}
          {viewMode === "all" && (
            <>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Contract ID</TableHead>
                      <TableHead className="font-semibold">Contractor</TableHead>
                      <TableHead className="font-semibold">Client (COR)</TableHead>
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="font-semibold">Amount</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Duration</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedContracts.map((contract) => (
                      <TableRow key={contract.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-mono text-sm">{contract.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-muted text-xs">
                                {contract.contractorName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-sm">{contract.contractorName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-primary" />
                            <span className="text-sm">{contract.clientName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">{contract.type}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {contract.type === "fixed"
                            ? `${contract.currency} ${contract.amount.toLocaleString()}`
                            : `${contract.currency} ${contract.hourlyRate}/hr`
                          }
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              contract.status === "active"
                                ? "default"
                                : contract.status === "completed"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="capitalize"
                          >
                            {contract.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(contract.startDate).toLocaleDateString()}
                          {contract.endDate && ` - ${new Date(contract.endDate).toLocaleDateString()}`}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedContract(contract);
                              setDetailsOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {paginatedContracts.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          No contracts found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} contracts
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="min-w-[40px]"
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* By Client View */}
          {viewMode === "by-client" && (
            <div className="space-y-4">
              {Object.entries(contractsByClient).map(([clientName, contracts]) => (
                <Card key={clientName} className="border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{clientName}</CardTitle>
                          <CardDescription>Client of Record (COR) via Mind Links</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-primary">{contracts.length} contract{contracts.length !== 1 ? 's' : ''}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {contracts.map((contract) => (
                        <div
                          key={contract.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-muted">
                                {contract.contractorName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-semibold text-sm">{contract.contractorName}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-muted-foreground font-mono">{contract.id}</span>
                                <Badge variant="outline" className="text-xs capitalize">{contract.type}</Badge>
                                <span className="text-xs font-semibold">
                                  {contract.type === "fixed"
                                    ? `${contract.currency} ${contract.amount.toLocaleString()}`
                                    : `${contract.currency} ${contract.hourlyRate}/hr`
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={contract.status === "active" ? "default" : "secondary"} className="capitalize">
                              {contract.status}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedContract(contract);
                                setDetailsOpen(true);
                              }}
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {Object.keys(contractsByClient).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <FileCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No contracts found</p>
                </div>
              )}
            </div>
          )}

          {/* By Contractor View */}
          {viewMode === "by-contractor" && (
            <div className="space-y-4">
              {Object.entries(contractsByContractor).map(([contractorName, data]) => (
                <Card key={contractorName} className="border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                            {contractorName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{contractorName}</CardTitle>
                          <CardDescription>Mind Links Contractor</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-primary">{data.contracts.length} contract{data.contracts.length !== 1 ? 's' : ''}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {data.contracts.map((contract) => (
                        <div
                          key={contract.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <FileCheck className="h-8 w-8 text-primary" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-sm">{contract.id}</p>
                                <Badge variant="outline" className="text-xs capitalize">{contract.type}</Badge>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Building2 className="h-3 w-3" />
                                  {contract.clientName}
                                </span>
                                <span className="text-xs font-semibold">
                                  {contract.type === "fixed"
                                    ? `${contract.currency} ${contract.amount.toLocaleString()}`
                                    : `${contract.currency} ${contract.hourlyRate}/hr`
                                  }
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(contract.startDate).toLocaleDateString()}
                                  {contract.endDate && ` - ${new Date(contract.endDate).toLocaleDateString()}`}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={contract.status === "active" ? "default" : "secondary"} className="capitalize">
                              {contract.status}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedContract(contract);
                                setDetailsOpen(true);
                              }}
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {Object.keys(contractsByContractor).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No contracts found</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contract Details Modal */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contract Details</DialogTitle>
            <DialogDescription>
              {selectedContract && `${selectedContract.id} - ${selectedContract.contractorName}`}
            </DialogDescription>
          </DialogHeader>
          {selectedContract && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Contractor</Label>
                  <p className="font-semibold">{selectedContract.contractorName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Client (COR)</Label>
                  <p className="font-semibold">{(selectedContract as any).clientName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Contract Type</Label>
                  <p className="font-semibold capitalize">{selectedContract.type}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <Badge variant={selectedContract.status === "active" ? "default" : "secondary"} className="capitalize">
                    {selectedContract.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Amount</Label>
                  <p className="font-semibold">
                    {selectedContract.type === "fixed"
                      ? `${selectedContract.currency} ${selectedContract.amount.toLocaleString()}`
                      : `${selectedContract.currency} ${selectedContract.hourlyRate}/hr`
                    }
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Duration</Label>
                  <p className="font-semibold text-sm">
                    {new Date(selectedContract.startDate).toLocaleDateString()}
                    {selectedContract.endDate && ` - ${new Date(selectedContract.endDate).toLocaleDateString()}`}
                  </p>
                </div>
              </div>

              {selectedContract.milestones && selectedContract.milestones.length > 0 && (
                <div>
                  <Label className="text-sm font-semibold mb-3 block">Milestones</Label>
                  <div className="space-y-2">
                    {selectedContract.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{milestone.title}</p>
                          <p className="text-xs text-muted-foreground">
                            Due: {new Date(milestone.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-sm">
                            {selectedContract.currency} {milestone.amount.toLocaleString()}
                          </span>
                          <Badge
                            variant={
                              milestone.status === "completed"
                                ? "default"
                                : milestone.status === "pending"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="capitalize"
                          >
                            {milestone.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedContract.progress !== undefined && (
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Progress</Label>
                  <div className="space-y-2">
                    <Progress value={selectedContract.progress} className="h-2" />
                    <p className="text-sm text-muted-foreground">{selectedContract.progress}% complete</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

// ==================== DOCUMENT REVIEW QUEUE ====================
const DocumentReviewQueue = ({
  pendingDocs,
  setPendingDocs,
  toast,
}: {
  pendingDocs: PendingDocument[];
  setPendingDocs: React.Dispatch<React.SetStateAction<PendingDocument[]>>;
  toast: any;
}) => {
  const [selectedDoc, setSelectedDoc] = useState<PendingDocument | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "by-client" | "by-contractor">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleApprove = (docId: string) => {
    setPendingDocs(pendingDocs.filter(d => d.id !== docId));
    toast({
      title: "Document Approved",
      description: "Contractor has been notified via email.",
    });
    setReviewModalOpen(false);
  };

  const handleReject = (docId: string) => {
    if (!rejectReason.trim()) {
      toast({
        title: "Rejection Reason Required",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      });
      return;
    }
    setPendingDocs(pendingDocs.filter(d => d.id !== docId));
    toast({
      title: "Document Rejected",
      description: "Contractor has been notified with the rejection reason.",
      variant: "destructive",
    });
    setReviewModalOpen(false);
    setRejectReason("");
  };

  const filteredDocs = pendingDocs
    .filter(d => filterPriority === "all" || d.priority === filterPriority)
    .filter(d =>
      searchQuery === "" ||
      d.contractorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.documentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.contractorEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const totalItems = filteredDocs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedDocs = filteredDocs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Group documents by client
  const docsByClient = filteredDocs.reduce((acc, doc) => {
    if (!acc[doc.clientName]) {
      acc[doc.clientName] = [];
    }
    acc[doc.clientName].push(doc);
    return acc;
  }, {} as Record<string, PendingDocument[]>);

  // Group documents by contractor
  const docsByContractor = filteredDocs.reduce((acc, doc) => {
    if (!acc[doc.contractorName]) {
      acc[doc.contractorName] = {
        email: doc.contractorEmail,
        docs: []
      };
    }
    acc[doc.contractorName].docs.push(doc);
    return acc;
  }, {} as Record<string, { email: string; docs: PendingDocument[] }>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-end mb-8">
        <div className="flex gap-3">
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 h-10"
            />
          </div>
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="w-auto">
            <TabsList>
              <TabsTrigger value="list">All Documents</TabsTrigger>
              <TabsTrigger value="by-client">By Client</TabsTrigger>
              <TabsTrigger value="by-contractor">By Contractor</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select value={filterPriority} onValueChange={(v) => {
            setFilterPriority(v);
            setCurrentPage(1);
          }}>
            <SelectTrigger className="w-[150px] h-10 border border-border/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Documents ({totalItems})</CardTitle>
          <CardDescription>Review and approve KYC documents for clients and contractors</CardDescription>
        </CardHeader>
        <CardContent>
          {/* All Documents View */}
          {viewMode === "list" && (
            <>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Contractor</TableHead>
                      <TableHead className="font-semibold">Client</TableHead>
                      <TableHead className="font-semibold">Document Type</TableHead>
                      <TableHead className="font-semibold">Uploaded</TableHead>
                      <TableHead className="font-semibold">Priority</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedDocs.map((doc) => (
                      <TableRow key={doc.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{doc.contractorName}</p>
                            <p className="text-xs text-muted-foreground">{doc.contractorEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{doc.clientName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{doc.documentType}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(doc.uploadedDate).toLocaleDateString()}
                          <span className="text-xs text-muted-foreground block">{doc.daysOld} days ago</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={doc.priority === "high" ? "destructive" : "secondary"}>
                            {doc.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedDoc(doc);
                              setReviewModalOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {paginatedDocs.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No pending documents to review
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} documents
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="min-w-[40px]"
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* By Client View */}
          {viewMode === "by-client" && (
            <div className="space-y-4">
              {Object.entries(docsByClient).map(([clientName, docs]) => (
                <Card key={clientName} className="border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-primary" />
                        <div>
                          <CardTitle className="text-lg">{clientName}</CardTitle>
                          <CardDescription>{docs.length} pending document{docs.length !== 1 ? 's' : ''}</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-primary">{docs.length}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {docs.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-muted text-sm">
                                {doc.contractorName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm">{doc.contractorName}</p>
                              <p className="text-xs text-muted-foreground">{doc.contractorEmail}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">{doc.documentType}</Badge>
                                <span className="text-xs text-muted-foreground">{doc.daysOld} days ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={doc.priority === "high" ? "destructive" : "secondary"}>
                              {doc.priority}
                            </Badge>
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedDoc(doc);
                                setReviewModalOpen(true);
                              }}
                            >
                              Review
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {Object.keys(docsByClient).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No pending documents to review</p>
                </div>
              )}
            </div>
          )}

          {/* By Contractor View */}
          {viewMode === "by-contractor" && (
            <div className="space-y-4">
              {Object.entries(docsByContractor).map(([contractorName, data]) => (
                <Card key={contractorName} className="border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {contractorName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{contractorName}</CardTitle>
                          <CardDescription>{data.email}</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-primary">{data.docs.length} document{data.docs.length !== 1 ? 's' : ''}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {data.docs.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <FileCheck className="h-5 w-5 text-primary" />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{doc.documentType}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Building2 className="h-3 w-3" />
                                  {doc.clientName}
                                </span>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(doc.uploadedDate).toLocaleDateString()}
                                </span>
                                <span className="text-xs text-muted-foreground">{doc.daysOld} days ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={doc.priority === "high" ? "destructive" : "secondary"}>
                              {doc.priority}
                            </Badge>
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedDoc(doc);
                                setReviewModalOpen(true);
                              }}
                            >
                              Review
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {Object.keys(docsByContractor).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No pending documents to review</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Modal */}
      <Dialog open={reviewModalOpen} onOpenChange={setReviewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Document</DialogTitle>
            <DialogDescription>
              Approve or reject the submitted document
            </DialogDescription>
          </DialogHeader>
          {selectedDoc && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Document Preview</h3>
                  <div className="border rounded-lg p-8 bg-muted/30 flex items-center justify-center h-64">
                    <div className="text-center">
                      <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Document preview</p>
                      <p className="text-xs text-muted-foreground mt-1">{selectedDoc.documentType}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Contractor Information</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">Name</Label>
                      <p className="font-medium">{selectedDoc.contractorName}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Email</Label>
                      <p className="font-medium">{selectedDoc.contractorEmail}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Client</Label>
                      <p className="font-medium">{selectedDoc.clientName}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Document Type</Label>
                      <p className="font-medium">{selectedDoc.documentType}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Uploaded</Label>
                      <p className="font-medium">
                        {new Date(selectedDoc.uploadedDate).toLocaleDateString()} ({selectedDoc.daysOld} days ago)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Rejection Reason (required if rejecting)</Label>
                <Textarea
                  placeholder="Enter reason for rejection..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setReviewModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleReject(selectedDoc.id)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => handleApprove(selectedDoc.id)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

// ==================== PAYROLL MONITORING ====================
const PayrollMonitoring = ({
  payrollRuns,
  contractorBalances,
}: {
  payrollRuns: PayrollRunWithClient[];
  contractorBalances: ContractorBalance[];
}) => {
  const [selectedRun, setSelectedRun] = useState<PayrollRunWithClient | null>(null);
  const [viewBalances, setViewBalances] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPayrollRuns = payrollRuns.filter(run =>
    searchQuery === "" ||
    run.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    run.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
    run.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBalances = contractorBalances.filter(balance =>
    searchQuery === "" ||
    balance.contractorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    balance.contractorEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    balance.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = viewBalances ? filteredBalances.length : filteredPayrollRuns.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedPayrollRuns = filteredPayrollRuns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const paginatedBalances = filteredBalances.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-end mb-8">
        <div className="flex gap-3">
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search payroll..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 h-10"
            />
          </div>
          <Button
            variant={viewBalances ? "default" : "outline"}
            onClick={() => {
              setViewBalances(!viewBalances);
              setCurrentPage(1);
            }}
          >
            <Wallet className="h-4 w-4 mr-2" />
            {viewBalances ? "View Payroll Runs" : "View Balances"}
          </Button>
        </div>
      </div>

      {!viewBalances ? (
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">All Payroll Runs ({totalItems})</CardTitle>
            <CardDescription>View and monitor payroll across all clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Client</TableHead>
                    <TableHead className="font-semibold">Period</TableHead>
                    <TableHead className="font-semibold">Contractors</TableHead>
                    <TableHead className="font-semibold">Total Amount</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPayrollRuns.map((run) => (
                    <TableRow
                      key={run.id}
                      className="hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => setSelectedRun(run)}
                    >
                      <TableCell className="font-medium">{run.clientName}</TableCell>
                      <TableCell>{run.period}</TableCell>
                      <TableCell>{run.contractors}</TableCell>
                      <TableCell className="font-semibold">${run.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            run.status === "processed"
                              ? "bg-emerald-700"
                              : run.status === "approved"
                                ? "bg-slate-700"
                                : "bg-amber-700"
                          }
                        >
                          {run.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {run.processedAt
                          ? new Date(run.processedAt).toLocaleDateString()
                          : new Date(run.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} payroll runs
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="min-w-[40px]"
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Contractor Balances ({totalItems})</CardTitle>
            <CardDescription>Global view of all contractor wallet balances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Contractor</TableHead>
                    <TableHead className="font-semibold">Client</TableHead>
                    <TableHead className="font-semibold">Current Balance</TableHead>
                    <TableHead className="font-semibold">Total Earned</TableHead>
                    <TableHead className="font-semibold">Total Withdrawn</TableHead>
                    <TableHead className="font-semibold">Last Transaction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedBalances.map((balance) => (
                    <TableRow key={balance.contractorId} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div>
                          <p className="font-medium">{balance.contractorName}</p>
                          <p className="text-xs text-muted-foreground">{balance.contractorEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>{balance.clientName}</TableCell>
                      <TableCell>
                        <span
                          className={`font-semibold ${balance.currentBalance > 10000 ? "text-slate-700" : ""
                            }`}
                        >
                          ${balance.currentBalance.toLocaleString()} {balance.currency}
                        </span>
                        {balance.currentBalance > 10000 && (
                          <Badge className="ml-2 bg-slate-700">High Balance</Badge>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        ${balance.totalEarned.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        ${balance.totalWithdrawn.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(balance.lastTransaction).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} contractors
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="min-w-[40px]"
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

// ==================== COMPLIANCE MONITORING ====================
const ComplianceMonitoring = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredContractors = mockContractors.filter(contractor =>
    searchQuery === "" ||
    contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contractor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contractor.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contractor.complianceStatus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredContractors.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedContractors = filteredContractors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fullyCompliant = mockContractors.filter(c => c.complianceStatus === "approved").length;
  const incomplete = mockContractors.filter(c => c.complianceStatus === "incomplete").length;
  const expiring = mockContractors.filter(c => c.complianceStatus === "expiring").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-end mb-8">
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search contractors..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 h-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Fully Compliant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold mb-1 text-emerald-700">
              <AnimatedNumber value={fullyCompliant} />
            </div>
            <p className="text-xs text-slate-500">All documents approved</p>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Incomplete</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold mb-1 text-slate-700">
              <AnimatedNumber value={incomplete} />
            </div>
            <p className="text-xs text-slate-500">Missing documents</p>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold mb-1 text-amber-700">
              <AnimatedNumber value={expiring} />
            </div>
            <p className="text-xs text-slate-500">Documents expiring in 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">All Contractors ({totalItems})</CardTitle>
          <CardDescription>View compliance status for all contractors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Contractor</TableHead>
                  <TableHead className="font-semibold">Country</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Compliance Score</TableHead>
                  <TableHead className="font-semibold">Missing Docs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedContractors.map((contractor) => (
                  <TableRow key={contractor.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div>
                        <p className="font-medium">{contractor.name}</p>
                        <p className="text-xs text-muted-foreground">{contractor.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{contractor.country}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          contractor.complianceStatus === "approved"
                            ? "bg-emerald-700"
                            : contractor.complianceStatus === "expiring"
                              ? "bg-amber-700"
                              : "bg-slate-700"
                        }
                      >
                        {contractor.complianceStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={contractor.complianceScore} className="w-20 h-2" />
                        <span className="text-sm font-medium">{contractor.complianceScore}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {contractor.missingDocs > 0 ? (
                        <Badge className="bg-slate-700">{contractor.missingDocs} missing</Badge>
                      ) : (
                        <span className="text-sm text-slate-500">None</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} contractors
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="min-w-[40px]"
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ==================== ANALYTICS DASHBOARD ====================
const AnalyticsDashboard = () => {
  const analytics = mockPlatformAnalytics;
  const [timeRange, setTimeRange] = useState("30d");

  // Enhanced revenue data for trends
  const revenueData = [
    { month: "Jan", revenue: 95000, contracts: 28, avgValue: 3393 },
    { month: "Feb", revenue: 105000, contracts: 32, avgValue: 3281 },
    { month: "Mar", revenue: 115000, contracts: 35, avgValue: 3286 },
    { month: "Apr", revenue: 108000, contracts: 33, avgValue: 3273 },
    { month: "May", revenue: 118000, contracts: 37, avgValue: 3189 },
    { month: "Jun", revenue: 122000, contracts: 39, avgValue: 3128 },
    { month: "Jul", revenue: 128000, contracts: 41, avgValue: 3122 },
    { month: "Aug", revenue: 134000, contracts: 43, avgValue: 3116 },
    { month: "Sep", revenue: 138000, contracts: 44, avgValue: 3136 },
    { month: "Oct", revenue: 142000, contracts: 46, avgValue: 3087 },
    { month: "Nov", revenue: 148000, contracts: 48, avgValue: 3083 },
    { month: "Dec", revenue: 125000, contracts: 40, avgValue: 3125 },
  ];

  // Contractor distribution by country
  const contractorsByCountry = [
    { country: "Egypt", count: 45, percentage: 19.6 },
    { country: "Syria", count: 38, percentage: 16.5 },
    { country: "UAE", count: 35, percentage: 15.2 },
    { country: "Saudi Arabia", count: 32, percentage: 13.9 },
    { country: "Jordan", count: 28, percentage: 12.2 },
    { country: "Lebanon", count: 22, percentage: 9.6 },
    { country: "Others", count: 30, percentage: 13.0 },
  ];

  // Client engagement metrics
  const clientEngagement = [
    { name: "TechWave LLC", contractors: 12, revenue: 45000, growth: 18.5 },
    { name: "Global Innovations", contractors: 8, revenue: 32000, growth: 22.3 },
    { name: "Digital Solutions", contractors: 10, revenue: 38000, growth: 15.7 },
    { name: "DesignCo", contractors: 6, revenue: 24000, growth: 12.1 },
    { name: "StartupX", contractors: 4, revenue: 16000, growth: 28.9 },
  ];

  // Conversion funnel
  const conversionFunnel = [
    { stage: "Applications", count: 450, color: "#6366f1" },
    { stage: "KYC Submitted", count: 380, color: "#8b5cf6" },
    { stage: "Documents Approved", count: 320, color: "#a855f7" },
    { stage: "Contract Signed", count: 280, color: "#c084fc" },
    { stage: "Active", count: 230, color: "#d8b4fe" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">Platform-wide business intelligence</p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border shadow-sm bg-gradient-to-br from-indigo-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold mb-2">
              $<AnimatedNumber value={analytics.totalRevenue.allTime / 1000} />k
            </div>
            <p className="text-xs text-slate-500">
              This month: ${(analytics.totalRevenue.thisMonth / 1000).toFixed(1)}k
            </p>
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-gradient-to-br from-emerald-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Active Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold mb-2">
              <AnimatedNumber value={analytics.activeUsers.clients} />
            </div>
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +{analytics.growthMetrics.clientGrowth}% growth
            </p>
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-gradient-to-br from-purple-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Active Contractors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold mb-2">
              <AnimatedNumber value={analytics.activeUsers.contractors} />
            </div>
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +{analytics.growthMetrics.contractorGrowth}% growth
            </p>
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-gradient-to-br from-amber-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Avg Contract Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold mb-2">
              $3.2k
            </div>
            <p className="text-xs text-slate-500">
              Per contractor/month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend Chart */}
      <Card className="border shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                Revenue & Contract Trends
              </CardTitle>
              <CardDescription>Monthly revenue and active contracts over time</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "#6366f1",
              },
              contracts: {
                label: "Contracts",
                color: "#10b981",
              },
            }}
            className="h-[300px]"
          >
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={2.5}
                fill="url(#revenueGradient)"
              />
              <Line
                type="monotone"
                dataKey="contracts"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ fill: "#10b981", r: 4 }}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Contractor Distribution & Client Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contractor Distribution */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Contractor Distribution
            </CardTitle>
            <CardDescription>By country (Top 7)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contractorsByCountry.map((item, index) => (
                <div key={item.country}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.country}</span>
                    <span className="text-sm text-muted-foreground">{item.count} ({item.percentage}%)</span>
                  </div>
                  <Progress
                    value={item.percentage * 5}
                    className="h-2"
                    style={{
                      background: `linear-gradient(to right, hsl(${260 - index * 20}, 70%, 60%) 0%, hsl(${260 - index * 20}, 70%, 60%) ${item.percentage * 5}%, #e5e7eb ${item.percentage * 5}%)`,
                    }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Clients by Revenue */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-emerald-600" />
              Top Clients by Revenue
            </CardTitle>
            <CardDescription>Client engagement metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientEngagement.map((client, index) => (
                <div key={client.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{client.name}</p>
                    <p className="text-xs text-muted-foreground">{client.contractors} contractors</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">${(client.revenue / 1000).toFixed(1)}k</p>
                    <p className="text-xs text-emerald-600">+{client.growth}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document & Payroll Metrics with Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600" />
              Document Metrics
            </CardTitle>
            <CardDescription>KYC document approval statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <span className="text-sm font-medium">Approved</span>
                <span className="font-bold text-xl text-emerald-700">{analytics.documentMetrics.approved}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
                <span className="text-sm font-medium">Pending</span>
                <span className="font-bold text-xl text-amber-700">{analytics.documentMetrics.pending}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-sm font-medium">Rejected</span>
                <span className="font-bold text-xl text-slate-700">{analytics.documentMetrics.rejected}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t-2">
                <span className="text-sm font-medium">Avg Review Time</span>
                <span className="font-bold text-lg">{analytics.documentMetrics.avgReviewTime} days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-600" />
              Payroll Metrics
            </CardTitle>
            <CardDescription>Payment processing statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                <span className="text-sm font-medium">Runs This Month</span>
                <span className="font-bold text-xl text-indigo-700">{analytics.payrollMetrics.runsThisMonth}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <span className="text-sm font-medium">Total Processed</span>
                <span className="font-bold text-xl text-emerald-700">${(analytics.payrollMetrics.totalProcessed / 1000).toFixed(1)}k</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t-2">
                <span className="text-sm font-medium">Avg Processing Time</span>
                <span className="font-bold text-lg">{analytics.payrollMetrics.avgProcessingTime} hours</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5 text-purple-600" />
            Contractor Onboarding Funnel
          </CardTitle>
          <CardDescription>Track conversion through onboarding stages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionFunnel.map((stage, index) => {
              const conversionRate = index > 0 ? ((stage.count / conversionFunnel[index - 1].count) * 100).toFixed(1) : 100;
              return (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{stage.stage}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{stage.count} contractors</span>
                      {index > 0 && (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          {conversionRate}% conversion
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="h-8 rounded-lg flex items-center" style={{ width: `${(stage.count / conversionFunnel[0].count) * 100}%`, backgroundColor: stage.color }}>
                    <span className="ml-4 text-white font-semibold text-sm">{stage.count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ==================== COUNTRY RULES MANAGEMENT ====================
const CountryRulesManagement = ({
  countryRules,
  setCountryRules,
  toast,
}: {
  countryRules: Record<string, CountryRule>;
  setCountryRules: React.Dispatch<React.SetStateAction<Record<string, CountryRule>>>;
  toast: any;
}) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryRule | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newRequiredDoc, setNewRequiredDoc] = useState("");
  const [newOptionalDoc, setNewOptionalDoc] = useState("");
  const [customRequiredDoc, setCustomRequiredDoc] = useState("");
  const [customOptionalDoc, setCustomOptionalDoc] = useState("");

  const countries = Object.values(countryRules);

  // Common document types
  const commonDocumentTypes = [
    "Passport",
    "National ID",
    "Tax ID",
    "Tax Certificate",
    "Proof of Address",
    "Bank Statement",
    "Emirates ID",
    "Civil ID",
    "Qatar ID",
    "Oman ID",
    "CPR Card",
    "ID Card",
    "Driver's License",
    "Birth Certificate",
    "Work Permit",
    "Visa",
    "Residence Permit",
    "Social Security Card",
    "Insurance Card",
    "Medical Certificate",
  ];

  const handleSaveRules = () => {
    if (selectedCountry) {
      setCountryRules({
        ...countryRules,
        [selectedCountry.countryCode]: selectedCountry,
      });
      toast({
        title: "Rules Updated",
        description: `Document requirements for ${selectedCountry.countryName} have been updated.`,
      });
      setEditModalOpen(false);
      // Reset form fields
      setNewRequiredDoc("");
      setNewOptionalDoc("");
      setCustomRequiredDoc("");
      setCustomOptionalDoc("");
    }
  };

  const handleAddRequiredDocument = () => {
    if (!selectedCountry) return;

    const docToAdd = customRequiredDoc.trim() || newRequiredDoc;
    if (!docToAdd) {
      toast({
        title: "No Document Selected",
        description: "Please select or enter a document type.",
        variant: "destructive",
      });
      return;
    }

    if (selectedCountry.requiredDocuments.includes(docToAdd)) {
      toast({
        title: "Document Already Added",
        description: `${docToAdd} is already in the required documents list.`,
        variant: "destructive",
      });
      return;
    }

    if (selectedCountry.optionalDocuments.includes(docToAdd)) {
      toast({
        title: "Document Already in Optional",
        description: `${docToAdd} is in the optional documents list. Please remove it from there first.`,
        variant: "destructive",
      });
      return;
    }

    const updated = { ...selectedCountry };
    updated.requiredDocuments = [...updated.requiredDocuments, docToAdd];
    setSelectedCountry(updated);
    setNewRequiredDoc("");
    setCustomRequiredDoc("");
  };

  const handleAddOptionalDocument = () => {
    if (!selectedCountry) return;

    const docToAdd = customOptionalDoc.trim() || newOptionalDoc;
    if (!docToAdd) {
      toast({
        title: "No Document Selected",
        description: "Please select or enter a document type.",
        variant: "destructive",
      });
      return;
    }

    if (selectedCountry.optionalDocuments.includes(docToAdd)) {
      toast({
        title: "Document Already Added",
        description: `${docToAdd} is already in the optional documents list.`,
        variant: "destructive",
      });
      return;
    }

    if (selectedCountry.requiredDocuments.includes(docToAdd)) {
      toast({
        title: "Document Already in Required",
        description: `${docToAdd} is in the required documents list. Please remove it from there first.`,
        variant: "destructive",
      });
      return;
    }

    const updated = { ...selectedCountry };
    updated.optionalDocuments = [...updated.optionalDocuments, docToAdd];
    setSelectedCountry(updated);
    setNewOptionalDoc("");
    setCustomOptionalDoc("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Country Rules Management</h1>
        <p className="text-muted-foreground mt-1">Configure document requirements per country</p>
      </div>

      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">All Countries</CardTitle>
          <CardDescription>Click a country to edit its compliance requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countries.map((country) => (
              <Card
                key={country.countryCode}
                className="border cursor-pointer hover:border-primary transition-colors"
                onClick={() => {
                  setSelectedCountry({ ...country });
                  setEditModalOpen(true);
                  // Reset form fields
                  setNewRequiredDoc("");
                  setNewOptionalDoc("");
                  setCustomRequiredDoc("");
                  setCustomOptionalDoc("");
                }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    {country.countryName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Required Documents</p>
                      <div className="flex flex-wrap gap-1">
                        {country.requiredDocuments.map((doc, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {country.optionalDocuments.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Optional Documents</p>
                        <div className="flex flex-wrap gap-1">
                          {country.optionalDocuments.map((doc, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-muted">
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Country Rules Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Country Rules - {selectedCountry?.countryName}</DialogTitle>
            <DialogDescription>
              Configure document requirements for contractors from this country
            </DialogDescription>
          </DialogHeader>
          {selectedCountry && (
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-3 block">Required Documents</Label>
                <div className="space-y-2 mb-3">
                  {selectedCountry.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm font-medium">{doc}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          const updated = { ...selectedCountry };
                          updated.requiredDocuments = updated.requiredDocuments.filter((_, i) => i !== idx);
                          setSelectedCountry(updated);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-slate-600" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-3">
                  <Select value={newRequiredDoc} onValueChange={setNewRequiredDoc}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonDocumentTypes
                        .filter(
                          (doc) =>
                            !selectedCountry.requiredDocuments.includes(doc) &&
                            !selectedCountry.optionalDocuments.includes(doc)
                        )
                        .map((doc) => (
                          <SelectItem key={doc} value={doc}>
                            {doc}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Or enter custom document"
                    value={customRequiredDoc}
                    onChange={(e) => setCustomRequiredDoc(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddRequiredDocument();
                      }
                    }}
                  />
                  <Button onClick={handleAddRequiredDocument} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Optional Documents</Label>
                <div className="space-y-2 mb-3">
                  {selectedCountry.optionalDocuments.length > 0 ? (
                    selectedCountry.optionalDocuments.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                        <span className="text-sm font-medium">{doc}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            const updated = { ...selectedCountry };
                            updated.optionalDocuments = updated.optionalDocuments.filter((_, i) => i !== idx);
                            setSelectedCountry(updated);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-slate-600" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground p-3 border rounded-lg bg-muted/30">
                      No optional documents added yet
                    </p>
                  )}
                </div>
                <div className="flex gap-2 mt-3">
                  <Select value={newOptionalDoc} onValueChange={setNewOptionalDoc}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonDocumentTypes
                        .filter(
                          (doc) =>
                            !selectedCountry.requiredDocuments.includes(doc) &&
                            !selectedCountry.optionalDocuments.includes(doc)
                        )
                        .map((doc) => (
                          <SelectItem key={doc} value={doc}>
                            {doc}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Or enter custom document"
                    value={customOptionalDoc}
                    onChange={(e) => setCustomOptionalDoc(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddOptionalDocument();
                      }
                    }}
                  />
                  <Button onClick={handleAddOptionalDocument} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => {
                  setEditModalOpen(false);
                  // Reset form fields
                  setNewRequiredDoc("");
                  setNewOptionalDoc("");
                  setCustomRequiredDoc("");
                  setCustomOptionalDoc("");
                }}>
                  Cancel
                </Button>
                <Button onClick={handleSaveRules}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

// ==================== SUPPORT TOOLS ====================
const SupportTools = ({ toast }: { toast: any }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [adjustmentAmount, setAdjustmentAmount] = useState("");
  const [adjustmentReason, setAdjustmentReason] = useState("");
  const [selectedContractor, setSelectedContractor] = useState<ContractorBalance | null>(null);

  const handleManualAdjustment = () => {
    if (!adjustmentAmount || !adjustmentReason.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both amount and reason for adjustment.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Adjustment Recorded",
      description: `Balance adjusted for ${selectedContractor?.contractorName}. Audit log created.`,
    });

    setAdjustmentAmount("");
    setAdjustmentReason("");
    setSelectedContractor(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Support & Troubleshooting</h1>
        <p className="text-muted-foreground mt-1">Tools for investigating and resolving issues</p>
      </div>

      {/* Global Search */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Global Search</CardTitle>
          <CardDescription>Search for contractors, clients, or contracts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, contract ID..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Manual Adjustments */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Manual Ledger Adjustment</CardTitle>
          <CardDescription>Adjust contractor balance (requires reason and audit log)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Select Contractor</Label>
            <Select
              value={selectedContractor?.contractorId || ""}
              onValueChange={(value) => {
                const contractor = mockContractorBalances.find(c => c.contractorId === value);
                setSelectedContractor(contractor || null);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose contractor..." />
              </SelectTrigger>
              <SelectContent>
                {mockContractorBalances.map((contractor) => (
                  <SelectItem key={contractor.contractorId} value={contractor.contractorId}>
                    {contractor.contractorName} - ${contractor.currentBalance}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedContractor && (
            <>
              <div>
                <Label>Adjustment Amount</Label>
                <Input
                  type="number"
                  placeholder="Enter amount (positive or negative)"
                  value={adjustmentAmount}
                  onChange={(e) => setAdjustmentAmount(e.target.value)}
                />
              </div>

              <div>
                <Label>Reason (Required)</Label>
                <Textarea
                  placeholder="Enter reason for adjustment..."
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                  rows={3}
                />
              </div>

              <Button onClick={handleManualAdjustment} className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                Apply Adjustment
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ==================== AUDIT LOGS ====================
const AuditLogs = ({ auditLogs }: { auditLogs: AuditLog[] }) => {
  const [filterAction, setFilterAction] = useState("all");
  const [filterAdmin, setFilterAdmin] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredLogs = auditLogs.filter((log) => {
    if (filterAction !== "all" && log.action !== filterAction) return false;
    if (filterAdmin !== "all" && log.adminId !== filterAdmin) return false;
    if (searchQuery !== "") {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        log.adminName.toLowerCase().includes(searchLower) ||
        log.action.toLowerCase().includes(searchLower) ||
        log.entityType.toLowerCase().includes(searchLower) ||
        JSON.stringify(log.details).toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }
    return true;
  });

  const totalItems = filteredLogs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const uniqueActions = Array.from(new Set(auditLogs.map(l => l.action)));
  const uniqueAdmins = Array.from(new Set(auditLogs.map(l => ({ id: l.adminId, name: l.adminName }))));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-end mb-8">
        <div className="flex gap-3">
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 h-10"
            />
          </div>
          <Select value={filterAction} onValueChange={(v) => {
            setFilterAction(v);
            setCurrentPage(1);
          }}>
            <SelectTrigger className="w-[200px] h-10 border border-border/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              {uniqueActions.map((action) => (
                <SelectItem key={action} value={action}>
                  {action.replace(/_/g, " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterAdmin} onValueChange={(v) => {
            setFilterAdmin(v);
            setCurrentPage(1);
          }}>
            <SelectTrigger className="w-[200px] h-10 border border-border/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Admins</SelectItem>
              {uniqueAdmins.map((admin) => (
                <SelectItem key={admin.id} value={admin.id}>
                  {admin.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Activity Log ({totalItems})</CardTitle>
          <CardDescription>Immutable record of all admin actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Timestamp</TableHead>
                  <TableHead className="font-semibold">Admin</TableHead>
                  <TableHead className="font-semibold">Action</TableHead>
                  <TableHead className="font-semibold">Entity</TableHead>
                  <TableHead className="font-semibold">Details</TableHead>
                  <TableHead className="font-semibold">IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="text-sm">
                      {new Date(log.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{log.adminName}</p>
                        <p className="text-xs text-muted-foreground">{log.adminId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.action.replace(/_/g, " ")}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{log.entityType}</TableCell>
                    <TableCell className="text-sm max-w-xs truncate">
                      {Object.entries(log.details).map(([key, value]) => (
                        <span key={key} className="block text-xs">
                          {key}: {String(value)}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell className="text-xs font-mono">{log.ipAddress}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} logs
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="min-w-[40px]"
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ==================== ADMIN SETTINGS ====================
const AdminSettings = () => {
  const adminUsers = mockAdminUsers;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Settings & Configuration</h1>
        <p className="text-muted-foreground mt-1">Manage admin users and platform settings</p>
      </div>

      <Card className="border shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Admin Users</CardTitle>
              <CardDescription>Manage administrator accounts and permissions</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Admin
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Last Login</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.role === "super_admin" ? "border-purple-300 bg-purple-50" : ""
                        }
                      >
                        {user.role.replace(/_/g, " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-700">{user.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(user.lastLogin).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Platform Configuration</CardTitle>
          <CardDescription>System-wide settings and feature flags</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Stripe Mode</p>
              <p className="text-sm text-muted-foreground">Test mode enabled for POC</p>
            </div>
            <Badge>Test Mode</Badge>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Automatic notifications enabled</p>
            </div>
            <Badge className="bg-emerald-700">Active</Badge>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Document Auto-approval</p>
              <p className="text-sm text-muted-foreground">Requires manual review</p>
            </div>
            <Badge variant="outline">Disabled</Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminDashboard;
