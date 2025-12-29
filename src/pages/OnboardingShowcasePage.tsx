import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Users,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  FileCheck,
  Shield,
  CreditCard,
  Eye,
  Play,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";
import { MindLinksLogo } from "@/shared/components/MindLinksLogo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

export const OnboardingShowcasePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [viewType, setViewType] = useState<"client" | "contractor">("client");

  const clientSteps = [
    {
      title: "Create Account",
      description: "Sign up and tell us about your organization",
      screenshot: "company-profile",
      features: [
        "Quick 2-minute signup",
        "Company profile setup",
        "AI-powered auto-fill",
        "Document upload",
      ],
    },
    {
      title: "Entity Setup",
      description: "Add your legal entity information",
      screenshot: "entity-creation",
      features: [
        "Entity registration",
        "Tax information",
        "Legal documentation",
        "Verification process",
      ],
    },
    {
      title: "Invite Contractors",
      description: "Add contractors and create contracts",
      screenshot: "invite-wizard",
      features: [
        "Smart contract wizard",
        "Multiple contract types",
        "E-signature integration",
        "Compliance coverage options",
      ],
    },
    {
      title: "Run Payroll",
      description: "Process payments with one click",
      screenshot: "payroll-dashboard",
      features: [
        "Automated payroll runs",
        "Multi-currency support",
        "Payment tracking",
        "Generate payslips",
      ],
    },
  ];

  const contractorSteps = [
    {
      title: "Receive Invitation",
      description: "Get invited by email with secure link",
      screenshot: "contractor-invite",
      features: [
        "Personalized email invite",
        "Secure onboarding link",
        "Mobile-friendly experience",
        "Clear instructions",
      ],
    },
    {
      title: "Complete Profile",
      description: "Fill in personal and banking information",
      screenshot: "contractor-profile",
      features: [
        "Personal details",
        "Bank account setup",
        "Tax residence",
        "Contact information",
      ],
    },
    {
      title: "Upload Documents",
      description: "Submit KYC documents for verification",
      screenshot: "contractor-kyc",
      features: [
        "Country-specific requirements",
        "Document upload",
        "Real-time status tracking",
        "Secure file storage",
      ],
    },
    {
      title: "Sign & Track Earnings",
      description: "Sign contract and view payment dashboard",
      screenshot: "contractor-wallet",
      features: [
        "E-signature",
        "Contract review",
        "Payment tracking",
        "Download payslips",
      ],
    },
  ];

  const currentSteps = viewType === "client" ? clientSteps : contractorSteps;

  const handleLiveDemo = (type: "client" | "contractor") => {
    if (type === "client") {
      navigate("/client-dashboard");
    } else {
      navigate("/contractor-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
              <MindLinksLogo />
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="border-gray-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <Button
                onClick={() => navigate("/company-profile-onboarding")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700">
              <Play className="h-3 w-3 mr-1" />
              Interactive Onboarding Demo
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              See How Easy Onboarding Can Be
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Walk through the complete onboarding process for both clients and contractors.
              Real workflows, real features, real simplicity.
            </p>
          </motion.div>

          {/* View Type Selector */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-xl bg-white p-1 border border-gray-200 shadow-sm">
              <button
                onClick={() => {
                  setViewType("client");
                  setActiveStep(0);
                }}
                className={cn(
                  "px-8 py-4 rounded-lg font-medium transition-all flex items-center gap-3",
                  viewType === "client"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <Building2 className="h-6 w-6" />
                <div className="text-left">
                  <div className="font-bold">Client Journey</div>
                  <div className="text-xs opacity-80">Company onboarding</div>
                </div>
              </button>
              <button
                onClick={() => {
                  setViewType("contractor");
                  setActiveStep(0);
                }}
                className={cn(
                  "px-8 py-4 rounded-lg font-medium transition-all flex items-center gap-3",
                  viewType === "contractor"
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <Users className="h-6 w-6" />
                <div className="text-left">
                  <div className="font-bold">Contractor Journey</div>
                  <div className="text-xs opacity-80">Individual onboarding</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Steps Visualization */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Step Navigation - Left Sidebar */}
            <div className="lg:col-span-4">
              <Card className="bg-white border-gray-200 shadow-lg sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    {viewType === "client" ? "Client" : "Contractor"} Onboarding Steps
                  </h3>
                  <div className="space-y-3">
                    {currentSteps.map((step, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setActiveStep(index)}
                        className={cn(
                          "w-full text-left p-4 rounded-lg transition-all border-2",
                          activeStep === index
                            ? viewType === "client"
                              ? "bg-blue-50 border-blue-600"
                              : "bg-green-50 border-green-600"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0",
                              activeStep === index
                                ? viewType === "client"
                                  ? "bg-blue-600 text-white"
                                  : "bg-green-600 text-white"
                                : "bg-gray-200 text-gray-600"
                            )}
                          >
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4
                              className={cn(
                                "font-semibold text-sm mb-1",
                                activeStep === index
                                  ? viewType === "client"
                                    ? "text-blue-900"
                                    : "text-green-900"
                                  : "text-gray-700"
                              )}
                            >
                              {step.title}
                            </h4>
                            <p className="text-xs text-gray-500 line-clamp-1">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Live Demo Button */}
                  <div className="mt-8 p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Eye className="h-5 w-5 text-purple-600" />
                      Try Live Demo
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Experience the actual {viewType === "client" ? "client" : "contractor"} dashboard
                    </p>
                    <Button
                      onClick={() => handleLiveDemo(viewType)}
                      className={cn(
                        "w-full",
                        viewType === "client"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-green-600 hover:bg-green-700"
                      )}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Launch {viewType === "client" ? "Client" : "Contractor"} Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step Content - Main Area */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${viewType}-${activeStep}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white border-gray-200 shadow-lg">
                    <CardContent className="p-8">
                      {/* Step Header */}
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <Badge
                            className={cn(
                              viewType === "client"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            )}
                          >
                            Step {activeStep + 1} of {currentSteps.length}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {currentSteps.map((_, idx) => (
                                <div
                                  key={idx}
                                  className={cn(
                                    "h-2 w-8 rounded-full transition-all",
                                    idx === activeStep
                                      ? viewType === "client"
                                        ? "bg-blue-600"
                                        : "bg-green-600"
                                      : "bg-gray-200"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          {currentSteps[activeStep].title}
                        </h2>
                        <p className="text-lg text-gray-600">
                          {currentSteps[activeStep].description}
                        </p>
                      </div>

                      {/* Screenshot Display */}
                      <div className="mb-8 rounded-xl overflow-hidden border-2 border-gray-200 shadow-xl">
                        <div className="bg-gray-900 px-4 py-2 flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-xs text-gray-400 ml-2">
                            {currentSteps[activeStep].screenshot}.mindlinks.com
                          </span>
                        </div>
                        <div
                          className={cn(
                            "aspect-video flex items-center justify-center p-12",
                            viewType === "client"
                              ? "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
                              : "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
                          )}
                        >
                          <div className="text-center">
                            {viewType === "client" ? (
                              <Building2
                                className={cn(
                                  "h-32 w-32 mx-auto mb-6",
                                  "text-blue-600"
                                )}
                              />
                            ) : (
                              <Users
                                className={cn(
                                  "h-32 w-32 mx-auto mb-6",
                                  "text-green-600"
                                )}
                              />
                            )}
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {currentSteps[activeStep].title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                              Interactive {viewType} dashboard screenshot
                            </p>
                            <Badge
                              variant="outline"
                              className={cn(
                                viewType === "client"
                                  ? "border-blue-600 text-blue-700"
                                  : "border-green-600 text-green-700"
                              )}
                            >
                              {currentSteps[activeStep].screenshot}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="mb-8">
                        <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                          Key Features in This Step
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentSteps[activeStep].features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                            >
                              <CheckCircle2
                                className={cn(
                                  "h-5 w-5 flex-shrink-0 mt-0.5",
                                  viewType === "client" ? "text-blue-600" : "text-green-600"
                                )}
                              />
                              <span className="text-gray-700 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Navigation Buttons */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                        <Button
                          variant="outline"
                          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                          disabled={activeStep === 0}
                          className="border-gray-300"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Previous Step
                        </Button>
                        {activeStep < currentSteps.length - 1 ? (
                          <Button
                            onClick={() => setActiveStep(activeStep + 1)}
                            className={cn(
                              viewType === "client"
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-green-600 hover:bg-green-700"
                            )}
                          >
                            Next Step
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        ) : (
                          <Button
                            onClick={() => navigate("/company-profile-onboarding")}
                            className={cn(
                              viewType === "client"
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-green-600 hover:bg-green-700"
                            )}
                          >
                            Start Onboarding
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to experience it yourself?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start your free trial today and onboard your first contractor in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/company-profile-onboarding")}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl shadow-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/")}
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnboardingShowcasePage;














