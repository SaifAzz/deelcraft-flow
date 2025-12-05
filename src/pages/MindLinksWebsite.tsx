import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Building2,
  Users,
  Shield,
  Clock,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  FileCheck,
  Globe,
  Zap,
  TrendingUp,
  Lock,
  Heart,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Star,
  MessageCircle,
  Play,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MindLinksLogo } from "@/components/MindLinksLogo";

export const MindLinksWebsite: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashboardView, setDashboardView] = useState<"client" | "contractor">("contractor");
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState("");

  // Scroll progress indicator
  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);

      // Detect active section
      const sections = ["features", "cor", "onboarding", "pricing"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      
      // Add visual feedback
      element.classList.add('section-highlight');
      setTimeout(() => {
        element.classList.remove('section-highlight');
      }, 2000);
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 z-[60] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Far Left */}
            <div className="flex items-center cursor-pointer flex-shrink-0" onClick={() => navigate("/")}>
              <MindLinksLogo />
            </div>

            {/* Desktop Navigation - Center & Right */}
            <div className="hidden md:flex items-center gap-8 flex-1 justify-end">
              <button
                onClick={() => scrollToSection("features")}
                className={cn(
                  "text-sm font-medium transition-all relative py-1",
                  activeSection === "features" 
                    ? "text-blue-600" 
                    : "text-slate-700 hover:text-blue-600"
                )}
              >
                Features
                {activeSection === "features" && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
              <button
                onClick={() => scrollToSection("cor")}
                className={cn(
                  "text-sm font-medium transition-all relative py-1",
                  activeSection === "cor" 
                    ? "text-blue-600" 
                    : "text-slate-700 hover:text-blue-600"
                )}
              >
                COR Service
                {activeSection === "cor" && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
              <button
                onClick={() => scrollToSection("onboarding")}
                className={cn(
                  "text-sm font-medium transition-all relative py-1",
                  activeSection === "onboarding" 
                    ? "text-blue-600" 
                    : "text-slate-700 hover:text-blue-600"
                )}
              >
                How It Works
                {activeSection === "onboarding" && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className={cn(
                  "text-sm font-medium transition-all relative py-1",
                  activeSection === "pricing" 
                    ? "text-blue-600" 
                    : "text-slate-700 hover:text-blue-600"
                )}
              >
                Pricing
                {activeSection === "pricing" && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
              <Button
                onClick={() => navigate("/client-dashboard")}
                variant="ghost"
                className="text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate("/company-profile-onboarding")}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-4 py-3 space-y-3">
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("cor")}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                COR Service
              </button>
              <button
                onClick={() => scrollToSection("onboarding")}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Pricing
              </button>
              <div className="pt-3 space-y-2">
                <Button
                  onClick={() => navigate("/client-dashboard")}
                  variant="outline"
                  className="w-full border-gray-300"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate("/company-profile-onboarding")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        {/* Professional Subtle Background Pattern */}
        <div className="absolute inset-0">
          {/* Grid Pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, rgb(226, 232, 240, 0.1) 1px, transparent 1px),
                             linear-gradient(to bottom, rgb(226, 232, 240, 0.1) 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }} />
          
          {/* Subtle Animated Gradient Orbs */}
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              opacity: [0.03, 0.06, 0.03],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
              opacity: [0.02, 0.05, 0.02],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 8,
            }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-slate-100 text-slate-700 hover:bg-slate-100 border border-slate-200 font-medium text-xs">
                <Sparkles className="h-3 w-3 mr-1.5" />
                ENTERPRISE-GRADE HR SOLUTIONS
              </Badge>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight"
            >
              Global Workforce
              <br />
              <span className="text-blue-600">Management Platform</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto font-normal"
            >
              Streamline contractor management with enterprise-grade compliance, automated payroll, and comprehensive HR tools designed for global teams.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                onClick={() => navigate("/company-profile-onboarding")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all border-0"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/onboarding-showcase")}
                className="border-2 border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-900 px-10 py-6 text-base font-semibold rounded-lg transition-all"
              >
                Schedule Demo
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-sm text-slate-500 mt-6 flex items-center justify-center gap-4"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                No credit card required
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Free 14-day trial
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Cancel anytime
              </span>
            </motion.p>
          </motion.div>

          {/* Hero Image/Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 relative max-w-6xl mx-auto"
          >
            {/* Dashboard View Toggle */}
            <div className="flex justify-center mb-8 gap-2">
              <button
                onClick={() => setDashboardView("contractor")}
                className={cn(
                  "px-6 py-2.5 rounded-lg font-medium transition-all text-sm",
                  dashboardView === "contractor"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                )}
              >
                <Users className="inline-block w-4 h-4 mr-2" />
                Contractor Dashboard
              </button>
              <button
                onClick={() => setDashboardView("client")}
                className={cn(
                  "px-6 py-2.5 rounded-lg font-medium transition-all text-sm",
                  dashboardView === "client"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                )}
              >
                <Building2 className="inline-block w-4 h-4 mr-2" />
                Client Dashboard
              </button>
            </div>

            {/* Subtle Shadow */}
            <div className="absolute inset-0 bg-blue-100/20 rounded-3xl blur-3xl opacity-40 transform translate-y-8" />
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100">
              {/* Dashboard Screenshot */}
              <motion.div
                key={dashboardView}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <img
                  src={dashboardView === "contractor" ? "/contractor-dash.png" : "/client-dash.png"}
                  alt={dashboardView === "contractor" ? "Contractor Dashboard" : "Client Dashboard"}
                  className="w-full h-auto"
                />
                
                {/* Overlay with CTA on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-12">
                  <div className="text-center">
                    <Button
                      onClick={() => navigate(dashboardView === "contractor" ? "/contractor-dashboard" : "/client-dashboard")}
                      className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl"
                      size="lg"
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      View Live {dashboardView === "contractor" ? "Contractor" : "Client"} Dashboard
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Dashboard Feature Labels */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Real-time Progress Tracking</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Shield className="w-5 h-5 text-blue-500" />
                <span>Secure Document Management</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Zap className="w-5 h-5 text-purple-500" />
                <span>AI-Powered Auto-fill</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-16 opacity-50">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Bank-Level Security</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-6 w-6 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">50+ Countries</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
              backgroundSize: "100% 100%",
            }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything you need to manage contractors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From onboarding to payments, we handle all the complexity so you can focus on building your team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Easy Onboarding",
                description: "Invite contractors with a single click. Automated KYC and document collection.",
                color: "blue",
              },
              {
                icon: FileCheck,
                title: "Smart Contracts",
                description: "Country-specific templates with e-signature. Fixed-rate, hourly, or milestone-based.",
                color: "indigo",
              },
              {
                icon: Shield,
                title: "Full Compliance",
                description: "Stay compliant with local laws. Automated document tracking and expiry alerts.",
                color: "purple",
              },
              {
                icon: CreditCard,
                title: "Automated Payroll",
                description: "Monthly payroll runs with multi-currency support. Pay contractors on time, every time.",
                color: "green",
              },
              {
                icon: TrendingUp,
                title: "Real-Time Analytics",
                description: "Track spending, contractor performance, and compliance status in one dashboard.",
                color: "orange",
              },
              {
                icon: Lock,
                title: "Secure Payments",
                description: "Bank-level encryption. Stripe-powered payments with complete transaction history.",
                color: "red",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-gray-200 bg-white group cursor-pointer">
                  <CardContent className="pt-6">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
                        feature.color === "blue" && "bg-blue-100",
                        feature.color === "indigo" && "bg-indigo-100",
                        feature.color === "purple" && "bg-purple-100",
                        feature.color === "green" && "bg-green-100",
                        feature.color === "orange" && "bg-orange-100",
                        feature.color === "red" && "bg-red-100"
                      )}
                    >
                      <feature.icon
                        className={cn(
                          "h-7 w-7",
                          feature.color === "blue" && "text-blue-600",
                          feature.color === "indigo" && "text-indigo-600",
                          feature.color === "purple" && "text-purple-600",
                          feature.color === "green" && "text-green-600",
                          feature.color === "orange" && "text-orange-600",
                          feature.color === "red" && "text-red-600"
                        )}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    <div className="mt-4 flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
                      Learn more
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COR Service Section */}
      <section id="cor" className="relative py-20 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20"
          />
          
          {/* Dotted Pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700">COR Service</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Mind-Links Contractor of Record
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Don't have a local entity? No problem. We become the employer of record for your contractors,
                handling all legal, tax, and compliance requirements on your behalf.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "We hire contractors on your behalf in their local jurisdiction",
                  "Handle all tax withholding and compliance requirements",
                  "Reduce risk of misclassification and penalties",
                  "Provide legal protection with up to $25,000 liability coverage",
                  "Full transparency with dedicated account management",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/company-profile-onboarding")}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Get COR Service
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-gray-300">
                  Learn more
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Glow Effect */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl blur-2xl opacity-50"
              />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-200 bg-white backdrop-blur-sm">
                <div className="aspect-square bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 flex items-center justify-center p-12 relative overflow-hidden">
                  {/* Animated Background Shapes */}
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-300 to-transparent rounded-full opacity-30"
                  />
                  <motion.div
                    animate={{
                      rotate: -360,
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-300 to-transparent rounded-full opacity-30"
                  />
                  
                  <div className="text-center relative z-10">
                    <motion.div
                      animate={{
                        y: [0, -15, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="mb-6"
                    >
                      <div className="relative inline-block">
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          className="absolute inset-0 bg-purple-400 rounded-full blur-xl"
                        />
                        <Shield className="h-32 w-32 text-purple-600 relative z-10 drop-shadow-2xl" />
                      </div>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Full Protection</h3>
                    <p className="text-gray-600 font-medium">15% monthly fee for complete compliance coverage</p>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold"
                    >
                      <Lock className="h-4 w-4" />
                      Enterprise-Grade Security
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Decorative floating elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-30 blur-2xl"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-blue-300 to-indigo-300 rounded-full opacity-30 blur-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Onboarding Flow Section */}
      <OnboardingShowcase />

      {/* Pricing Section */}
      <PricingSection navigate={navigate} />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to hire your global team?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join hundreds of companies using Mind-Links to manage their contractors compliantly and efficiently.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/company-profile-onboarding")}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl shadow-lg"
              >
                Start your free trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Talk to sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer navigate={navigate} scrollToSection={scrollToSection} />
    </div>
  );
};

// Onboarding Showcase Component
const OnboardingShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"client" | "contractor">("client");

  return (
    <section id="onboarding" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-green-100 text-green-700">How It Works</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Onboarding made simple
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how easy it is to get started with Mind-Links for both companies and contractors.
          </p>
        </motion.div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-xl bg-gray-100 p-1">
            <button
              onClick={() => setActiveTab("client")}
              className={cn(
                "px-8 py-3 rounded-lg font-medium transition-all",
                activeTab === "client"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Building2 className="h-5 w-5 inline mr-2" />
              Client Onboarding
            </button>
            <button
              onClick={() => setActiveTab("contractor")}
              className={cn(
                "px-8 py-3 rounded-lg font-medium transition-all",
                activeTab === "contractor"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Users className="h-5 w-5 inline mr-2" />
              Contractor Onboarding
            </button>
          </div>
        </div>

        {/* Client Onboarding Flow */}
        {activeTab === "client" && <ClientOnboardingFlow />}

        {/* Contractor Onboarding Flow */}
        {activeTab === "contractor" && <ContractorOnboardingFlow />}
      </div>
    </section>
  );
};

// Client Onboarding Flow Component
const ClientOnboardingFlow: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Create Your Account",
      description: "Sign up with your email and create your company profile in under 2 minutes.",
      features: ["Company details", "Tax information", "Entity verification"],
    },
    {
      number: 2,
      title: "Complete Company Profile",
      description: "Tell us about your organization and provide necessary documentation.",
      features: ["Business description", "Online presence", "Legal documents"],
    },
    {
      number: 3,
      title: "Invite Contractors",
      description: "Add your contractors and create contracts with our smart wizard.",
      features: ["Contract templates", "Payment terms", "Compliance coverage"],
    },
    {
      number: 4,
      title: "Run Payroll",
      description: "Approve work and process payments with a single click.",
      features: ["Auto-generated payroll", "Multi-currency", "Instant payslips"],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full bg-white border-gray-200 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                <div className="space-y-2 ml-16">
                  {step.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Screenshot Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <Card className="bg-white border-gray-200 overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gray-900 px-4 py-2 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-400 ml-2">company-profile-onboarding</span>
            </div>
            <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8">
              <div className="text-center">
                <Building2 className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Client Dashboard Screenshot</p>
                <p className="text-sm text-gray-500 mt-2">Company profile onboarding wizard</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

// Contractor Onboarding Flow Component
const ContractorOnboardingFlow: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Receive Invitation",
      description: "Get invited by your client via email with a personalized onboarding link.",
      features: ["Secure invite link", "Personalized welcome", "Mobile-friendly"],
    },
    {
      number: 2,
      title: "Complete Profile",
      description: "Fill in your personal details and banking information for payments.",
      features: ["Personal info", "Bank details", "Tax residence"],
    },
    {
      number: 3,
      title: "Upload Documents",
      description: "Submit required documents for KYC verification based on your country.",
      features: ["Passport/ID", "Tax certificates", "Proof of address"],
    },
    {
      number: 4,
      title: "Sign Contract & Get Paid",
      description: "Review and sign your contract, then track earnings in real-time.",
      features: ["E-signature", "Contract terms", "Payment tracking"],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full bg-white border-gray-200 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                <div className="space-y-2 ml-16">
                  {step.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Screenshot Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <Card className="bg-white border-gray-200 overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gray-900 px-4 py-2 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-400 ml-2">contractor-onboarding</span>
            </div>
            <div className="aspect-video bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-8">
              <div className="text-center">
                <Users className="h-24 w-24 text-green-600 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Contractor Dashboard Screenshot</p>
                <p className="text-sm text-gray-500 mt-2">Document upload and profile completion</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

// Pricing Section Component
const PricingSection: React.FC<{ navigate: any }> = ({ navigate }) => {
  const plans = [
    {
      name: "Starter",
      price: "$49",
      period: "per contractor/month",
      description: "Perfect for small teams getting started with global contractors",
      features: [
        "Up to 5 contractors",
        "Basic compliance coverage",
        "Monthly payroll",
        "Standard contracts",
        "Email support",
        "Multi-currency payments",
      ],
      cta: "Start free trial",
      popular: false,
    },
    {
      name: "Professional",
      price: "$99",
      period: "per contractor/month",
      description: "Best for growing teams with complex contractor management needs",
      features: [
        "Unlimited contractors",
        "Full COR service (15% fee)",
        "Automated payroll",
        "Custom contracts",
        "Priority support",
        "Advanced analytics",
        "Dedicated account manager",
        "API access",
      ],
      cta: "Get started",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "tailored to your needs",
      description: "For large organizations with specific compliance requirements",
      features: [
        "Everything in Professional",
        "Custom integrations",
        "White-label options",
        "24/7 premium support",
        "Legal consultation",
        "Custom SLAs",
        "Training & onboarding",
      ],
      cta: "Contact sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-blue-100 text-blue-700">Pricing</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  "h-full relative",
                  plan.popular
                    ? "border-2 border-blue-600 shadow-xl"
                    : "border-gray-200 hover:shadow-lg transition-all"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="pt-8 pb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 text-sm ml-2">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <Button
                    className={cn(
                      "w-full mb-6",
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "border-gray-300"
                    )}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => navigate("/company-profile-onboarding")}
                  >
                    {plan.cta}
                  </Button>
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer: React.FC<{ navigate: any; scrollToSection: (id: string) => void }> = ({
  navigate,
  scrollToSection,
}) => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="mb-4">
              <MindLinksLogo />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Simplifying global contractor management for companies in MENA and beyond.
            </p>
            <div className="flex gap-4 mt-6">
              {/* Social Icons */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("cor")}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  COR Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/client-dashboard")}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Client Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/contractor-dashboard")}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Contractor Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Compliance Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Mind-Links. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MindLinksWebsite;

