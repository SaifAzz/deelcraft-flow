import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  MapPin,
  Shield,
  User,
  CheckCircle2,
  ArrowLeft,
  Info,
  X,
  Sparkles,
  Headphones,
  Globe,
  Phone,
  FileText,
  CheckCircle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/lib/utils";
import { useToast } from "@/shared/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

// Form validation schema
const entitySchema = z.object({
  // Step 1: Entity Details
  countryOfIncorporation: z.string().min(1, "Country is required"),
  legalEntityNameOriginal: z.string().optional(),
  entityName: z.string().min(1, "Entity name is required"),
  entityType: z.string().min(1, "Entity type is required"),
  isForeignEntity: z.boolean().optional(),
  industryCategory: z.string().min(1, "Industry category is required"),
  dialCode: z.string().min(1, "Dial code is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  usePersonalPhone: z.boolean().optional(),
  taxId: z.string().min(1, "Tax ID is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  businessCode: z.string().optional(),
  // Step 2: Entity Address
  registeredAddressLine1: z.string().min(1, "Address line 1 is required"),
  registeredAddressLine2: z.string().optional(),
  registeredCity: z.string().min(1, "City is required"),
  registeredProvince: z.string().min(1, "Province is required"),
  registeredPostalCode: z.string().min(1, "Postal code is required"),
  registeredCountry: z.string().min(1, "Country is required"),
  useAsMailingAddress: z.boolean().optional(),
  useAsOperatingAddress: z.boolean().optional(),
  operatingAddressLine1: z.string().optional(),
  operatingAddressLine2: z.string().optional(),
  operatingCity: z.string().optional(),
  operatingPostalCode: z.string().optional(),
  operatingCountry: z.string().optional(),
  // Step 3: Entity Verification
  useDeelContractor: z.boolean().optional(),
  useDeelCOR: z.boolean().optional(),
  useDeelEOR: z.boolean().optional(),
  useNone: z.boolean().optional(),
  // Step 4: Point of Contact
  pocFirstName: z.string().min(1, "First name is required"),
  pocLastName: z.string().min(1, "Last name is required"),
  pocEmail: z.string().email("Please enter a valid email address"),
  pocIsDesignated: z.boolean().optional(),
});

type EntityFormData = z.infer<typeof entitySchema>;

const STORAGE_KEY = "entity_creation_completed";

export const EntityCreation = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const form = useForm<EntityFormData>({
    resolver: zodResolver(entitySchema),
    defaultValues: {
      countryOfIncorporation: "",
      legalEntityNameOriginal: "",
      entityName: "",
      entityType: "",
      isForeignEntity: false,
      industryCategory: "",
      dialCode: "+971",
      phoneNumber: "",
      usePersonalPhone: false,
      taxId: "",
      licenseNumber: "",
      businessCode: "",
      registeredAddressLine1: "",
      registeredAddressLine2: "",
      registeredCity: "",
      registeredProvince: "",
      registeredPostalCode: "",
      registeredCountry: "United Arab Emirates",
      useAsMailingAddress: true,
      useAsOperatingAddress: false,
      operatingAddressLine1: "",
      operatingAddressLine2: "",
      operatingCity: "",
      operatingPostalCode: "",
      operatingCountry: "United Arab Emirates",
      useDeelContractor: false,
      useDeelCOR: false,
      useDeelEOR: false,
      useNone: false,
      pocFirstName: "",
      pocLastName: "",
      pocEmail: "",
      pocIsDesignated: true,
    },
    mode: "onChange",
  });

  const { watch, trigger } = form;
  const useAsOperatingAddress = watch("useAsOperatingAddress");
  const usePersonalPhone = watch("usePersonalPhone");

  const steps = [
    { number: 1, title: "Entity details", icon: Building2, completed: currentStep > 1 },
    { number: 2, title: "Entity address", icon: MapPin, completed: currentStep > 2 },
    { number: 3, title: "Entity verification", icon: Shield, completed: currentStep > 3 },
    { number: 4, title: "Point of contact", icon: User, completed: currentStep > 4 },
    { number: 5, title: "Review and submit", icon: CheckCircle, completed: false },
  ];

  const handleNext = async () => {
    let fieldsToValidate: (keyof EntityFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = [
        "countryOfIncorporation",
        "entityName",
        "entityType",
        "industryCategory",
        "dialCode",
        "phoneNumber",
        "taxId",
        "licenseNumber",
      ];
    } else if (currentStep === 2) {
      fieldsToValidate = [
        "registeredAddressLine1",
        "registeredCity",
        "registeredProvince",
        "registeredPostalCode",
        "registeredCountry",
      ];
      if (useAsOperatingAddress) {
        fieldsToValidate.push(
          "operatingAddressLine1",
          "operatingCity",
          "operatingPostalCode",
          "operatingCountry"
        );
      }
    } else if (currentStep === 3) {
      // At least one product must be selected or "none"
      const useContractor = watch("useDeelContractor");
      const useCOR = watch("useDeelCOR");
      const useEOR = watch("useDeelEOR");
      const useNone = watch("useNone");
      if (!useContractor && !useCOR && !useEOR && !useNone) {
        toast.toast({
          title: "Selection Required",
          description: "Please select at least one product or 'None of the above'",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 4) {
      fieldsToValidate = ["pocFirstName", "pocLastName", "pocEmail"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: EntityFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Store completion status
      localStorage.setItem(STORAGE_KEY, "true");
      localStorage.setItem("entity_data", JSON.stringify(data));

      toast.toast({
        title: "Entity Created Successfully",
        description: "Your entity has been created successfully.",
      });

      // Show modal asking about verification
      setTimeout(() => {
        setShowVerificationModal(true);
      }, 1500);
    } catch (error) {
      console.error("Error submitting entity:", error);
      toast.toast({
        title: "Error",
        description: "Failed to create entity. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-10 shadow-sm"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <div className="text-2xl font-bold">
              <span className="text-slate-900">mind</span>
            </div>
            <span className="mx-1.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            </span>
            <span className="text-2xl font-bold text-blue-500">Links</span>
          </motion.div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/client-dashboard")}
            className="h-8 w-8 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-3">
                Add new entity
              </h1>
              <p className="text-slate-600 text-lg">For your company</p>
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
                      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-md">
                        <CardContent className="pt-6 space-y-6">
                          <h2 className="text-xl font-semibold text-slate-900">Entity details</h2>

                          <FormField
                            control={form.control}
                            name="countryOfIncorporation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">
                                  Country of incorporation <span className="text-red-500">*</span>
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg">
                                      <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
                                    <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                                    <SelectItem value="Egypt">Egypt</SelectItem>
                                    <SelectItem value="United States">United States</SelectItem>
                                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="legalEntityNameOriginal"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">
                                  Legal entity name in country of origin language (optional)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Enter the entity name as officially registered in its original language"
                                    className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg"
                                  />
                                </FormControl>
                                <FormDescription className="text-xs text-slate-500">
                                  Enter the entity name as officially registered in its original language.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="entityName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">
                                  Entity name <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Enter the entity's name in a latin-character language like english"
                                    className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg"
                                  />
                                </FormControl>
                                <FormDescription className="text-xs text-slate-500">
                                  Enter the entity's name in a latin-character language like english.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="entityType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">
                                  Entity type <span className="text-red-500">*</span>
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg">
                                      <SelectValue placeholder="Select entity type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Limited liability company (LLC)">
                                      Limited liability company (LLC)
                                    </SelectItem>
                                    <SelectItem value="Company limited by guarantee">
                                      Company limited by guarantee
                                    </SelectItem>
                                    <SelectItem value="Incorporation">Incorporation</SelectItem>
                                    <SelectItem value="General partnership">General partnership</SelectItem>
                                    <SelectItem value="Joint stock companies">Joint stock companies</SelectItem>
                                    <SelectItem value="Branch of a foreign company">
                                      Branch of a foreign company
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <div className="flex items-center gap-2 mt-2">
                                  <Info className="h-4 w-4 text-slate-400" />
                                  <a href="#" className="text-sm text-blue-600 hover:underline">
                                    What is Entity type?
                                  </a>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="isForeignEntity"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="border-slate-300 data-[state=checked]:bg-blue-500"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm font-normal cursor-pointer">
                                    This is a Foreign Entity Registration (FER)
                                  </FormLabel>
                                  <Info className="h-4 w-4 text-slate-400 inline ml-1" />
                                </div>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="industryCategory"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">
                                  Industry category <span className="text-red-500">*</span>
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg">
                                      <SelectValue placeholder="Select industry" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Other - Information and Media">
                                      Other - Information and Media
                                    </SelectItem>
                                    <SelectItem value="Other - Retail Trade">Other - Retail Trade</SelectItem>
                                    <SelectItem value="Health Care and Social Assistance">
                                      Health Care and Social Assistance
                                    </SelectItem>
                                    <SelectItem value="Telemedicine Platform">Telemedicine Platform</SelectItem>
                                    <SelectItem value="Technology Services">Technology Services</SelectItem>
                                    <SelectItem value="Financial Services">Financial Services</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="pt-4 border-t border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                              <Phone className="h-5 w-5 text-blue-500" />
                              Contact number
                            </h3>
                            <p className="text-sm text-slate-600 mb-4">
                              This number will appear on official documents such as payslips.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <FormField
                                control={form.control}
                                name="dialCode"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                      Dial code <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg">
                                          <SelectValue />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="+971">+971 (UAE)</SelectItem>
                                        <SelectItem value="+966">+966 (Saudi Arabia)</SelectItem>
                                        <SelectItem value="+20">+20 (Egypt)</SelectItem>
                                        <SelectItem value="+1">+1 (USA)</SelectItem>
                                        <SelectItem value="+44">+44 (UK)</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                  <FormItem className="md:col-span-2">
                                    <FormLabel className="text-sm font-medium">
                                      Phone number <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Enter phone number"
                                        className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={form.control}
                              name="usePersonalPhone"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="border-slate-300 data-[state=checked]:bg-blue-500"
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm font-normal cursor-pointer">
                                      Use my personal phone number
                                    </FormLabel>
                                    {usePersonalPhone && (
                                      <p className="text-xs text-slate-500">+971564028880</p>
                                    )}
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="pt-4 border-t border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                              <FileText className="h-5 w-5 text-purple-500" />
                              Identification details
                            </h3>

                            <FormField
                              control={form.control}
                              name="taxId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">
                                    Tax ID <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Enter tax ID"
                                      className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg"
                                    />
                                  </FormControl>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Info className="h-4 w-4 text-slate-400" />
                                    <a href="#" className="text-sm text-blue-600 hover:underline">
                                      What is Tax ID?
                                    </a>
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="licenseNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">
                                    License Number UAE <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Enter license number"
                                      className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg"
                                    />
                                  </FormControl>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Info className="h-4 w-4 text-slate-400" />
                                    <a href="#" className="text-sm text-blue-600 hover:underline">
                                      What is License Number UAE?
                                    </a>
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="businessCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">Business code (optional)</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Enter business code"
                                      className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg"
                                    />
                                  </FormControl>
                                  <FormDescription className="text-xs text-slate-500">
                                    An optional custom identifier for your business.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Step 2: Entity Address */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-md">
                        <CardContent className="pt-6 space-y-6">
                          <div>
                            <h2 className="text-xl font-semibold text-slate-900 mb-2">Registered address</h2>
                            <p className="text-sm text-slate-600">
                              Official legal address, typically found in registration certificates and government
                              filings.
                            </p>
                          </div>

                          <FormField
                            control={form.control}
                            name="registeredAddressLine1"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">
                                  Address line 1 <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Enter address line 1"
                                    className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="registeredAddressLine2"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">Address line 2</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Enter address line 2"
                                    className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="registeredCity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">
                                    City <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Enter city"
                                      className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="registeredProvince"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">
                                    Province <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg">
                                        <SelectValue placeholder="Select province" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Dubai">Dubai</SelectItem>
                                      <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                                      <SelectItem value="Sharjah">Sharjah</SelectItem>
                                      <SelectItem value="Ras Al Khaimah">Ras Al Khaimah</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="registeredPostalCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">
                                    Postal code <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Enter postal code"
                                      className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="registeredCountry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">
                                    Country <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg">
                                        <SelectValue />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
                                      <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                                      <SelectItem value="Egypt">Egypt</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="space-y-4 pt-4 border-t border-slate-200">
                            <FormField
                              control={form.control}
                              name="useAsMailingAddress"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-slate-200 p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-sm font-medium cursor-pointer">
                                      Use this address as the mailing address
                                    </FormLabel>
                                    <FormDescription className="text-xs text-slate-500">
                                      Location for mailing purposes
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <input
                                      type="checkbox"
                                      checked={field.value}
                                      onChange={field.onChange}
                                      className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="useAsOperatingAddress"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-slate-200 p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-sm font-medium cursor-pointer">
                                      Use this address as the operating address
                                    </FormLabel>
                                    <FormDescription className="text-xs text-slate-500">
                                      Location of business operations, typically found in contracts and invoices
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <input
                                      type="checkbox"
                                      checked={field.value}
                                      onChange={field.onChange}
                                      className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>

                          {useAsOperatingAddress && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="pt-4 border-t border-slate-200 space-y-4"
                            >
                              <div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Operating address</h3>
                                <p className="text-sm text-slate-600">
                                  Location of business operations, typically found in contracts and invoices.
                                </p>
                              </div>

                              <FormField
                                control={form.control}
                                name="operatingAddressLine1"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                      Address line 1 <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Enter address line 1"
                                        className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="operatingAddressLine2"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium">Address line 2</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Enter address line 2"
                                        className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="operatingCity"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-sm font-medium">
                                        City <span className="text-red-500">*</span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          placeholder="Enter city"
                                          className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="operatingPostalCode"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-sm font-medium">
                                        Postal code <span className="text-red-500">*</span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          placeholder="Enter postal code"
                                          className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <FormField
                                control={form.control}
                                name="operatingCountry"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                      Country <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg">
                                          <SelectValue />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
                                        <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                                        <SelectItem value="Egypt">Egypt</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </motion.div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Step 3: Entity Verification */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <Card className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 border-blue-200/50 shadow-lg shadow-blue-100/50">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Info className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                                Why do I need to choose which products this entity will use?
                              </h3>
                              <p className="text-sm text-slate-600 leading-relaxed">
                                To meet compliance and regulatory standards, the level of verification required
                                depends on the mind Links products you choose to use with this entity.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-md">
                        <CardContent className="pt-6 space-y-6">
                          <div>
                            <h2 className="text-xl font-semibold text-slate-900 mb-2">
                              Do you intend to use any of these products with this entity?
                            </h2>
                            <p className="text-sm text-slate-600">
                              Other mind Links payroll products are available and may require verification later.
                            </p>
                          </div>

                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name="useDeelContractor"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-slate-200 p-4 hover:bg-slate-50/50 transition-colors">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="border-slate-300 data-[state=checked]:bg-blue-500 mt-1"
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none flex-1">
                                    <FormLabel className="text-sm font-semibold cursor-pointer text-slate-900">
                                      mind Links Contractor
                                    </FormLabel>
                                    <FormDescription className="text-xs text-slate-600">
                                      Compliantly work with and pay contractors worldwide.
                                    </FormDescription>
                                    <Info className="h-4 w-4 text-slate-400 inline ml-1" />
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="useDeelCOR"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-slate-200 p-4 hover:bg-slate-50/50 transition-colors">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="border-slate-300 data-[state=checked]:bg-blue-500 mt-1"
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none flex-1">
                                    <FormLabel className="text-sm font-semibold cursor-pointer text-slate-900">
                                      mind Links Contractor of Record
                                    </FormLabel>
                                    <FormDescription className="text-xs text-slate-600">
                                      Hire contractors compliantly via mind Links.
                                    </FormDescription>
                                    <Info className="h-4 w-4 text-slate-400 inline ml-1" />
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="useDeelEOR"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-slate-200 p-4 hover:bg-slate-50/50 transition-colors">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="border-slate-300 data-[state=checked]:bg-blue-500 mt-1"
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none flex-1">
                                    <FormLabel className="text-sm font-semibold cursor-pointer text-slate-900">
                                      mind Links Employer of Record
                                    </FormLabel>
                                    <FormDescription className="text-xs text-slate-600">
                                      Hire employees where you don't have any entities.
                                    </FormDescription>
                                    <Info className="h-4 w-4 text-slate-400 inline ml-1" />
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="useNone"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-slate-200 p-4 hover:bg-slate-50/50 transition-colors">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="border-slate-300 data-[state=checked]:bg-blue-500 mt-1"
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none flex-1">
                                    <FormLabel className="text-sm font-semibold cursor-pointer text-slate-900">
                                      None of the above
                                    </FormLabel>
                                    <FormDescription className="text-xs text-slate-600">
                                      If you choose to activate any of the above products later, or any other mind Links
                                      payroll products, you will need to verify this entity at that time.
                                    </FormDescription>
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Step 4: Point of Contact */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">Financial point of contact</h2>
                        <Card className="bg-gradient-to-br from-purple-50/50 to-pink-50/30 border-purple-200/50 shadow-lg shadow-purple-100/50 mt-4">
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-4">
                              <div className="p-2 bg-purple-100 rounded-lg">
                                <Info className="h-5 w-5 text-purple-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                                  What is a point of contact?
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  We require each entity to have a designated financial point of contact to assist
                                  with managing financial matters related to your account. If you prefer not to be
                                  the designated POC, kindly provide us with the relevant contact information so we
                                  can reach out to the appropriate person. You can change the details any time.
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-md">
                        <CardContent className="pt-6 space-y-6">
                          <FormField
                            control={form.control}
                            name="pocIsDesignated"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 bg-slate-50/50 rounded-lg border border-slate-200/50">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="border-slate-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm font-medium cursor-pointer text-slate-900">
                                    I will be the designated point of contact
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="pocFirstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">
                                    First name <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Enter first name"
                                      className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="pocLastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">
                                    Last name <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Enter last name"
                                      className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="pocEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">
                                  Email <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="email"
                                    placeholder="Enter email address"
                                    className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all"
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

                  {/* Step 5: Review and Submit */}
                  {currentStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <h2 className="text-xl font-semibold text-slate-900">Review your entity details</h2>

                      <div className="space-y-6">
                        {/* Entity Details */}
                        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-md">
                          <CardContent className="pt-6">
                            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-blue-500" />
                              Entity Details
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <span className="font-medium text-slate-700">Country of incorporation:</span>
                                <span className="text-slate-600">{form.watch("countryOfIncorporation")}</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <span className="font-medium text-slate-700">Entity name:</span>
                                <span className="text-slate-600">{form.watch("entityName")}</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <span className="font-medium text-slate-700">Entity type:</span>
                                <span className="text-slate-600">{form.watch("entityType")}</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <span className="font-medium text-slate-700">Industry:</span>
                                <span className="text-slate-600">{form.watch("industryCategory")}</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <span className="font-medium text-slate-700">Phone:</span>
                                <span className="text-slate-600">
                                  {form.watch("dialCode")} {form.watch("phoneNumber")}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Address */}
                        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-md">
                          <CardContent className="pt-6">
                            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-green-500" />
                              Registered Address
                            </h3>
                            <div className="space-y-2 text-sm p-4 bg-slate-50 rounded-lg">
                              <p className="text-slate-900">{form.watch("registeredAddressLine1")}</p>
                              {form.watch("registeredAddressLine2") && (
                                <p className="text-slate-600">{form.watch("registeredAddressLine2")}</p>
                              )}
                              <p className="text-slate-600">
                                {form.watch("registeredCity")}, {form.watch("registeredProvince")}{" "}
                                {form.watch("registeredPostalCode")}
                              </p>
                              <p className="text-slate-600">{form.watch("registeredCountry")}</p>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Products */}
                        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-md">
                          <CardContent className="pt-6">
                            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                              <Shield className="h-4 w-4 text-purple-500" />
                              Products
                            </h3>
                            <div className="space-y-2 text-sm">
                              {form.watch("useDeelContractor") && (
                                <div className="p-3 bg-slate-50 rounded-lg">
                                  <span className="font-medium text-slate-700">✓ mind Links Contractor</span>
                                </div>
                              )}
                              {form.watch("useDeelCOR") && (
                                <div className="p-3 bg-slate-50 rounded-lg">
                                  <span className="font-medium text-slate-700">✓ mind Links Contractor of Record</span>
                                </div>
                              )}
                              {form.watch("useDeelEOR") && (
                                <div className="p-3 bg-slate-50 rounded-lg">
                                  <span className="font-medium text-slate-700">✓ mind Links Employer of Record</span>
                                </div>
                              )}
                              {form.watch("useNone") && (
                                <div className="p-3 bg-slate-50 rounded-lg">
                                  <span className="font-medium text-slate-700">None of the above</span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Point of Contact */}
                        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-md">
                          <CardContent className="pt-6">
                            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <User className="h-4 w-4 text-indigo-500" />
                              Point of contact:
                            </h3>
                            <div className="space-y-2 text-sm p-4 bg-slate-50 rounded-lg">
                              <p className="font-medium text-slate-900">
                                {form.watch("pocFirstName")} {form.watch("pocLastName")}
                              </p>
                              <p className="text-slate-600">{form.watch("pocEmail")}</p>
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
                  className="flex items-center justify-between pt-6 border-t border-slate-200/60"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all disabled:opacity-50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                  {currentStep < 5 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-8 py-2.5 rounded-lg shadow-lg shadow-blue-500/30 transition-all font-medium"
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-8 py-2.5 rounded-lg shadow-lg shadow-blue-500/30 transition-all font-medium disabled:opacity-50"
                    >
                      {isSubmitting ? "Creating Entity..." : "Add new entity"}
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
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {steps.map((step, index) => (
                      <motion.div
                        key={step.number}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl transition-all duration-300",
                          currentStep === step.number
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 shadow-md"
                            : step.completed
                            ? "bg-white border border-green-200/50"
                            : "bg-white/50 border border-slate-200/50"
                        )}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-all",
                            step.completed
                              ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                              : currentStep === step.number
                              ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                              : "bg-slate-200 text-slate-500"
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
                                : "text-slate-500"
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

              {/* Support */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Need extra support?</h3>
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

      {/* Verification Modal */}
      <Dialog open={showVerificationModal} onOpenChange={setShowVerificationModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">Entity created successfully</DialogTitle>
            <DialogDescription className="text-center pt-2">
              Before you can start using Mind Links services with this entity, we just need a few more details for
              verification.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-slate-50 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-slate-600 mt-0.5" />
              <p className="text-sm text-slate-600">
                While you can do this later, we recommend completing it early to avoid any payment delays. Your
                entity will show a verification warning in the dashboard until completed.
              </p>
            </div>
          </div>
          <DialogFooter className="flex gap-3 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowVerificationModal(false);
                localStorage.setItem("entity_verification_status", "skipped");
                navigate("/client-dashboard");
              }}
              className="flex-1"
            >
              I'll do this later
            </Button>
            <Button
              type="button"
              onClick={() => {
                setShowVerificationModal(false);
                // Redirect to dashboard which will show the onboarding page
                navigate("/client-dashboard");
              }}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EntityCreation;

