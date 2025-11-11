import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, Shield, Info } from "lucide-react";
import { InteractiveFlowDiagram } from "@/components/InteractiveFlowDiagram";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero border-b border-border">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Deel-like Platform Flow
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Complete end-to-end workflow for clients, contractors, and administrators
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
              <li>• Secure registration & verification</li>
              <li>• Intuitive dashboard with contract overview</li>
              <li>• Create fixed/hourly contracts with milestones</li>
              <li>• Fund management & payment simulation</li>
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
              <li>• KYC document upload & verification</li>
              <li>• Real-time contract notifications</li>
              <li>• Balance tracking & payment history</li>
              <li>• Simulated payment receipts</li>
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
