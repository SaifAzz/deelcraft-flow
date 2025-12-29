import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    ArrowLeft,
    DollarSign,
    Clock,
    Flag,
    ChevronRight,
    Info,
    CheckCircle2,
    Shield,
    Gem,
    Laptop,
    Building2,
    Moon,
    FileText,
    Fingerprint,
    HelpCircle,
    ChevronDown,
    Calendar as CalendarIcon,
    AlertCircle,
    Mail,
    User,
    Building,
    MapPin,
    Briefcase,
    CreditCard,
    FileCheck,
    Headphones,
} from "lucide-react";
import { MindLinksLogo } from "@/shared/components/MindLinksLogo";
import ClientDashboard from "@/pages/ClientDashboard";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Separator } from "@/shared/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { Calendar } from "@/shared/components/ui/calendar";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { cn } from "@/shared/lib/utils";
import { format } from "date-fns";

type ContractType = "fixed-rate" | "pay-as-you-go" | "milestone" | null;
type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface ValidationErrors {
    [key: string]: string;
}

interface WizardData {
    contractType: ContractType;
    // Personal details
    entity: string;
    personalEmail: string;
    legalFirstName: string;
    legalLastName: string;
    contractName: string;
    taxResidence: string;
    manager: string;
    report: string;
    workerId: string;
    externalWorkerId: string;
    department: string;
    hiringObjective: string;
    // Role details
    role: string;
    seniorityLevel: string;
    scopeOfWork: string;
    // Payment and dates
    currency: string;
    paymentRate: string;
    invoicePolicy: string;
    startDate: string;
    endDate: string;
    // Compliance
    coverage: string;
    // Benefits
    equipment: boolean;
    coworkingSpace: boolean;
    equity: boolean;
}

interface InviteContractorWizardProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete?: (data: WizardData) => void;
}

const STEPS = [
    { number: 1, title: "Personal details" },
    { number: 2, title: "Role details" },
    { number: 3, title: "Payment and dates" },
    { number: 4, title: "Compliance" },
    { number: 5, title: "Benefits and extras" },
    { number: 6, title: "Review and sign" },
];

