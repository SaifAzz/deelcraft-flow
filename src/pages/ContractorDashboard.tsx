import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    Plus,
    FileText,
    Receipt,
    ArrowLeftRight,
    Settings,
    User,
    Building2,
    CheckCircle2,
    Clock,
    Eye,
    Download,
    Upload,
    X,
    ArrowRight,
    Calendar,
    MapPin,
    Phone,
    Mail,
    CreditCard,
    Shield,
    AlertCircle,
    ChevronRight,
    Edit,
    Bell,
    HelpCircle,
    Sun,
    Moon,
    Filter,
    Wallet,
    DollarSign,
    LogOut,
    Monitor,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MindLinksLogo } from "@/components/MindLinksLogo";

// Currency Exchange Helper Function
const convertCurrency = (
    amount: number,
    fromCurrency: string,
    toCurrency: string,
    exchangeRates: Record<string, number> = {
        USD: 1,
        CAD: 0.75,
        EUR: 1.1,
        GBP: 1.27,
    }
): number => {
    if (fromCurrency === toCurrency) return amount;
    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;
    return (amount / fromRate) * toRate;
};

// Mock data
const mockContracts = [
    {
        id: "contract1",
        title: "Designer - Jackie F.",
        clientName: "DT Dean Torphy",
        clientInitials: "DT",
        type: "FIXED",
        status: "WAITING FOR CONTRACTOR SIGN",
        amount: 4000,
        currency: "CAD",
        frequency: "Monthly",
        dueIn: 19,
        startDate: "2022-02-15",
        endDate: null,
    },
    {
        id: "contract2",
        title: "Pat Schneider",
        clientName: "FS Felipe Senger",
        clientInitials: "FS",
        type: "PAY AS YOU GO",
        status: "DUE IN 19 DAYS",
        amount: 9120,
        currency: "USD",
        period: "This month",
        dueIn: 19,
    },
    {
        id: "contract3",
        title: "Pat Schneider",
        clientName: "FS Felipe Senger",
        clientInitials: "FS",
        type: "FIXED",
        status: "DUE IN 19 DAYS",
        amount: 6500,
        currency: "USD",
        period: "This month",
        dueIn: 19,
    },
];

const mockTransactions = [
    {
        id: "t1",
        from: "Jackie Fray",
        date: "Dec 31st, 2021",
        amount: 9280,
        currency: "USD",
        status: "Received",
    },
    {
        id: "t2",
        from: "Jackie Fray",
        date: "Dec 31st, 2021",
        amount: 6500,
        currency: "USD",
        status: "Received",
    },
    {
        id: "t3",
        from: "Jackie Fray",
        date: "Nov 30th, 2021",
        amount: 8880,
        currency: "USD",
        status: "Received",
    },
];

type ContractorType = "entity" | "individual" | null;
type OnboardingStep = "welcome" | "individual-details" | "address" | "complete";

