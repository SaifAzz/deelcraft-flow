import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Shield, Info, ArrowRight, Workflow, Layers, Presentation } from "lucide-react";
import { InteractiveFlowDiagram } from "@/components/InteractiveFlowDiagram";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MindLinksLogo } from "@/components/MindLinksLogo";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero border-b border-border">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <MindLinksLogo size="lg" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Deel-like Platform Flow
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Complete end-to-end workflow for clients, contractors, and administrators<br />
              <span className="text-sm">POC Focus: MENA contractors (UAE, Egypt, Saudi Arabia) + Global clients | 12-week timeline</span>
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge className="bg-client text-white px-4 py-2 text-sm">
                <Users className="w-4 h-4 mr-2" />
                Client Flow
              </Badge>
              <Badge className="bg-contractor text-white px-4 py-2 text-sm">
                <Briefcase className="w-4 h-4 mr-2" />
                Contractor Flow
              </Badge>
              <Badge className="bg-admin text-white px-4 py-2 text-sm">
                <Shield className="w-4 h-4 mr-2" />
                Admin Oversight
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Flow Diagram Section */}
      <div className="container mx-auto px-6 py-16">
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Info className="h-5 w-5 text-primary" />
          <AlertDescription className="text-sm text-muted-foreground ml-2">
            <strong className="text-foreground">Interactive Diagram:</strong> Hover over any step to see real-world scenarios, technical implementation details, and practical examples.
          </AlertDescription>
        </Alert>

        <Card className="shadow-soft overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Interactive Platform Architecture
            </h2>
            <p className="text-muted-foreground mb-6">
              Complete end-to-end workflow with technical implementation details
            </p>
            <InteractiveFlowDiagram />
          </div>
        </Card>

        {/* Client Dashboard Link */}
        <Card className="p-6 shadow-soft hover:shadow-lg transition-shadow cursor-pointer mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200" onClick={() => navigate("/client-dashboard")}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground">Client Dashboard Wireframes</h3>
              <p className="text-sm text-muted-foreground">Interactive design mockups for all client flows</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            Complete wireframe designs covering Dashboard Overview, Contractors Management, Contract Creation Wizard, Payroll Management, Payments & Escrow, Compliance Monitoring, and Settings.
          </p>
          <Button variant="outline" className="w-full">
            View Client Dashboard Design
          </Button>
        </Card>

        {/* Additional Flow Pages */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 mb-12">
          <Card className="p-6 shadow-soft hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/kickoff-meeting")}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Presentation className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground">Kickoff Meeting</h3>
                <p className="text-sm text-muted-foreground">Complete presentation & agenda</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Professional kickoff presentation covering problem statement, solution overview, market benchmarking, technical architecture, timeline, and success metrics.
            </p>
            <Button variant="outline" className="w-full">
              View Kickoff Meeting
            </Button>
          </Card>

          <Card className="p-6 shadow-soft hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/business-flow")}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Workflow className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground">Business Flow</h3>
                <p className="text-sm text-muted-foreground">Complete end-to-end business process</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Step-by-step visualization of the complete business flow from client registration to contractor payment, including all milestones and decision points.
            </p>
            <Button variant="outline" className="w-full">
              View Business Flow
            </Button>
          </Card>

          <Card className="p-6 shadow-soft hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/technical-architecture")}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-backend-service/10 rounded-lg">
                <Layers className="w-6 h-6 text-backend-service" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground">Technical Architecture</h3>
                <p className="text-sm text-muted-foreground">System architecture & data flow</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Detailed technical architecture showing frontend, backend services, data layer, and service interactions with complete tech stack.
            </p>
            <Button variant="outline" className="w-full">
              View Technical Architecture
            </Button>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 shadow-soft hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-client/10 rounded-lg">
                <Users className="w-6 h-6 text-client" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Client Features</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Secure registration & verification (Clerk/Auth0)</li>
              <li>• Intuitive dashboard with contract overview</li>
              <li>• Create fixed/hourly contracts with milestones</li>
              <li>• Fund management & payment simulation (Stripe sandbox)</li>
              <li>• Multi-currency support (USD, EUR, AED, EGP)</li>
            </ul>
          </Card>

          <Card className="p-6 shadow-soft hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-contractor/10 rounded-lg">
                <Briefcase className="w-6 h-6 text-contractor" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Contractor Features</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>• KYC document upload & verification (S3 storage)</li>
              <li>• Real-time contract notifications (SendGrid)</li>
              <li>• Balance tracking & payment history</li>
              <li>• Simulated payment receipts (mocked payouts)</li>
              <li>• E-signature integration (DocuSign sandbox)</li>
            </ul>
          </Card>

          <Card className="p-6 shadow-soft hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-admin/10 rounded-lg">
                <Shield className="w-6 h-6 text-admin" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Admin Oversight</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Comprehensive system monitoring</li>
              <li>• User management & verification</li>
              <li>• Contract review & analytics</li>
              <li>• Payment logs & audit trails</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
