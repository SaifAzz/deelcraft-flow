import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useInView, useSpring, useTransform } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  CreditCard,
  Shield,
  Settings,
  Bell,
  Menu,
  X,
  ArrowLeft,
  Building2,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  MoreVertical,
  Calendar,
  Wallet,
  FileCheck,
  BarChart3,
  PieChart,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Upload,
  Send,
  UserPlus,
  FileSignature,
  Receipt,
  History,
  Banknote,
  TrendingDown,
  Moon,
  Sun,
  ChevronDown,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { useTheme } from "@/shared/hooks/use-theme";
import { useToast } from "@/shared/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import HelpGuide from "@/shared/components/HelpGuide";
import { MindLinksLogo } from "@/shared/components/MindLinksLogo";
import { OnboardingPage } from "../components/OnboardingPage";
import {
  mockContractors,
  mockContracts,
  mockPayrollRuns,
  mockTransactions,
  mockActivities,
  mockDeadlines,
  dashboardStats,
  mockNotifications,
  type Contractor,
  type Contract,
  type PayrollRun,
  type Transaction,
  type KYCInfo,
  type KYCDocument,
  type Notification,
  type ClientDocument,
} from "@/dashboards/client/data/clientData";
import {
  deelContractTemplate,
  generateContractFromTemplate,
} from "@/shared/data/contractTemplate";
import jsPDF from 'jspdf';

// Function to download contract as PDF
const downloadContract = (contractText: string, filename: string = "contract") => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  let yPosition = margin;
  const lineHeight = 6;
  const fontSize = 10;
  const titleFontSize = 14;

  // Set font
  doc.setFont("helvetica");

  // Split text into paragraphs
  const paragraphs = contractText.split('\n\n');

  paragraphs.forEach((paragraph: string) => {
    // Check if we need a new page
    if (yPosition + lineHeight * 3 > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }

    // Check if this is a title/heading (all caps or starts with number)
    const isTitle = /^[A-Z\s]+$/.test(paragraph.trim()) || /^\d+\./.test(paragraph.trim());

    if (isTitle && paragraph.trim().length < 50) {
      // Format as title
      doc.setFontSize(titleFontSize);
      doc.setFont("helvetica", "bold");
      yPosition += 5; // Add space before title
      const titleLines = doc.splitTextToSize(paragraph.trim(), maxWidth);
      titleLines.forEach((line: string) => {
        if (yPosition + lineHeight > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight + 2;
      });
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", "normal");
      yPosition += 2; // Add space after title
    } else {
      // Format as regular paragraph
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(paragraph.trim(), maxWidth);
      lines.forEach((line: string) => {
        if (yPosition + lineHeight > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
      yPosition += 3; // Add space between paragraphs
    }
  });

  // Save the PDF
  doc.save(`${filename}.pdf`);
};
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Separator } from "@/shared/components/ui/separator";
import { Progress } from "@/shared/components/ui/progress";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/ui/avatar";

type Page = "dashboard" | "contractors" | "contracts" | "payroll" | "payments" | "compliance" | "settings";

// Animated Number Counter Component
const AnimatedNumber = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(isInView ? value : 0, { duration: duration * 1000 });
  const display = useTransform(spring, (current) => Math.round(current));

  return <motion.span ref={ref}>{display}</motion.span>;
};

// Animated Currency Counter
const AnimatedCurrency = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
  const spring = useSpring(isInView ? numericValue : 0, { duration: duration * 1000 });
  const display = useTransform(spring, (current) => {
    return `$${Math.round(current).toLocaleString()}`;
  });

  return <motion.span ref={ref}>{display}</motion.span>;
};

