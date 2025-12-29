import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Shield,
  FileText,
  User,
  CheckCircle2,
  ArrowLeft,
  Info,
  X,
  AlertTriangle,
  Globe,
  DollarSign,
  Calendar,
  Upload,
  Sparkles,
  Headphones,
  Folder,
  Plus,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { cn } from "@/shared/lib/utils";
import { useToast } from "@/shared/hooks/use-toast";
import { MindLinksLogo } from "@/shared/components/MindLinksLogo";
import ClientDashboard from "../dashboards/client/pages/Dashboard";

// Form validation schema
const verificationSchema = z.object({
  formationDate: z.string().min(1, "Formation date is required"),
  expectedVolume: z.string().min(1, "Expected volume is required"),
  // Step 2: Control and ownership
  controllingOfficerOwns25Percent: z.enum(["yes", "no"]).optional(),
  hasMajorShareholders: z.enum(["yes", "no"]).optional(),
  isListedAsPSC: z.string().optional(),
  declarationConfirmed: z.boolean().refine((val) => val === true, {
    message: "You must confirm the declaration",
  }),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

const STORAGE_KEY = "entity_verification_completed";
const ENTITY_VERIFICATION_STATUS = "entity_verification_status";

export const EntityVerification = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStartModal, setShowStartModal] = useState(true);

  const form = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      formationDate: "",
      expectedVolume: "",
      controllingOfficerOwns25Percent: undefined,
      hasMajorShareholders: undefined,
      isListedAsPSC: "",
      declarationConfirmed: false,
    },
    mode: "onChange",
  });

  const steps = [
    { number: 1, title: "Entity details", icon: Building2, completed: currentStep > 1 },
    { number: 2, title: "Control and ownership", icon: User, completed: currentStep > 2 },
    { number: 3, title: "Your details", icon: User, completed: currentStep > 3 },
    { number: 4, title: "Entity documents", icon: FileText, completed: currentStep > 4 },
    { number: 5, title: "Additional questions", icon: Info, completed: currentStep > 5 },
    { number: 6, title: "Review", icon: CheckCircle2, completed: false },
  ];

  const handleStart = () => {
    setShowStartModal(false);
    setCurrentStep(1);
  };

  const handleSkip = () => {
    // Mark as skipped
    localStorage.setItem(ENTITY_VERIFICATION_STATUS, "skipped");
    toast.toast({
      title: "Verification Skipped",
      description: "You can complete verification later. A reminder will appear in your dashboard.",
    });
    navigate("/client-dashboard");
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      const isValid = await trigger(["formationDate", "expectedVolume"]);
      if (isValid && currentStep < 6) {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 2) {
      const isValid = await trigger(["declarationConfirmed"]);
      if (isValid && currentStep < 6) {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: VerificationFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Store completion status
      localStorage.setItem(STORAGE_KEY, "true");
      localStorage.setItem(ENTITY_VERIFICATION_STATUS, "completed");
      localStorage.setItem("verification_data", JSON.stringify(data));

      toast.toast({
        title: "Verification Submitted",
        description: "Your entity verification has been submitted for review.",
      });

      // Trigger event to update onboarding status
      window.dispatchEvent(new CustomEvent('onboardingStatusChanged'));

      // Navigate to dashboard which will show the onboarding page for remaining tasks
      setTimeout(() => {
        navigate("/client-dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error submitting verification:", error);
      toast.toast({
        title: "Error",
        description: "Failed to submit verification. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const { trigger } = form;

  // Get entity name from localStorage
  const entityData = localStorage.getItem("entity_data");
  const entityName = entityData ? JSON.parse(entityData).entityName || "Your Entity" : "Your Entity";

  return (
    <div className="relative min-h-screen">
      {/* Background Dashboard - Blurred */}
      <div className="fixed inset-0 overflow-auto">
        <div className="blur-sm scale-95 opacity-40 pointer-events-none">
          <ClientDashboard />
        </div>
      </div>

      {/* Modal Overlay */}
      {showStartModal ? (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl my-8 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSkip}
                className="h-8 w-8 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-4 w-4 text-gray-500" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col lg:flex-row">
              {/* Left Side - Illustration */}
              <div className="lg:w-2/5 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative w-full max-w-xs"
                  >
                    {/* Coins */}
                    <motion.div
                      animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <span className="text-2xl font-bold text-gray-700">£</span>
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="absolute top-12 right-8 w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <span className="text-2xl font-bold text-gray-700">$</span>
                    </motion.div>
                    
                    {/* Globe */}
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute top-24 left-1/2 transform -translate-x-1/2 w-20 h-20"
                    >
                      <Globe className="w-full h-full text-blue-400" />
                    </motion.div>

                    {/* Folder with Logo */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    >
                      <div className="relative">
                        <Folder className="w-24 h-24 text-blue-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <MindLinksLogo size="sm" className="text-white" />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col">
                <div className="flex-1">
                  <h1 className="text-3xl font-semibold text-gray-900 mb-6">Entity verification</h1>
                  
                  {/* Required for Invoice payment */}
                  <div className="bg-gray-100 rounded-lg p-4 mb-6 flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Required for Invoice payment processing through this entity
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    As part of our commitment to compliance, we conduct a verification process for each entity to ensure the safety, security and integrity of our services.
                  </p>

                  {/* Required Documents List */}
                  <div className="space-y-4 mb-8">
                    <h2 className="text-sm font-semibold text-gray-900 mb-3">Required documents:</h2>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">
                          <strong className="text-gray-900">Formation documents:</strong> Official documents establishing the entity.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">
                          <strong className="text-gray-900">Control and ownership Information:</strong> Details of controlling officers and majority shareholders with 25% or more ownership.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">
                          <strong className="text-gray-900">Proof of authority:</strong> A board resolution or power of attorney, if you do not have control or majority ownership of the entity.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">
                          <strong className="text-gray-900">Identity documentation:</strong> A government-issued ID, such as a passport or driver's license.
            </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Start Button */}
                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <Button
                    onClick={handleStart}
                    className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-2.5 rounded-lg font-medium transition-all"
                  >
                    Start
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        /* Verification Form - Full Page */
        <div className="relative z-50 min-h-screen bg-white">
          {/* Header */}
          <div className="border-b border-gray-200 bg-white px-8 py-5 flex items-center justify-between sticky top-0 z-10">
            <MindLinksLogo />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/client-dashboard")}
              className="h-9 w-9 hover:bg-gray-100 rounded-lg transition-colors"
          >
              <X className="h-4 w-4 text-gray-500" />
          </Button>
        </div>

          <div className="container mx-auto px-8 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/client-dashboard")}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </div>
                  <h1 className="text-3xl font-semibold text-gray-900 mb-3">
                Entity verification
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      <span className="text-lg font-semibold text-gray-900">{entityName}</span>
                </div>
                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                  REQUIRES INFORMATION
                </span>
              </div>
            </motion.div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Step 1: Entity Details */}
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                      >
                          <Card className="bg-blue-50/50 border-blue-100 shadow-sm">
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-blue-100 rounded-lg flex-shrink-0">
                                <Info className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                  <h3 className="font-semibold text-gray-900 mb-2 text-base">
                                  Why do I need to provide my entity's details?
                                </h3>
                                  <p className="text-sm text-gray-600 leading-relaxed">
                                  We use your entity's information to verify it and support ongoing regulatory
                                  compliance.
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                          <Card className="bg-white border-gray-200 shadow-sm">
                          <CardContent className="pt-6 space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">Entity formation date</h2>
                                <p className="text-sm text-gray-600">
                                The official date a business was legally established, typically found in registration
                                or incorporation documents.
                              </p>
                            </div>

                            <FormField
                              control={form.control}
                              name="formationDate"
                              render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                    Formation date (MM/DD/YYYY) <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="date"
                                        className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg text-sm"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                              <div className="pt-4 border-t border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                  <DollarSign className="h-5 w-5 text-green-600" />
                                Expected volume of monthly transactions (in $USD)
                              </h2>
                                <p className="text-sm text-gray-600 mb-4">
                                  We collect this to understand the entity's expected transaction volume on mind Links.
                              </p>

                              <FormField
                                control={form.control}
                                name="expectedVolume"
                                render={({ field }) => (
                                  <FormItem>
                                      <FormLabel className="text-sm font-medium text-gray-700">
                                      Expected volume (in $USD) <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                          <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg text-sm">
                                          <SelectValue placeholder="Select expected volume" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="< $1k">Less than $1k</SelectItem>
                                        <SelectItem value="$1k - $10k">Between $1k and $10k</SelectItem>
                                        <SelectItem value="$10k - $100k">Between $10k and $100k</SelectItem>
                                        <SelectItem value="$100k - $1M">Between $100k and $1M</SelectItem>
                                        <SelectItem value="$1M+">$1M or more</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}

                      {/* Step 2: Control and Ownership */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-8"
                        >
                          {/* Persons with Significant Control */}
                          <Card className="bg-white border-gray-200 shadow-sm">
                            <CardContent className="pt-6 space-y-6">
                              <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-blue-100 rounded-lg flex-shrink-0">
                                  <Info className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                    Persons with Significant Control
                                  </h2>
                                  <p className="text-sm text-gray-600 leading-relaxed">
                                    Please provide the details of the controlling officer, and any other individuals who own 25% or more of this entity (directly or indirectly).
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Controlling Officer */}
                          <Card className="bg-white border-gray-200 shadow-sm">
                            <CardContent className="pt-6 space-y-6">
                              <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">Controlling officer</h2>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                  Please provide the personal information of the controlling officer, typically the most senior manager at {entityName}, as this information is required for compliance purposes.
                                </p>
                              </div>

                              {/* Controlling Officer Card */}
                              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-base font-semibold text-gray-900">Nader Amiri</span>
                                      <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                                        SUGGESTED BY MIND LINKS AI
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                      <span className="flex items-center gap-1 text-red-600">
                                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                                        CITIZENSHIP IS REQUIRED
                                      </span>
                                      <span className="text-gray-500">+8 more details required</span>
                                    </div>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                                  >
                                    Edit details
                                  </Button>
                                </div>
                              </div>

                              {/* Ownership Question */}
                              <div className="pt-4 border-t border-gray-200">
                                <FormField
                                  control={form.control}
                                  name="controllingOfficerOwns25Percent"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-base font-semibold text-gray-900 mb-2 block">
                                        Does Nader Amiri own 25% or more of {entityName}?
                                      </FormLabel>
                                      <FormDescription className="text-sm text-gray-600 mb-4">
                                        Select 'Yes' if they have direct or indirect ownership of 25% or more in this entity.
                                      </FormDescription>
                                      <FormControl>
                                        <RadioGroup
                                          onValueChange={field.onChange}
                                          value={field.value}
                                          className="flex gap-6"
                                        >
                                          <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="yes" id="yes-25" />
                                            <Label htmlFor="yes-25" className="text-sm font-normal cursor-pointer">
                                              Yes
                                            </Label>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="no" id="no-25" />
                                            <Label htmlFor="no-25" className="text-sm font-normal cursor-pointer">
                                              No
                                            </Label>
                                          </div>
                                        </RadioGroup>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </CardContent>
                          </Card>

                          {/* Major Shareholders */}
                          <Card className="bg-white border-gray-200 shadow-sm">
                            <CardContent className="pt-6 space-y-6">
                              <FormField
                                control={form.control}
                                name="hasMajorShareholders"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-base font-semibold text-gray-900 mb-2 block">
                                      Are there any major shareholders?
                                    </FormLabel>
                                    <FormDescription className="text-sm text-gray-600 mb-4">
                                      These are individuals who directly or indirectly hold 25% or more of {entityName}, also known as Ultimate Beneficial Owners (UBOs).
                                    </FormDescription>
                                    <FormControl>
                                      <RadioGroup
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        className="flex gap-6"
                                      >
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem value="yes" id="yes-shareholders" />
                                          <Label htmlFor="yes-shareholders" className="text-sm font-normal cursor-pointer">
                                            Yes
                                          </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem value="no" id="no-shareholders" />
                                          <Label htmlFor="no-shareholders" className="text-sm font-normal cursor-pointer">
                                            No
                                          </Label>
                                        </div>
                                      </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              {form.watch("hasMajorShareholders") === "yes" && (
                                <div className="pt-4 border-t border-gray-200">
                                  <Button
                                    variant="outline"
                                    className="w-full border-gray-300 hover:bg-gray-50"
                                  >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add owner
                                  </Button>
                                </div>
                              )}
                            </CardContent>
                          </Card>

                          {/* Are you listed as PSC */}
                          <Card className="bg-white border-gray-200 shadow-sm">
                            <CardContent className="pt-6 space-y-4">
                              <div>
                                <h2 className="text-base font-semibold text-gray-900 mb-2">
                                  Are you listed above as any one of the Persons with Significant Control?
                                </h2>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                  We need to gather this information to submit your business details.
                                </p>
                              </div>
                              <FormField
                                control={form.control}
                                name="isListedAsPSC"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                      I am <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg text-sm">
                                          <SelectValue placeholder="Select an option" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="controlling-officer">Controlling Officer</SelectItem>
                                        <SelectItem value="major-shareholder">Major Shareholder (25%+)</SelectItem>
                                        <SelectItem value="both">Both</SelectItem>
                                        <SelectItem value="neither">Neither</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </CardContent>
                          </Card>

                          {/* Declaration */}
                          <Card className="bg-white border-gray-200 shadow-sm">
                            <CardContent className="pt-6">
                              <FormField
                                control={form.control}
                                name="declarationConfirmed"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel className="text-sm font-normal cursor-pointer text-gray-700">
                                        I confirm, to the best of my knowledge, that I have listed all shareholders of {entityName} with 25% or more direct or indirect ownership, as well as the most senior individual responsible for controlling, managing, or directing {entityName}.
                                        <span className="text-red-500 ml-1">*</span>
                                      </FormLabel>
                                      <FormMessage />
                                    </div>
                                  </FormItem>
                                )}
                              />
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}

                      {/* Step 4: Entity Documents */}
                      {currentStep === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-8"
                        >
                          <Card className="bg-blue-50/50 border-blue-100 shadow-sm">
                            <CardContent className="pt-6">
                              <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-blue-100 rounded-lg flex-shrink-0">
                                  <Info className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900 mb-2 text-base">
                                    Required Documents
                                  </h3>
                                  <p className="text-sm text-gray-600 leading-relaxed">
                                    Please upload the following documents to complete the entity verification process. All documents must be clear, legible, and in PDF or image format.
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Required Documents List */}
                          <div className="space-y-4">
                            {/* Formation Documents */}
                            <Card className="bg-white border-gray-200 shadow-sm">
                              <CardContent className="pt-6 space-y-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                                      Formation documents
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">
                                      Official documents establishing the entity (e.g., Certificate of Incorporation, Articles of Association, Memorandum of Association).
                                    </p>
                                    <div className="flex items-center gap-2 text-sm">
                                      <span className="text-red-600 font-medium">Required</span>
                                      <span className="text-gray-500">•</span>
                                      <span className="text-gray-500">PDF, JPG, or PNG</span>
                                    </div>
                                  </div>
                                  <Button variant="outline" size="sm" className="ml-4">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Control and Ownership Information */}
                            <Card className="bg-white border-gray-200 shadow-sm">
                              <CardContent className="pt-6 space-y-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                                      Control and ownership Information
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">
                                      Details of controlling officers and majority shareholders with 25% or more ownership (e.g., Share Register, Register of Members, Ownership Structure Chart).
                                    </p>
                                    <div className="flex items-center gap-2 text-sm">
                                      <span className="text-red-600 font-medium">Required</span>
                                      <span className="text-gray-500">•</span>
                                      <span className="text-gray-500">PDF, JPG, or PNG</span>
                                    </div>
                                  </div>
                                  <Button variant="outline" size="sm" className="ml-4">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Proof of Authority */}
                            <Card className="bg-white border-gray-200 shadow-sm">
                              <CardContent className="pt-6 space-y-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                                      Proof of authority
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">
                                      A board resolution or power of attorney, if you do not have control or majority ownership of the entity.
                                    </p>
                                    <div className="flex items-center gap-2 text-sm">
                                      <span className="text-amber-600 font-medium">Conditional</span>
                                      <span className="text-gray-500">•</span>
                                      <span className="text-gray-500">PDF, JPG, or PNG</span>
                                    </div>
                                  </div>
                                  <Button variant="outline" size="sm" className="ml-4">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Identity Documentation */}
                            <Card className="bg-white border-gray-200 shadow-sm">
                              <CardContent className="pt-6 space-y-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                                      Identity documentation
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">
                                      A government-issued ID for the controlling officer and major shareholders (e.g., Passport, National ID, Driver's License). Both front and back images are required.
                                    </p>
                                    <div className="flex items-center gap-2 text-sm">
                                      <span className="text-red-600 font-medium">Required</span>
                                      <span className="text-gray-500">•</span>
                                      <span className="text-gray-500">PDF, JPG, or PNG</span>
                                    </div>
                                  </div>
                                  <Button variant="outline" size="sm" className="ml-4">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Additional Documents */}
                            <Card className="bg-white border-gray-200 shadow-sm">
                              <CardContent className="pt-6 space-y-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                                      Additional documents (if applicable)
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">
                                      Any other documents that may be required based on your entity type or jurisdiction (e.g., Business License, Tax Registration Certificate).
                                    </p>
                                    <div className="flex items-center gap-2 text-sm">
                                      <span className="text-gray-600 font-medium">Optional</span>
                                      <span className="text-gray-500">•</span>
                                      <span className="text-gray-500">PDF, JPG, or PNG</span>
                                    </div>
                                  </div>
                                  <Button variant="outline" size="sm" className="ml-4">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3, 5: Placeholder steps */}
                      {(currentStep === 3 || currentStep === 5) && (
                      <motion.div
                        key={`step${currentStep}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                          <Card className="bg-white border-gray-200 shadow-sm">
                          <CardContent className="pt-6">
                              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                              {steps[currentStep - 1].title}
                            </h2>
                              <p className="text-gray-600">
                              This step is part of the verification process. Additional fields and requirements will
                              be added here.
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}

                    {/* Step 6: Review */}
                    {currentStep === 6 && (
                      <motion.div
                        key="step6"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                          <Card className="bg-white border-gray-200 shadow-sm">
                          <CardContent className="pt-6">
                              <h2 className="text-lg font-semibold text-gray-900 mb-4">Review your information</h2>
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                  <p className="text-sm font-medium text-gray-700">Formation Date:</p>
                                  <p className="text-gray-600">{form.watch("formationDate")}</p>
                              </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                  <p className="text-sm font-medium text-gray-700">Expected Volume:</p>
                                  <p className="text-gray-600">{form.watch("expectedVolume")}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
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
                      disabled={currentStep === 1}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                    {currentStep < 6 ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                          className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all font-medium"
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                          className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all font-medium disabled:opacity-50"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Verification"}
                      </Button>
                    )}
                  </motion.div>
                </form>
              </Form>
          </div>

          {/* Sidebar - Progress Indicator */}
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
                      {steps.map((step, index) => (
                        <motion.div
                          key={step.number}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className={cn(
                              "flex items-center gap-3 p-4 rounded-lg transition-all duration-300",
                            currentStep === step.number
                                ? "bg-blue-50 border border-blue-200"
                              : step.completed
                                ? "bg-white border border-green-200"
                                : "bg-white border border-gray-200"
                          )}
                        >
                          <motion.div
                              whileHover={{ scale: 1.05 }}
                            className={cn(
                              "flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-all",
                              step.completed
                                  ? "bg-green-600 text-white"
                                : currentStep === step.number
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-200 text-gray-500"
                            )}
                          >
                            {step.completed ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              <step.icon className="h-4 w-4" />
                            )}
                          </motion.div>
                          <div className="flex-1">
                            {step.completed && (
                              <span className="text-xs text-green-600 font-semibold">COMPLETED </span>
                            )}
                            <span
                              className={cn(
                                "text-sm font-medium block",
                                step.completed
                                  ? "text-green-700"
                                  : currentStep === step.number
                                  ? "text-blue-700 font-semibold"
                                    : "text-gray-500"
                              )}
                            >
                              {step.title}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Info */}
                <Card className="bg-purple-50/50 border-purple-100 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-sm">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">mind Links AI</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          The highlighted fields have been auto-populated. If any of the information seems incorrect,
                          please update it as needed.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Support */}
                  <Card className="bg-white border-gray-200 shadow-sm">
                  <CardContent className="pt-6">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Need extra support?</h3>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntityVerification;
