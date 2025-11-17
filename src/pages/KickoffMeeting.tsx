import * as React from "react";
import { Users, Briefcase, Shield, Target, TrendingUp, Calendar, CheckCircle2, AlertTriangle, DollarSign, Code, Database, Cloud, Zap, FileText, Presentation, ArrowRight, ArrowDown, Settings, Mail, CreditCard, Lock, FileCheck, Building2, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const KickoffMeeting = () => {

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b bg-gradient-to-r from-primary/10 to-backend-service/10">
                <div className="container mx-auto px-6 py-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Presentation className="w-8 h-8 text-primary" />
                            <h1 className="text-4xl font-bold text-foreground">Mind-Links POC Kickoff</h1>
                        </div>
                        <div className="flex justify-center gap-4 mt-6 flex-wrap">
                            <Link to="/product-brief">
                                <Button size="lg" variant="default" className="gap-2">
                                    <FileText className="w-5 h-5" />
                                    View Product Brief
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                            <Link to="/authentication-architecture">
                                <Button size="lg" variant="outline" className="gap-2">
                                    <Lock className="w-5 h-5" />
                                    Auth Architecture
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                            <Link to="/auth-poc-approaches">
                                <Button size="lg" variant="outline" className="gap-2 border-green-500 text-green-700 hover:bg-green-50">
                                    <Zap className="w-5 h-5" />
                                    Lambda vs ECS
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12 max-w-6xl">
                {/* Section 1: The Problem */}
                <Card className="p-8 mb-8 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-foreground">1️⃣ The Problem We're Solving</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                Global Hiring Challenges
                            </h3>
                            <p className="text-muted-foreground mb-4">
                                Companies want to hire <strong>international talent</strong> — developers, designers, consultants — across borders.
                                Growing demand for remote contractors in emerging markets (MENA region). Traditional employment models don't work for cross-border hiring.
                            </p>

                            <div className="mt-4">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Challenge</TableHead>
                                            <TableHead>Impact</TableHead>
                                            <TableHead>Current Workaround</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-semibold">No Local Entity</TableCell>
                                            <TableCell>Can't legally employ contractors</TableCell>
                                            <TableCell>Informal agreements (risky)</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">Cross-Border Payments</TableCell>
                                            <TableCell>Complex, expensive, slow</TableCell>
                                            <TableCell>Direct transfers (compliance issues)</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">Tax & Compliance</TableCell>
                                            <TableCell>Unclear obligations</TableCell>
                                            <TableCell>Avoid hiring or risk penalties</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">Contract Management</TableCell>
                                            <TableCell>No standardized process</TableCell>
                                            <TableCell>Manual, error-prone</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                        <Card className="p-6 bg-muted/50 border-2">
                            <h3 className="text-xl font-semibold mb-3">Problem & Solution Framework</h3>
                            <div className="space-y-4 text-sm text-muted-foreground">
                                <div>
                                    <p className="uppercase tracking-wide text-xs font-semibold text-foreground mb-1">Core Problem</p>
                                    <p>
                                        In Syria, the labor market is fragmented and lacks a reliable platform for contractors to connect with employers. This causes inefficiencies in hiring, compliance, and payment processes, making it difficult for both local and global teams to manage their workforce effectively.
                                    </p>
                                </div>
                                <div>
                                    <p className="uppercase tracking-wide text-xs font-semibold text-foreground mb-1">Solution Approach</p>
                                    <p>
                                        Mind-Links addresses this gap by providing a contractor management platform that simplifies onboarding, contracting, and payment processes for employers and contractors in Syria. The proof of concept focuses on essential features and will scale based on real user feedback.
                                    </p>
                                </div>
                                <div>
                                    <p className="uppercase tracking-wide text-xs font-semibold text-foreground mb-1">Value Proposition</p>
                                    <p>
                                        We streamline the complexity of hiring Syrian contractors, reduce administrative burden, and support compliance with local regulations—allowing companies to focus on their core business while expanding their talent acquisition capabilities.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Separator />
                    </div>
                </Card>

                {/* Section 2: Mind-Links Solution */}
                <Card className="p-8 mb-8 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <Target className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold text-foreground">2️⃣ Mind-Links Solution</h2>
                    </div>

                    <div className="space-y-6">
                        <Card className="p-6 bg-primary/5 border-2 border-primary/20">
                            <h3 className="text-xl font-semibold mb-3">Vision Statement</h3>
                            <p className="text-lg italic text-foreground">
                                "Mind-Links bridges the gap between companies and global contractors by offering a lightweight, compliant contractor management platform focused on the MENA region."
                            </p>
                        </Card>

                        <div>
                            <h3 className="text-xl font-semibold mb-4">Core Value Proposition</h3>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>What We Offer</TableHead>
                                        <TableHead>Why It Matters</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-semibold">Simplified Onboarding</TableCell>
                                        <TableCell>Fast contractor verification with KYC</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-semibold">Contract Management</TableCell>
                                        <TableCell>Standardized, legally-compliant contracts</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-semibold">Payment Processing</TableCell>
                                        <TableCell>Secure, transparent payment flows</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-semibold">Compliance First</TableCell>
                                        <TableCell>Built-in KYC, audit trails, tax documentation</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-semibold">MENA Focus</TableCell>
                                        <TableCell>Tailored for regional requirements</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                        <Separator />
                    </div>
                </Card>

                {/* Section 3: Market Benchmarking */}
                <Card className="p-8 mb-8 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-foreground">3️⃣ Market Benchmarking</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Feature / Requirement</TableHead>
                                        <TableHead>Deel</TableHead>
                                        <TableHead>Remote</TableHead>
                                        <TableHead className="bg-primary/10">Mind-Links (POC)</TableHead>
                                        <TableHead>Relevance</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-semibold">Contractor Onboarding</TableCell>
                                        <TableCell>✅ Strong</TableCell>
                                        <TableCell>⚠️ Not main focus</TableCell>
                                        <TableCell className="bg-primary/5">✅ Core</TableCell>
                                        <TableCell><Badge className="bg-red-500">Critical</Badge></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-semibold">Full-time Employees</TableCell>
                                        <TableCell>❌ Optional</TableCell>
                                        <TableCell>✅ Primary</TableCell>
                                        <TableCell className="bg-primary/5">❌</TableCell>
                                        <TableCell>Not needed</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-semibold">Contract Creation</TableCell>
                                        <TableCell>✅ Yes</TableCell>
                                        <TableCell>✅ Yes</TableCell>
                                        <TableCell className="bg-primary/5">✅ Yes</TableCell>
                                        <TableCell><Badge className="bg-red-500">Critical</Badge></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-semibold">Payments & Payouts</TableCell>
                                        <TableCell>✅ Yes</TableCell>
                                        <TableCell>✅ Yes (Payroll)</TableCell>
                                        <TableCell className="bg-primary/5">✅ Mocked</TableCell>
                                        <TableCell><Badge className="bg-red-500">Critical</Badge></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-semibold">Admin Dashboards</TableCell>
                                        <TableCell>✅ Yes</TableCell>
                                        <TableCell>✅ Yes</TableCell>
                                        <TableCell className="bg-primary/5">✅ Yes</TableCell>
                                        <TableCell><Badge className="bg-yellow-500">Important</Badge></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-semibold">Compliance (EOR, Tax)</TableCell>
                                        <TableCell>✅ Optional</TableCell>
                                        <TableCell>✅ Strong</TableCell>
                                        <TableCell className="bg-primary/5">⚠️ Simulated</TableCell>
                                        <TableCell>Mock only</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-semibold">MVP Complexity</TableCell>
                                        <TableCell>Lower</TableCell>
                                        <TableCell>Higher</TableCell>
                                        <TableCell className="bg-primary/5">Moderate</TableCell>
                                        <TableCell>POC-focused</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-xl font-semibold mb-4">Strategic Positioning</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <Card className="p-4 border-2">
                                    <h4 className="font-semibold mb-2">Deel's Focus</h4>
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                        <li>• Contractor management</li>
                                        <li>• Global reach, established brand</li>
                                        <li>• Full-featured platform</li>
                                    </ul>
                                </Card>
                                <Card className="p-4 border-2">
                                    <h4 className="font-semibold mb-2">Remote's Focus</h4>
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                        <li>• Full-time employment using EOR</li>
                                        <li>• Payroll, benefits, legal entities</li>
                                        <li>• Enterprise-focused</li>
                                    </ul>
                                </Card>
                                <Card className="p-4 border-2 border-primary/30 bg-primary/5">
                                    <h4 className="font-semibold mb-2">Mind-Links Position</h4>
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                        <li>• <strong>Closer to Deel</strong> — contractor-focused</li>
                                        <li>• <strong>Simpler MVP</strong> — contract-based hiring</li>
                                        <li>• <strong>MENA Regional Focus</strong> — tailored needs</li>
                                        <li>• <strong>POC Approach</strong> — validate before scaling</li>
                                    </ul>
                                </Card>
                            </div>
                        </div>

                        <Separator />
                    </div>
                </Card>

                {/* Section 4: Business Flow Overview */}
                <Card className="p-8 mb-8 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                            <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-foreground">4️⃣ Business Flow Overview</h2>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-6">Complete Flow Diagram with Under-the-Hood Details</h3>

                            {/* Step 1: Client Registration */}
                            <div className="mb-8">
                                <Card className="p-6 border-2 border-client/30 bg-client/5">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-client flex items-center justify-center text-white font-bold text-xl">
                                            1
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <Building2 className="w-6 h-6 text-client" />
                                                <h4 className="text-xl font-semibold">Client Registration & Verification</h4>
                                                <Badge className="bg-client text-white">Client Flow</Badge>
                                            </div>
                                            <p className="text-muted-foreground mb-4">
                                                <strong>What User Sees:</strong> Client signs up, enters company details, receives verification email
                                            </p>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                <strong>Dashboards:</strong> Client Dashboard – Company Profile setup; Admin Dashboard – Company Approvals queue.
                                            </p>
                                            <Card className="p-4 bg-muted/50 border-2 border-dashed">
                                                <h5 className="font-semibold mb-2 flex items-center gap-2">
                                                    <Settings className="w-4 h-4" />
                                                    Process Flow:
                                                </h5>
                                                <ul className="text-sm text-muted-foreground space-y-2">
                                                    <li>• Client submits registration form with company details</li>
                                                    <li>• System validates email and creates account</li>
                                                    <li>• Verification email sent to client's email address</li>
                                                    <li>• Client clicks verification link to activate account</li>
                                                    <li>• Company profile created and marked as "pending verification"</li>
                                                    <li>• Admin receives notification to review and approve company registration</li>
                                                </ul>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                                <div className="flex justify-center my-4">
                                    <ArrowDown className="w-8 h-8 text-muted-foreground" />
                                </div>
                            </div>

                            {/* Step 2: Contractor Invitation & Onboarding */}
                            <div className="mb-8">
                                <Card className="p-6 border-2 border-contractor/30 bg-contractor/5">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-contractor flex items-center justify-center text-white font-bold text-xl">
                                            2
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <UserCheck className="w-6 h-6 text-contractor" />
                                                <h4 className="text-xl font-semibold">Contractor Invitation & KYC Onboarding</h4>
                                                <Badge className="bg-contractor text-white">Contractor Flow</Badge>
                                            </div>
                                            <p className="text-muted-foreground mb-4">
                                                <strong>What User Sees:</strong> Contractor receives invite email, creates profile, uploads ID/passport, tax documents
                                            </p>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                <strong>Dashboards:</strong> Contractor Dashboard – Profile & Compliance; Admin Dashboard – KYC Verification queue.
                                            </p>
                                            <Card className="p-4 bg-muted/50 border-2 border-dashed">
                                                <h5 className="font-semibold mb-2 flex items-center gap-2">
                                                    <Settings className="w-4 h-4" />
                                                    Process Flow:
                                                </h5>
                                                <ul className="text-sm text-muted-foreground space-y-2">
                                                    <li>• Client sends invitation email to contractor with unique registration link</li>
                                                    <li>• Contractor clicks link and creates account with personal details</li>
                                                    <li>• Contractor uploads required documents (ID, passport, tax documents, bank statement)</li>
                                                    <li>• Documents are securely stored and contractor profile marked as "KYC submitted"</li>
                                                    <li>• Admin dashboard shows pending KYC verification request</li>
                                                    <li>• Admin reviews documents and approves/rejects KYC</li>
                                                    <li>• Once approved, contractor status changes to "verified" and can receive contracts</li>
                                                </ul>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                                <div className="flex justify-center my-4">
                                    <ArrowDown className="w-8 h-8 text-muted-foreground" />
                                </div>
                            </div>

                            {/* Step 3: Contract Creation */}
                            <div className="mb-8">
                                <Card className="p-6 border-2 border-client/30 bg-client/5">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-client flex items-center justify-center text-white font-bold text-xl">
                                            3
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <FileText className="w-6 h-6 text-client" />
                                                <h4 className="text-xl font-semibold">Contract Creation & E-Signature</h4>
                                                <Badge className="bg-client text-white">Client Flow</Badge>
                                            </div>
                                            <p className="text-muted-foreground mb-4">
                                                <strong>What User Sees:</strong> Client fills contract wizard (type, amount, milestones), PDF generated, sent to contractor for signature
                                            </p>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                <strong>Dashboards:</strong> Client Dashboard – Contract Wizard; Contractor Dashboard – Pending Contracts view.
                                            </p>
                                            <Card className="p-4 bg-muted/50 border-2 border-dashed">
                                                <h5 className="font-semibold mb-2 flex items-center gap-2">
                                                    <Settings className="w-4 h-4" />
                                                    Process Flow:
                                                </h5>
                                                <ul className="text-sm text-muted-foreground space-y-2">
                                                    <li>• Client selects contractor from verified list</li>
                                                    <li>• Client fills contract wizard: contract type (Fixed/Hourly), amount, currency, payment milestones</li>
                                                    <li>• System validates contract details and generates PDF contract document</li>
                                                    <li>• Contract sent to contractor for review via email</li>
                                                    <li>• Contractor reviews contract terms and digitally signs using e-signature</li>
                                                    <li>• Once both parties sign, contract status changes to "active"</li>
                                                    <li>• Both client and contractor receive confirmation email with signed contract PDF</li>
                                                </ul>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                                <div className="flex justify-center my-4">
                                    <ArrowDown className="w-8 h-8 text-muted-foreground" />
                                </div>
                            </div>

                            {/* Step 4: Payment Processing */}
                            <div className="mb-8">
                                <Card className="p-6 border-2 border-primary/30 bg-primary/5">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                                            4
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <CreditCard className="w-6 h-6 text-primary" />
                                                <h4 className="text-xl font-semibold">Payment Processing & Escrow</h4>
                                                <Badge className="bg-primary text-white">Payment Flow</Badge>
                                            </div>
                                            <p className="text-muted-foreground mb-4">
                                                <strong>What User Sees:</strong> Client adds funds via card, payment secured in escrow, contractor sees pending balance
                                            </p>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                <strong>Dashboards:</strong> Client Dashboard – Payments & Escrow; Contractor Dashboard – Wallet (Pending); Admin Dashboard – Payments Monitor.
                                            </p>
                                            <Card className="p-4 bg-muted/50 border-2 border-dashed">
                                                <h5 className="font-semibold mb-2 flex items-center gap-2">
                                                    <Settings className="w-4 h-4" />
                                                    Process Flow:
                                                </h5>
                                                <ul className="text-sm text-muted-foreground space-y-2">
                                                    <li>• Client enters payment card details in secure payment form</li>
                                                    <li>• Payment is processed and funds are held in escrow account</li>
                                                    <li>• Escrow balance is updated: funds secured but not yet released to contractor</li>
                                                    <li>• Client dashboard shows reduced available balance</li>
                                                    <li>• Contractor dashboard shows pending payment amount in escrow</li>
                                                    <li>• Transaction is logged for audit and compliance purposes</li>
                                                    <li>• Both parties receive confirmation email about escrow deposit</li>
                                                </ul>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                                <div className="flex justify-center my-4">
                                    <ArrowDown className="w-8 h-8 text-muted-foreground" />
                                </div>
                            </div>

                            {/* Step 5: Milestone Completion & Payment Release */}
                            <div className="mb-8">
                                <Card className="p-6 border-2 border-contractor/30 bg-contractor/5">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-contractor flex items-center justify-center text-white font-bold text-xl">
                                            5
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <CheckCircle2 className="w-6 h-6 text-contractor" />
                                                <h4 className="text-xl font-semibold">Milestone Completion & Payment Release</h4>
                                                <Badge className="bg-contractor text-white">Contractor Flow</Badge>
                                            </div>
                                            <p className="text-muted-foreground mb-4">
                                                <strong>What User Sees:</strong> Client marks milestone complete, contractor receives payment notification, balance updates
                                            </p>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                <strong>Dashboards:</strong> Client Dashboard – Contracts & Milestones; Contractor Dashboard – Wallet (Available Funds); Admin Dashboard – Transaction Logs.
                                            </p>
                                            <Card className="p-4 bg-muted/50 border-2 border-dashed">
                                                <h5 className="font-semibold mb-2 flex items-center gap-2">
                                                    <Settings className="w-4 h-4" />
                                                    Process Flow:
                                                </h5>
                                                <ul className="text-sm text-muted-foreground space-y-2">
                                                    <li>• Client reviews completed work and marks milestone as "complete"</li>
                                                    <li>• System validates milestone completion and triggers payment release</li>
                                                    <li>• Funds are released from escrow to contractor's account</li>
                                                    <li>• Escrow balance decreases, contractor available balance increases</li>
                                                    <li>• Currency conversion applied if contractor currency differs from contract currency</li>
                                                    <li>• Contractor receives email notification: "Payment received: $3,000"</li>
                                                    <li>• Contractor dashboard updates to show new available balance</li>
                                                    <li>• Transaction is logged in system for audit trail</li>
                                                </ul>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                                <div className="flex justify-center my-4">
                                    <ArrowDown className="w-8 h-8 text-muted-foreground" />
                                </div>
                            </div>

                            {/* Step 6: Contractor Payout (Simulated) */}
                            <div className="mb-8">
                                <Card className="p-6 border-2 border-contractor/30 bg-contractor/5">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-contractor flex items-center justify-center text-white font-bold text-xl">
                                            6
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <DollarSign className="w-6 h-6 text-contractor" />
                                                <h4 className="text-xl font-semibold">Contractor Payout Request (Simulated)</h4>
                                                <Badge className="bg-contractor text-white">Contractor Flow</Badge>
                                            </div>
                                            <p className="text-muted-foreground mb-4">
                                                <strong>What User Sees:</strong> Contractor clicks "Withdraw", sees confirmation, balance shows as "Processing"
                                            </p>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                <strong>Dashboards:</strong> Contractor Dashboard – Wallet & Withdrawals; Admin Dashboard – Payout Monitor.
                                            </p>
                                            <Card className="p-4 bg-muted/50 border-2 border-dashed">
                                                <h5 className="font-semibold mb-2 flex items-center gap-2">
                                                    <Settings className="w-4 h-4" />
                                                    Process Flow (POC - Simulated):
                                                </h5>
                                                <ul className="text-sm text-muted-foreground space-y-2">
                                                    <li>• Contractor clicks "Withdraw" button and enters withdrawal amount</li>
                                                    <li>• System validates contractor has sufficient balance</li>
                                                    <li>• Withdrawal request is created and marked as "processing"</li>
                                                    <li>• Contractor balance decreases by withdrawal amount</li>
                                                    <li>• After 24 hours (simulated), withdrawal status changes to "completed"</li>
                                                    <li>• Contractor receives confirmation email about withdrawal</li>
                                                    <li>• <Badge variant="outline" className="text-xs">Note: In production, this would integrate with real payment gateway (Wise, Payoneer, ShamCash for Syria, etc.)</Badge></li>
                                                </ul>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                                <div className="flex justify-center my-4">
                                    <ArrowDown className="w-8 h-8 text-muted-foreground" />
                                </div>
                            </div>

                            {/* Step 7: Admin Oversight (Parallel) */}
                            <div>
                                <Card className="p-6 border-2 border-admin/30 bg-admin/5">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-admin flex items-center justify-center text-white font-bold text-xl">
                                            ⚡
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <Shield className="w-6 h-6 text-admin" />
                                                <h4 className="text-xl font-semibold">Admin Oversight (Runs in Parallel)</h4>
                                                <Badge className="bg-admin text-white">Admin Flow</Badge>
                                            </div>
                                            <p className="text-muted-foreground mb-4">
                                                <strong>What Admin Sees:</strong> Real-time dashboard with all users, contracts, payments, KYC status, system health
                                            </p>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                <strong>Dashboards:</strong> Admin Dashboard – Global Oversight, KYC Review, Payments Monitor, System Health.
                                            </p>
                                            <Card className="p-4 bg-muted/50 border-2 border-dashed">
                                                <h5 className="font-semibold mb-2 flex items-center gap-2">
                                                    <Settings className="w-4 h-4" />
                                                    Process Flow:
                                                </h5>
                                                <ul className="text-sm text-muted-foreground space-y-2">
                                                    <li>• Admin dashboard displays real-time overview of all system activity</li>
                                                    <li>• Admin can view all users, contracts, payments, and KYC submissions</li>
                                                    <li>• Admin reviews and approves/rejects KYC verification requests</li>
                                                    <li>• Admin monitors payment flows and can view transaction history</li>
                                                    <li>• System health metrics displayed (API performance, error rates)</li>
                                                    <li>• All admin actions are logged with timestamps for audit trail</li>
                                                    <li>• Alerts configured for suspicious activity or system issues</li>
                                                </ul>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        <Separator />
                    </div>
                </Card>

                {/* Section 5: Technical Architecture & Tools */}
                <Card className="p-8 mb-8 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                            <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-foreground">5️⃣ Modular Architecture & POC Tools</h2>
                    </div>

                    <div className="space-y-8">
                        {/* Modular Architecture Advantages */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Settings className="w-5 h-5" />
                                Modular Architecture Advantages
                            </h3>
                            <Card className="p-6 bg-primary/5 border-2 border-primary/20 mb-6">
                                <p className="text-muted-foreground mb-4">
                                    Our architecture is built with <strong>5 independent, microservices-ready modules</strong>. Each service can be developed, tested, and deployed independently.
                                </p>
                                <div className="mt-4 pt-4 border-t">
                                    <h4 className="font-semibold mb-2">Why Modular Architecture?</h4>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• <strong>Easy Expansion:</strong> Each module is self-contained with clear boundaries. When we need to scale, we can split any module into a separate microservice without rewriting the entire system.</li>
                                        <li>• <strong>Independent Scaling:</strong> Payment service can scale separately from contract service based on traffic patterns.</li>
                                        <li>• <strong>Team Efficiency:</strong> Different teams can work on different modules simultaneously without conflicts.</li>
                                        <li>• <strong>Technology Flexibility:</strong> Each module can use different technologies if needed (e.g., Python for payment processing, Node.js for contracts).</li>
                                    </ul>
                                </div>
                                <div className="mt-4 pt-4 border-t">
                                    <h4 className="font-semibold mb-2">Path to Microservices:</h4>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Our modular design makes it easy to transition to full microservices architecture when needed:
                                    </p>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• <strong>Phase 1 (POC):</strong> All modules in one codebase, separate folders, clear interfaces</li>
                                        <li>• <strong>Phase 2 (Scale):</strong> Extract high-traffic modules (Payment, Auth) to separate services</li>
                                        <li>• <strong>Phase 3 (Full Microservices):</strong> Each module becomes independent service with own database, API, and deployment</li>
                                        <li>• <strong>Communication:</strong> Start with direct function calls, move to REST APIs, then to message queues (RabbitMQ/Kafka) as needed</li>
                                    </ul>
                                </div>
                            </Card>

                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    {
                                        service: "Auth & Identity Service",
                                        icon: Lock,
                                        advantages: [
                                            "Independent authentication logic",
                                            "Separate scaling for high auth traffic",
                                            "Isolated security updates"
                                        ],
                                        tools: "Clerk/Auth0, JWT, Redis (sessions)"
                                    },
                                    {
                                        service: "User Service",
                                        icon: Users,
                                        advantages: [
                                            "User profiles & RBAC isolated",
                                            "Easy to add new user types (admins, contractors, clients)",
                                            "Can be replaced with external user management later",
                                            "Independent database schema"
                                        ],
                                        tools: "PostgreSQL, Prisma ORM"
                                    },
                                    {
                                        service: "Contract Service",
                                        icon: FileText,
                                        advantages: [
                                            "Contract logic completely separate",
                                            "PDF generation doesn't impact payment processing",
                                            "Easy to add new contract types",
                                            "Can integrate different e-signature providers"
                                        ],
                                        tools: "PDFKit, DocuSign (sandbox), AWS S3"
                                    },
                                    {
                                        service: "Payment Service",
                                        icon: CreditCard,
                                        advantages: [
                                            "Payment processing isolated from other flows",
                                            "Can swap payment providers (Stripe → Adyen) easily",
                                            "Escrow logic contained in one service",
                                            "Independent transaction logging"
                                        ],
                                        tools: "Stripe/Adyen (sandbox), PostgreSQL, Redis (cache)"
                                    },
                                    {
                                        service: "Notification Service",
                                        icon: Mail,
                                        advantages: [
                                            "Email/SMS logic centralized",
                                            "Can add new channels (Slack, WhatsApp) without code changes elsewhere",
                                            "Easy to swap providers (SendGrid → Mailgun)",
                                            "Independent retry & queue logic"
                                        ],
                                        tools: "SendGrid, Redis (queue), WebSocket (in-app)"
                                    }
                                ].map((item, idx) => (
                                    <Card key={idx} className="p-5 border-2 hover:border-primary/50 transition-colors">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <item.icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <h4 className="font-semibold text-lg">{item.service}</h4>
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-xs font-semibold text-muted-foreground mb-2">POC TOOLS:</p>
                                            <Badge variant="outline" className="text-xs">{item.tools}</Badge>
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-xs font-semibold text-muted-foreground mb-2">MODULAR BENEFITS:</p>
                                            <ul className="text-sm text-muted-foreground space-y-2">
                                                {item.advantages.map((adv, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                        <span>{adv}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="pt-3 border-t">
                                            <p className="text-xs font-semibold text-muted-foreground mb-1">MICROSERVICE EXPANSION:</p>
                                            <p className="text-xs text-muted-foreground">
                                                This module can be extracted to a separate microservice when traffic grows. Simply wrap it in an API, add message queue communication, and deploy independently.
                                            </p>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        {/* POC Tools Breakdown */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Cloud className="w-5 h-5" />
                                POC Tools Requested/Provided
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                These are the specific tools we need for the POC. Some are already available, others need to be set up.
                            </p>

                            <div className="space-y-4">
                                <Card className="p-5 border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
                                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        Development & Collaboration Tools
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-sm font-semibold mb-1">Version Control</p>
                                            <Badge className="bg-green-500">GitHub / GitLab</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">Manage repos, PRs, branches</p>
                                            <p className="text-xs text-muted-foreground mt-1 italic">
                                                <strong>Benefit:</strong> Enables team collaboration, code review, version history, and easy rollback if issues arise.
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold mb-1">Project Management</p>
                                            <Badge className="bg-green-500">Jira / Linear / Notion</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">Track tasks, sprints, milestones</p>
                                            <p className="text-xs text-muted-foreground mt-1 italic">
                                                <strong>Benefit:</strong> Keeps team aligned, tracks progress, identifies blockers early, and provides visibility for stakeholders.
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold mb-1">Communication</p>
                                            <Badge className="bg-green-500">Slack / Teams</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">Team collaboration channels</p>
                                            <p className="text-xs text-muted-foreground mt-1 italic">
                                                <strong>Benefit:</strong> Real-time communication, quick decision-making, async updates, and integration with other tools.
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold mb-1">Design / Wireframes</p>
                                            <Badge className="bg-green-500">Figma</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">Create UX flows for all dashboards</p>
                                            <p className="text-xs text-muted-foreground mt-1 italic">
                                                <strong>Benefit:</strong> Visualize flows before coding, get stakeholder approval, reduce rework, and maintain design consistency.
                                            </p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-5 border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
                                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                                        <Code className="w-5 h-5 text-blue-600" />
                                        Core Technology Stack
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-sm font-semibold mb-1">Frontend Framework</p>
                                            <Badge className="bg-blue-500">Next.js 15 + Tailwind</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">React, SSR, fast development</p>
                                            <p className="text-xs text-muted-foreground mt-1 italic">
                                                <strong>Benefit:</strong> Fast development with reusable components, SEO-friendly, easy deployment on Vercel, great developer experience.
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold mb-1">Backend Framework</p>
                                            <Badge className="bg-blue-500">NestJS (Node.js)</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">TypeScript, modular architecture</p>
                                            <p className="text-xs text-muted-foreground mt-1 italic">
                                                <strong>Benefit:</strong> Built-in modular architecture, dependency injection, easy to test, perfect for microservices transition.
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold mb-1">Database</p>
                                            <Badge className="bg-blue-500">PostgreSQL + Redis</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">Primary DB + cache/sessions</p>
                                            <p className="text-xs text-muted-foreground mt-1 italic">
                                                <strong>Benefit:</strong> PostgreSQL ensures data integrity for financial transactions, Redis provides fast caching for better performance.
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold mb-1">ORM</p>
                                            <Badge className="bg-blue-500">Prisma</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">Type-safe database access</p>
                                            <p className="text-xs text-muted-foreground mt-1 italic">
                                                <strong>Benefit:</strong> Type-safe queries prevent errors, auto-generates TypeScript types, easy migrations, great developer experience.
                                            </p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-5 border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20">
                                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-purple-600" />
                                        Authentication & Security
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-sm font-semibold mb-1">Auth Provider</p>
                                            <Badge className="bg-purple-500">Clerk / Auth0</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">OAuth2, JWT, user management</p>
                                            <p className="text-xs text-muted-foreground mt-1 italic">
                                                <strong>Benefit:</strong> Pre-built auth flows (sign-up, login, OAuth), secure by default, reduces development time significantly.
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold mb-1">Storage</p>
                                            <Badge className="bg-purple-500">AWS S3</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">Secure document storage</p>
                                            <p className="text-xs text-muted-foreground mt-1 italic">
                                                <strong>Benefit:</strong> Scalable storage, secure access with signed URLs, cost-effective, integrates with AWS ecosystem.
                                            </p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-5 border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
                                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 text-orange-600" />
                                        Payment & E-Signature (Sandbox)
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-sm font-semibold mb-1">Payment Gateway</p>
                                            <Badge className="bg-orange-500">Stripe / Adyen (Test Mode)</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">Sandbox for POC, no real charges</p>
                                            <p className="text-xs text-muted-foreground mt-1 italic">
                                                <strong>Benefit:</strong> Test payment flows safely, industry-standard APIs, easy to switch to production mode later.
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold mb-1">E-Signature</p>
                                            <Badge className="bg-orange-500">DocuSign (Sandbox)</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">Free sandbox for contract signing</p>
                                            <p className="text-xs text-muted-foreground mt-1 italic">
                                                <strong>Benefit:</strong> Legally compliant signatures, free testing environment, webhook notifications for signature events.
                                            </p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-5 border-2 border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-pink-950/20">
                                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                                        <Mail className="w-5 h-5 text-pink-600" />
                                        Communication & Monitoring
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-sm font-semibold mb-1">Email Service</p>
                                            <Badge className="bg-pink-500">SendGrid</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">Free tier: 100 emails/day</p>
                                            <p className="text-xs text-muted-foreground mt-1 italic">
                                                <strong>Benefit:</strong> Reliable email delivery, template management, analytics, sufficient for POC testing.
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold mb-1">Monitoring</p>
                                            <Badge className="bg-pink-500">CloudWatch / Grafana</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">System health, logs, metrics</p>
                                            <p className="text-xs text-muted-foreground mt-1 italic">
                                                <strong>Benefit:</strong> Real-time system visibility, error tracking, performance metrics, helps identify issues early.
                                            </p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-5 border-2 border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/20">
                                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                                        <Cloud className="w-5 h-5 text-cyan-600" />
                                        Infrastructure & DevOps
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-sm font-semibold mb-1">CI/CD</p>
                                            <Badge className="bg-cyan-500">GitHub Actions</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">Automated builds, tests, deployment</p>
                                            <p className="text-xs text-muted-foreground mt-1 italic">
                                                <strong>Benefit:</strong> Automated testing prevents bugs, consistent deployments, faster iteration cycles.
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold mb-1">Infrastructure</p>
                                            <Badge className="bg-cyan-500">AWS / GCP + Terraform</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">IaC for reproducible deployments</p>
                                            <p className="text-xs text-muted-foreground mt-1 italic">
                                                <strong>Benefit:</strong> Infrastructure as code means reproducible environments, version control for infrastructure, easy scaling.
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold mb-1">Hosting</p>
                                            <Badge className="bg-cyan-500">Vercel (Frontend) + AWS ECS/Cloud Run (Backend)</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">Scalable, managed containers</p>
                                            <p className="text-xs text-muted-foreground mt-1 italic">
                                                <strong>Benefit:</strong> Zero-config deployment, auto-scaling, CDN for fast global access, managed infrastructure.
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold mb-1">API Documentation</p>
                                            <Badge className="bg-cyan-500">Swagger / Postman</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">Define and share endpoints</p>
                                            <p className="text-xs text-muted-foreground mt-1 italic">
                                                <strong>Benefit:</strong> Clear API contracts, easy testing, frontend/backend team alignment, reduces integration issues.
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Summary Pitch */}
                <Card className="p-8 shadow-lg border-2 border-primary/30 bg-primary/5">
                    <h2 className="text-2xl font-bold text-foreground mb-4">🎯 Summary Pitch</h2>
                    <blockquote className="text-lg italic text-foreground border-l-4 border-primary pl-4">
                        "Mind-Links is building a simplified contractor management platform for global teams — bridging the gap between hiring talent and handling compliance.
                        <br /><br />
                        Our POC focuses on core flows — onboarding, contracts, and payments — keeping it lean, fast, and realistic.
                        <br /><br />
                        Once validated, we can extend it with real payment gateways, compliance APIs, and automation for full-scale rollout."
                    </blockquote>
                </Card>

                <div className="text-center mt-8 text-muted-foreground text-sm">
                    Mind-Links — where companies and talent meet minds, not miles.
                </div>
            </div>
        </div>
    );
};

export default KickoffMeeting;

