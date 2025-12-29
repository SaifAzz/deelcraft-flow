import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowDown, Users, Briefcase, Shield, CreditCard, FileText, CheckCircle2, Clock } from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";

const BusinessFlow = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-primary/10 to-backend-service/10">
        <div className="container mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Flow Diagram
          </Button>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Complete Business Flow
            </h1>
            <p className="text-lg text-muted-foreground">
              End-to-end workflow from client registration to contractor payment
            </p>
          </div>
        </div>
      </div>

      {/* Business Flow Diagram */}
      <div className="container mx-auto px-6 py-12">
        <Card className="p-8 shadow-lg">
          {/* Client Journey */}
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Client Journey</h2>
              <p className="text-muted-foreground">From registration to managing contractors</p>
            </div>

            {/* Step 1: Registration */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-client flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <Card className="flex-1 p-6 border-2 border-client/30 bg-client/5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-client" />
                      <h3 className="text-xl font-semibold">Registration & Onboarding</h3>
                      <Badge className="bg-client">Client</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Client signs up with email/password or OAuth (Google/LinkedIn), provides company name, country, and verifies email
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Clerk/Auth0</Badge>
                      <Badge variant="outline">Email Verification</Badge>
                      <Badge variant="outline">Company Details</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="w-8 h-8 text-muted-foreground" />
            </div>

            {/* Step 2: Dashboard Access */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-client flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <Card className="flex-1 p-6 border-2 border-client/30 bg-client/5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-client" />
                      <h3 className="text-xl font-semibold">Dashboard Access</h3>
                      <Badge className="bg-client">Client</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Client views dashboard: Active contracts overview, escrow balance, contractor invitations, transaction history
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Active Contracts</Badge>
                      <Badge variant="outline">Escrow Balance</Badge>
                      <Badge variant="outline">Transaction History</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="w-8 h-8 text-muted-foreground" />
            </div>

            {/* Step 3: Contract Creation */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-client flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <Card className="flex-1 p-6 border-2 border-client/30 bg-client/5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-client" />
                      <h3 className="text-xl font-semibold">Contract Creation</h3>
                      <Badge className="bg-client">Client</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Client creates contract via wizard: Selects contractor, chooses type (Fixed/Hourly), sets amount, currency, and payment milestones
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Contract Wizard</Badge>
                      <Badge variant="outline">Fixed/Hourly</Badge>
                      <Badge variant="outline">Payment Milestones</Badge>
                      <Badge variant="outline">PDF Generation</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="w-8 h-8 text-muted-foreground" />
            </div>

            {/* Step 4: Add Funds */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-client flex items-center justify-center text-white font-bold text-xl">
                4
              </div>
              <Card className="flex-1 p-6 border-2 border-client/30 bg-client/5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-5 h-5 text-client" />
                      <h3 className="text-xl font-semibold">Add Funds (Escrow)</h3>
                      <Badge className="bg-client">Client</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Client adds funds for contract: Enters card details, Payment Service processes via Stripe/Adyen sandbox, escrow balance updated
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Stripe/Adyen</Badge>
                      <Badge variant="outline">Escrow</Badge>
                      <Badge variant="outline">Payment Secured</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="w-8 h-8 text-muted-foreground" />
            </div>

            {/* Contractor Journey Starts */}
            <div className="text-center my-12">
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-contractor/10 rounded-full border-2 border-contractor/30">
                <ArrowRight className="w-6 h-6 text-contractor" />
                <span className="text-lg font-semibold text-contractor">Contractor Receives Contract</span>
                <ArrowRight className="w-6 h-6 text-contractor" />
              </div>
            </div>

            {/* Step 5: Contractor KYC */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-contractor flex items-center justify-center text-white font-bold text-xl">
                5
              </div>
              <Card className="flex-1 p-6 border-2 border-contractor/30 bg-contractor/5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-contractor" />
                      <h3 className="text-xl font-semibold">KYC Verification</h3>
                      <Badge className="bg-contractor">Contractor</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Contractor registers & uploads documents: Passport/ID, proof of address, bank statement, tax ID for MENA compliance
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Document Upload</Badge>
                      <Badge variant="outline">AWS S3</Badge>
                      <Badge variant="outline">Admin Approval</Badge>
                      <Badge variant="outline">MENA Compliance</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="w-8 h-8 text-muted-foreground" />
            </div>

            {/* Step 6: Contractor Signs Contract */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-contractor flex items-center justify-center text-white font-bold text-xl">
                6
              </div>
              <Card className="flex-1 p-6 border-2 border-contractor/30 bg-contractor/5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-contractor" />
                      <h3 className="text-xl font-semibold">Contract Signing</h3>
                      <Badge className="bg-contractor">Contractor</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Contractor receives notification, reviews contract PDF, signs digitally via DocuSign, contract becomes active
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">E-Signature</Badge>
                      <Badge variant="outline">DocuSign</Badge>
                      <Badge variant="outline">Contract Active</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="w-8 h-8 text-muted-foreground" />
            </div>

            {/* Step 7: Work Completion */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-contractor flex items-center justify-center text-white font-bold text-xl">
                7
              </div>
              <Card className="flex-1 p-6 border-2 border-contractor/30 bg-contractor/5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-contractor" />
                      <h3 className="text-xl font-semibold">Work Completion</h3>
                      <Badge className="bg-contractor">Contractor</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Contractor completes work, client marks milestone as complete, triggers payment release
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Milestone Complete</Badge>
                      <Badge variant="outline">Client Approval</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="w-8 h-8 text-muted-foreground" />
            </div>

            {/* Step 8: Payment Release */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-contractor flex items-center justify-center text-white font-bold text-xl">
                8
              </div>
              <Card className="flex-1 p-6 border-2 border-contractor/30 bg-contractor/5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-5 h-5 text-contractor" />
                      <h3 className="text-xl font-semibold">Payment Release</h3>
                      <Badge className="bg-contractor">Contractor</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Payment Service releases escrow, converts currency (if needed), initiates payout to contractor's account
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Escrow Release</Badge>
                      <Badge variant="outline">Currency Conversion</Badge>
                      <Badge variant="outline">Payout Initiated</Badge>
                      <Badge variant="outline">Multi-Currency</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="w-8 h-8 text-muted-foreground" />
            </div>

            {/* Step 9: Completion */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                ✓
              </div>
              <Card className="flex-1 p-6 border-2 border-primary/30 bg-primary/5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-semibold">Transaction Complete</h3>
                      <Badge className="bg-primary">Complete</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Contractor receives payment, both parties notified, contract marked as completed, transaction logged for audit
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Payment Received</Badge>
                      <Badge variant="outline">Notifications Sent</Badge>
                      <Badge variant="outline">Audit Trail</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Admin Oversight (Parallel Flow) */}
          <div className="mt-16 pt-8 border-t">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Admin Oversight (Parallel)</h2>
              <p className="text-muted-foreground">Admin monitors and manages the entire process</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 border-2 border-admin/30 bg-admin/5">
                <Shield className="w-8 h-8 text-admin mb-3" />
                <h3 className="font-semibold mb-2">Database Oversight</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor all users, contracts, payments, and KYC verifications in real-time
                </p>
              </Card>
              <Card className="p-6 border-2 border-admin/30 bg-admin/5">
                <Shield className="w-8 h-8 text-admin mb-3" />
                <h3 className="font-semibold mb-2">Logs & Monitoring</h3>
                <p className="text-sm text-muted-foreground">
                  Review system health, API errors, performance metrics, and payment failures
                </p>
              </Card>
              <Card className="p-6 border-2 border-admin/30 bg-admin/5">
                <Shield className="w-8 h-8 text-admin mb-3" />
                <h3 className="font-semibold mb-2">Contract & Payment Monitoring</h3>
                <p className="text-sm text-muted-foreground">
                  Track contract lifecycle, payment releases, and resolve disputes
                </p>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BusinessFlow;