// Container animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const ClientDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  // Ensure activePage is "dashboard" on mount to show onboarding if needed
  const [activePage, setActivePage] = useState<Page>("dashboard");

  const [activeSettingsTab, setActiveSettingsTab] = React.useState<string>("profile");

  // Check for navigation state or URL params to set active page
  React.useEffect(() => {
    // Check if coming from onboarding with a specific page
    const state = location.state as { activePage?: Page; activeTab?: string } | null;
    if (state?.activePage) {
      setActivePage(state.activePage);
      if (state.activeTab) {
        setActiveSettingsTab(state.activeTab);
      }
    } else {
      // Check URL params
      const params = new URLSearchParams(location.search);
      const pageParam = params.get("page") as Page | null;
      const tabParam = params.get("tab");
      if (pageParam && ["dashboard", "contractors", "compliance", "contracts", "payroll", "payments", "settings"].includes(pageParam)) {
        setActivePage(pageParam);
        if (tabParam) {
          setActiveSettingsTab(tabParam);
        }
      } else {
        setActivePage("dashboard");
      }
    }
  }, [location]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Check onboarding completion status
  const [onboardingStatus, setOnboardingStatus] = React.useState({
    companyOnboardingDone: localStorage.getItem("company_profile_onboarding_completed") === "true",
    entityCreated: localStorage.getItem("entity_creation_completed") === "true",
    entityVerified: localStorage.getItem("entity_verification_status") === "completed",
  });

  // Update onboarding status when localStorage changes
  React.useEffect(() => {
    const checkStatus = () => {
      setOnboardingStatus({
        companyOnboardingDone: localStorage.getItem("company_profile_onboarding_completed") === "true",
        entityCreated: localStorage.getItem("entity_creation_completed") === "true",
        entityVerified: localStorage.getItem("entity_verification_status") === "completed",
      });
    };

    // Check on mount and periodically to catch localStorage changes
    checkStatus();
    const interval = setInterval(checkStatus, 500);

    // Listen for storage events (from other tabs/windows)
    window.addEventListener('storage', checkStatus);

    // Listen for custom event (from same window navigation)
    window.addEventListener('onboardingStatusChanged', checkStatus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkStatus);
      window.removeEventListener('onboardingStatusChanged', checkStatus);
    };
  }, []);

  const isOnboardingComplete = onboardingStatus.companyOnboardingDone && onboardingStatus.entityCreated && onboardingStatus.entityVerified;

  // Check if onboarding was dismissed (for remaining optional tasks after verification)
  const onboardingDismissed = localStorage.getItem("onboarding_remaining_tasks_dismissed") === "true";

  // Show onboarding page if:
  // 1. Main onboarding is not complete, OR
  // 2. Verification is complete but remaining tasks haven't been dismissed
  // This ensures users see the onboarding page after verification to complete remaining tasks
  const showOnboarding = activePage === "dashboard" && (!isOnboardingComplete || (isOnboardingComplete && !onboardingDismissed));

  // Entity verification status (for toast)
  const hasEntity = onboardingStatus.entityCreated;
  const isEntityVerified = onboardingStatus.entityVerified;
  const verificationDismissed = localStorage.getItem("verification_warning_dismissed") === "true";

  // Show toast notification for entity verification
  useEffect(() => {
    if (hasEntity && !isEntityVerified && !verificationDismissed) {
      const timer = setTimeout(() => {
        const toastResult = toast({
          variant: "destructive",
          title: (
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-rose-600" />
              <span>Entity Verification Required</span>
            </div>
          ),
          description: "Complete verification to avoid payment delays and ensure full access to all Mind Links services.",
          className: "border-rose-200 bg-rose-50 text-rose-900 [&>div]:text-rose-900",
          action: (
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  navigate("/entity-verification");
                  toastResult.dismiss();
                }}
                size="sm"
                className="bg-rose-600 text-white hover:bg-rose-700 h-7 px-3 text-xs"
              >
                Start Verification
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  localStorage.setItem("verification_warning_dismissed", "true");
                  toastResult.dismiss();
                }}
                className="border-rose-300 text-rose-700 hover:bg-rose-100 h-7 px-3 text-xs"
              >
                Dismiss
              </Button>
            </div>
          ),
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [hasEntity, isEntityVerified, verificationDismissed, navigate, toast]);

  // State for mock data
  const [contractors] = useState<Contractor[]>(mockContractors);
  const [contracts] = useState<Contract[]>(mockContracts);
  const [payrollRuns] = useState<PayrollRun[]>(mockPayrollRuns);
  const [transactions] = useState<Transaction[]>(mockTransactions);

  const navigation = [
    { id: "dashboard" as Page, name: "Dashboard", icon: LayoutDashboard },
    { id: "contractors" as Page, name: "Contractors", icon: Users },
    { id: "compliance" as Page, name: "Compliance", icon: Shield },
    { id: "contracts" as Page, name: "Contracts", icon: FileText },
    { id: "payroll" as Page, name: "Payroll", icon: DollarSign },
    { id: "payments" as Page, name: "Payments", icon: CreditCard },
    { id: "settings" as Page, name: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Professional header with navigation menu */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="border-b border-blue-200/20 bg-gradient-to-r from-background/10 via-background/5 to-background/10 backdrop-blur-xl supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-background/8 supports-[backdrop-filter]:via-background/3 supports-[backdrop-filter]:to-background/8 sticky top-0 z-50"
        style={{
          boxShadow: `
            0 20px 40px -10px rgba(59, 130, 246, 0.25),
            0 10px 30px -5px rgba(37, 99, 235, 0.2),
            0 4px 20px -2px rgba(29, 78, 216, 0.15),
            0 0 0 1px rgba(59, 130, 246, 0.1),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1)
          `
        }}
      >
        <div className="flex h-16 items-center px-6">
          {/* Logo */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center mr-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MindLinksLogo size="md" />
            </motion.div>
          </motion.div>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
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
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 rounded-lg shadow-sm"
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
            className="lg:hidden mr-2"
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
          <div className="flex items-center gap-2">
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
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1.5 right-1.5 h-2 w-2 bg-rose-600 rounded-full border-2 border-background"
                      />
                    )}
                  </Button>
                </motion.div>
              </PopoverTrigger>
              <PopoverContent className="w-96 p-0" align="end">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Notifications</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setNotifications(notifications.map(n => ({ ...n, read: true })));
                      }}
                    >
                      Mark all as read
                    </Button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${!notification.read ? "bg-slate-50 dark:bg-slate-900/20" : ""
                          }`}
                        onClick={() => {
                          setNotifications(notifications.map(n =>
                            n.id === notification.id ? { ...n, read: true } : n
                          ));
                          if (notification.actionUrl) {
                            setActivePage(notification.actionUrl.replace("/", "") as Page);
                            setNotificationOpen(false);
                          }
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-1 h-2 w-2 rounded-full ${notification.type === "compliance" ? "bg-amber-600" :
                            notification.type === "contract" ? "bg-slate-600" :
                              notification.type === "payment" ? "bg-emerald-600" :
                                "bg-slate-500"
                            } ${!notification.read ? "" : "opacity-30"}`} />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${!notification.read ? "" : "text-muted-foreground"}`}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </PopoverContent>
            </Popover>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 pl-3 border-l"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">TC</AvatarFallback>
                </Avatar>
              </motion.div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium leading-none">TechWave LLC</p>
                <p className="text-xs text-muted-foreground mt-1">admin@techwave.com</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
            </motion.div>
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
              className="lg:hidden overflow-hidden border-t bg-background"
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
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive
                        ? "bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 text-white shadow-sm"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content - Full width with page transitions */}
      <main className="bg-muted/30 min-h-[calc(100vh-4rem)]">
        <div className="p-6 max-w-9xl mx-auto">
          <AnimatePresence mode="wait">
            {showOnboarding ? (
              <motion.div
                key="onboarding"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <OnboardingPage />
              </motion.div>
            ) : activePage === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Entity Verification Warning Banner */}
                {hasEntity && !isEntityVerified && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-amber-50 border border-amber-200 rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-amber-900 mb-1">
                          Entity Verification Required
                        </h3>
                        <p className="text-sm text-amber-800 mb-3">
                          Complete verification to avoid payment delays and ensure full access to all Mind Links services. Your entity will show a verification warning until completed.
                        </p>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => navigate("/entity-verification")}
                            size="sm"
                            className="bg-amber-600 text-white hover:bg-amber-700 h-8 px-4 text-xs"
                          >
                            Start Verification
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              localStorage.setItem("verification_warning_dismissed", "true");
                              // Force a re-render
                              window.dispatchEvent(new CustomEvent('onboardingStatusChanged'));
                            }}
                            className="border-amber-300 text-amber-700 hover:bg-amber-100 h-8 px-4 text-xs"
                          >
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <DashboardOverview contractors={contractors} transactions={transactions} />
              </motion.div>
            )}
            {activePage === "contractors" && (
              <motion.div
                key="contractors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ContractorsManagement contractors={contractors} />
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
                <ContractsManagement contracts={contracts} contractors={contractors} />
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
                <PayrollManagement />
              </motion.div>
            )}
            {activePage === "payments" && (
              <motion.div
                key="payments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <PaymentsManagement />
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
                <ComplianceMonitoring contractors={contractors} />
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
                <SettingsPage activeTab={activeSettingsTab} onTabChange={setActiveSettingsTab} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Help Guide */}
      <HelpGuide open={helpOpen} onOpenChange={setHelpOpen} />
    </div>
  );
};

// ==================== DASHBOARD OVERVIEW ====================
const DashboardOverview = ({ contractors, transactions }: { contractors: Contractor[]; transactions: Transaction[] }) => {
  const stats = dashboardStats;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header - mind Links style with animation */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-semibold tracking-tight bg-gradient-primary bg-clip-text text-transparent"
          >
            Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-muted-foreground mt-1.5"
          >
            Welcome back, TechWave LLC
          </motion.p>
        </div>
        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Contract
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Cards - mind Links style clean cards with animations */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Active Contracts</CardTitle>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center"
                >
                  <FileText className="h-5 w-5 text-slate-700" />
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold mb-2 text-slate-900">
                  <AnimatedNumber value={stats.activeContracts} />
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <TrendingUp className="h-3 w-3 text-emerald-600" />
                  </motion.div>
                  <span className="text-emerald-600 font-medium">+2</span> from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Total Contractors</CardTitle>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center"
                >
                  <Users className="h-5 w-5 text-slate-700" />
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold mb-2 text-slate-900">
                  <AnimatedNumber value={stats.totalContractors} />
                </div>
                <p className="text-xs text-slate-500">{contractors.filter(c => c.activeContracts === 0).length} pending invitations</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Escrow Balance</CardTitle>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center"
                >
                  <Wallet className="h-5 w-5 text-slate-700" />
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold mb-2 text-slate-900">
                  <AnimatedCurrency value={`$${stats.escrowBalance.toLocaleString()}`} />
                </div>
                <p className="text-xs text-slate-500">Available for payments</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Pending Approvals</CardTitle>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center"
                >
                  <Clock className="h-5 w-5 text-slate-700" />
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold mb-2 text-slate-900">
                  <AnimatedNumber value={stats.pendingApprovals} />
                </div>
                <p className="text-xs text-slate-500">Require your attention</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Quick Actions - Professional design */}
      <motion.div variants={itemVariants}>
        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-lg font-semibold text-slate-900">Quick Actions</CardTitle>
            <CardDescription className="text-sm text-slate-600">Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: UserPlus, title: "Invite Contractor", desc: "Add a new contractor to your team" },
                { icon: DollarSign, title: "Create Payroll Run", desc: "Process monthly payroll" },
              ].map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="outline" className="h-auto p-5 flex flex-col items-start hover:bg-slate-50 hover:border-slate-300 transition-all w-full border-slate-200">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="h-11 w-11 rounded-lg bg-slate-100 flex items-center justify-center mb-3"
                      >
                        <Icon className="h-5 w-5 text-slate-700" />
                      </motion.div>
                      <span className="font-semibold text-sm mb-1.5 text-slate-900">{action.title}</span>
                      <span className="text-xs text-slate-600 text-left">{action.desc}</span>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity - Professional design */}
        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-lg font-semibold text-slate-900">Recent Activity</CardTitle>
            <CardDescription className="text-sm text-slate-600">Latest updates and events</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {mockActivities.map((activity, idx) => {
                const iconMap: Record<string, any> = {
                  CheckCircle2,
                  DollarSign,
                  UserPlus,
                  AlertCircle,
                };
                const Icon = iconMap[activity.icon] || CheckCircle2;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    whileHover={{ x: 2 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`${activity.color} h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm`}
                    >
                      <Icon className="h-4 w-4 text-white" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{activity.text}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{activity.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines - Professional design */}
        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-lg font-semibold text-slate-900">Upcoming Deadlines</CardTitle>
            <CardDescription className="text-sm text-slate-600">Important dates and reminders</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {mockDeadlines.map((deadline, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  whileHover={{ x: -2 }}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">{deadline.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{deadline.date}</p>
                  </div>
                  {deadline.urgent && (
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <Badge className="bg-amber-600 hover:bg-amber-700 text-white border-0 shadow-sm">Urgent</Badge>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Transactions Summary - Professional design */}
      <motion.div variants={itemVariants}>
        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-slate-900">Recent Transactions</CardTitle>
                <CardDescription className="text-sm text-slate-600">Latest payment activity</CardDescription>
              </div>
              <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  View All <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Contractor</TableHead>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.slice(0, 3).map((transaction, idx) => {
                    const contractor = contractors.find(c => c.id === transaction.contractorId);
                    return (
                      <motion.tr
                        key={transaction.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + idx * 0.1 }}
                        whileHover={{ x: 4, backgroundColor: "hsl(var(--muted) / 0.3)" }}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <TableCell className="font-medium">
                          {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </TableCell>
                        <TableCell>{contractor?.name || transaction.contractorName || transaction.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {transaction.type === 'payment' ? 'Payment' : 'Funding'}
                          </Badge>
                        </TableCell>
                        <TableCell className={`font-semibold text-sm ${transaction.amount < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()} {transaction.currency}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              transaction.status === "completed"
                                ? "bg-emerald-600 hover:bg-emerald-700 text-white border-0"
                                : transaction.status === "pending"
                                  ? "bg-amber-600 hover:bg-amber-700 text-white border-0"
                                  : "bg-rose-600 hover:bg-rose-700 text-white border-0"
                            }
                          >
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </Badge>
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

