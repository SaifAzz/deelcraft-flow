import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { CheckCircle2, AlertTriangle, TrendingUp, Users, FileText, DollarSign, Shield, Clock, Target, Rocket, BarChart3, Globe, Zap, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import { Link } from "react-router-dom";
import { MindLinksLogo } from "@/shared/components/MindLinksLogo";

const ProductBrief = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="mb-4">
            <Link to="/">
              <Button variant="secondary" size="sm" className="gap-2 mb-4">
                <ArrowLeft className="h-4 w-4" />
                Back to Kickoff
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <MindLinksLogo size="lg" variant="light" />
          </div>
          <p className="text-2xl font-light mb-2">Product Brief</p>
          <p className="text-xl opacity-90 max-w-3xl">
            A Deel-like Platform for Global Contractor Management in MENA
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Executive Summary - Hidden for presentation */}
        {/* <Card className="mb-8 border-2 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-3xl flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-600" />
              Executive Summary
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Vision, Target Market & Core Problem
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-blue-600" />
                    Vision Statement
                  </h3>
                  <p className="text-gray-700 italic">
                    "Enable companies in MENA to hire, manage, and pay international contractors compliantly and efficiently—without needing local entities or specialized payroll expertise."
                  </p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                  <h3 className="font-semibold text-lg mb-3">Target Market</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Primary:</strong> Early-stage to growth startups in MENA</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Secondary:</strong> SMBs hiring remote contractors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Focus:</strong> Syria, Egypt, UAE, Saudi Arabia</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-600">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Core Problem
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">❌</span>
                      <span>No local entity to legally employ contractors</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">❌</span>
                      <span>Complex cross-border payments (expensive, slow)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">❌</span>
                      <span>Unclear tax and compliance obligations</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">❌</span>
                      <span>Manual, error-prone contract management</span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
                  <h3 className="font-semibold text-lg mb-3">Strategic Positioning</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">vs. Deel</span>
                      <Badge variant="outline">MENA Focus</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">vs. Remote</span>
                      <Badge variant="outline">Contractor First</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Differentiation</span>
                      <Badge variant="outline">Simpler MVP</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Two Pillars Section */}
        <Card className="mb-8 border-2 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardTitle className="text-3xl flex items-center gap-3">
              <Zap className="h-8 w-8 text-indigo-600" />
              Two Critical Pillars
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Payroll & Compliance: The Foundation of Trust
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Compliance Pillar */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border-2 border-blue-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900">Compliance</h3>
                    <p className="text-blue-700 text-sm">Risk Mitigation & Legal Safety</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 italic">
                  "Companies risk legal penalties, tax issues, and contractor misclassification without proper documentation."
                </p>

                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-blue-900 mb-2">Key Features</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Compliance Monitoring Dashboard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Document Management System</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Localized Contract Templates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Full Audit Trail</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Country-Specific Rules</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Payroll Pillar */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border-2 border-green-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-600 p-3 rounded-lg">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-900">Payroll</h3>
                    <p className="text-green-700 text-sm">Trust & Reliability</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 italic">
                  "Contractors need to be paid accurately, on time, and transparently. Poor payroll kills trust."
                </p>

                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-green-900 mb-2">Key Features</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Monthly Payroll Cycle Management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Contract-Based Calculations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Review & Approval Workflow</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Automated Payslip Generation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Multi-Currency Support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Features Tabs - Hidden for presentation */}
        {false && <Card className="mb-8 border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Detailed Feature Breakdown</CardTitle>
            <CardDescription>
              Deep dive into Compliance and Payroll features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="compliance" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="compliance" className="text-lg">
                  <Shield className="h-5 w-5 mr-2" />
                  Compliance Features
                </TabsTrigger>
                <TabsTrigger value="payroll" className="text-lg">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Payroll Features
                </TabsTrigger>
              </TabsList>

              <TabsContent value="compliance" className="space-y-6">
                {/* Compliance Monitoring */}
                <div className="border rounded-lg p-6 bg-blue-50">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                    1. Compliance Monitoring Dashboard
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Central hub to track regulatory requirements, document statuses, and upcoming deadlines.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-blue-900">POC Features</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Real-time status per contractor</li>
                        <li>• Country-specific tracking</li>
                        <li>• Visual missing document alerts</li>
                        <li>• Simple rule engine</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-purple-900">Future Roadmap</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Real-time legal updates</li>
                        <li>• Minimum wage alerts</li>
                        <li>• Automated compliance checks</li>
                        <li>• AI-powered risk detection</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Document Management */}
                <div className="border rounded-lg p-6 bg-green-50">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-6 w-6 text-green-600" />
                    2. Document Management System
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Structured collection, storage, and verification of compliance documents.
                  </p>
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-3">Document Workflow</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge>Uploaded</Badge>
                      <span>→</span>
                      <Badge variant="secondary">Under Review</Badge>
                      <span>→</span>
                      <Badge variant="outline" className="border-green-500 text-green-700">Approved</Badge>
                      <span>/</span>
                      <Badge variant="outline" className="border-red-500 text-red-700">Rejected</Badge>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-green-600">AWS S3</div>
                      <p className="text-sm text-gray-600 mt-2">Secure Storage</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-blue-600">4 Types</div>
                      <p className="text-sm text-gray-600 mt-2">Passport, ID, Tax, Bank</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-purple-600">Full Audit</div>
                      <p className="text-sm text-gray-600 mt-2">Complete Trail</p>
                    </div>
                  </div>
                </div>

                {/* Contract Templates */}
                <div className="border rounded-lg p-6 bg-purple-50">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-6 w-6 text-purple-600" />
                    3. Localized Contract Templates
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Legally vetted, country-specific contract templates for fixed and hourly contracts.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">POC Coverage</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Syria</Badge>
                        <Badge variant="outline">Egypt</Badge>
                        <Badge variant="outline">UAE</Badge>
                        <Badge variant="outline">Saudi Arabia</Badge>
                        <Badge variant="outline">Lebanon</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-3">
                        Basic templates with manual legal review
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Features</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Country-specific clauses</li>
                        <li>• PDF generation</li>
                        <li>• E-signature integration</li>
                        <li>• Version control</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* User Flows */}
                <div className="border rounded-lg p-6 bg-yellow-50">
                  <h3 className="text-xl font-semibold mb-3">Compliance User Flows</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-blue-900">Client View</h4>
                      <p className="text-sm text-gray-700">
                        Login → See compliance dashboard → View contractor statuses → Upload docs → Track approvals
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-green-900">Contractor View</h4>
                      <p className="text-sm text-gray-700">
                        Receive invite → Complete profile → See doc checklist → Upload documents → Get approval notification
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-purple-900">Admin View</h4>
                      <p className="text-sm text-gray-700">
                        See pending docs → Review submissions → Approve/Reject → System logs action → Notify contractor
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payroll" className="space-y-6">
                {/* Payroll Cycle */}
                <div className="border rounded-lg p-6 bg-green-50">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Clock className="h-6 w-6 text-green-600" />
                    1. Payroll Cycle Management
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Automated monthly payroll runs with aggregation of approved work.
                  </p>
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-3">Payroll Status Flow</h4>
                    <div className="flex items-center gap-2 text-sm flex-wrap">
                      <Badge>Draft</Badge>
                      <span>→</span>
                      <Badge variant="secondary">Review</Badge>
                      <span>→</span>
                      <Badge variant="outline" className="border-blue-500 text-blue-700">Approved</Badge>
                      <span>→</span>
                      <Badge variant="outline" className="border-green-500 text-green-700">Processed</Badge>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Automatic Aggregation</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Fixed: Approved milestones</li>
                        <li>• Hourly: Approved timesheets</li>
                        <li>• Per-client processing</li>
                        <li>• Monthly frequency</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Client Control</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Review all line items</li>
                        <li>• Approve/reject individually</li>
                        <li>• Add bonuses/adjustments</li>
                        <li>• Final approval required</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Calculations */}
                <div className="border rounded-lg p-6 bg-blue-50">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                    2. Contract-Based Calculations
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Accurate payment calculations based on contract type and completed work.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold mb-2">Fixed Contracts</h4>
                      <div className="bg-blue-50 p-3 rounded text-sm font-mono mb-2">
                        SUM(milestones.amount)<br/>
                        WHERE status = 'approved'
                      </div>
                      <p className="text-xs text-gray-600">Example: Milestone #1 ($3,000) + Milestone #2 ($2,000) = $5,000</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold mb-2">Hourly Contracts</h4>
                      <div className="bg-green-50 p-3 rounded text-sm font-mono mb-2">
                        hours × hourly_rate<br/>
                        WHERE status = 'approved'
                      </div>
                      <p className="text-xs text-gray-600">Example: 40 hours × $50/hr = $2,000</p>
                    </div>
                  </div>
                </div>

                {/* Payslips */}
                <div className="border rounded-lg p-6 bg-purple-50">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-6 w-6 text-purple-600" />
                    3. Automated Payslip Generation
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Professional payslips generated automatically after payroll approval.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Payslip Contents</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-purple-900 mb-2">Contractor Info</p>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Full name</li>
                          <li>• Contract reference</li>
                          <li>• Payment period</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-purple-900 mb-2">Payment Details</p>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Gross amount</li>
                          <li>• Currency</li>
                          <li>• Payment date</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-purple-50 rounded">
                      <p className="text-sm text-gray-700">
                        <strong>Format:</strong> PDF (PDFKit/Puppeteer) • <strong>Storage:</strong> AWS S3 • <strong>Access:</strong> Dashboard + Email
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mock Payments */}
                <div className="border rounded-lg p-6 bg-yellow-50">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                    4. Mock Payment Processing & Balance Tracking
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Simulated payment flow demonstrating real-world functionality.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Payment Flow (POC)</h4>
                      <div className="flex items-center gap-3 text-sm flex-wrap">
                        <div className="bg-blue-100 px-3 py-2 rounded">Payroll Approved</div>
                        <span>→</span>
                        <div className="bg-green-100 px-3 py-2 rounded">Stripe Sandbox</div>
                        <span>→</span>
                        <div className="bg-purple-100 px-3 py-2 rounded">Ledger Credit</div>
                        <span>→</span>
                        <div className="bg-yellow-100 px-3 py-2 rounded">Balance Updated</div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Internal Ledger</h4>
                        <p className="text-sm text-gray-700 mb-2">Track all financial movements:</p>
                        <ul className="space-y-1 text-xs text-gray-600">
                          <li>• Credit: Payroll processed</li>
                          <li>• Debit: Payout requested</li>
                          <li>• Balance after each transaction</li>
                          <li>• Full audit trail</li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Contractor Dashboard</h4>
                        <p className="text-sm text-gray-700 mb-2">Transparent balance view:</p>
                        <ul className="space-y-1 text-xs text-gray-600">
                          <li>• Current balance (large display)</li>
                          <li>• Recent transactions (last 5)</li>
                          <li>• Transaction history (all)</li>
                          <li>• Withdrawal button (mocked)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Multi-Currency */}
                <div className="border rounded-lg p-6 bg-indigo-50">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Globe className="h-6 w-6 text-indigo-600" />
                    5. Multi-Currency Support
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Handle contractors across different countries and currencies.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-indigo-600 mb-2">USD</div>
                      <p className="text-xs text-gray-600">Primary</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">EUR</div>
                      <p className="text-xs text-gray-600">Secondary</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-2">+5</div>
                      <p className="text-xs text-gray-600">Regional (EGP, SAR, AED, SYP, LBP)</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>POC:</strong> Static exchange rates, no conversion • 
                      <strong> Future:</strong> Real-time rates API, automatic conversion, consolidated reporting
                    </p>
                  </div>
                </div>

                {/* User Flows */}
                <div className="border rounded-lg p-6 bg-pink-50">
                  <h3 className="text-xl font-semibold mb-3">Payroll User Flows</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-green-900">Client: Run Monthly Payroll</h4>
                      <p className="text-sm text-gray-700">
                        Navigate to Payroll → Create Run → Select Month → Review Summary → Approve Line Items → Process → Confirmation
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-blue-900">Contractor: View Balance & Payslips</h4>
                      <p className="text-sm text-gray-700">
                        Login → Wallet Dashboard → See Balance → View Transactions → Download Payslips
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-purple-900">Admin: Monitor All Payroll</h4>
                      <p className="text-sm text-gray-700">
                        Payroll Overview → All Runs → Inspect Details → View Audit Logs → Export Reports
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>}

        {/* POC Timeline - Hidden for presentation */}
        {/* <Card className="mb-8 border-2 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="text-3xl flex items-center gap-3">
              <Clock className="h-8 w-8 text-purple-600" />
              12-Week POC Timeline
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Phase-by-phase delivery plan
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {[
                {
                  phase: "Phase 1",
                  weeks: "Week 1-2",
                  title: "Define Vision & Scope",
                  progress: 100,
                  deliverables: ["Product brief", "Architecture diagram", "UX wireframes", "Database schema"],
                  color: "blue"
                },
                {
                  phase: "Phase 2",
                  weeks: "Week 2-3",
                  title: "Design System Architecture",
                  progress: 80,
                  deliverables: ["Service boundaries", "API contracts", "Infrastructure plan", "Dev environment"],
                  color: "indigo"
                },
                {
                  phase: "Phase 3",
                  weeks: "Week 3-6",
                  title: "Build Backend MVP",
                  progress: 0,
                  deliverables: ["Auth service", "Contract service", "Payroll engine", "Payment service", "Staging deployment"],
                  color: "purple"
                },
                {
                  phase: "Phase 4",
                  weeks: "Week 6-9",
                  title: "Build Web Frontend",
                  progress: 0,
                  deliverables: ["Client dashboard", "Contractor dashboard", "Admin dashboard", "Contract wizard"],
                  color: "pink"
                },
                {
                  phase: "Phase 5",
                  weeks: "Week 9-10",
                  title: "Testing & Demo",
                  progress: 0,
                  deliverables: ["Test accounts", "Demo scenario", "Demo video", "Pitch deck"],
                  color: "green"
                },
                {
                  phase: "Phase 6",
                  weeks: "Week 10-12",
                  title: "Feedback & Iteration",
                  progress: 0,
                  deliverables: ["User feedback", "Bug fixes", "Improvements", "v1.1 roadmap"],
                  color: "yellow"
                }
              ].map((phase, idx) => (
                <div key={idx} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-lg px-3 py-1">{phase.phase}</Badge>
                        <h3 className="text-xl font-semibold">{phase.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{phase.weeks}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-700">{phase.progress}%</div>
                      <p className="text-xs text-gray-500">Complete</p>
                    </div>
                  </div>
                  <Progress value={phase.progress} className="mb-3" />
                  <div className="flex flex-wrap gap-2">
                    {phase.deliverables.map((item, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {phase.progress === 100 ? <CheckCircle2 className="h-3 w-3 mr-1 inline" /> : null}
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}

        {/* Success Metrics - Hidden for presentation */}
        {/* <Card className="mb-8 border-2 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
            <CardTitle className="text-3xl flex items-center gap-3">
              <Target className="h-8 w-8 text-green-600" />
              POC Success Criteria
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              How we measure success
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-4 text-blue-900">Technical Metrics</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>All 5 backend modules deployed</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>All 3 dashboards functional</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>CI/CD pipeline active</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Monitoring operational</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-4 text-green-900">Business Metrics</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>3 clients registered</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>3 contractors onboarded</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>2 contracts created</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>1 payroll run processed</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-4 text-purple-900">UX Metrics</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Registration &lt; 2 min</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>KYC submission &lt; 5 min</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Contract creation &lt; 5 min</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Dashboard load &lt; 1 sec</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Resources & Risks - Hidden for presentation */}
        {/* <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="border-2 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
              <CardTitle className="text-2xl flex items-center gap-3">
                <Users className="h-7 w-7 text-orange-600" />
                Resource Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Team</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                      <span className="font-medium">Tech Lead</span>
                      <Badge>1</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="font-medium">Frontend Developer</span>
                      <Badge>1-2</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="font-medium">Backend Developer</span>
                      <Badge>1-2</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                      <span className="font-medium">DevOps Engineer</span>
                      <Badge>0.5</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Infrastructure Cost (Monthly)</h3>
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-green-700">$200-500</div>
                    <p className="text-sm text-gray-600 mt-1">AWS/Cloud + Services</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
              <CardTitle className="text-2xl flex items-center gap-3">
                <AlertTriangle className="h-7 w-7 text-red-600" />
                Key Risks & Mitigation
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    <strong>Payment integration complexity</strong>
                    <br />
                    <span className="text-gray-600">Mitigation: Use sandbox mode initially</span>
                  </AlertDescription>
                </Alert>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    <strong>Multi-currency edge cases</strong>
                    <br />
                    <span className="text-gray-600">Mitigation: Start with 2-3 currencies, static rates</span>
                  </AlertDescription>
                </Alert>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    <strong>Compliance rule complexity</strong>
                    <br />
                    <span className="text-gray-600">Mitigation: Keep rules simple and manual for POC</span>
                  </AlertDescription>
                </Alert>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    <strong>Scope creep</strong>
                    <br />
                    <span className="text-gray-600">Mitigation: Strict MVP focus, defer to roadmap</span>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div> */}

        {/* Roadmap - Hidden for presentation */}
        {/* <Card className="mb-8 border-2 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
            <CardTitle className="text-3xl flex items-center gap-3">
              <Rocket className="h-8 w-8 text-pink-600" />
              Post-POC Roadmap
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Evolution path beyond POC
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-blue-600">v1.1</Badge>
                  <h3 className="font-semibold text-lg">3-6 Months Post-POC</h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline">Real Payments</Badge>
                  <Badge variant="outline">Automated KYC</Badge>
                  <Badge variant="outline">Tax Calculations</Badge>
                  <Badge variant="outline">More Currencies</Badge>
                  <Badge variant="outline">HRIS Integration</Badge>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-50 rounded-r-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-green-600">v2.0</Badge>
                  <h3 className="font-semibold text-lg">6-12 Months Post-POC</h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline">EOR Services</Badge>
                  <Badge variant="outline">Advanced Compliance</Badge>
                  <Badge variant="outline">Multi-language</Badge>
                  <Badge variant="outline">Multiple Payment Methods</Badge>
                  <Badge variant="outline">Accounting Integrations</Badge>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-r-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-purple-600">v3.0+</Badge>
                  <h3 className="font-semibold text-lg">12+ Months</h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline">AI Compliance</Badge>
                  <Badge variant="outline">Predictive Analytics</Badge>
                  <Badge variant="outline">50+ Countries</Badge>
                  <Badge variant="outline">Benefits Management</Badge>
                  <Badge variant="outline">Contractor Marketplace</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Call to Action */}
        <Card className="border-2 shadow-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <CardContent className="pt-8 pb-8">
              <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Building</h2>
              <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
                Mind-Links is a <strong>compliance-first, payroll-focused platform</strong> that solves the core pain points of cross-border contractor management for MENA companies.
              </p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Explore Detailed Flows</h3>
                <div className="flex justify-center gap-4 flex-wrap">
                  <Link to="/compliance-flow">
                    <Button size="lg" variant="outline" className="gap-2">
                      <Shield className="h-5 w-5" />
                      Compliance Flow Details
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/payroll-flow">
                    <Button size="lg" variant="outline" className="gap-2">
                      <DollarSign className="h-5 w-5" />
                      Payroll Flow Details
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-6">
                Prepared by: <strong>Saif Azzam (Tech Lead)</strong> • November 16, 2025
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductBrief;

