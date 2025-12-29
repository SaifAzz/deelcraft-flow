import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  User,
  CheckCircle2,
  ArrowLeft,
  Info,
  X,
  Sparkles,
  Headphones,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Checkbox } from "@/shared/components/ui/checkbox";
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
import { cn } from "@/shared/lib/utils";
import { aiService } from "@/shared/services/aiService";
import { Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/shared/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import ClientDashboard from "../dashboards/client/pages/Dashboard";
import { MindLinksLogo } from "@/shared/components/MindLinksLogo";

// Form validation schema
const onboardingSchema = z.object({
  // Step 1: Organization
  productsServices: z
    .string()
    .min(50, "Please provide at least 50 characters")
    .max(500, "Maximum 500 characters allowed"),
  workType: z
    .string()
    .min(50, "Please provide at least 50 characters")
    .max(2000, "Maximum 2000 characters allowed"),
  companyWebsite: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  noCompanyWebsite: z.boolean().optional(),
  companyLinkedIn: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  noCompanyLinkedIn: z.boolean().optional(),
  personalLinkedIn: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  noPersonalLinkedIn: z.boolean().optional(),
  // Step 2: Point of Contact
  isPointOfContact: z.boolean(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
}).refine(
  (data) => {
    if (!data.noCompanyWebsite && !data.companyWebsite) {
      return false;
    }
    return true;
  },
  {
    message: "Please provide a company website URL or check 'We don't have a company website'",
    path: ["companyWebsite"],
  }
).refine(
  (data) => {
    if (!data.noCompanyLinkedIn && !data.companyLinkedIn) {
      return false;
    }
    return true;
  },
  {
    message: "Please provide a company LinkedIn URL or check 'We don't have a company LinkedIn account'",
    path: ["companyLinkedIn"],
  }
);

type OnboardingFormData = z.infer<typeof onboardingSchema>;

const STORAGE_KEY = "company_profile_onboarding_completed";

export const CompanyProfileOnboarding = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);
  const [autoFilledFields, setAutoFilledFields] = useState<Set<string>>(new Set());
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      productsServices: "",
      workType: "",
      companyWebsite: "",
      noCompanyWebsite: false,
      companyLinkedIn: "",
      noCompanyLinkedIn: false,
      personalLinkedIn: "",
      noPersonalLinkedIn: false,
      isPointOfContact: true,
      firstName: "",
      lastName: "",
      email: "",
    },
    mode: "onChange",
  });

  const { watch, trigger } = form;
  const noCompanyWebsite = watch("noCompanyWebsite");
  const noCompanyLinkedIn = watch("noCompanyLinkedIn");
  const noPersonalLinkedIn = watch("noPersonalLinkedIn");
  const isPointOfContact = watch("isPointOfContact");

  const steps = [
    { number: 1, title: "Your organization", completed: currentStep > 1 },
    { number: 2, title: "Point of contact", completed: currentStep > 2 },
    { number: 3, title: "Review and submit", completed: false },
  ];

  const handleNext = async () => {
    let fieldsToValidate: (keyof OnboardingFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = [
        "productsServices",
        "workType",
        "companyWebsite",
        "companyLinkedIn",
      ];
    } else if (currentStep === 2) {
      fieldsToValidate = ["firstName", "lastName", "email"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAIAutoFill = async () => {
    setIsAILoading(true);
    try {
      // Get company name from form or use a default
      const companyName = "Your Company"; // In production, get from user profile or input
      const website = form.watch("companyWebsite") || undefined;

      const result = await aiService.autoFillCompanyProfile(companyName, website);

      // Update form with AI-generated data
      if (result.productsServices) {
        form.setValue("productsServices", result.productsServices);
        setAutoFilledFields((prev) => new Set(prev).add("productsServices"));
      }
      if (result.workType) {
        form.setValue("workType", result.workType);
        setAutoFilledFields((prev) => new Set(prev).add("workType"));
      }
      if (result.companyWebsite) {
        form.setValue("companyWebsite", result.companyWebsite);
        setAutoFilledFields((prev) => new Set(prev).add("companyWebsite"));
      }
      if (result.companyLinkedIn) {
        form.setValue("companyLinkedIn", result.companyLinkedIn);
        setAutoFilledFields((prev) => new Set(prev).add("companyLinkedIn"));
      }
      if (result.personalLinkedIn) {
        form.setValue("personalLinkedIn", result.personalLinkedIn);
        setAutoFilledFields((prev) => new Set(prev).add("personalLinkedIn"));
      }

      toast.toast({
        title: "AI Auto-fill Complete",
        description: `Successfully filled ${result.autoFilledFields.length} field(s). Please review and edit as needed.`,
      });
    } catch (error) {
      console.error("Error with AI auto-fill:", error);
      toast.toast({
        title: "Auto-fill Error",
        description: "Failed to auto-fill fields. Please try again or fill manually.",
        variant: "destructive",
      });
    } finally {
      setIsAILoading(false);
    }
  };

  const onSubmit = async (data: OnboardingFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store completion status
      localStorage.setItem(STORAGE_KEY, "true");
      localStorage.setItem("company_profile_data", JSON.stringify(data));

      // Only show success modal after successful submission
      setIsSubmitting(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error submitting onboarding:", error);
      setIsSubmitting(false);
    }
  };

  const productsServicesLength = watch("productsServices")?.length || 0;
  const workTypeLength = watch("workType")?.length || 0;

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
              onClick={() => navigate("/client-dashboard")}
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
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h1 className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight">
                          {currentStep === 1
                            ? "Tell us about your organization"
                            : currentStep === 2
                              ? "Financial point of contact"
                              : "Review your organization details"}
                        </h1>
                        <p className="text-gray-600 text-base">
                          {currentStep === 1
                            ? "For your company"
                            : currentStep === 2
                              ? "Designate a contact person"
                              : "Verify your information"}
                        </p>
                      </div>
                      {currentStep === 1 && (
                        <Button
                          type="button"
                          onClick={handleAIAutoFill}
                          disabled={isAILoading}
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all font-medium px-5"
                        >
                          {isAILoading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4 mr-2" />
                              AI Auto-fill
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </motion.div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      {/* Step 1: Your Organization */}
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
                            {/* Understanding your business */}
                            <Card className="bg-blue-50/50 border-blue-100 shadow-sm">
                              <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                  <div className="p-2.5 bg-blue-100 rounded-lg flex-shrink-0">
                                    <Info className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-gray-900 mb-2 text-base">
                                      Understanding your business
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                      For legal and compliance reasons, we need a few more details to help
                                      verify your organization.
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Products or Services */}
                            <Card className="bg-white border-gray-200 shadow-sm">
                              <CardContent className="pt-6 space-y-4">
                                <h2 className="text-lg font-semibold text-gray-900">
                                  Describe the products or services you sell
                                </h2>
                                <FormField
                                  control={form.control}
                                  name="productsServices"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-sm font-medium text-gray-700">
                                        Description <span className="text-red-500">*</span>
                                      </FormLabel>
                                      <FormControl>
                                        <Textarea
                                          {...field}
                                          placeholder="Describe your products or services..."
                                          className={cn(
                                            "min-h-[120px] resize-none border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all text-sm",
                                            autoFilledFields.has("productsServices") && "border-purple-400 bg-purple-50/50"
                                          )}
                                          maxLength={500}
                                        />
                                      </FormControl>
                                      <div className="flex items-center justify-between">
                                        <FormDescription className="text-xs text-gray-500">
                                          {productsServicesLength} / 500
                                        </FormDescription>
                                        <FormMessage />
                                      </div>
                                    </FormItem>
                                  )}
                                />
                              </CardContent>
                            </Card>

                            {/* Work Type */}
                            <Card className="bg-white border-gray-200 shadow-sm">
                              <CardContent className="pt-6 space-y-4">
                                <h2 className="text-lg font-semibold text-gray-900">
                                  What type of work will your contractors or employees be performing?
                                </h2>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                  Please briefly describe the roles and responsibilities of the workers you
                                  plan to add or pay through our platform. This information helps us
                                  understand your business and ensure compliance with our Terms of Service.
                                </p>
                                <FormField
                                  control={form.control}
                                  name="workType"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-sm font-medium text-gray-700">
                                        Description <span className="text-red-500">*</span>
                                      </FormLabel>
                                      <FormControl>
                                        <Textarea
                                          {...field}
                                          placeholder="Describe the type of work..."
                                          className={cn(
                                            "min-h-[120px] resize-none border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all text-sm",
                                            autoFilledFields.has("workType") && "border-purple-400 bg-purple-50/50"
                                          )}
                                          maxLength={2000}
                                        />
                                      </FormControl>
                                      <div className="flex items-center justify-between">
                                        <FormDescription className="text-xs text-gray-500">
                                          {workTypeLength} / 2000
                                        </FormDescription>
                                        <FormMessage />
                                      </div>
                                    </FormItem>
                                  )}
                                />
                              </CardContent>
                            </Card>

                            {/* Online Presence */}
                            <Card className="bg-white border-gray-200 shadow-sm">
                              <CardContent className="pt-6 space-y-6">
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <LinkIcon className="h-5 w-5 text-blue-600" />
                                    <h2 className="text-lg font-semibold text-gray-900">
                                      Online Presence
                                    </h2>
                                  </div>
                                  <p className="text-sm text-gray-600 leading-relaxed">
                                    This helps us verify your organization's customer-facing profile,
                                    including your brand, products and services.
                                  </p>
                                </div>

                                {/* Company Website */}
                                <div className="space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="companyWebsite"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700">
                                          Company Website URL <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            type="url"
                                            placeholder="https://www.example.com"
                                            disabled={noCompanyWebsite}
                                            className={cn(
                                              "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all text-sm",
                                              noCompanyWebsite && "bg-gray-100 text-gray-400",
                                              autoFilledFields.has("companyWebsite") && "border-purple-400 bg-purple-50/50"
                                            )}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="noCompanyWebsite"
                                    render={({ field }) => (
                                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value}
                                            onCheckedChange={(checked) => {
                                              field.onChange(checked);
                                              if (checked) {
                                                form.setValue("companyWebsite", "");
                                              }
                                            }}
                                          />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                          <FormLabel className="text-sm font-normal cursor-pointer">
                                            We don't have a company website
                                          </FormLabel>
                                        </div>
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                {/* Company LinkedIn */}
                                <div className="space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="companyLinkedIn"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700">
                                          Company LinkedIn URL <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            type="url"
                                            placeholder="https://www.linkedin.com/company/example"
                                            disabled={noCompanyLinkedIn}
                                            className={cn(
                                              "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all text-sm",
                                              noCompanyLinkedIn && "bg-gray-100 text-gray-400",
                                              autoFilledFields.has("companyLinkedIn") && "border-purple-400 bg-purple-50/50"
                                            )}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="noCompanyLinkedIn"
                                    render={({ field }) => (
                                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value}
                                            onCheckedChange={(checked) => {
                                              field.onChange(checked);
                                              if (checked) {
                                                form.setValue("companyLinkedIn", "");
                                              }
                                            }}
                                          />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                          <FormLabel className="text-sm font-normal cursor-pointer">
                                            We don't have a company LinkedIn account
                                          </FormLabel>
                                        </div>
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                {/* Personal LinkedIn */}
                                <div className="space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="personalLinkedIn"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700">
                                          Personal LinkedIn URL
                                        </FormLabel>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            type="url"
                                            placeholder="https://www.linkedin.com/in/example"
                                            disabled={noPersonalLinkedIn}
                                            className={cn(
                                              "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all text-sm",
                                              noPersonalLinkedIn && "bg-gray-100 text-gray-400",
                                              autoFilledFields.has("personalLinkedIn") && "border-purple-400 bg-purple-50/50"
                                            )}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="noPersonalLinkedIn"
                                    render={({ field }) => (
                                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value}
                                            onCheckedChange={(checked) => {
                                              field.onChange(checked);
                                              if (checked) {
                                                form.setValue("personalLinkedIn", "");
                                              }
                                            }}
                                          />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                          <FormLabel className="text-sm font-normal cursor-pointer">
                                            I don't have a personal LinkedIn account
                                          </FormLabel>
                                        </div>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Step 2: Point of Contact */}
                      <AnimatePresence mode="wait">
                        {currentStep === 2 && (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8"
                          >
                            <div>
                              <Card className="bg-purple-50/50 border-purple-100 shadow-sm mt-4">
                                <CardContent className="pt-6">
                                  <div className="flex items-start gap-4">
                                    <div className="p-2.5 bg-purple-100 rounded-lg flex-shrink-0">
                                      <Info className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                      <h3 className="font-semibold text-gray-900 mb-2 text-base">
                                        What is a point of contact?
                                      </h3>
                                      <p className="text-sm text-gray-600 leading-relaxed">
                                        We require each entity to have a designated financial point of
                                        contact to assist with managing financial matters related to your
                                        account. If you prefer not to be the designated POC, kindly provide
                                        us with the relevant contact information so we can reach out to the
                                        appropriate person. You can change the details any time.
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>

                            <Card className="bg-white border-gray-200 shadow-sm">
                              <CardContent className="pt-6 space-y-6">

                                <FormField
                                  control={form.control}
                                  name="isPointOfContact"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                          className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <FormLabel className="text-sm font-medium cursor-pointer text-gray-900">
                                          I will be the designated point of contact
                                        </FormLabel>
                                      </div>
                                    </FormItem>
                                  )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700">
                                          First name <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            placeholder="Enter first name"
                                            className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all text-sm"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700">
                                          Last name <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            placeholder="Enter last name"
                                            className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all text-sm"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                <FormField
                                  control={form.control}
                                  name="email"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-sm font-medium text-gray-700">
                                        Email <span className="text-red-500">*</span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          type="email"
                                          placeholder="Enter email address"
                                          className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all text-sm"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </CardContent>
                            </Card>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Step 3: Review and Submit */}
                      <AnimatePresence mode="wait">
                        {currentStep === 3 && (
                          <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8"
                          >

                            <div className="space-y-6">
                              {/* Products/Services */}
                              <Card className="bg-white border-gray-200 shadow-sm">
                                <CardContent className="pt-6">
                                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-blue-600" />
                                    Describe the products or services you sell:
                                  </h3>
                                  <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed bg-gray-50 p-4 rounded-lg">
                                    {form.watch("productsServices")}
                                  </p>
                                </CardContent>
                              </Card>

                              {/* Work Type */}
                              <Card className="bg-white border-gray-200 shadow-sm">
                                <CardContent className="pt-6">
                                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <User className="h-4 w-4 text-purple-600" />
                                    What type of work will your contractors or employees be performing?
                                  </h3>
                                  <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed bg-gray-50 p-4 rounded-lg">
                                    {form.watch("workType")}
                                  </p>
                                </CardContent>
                              </Card>

                              {/* Online Presence */}
                              <Card className="bg-white border-gray-200 shadow-sm">
                                <CardContent className="pt-6">
                                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <LinkIcon className="h-4 w-4 text-indigo-600" />
                                    Online Presence:
                                  </h3>
                                  <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                      <span className="font-medium text-gray-700">Personal LinkedIn URL: </span>
                                      <span className="text-gray-600">
                                        {form.watch("personalLinkedIn") || "Not specified"}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                      <span className="font-medium text-gray-700">Company website URL: </span>
                                      {form.watch("companyWebsite") ? (
                                        <a
                                          href={form.watch("companyWebsite")}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                                        >
                                          {form.watch("companyWebsite")}
                                        </a>
                                      ) : (
                                        <span className="text-gray-600">Not specified</span>
                                      )}
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                      <span className="font-medium text-gray-700">Company LinkedIn URL: </span>
                                      {form.watch("companyLinkedIn") ? (
                                        <a
                                          href={form.watch("companyLinkedIn")}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                                        >
                                          {form.watch("companyLinkedIn")}
                                        </a>
                                      ) : (
                                        <span className="text-gray-600">Not specified</span>
                                      )}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Point of Contact */}
                              <Card className="bg-white border-gray-200 shadow-sm">
                                <CardContent className="pt-6">
                                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <User className="h-4 w-4 text-green-600" />
                                    Point of contact:
                                  </h3>
                                  <div className="space-y-2 text-sm p-4 bg-gray-50 rounded-lg">
                                    <p className="font-medium text-gray-900">
                                      {form.watch("firstName")} {form.watch("lastName")}
                                    </p>
                                    <p className="text-gray-600">{form.watch("email")}</p>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
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
                        {currentStep < 3 ? (
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
                            {isSubmitting ? "Submitting..." : "Submit"}
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
                                  step.number
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
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">AI Assistant</h3>
                            <p className="text-xs text-gray-600 leading-relaxed mb-3">
                              Fields highlighted in purple have been auto-filled. If you feel any of the details are
                              incorrect, please update.
                            </p>
                            {autoFilledFields.size > 0 && (
                              <div className="mt-2 pt-2 border-t border-purple-200">
                                <p className="text-xs font-medium text-purple-700 mb-1">
                                  Auto-filled ({autoFilledFields.size}):
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {Array.from(autoFilledFields).map((field) => (
                                    <span
                                      key={field}
                                      className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full"
                                    >
                                      {field.replace(/([A-Z])/g, " $1").trim()}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
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
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Success Modal - Only show after form submission */}
      <Dialog 
        open={showSuccessModal} 
        onOpenChange={(open) => {
          // Only allow closing, not opening via Dialog's built-in controls
          if (!open) {
            setShowSuccessModal(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-md p-0 gap-0">
          <DialogHeader className="px-6 pt-6 pb-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                {/* Light green circular background */}
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  {/* Purple signpost background */}
                  <div className="w-16 h-16 rounded-lg bg-purple-500 flex items-center justify-center">
                    {/* White square */}
                    <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
                      {/* Green checkmark */}
                      <CheckCircle2 className="h-7 w-7 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogTitle className="text-center text-2xl font-semibold text-gray-900">
              Information submitted successfully
            </DialogTitle>
            <DialogDescription className="text-center pt-3 text-gray-600 text-base">
              Would you like to add your first entity?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 px-6 pb-6 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowSuccessModal(false);
                // Ensure localStorage is set (it should already be set in onSubmit)
                localStorage.setItem("company_profile_onboarding_completed", "true");
                // Trigger a custom event to notify ClientDashboard to refresh
                window.dispatchEvent(new CustomEvent('onboardingStatusChanged'));
                // Navigate to dashboard which will show the continue onboarding page
                navigate("/client-dashboard");
              }}
              className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
            >
              Not now
            </Button>
            <Button
              type="button"
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/entity-creation");
              }}
              className="flex-1 bg-gray-900 text-white hover:bg-gray-800"
            >
              Add entity
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyProfileOnboarding;