// Contracts View Component
const ContractsView = ({
    contracts,
    onSelectContract,
}: {
    contracts: typeof mockContracts;
    onSelectContract: (id: string) => void;
}) => {
    const { theme } = useTheme();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Contracts
                </h1>
            </div>

            <div className="grid gap-4">
                {contracts.map((contract) => (
                    <motion.div
                        key={contract.id}
                        whileHover={{ scale: 1.02 }}
                        className={`group border rounded-xl p-4 cursor-pointer transition-all duration-300 ${theme === "dark"
                            ? "border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800/50 bg-gray-800/30"
                            : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 bg-white"
                            }`}
                        onClick={() => onSelectContract(contract.id)}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3 flex-1">
                                <Avatar className="h-10 w-10 ring-2 ring-offset-2 ring-blue-500/20">
                                    <AvatarFallback className={`${theme === "dark"
                                        ? "bg-blue-900/30 text-blue-300"
                                        : "bg-blue-100 text-blue-700"
                                        } font-semibold`}>
                                        {contract.clientInitials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h3 className={`font-semibold text-sm mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                        {contract.title}
                                    </h3>
                                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                        {contract.type}
                                    </p>
                                </div>
                            </div>
                            <ChevronRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${theme === "dark" ? "text-gray-500" : "text-gray-400"
                                }`} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-base font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    {contract.currency === "CAD" ? "C$" : "$"}{contract.amount.toLocaleString()}
                                </p>
                                <Badge className={`text-xs font-semibold ${contract.status.includes("WAITING")
                                    ? theme === "dark"
                                        ? "bg-yellow-900/50 text-yellow-300 border-yellow-700/50"
                                        : "bg-yellow-100 text-yellow-700 border-yellow-300"
                                    : theme === "dark"
                                        ? "bg-blue-900/50 text-blue-300 border-blue-700/50"
                                        : "bg-blue-100 text-blue-700 border-blue-300"
                                    } border`}>
                                    {contract.status}
                                </Badge>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const ContractorDashboard = () => {
    const { theme, setTheme } = useTheme();
    const { toast } = useToast();
    const [contractorType, setContractorType] = useState<ContractorType>(null);
    const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>("welcome");
    const [onboardingComplete, setOnboardingComplete] = useState(false);
    const [activeTab, setActiveTab] = useState("home");
    const [selectedContract, setSelectedContract] = useState<string | null>(null);
    const [showSignContract, setShowSignContract] = useState(false);
    const [contractSigned, setContractSigned] = useState(false);
    const [contractTab, setContractTab] = useState("details");
    const [showSettings, setShowSettings] = useState(false);
    const [settingsTab, setSettingsTab] = useState("general");
    const [verificationComplete, setVerificationComplete] = useState(false);
    const [showCompliance, setShowCompliance] = useState(false);
    const [preferredPaymentMethod, setPreferredPaymentMethod] = useState<string>("paypal");
    const [automaticWithdrawal, setAutomaticWithdrawal] = useState(false);
    const [withdrawalMethods] = useState([
        { id: "paypal", name: "PayPal", icon: Wallet },
        { id: "stripe", name: "Stripe", icon: CreditCard },
        { id: "bank", name: "Bank Transfer", icon: Building2 },
        { id: "crypto", name: "Crypto", icon: DollarSign },
    ]);

    // Individual details form state
    const [individualDetails, setIndividualDetails] = useState({
        firstName: "Jackie",
        lastName: "Fray",
        citizenOf: "Canada",
        countryOfTaxResidence: "Canada",
        legalStatus: "Individual",
        passportId: "",
        taxId: "",
        vatId: "",
        dateOfBirth: "1990-12-04",
        timezone: "America - Toronto",
        dialCode: "+1",
        phoneNumber: "9057774567",
        street: "510 Yonge Street",
        city: "Toronto",
        zipCode: "M4Y 1X9",
        country: "Canada",
        province: "Ontario",
    });

    const handleNext = () => {
        if (onboardingStep === "welcome") {
            if (contractorType === "individual") {
                setOnboardingStep("individual-details");
            }
        } else if (onboardingStep === "individual-details") {
            setOnboardingStep("address");
        } else if (onboardingStep === "address") {
            setOnboardingComplete(true);
            setOnboardingStep("complete");
            toast({
                title: "Welcome to Mind-Links!",
                description: "Your profile has been created successfully.",
            });
        }
    };

    const handleBack = () => {
        if (onboardingStep === "address") {
            setOnboardingStep("individual-details");
        } else if (onboardingStep === "individual-details") {
            setOnboardingStep("welcome");
        }
    };

    const handleSignContract = () => {
        setContractSigned(true);
        setShowSignContract(false);
        toast({
            title: "Contract signed!",
            description: "The contract has been activated successfully.",
        });
    };

    const handleCompleteVerification = () => {
        setVerificationComplete(true);
        toast({
            title: "Verification complete",
            description: "Your identity has been verified successfully.",
        });
    };

    // Welcome/Onboarding Screen
    if (!onboardingComplete) {
        return (
            <div className={`min-h-screen flex items-center justify-center p-4 ${theme === "dark"
                ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
                : "bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100"
                }`}>
                <div className={`rounded-2xl shadow-2xl w-full max-w-4xl p-8 md:p-12 ${theme === "dark" ? "bg-gray-800" : "bg-white"
                    }`}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <MindLinksLogo size="md" variant={theme === "dark" ? "light" : "dark"} />
                        <Button variant="ghost" size="sm" className="text-xs font-medium">
                            <X className="h-3 w-3 mr-1" />
                            LOG OUT
                        </Button>
                    </div>

                    {/* Progress Steps - Animated */}
                    {onboardingStep !== "welcome" && (
                        <div className="flex items-center justify-center gap-4 mb-8 relative">
                            {["Sign Up", "Individual Details", "Done!"].map((step, idx) => {
                                const stepNum = idx + 1;
                                const isActive =
                                    (onboardingStep === "individual-details" && stepNum <= 2) ||
                                    (onboardingStep === "address" && stepNum <= 2) ||
                                    (onboardingStep === "complete");
                                const isCurrent =
                                    (onboardingStep === "individual-details" && stepNum === 2) ||
                                    (onboardingStep === "address" && stepNum === 2);

                                return (
                                    <React.Fragment key={step}>
                                        <motion.div
                                            className="flex flex-col items-center gap-2 relative z-10"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.15, duration: 0.4 }}
                                        >
                                            {/* Pulse ring for current step */}
                                            {isCurrent && (
                                                <motion.div
                                                    className="absolute inset-0 rounded-full bg-primary/30"
                                                    animate={{
                                                        scale: [1, 1.4, 1],
                                                        opacity: [0.5, 0, 0.5],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                    }}
                                                />
                                            )}

                                            {/* Glow effect for completed steps */}
                                            {isActive && !isCurrent && (
                                                <motion.div
                                                    className="absolute inset-0 rounded-full bg-primary blur-md"
                                                    animate={{
                                                        opacity: [0.3, 0.6, 0.3],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                    }}
                                                />
                                            )}

                                            <motion.div
                                                className={`relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${isActive
                                                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-400/50"
                                                    : "bg-gray-200 text-gray-500 border-2 border-gray-300"
                                                    }`}
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                            >
                                                <AnimatePresence mode="wait">
                                                    {isActive ? (
                                                        <motion.div
                                                            key="check"
                                                            initial={{ scale: 0, rotate: -180 }}
                                                            animate={{ scale: 1, rotate: 0 }}
                                                            exit={{ scale: 0, rotate: 180 }}
                                                            transition={{
                                                                type: "spring",
                                                                stiffness: 300,
                                                                damping: 20,
                                                            }}
                                                        >
                                                            <CheckCircle2 className="h-5 w-5" />
                                                        </motion.div>
                                                    ) : (
                                                        <motion.span
                                                            key="number"
                                                            className="font-bold text-sm"
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{
                                                                type: "spring",
                                                                stiffness: 300,
                                                                damping: 20,
                                                            }}
                                                        >
                                                            {stepNum}
                                                        </motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>

                                            <motion.span
                                                className={`text-xs font-semibold ${isActive ? "text-gray-900 dark:text-white" : "text-gray-500"
                                                    }`}
                                                animate={{
                                                    opacity: isActive ? 1 : 0.6,
                                                }}
                                            >
                                                {step}
                                            </motion.span>
                                        </motion.div>

                                        {/* Animated Connector */}
                                        {idx < 2 && (
                                            <div className="relative w-12 h-1 -mt-5">
                                                <div className="absolute inset-0 rounded-full bg-gray-200/50" />
                                                <motion.div
                                                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: isActive ? "100%" : "0%" }}
                                                    transition={{
                                                        duration: 0.6,
                                                        delay: idx * 0.2,
                                                        ease: "easeInOut",
                                                    }}
                                                >
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                        animate={{
                                                            x: isActive ? ["-100%", "100%"] : "-100%",
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: isActive ? Infinity : 0,
                                                            ease: "linear",
                                                        }}
                                                    />
                                                </motion.div>
                                                <motion.div
                                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400"
                                                    animate={{
                                                        x: isActive ? [0, 3, 0] : 0,
                                                        opacity: isActive ? [0.5, 1, 0.5] : 0.3,
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: isActive ? Infinity : 0,
                                                        ease: "easeInOut",
                                                    }}
                                                >
                                                    <ChevronRight className="h-3 w-3" />
                                                </motion.div>
                                            </div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    )}

                    {/* Welcome Screen */}
                    {onboardingStep === "welcome" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <h1 className="text-xl font-medium mb-2">Welcome back!</h1>
                            <h2 className="text-lg font-medium mb-8 text-gray-700">
                                What kind of contractor are you?
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${contractorType === "entity"
                                        ? "border-primary bg-primary/5 shadow-md"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    onClick={() => setContractorType("entity")}
                                >
                                    <Building2 className="h-12 w-12 text-primary mb-4 mx-auto" />
                                    <h3 className="text-base font-medium mb-2">I'm an entity</h3>
                                    <p className="text-sm text-gray-600">
                                        Your entity information will be used on invoices and tax documentation.
                                    </p>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${contractorType === "individual"
                                        ? "border-primary bg-primary/5 shadow-md"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    onClick={() => setContractorType("individual")}
                                >
                                    <User className="h-12 w-12 text-primary mb-4 mx-auto" />
                                    <h3 className="text-base font-medium mb-2">I'm an individual</h3>
                                    <p className="text-sm text-gray-600">
                                        Your full information will be used on invoices and tax documentation.
                                    </p>
                                </motion.div>
                            </div>

                            <Button
                                onClick={handleNext}
                                disabled={!contractorType}
                                className="w-full md:w-auto min-w-[200px]"
                                size="lg"
                            >
                                Next
                            </Button>

                            <p className="text-sm text-gray-500 mt-4">
                                <Button variant="link" className="p-0 h-auto text-sm">
                                    SWITCH BACK TO CLIENT PROFILE
                                </Button>
                            </p>
                        </motion.div>
                    )}

                    {/* Individual Details Form */}
                    {onboardingStep === "individual-details" && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1 className="text-xl font-medium mb-2">Hey {individualDetails.firstName}, welcome to Mind-Links!</h1>
                            <p className="text-sm text-gray-600 mb-8">
                                To get started please provide your company information accurately. It will be used for all your documents on Mind-Links.
                            </p>

                            <Card className="mb-6">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-4">
                                        <Avatar className="h-16 w-16">
                                            <AvatarFallback className="bg-primary/10 text-primary text-lg">
                                                {individualDetails.firstName[0]}{individualDetails.lastName[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <Button variant="link" className="p-0 h-auto">
                                            Upload Avatar
                                        </Button>
                                    </div>
                                    <CardTitle>Individual</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="firstName">First name</Label>
                                            <Input
                                                id="firstName"
                                                value={individualDetails.firstName}
                                                onChange={(e) => setIndividualDetails({ ...individualDetails, firstName: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName">Last name</Label>
                                            <Input
                                                id="lastName"
                                                value={individualDetails.lastName}
                                                onChange={(e) => setIndividualDetails({ ...individualDetails, lastName: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="citizenOf">I'm a citizen of</Label>
                                            <Select value={individualDetails.citizenOf} onValueChange={(value) => setIndividualDetails({ ...individualDetails, citizenOf: value })}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Canada">Canada</SelectItem>
                                                    <SelectItem value="USA">United States</SelectItem>
                                                    <SelectItem value="UK">United Kingdom</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="taxResidence">Country of tax residence</Label>
                                            <Select value={individualDetails.countryOfTaxResidence} onValueChange={(value) => setIndividualDetails({ ...individualDetails, countryOfTaxResidence: value })}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Canada">Canada</SelectItem>
                                                    <SelectItem value="USA">United States</SelectItem>
                                                    <SelectItem value="UK">United Kingdom</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="legalStatus">Legal status</Label>
                                            <Select value={individualDetails.legalStatus} onValueChange={(value) => setIndividualDetails({ ...individualDetails, legalStatus: value })}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Individual">Individual</SelectItem>
                                                    <SelectItem value="Entity">Entity</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="passportId">Passport/ID number</Label>
                                            <Input
                                                id="passportId"
                                                value={individualDetails.passportId}
                                                onChange={(e) => setIndividualDetails({ ...individualDetails, passportId: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="taxId">Tax ID (Optional)</Label>
                                            <Input
                                                id="taxId"
                                                value={individualDetails.taxId}
                                                onChange={(e) => setIndividualDetails({ ...individualDetails, taxId: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="vatId">Vat ID (Optional)</Label>
                                            <Input
                                                id="vatId"
                                                value={individualDetails.vatId}
                                                onChange={(e) => setIndividualDetails({ ...individualDetails, vatId: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="dateOfBirth">Date of birth</Label>
                                            <Input
                                                id="dateOfBirth"
                                                type="date"
                                                value={individualDetails.dateOfBirth}
                                                onChange={(e) => setIndividualDetails({ ...individualDetails, dateOfBirth: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="timezone">Timezone</Label>
                                            <Select value={individualDetails.timezone} onValueChange={(value) => setIndividualDetails({ ...individualDetails, timezone: value })}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="America - Toronto">America - Toronto</SelectItem>
                                                    <SelectItem value="America - New York">America - New York</SelectItem>
                                                    <SelectItem value="Europe - London">Europe - London</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex gap-4">
                                <Button variant="outline" onClick={handleBack}>
                                    ← Back
                                </Button>
                                <Button onClick={handleNext} className="flex-1">
                                    Continue
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Address Form */}
                    {onboardingStep === "address" && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1 className="text-xl font-medium mb-2">Complete your profile</h1>
                            <p className="text-gray-600 mb-8">
                                Please provide your contact and address information.
                            </p>

                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle>Contact & Address</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="dialCode">Dial code</Label>
                                            <Select value={individualDetails.dialCode} onValueChange={(value) => setIndividualDetails({ ...individualDetails, dialCode: value })}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="+1">CA +1</SelectItem>
                                                    <SelectItem value="+1">US +1</SelectItem>
                                                    <SelectItem value="+44">UK +44</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="phoneNumber">Phone number</Label>
                                            <Input
                                                id="phoneNumber"
                                                value={individualDetails.phoneNumber}
                                                onChange={(e) => setIndividualDetails({ ...individualDetails, phoneNumber: e.target.value })}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Label htmlFor="street">Street</Label>
                                            <Input
                                                id="street"
                                                value={individualDetails.street}
                                                onChange={(e) => setIndividualDetails({ ...individualDetails, street: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="city">City</Label>
                                            <Input
                                                id="city"
                                                value={individualDetails.city}
                                                onChange={(e) => setIndividualDetails({ ...individualDetails, city: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="zipCode">Zip code/Post code</Label>
                                            <Input
                                                id="zipCode"
                                                value={individualDetails.zipCode}
                                                onChange={(e) => setIndividualDetails({ ...individualDetails, zipCode: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="country">Country</Label>
                                            <Select value={individualDetails.country} onValueChange={(value) => setIndividualDetails({ ...individualDetails, country: value })}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Canada">Canada</SelectItem>
                                                    <SelectItem value="USA">United States</SelectItem>
                                                    <SelectItem value="UK">United Kingdom</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="province">Province</Label>
                                            <Select value={individualDetails.province} onValueChange={(value) => setIndividualDetails({ ...individualDetails, province: value })}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Ontario">Ontario</SelectItem>
                                                    <SelectItem value="Quebec">Quebec</SelectItem>
                                                    <SelectItem value="British Columbia">British Columbia</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex gap-4">
                                <Button variant="outline" onClick={handleBack}>
                                    ← Back
                                </Button>
                                <Button onClick={handleNext} className="flex-1">
                                    Complete Setup
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        );
    }

    // Main Dashboard
    return (
        <div className={`min-h-screen ${theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100"
            }`}>
            <div className="flex">
                {/* Premium Sidebar */}
                <aside className={`w-72 border-r min-h-screen flex flex-col backdrop-blur-sm ${theme === "dark"
                    ? "bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 border-gray-800/50"
                    : "bg-gradient-to-b from-white via-gray-50/50 to-white border-gray-200/50"
                    }`}>
                    <div className={`p-6 border-b ${theme === "dark" ? "border-gray-800/50" : "border-gray-200/50"}`}>
                        <div className="flex flex-col gap-2">
                            <MindLinksLogo size="md" variant={theme === "dark" ? "light" : "dark"} />
                            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Contractor Portal
                            </p>
                        </div>
                    </div>

                    <nav className="flex-1 p-4 space-y-2">
                        <Button
                            variant={activeTab === "home" ? "secondary" : "ghost"}
                            className={`w-full justify-start h-12 rounded-xl font-semibold transition-all ${activeTab === "home"
                                ? theme === "dark"
                                    ? "bg-blue-900/30 text-blue-300 border border-blue-800/50 shadow-lg shadow-blue-900/20"
                                    : "bg-blue-50 text-blue-700 border border-blue-200 shadow-md"
                                : theme === "dark"
                                    ? "hover:bg-blue-900/20 !text-gray-300 hover:!text-gray-300"
                                    : "hover:bg-blue-50/50 !text-gray-700 hover:!text-gray-700"
                                }`}
                            onClick={() => {
                                setActiveTab("home");
                                setSelectedContract(null);
                            }}
                        >
                            <Home className={`h-5 w-5 mr-3 ${activeTab === "home" ? "" : "opacity-70"}`} />
                            Dashboard
                        </Button>
                        <Button
                            variant={activeTab === "contracts" ? "secondary" : "ghost"}
                            className={`w-full justify-start h-12 rounded-xl font-semibold transition-all ${activeTab === "contracts"
                                ? theme === "dark"
                                    ? "bg-blue-900/30 text-blue-300 border border-blue-800/50 shadow-lg shadow-blue-900/20"
                                    : "bg-blue-50 text-blue-700 border border-blue-200 shadow-md"
                                : theme === "dark"
                                    ? "hover:bg-blue-900/20 !text-gray-300 hover:!text-gray-300"
                                    : "hover:bg-blue-50/50 !text-gray-700 hover:!text-gray-700"
                                }`}
                            onClick={() => {
                                setActiveTab("contracts");
                                setSelectedContract(null);
                            }}
                        >
                            <FileText className={`h-5 w-5 mr-3 ${activeTab === "contracts" ? "" : "opacity-70"}`} />
                            Contracts
                        </Button>
                        <Button
                            variant={activeTab === "compliance" ? "secondary" : "ghost"}
                            className={`w-full justify-start h-12 rounded-xl font-semibold transition-all ${activeTab === "compliance"
                                ? theme === "dark"
                                    ? "bg-blue-900/30 text-blue-300 border border-blue-800/50 shadow-lg shadow-blue-900/20"
                                    : "bg-blue-50 text-blue-700 border border-blue-200 shadow-md"
                                : theme === "dark"
                                    ? "hover:bg-blue-900/20 !text-gray-300 hover:!text-gray-300"
                                    : "hover:bg-blue-50/50 !text-gray-700 hover:!text-gray-700"
                                }`}
                            onClick={() => {
                                setActiveTab("compliance");
                                setShowCompliance(true);
                                setSelectedContract(null);
                            }}
                        >
                            <Shield className={`h-5 w-5 mr-3 ${activeTab === "compliance" ? "" : "opacity-70"}`} />
                            Compliance
                        </Button>
                        <Button
                            variant={activeTab === "transactions" ? "secondary" : "ghost"}
                            className={`w-full justify-start h-12 rounded-xl font-semibold transition-all ${activeTab === "transactions"
                                ? theme === "dark"
                                    ? "bg-blue-900/30 text-blue-300 border border-blue-800/50 shadow-lg shadow-blue-900/20"
                                    : "bg-blue-50 text-blue-700 border border-blue-200 shadow-md"
                                : theme === "dark"
                                    ? "hover:bg-blue-900/20 !text-gray-300 hover:!text-gray-300"
                                    : "hover:bg-blue-50/50 !text-gray-700 hover:!text-gray-700"
                                }`}
                            onClick={() => {
                                setActiveTab("transactions");
                                setSelectedContract(null);
                            }}
                        >
                            <ArrowLeftRight className={`h-5 w-5 mr-3 ${activeTab === "transactions" ? "" : "opacity-70"}`} />
                            Transactions
                        </Button>
                        <Separator className={`my-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`} />
                        <Button
                            variant={activeTab === "settings" ? "secondary" : "ghost"}
                            className={`w-full justify-start h-12 rounded-xl font-semibold transition-all ${activeTab === "settings"
                                ? theme === "dark"
                                    ? "bg-blue-900/30 text-blue-300 border border-blue-800/50 shadow-lg shadow-blue-900/20"
                                    : "bg-blue-50 text-blue-700 border border-blue-200 shadow-md"
                                : theme === "dark"
                                    ? "hover:bg-blue-900/20 !text-gray-300 hover:!text-gray-300"
                                    : "hover:bg-blue-50/50 !text-gray-700 hover:!text-gray-700"
                                }`}
                            onClick={() => {
                                setActiveTab("settings");
                                setShowSettings(true);
                                setSelectedContract(null);
                            }}
                        >
                            <Settings className={`h-5 w-5 mr-3 ${activeTab === "settings" ? "" : "opacity-70"}`} />
                            Settings
                            {!verificationComplete && (
                                <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-bold ${theme === "dark" ? "bg-red-900/50 text-red-300" : "bg-red-100 text-red-600"
                                    }`}>
                                    !
                                </span>
                            )}
                        </Button>
                    </nav>

                    <div className={`p-4 border-t ${theme === "dark" ? "border-gray-800/50" : "border-gray-200/50"}`}>
                        <div className={`p-4 rounded-xl ${theme === "dark" ? "bg-gray-800/50" : "bg-gray-50"
                            }`}>
                            <div className="flex items-center gap-3 mb-3">
                                <Avatar className="h-12 w-12 ring-2 ring-offset-2 ring-blue-500/20">
                                    <AvatarFallback className={`${theme === "dark" ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"
                                        } font-bold`}>
                                        {individualDetails.firstName[0]}{individualDetails.lastName[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className={`font-bold text-sm truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                            {individualDetails.firstName} {individualDetails.lastName}
                                        </p>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className={`h-6 w-6 rounded-lg ${theme === "dark" ? "hover:bg-blue-900/20" : "hover:bg-blue-50/50"
                                                }`}
                                            onClick={() => {
                                                toast({
                                                    title: "Logged out",
                                                    description: "You have been successfully logged out.",
                                                });
                                            }}
                                        >
                                            <LogOut className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    {!verificationComplete && (
                                        <Badge className={`mt-1 text-xs font-bold ${theme === "dark" ? "bg-red-900/50 text-red-300" : "bg-red-100 text-red-600"
                                            }`}>
                                            UNVERIFIED
                                        </Badge>
                                    )}
                                    <p className={`text-xs mt-1 truncate ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                        jfray-demo@demo.co
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className={`flex-1 p-8 ${theme === "dark" ? "bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800" : "bg-gradient-to-br from-gray-50 via-white to-gray-50"
                    }`}>
                    {/* Premium Header */}
                    <div className={`mb-8 rounded-xl border p-6 ${theme === "dark"
                        ? "bg-gradient-to-r from-gray-800/50 via-gray-800/30 to-gray-800/50 border-gray-700/50"
                        : "bg-gradient-to-r from-white via-blue-50/30 to-white border-blue-100/50 shadow-sm"
                        }`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12 ring-2 ring-offset-2 ring-blue-500/20">
                                    <AvatarFallback className={`${theme === "dark" ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"
                                        } font-bold text-lg`}>
                                        {individualDetails.firstName[0]}{individualDetails.lastName[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h1 className={`text-2xl font-bold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                        Hello, {individualDetails.firstName}!
                                    </h1>
                                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`rounded-full ${theme === "dark" ? "hover:bg-blue-900/20" : "hover:bg-blue-50/50"}`}
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                >
                                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`rounded-full relative ${theme === "dark" ? "hover:bg-blue-900/20" : "hover:bg-blue-50/50"}`}
                                >
                                    <Bell className="h-5 w-5" />
                                    <span className={`absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 ${theme === "dark" ? "border-gray-800" : "border-white"}`}></span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`rounded-full ${theme === "dark" ? "hover:bg-blue-900/20" : "hover:bg-blue-50/50"}`}
                                >
                                    <HelpCircle className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Content */}
                    {activeTab === "home" && !selectedContract && (
                        <div className="space-y-6">
                            {/* Account Activation Card */}
                            {!verificationComplete && (
                                <Card className={`border ${theme === "dark" ? "border-red-500/50 bg-red-950/20" : "border-red-200 bg-red-50"}`}>
                                    <CardContent className="p-3">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-2">
                                                <AlertCircle className={`h-4 w-4 ${theme === "dark" ? "text-red-400" : "text-red-600"}`} />
                                                <div>
                                                    <p className={`text-xs font-medium ${theme === "dark" ? "text-red-300" : "text-red-700"}`}>
                                                        Account activation required
                                                    </p>
                                                    <p className={`text-xs ${theme === "dark" ? "text-red-400/80" : "text-red-600/80"}`}>
                                                        Please provide identification documents to withdraw your balance.
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() => {
                                                    setActiveTab("settings");
                                                    setShowSettings(true);
                                                    setSettingsTab("verification");
                                                }}
                                                className={`text-xs font-medium ${theme === "dark" ? "bg-red-600 hover:bg-red-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"}`}
                                                size="sm"
                                            >
                                                Complete Activation
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Premium Balance Card */}
                                <Card className={`relative overflow-hidden border-0 shadow-xl ${theme === "dark"
                                    ? "bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-purple-900/20 border-blue-800/30"
                                    : "bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50 border-blue-200"
                                    }`}>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -ml-12 -mb-12"></div>
                                    <CardHeader className="pb-3 relative z-10">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className={`text-sm font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                                Total Balance
                                            </CardTitle>
                                            <Wallet className={`h-5 w-5 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0 relative z-10">
                                        <div className={`text-4xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                            $61,520.00
                                        </div>
                                        <p className={`text-xs mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                            Available for withdrawal
                                        </p>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button className="w-full" disabled={!verificationComplete}>
                                                    Withdraw
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Request Withdrawal</DialogTitle>
                                                    <DialogDescription>
                                                        Select your withdrawal method and amount
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="space-y-4 py-4">
                                                    <div>
                                                        <Label>Withdrawal Method</Label>
                                                        <Select value={preferredPaymentMethod} onValueChange={setPreferredPaymentMethod}>
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {withdrawalMethods.map((method) => (
                                                                    <SelectItem key={method.id} value={method.id}>
                                                                        {method.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Using your preferred method: <strong>{withdrawalMethods.find((m) => m.id === preferredPaymentMethod)?.name}</strong>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <Label>Amount (USD)</Label>
                                                        <Input type="number" placeholder="Enter amount" defaultValue="61520" />
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Available balance: $61,520.00
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <Label>Convert to Currency (Optional)</Label>
                                                        <Select defaultValue="USD">
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="USD">USD - US Dollar</SelectItem>
                                                                <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                                                                <SelectItem value="EUR">EUR - Euro</SelectItem>
                                                                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Amount will be converted using current exchange rates
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-2 pt-4">
                                                        <Button variant="outline" className="flex-1">Cancel</Button>
                                                        <Button className="flex-1">Request Withdrawal</Button>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </CardContent>
                                </Card>

                                {/* Premium Contracts Card */}
                                <Card className={`shadow-xl border-0 ${theme === "dark" ? "bg-gray-800/50 border-gray-700/50" : "bg-white border-gray-200"}`}>
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"
                                                    }`}>
                                                    <FileText className={`h-4 w-4 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
                                                </div>
                                                <CardTitle className={`text-base font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                                    Active Contracts
                                                </CardTitle>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                className="text-xs h-auto p-0 font-semibold"
                                                onClick={() => setActiveTab("contracts")}
                                            >
                                                View All ({mockContracts.length})
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="space-y-3">
                                            {mockContracts.map((contract) => (
                                                <motion.div
                                                    key={contract.id}
                                                    whileHover={{ scale: 1.02 }}
                                                    className={`group border rounded-xl p-4 cursor-pointer transition-all duration-300 ${theme === "dark"
                                                        ? "border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800/50 bg-gray-800/30"
                                                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 bg-white"
                                                        }`}
                                                    onClick={() => setSelectedContract(contract.id)}
                                                >
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex items-center gap-3 flex-1">
                                                            <Avatar className="h-10 w-10 ring-2 ring-offset-2 ring-blue-500/20">
                                                                <AvatarFallback className={`${theme === "dark"
                                                                    ? "bg-blue-900/30 text-blue-300"
                                                                    : "bg-blue-100 text-blue-700"
                                                                    } font-semibold`}>
                                                                    {contract.clientInitials}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex-1">
                                                                <h3 className={`font-semibold text-sm mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                                                    {contract.title}
                                                                </h3>
                                                                <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                                    {contract.type}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <ChevronRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${theme === "dark" ? "text-gray-500" : "text-gray-400"
                                                            }`} />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className={`text-base font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                                                {contract.currency === "CAD" ? "C$" : "$"}{contract.amount.toLocaleString()}
                                                            </p>
                                                            <Badge className={`text-xs font-semibold ${contract.status.includes("WAITING")
                                                                ? theme === "dark"
                                                                    ? "bg-yellow-900/50 text-yellow-300 border-yellow-700/50"
                                                                    : "bg-yellow-100 text-yellow-700 border-yellow-300"
                                                                : theme === "dark"
                                                                    ? "bg-blue-900/50 text-blue-300 border-blue-700/50"
                                                                    : "bg-blue-100 text-blue-700 border-blue-300"
                                                                } border`}>
                                                                {contract.status}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Premium Transactions History */}
                                <Card className={`shadow-xl border-0 ${theme === "dark" ? "bg-gray-800/50 border-gray-700/50" : "bg-white border-gray-200"}`}>
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${theme === "dark" ? "bg-green-900/30" : "bg-green-100"
                                                }`}>
                                                <ArrowLeftRight className={`h-4 w-4 ${theme === "dark" ? "text-green-400" : "text-green-600"}`} />
                                            </div>
                                            <CardTitle className={`text-base font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                                Recent Transactions
                                            </CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="space-y-3">
                                            {mockTransactions.map((transaction, idx) => (
                                                <motion.div
                                                    key={transaction.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${theme === "dark"
                                                        ? "border-gray-700/50 hover:bg-gray-800/50 bg-gray-800/30"
                                                        : "border-gray-200 hover:bg-gray-50 bg-white"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${theme === "dark" ? "bg-green-900/30" : "bg-green-100"
                                                            }`}>
                                                            <Building2 className={`h-5 w-5 ${theme === "dark" ? "text-green-400" : "text-green-600"}`} />
                                                        </div>
                                                        <div>
                                                            <p className={`font-semibold text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                                                From {transaction.from}
                                                            </p>
                                                            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                                {transaction.date}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className={`text-base font-bold mb-1 ${theme === "dark" ? "text-green-400" : "text-green-600"}`}>
                                                            + ${transaction.amount.toLocaleString()}.00
                                                        </p>
                                                        <Badge className={`text-xs ${theme === "dark"
                                                            ? "bg-green-900/50 text-green-300"
                                                            : "bg-green-100 text-green-700"
                                                            }`}>
                                                            {transaction.status}
                                                        </Badge>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                        <Button
                                            variant="ghost"
                                            className="w-full mt-4 font-semibold"
                                            onClick={() => setActiveTab("transactions")}
                                        >
                                            View All Transactions
                                            <ChevronRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Premium Upcoming Payments */}
                                <Card className={`shadow-xl border-0 ${theme === "dark" ? "bg-gray-800/50 border-gray-700/50" : "bg-white border-gray-200"}`}>
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${theme === "dark" ? "bg-purple-900/30" : "bg-purple-100"
                                                }`}>
                                                <Calendar className={`h-4 w-4 ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`} />
                                            </div>
                                            <CardTitle className={`text-base font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                                Upcoming Payments
                                            </CardTitle>
                                            <Badge className={`ml-auto ${theme === "dark" ? "bg-purple-900/50 text-purple-300" : "bg-purple-100 text-purple-700"
                                                }`}>
                                                2
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="space-y-3">
                                            <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${theme === "dark"
                                                ? "border-purple-700/30 hover:bg-purple-900/20 bg-purple-900/10"
                                                : "border-purple-200 hover:bg-purple-50/50 bg-purple-50/30"
                                                }`}>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-12 w-12 ring-2 ring-purple-500/20">
                                                        <AvatarFallback className={`${theme === "dark" ? "bg-purple-900/30 text-purple-300" : "bg-purple-100 text-purple-700"
                                                            } font-semibold`}>
                                                            ML
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className={`font-semibold text-sm mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                                            Mind-Links Global
                                                        </p>
                                                        <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                            PAYDAY MAR 1ST, 2022
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-lg font-bold mb-1 ${theme === "dark" ? "text-green-400" : "text-green-600"}`}>
                                                        +$9,120.00
                                                    </p>
                                                    <Badge className={`text-xs ${theme === "dark"
                                                        ? "bg-green-900/50 text-green-300"
                                                        : "bg-green-100 text-green-700"
                                                        }`}>
                                                        Scheduled
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* Contract Details View */}
                    {selectedContract && activeTab === "home" && (
                        <ContractDetailsView
                            contract={mockContracts.find((c) => c.id === selectedContract)!}
                            onBack={() => setSelectedContract(null)}
                            onSign={() => setShowSignContract(true)}
                            contractSigned={contractSigned}
                            contractTab={contractTab}
                            onTabChange={setContractTab}
                        />
                    )}

                    {/* Settings View */}
                    {showSettings && activeTab === "settings" && (
                        <SettingsView
                            settingsTab={settingsTab}
                            onTabChange={setSettingsTab}
                            verificationComplete={verificationComplete}
                            onCompleteVerification={handleCompleteVerification}
                            preferredPaymentMethod={preferredPaymentMethod}
                            setPreferredPaymentMethod={setPreferredPaymentMethod}
                            automaticWithdrawal={automaticWithdrawal}
                            setAutomaticWithdrawal={setAutomaticWithdrawal}
                            withdrawalMethods={withdrawalMethods}
                            individualDetails={individualDetails}
                            setIndividualDetails={setIndividualDetails}
                            onNavigateToCompliance={() => {
                                setActiveTab("compliance");
                                setShowCompliance(true);
                            }}
                        />
                    )}

                    {/* Compliance Documents View */}
                    {showCompliance && activeTab === "compliance" && (
                        <ComplianceDocumentsView />
                    )}

                    {/* Contracts View */}
                    {activeTab === "contracts" && !selectedContract && (
                        <ContractsView contracts={mockContracts} onSelectContract={(id) => setSelectedContract(id)} />
                    )}

                    {/* Contract Details View from Contracts Page */}
                    {selectedContract && activeTab === "contracts" && (
                        <ContractDetailsView
                            contract={mockContracts.find((c) => c.id === selectedContract)!}
                            onBack={() => setSelectedContract(null)}
                            onSign={() => setShowSignContract(true)}
                            contractSigned={contractSigned}
                            contractTab={contractTab}
                            onTabChange={setContractTab}
                        />
                    )}

                    {/* Transactions View */}
                    {activeTab === "transactions" && (
                        <TransactionsView transactions={mockTransactions} />
                    )}
                </main>
            </div>

            {/* Sign Contract Dialog */}
            <Dialog open={showSignContract} onOpenChange={setShowSignContract}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-medium">CONTRACTOR AGREEMENT</DialogTitle>
                        <DialogDescription>REF: Jv1oWI8n</DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[500px] p-4 border rounded-lg">
                        <div className="space-y-4">
                            <div>
                                <p className="font-medium text-sm">Effective Date: February 15th, 2022</p>
                                <p className="mt-2">
                                    This Contractor Agreement ("Agreement") is entered into on February 15th, 2022 ("Effective Date") by and between:
                                </p>
                                <p className="mt-2">
                                    <strong>Mind-Links EOR, CA General partnership</strong> (Client) and{" "}
                                    <strong>{individualDetails.firstName} {individualDetails.lastName}, a Individual</strong> (Contractor).
                                </p>
                            </div>
                            <Separator />
                            <div>
                                <p className="font-medium text-sm mb-2">Purpose</p>
                                <p>
                                    Client and Contractor desire to have Contractor perform services for Client, subject to and in accordance with the terms and conditions of this Agreement.
                                </p>
                            </div>
                            <Separator />
                            <div className="space-y-4">
                                <div>
                                    <Label>Client Signature</Label>
                                    <div className="border rounded p-4 mt-2">
                                        <p className="font-medium text-base">Dean Torphy</p>
                                        <p className="text-sm text-gray-500">Client Signature</p>
                                    </div>
                                </div>
                                <div>
                                    <Label>Enter your full name (Contractor Signature)</Label>
                                    <Input
                                        placeholder={`${individualDetails.firstName} ${individualDetails.lastName}`}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                    <div className="flex gap-4 mt-4">
                        <Button variant="outline" onClick={() => setShowSignContract(false)}>
                            ← Back
                        </Button>
                        <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                        </Button>
                        <Button onClick={handleSignContract} className="flex-1">
                            Agree & Sign
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

// Contract Details View Component
const ContractDetailsView = ({
    contract,
    onBack,
    onSign,
    contractSigned,
    contractTab,
    onTabChange,
}: {
    contract: typeof mockContracts[0];
    onBack: () => void;
    onSign: () => void;
    contractSigned: boolean;
    contractTab: string;
    onTabChange: (tab: string) => void;
}) => {
    const { theme } = useTheme();

    return (
        <div className="space-y-6">
            {/* Premium Header */}
            <div className={`p-6 rounded-2xl border-2 shadow-xl ${theme === "dark"
                ? "bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-800/50 border-gray-700/50"
                : "bg-gradient-to-br from-white via-blue-50/30 to-white border-blue-200/50"
                }`}>
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`rounded-xl ${theme === "dark" ? "hover:bg-blue-900/20" : "hover:bg-blue-50/50"
                                    }`}
                                onClick={onBack}
                            >
                                <ArrowLeftRight className="h-4 w-4 mr-2" />
                                Back
                            </Button>
                            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
                            <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                {contract.title}
                            </h1>
                            <Eye className={`h-5 w-5 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`} />
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            {contractSigned ? (
                                <Badge className={`px-4 py-1.5 text-sm font-bold ${theme === "dark"
                                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-900/30"
                                    : "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                                    }`}>
                                    Active Fixed
                                </Badge>
                            ) : (
                                <Badge className={`px-4 py-1.5 text-sm font-bold ${theme === "dark"
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/30"
                                    : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                                    }`}>
                                    {contract.status}
                                </Badge>
                            )}
                            <Badge variant="outline" className="px-3 py-1.5 text-sm font-semibold">
                                Fixed Rate
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Steps - Full Width with Animations */}
            <div className={`w-full relative p-6 rounded-xl overflow-hidden ${theme === "dark"
                ? "bg-gradient-to-r from-gray-800 via-gray-800/95 to-gray-800 border border-gray-700/50 shadow-2xl"
                : "bg-gradient-to-r from-white via-blue-50/30 to-white border border-blue-100/50 shadow-lg"
                }`}>
                {/* Animated background gradient */}
                <motion.div
                    className={`absolute inset-0 opacity-10 ${theme === "dark"
                        ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
                        : "bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"
                        }`}
                    animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        backgroundSize: "200% 200%",
                    }}
                />

                <div className="relative flex items-center justify-between">
                    {["Create", "Review & Sign", "Invite contractor", "Contractor signs", "Activated!"].map((step, idx) => {
                        const isComplete = contractSigned ? idx < 5 : idx < 3;
                        const isActive = contractSigned ? idx === 4 : idx === 3;
                        const isPending = !isComplete && !isActive;

                        return (
                            <React.Fragment key={step}>
                                <motion.div
                                    className="flex flex-col items-center gap-3 flex-1 relative z-10"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                >
                                    {/* Step Circle */}
                                    <motion.div
                                        className="relative"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        {/* Pulse ring for active step */}
                                        {isActive && (
                                            <motion.div
                                                className={`absolute inset-0 rounded-full ${theme === "dark"
                                                    ? "bg-blue-500/30"
                                                    : "bg-blue-400/30"
                                                    }`}
                                                animate={{
                                                    scale: [1, 1.5, 1],
                                                    opacity: [0.5, 0, 0.5],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                }}
                                            />
                                        )}

                                        {/* Glow effect for completed steps */}
                                        {isComplete && (
                                            <motion.div
                                                className={`absolute inset-0 rounded-full blur-md ${theme === "dark"
                                                    ? "bg-blue-500"
                                                    : "bg-blue-400"
                                                    }`}
                                                animate={{
                                                    opacity: [0.3, 0.6, 0.3],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                }}
                                            />
                                        )}

                                        {/* Main circle */}
                                        <motion.div
                                            className={`relative w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transition-all duration-500 ${isComplete
                                                ? theme === "dark"
                                                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-500/50"
                                                    : "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-400/50"
                                                : isActive
                                                    ? theme === "dark"
                                                        ? "bg-gradient-to-br from-blue-600/80 to-indigo-600/80 text-white shadow-blue-500/30 ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-800"
                                                        : "bg-gradient-to-br from-blue-400/80 to-indigo-500/80 text-white shadow-blue-300/30 ring-2 ring-blue-300 ring-offset-2 ring-offset-white"
                                                    : theme === "dark"
                                                        ? "bg-gray-700/50 text-gray-400 border-2 border-gray-600"
                                                        : "bg-gray-200/50 text-gray-500 border-2 border-gray-300"
                                                }`}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 20,
                                                delay: idx * 0.1,
                                            }}
                                        >
                                            <AnimatePresence mode="wait">
                                                {isComplete ? (
                                                    <motion.div
                                                        key="check"
                                                        initial={{ scale: 0, rotate: -180 }}
                                                        animate={{ scale: 1, rotate: 0 }}
                                                        exit={{ scale: 0, rotate: 180 }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 300,
                                                            damping: 20,
                                                        }}
                                                    >
                                                        <CheckCircle2 className="h-6 w-6" />
                                                    </motion.div>
                                                ) : (
                                                    <motion.span
                                                        key="number"
                                                        className="font-bold text-sm"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 300,
                                                            damping: 20,
                                                        }}
                                                    >
                                                        {idx + 1}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    </motion.div>

                                    {/* Step Label */}
                                    <motion.span
                                        className={`text-xs font-semibold text-center px-2 ${isComplete
                                            ? theme === "dark"
                                                ? "text-white"
                                                : "text-gray-900"
                                            : isActive
                                                ? theme === "dark"
                                                    ? "text-blue-300"
                                                    : "text-blue-600"
                                                : theme === "dark"
                                                    ? "text-gray-400"
                                                    : "text-gray-500"
                                            }`}
                                        animate={{
                                            opacity: isPending ? 0.6 : 1,
                                        }}
                                    >
                                        {step}
                                    </motion.span>
                                </motion.div>

                                {/* Animated Connector Line */}
                                {idx < 4 && (
                                    <div className="flex-1 mx-2 relative h-1 -mt-6 z-0">
                                        {/* Background line */}
                                        <div className={`absolute inset-0 rounded-full ${theme === "dark"
                                            ? "bg-gray-700/50"
                                            : "bg-gray-200/50"
                                            }`} />

                                        {/* Animated progress line */}
                                        <motion.div
                                            className={`absolute inset-y-0 left-0 rounded-full ${isComplete
                                                ? theme === "dark"
                                                    ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500"
                                                    : "bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400"
                                                : "bg-transparent"
                                                }`}
                                            initial={{ width: 0 }}
                                            animate={{ width: isComplete ? "100%" : "0%" }}
                                            transition={{
                                                duration: 0.8,
                                                delay: idx * 0.15,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            {/* Shimmer effect */}
                                            {isComplete && (
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                    animate={{
                                                        x: ["-100%", "100%"],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "linear",
                                                    }}
                                                />
                                            )}
                                        </motion.div>

                                        {/* Animated arrow */}
                                        <motion.div
                                            className={`absolute right-0 top-1/2 -translate-y-1/2 ${theme === "dark"
                                                ? "text-gray-600"
                                                : "text-gray-400"
                                                }`}
                                            animate={{
                                                x: isComplete ? [0, 5, 0] : 0,
                                                opacity: isComplete ? [0.5, 1, 0.5] : 0.3,
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: isComplete ? Infinity : 0,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </motion.div>
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* Tabs - Full Width */}
            <Tabs value={contractTab} onValueChange={onTabChange} className="w-full">
                <TabsList className={`w-full ${theme === "dark" ? "bg-gray-800" : ""}`}>
                    <TabsTrigger value="details" className="flex-1">Contract Details</TabsTrigger>
                    <TabsTrigger value="timeoff" className="flex-1">Time Off</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-6">
                    <div className="space-y-6">
                        {/* Contract Document Card */}
                        <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "border-blue-200 bg-blue-50/30"}`}>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"
                                            }`}>
                                            <FileText className={`h-6 w-6 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Standard Mind-Links Contract</p>
                                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                                This contract is using the standard Mind-Links contract template
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4 mr-2" />
                                        Download PDF
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contract Information Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Basic Information */}
                            <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : ""}`}>
                                <CardHeader>
                                    <CardTitle className="text-base">Basic Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}`}>
                                        <p className={`text-xs mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Contractor's start date</p>
                                        <p className="font-semibold">Feb 15th, 2022</p>
                                    </div>
                                    <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}`}>
                                        <p className={`text-xs mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Contract type</p>
                                        <div className="flex items-center gap-2">
                                            <Badge className={`${theme === "dark" ? "bg-blue-600" : "bg-blue-100 text-blue-700"}`}>Fixed rate</Badge>
                                        </div>
                                    </div>
                                    <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}`}>
                                        <p className={`text-xs mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Entity</p>
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold">Mind-Links EOR</p>
                                            <Eye className={`h-4 w-4 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Role Information */}
                            <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : ""}`}>
                                <CardHeader>
                                    <CardTitle className="text-base">Role Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}`}>
                                        <p className={`text-xs mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Job title</p>
                                        <p className="font-semibold">Design</p>
                                    </div>
                                    <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}`}>
                                        <p className={`text-xs mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Seniority level</p>
                                        <p className="font-semibold">Senior (Individual Contributor Level 3)</p>
                                    </div>
                                    <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}`}>
                                        <p className={`text-xs mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Country compliance</p>
                                        <p className="font-semibold">Ontario (Canada)</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Payment Information */}
                        <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : ""}`}>
                            <CardHeader>
                                <CardTitle className="text-base">Payment Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className={`p-4 rounded-lg border-2 ${theme === "dark" ? "border-blue-700/50 bg-blue-900/10" : "border-blue-200 bg-blue-50/50"
                                        }`}>
                                        <p className={`text-xs mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>First payment</p>
                                        <p className="text-2xl font-bold mb-1">C$4,000</p>
                                        <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Full amount</p>
                                    </div>
                                    <div className={`p-4 rounded-lg border-2 ${theme === "dark" ? "border-gray-700" : "border-gray-200"
                                        }`}>
                                        <p className={`text-xs mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Payment date</p>
                                        <p className="text-xl font-semibold mb-1">Feb 28th, 2022</p>
                                        <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Due in 19 days</p>
                                    </div>
                                </div>
                                <div className={`flex items-center justify-between p-4 rounded-lg border ${theme === "dark" ? "border-gray-700 bg-gray-700/30" : "border-gray-200 bg-gray-50"
                                    }`}>
                                    <div>
                                        <p className="font-semibold text-sm mb-1">Pay ahead of the weekend</p>
                                        <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                            If the payment due is on a weekend, pay on Friday
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Scope & Responsibilities */}
                        <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : ""}`}>
                            <CardHeader>
                                <CardTitle className="text-base">Scope & Responsibilities</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}`}>
                                    <p className="font-semibold text-sm mb-2">General Purpose</p>
                                    <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                        A designer works on the entire process of defining requirements, visualizing and creating graphics including illustrations or logos. Also, the designer works on shaping the visual aspects of websites, product packaging, and more.
                                    </p>
                                </div>
                                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}`}>
                                    <p className="font-semibold text-sm mb-3">Duties and Responsibilities</p>
                                    <ul className={`text-sm space-y-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                        <li className="flex items-start gap-2">
                                            <span className={`mt-1 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>•</span>
                                            <span>Translate client needs and brand strategies into design strategies</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className={`mt-1 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>•</span>
                                            <span>Collaborate with branding experts, front end developers, marketing, content and other professionals to create media</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className={`mt-1 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>•</span>
                                            <span>Design visual concepts using graphic design tools including design software</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className={`mt-1 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>•</span>
                                            <span>Maintain technical knowledge by attending design workshops, participate in professional societies, review professional publications</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className={`mt-1 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>•</span>
                                            <span>Meet with clients/the art director to determine the scope of a project</span>
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contract Terms */}
                        <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : ""}`}>
                            <CardHeader>
                                <CardTitle className="text-base">Contract Terms</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}`}>
                                    <p className={`text-xs mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Compliance</p>
                                    <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                        Mind-Links contracts and compliance documents requests are customised based on the contractor's residency and tax registration.
                                    </p>
                                </div>
                                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}`}>
                                    <p className={`text-xs mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>End of contract</p>
                                    <p className="font-semibold mb-2">This contract doesn't have an end date.</p>
                                    <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                        <strong>Notice period:</strong> 10 Days. Either client or contractor can give notice to end the contract anytime.
                                    </p>
                                </div>
                                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}`}>
                                    <p className={`text-xs mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Other specifics</p>
                                    <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>There are no other specifics to display.</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Sign Contract Button */}
                        {!contractSigned && (
                            <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "border-blue-200 bg-blue-50/20"}`}>
                                <CardContent className="p-6">
                                    <div className="text-center space-y-4">
                                        <div>
                                            <Shield className={`h-12 w-12 mx-auto mb-3 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
                                            <h3 className="font-semibold text-lg mb-2">Ready to Sign?</h3>
                                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                                Review all contract details above and click the button below to proceed with signing
                                            </p>
                                        </div>
                                        <Button onClick={onSign} className="w-full" size="lg">
                                            Review & Sign Contract
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="timeoff" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Add a time off</CardTitle>
                                <CardDescription>Please fill out the details for your time off.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>From</Label>
                                        <Input type="date" />
                                    </div>
                                    <div>
                                        <Label>To</Label>
                                        <Input type="date" />
                                    </div>
                                </div>
                                <div>
                                    <Label>Reason (Optional)</Label>
                                    <Textarea placeholder="Type here..." className="resize-none" />
                                    <p className="text-xs text-gray-500 mt-1 text-right">0/200</p>
                                </div>
                                <Button className="w-full" disabled>Add Time Off</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-500">Jackie hasn't had any time off.</p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

// Settings View Component
const SettingsView = ({
    settingsTab,
    onTabChange,
    verificationComplete,
    onCompleteVerification,
    preferredPaymentMethod,
    setPreferredPaymentMethod,
    automaticWithdrawal,
    setAutomaticWithdrawal,
    withdrawalMethods,
    individualDetails,
    setIndividualDetails,
    onNavigateToCompliance,
}: {
    settingsTab: string;
    onTabChange: (tab: string) => void;
    verificationComplete: boolean;
    onCompleteVerification: () => void;
    preferredPaymentMethod: string;
    setPreferredPaymentMethod: (method: string) => void;
    automaticWithdrawal: boolean;
    setAutomaticWithdrawal: (enabled: boolean) => void;
    withdrawalMethods: Array<{ id: string; name: string; icon: any }>;
    individualDetails: {
        firstName: string;
        lastName: string;
        citizenOf: string;
        countryOfTaxResidence: string;
        legalStatus: string;
        passportId: string;
        taxId: string;
        vatId: string;
        dateOfBirth: string;
        timezone: string;
        dialCode: string;
        phoneNumber: string;
        street: string;
        city: string;
        zipCode: string;
        country: string;
        province: string;
    };
    setIndividualDetails: (details: typeof individualDetails) => void;
    onNavigateToCompliance: () => void;
}) => {
    const { theme } = useTheme();
    const { toast } = useToast();
    const [invoiceCurrency, setInvoiceCurrency] = useState("USD");
    const [invoiceNumbering, setInvoiceNumbering] = useState("automatic");
    const [paymentTerms, setPaymentTerms] = useState("30");
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    const handleSavePreferredMethod = () => {
        // In real app, this would save to user profile via API
        toast({
            title: "Preferred method saved",
            description: `${withdrawalMethods.find((m) => m.id === preferredPaymentMethod)?.name} is now your preferred withdrawal method.`,
        });
    };

    const handleToggleAutomaticWithdrawal = (enabled: boolean) => {
        setAutomaticWithdrawal(enabled);
        toast({
            title: enabled ? "Automatic withdrawal enabled" : "Automatic withdrawal disabled",
            description: enabled
                ? "Your balance will be automatically withdrawn weekly if it meets the minimum threshold."
                : "You'll need to manually request withdrawals.",
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-lg font-medium">Account Settings</h1>

            <Tabs value={settingsTab} onValueChange={onTabChange} className="w-full">
                <TabsList className={`w-full ${theme === "dark" ? "bg-gray-800" : ""}`}>
                    <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
                    <TabsTrigger value="withdrawal" className="flex-1">Withdrawal Methods</TabsTrigger>
                    <TabsTrigger value="security" className="flex-1">Security</TabsTrigger>
                    <TabsTrigger value="verification" className="flex-1">
                        Verification {!verificationComplete && <span className="ml-2 text-red-500">●</span>}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="mt-6">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>
                                    Update your personal details and contact information
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>First Name</Label>
                                        <Input
                                            value={individualDetails.firstName}
                                            onChange={(e) => setIndividualDetails({ ...individualDetails, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label>Last Name</Label>
                                        <Input
                                            value={individualDetails.lastName}
                                            onChange={(e) => setIndividualDetails({ ...individualDetails, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label>Email</Label>
                                    <Input value="jfray-demo@demo.co" disabled />
                                    <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                        Contact support to change your email address
                                    </p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Phone Number</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                value={individualDetails.dialCode}
                                                onChange={(e) => setIndividualDetails({ ...individualDetails, dialCode: e.target.value })}
                                                className="w-20"
                                            />
                                            <Input
                                                value={individualDetails.phoneNumber}
                                                onChange={(e) => setIndividualDetails({ ...individualDetails, phoneNumber: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Date of Birth</Label>
                                        <Input
                                            type="date"
                                            value={individualDetails.dateOfBirth}
                                            onChange={(e) => setIndividualDetails({ ...individualDetails, dateOfBirth: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label>Timezone</Label>
                                    <Select value={individualDetails.timezone} onValueChange={(value) => setIndividualDetails({ ...individualDetails, timezone: value })}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="America - Toronto">America - Toronto (EST)</SelectItem>
                                            <SelectItem value="America - New York">America - New York (EST)</SelectItem>
                                            <SelectItem value="America - Los Angeles">America - Los Angeles (PST)</SelectItem>
                                            <SelectItem value="Europe - London">Europe - London (GMT)</SelectItem>
                                            <SelectItem value="Europe - Paris">Europe - Paris (CET)</SelectItem>
                                            <SelectItem value="Asia - Tokyo">Asia - Tokyo (JST)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button onClick={() => toast({ title: "Profile updated", description: "Your personal information has been saved." })}>
                                    Save Changes
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Address Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label>Street Address</Label>
                                    <Input
                                        value={individualDetails.street}
                                        onChange={(e) => setIndividualDetails({ ...individualDetails, street: e.target.value })}
                                    />
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <Label>City</Label>
                                        <Input
                                            value={individualDetails.city}
                                            onChange={(e) => setIndividualDetails({ ...individualDetails, city: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label>Province/State</Label>
                                        <Input
                                            value={individualDetails.province}
                                            onChange={(e) => setIndividualDetails({ ...individualDetails, province: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label>Zip/Postal Code</Label>
                                        <Input
                                            value={individualDetails.zipCode}
                                            onChange={(e) => setIndividualDetails({ ...individualDetails, zipCode: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label>Country</Label>
                                    <Select value={individualDetails.country} onValueChange={(value) => setIndividualDetails({ ...individualDetails, country: value })}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Canada">Canada</SelectItem>
                                            <SelectItem value="United States">United States</SelectItem>
                                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                            <SelectItem value="Australia">Australia</SelectItem>
                                            <SelectItem value="Germany">Germany</SelectItem>
                                            <SelectItem value="France">France</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button onClick={() => toast({ title: "Address updated", description: "Your address information has been saved." })}>
                                    Save Address
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="withdrawal" className="mt-6">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Saved withdrawal methods</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {withdrawalMethods.map((method) => {
                                        const Icon = method.icon;
                                        return (
                                            <div
                                                key={method.id}
                                                className={`flex items-center justify-between p-4 border rounded-lg ${preferredPaymentMethod === method.id
                                                    ? "border-primary bg-primary/5"
                                                    : ""
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Icon className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="font-semibold">{method.name}</p>
                                                        {preferredPaymentMethod === method.id && (
                                                            <p className="text-xs text-primary">Preferred method</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {preferredPaymentMethod === method.id ? (
                                                        <Badge className="bg-primary">Preferred</Badge>
                                                    ) : (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setPreferredPaymentMethod(method.id)}
                                                        >
                                                            Set as Preferred
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <Button variant="outline" className="w-full mt-4">
                                    Add Withdrawal Method
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Automatic Withdrawal</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="font-semibold mb-1">Enable Automatic Withdrawal</p>
                                        <p className="text-sm text-gray-500">
                                            By activating automatic withdrawal your funds will directly be withdrawn to your preferred payment method every-time a payment is received.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={automaticWithdrawal}
                                        onCheckedChange={handleToggleAutomaticWithdrawal}
                                    />
                                </div>
                                {automaticWithdrawal && (
                                    <Alert className="mt-4 bg-blue-50 border-blue-300">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            Automatic withdrawal is enabled. Your balance will be checked weekly and withdrawn if it meets the minimum threshold ($100).
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="security" className="mt-6">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                                <CardDescription>
                                    Change your account password
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label>Current Password</Label>
                                    <Input type="password" placeholder="Enter current password" />
                                </div>
                                <div>
                                    <Label>New Password</Label>
                                    <Input type="password" placeholder="Enter new password" />
                                    <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                        Must be at least 8 characters with uppercase, lowercase, and numbers
                                    </p>
                                </div>
                                <div>
                                    <Label>Confirm New Password</Label>
                                    <Input type="password" placeholder="Confirm new password" />
                                </div>
                                <Button onClick={() => toast({ title: "Password updated", description: "Your password has been changed successfully." })}>
                                    Update Password
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Two-Factor Authentication</CardTitle>
                                <CardDescription>
                                    Add an extra layer of security to your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex-1">
                                        <p className="font-semibold mb-1">Enable 2FA</p>
                                        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                            Use an authenticator app to generate verification codes
                                        </p>
                                    </div>
                                    <Switch
                                        checked={twoFactorEnabled}
                                        onCheckedChange={setTwoFactorEnabled}
                                    />
                                </div>
                                {twoFactorEnabled && (
                                    <Alert className={`mt-4 ${theme === "dark" ? "bg-blue-900/30 border-blue-700" : "bg-blue-50 border-blue-300"}`}>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            Scan the QR code with your authenticator app to complete setup.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Active Sessions</CardTitle>
                                <CardDescription>
                                    Manage devices that are currently signed in
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Monitor className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">Chrome on macOS</p>
                                                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                    Current session • Toronto, Canada
                                                </p>
                                            </div>
                                        </div>
                                        <Badge className="bg-green-500">Active</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Monitor className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">Safari on iPhone</p>
                                                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                    Last active 2 days ago • Toronto, Canada
                                                </p>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">Revoke</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Security Log</CardTitle>
                                <CardDescription>
                                    Recent security-related activities
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium text-sm">Password changed</p>
                                            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                Dec 15, 2021 at 10:30 AM
                                            </p>
                                        </div>
                                        <Badge variant="outline">Success</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium text-sm">Login from new device</p>
                                            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                Dec 10, 2021 at 2:15 PM • Chrome on macOS
                                            </p>
                                        </div>
                                        <Badge variant="outline">Info</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium text-sm">Failed login attempt</p>
                                            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                Dec 5, 2021 at 8:45 AM • Unknown location
                                            </p>
                                        </div>
                                        <Badge variant="outline" className="border-red-500 text-red-500">Warning</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="verification" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Verification Steps */}
                        <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : ""}`}>
                            <CardHeader>
                                <CardTitle>Verification</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {/* Signup Step */}
                                <div className={`flex items-center justify-between p-4 border rounded-lg ${theme === "dark" ? "border-gray-700" : ""
                                    }`}>
                                    <div className="flex items-center gap-3">
                                        <User className={`h-5 w-5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                        <div>
                                            <p className="font-medium">Signup</p>
                                        </div>
                                    </div>
                                    <Badge className={`${theme === "dark" ? "bg-green-600" : "bg-green-500"} text-white`}>
                                        Done
                                    </Badge>
                                </div>

                                {/* Identity Verification Step */}
                                <div className={`flex items-center justify-between p-4 border rounded-lg ${theme === "dark" ? "border-gray-700" : ""
                                    }`}>
                                    <div className="flex items-center gap-3 flex-1">
                                        <Eye className={`h-5 w-5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                        <div className="flex-1">
                                            <p className="font-medium">Your identity</p>
                                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                {individualDetails.firstName} {individualDetails.lastName}
                                            </p>
                                            <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                                                Instantly verify your identity with Veriff by uploading your personal documents.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        {!verificationComplete ? (
                                            <Button onClick={onNavigateToCompliance} size="sm">
                                                Verify
                                            </Button>
                                        ) : (
                                            <Badge className={`${theme === "dark" ? "bg-green-600" : "bg-green-500"} text-white`}>
                                                Verified
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Getting paid on Mind-Links */}
                        <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : ""}`}>
                            <CardHeader>
                                <CardTitle>Getting paid on Mind-Links</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between py-2">
                                    <span className="font-medium">Getting paid on Mind-Links</span>
                                    <Badge className={`${theme === "dark" ? "bg-green-600" : "bg-green-500"} text-white`}>
                                        Enabled
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="font-medium">Signing a contract</span>
                                    <Badge className={`${theme === "dark" ? "bg-green-600" : "bg-green-500"} text-white`}>
                                        Enabled
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="font-medium">Withdrawing from balance</span>
                                    <Badge className={
                                        verificationComplete
                                            ? `${theme === "dark" ? "bg-green-600" : "bg-green-500"} text-white`
                                            : `${theme === "dark" ? "bg-red-600" : "bg-red-500"} text-white`
                                    }>
                                        {verificationComplete ? "Enabled" : "Requires verification"}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

// Premium Transactions View Component
const TransactionsView = ({ transactions }: { transactions: typeof mockTransactions }) => {
    const { theme } = useTheme();
    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className={`text-3xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Payment Transactions
                    </h1>
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Complete history of all your payment transactions
                    </p>
                </div>
                <div className={`p-4 rounded-xl border-2 ${theme === "dark"
                    ? "bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-800/30"
                    : "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                    }`}>
                    <p className={`text-xs mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Total Received</p>
                    <p className={`text-2xl font-bold ${theme === "dark" ? "text-green-400" : "text-green-600"}`}>
                        ${totalAmount.toLocaleString()}.00
                    </p>
                </div>
            </div>

            <Card className={`shadow-xl border-0 ${theme === "dark" ? "bg-gray-800/50 border-gray-700/50" : "bg-white border-gray-200"}`}>
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${theme === "dark" ? "bg-green-900/30" : "bg-green-100"
                            }`}>
                            <ArrowLeftRight className={`h-5 w-5 ${theme === "dark" ? "text-green-400" : "text-green-600"}`} />
                        </div>
                        <CardTitle className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            Payment History
                        </CardTitle>
                        <Badge className={`ml-auto ${theme === "dark" ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700"
                            }`}>
                            {transactions.length} Transactions
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {transactions.map((transaction, idx) => (
                            <motion.div
                                key={transaction.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`group flex items-center justify-between p-5 rounded-xl border-2 transition-all ${theme === "dark"
                                    ? "border-gray-700/50 hover:border-green-500/30 hover:bg-gray-800/50 bg-gray-800/30"
                                    : "border-gray-200 hover:border-green-300 hover:bg-green-50/50 bg-white"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`h-14 w-14 rounded-xl flex items-center justify-center shadow-lg ${theme === "dark" ? "bg-gradient-to-br from-green-900/40 to-emerald-900/40" : "bg-gradient-to-br from-green-100 to-emerald-100"
                                        }`}>
                                        <Building2 className={`h-7 w-7 ${theme === "dark" ? "text-green-400" : "text-green-600"}`} />
                                    </div>
                                    <div>
                                        <p className={`font-bold text-base mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                            From {transaction.from}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <Calendar className={`h-3 w-3 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`} />
                                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                {transaction.date}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-green-400" : "text-green-600"}`}>
                                        + ${transaction.amount.toLocaleString()}.00
                                    </p>
                                    <Badge className={`text-xs font-bold px-3 py-1 ${theme === "dark"
                                        ? "bg-green-900/50 text-green-300 border-green-700/50"
                                        : "bg-green-100 text-green-700 border-green-300"
                                        } border`}>
                                        {transaction.status}
                                    </Badge>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Compliance Documents View Component
const ComplianceDocumentsView = () => {
    const { theme } = useTheme();
    const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});

    const requiredDocs = [
        { id: "passport", name: "Passport or National ID", required: true },
        { id: "licenses", name: "Relevant sector specific licenses and/or permits", required: false },
        { id: "additional", name: "Any additional relevant documents", required: false },
        { id: "hst", name: "Proof of HST registration", required: false },
    ];

    const handleFileUpload = (docId: string, file: File) => {
        setUploadedDocs({ ...uploadedDocs, [docId]: true });
    };

    return (
        <div className="w-full space-y-6">
            <div>
                <h1 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Compliance Documents</h1>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    These documents will be required by your client to mitigate your risk and theirs. The documents are based on Canada local laws and your legal structure. These documents won't affect upcoming transactions.
                </p>
            </div>

            {Object.keys(uploadedDocs).length < requiredDocs.filter((d) => d.required).length && (
                <Alert className={theme === "dark" ? "bg-red-900/30 border-red-700 text-red-200" : "bg-red-50 border-red-300"}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        <strong>There are documents missing!</strong>
                    </AlertDescription>
                </Alert>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
                {requiredDocs.map((doc) => (
                    <Card key={doc.id} className={`h-full ${theme === "dark" ? "bg-gray-800 border-gray-700" : ""}`}>
                        <CardHeader>
                            <CardTitle className="text-base">
                                {doc.name} {!doc.required && <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>(Optional)</span>}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer min-h-[180px] flex flex-col items-center justify-center ${theme === "dark"
                                ? "border-blue-600 hover:bg-blue-900/20"
                                : "border-blue-300 hover:bg-blue-50"
                                }`}>
                                <Upload className={`h-10 w-10 mx-auto mb-3 ${theme === "dark" ? "text-blue-400" : "text-blue-500"}`} />
                                <p className={`text-sm mb-3 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Click here or drag file to upload</p>
                                <Input
                                    type="file"
                                    className="hidden"
                                    id={`file-${doc.id}`}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleFileUpload(doc.id, file);
                                    }}
                                />
                                <Label htmlFor={`file-${doc.id}`} className="cursor-pointer">
                                    <Button variant="ghost" size="sm" className="mt-2">
                                        Select File
                                    </Button>
                                </Label>
                            </div>
                            {uploadedDocs[doc.id] && (
                                <div className={`mt-4 p-3 border rounded-lg ${theme === "dark"
                                    ? "bg-green-900/30 border-green-700"
                                    : "bg-green-50 border-green-200"
                                    }`}>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className={`h-5 w-5 ${theme === "dark" ? "text-green-400" : "text-green-600"}`} />
                                        <span className={`text-sm ${theme === "dark" ? "text-green-300" : "text-green-700"}`}>Document uploaded successfully</span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ContractorDashboard;