// ==================== CONTRACTORS MANAGEMENT ====================
const ContractorsManagement = ({ contractors }: { contractors: Contractor[] }) => {
  const [showInviteWizard, setShowInviteWizard] = useState(false);
  const [contractTypeFilter, setContractTypeFilter] = useState<string>("all");

  const handleWizardComplete = (data: any) => {
    // Handle the completed wizard data
    console.log("Contractor invitation data:", data);
    // You can add API call here to send the invitation
    setShowInviteWizard(false);
  };

  // Get contract types for each contractor
  const getContractorContractTypes = (contractorId: string): string[] => {
    const contractorContracts = mockContracts.filter(c => c.contractorId === contractorId && c.status === "active");
    const types = contractorContracts.map(c => c.type);
    return Array.from(new Set(types)); // Remove duplicates
  };

  // Filter contractors by contract type
  const filteredContractors = contractors.filter(contractor => {
    if (contractTypeFilter === "all") return true;
    const contractTypes = getContractorContractTypes(contractor.id);
    return contractTypes.includes(contractTypeFilter);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Contractors</h1>
          <p className="text-muted-foreground mt-1.5">Manage your contractor relationships</p>
        </div>
        <Button onClick={() => setShowInviteWizard(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Contractor
        </Button>
      </div>

      <InviteContractorWizard
        isOpen={showInviteWizard}
        onClose={() => setShowInviteWizard(false)}
        onComplete={handleWizardComplete}
      />

      {/* Filters - mind Links style */}
      <Card className="border shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search contractors..." className="pl-10 h-9" />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[160px] h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="incomplete">Incomplete</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[160px] h-9">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="sy">Syria</SelectItem>
                <SelectItem value="eg">Egypt</SelectItem>
                <SelectItem value="ae">UAE</SelectItem>
              </SelectContent>
            </Select>
            <Select value={contractTypeFilter} onValueChange={setContractTypeFilter}>
              <SelectTrigger className="w-full md:w-[160px] h-9">
                <SelectValue placeholder="Contract Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="fixed">Fixed Rate</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contractors Table - mind Links style */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">All Contractors</CardTitle>
              <CardDescription className="text-sm">{filteredContractors.length} contractors in total</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Contractor</TableHead>
                  <TableHead className="font-semibold">Country</TableHead>
                  <TableHead className="font-semibold">Contract Types</TableHead>
                  <TableHead className="font-semibold">Compliance Status</TableHead>
                  <TableHead className="font-semibold">Active Contracts</TableHead>
                  <TableHead className="font-semibold">Total Earned</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContractors.map((contractor, idx) => {
                  const contractTypes = getContractorContractTypes(contractor.id);
                  return (
                    <TableRow key={contractor.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            {contractor.logo && (
                              <AvatarImage src={contractor.logo} alt={contractor.name} />
                            )}
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                              {contractor.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{contractor.name}</p>
                            <p className="text-xs text-muted-foreground">{contractor.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{contractor.country}</TableCell>
                      <TableCell>
                        {contractTypes.length > 0 ? (
                          <div className="flex gap-1.5 flex-wrap">
                            {contractTypes.map((type, typeIdx) => (
                              <Badge
                                key={typeIdx}
                                variant="outline"
                                className="text-xs border-slate-300 text-slate-700 bg-slate-50"
                              >
                                {type === "fixed" ? "Fixed" : "Hourly"}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">No active contracts</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {contractor.complianceStatus === "approved" && (
                          <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white border-0">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approved
                          </Badge>
                        )}
                        {contractor.complianceStatus === "incomplete" && (
                          <Badge className="bg-rose-600 hover:bg-rose-700 text-white border-0">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Incomplete
                          </Badge>
                        )}
                        {contractor.complianceStatus === "expiring" && (
                          <Badge className="bg-amber-600 hover:bg-amber-700 text-white border-0">
                            <Clock className="h-3 w-3 mr-1" />
                            Expiring
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">{contractor.activeContracts}</TableCell>
                      <TableCell className="font-semibold text-sm">${contractor.totalEarned.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// ==================== CONTRACTS MANAGEMENT ====================
const ContractsManagement = ({ contracts, contractors }: { contracts: Contract[]; contractors: Contractor[] }) => {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Contracts</h1>
          <p className="text-muted-foreground mt-1.5">Manage all your contracts</p>
        </div>
      </div>

      {/* Contracts Table - mind Links style */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">All Contracts</CardTitle>
              <CardDescription className="text-sm">12 active contracts</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px] h-9">
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
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Contract</TableHead>
                  <TableHead className="font-semibold">Contractor</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((contract) => {
                  const contractor = contractors.find(c => c.id === contract.contractorId);
                  return (
                    <TableRow key={contract.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium text-sm">{contract.id}</TableCell>
                      <TableCell className="text-sm">{contractor?.name || contract.contractorName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {contract.type === "fixed" ? "Fixed" : "Hourly"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-sm">
                        {contract.type === "fixed"
                          ? `$${contract.amount.toLocaleString()} ${contract.currency}`
                          : `$${contract.hourlyRate}/${contract.currency}/hr`
                        }
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          contract.status === "active"
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white border-0"
                            : contract.status === "draft"
                              ? "bg-slate-500 hover:bg-slate-600 text-white border-0"
                              : "bg-slate-600 hover:bg-slate-700 text-white border-0"
                        }>
                          {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8"
                            onClick={() => {
                              const contractText = generateContractFromTemplate(deelContractTemplate, {
                                contractRef: contract.id,
                                effectiveDate: new Date(contract.startDate).toLocaleDateString(),
                                clientName: "TechWave LLC",
                                clientAddress: "123 Business St, City, State, ZIP",
                                clientRegistrationNumber: "REG-12345",
                                clientEmail: "admin@techwave.com",
                                contractorName: contractor?.name || contract.contractorName,
                                contractorAddress: "456 Contractor Ave, City, State, ZIP",
                                contractorRegistrationNumber: "CON-67890",
                                contractorEmail: contractor?.email || "",
                                servicesDescription: contract.type === "fixed"
                                  ? `Fixed contract for ${contract.amount} ${contract.currency} with ${contract.milestones?.length || 0} milestones`
                                  : `Hourly contract at ${contract.hourlyRate} ${contract.currency}/hour`,
                                compensationTerms: contract.type === "fixed"
                                  ? `${contract.amount} ${contract.currency} payable in ${contract.milestones?.length || 0} milestones`
                                  : `${contract.hourlyRate} ${contract.currency} per hour`,
                                paymentSchedule: contract.type === "fixed" ? "Upon completion and approval of each milestone" : "Monthly based on hours worked",
                                currency: contract.currency,
                                endDate: contract.endDate || "Ongoing",
                                noticePeriod: "30",
                                governingJurisdiction: "United States",
                              });
                              downloadContract(contractText, `Contract-${contract.id}`);
                            }}
                            title="Download Contract"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// ==================== PAYROLL MANAGEMENT ====================
const PayrollManagement = () => {
  const [showCreatePayroll, setShowCreatePayroll] = useState(false);
  const [showAdjustment, setShowAdjustment] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Payroll</h1>
          <p className="text-muted-foreground mt-1.5">Manage monthly payroll runs</p>
        </div>
        <Dialog open={showCreatePayroll} onOpenChange={setShowCreatePayroll}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Payroll Run
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Payroll Run</DialogTitle>
              <DialogDescription>Generate payroll for a specific period</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Period</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nov-2024">November 2024</SelectItem>
                    <SelectItem value="dec-2024">December 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input type="date" defaultValue="2024-11-01" />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input type="date" defaultValue="2024-11-30" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreatePayroll(false)}>Cancel</Button>
                <Button onClick={() => setShowCreatePayroll(false)}>Generate</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Payroll Overview Cards - mind Links style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border shadow-soft hover:shadow-lg transition-shadow bg-gradient-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold mb-1">November 2024</div>
            <p className="text-xs text-muted-foreground">Due: Nov 30, 2024</p>
          </CardContent>
        </Card>
        <Card className="border shadow-soft hover:shadow-lg transition-shadow bg-gradient-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold mb-1">$12,500</div>
            <p className="text-xs text-muted-foreground">5 contractors</p>
          </CardContent>
        </Card>
        <Card className="border shadow-soft hover:shadow-lg transition-shadow bg-gradient-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Processed This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold mb-1">$8,000</div>
            <p className="text-xs text-muted-foreground">3 payroll runs</p>
          </CardContent>
        </Card>
        <Card className="border shadow-soft hover:shadow-lg transition-shadow bg-gradient-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold mb-1">$4,500</div>
            <p className="text-xs text-muted-foreground">2 payroll runs</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Payrolls - mind Links style */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Recent Payroll Runs</CardTitle>
          <CardDescription className="text-sm">All payroll activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Period</TableHead>
                  <TableHead className="font-semibold">Contractors</TableHead>
                  <TableHead className="font-semibold">Total Amount</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { period: "November 2024", contractors: 5, amount: "$12,500", status: "Draft", date: "Nov 28, 2024" },
                  { period: "October 2024", contractors: 4, amount: "$10,000", status: "Processed", date: "Oct 31, 2024" },
                  { period: "September 2024", contractors: 3, amount: "$8,500", status: "Processed", date: "Sep 30, 2024" },
                ].map((payroll, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium text-sm">{payroll.period}</TableCell>
                    <TableCell className="text-sm">{payroll.contractors}</TableCell>
                    <TableCell className="font-semibold text-sm">{payroll.amount}</TableCell>
                    <TableCell>
                      <Badge className={payroll.status === "Processed" ? "bg-emerald-600 hover:bg-emerald-700 text-white border-0" : "bg-slate-500 hover:bg-slate-600 text-white border-0"}>
                        {payroll.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{payroll.date}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-8">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payroll Run Detail (Example) - mind Links style */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">November 2024 Payroll - Draft</CardTitle>
              <CardDescription className="text-sm">Review and approve before processing</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Payroll
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-5 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Payroll Amount</p>
                <p className="text-3xl font-semibold">$12,500</p>
              </div>
              <Badge className="bg-primary text-primary-foreground text-base px-4 py-2">5 Contractors</Badge>
            </div>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Contractor</TableHead>
                  <TableHead className="font-semibold">Contract Type</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Currency</TableHead>
                  <TableHead className="font-semibold">Details</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { contractor: "Ahmed Hassan", type: "Fixed", amount: "$3,000", currency: "USD", details: "Milestone 1, Milestone 2" },
                  { contractor: "Sara Ibrahim", type: "Hourly", amount: "$2,000", currency: "USD", details: "40 hours × $50/hr" },
                  { contractor: "Layla Mostafa", type: "Fixed", amount: "$1,500", currency: "USD", details: "Milestone 1" },
                ].map((item, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium text-sm">{item.contractor}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{item.type}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-sm">{item.amount}</TableCell>
                    <TableCell className="text-sm">{item.currency}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.details}</TableCell>
                    <TableCell>
                      <Dialog open={showAdjustment} onOpenChange={setShowAdjustment}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8">
                            <Plus className="h-4 w-4 mr-1" />
                            Adjustment
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Adjustment</DialogTitle>
                            <DialogDescription>Add bonus, deduction, or correction</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label>Type</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="bonus">Bonus</SelectItem>
                                  <SelectItem value="deduction">Deduction</SelectItem>
                                  <SelectItem value="correction">Correction</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Amount</Label>
                              <Input type="number" placeholder="500" />
                            </div>
                            <div className="space-y-2">
                              <Label>Reason (Optional)</Label>
                              <Textarea placeholder="Enter reason for adjustment" />
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setShowAdjustment(false)}>Cancel</Button>
                              <Button onClick={() => setShowAdjustment(false)}>Add</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// ==================== PAYMENTS MANAGEMENT ====================
const PaymentsManagement = () => {
  const [showAddFunds, setShowAddFunds] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Payments</h1>
          <p className="text-muted-foreground mt-1.5">Manage escrow and transactions</p>
        </div>
        <Dialog open={showAddFunds} onOpenChange={setShowAddFunds}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Funds
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Funds to Escrow</DialogTitle>
              <DialogDescription>Add money to your escrow account for payments</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Amount</Label>
                <Input type="number" placeholder="5000" />
              </div>
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="USD" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Credit Card" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit Card</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-4 border rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground mb-2">Card Details</p>
                <Input placeholder="Card Number" className="mb-2" />
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVV" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddFunds(false)}>Cancel</Button>
                <Button onClick={() => setShowAddFunds(false)}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Add Funds
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Escrow Balance - mind Links style with advanced animations */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <Card className="border shadow-sm bg-gradient-to-br from-primary/5 via-primary/5 to-primary/10 overflow-hidden relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
          <CardContent className="pt-8 pb-8 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm font-medium text-muted-foreground mb-3"
                >
                  Current Escrow Balance
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="text-5xl font-semibold mb-2"
                >
                  <AnimatedCurrency value="$45,250" duration={1.5} />
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm text-muted-foreground"
                >
                  Available for payments
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                whileHover={{ rotate: 360, scale: 1.1 }}
                className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <Wallet className="h-10 w-10 text-primary" />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Transaction History - mind Links style */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Transaction History</CardTitle>
              <CardDescription className="text-sm">All payment and funding activity</CardDescription>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Search..." className="w-[200px] h-9" />
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px] h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="payment">Payments</SelectItem>
                  <SelectItem value="funding">Funding</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-9">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { date: "Nov 30, 2024", type: "Payment", desc: "Payroll - November 2024", amount: "-$12,500", status: "Completed" },
                  { date: "Nov 25, 2024", type: "Funding", desc: "Added to escrow", amount: "+$20,000", status: "Completed" },
                  { date: "Oct 31, 2024", type: "Payment", desc: "Payroll - October 2024", amount: "-$10,000", status: "Completed" },
                ].map((transaction, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="text-sm">{transaction.date}</TableCell>
                    <TableCell>
                      <Badge className={transaction.type === "Payment" ? "bg-slate-600 hover:bg-slate-700 text-white border-0" : "bg-emerald-600 hover:bg-emerald-700 text-white border-0"}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{transaction.desc}</TableCell>
                    <TableCell className={`font-semibold text-sm ${transaction.amount.startsWith("+") ? "text-emerald-600" : "text-rose-600"}`}>
                      {transaction.amount}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white border-0">{transaction.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// ==================== CONTRACTOR COMPLIANCE DETAIL PAGE ====================
const ContractorCompliancePage = ({ contractor, onBack }: { contractor: Contractor; onBack: () => void }) => {
  if (!contractor) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Compliance
        </Button>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{contractor.name} - Compliance</h1>
          <p className="text-muted-foreground mt-1.5">Complete compliance and KYC information</p>
        </div>
      </div>

      {/* Contractor Overview */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Contractor Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Country</p>
              <p className="font-semibold">{contractor.country}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-semibold text-sm">{contractor.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Joined Date</p>
              <p className="font-semibold">{new Date(contractor.joinedDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Contracts</p>
              <p className="font-semibold">{contractor.activeContracts}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Status */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Compliance Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Overall Status</p>
              <Badge className={
                contractor.complianceStatus === "approved" ? "bg-emerald-600 text-white border-0" :
                  contractor.complianceStatus === "incomplete" ? "bg-rose-600 text-white border-0" :
                    "bg-amber-600 text-white border-0"
              }>
                {contractor.complianceStatus.charAt(0).toUpperCase() + contractor.complianceStatus.slice(1)}
              </Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">KYC Status</p>
              <Badge className={
                contractor.kycStatus === "approved" ? "bg-emerald-600 text-white border-0" :
                  contractor.kycStatus === "incomplete" ? "bg-rose-600 text-white border-0" :
                    "bg-amber-600 text-white border-0"
              }>
                {contractor.kycStatus.charAt(0).toUpperCase() + contractor.kycStatus.slice(1)}
              </Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Compliance Score</p>
              <div className="flex items-center gap-2">
                <Progress value={contractor.complianceScore} className="flex-1" />
                <span className="font-semibold">{contractor.complianceScore}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KYC Documents */}
      {contractor.kycInfo && (
        <Card className="border shadow-soft bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">KYC Documents</CardTitle>
            <CardDescription className="text-sm">
              Verification Level: <span className="font-semibold capitalize">{contractor.kycInfo.verificationLevel}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contractor.kycInfo.documents.map((doc) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${doc.status === "approved" ? "bg-emerald-50 border border-emerald-200" :
                      doc.status === "pending" ? "bg-amber-50 border border-amber-200" :
                        doc.status === "rejected" ? "bg-rose-50 border border-rose-200" :
                          "bg-amber-50 border border-amber-200"
                      }`}>
                      {doc.status === "approved" && <FileCheck className="h-6 w-6 text-emerald-600" />}
                      {doc.status === "pending" && <Clock className="h-6 w-6 text-amber-600" />}
                      {doc.status === "rejected" && <XCircle className="h-6 w-6 text-rose-600" />}
                      {doc.status === "expiring" && <AlertTriangle className="h-6 w-6 text-amber-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-slate-900">{doc.name}</p>
                        <Badge className={
                          doc.status === "approved" ? "bg-emerald-600 hover:bg-emerald-700 text-white border-0" :
                            doc.status === "pending" ? "bg-amber-600 hover:bg-amber-700 text-white border-0" :
                              doc.status === "rejected" ? "bg-rose-600 hover:bg-rose-700 text-white border-0" :
                                "bg-amber-600 hover:bg-amber-700 text-white border-0"
                        }>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span>{doc.type}</span>
                        {doc.uploadedDate && (
                          <span>Uploaded: {new Date(doc.uploadedDate).toLocaleDateString()}</span>
                        )}
                        {doc.expiryDate && (
                          <span className={doc.status === "expiring" ? "text-amber-600 font-medium" : ""}>
                            Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* KYC Notes */}
      {contractor.kycInfo?.notes && (
        <Card className="border shadow-soft bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{contractor.kycInfo.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={() => {
          const doc = new jsPDF();
          doc.setFontSize(16);
          doc.text(`${contractor.name} - Compliance Report`, 20, 20);
          doc.setFontSize(10);
          let y = 35;
          doc.text(`Country: ${contractor.country}`, 20, y);
          y += 7;
          doc.text(`KYC Status: ${contractor.kycStatus}`, 20, y);
          y += 7;
          doc.text(`Compliance Score: ${contractor.complianceScore}%`, 20, y);
          y += 10;
          if (contractor.kycInfo) {
            doc.text("Documents:", 20, y);
            y += 7;
            contractor.kycInfo.documents.forEach((docItem) => {
              doc.text(`- ${docItem.name} (${docItem.status})`, 20, y);
              y += 7;
            });
          }
          doc.save(`${contractor.name}-compliance-${new Date().toISOString().split("T")[0]}.pdf`);
        }}>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>
    </div>
  );
};

// ==================== COMPLIANCE MONITORING ====================
const ComplianceMonitoring = ({ contractors }: { contractors: Contractor[] }) => {
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showContractorPage, setShowContractorPage] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [contractTypeFilter, setContractTypeFilter] = useState<string>("all");

  // Calculate compliance stats from mock data
  const fullyCompliant = contractors.filter(c => c.complianceStatus === "approved" && c.complianceScore === 100).length;
  const incomplete = contractors.filter(c => c.complianceStatus === "incomplete").length;
  const expiring = contractors.filter(c => c.complianceStatus === "expiring").length;

  // Get contract types for each contractor
  const getContractorContractTypes = (contractorId: string): string[] => {
    const contractorContracts = mockContracts.filter(c => c.contractorId === contractorId && c.status === "active");
    const types = contractorContracts.map(c => c.type);
    return Array.from(new Set(types)); // Remove duplicates
  };

  // Filter contractors by status and contract type
  const filteredContractors = contractors.filter(contractor => {
    // Status filter
    if (statusFilter !== "all") {
      if (statusFilter === "compliant" && contractor.complianceStatus !== "approved") return false;
      if (statusFilter === "incomplete" && contractor.complianceStatus !== "incomplete") return false;
      if (statusFilter === "expiring" && contractor.complianceStatus !== "expiring") return false;
    }

    // Contract type filter
    if (contractTypeFilter !== "all") {
      const contractTypes = getContractorContractTypes(contractor.id);
      if (!contractTypes.includes(contractTypeFilter)) return false;
    }

    return true;
  });

  const handleViewDetails = (contractor: Contractor) => {
    setSelectedContractor(contractor);
    setShowDetailModal(true);
  };

  if (showContractorPage && selectedContractor) {
    return (
      <ContractorCompliancePage
        contractor={selectedContractor}
        onBack={() => {
          setShowContractorPage(false);
          setSelectedContractor(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Compliance</h1>
          <p className="text-muted-foreground mt-1.5">Monitor contractor compliance status</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Compliance Overview - Professional design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Fully Compliant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold mb-1 text-slate-900">
                <AnimatedNumber value={fullyCompliant} />
              </div>
              <p className="text-xs text-slate-500">All documents approved</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Incomplete</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold mb-1 text-slate-900">
                <AnimatedNumber value={incomplete} />
              </div>
              <p className="text-xs text-slate-500">Missing documents</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Expiring Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold mb-1 text-slate-900">
                <AnimatedNumber value={expiring} />
              </div>
              <p className="text-xs text-slate-500">Documents expiring in 30 days</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Compliance Dashboard Table - Professional design */}
      <Card className="border border-slate-200 shadow-sm">
        <CardHeader className="pb-4 bg-slate-50/50 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-slate-900">Compliance Dashboard</CardTitle>
              <CardDescription className="text-sm text-slate-600">Track all contractors' compliance status - {filteredContractors.length} contractors</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px] h-9 border-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="compliant">Compliant</SelectItem>
                  <SelectItem value="incomplete">Incomplete</SelectItem>
                  <SelectItem value="expiring">Expiring</SelectItem>
                </SelectContent>
              </Select>
              <Select value={contractTypeFilter} onValueChange={setContractTypeFilter}>
                <SelectTrigger className="w-[160px] h-9 border-slate-300">
                  <SelectValue placeholder="Contract Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="fixed">Fixed Rate</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-lg border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80 border-b border-slate-200">
                  <TableHead className="font-semibold text-slate-700">Contractor</TableHead>
                  <TableHead className="font-semibold text-slate-700">Country</TableHead>
                  <TableHead className="font-semibold text-slate-700">Contract Types</TableHead>
                  <TableHead className="font-semibold text-slate-700">KYC Status</TableHead>
                  <TableHead className="font-semibold text-slate-700">Missing Docs</TableHead>
                  <TableHead className="font-semibold text-slate-700">Compliance Score</TableHead>
                  <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContractors.map((contractor, idx) => {
                  const contractTypes = getContractorContractTypes(contractor.id);
                  return (
                    <motion.tr
                      key={contractor.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      className="hover:bg-slate-50/50 transition-colors border-b border-slate-100"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border border-slate-200">
                            {contractor.logo && (
                              <AvatarImage src={contractor.logo} alt={contractor.name} />
                            )}
                            <AvatarFallback className="bg-slate-100 text-slate-700 font-semibold text-xs">
                              {contractor.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm text-slate-900">{contractor.name}</p>
                            <p className="text-xs text-slate-500">{contractor.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-slate-700 py-4">{contractor.country}</TableCell>
                      <TableCell className="py-4">
                        {contractTypes.length > 0 ? (
                          <div className="flex gap-1.5 flex-wrap">
                            {contractTypes.map((type, typeIdx) => (
                              <Badge
                                key={typeIdx}
                                variant="outline"
                                className="text-xs border-slate-300 text-slate-700 bg-slate-50"
                              >
                                {type === "fixed" ? "Fixed" : "Hourly"}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">No active contracts</span>
                        )}
                      </TableCell>
                      <TableCell className="py-4">
                        {contractor.kycStatus === "approved" && (
                          <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-sm">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approved
                          </Badge>
                        )}
                        {contractor.kycStatus === "incomplete" && (
                          <Badge className="bg-rose-600 hover:bg-rose-700 text-white border-0 shadow-sm">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Incomplete
                          </Badge>
                        )}
                        {contractor.kycStatus === "expiring" && (
                          <Badge className="bg-amber-600 hover:bg-amber-700 text-white border-0 shadow-sm">
                            <Clock className="h-3 w-3 mr-1" />
                            Expiring
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="py-4">
                        {contractor.missingDocs > 0 ? (
                          <Badge className="bg-rose-600 hover:bg-rose-700 text-white border-0 shadow-sm">{contractor.missingDocs} missing</Badge>
                        ) : (
                          <span className="text-sm text-slate-500">None</span>
                        )}
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <Progress value={contractor.complianceScore} className="w-20 h-2 bg-slate-200" />
                          <span className="text-sm font-medium text-slate-700">{contractor.complianceScore}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                          onClick={() => handleViewDetails(contractor)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Compliance Details</DialogTitle>
            <DialogDescription>
              Complete compliance information for {selectedContractor?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedContractor && (
            <div className="space-y-6 py-4">
              {/* Contractor Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contractor Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      {selectedContractor.logo && (
                        <AvatarImage src={selectedContractor.logo} alt={selectedContractor.name} />
                      )}
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {selectedContractor.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{selectedContractor.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedContractor.email}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Country</p>
                      <p className="font-medium">{selectedContractor.country}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Joined Date</p>
                      <p className="font-medium">{new Date(selectedContractor.joinedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Compliance Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Overall Status</p>
                      <p className="font-semibold">
                        {selectedContractor.complianceStatus === "approved" && "✅ Fully Compliant"}
                        {selectedContractor.complianceStatus === "incomplete" && "⚠️ Incomplete"}
                        {selectedContractor.complianceStatus === "expiring" && "🔴 Expiring Soon"}
                      </p>
                    </div>
                    <Badge className={
                      selectedContractor.complianceStatus === "approved" ? "bg-emerald-600 text-white border-0" :
                        selectedContractor.complianceStatus === "incomplete" ? "bg-rose-600 text-white border-0" :
                          "bg-amber-600 text-white border-0"
                    }>
                      {selectedContractor.complianceStatus.charAt(0).toUpperCase() + selectedContractor.complianceStatus.slice(1)}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50/50">
                      <div>
                        <p className="text-sm font-medium text-slate-900">KYC Status</p>
                        <p className="text-xs text-slate-500">Know Your Customer verification</p>
                      </div>
                      <Badge className={
                        selectedContractor.kycStatus === "approved" ? "bg-emerald-600 text-white border-0" :
                          selectedContractor.kycStatus === "incomplete" ? "bg-rose-600 text-white border-0" :
                            "bg-amber-600 text-white border-0"
                      }>
                        {selectedContractor.kycStatus.charAt(0).toUpperCase() + selectedContractor.kycStatus.slice(1)}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50/50">
                      <div>
                        <p className="text-sm font-medium text-slate-900">Compliance Score</p>
                        <p className="text-xs text-slate-500">Based on document completeness</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={selectedContractor.complianceScore} className="w-32 h-2 bg-slate-200" />
                        <span className="font-semibold text-sm text-slate-700">{selectedContractor.complianceScore}%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50/50">
                      <div>
                        <p className="text-sm font-medium text-slate-900">Missing Documents</p>
                        <p className="text-xs text-slate-500">Required documents not submitted</p>
                      </div>
                      {selectedContractor.missingDocs > 0 ? (
                        <Badge className="bg-rose-600 text-white border-0">{selectedContractor.missingDocs} missing</Badge>
                      ) : (
                        <Badge className="bg-emerald-600 text-white border-0">All complete</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* KYC Information & Documents */}
              {selectedContractor.kycInfo && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">KYC Information & Documents</CardTitle>
                    <CardDescription className="text-sm">
                      Verification Level: <span className="font-semibold capitalize">{selectedContractor.kycInfo.verificationLevel}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* KYC Status Summary */}
                    <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/30">
                      <div>
                        <p className="text-sm text-muted-foreground">Submitted Date</p>
                        <p className="font-medium">
                          {selectedContractor.kycInfo.submittedDate
                            ? new Date(selectedContractor.kycInfo.submittedDate).toLocaleDateString()
                            : "Not submitted"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Approved Date</p>
                        <p className="font-medium">
                          {selectedContractor.kycInfo.approvedDate
                            ? new Date(selectedContractor.kycInfo.approvedDate).toLocaleDateString()
                            : "Not approved"}
                        </p>
                      </div>
                    </div>

                    {/* KYC Documents List */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">Documents ({selectedContractor.kycInfo.documents.length})</h4>
                      {selectedContractor.kycInfo.documents.map((doc) => (
                        <motion.div
                          key={doc.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${doc.status === "approved" ? "bg-emerald-50 border border-emerald-200" :
                              doc.status === "pending" ? "bg-amber-50 border border-amber-200" :
                                doc.status === "rejected" ? "bg-rose-50 border border-rose-200" :
                                  "bg-amber-50 border border-amber-200"
                              }`}>
                              {doc.status === "approved" && <FileCheck className="h-5 w-5 text-emerald-600" />}
                              {doc.status === "pending" && <Clock className="h-5 w-5 text-amber-600" />}
                              {doc.status === "rejected" && <XCircle className="h-5 w-5 text-rose-600" />}
                              {doc.status === "expiring" && <AlertTriangle className="h-5 w-5 text-amber-600" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium text-sm text-slate-900">{doc.name}</p>
                                <Badge className={
                                  doc.status === "approved" ? "bg-emerald-600 hover:bg-emerald-700 text-white border-0" :
                                    doc.status === "pending" ? "bg-amber-600 hover:bg-amber-700 text-white border-0" :
                                      doc.status === "rejected" ? "bg-rose-600 hover:bg-rose-700 text-white border-0" :
                                        "bg-amber-600 hover:bg-amber-700 text-white border-0"
                                }>
                                  {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-slate-600">
                                <span>{doc.type}</span>
                                {doc.uploadedDate && (
                                  <span>Uploaded: {new Date(doc.uploadedDate).toLocaleDateString()}</span>
                                )}
                                {doc.expiryDate && (
                                  <span className={doc.status === "expiring" ? "text-amber-600 font-medium" : ""}>
                                    Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Missing Documents */}
                    {selectedContractor.missingDocs > 0 && (
                      <div className="p-4 border border-amber-200 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm text-amber-900 dark:text-amber-200 mb-1">
                              Missing Documents Required
                            </p>
                            <p className="text-xs text-amber-700 dark:text-amber-300">
                              {selectedContractor.missingDocs} document(s) still need to be submitted for complete verification.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* KYC Notes */}
                    {selectedContractor.kycInfo.notes && (
                      <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900/20">
                        <p className="text-xs font-semibold text-slate-900 dark:text-slate-200 mb-1">Notes</p>
                        <p className="text-xs text-slate-700 dark:text-slate-300">{selectedContractor.kycInfo.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Additional Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Contracts</p>
                      <p className="font-semibold">{selectedContractor.activeContracts}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Earned</p>
                      <p className="font-semibold">${selectedContractor.totalEarned.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    if (selectedContractor) {
                      setShowDetailModal(false);
                      setShowContractorPage(true);
                    }
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Compliance
                </Button>
                <Button onClick={() => setShowDetailModal(false)}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ==================== SETTINGS PAGE ====================
const SettingsPage = ({ activeTab = "profile", onTabChange }: { activeTab?: string; onTabChange?: (tab: string) => void }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<string>("");
  const [paymentMethods, setPaymentMethods] = React.useState<Array<{
    id: string;
    type: "card" | "bank" | "paypal";
    last4?: string;
    name: string;
    expiry?: string;
  }>>([]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1.5">Manage your company profile and preferences</p>
      </div>

      <Tabs value={activeTab || "profile"} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="timeoff">Time Off Policy</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card className="border shadow-soft bg-gradient-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Company Profile</CardTitle>
              <CardDescription className="text-sm">Update your company information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Legal Company Name</Label>
                  <Input defaultValue="TechWave LLC" />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Select defaultValue="ae">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ae">UAE</SelectItem>
                      <SelectItem value="sa">Saudi Arabia</SelectItem>
                      <SelectItem value="eg">Egypt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tax ID</Label>
                <Input placeholder="Enter tax ID" />
              </div>
              <div className="space-y-2">
                <Label>Business Address</Label>
                <Textarea placeholder="Enter business address" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card className="border shadow-soft bg-gradient-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Team Members</CardTitle>
                  <CardDescription className="text-sm">Manage who has access to your account</CardDescription>
                </div>
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Member
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
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "John Doe", email: "john@techwave.com", role: "Admin", status: "Active" },
                      { name: "Jane Smith", email: "jane@techwave.com", role: "Member", status: "Active" },
                    ].map((member, idx) => (
                      <TableRow key={idx} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium text-sm">{member.name}</TableCell>
                        <TableCell className="text-sm">{member.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{member.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white border-0">{member.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="border shadow-soft bg-gradient-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Notification Preferences</CardTitle>
              <CardDescription className="text-sm">Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Email notifications", desc: "Receive email updates about important events" },
                { label: "Payroll reminders", desc: "Get notified before payroll deadlines" },
                { label: "Contract updates", desc: "Notifications when contracts are signed or updated" },
                { label: "Compliance alerts", desc: "Alerts for expiring documents and compliance issues" },
              ].map((pref, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div>
                    <p className="font-medium text-sm">{pref.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{pref.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300"
                    aria-label={pref.label}
                  />
                </div>
              ))}
              <div className="pt-2">
                <Button size="sm">Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeoff" className="space-y-4">
          <Card className="border shadow-soft bg-gradient-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Time Off Policy</CardTitle>
              <CardDescription className="text-sm">Configure your company's time off and leave policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Policy Type</Label>
                <Select defaultValue="unlimited">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unlimited">Unlimited PTO</SelectItem>
                    <SelectItem value="accrued">Accrued Time Off</SelectItem>
                    <SelectItem value="fixed">Fixed Days</SelectItem>
                    <SelectItem value="custom">Custom Policy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Annual Leave Days</Label>
                <Input type="number" placeholder="Enter number of days" defaultValue="20" />
              </div>
              <div className="space-y-2">
                <Label>Sick Leave Days</Label>
                <Input type="number" placeholder="Enter number of days" defaultValue="10" />
              </div>
              <div className="space-y-2">
                <Label>Carry Over Policy</Label>
                <Select defaultValue="none">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Carry Over</SelectItem>
                    <SelectItem value="limited">Limited Carry Over</SelectItem>
                    <SelectItem value="unlimited">Unlimited Carry Over</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Require Approval</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="require-approval"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300"
                    aria-label="Require approval for time off requests"
                  />
                  <label htmlFor="require-approval" className="text-sm text-muted-foreground cursor-pointer">
                    Time off requests require manager approval
                  </label>
                </div>
              </div>
              <Button>Save Policy</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card className="border shadow-soft bg-gradient-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Payment Methods</CardTitle>
              <CardDescription className="text-sm">Add and manage your payment methods for payroll and transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Label className="text-base font-semibold">Select Preferred Payment Method</Label>
                <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Credit/Debit Card</p>
                          <p className="text-xs text-muted-foreground">Visa, Mastercard, Amex</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Bank Transfer</p>
                          <p className="text-xs text-muted-foreground">Direct bank transfer (ACH, Wire)</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Wallet className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Digital Wallet</p>
                          <p className="text-xs text-muted-foreground">PayPal, Wise, or other digital wallets</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {selectedPaymentMethod && (
                <div className="mt-6 p-4 border rounded-lg bg-muted/30">
                  <h3 className="font-semibold text-sm mb-3">Add {selectedPaymentMethod === "card" ? "Card" : selectedPaymentMethod === "bank" ? "Bank Account" : "Digital Wallet"}</h3>
                  <div className="space-y-3">
                    {selectedPaymentMethod === "card" && (
                      <>
                        <div className="space-y-2">
                          <Label>Card Number</Label>
                          <Input placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label>Expiry Date</Label>
                            <Input placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label>CVV</Label>
                            <Input placeholder="123" type="password" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Cardholder Name</Label>
                          <Input placeholder="John Doe" />
                        </div>
                      </>
                    )}
                    {selectedPaymentMethod === "bank" && (
                      <>
                        <div className="space-y-2">
                          <Label>Account Holder Name</Label>
                          <Input placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <Label>Account Number</Label>
                          <Input placeholder="1234567890" />
                        </div>
                        <div className="space-y-2">
                          <Label>Routing Number</Label>
                          <Input placeholder="123456789" />
                        </div>
                        <div className="space-y-2">
                          <Label>Bank Name</Label>
                          <Input placeholder="Bank Name" />
                        </div>
                      </>
                    )}
                    {selectedPaymentMethod === "paypal" && (
                      <>
                        <div className="space-y-2">
                          <Label>Email Address</Label>
                          <Input placeholder="your@email.com" type="email" />
                        </div>
                        <div className="space-y-2">
                          <Label>Account Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select wallet type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="paypal">PayPal</SelectItem>
                              <SelectItem value="wise">Wise</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                    <Button className="w-full">Add Payment Method</Button>
                  </div>
                </div>
              )}

              {paymentMethods.length > 0 && (
                <div className="mt-6 space-y-3">
                  <Label className="text-base font-semibold">Saved Payment Methods</Label>
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="p-4 border rounded-lg bg-muted/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            {method.type === "card" ? (
                              <CreditCard className="h-5 w-5 text-primary" />
                            ) : method.type === "bank" ? (
                              <Building2 className="h-5 w-5 text-primary" />
                            ) : (
                              <Wallet className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{method.name}</p>
                            {method.last4 && (
                              <p className="text-xs text-muted-foreground">•••• {method.last4}</p>
                            )}
                            {method.expiry && (
                              <p className="text-xs text-muted-foreground">Expires {method.expiry}</p>
                            )}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Remove</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card className="border shadow-soft bg-gradient-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Billing Information</CardTitle>
              <CardDescription className="text-sm">Manage your payment methods and billing details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="p-4 border rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">•••• •••• •••• 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
              <Button size="sm">Add Payment Method</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDashboard;


