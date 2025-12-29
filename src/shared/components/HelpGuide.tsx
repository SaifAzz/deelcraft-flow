import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  X,
  BookOpen,
  Video,
  FileText,
  Users,
  DollarSign,
  CreditCard,
  Shield,
  Settings,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";

interface HelpGuideProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpGuide: React.FC<HelpGuideProps> = ({ open, onOpenChange }) => {
  const quickStartSteps = [
    {
      step: 1,
      title: "Invite Your First Contractor",
      description: "Go to Contractors → Invite Contractor. Enter their email and they'll receive an invitation.",
      icon: Users,
    },
    {
      step: 2,
      title: "Create a Contract",
      description: "Navigate to Contracts → Create Contract. Choose between Fixed or Hourly payment terms.",
      icon: FileText,
    },
    {
      step: 3,
      title: "Set Up Milestones",
      description: "For fixed contracts, add milestones with due dates and amounts. For hourly contracts, set the hourly rate.",
      icon: CheckCircle2,
    },
    {
      step: 4,
      title: "Approve Work & Process Payroll",
      description: "Review completed milestones or timesheets, then create a payroll run to process payments.",
      icon: DollarSign,
    },
    {
      step: 5,
      title: "Fund Your Escrow",
      description: "Go to Payments → Add Funds to ensure you have sufficient balance for payroll processing.",
      icon: CreditCard,
    },
  ];

  const features = [
    {
      section: "Dashboard",
      icon: BookOpen,
      items: [
        "View key metrics: Active Contracts, Total Contractors, Escrow Balance",
        "Quick Actions: Invite Contractor, Create Contract, Create Payroll",
        "Recent Activity feed shows latest updates",
        "Upcoming Deadlines for important dates",
      ],
    },
    {
      section: "Contractors",
      icon: Users,
      items: [
        "Invite contractors via email",
        "Track compliance status (Approved, Incomplete, Expiring)",
        "View contractor profiles and documents",
        "Monitor KYC status and missing documents",
      ],
    },
    {
      section: "Contracts",
      icon: FileText,
      items: [
        "Create Fixed or Hourly contracts",
        "Set up milestones for fixed contracts",
        "Track contract progress and completion",
        "Use Deel-style contract templates",
      ],
    },
    {
      section: "Payroll",
      icon: DollarSign,
      items: [
        "Create monthly payroll runs",
        "Review line items before approval",
        "Add adjustments (bonuses, deductions)",
        "Approve and process payments",
      ],
    },
    {
      section: "Payments",
      icon: CreditCard,
      items: [
        "View escrow balance",
        "Add funds to escrow account",
        "Track transaction history",
        "Monitor payment status",
      ],
    },
    {
      section: "Compliance",
      icon: Shield,
      items: [
        "Monitor contractor compliance status",
        "Track document expiry dates",
        "View compliance scores",
        "Generate compliance reports",
      ],
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            How to Use Mind-Links Dashboard
          </DialogTitle>
          <DialogDescription>
            Learn how to manage contractors, contracts, and payroll efficiently
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="quickstart" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
            <TabsTrigger value="features">Features Guide</TabsTrigger>
            <TabsTrigger value="tips">Tips & Best Practices</TabsTrigger>
          </TabsList>

          <TabsContent value="quickstart" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>5-Minute Quick Start</CardTitle>
                <CardDescription>Get up and running in minutes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickStartSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            Step {step.step}
                          </Badge>
                          <h4 className="font-semibold text-sm">{step.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">{feature.section}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {feature.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Tips & Best Practices</CardTitle>
                <CardDescription>Make the most of your dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      Contract Management
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Set clear milestones with specific deliverables</li>
                      <li>• Review and approve milestones promptly to maintain cash flow</li>
                      <li>• Use Deel templates for standardized contracts</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Payroll Processing
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Review payroll runs before approval</li>
                      <li>• Add adjustments for bonuses or corrections</li>
                      <li>• Process payroll on time to maintain contractor satisfaction</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg bg-orange-50 dark:bg-orange-950/20">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-orange-600" />
                      Compliance
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Monitor compliance status regularly</li>
                      <li>• Set reminders for expiring documents</li>
                      <li>• Ensure all contractors have complete documentation</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-950/20">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600" />
                      Escrow Management
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Maintain sufficient escrow balance for upcoming payroll</li>
                      <li>• Add funds proactively to avoid payment delays</li>
                      <li>• Monitor transaction history for record-keeping</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default HelpGuide;