export const InviteContractorWizard: React.FC<InviteContractorWizardProps> = ({
    isOpen,
    onClose,
    onComplete,
}) => {
    const initialData: WizardData = {
        contractType: null,
        entity: "",
        personalEmail: "",
        legalFirstName: "",
        legalLastName: "",
        contractName: "",
        taxResidence: "",
        manager: "",
        report: "",
        workerId: "1",
        externalWorkerId: "",
        department: "",
        hiringObjective: "",
        role: "",
        seniorityLevel: "",
        scopeOfWork: "",
        currency: "USD",
        paymentRate: "",
        invoicePolicy: "",
        startDate: undefined,
        endDate: undefined,
        coverage: "",
        equipment: false,
        coworkingSpace: false,
        equity: false,
    };

    const [currentStep, setCurrentStep] = useState<Step>(0);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
    const [data, setData] = useState<WizardData>(initialData);
    const [errors, setErrors] = useState<ValidationErrors>({});

    const updateData = (updates: Partial<WizardData>) => {
        setData((prev) => ({ ...prev, ...updates }));
        // Clear errors for updated fields
        const updatedFields = Object.keys(updates);
        setErrors((prev) => {
            const newErrors = { ...prev };
            updatedFields.forEach((field) => delete newErrors[field]);
            return newErrors;
        });
    };

    const validateStep = (step: Step): boolean => {
        const newErrors: ValidationErrors = {};

        if (step === 1) {
            if (!data.entity) newErrors.entity = "Entity is required";
            if (!data.personalEmail) {
                newErrors.personalEmail = "Personal email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalEmail)) {
                newErrors.personalEmail = "Please enter a valid email address";
            }
            if (!data.legalFirstName) newErrors.legalFirstName = "Legal first name is required";
            if (!data.legalLastName) newErrors.legalLastName = "Legal last name is required";
            if (!data.contractName) newErrors.contractName = "Contract name is required";
            if (!data.taxResidence) newErrors.taxResidence = "Tax residence is required";
            if (!data.workerId) newErrors.workerId = "Worker ID is required";
        }

        if (step === 2) {
            if (!data.scopeOfWork) newErrors.scopeOfWork = "Scope of work is required";
        }

        if (step === 3) {
            if (!data.paymentRate) {
                newErrors.paymentRate = "Payment rate is required";
            } else if (parseFloat(data.paymentRate) <= 0) {
                newErrors.paymentRate = "Payment rate must be greater than 0";
            }
            if (!data.invoicePolicy) newErrors.invoicePolicy = "Invoice policy is required";
            if (!data.startDate) newErrors.startDate = "Start date is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (currentStep === 0 && !data.contractType) return;

        // Validate current step before proceeding
        if (currentStep > 0 && currentStep < 6) {
            if (!validateStep(currentStep)) {
                return;
            }
        }

        if (currentStep < 6) {
            if (currentStep > 0) {
                setCompletedSteps((prev) => new Set([...prev, currentStep]));
            }
            setCurrentStep((prev) => (prev + 1) as Step);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => (prev - 1) as Step);
        }
    };

    const handleComplete = () => {
        if (onComplete) {
            onComplete(data);
        }
        // Reset wizard state
        setCurrentStep(0);
        setCompletedSteps(new Set());
        setData(initialData);
        onClose();
    };

    const handleClose = () => {
        // Reset wizard state when closing
        setCurrentStep(0);
        setCompletedSteps(new Set());
        setData(initialData);
        onClose();
    };

    if (!isOpen) return null;

    const getStepTitle = () => {
        if (currentStep === 0) return "Add people";
        if (currentStep === 1) return "Personal details";
        if (currentStep === 2) return "Role details";
        if (currentStep === 3) return "Payment and dates";
        if (currentStep === 4) return "Compliance";
        if (currentStep === 5) return "Benefits and extras";
        return "Review and sign";
    };

    const getStepSubtitle = () => {
        if (currentStep === 0) return "Choose your contracting agreement";
        if (currentStep === 1) return "Create a " + (data.contractType === "fixed-rate" ? "Fixed Rate" :
            data.contractType === "pay-as-you-go" ? "Pay as you go" :
                data.contractType === "milestone" ? "Milestone" : "") + " contract for an individual contractor";
        return "";
    };

    return (
        <div className="relative min-h-screen">
            {/* Background Dashboard - Blurred */}
            <div className="fixed inset-0 overflow-auto">
                <div className="blur-sm scale-95 opacity-40 pointer-events-none">
                    <ClientDashboard />
                </div>
            </div>

            {/* Modal Overlay */}
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl my-8 max-h-[95vh] overflow-hidden flex flex-col"
                >
                    {/* Header */}
                    <div className="border-b border-gray-100 bg-white px-8 py-5 flex items-center justify-between sticky top-0 z-10">
                        <MindLinksLogo />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleClose}
                            className="h-9 w-9 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="h-4 w-4 text-gray-500" />
                        </Button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="px-8 py-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                                {/* Main Content */}
                                <div className={currentStep === 0 ? "lg:col-span-3" : "lg:col-span-2"}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="mb-8"
                                    >
                                        <div>
                                            <h1 className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight">
                                                {getStepTitle()}
                                            </h1>
                                            {getStepSubtitle() && (
                                                <p className="text-gray-600 text-base">
                                                    {getStepSubtitle()}
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>

                                    <div className="space-y-8">
                                        <AnimatePresence mode="wait">
                                            {currentStep === 0 && <ContractTypeSelection data={data} updateData={updateData} />}
                                            {currentStep === 1 && <PersonalDetailsStep data={data} updateData={updateData} errors={errors} />}
                                            {currentStep === 2 && <RoleDetailsStep data={data} updateData={updateData} errors={errors} />}
                                            {currentStep === 3 && <PaymentAndDatesStep data={data} updateData={updateData} errors={errors} />}
                                            {currentStep === 4 && <ComplianceStep data={data} updateData={updateData} />}
                                            {currentStep === 5 && <BenefitsStep data={data} updateData={updateData} />}
                                            {currentStep === 6 && <ReviewAndSignStep data={data} />}
                                        </AnimatePresence>

                                        {/* Navigation Buttons */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="flex items-center justify-between pt-6 border-t border-gray-200"
                                        >
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={handleBack}
                                                disabled={currentStep === 0}
                                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50"
                                            >
                                                <ArrowLeft className="h-4 w-4" />
                                                Back
                                            </Button>
                                            {currentStep < 6 ? (
                                                <Button
                                                    type="button"
                                                    onClick={handleNext}
                                                    disabled={currentStep === 0 && !data.contractType}
                                                    className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all font-medium disabled:opacity-50"
                                                >
                                                    Continue
                                                </Button>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    onClick={handleComplete}
                                                    className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all font-medium"
                                                >
                                                    Create & sign
                                                </Button>
                                            )}
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Sidebar - Progress Indicator */}
                                {currentStep > 0 && (
                                    <div className="lg:col-span-1">
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="sticky top-8 space-y-6"
                                        >
                                            {/* Progress Steps */}
                                            <Card className="bg-white border-gray-200 shadow-sm">
                                                <CardContent className="pt-6">
                                                    <div className="space-y-3">
                                                        {STEPS.map((step, index) => {
                                                            const stepNumber = index + 1;
                                                            const isCompleted = completedSteps.has(stepNumber) || stepNumber < currentStep;
                                                            const isCurrent = stepNumber === currentStep;

                                                            return (
                                                                <motion.div
                                                                    key={step.number}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: 0.1 * index }}
                                                                    className={cn(
                                                                        "flex items-center gap-3 p-4 rounded-lg transition-all duration-300",
                                                                        isCurrent
                                                                            ? "bg-blue-50 border border-blue-200"
                                                                            : isCompleted
                                                                                ? "bg-white border border-green-200"
                                                                                : "bg-white border border-gray-200"
                                                                    )}
                                                                >
                                                                    <motion.div
                                                                        whileHover={{ scale: 1.05 }}
                                                                        className={cn(
                                                                            "flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-all",
                                                                            isCompleted
                                                                                ? "bg-green-600 text-white"
                                                                                : isCurrent
                                                                                    ? "bg-blue-600 text-white"
                                                                                    : "bg-gray-200 text-gray-500"
                                                                        )}
                                                                    >
                                                                        {isCompleted ? (
                                                                            <CheckCircle2 className="h-5 w-5" />
                                                                        ) : (
                                                                            step.number
                                                                        )}
                                                                    </motion.div>
                                                                    <div className="flex-1">
                                                                        {isCompleted && (
                                                                            <span className="text-xs text-green-600 font-semibold">COMPLETED </span>
                                                                        )}
                                                                        <span
                                                                            className={cn(
                                                                                "text-sm font-medium block",
                                                                                isCompleted
                                                                                    ? "text-green-700"
                                                                                    : isCurrent
                                                                                        ? "text-blue-700 font-semibold"
                                                                                        : "text-gray-500"
                                                                            )}
                                                                        >
                                                                            {step.title}
                                                                        </span>
                                                                    </div>
                                                                </motion.div>
                                                            );
                                                        })}
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            {/* Autosaved Info */}
                                            <Card className="bg-white border-gray-200 shadow-sm">
                                                <CardContent className="pt-6">
                                                    <div className="space-y-4">
                                                        <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Info className="h-4 w-4 text-blue-600" />
                                                                <span className="text-sm font-semibold text-blue-900">Autosaved</span>
                                                            </div>
                                                            <p className="text-xs text-gray-600 leading-relaxed">
                                                                Your progress is saved automatically. Delete the draft to start over.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            {/* Support */}
                                            <Card className="bg-white border-gray-200 shadow-sm">
                                                <CardContent className="pt-6">
                                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                                                        Need extra support?
                                                    </h3>
                                                    <Button
                                                        variant="link"
                                                        className="p-0 h-auto text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2 group"
                                                    >
                                                        <Headphones className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                                        Submit an inquiry
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// Step 0: Contract Type Selection
const ContractTypeSelection: React.FC<{
    data: WizardData;
    updateData: (updates: Partial<WizardData>) => void;
}> = ({ data, updateData }) => {
    const contractTypes = [
        {
            id: "fixed-rate" as ContractType,
            title: "Fixed rate",
            description: "For contracts that have a fixed rate each payment cycle.",
            icon: DollarSign,
            color: "bg-blue-100 text-blue-600",
        },
        {
            id: "pay-as-you-go" as ContractType,
            title: "Pay as you go",
            description: "For contracts that require time sheets or work submissions each payment cycle.",
            icon: Clock,
            color: "bg-blue-100 text-blue-600",
        },
        {
            id: "milestone" as ContractType,
            title: "Milestone",
            description: "For contracts with milestones that get paid each time they're completed.",
            icon: Flag,
            color: "bg-blue-100 text-blue-600",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
        >
            <div className="space-y-4 max-w-2xl mx-auto">
                {contractTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                        <Card
                            key={type.id}
                            className={cn(
                                "cursor-pointer transition-all hover:shadow-md bg-white border-gray-200 shadow-sm",
                                data.contractType === type.id && "ring-2 ring-blue-500"
                            )}
                            onClick={() => updateData({ contractType: type.id })}
                        >
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{type.title}</h3>
                                        <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                                        <div className="flex items-center gap-2 text-sm text-blue-600">
                                            <Info className="h-4 w-4" />
                                            <span>Learn More</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </motion.div>
    );
};

// Step 1: Personal Details
const PersonalDetailsStep: React.FC<{
    data: WizardData;
    updateData: (updates: Partial<WizardData>) => void;
    errors: ValidationErrors;
}> = ({ data, updateData, errors }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="pt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Team information</h3>
                    <div className="space-y-2">
                        <Label htmlFor="entity" className="text-sm font-medium text-gray-700">
                            Entity <span className="text-red-500">*</span>
                        </Label>
                        <Select value={data.entity} onValueChange={(value) => updateData({ entity: value })}>
                            <SelectTrigger className={cn(
                                "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all text-sm",
                                errors.entity && "border-red-500"
                            )}>
                                <SelectValue placeholder="Select entity" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="entity1">Entity 1</SelectItem>
                                <SelectItem value="entity2">Entity 2</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.entity && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {errors.entity}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="pt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contractor personal details</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="personalEmail" className="text-sm font-medium text-gray-700">
                                Personal email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="personalEmail"
                                type="email"
                                value={data.personalEmail}
                                onChange={(e) => updateData({ personalEmail: e.target.value })}
                                placeholder="contractor@example.com"
                                className={cn(
                                    "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all text-sm",
                                    errors.personalEmail && "border-red-500"
                                )}
                            />
                            {errors.personalEmail ? (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.personalEmail}
                                </p>
                            ) : (
                                <p className="text-xs text-gray-500">
                                    Provide the worker's personal email so they can access their account once the contract ends.
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="legalFirstName" className="text-sm font-medium text-gray-700">
                                Legal first name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="legalFirstName"
                                value={data.legalFirstName}
                                onChange={(e) => updateData({ legalFirstName: e.target.value })}
                                className={cn(
                                    "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all text-sm",
                                    errors.legalFirstName && "border-red-500"
                                )}
                            />
                            {errors.legalFirstName && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.legalFirstName}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="legalLastName" className="text-sm font-medium text-gray-700">
                                Legal last name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="legalLastName"
                                value={data.legalLastName}
                                onChange={(e) => updateData({ legalLastName: e.target.value })}
                                className={cn(
                                    "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all text-sm",
                                    errors.legalLastName && "border-red-500"
                                )}
                            />
                            {errors.legalLastName && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.legalLastName}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contractName" className="text-sm font-medium text-gray-700">
                                Contract name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="contractName"
                                value={data.contractName}
                                onChange={(e) => updateData({ contractName: e.target.value })}
                                className={cn(
                                    "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all text-sm",
                                    errors.contractName && "border-red-500"
                                )}
                            />
                            {errors.contractName && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.contractName}
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="taxResidence" className="text-sm font-medium text-gray-700">
                            Contractor's tax residence <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            value={data.taxResidence}
                            onValueChange={(value) => updateData({ taxResidence: value })}
                        >
                            <SelectTrigger className={cn(
                                "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all text-sm",
                                errors.taxResidence && "border-red-500"
                            )}>
                                <SelectValue placeholder="Select tax residence" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="us">United States</SelectItem>
                                <SelectItem value="ae">United Arab Emirates</SelectItem>
                                <SelectItem value="uk">United Kingdom</SelectItem>
                                <SelectItem value="ca">Canada</SelectItem>
                                <SelectItem value="au">Australia</SelectItem>
                                <SelectItem value="de">Germany</SelectItem>
                                <SelectItem value="fr">France</SelectItem>
                                <SelectItem value="in">India</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.taxResidence && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {errors.taxResidence}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="pt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Workplace information</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="manager">Manager (optional)</Label>
                            <Select value={data.manager} onValueChange={(value) => updateData({ manager: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select manager" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-gray-500">
                                You need at least 2 people to configure worker relationships
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="report">Report (optional)</Label>
                            <Select value={data.report} onValueChange={(value) => updateData({ report: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select report" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-gray-500">
                                You need at least 2 people to configure worker relationships
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="workerId">Worker ID *</Label>
                            <Input
                                id="workerId"
                                value={data.workerId}
                                onChange={(e) => updateData({ workerId: e.target.value })}
                                className={cn(errors.workerId && "border-red-500")}
                            />
                            {errors.workerId && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.workerId}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="externalWorkerId">External worker ID (optional)</Label>
                            <Input
                                id="externalWorkerId"
                                value={data.externalWorkerId}
                                onChange={(e) => updateData({ externalWorkerId: e.target.value })}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="pt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Organizational structure</h3>
                    <div className="space-y-2">
                        <Label htmlFor="department">Department (optional)</Label>
                        <Select
                            value={data.department}
                            onValueChange={(value) => updateData({ department: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="engineering">Engineering</SelectItem>
                                <SelectItem value="design">Design</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="pt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Hiring objective</h3>
                    <div className="space-y-2">
                        <Label htmlFor="hiringObjective">What's your hiring objective? (optional)</Label>
                        <Select
                            value={data.hiringObjective}
                            onValueChange={(value) => updateData({ hiringObjective: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select hiring objective" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="scaling">Scaling team</SelectItem>
                                <SelectItem value="project">Project-based</SelectItem>
                                <SelectItem value="replacement">Replacement</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-500">
                            Contractors are not able to see this information.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

// Step 2: Role Details
const RoleDetailsStep: React.FC<{
    data: WizardData;
    updateData: (updates: Partial<WizardData>) => void;
    errors: ValidationErrors;
}> = ({ data, updateData, errors }) => {
    const [scopeType, setScopeType] = useState<"existing" | "new">("new");

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="pt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Role details</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="role">Role (optional)</Label>
                            <Select value={data.role} onValueChange={(value) => updateData({ role: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="developer">Developer</SelectItem>
                                    <SelectItem value="designer">Designer</SelectItem>
                                    <SelectItem value="manager">Manager</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="seniorityLevel">Seniority level (optional)</Label>
                            <Select
                                value={data.seniorityLevel}
                                onValueChange={(value) => updateData({ seniorityLevel: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select seniority level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="junior">Junior</SelectItem>
                                    <SelectItem value="mid">Mid-level</SelectItem>
                                    <SelectItem value="senior">Senior</SelectItem>
                                    <SelectItem value="lead">Lead</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Scope of work</h3>
                        <Button variant="outline" size="sm">Manage job scopes</Button>
                    </div>
                    <div className="flex gap-2 mb-4">
                        <Button
                            variant={scopeType === "existing" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setScopeType("existing")}
                        >
                            Existing scope of work
                        </Button>
                        <Button
                            variant={scopeType === "new" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setScopeType("new")}
                        >
                            New scope of work
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="scopeOfWork">Explanation of scope of work *</Label>
                        <Textarea
                            id="scopeOfWork"
                            value={data.scopeOfWork}
                            onChange={(e) => updateData({ scopeOfWork: e.target.value })}
                            placeholder="Describe the work to be performed..."
                            rows={6}
                            className={cn(errors.scopeOfWork && "border-red-500")}
                        />
                        {errors.scopeOfWork && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {errors.scopeOfWork}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

// Step 3: Payment and Dates
const PaymentAndDatesStep: React.FC<{
    data: WizardData;
    updateData: (updates: Partial<WizardData>) => void;
    errors: ValidationErrors;
}> = ({ data, updateData, errors }) => {
    const [showPolicySelection, setShowPolicySelection] = useState(false);

    const invoicePolicies = [
        {
            id: "monthly",
            title: "Monthly default policy - Fixed rate",
            description: "A standard monthly payment schedule for contractors with a consistent, agreed-upon rate. Payments are processed on the same date each month.",
        },
        {
            id: "semi-monthly",
            title: "Semi monthly default policy - Fixed rate",
            description: "A semi-monthly payment schedule for contractors with a fixed rate. Payments are disbursed twice a month on set dates.",
        },
        {
            id: "weekly",
            title: "Weekly default policy - Fixed rate",
            description: "Designed for contractors with a fixed weekly rate. Payments are scheduled on the same day every week.",
        },
        {
            id: "biweekly",
            title: "Biweekly default policy - Fixed rate",
            description: "A biweekly payment schedule for contractors with a fixed rate.",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="pt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment rate</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Define how much the contractor will be paid.
                    </p>
                    <div className="flex gap-4">
                        <div className="space-y-2 flex-1">
                            <Label htmlFor="currency">Currency</Label>
                            <Select
                                value={data.currency}
                                onValueChange={(value) => updateData({ currency: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USD">USD</SelectItem>
                                    <SelectItem value="EUR">EUR</SelectItem>
                                    <SelectItem value="GBP">GBP</SelectItem>
                                    <SelectItem value="AED">AED</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2 flex-1">
                            <Label htmlFor="paymentRate">Payment rate *</Label>
                            <Input
                                id="paymentRate"
                                value={data.paymentRate}
                                onChange={(e) => updateData({ paymentRate: e.target.value })}
                                placeholder="0.00"
                                type="number"
                                step="0.01"
                                min="0"
                                className={cn(errors.paymentRate && "border-red-500")}
                            />
                            {errors.paymentRate && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.paymentRate}
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Service policies</h3>
                            <p className="text-sm text-gray-600">
                                Select invoice policies or create new for your organization's
                            </p>
                        </div>
                        <Button variant="outline" size="sm">Create policy</Button>
                    </div>
                    {showPolicySelection ? (
                        <div className="space-y-3">
                            {invoicePolicies.map((policy) => (
                                <Card
                                    key={policy.id}
                                    className={cn(
                                        "cursor-pointer transition-all hover:shadow-md bg-white border shadow-sm rounded-xl",
                                        data.invoicePolicy === policy.id && "ring-2 ring-[#4A6CF7]"
                                    )}
                                    onClick={() => {
                                        updateData({ invoicePolicy: policy.id });
                                        setShowPolicySelection(false);
                                    }}
                                >
                                    <CardContent className="p-4">
                                        <h4 className="font-semibold text-[#1A1F36] mb-1">{policy.title}</h4>
                                        <p className="text-sm text-gray-600">{policy.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Select
                                value={data.invoicePolicy}
                                onValueChange={(value) => updateData({ invoicePolicy: value })}
                            >
                                <SelectTrigger className={cn(errors.invoicePolicy && "border-red-500")}>
                                    <SelectValue placeholder="Select policy" />
                                </SelectTrigger>
                                <SelectContent>
                                    {invoicePolicies.map((policy) => (
                                        <SelectItem key={policy.id} value={policy.id}>
                                            {policy.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.invoicePolicy && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.invoicePolicy}
                                </p>
                            )}
                            <Button
                                variant="link"
                                className="p-0 h-auto"
                                onClick={() => setShowPolicySelection(true)}
                            >
                                Or select from list
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="pt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Dates</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Select the worker's start and end date if the contract is for a set period.
                    </p>
                    <div className="flex gap-4">
                        <div className="space-y-2 flex-1">
                            <Label htmlFor="startDate">Start date (DD/MM/YYYY) *</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !data.startDate && "text-gray-500",
                                            errors.startDate && "border-red-500"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {data.startDate ? format(data.startDate, "dd/MM/yyyy") : "Select start date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={data.startDate}
                                        onSelect={(date) => updateData({ startDate: date })}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.startDate && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.startDate}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2 flex-1">
                            <Label htmlFor="endDate">End date (optional) (DD/MM/YYYY)</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !data.endDate && "text-gray-500"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {data.endDate ? format(data.endDate, "dd/MM/yyyy") : "Select end date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={data.endDate}
                                        onSelect={(date) => updateData({ endDate: date })}
                                        disabled={(date) => data.startDate ? date < data.startDate : false}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

// Step 4: Compliance
const ComplianceStep: React.FC<{
    data: WizardData;
    updateData: (updates: Partial<WizardData>) => void;
}> = ({ data, updateData }) => {
    const coverageOptions = [
        {
            id: "full-coverage",
            title: "Full coverage with MindLinks COR",
            fee: "15% Monthly fee",
            benefits: [
                "We hire the contractor on your behalf and handle compliance",
                "Reduce the risk of fines, penalties, and legal issues",
            ],
            icon: Shield,
        },
        {
            id: "limited-coverage",
            title: "Coverage up to $25,000",
            fee: "$50.00 Monthly fee",
            benefits: [
                "Covers up to $25,000 in liability for misclassification",
            ],
            icon: Gem,
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <Card className="bg-blue-50 border border-blue-100 shadow-sm rounded-xl">
                <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-[#4A6CF7] mt-0.5" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Misclassification can lead to costly penalties.</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Many businesses unknowingly misclassify contractors, exposing themselves to legal risks, fines, and tax penalties. Ensuring compliance from the start protects your business and avoids these complications.
                            </p>
                            <Button variant="link" className="p-0 h-auto text-[#4A6CF7]">
                                Learn more about your risk
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div>
                <h3 className="text-lg font-semibold text-[#1A1F36] mb-2">Coverage</h3>
                <p className="text-sm text-gray-600 mb-6">
                    Add coverage to stay compliant and avoid legal risks.
                </p>
                <div className="space-y-4">
                    {coverageOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                            <Card
                                key={option.id}
                                className={cn(
                                    "cursor-pointer transition-all hover:shadow-md bg-white border shadow-sm rounded-xl",
                                    data.coverage === option.id && "ring-2 ring-[#4A6CF7]"
                                )}
                                onClick={() => updateData({ coverage: option.id })}
                            >
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-full bg-gradient-to-br from-[#A8C4FF] to-[#4A6CF7] text-white shadow-md">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-semibold">{option.title}</h4>
                                                <div
                                                    className={cn(
                                                        "w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer",
                                                        data.coverage === option.id
                                                            ? "border-[#4A6CF7] bg-[#4A6CF7]"
                                                            : "border-gray-300"
                                                    )}
                                                    onClick={() => updateData({ coverage: option.id })}
                                                >
                                                    {data.coverage === option.id && (
                                                        <div className="w-2 h-2 rounded-full bg-white" />
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-sm font-medium text-gray-600 mb-3">{option.fee}</p>
                                            <ul className="space-y-1">
                                                {option.benefits.map((benefit, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                        <span>{benefit}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <Button variant="link" className="p-0 h-auto mt-2 text-[#4A6CF7]">
                                                Learn more
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

// Step 5: Benefits and Extras
const BenefitsStep: React.FC<{
    data: WizardData;
    updateData: (updates: Partial<WizardData>) => void;
}> = ({ data, updateData }) => {
    const benefits = [
        {
            id: "equipment",
            title: "Equipment",
            description: "Choose the right tools for your team. You can lease equipment through our partner or provide your own equipment and keep track of it for seamless work experiences.",
            icon: Laptop,
            hasSubOption: true,
        },
        {
            id: "coworking",
            title: "Coworking space membership",
            description: "Request monthly access to WeWork. Explore available WeWork locations here.",
            icon: Building2,
        },
        {
            id: "equity",
            title: "Equity",
            description: "Track your team member's equity information on MindLinks. Please be aware that establishing an international stock option plan typically requires legal consultation.",
            icon: Moon,
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            {benefits.map((benefit) => {
                const Icon = benefit.icon;
                const isSelected =
                    benefit.id === "equipment" ? data.equipment :
                        benefit.id === "coworking" ? data.coworkingSpace :
                            benefit.id === "equity" ? data.equity : false;

                return (
                    <Card key={benefit.id} className={cn("bg-white border shadow-sm rounded-xl", isSelected && "ring-2 ring-[#4A6CF7]")}>
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-gradient-to-br from-[#A8C4FF] to-[#4A6CF7] text-white shadow-md">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{benefit.description}</p>
                                    <div className="flex items-center gap-2">
                                        <Button variant="link" className="p-0 h-auto text-[#4A6CF7]">
                                            Learn more
                                        </Button>
                                        <Button
                                            variant={isSelected ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => {
                                                if (benefit.id === "equipment") {
                                                    updateData({ equipment: !isSelected });
                                                } else if (benefit.id === "coworking") {
                                                    updateData({ coworkingSpace: !isSelected });
                                                } else if (benefit.id === "equity") {
                                                    updateData({ equity: !isSelected });
                                                }
                                            }}
                                        >
                                            {isSelected ? "Remove" : "Add"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </motion.div>
    );
};

// Step 6: Review and Sign
const ReviewAndSignStep: React.FC<{ data: WizardData }> = ({ data }) => {
    const [contractReviewed, setContractReviewed] = useState(false);
    const [clientSignsFirst, setClientSignsFirst] = useState(true);

    const handleReviewAndSign = () => {
        // Open the PDF contract in a new window/tab
        const pdfPath = "/deel-Dannan Test-contract-m49pzv2.pdf";
        window.open(pdfPath, "_blank");
        // Mark contract as reviewed to enable the invite contractor button
        setContractReviewed(true);
    };

    const handleSwitchSigningOrder = () => {
        setClientSignsFirst(!clientSignsFirst);
    };

    const handleViewContract = () => {
        // Open the PDF contract in a new window/tab
        const pdfPath = "/deel-Dannan Test-contract-m49pzv2.pdf";
        window.open(pdfPath, "_blank");
    };

    const clientCard = (
        <Card className="bg-gray-50 border shadow-sm rounded-xl">
            <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center text-xs font-semibold shadow-md">
                        {clientSignsFirst ? 1 : 2}
                    </div>
                    <span className="font-semibold text-[#1A1F36]">Client signs here</span>
                </div>
                <Button variant="link" className="p-0 h-auto text-[#4A6CF7]">
                    Invite someone else to sign
                </Button>
                <Button 
                    className="w-full mt-4 bg-black text-white hover:bg-gray-800 shadow-md rounded-lg"
                    onClick={handleReviewAndSign}
                >
                    Review & Sign
                </Button>
            </CardContent>
        </Card>
    );

    const contractorCard = (
        <Card className="bg-gray-50 border shadow-sm rounded-xl">
            <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                    <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shadow-md",
                        clientSignsFirst 
                            ? "bg-gray-300 text-gray-700" 
                            : "bg-gradient-to-br from-green-400 to-green-600 text-white"
                    )}>
                        {clientSignsFirst ? 2 : 1}
                    </div>
                    <span className="font-semibold text-[#1A1F36]">Contractor signs here</span>
                </div>
                <Button 
                    variant="outline" 
                    className="w-full mt-4" 
                    disabled={!contractReviewed}
                >
                    Invite contractor
                </Button>
            </CardContent>
        </Card>
    );

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Signatures</h3>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={handleSwitchSigningOrder}>
                                Switch signing order
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {clientSignsFirst ? (
                            <>
                                {clientCard}
                                {contractorCard}
                            </>
                        ) : (
                            <>
                                {contractorCard}
                                {clientCard}
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-gray-600" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Review the contract details</h3>
                                <p className="text-sm text-gray-600">
                                    This contract is using the MindLinks Standard Contract.
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleViewContract}>View</Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

