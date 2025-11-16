import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertTriangle, Shield, FileText, Upload, Eye, CheckCheck, XCircle, Clock, User, Building2, UserCog, ArrowLeft, ArrowRight, Database, Server, Lock, Bell, FileCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

const ComplianceFlow = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="mb-4">
                        <Link to="/product-brief">
                            <Button variant="secondary" size="sm" className="gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Product Brief
                            </Button>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-white/20 p-4 rounded-lg">
                            <Shield className="h-12 w-12" />
                        </div>
                        <div>
                            <h1 className="text-5xl font-bold">Compliance Management</h1>
                            <p className="text-xl opacity-90 mt-2">Complete Flow, Dashboards & Implementation Details</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12 max-w-7xl">
                {/* Overview */}
                <Card className="mb-8 border-2 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                        <CardTitle className="text-3xl flex items-center gap-3">
                            <Shield className="h-8 w-8 text-blue-600" />
                            What is Compliance Management?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            <p className="text-lg text-gray-700">
                                Compliance Management in Mind-Links is a <strong>comprehensive system</strong> that ensures companies can legally hire and manage international contractors by collecting, verifying, and tracking all necessary documentation and regulatory requirements.
                            </p>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                                    <h3 className="font-bold text-lg mb-2 text-blue-900">Why It Matters</h3>
                                    <p className="text-sm text-gray-700">
                                        Without proper compliance, companies face legal penalties, tax issues, and contractor misclassification risks.
                                    </p>
                                </div>
                                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                                    <h3 className="font-bold text-lg mb-2 text-green-900">What We Track</h3>
                                    <p className="text-sm text-gray-700">
                                        Identity documents, tax certificates, contracts, bank details, and country-specific requirements.
                                    </p>
                                </div>
                                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
                                    <h3 className="font-bold text-lg mb-2 text-purple-900">Who Benefits</h3>
                                    <p className="text-sm text-gray-700">
                                        Clients get peace of mind, contractors get transparent processes, admins get audit trails.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Core Components */}
                <Card className="mb-8 border-2 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                        <CardTitle className="text-2xl">5 Core Compliance Components</CardTitle>
                        <CardDescription>Building blocks of the compliance system</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            {[
                                {
                                    number: "1",
                                    title: "Compliance Monitoring Dashboard",
                                    description: "Real-time overview of all contractors' compliance status",
                                    icon: Eye,
                                    color: "blue",
                                    features: ["Status tracking per contractor", "Missing document alerts", "Expiring document warnings", "Country-specific rules"]
                                },
                                {
                                    number: "2",
                                    title: "Document Management System",
                                    description: "Secure upload, storage, and verification of documents",
                                    icon: FileText,
                                    color: "green",
                                    features: ["AWS S3 secure storage", "Document type categorization", "Version history", "Approval workflows"]
                                },
                                {
                                    number: "3",
                                    title: "Country-Specific Rules Engine",
                                    description: "Automatic requirement detection based on contractor location",
                                    icon: Database,
                                    color: "purple",
                                    features: ["Countries database", "Required docs per country", "Admin-configurable rules", "Automatic checklist generation"]
                                },
                                {
                                    number: "4",
                                    title: "Audit Trail System",
                                    description: "Complete logging of all compliance actions",
                                    icon: FileCheck,
                                    color: "orange",
                                    features: ["Who did what, when", "Document approval history", "Export for legal review", "Immutable logs"]
                                },
                                {
                                    number: "5",
                                    title: "Notification System",
                                    description: "Automated alerts for compliance events",
                                    icon: Bell,
                                    color: "pink",
                                    features: ["Email notifications", "In-app alerts", "Expiry reminders", "Approval/rejection notices"]
                                }
                            ].map((component, idx) => (
                                <div key={idx} className={`border-2 border-${component.color}-200 rounded-lg p-6 bg-${component.color}-50`}>
                                    <div className="flex items-start gap-4">
                                        <div className={`bg-${component.color}-600 p-4 rounded-lg text-white flex-shrink-0`}>
                                            <component.icon className="h-8 w-8" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Badge className={`bg-${component.color}-600 text-white`}>{component.number}</Badge>
                                                <h3 className="text-xl font-bold">{component.title}</h3>
                                            </div>
                                            <p className="text-gray-700 mb-4">{component.description}</p>
                                            <div className="grid md:grid-cols-2 gap-2">
                                                {component.features.map((feature, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle2 className={`h-4 w-4 text-${component.color}-600`} />
                                                        <span>{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Complete User Flows */}
                <Card className="mb-8 border-2 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                        <CardTitle className="text-2xl">Complete Compliance Flows by User Role</CardTitle>
                        <CardDescription>Step-by-step journeys for each user type</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <Tabs defaultValue="contractor" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 mb-6">
                                <TabsTrigger value="contractor">
                                    <User className="h-4 w-4 mr-2" />
                                    Contractor Flow
                                </TabsTrigger>
                                <TabsTrigger value="client">
                                    <Building2 className="h-4 w-4 mr-2" />
                                    Client Flow
                                </TabsTrigger>
                                <TabsTrigger value="admin">
                                    <UserCog className="h-4 w-4 mr-2" />
                                    Admin Flow
                                </TabsTrigger>
                            </TabsList>

                            {/* Contractor Flow */}
                            <TabsContent value="contractor" className="space-y-6">
                                <Alert className="bg-blue-50 border-blue-300">
                                    <User className="h-4 w-4" />
                                    <AlertDescription>
                                        <strong>Contractor's Goal:</strong> Complete onboarding by submitting all required documents to start working legally.
                                    </AlertDescription>
                                </Alert>

                                <div className="space-y-4">
                                    {[
                                        {
                                            step: 1,
                                            title: "Receive Invitation",
                                            description: "Contractor receives email invitation from client company",
                                            details: [
                                                "Email contains: Company name, role, contract type, unique registration link",
                                                "Link expires in 7 days for security",
                                                "Email template: 'Welcome to Mind-Links! [Company] wants to work with you'"
                                            ],
                                            icon: Bell,
                                            screenshot: "Email with 'Get Started' button linking to registration"
                                        },
                                        {
                                            step: 2,
                                            title: "Create Account & Profile",
                                            description: "Click link, register with email/password, complete basic profile",
                                            details: [
                                                "Fields: Full Name, Email (pre-filled), Password, Phone Number",
                                                "Country selector (critical: determines required documents)",
                                                "Role/Specialty: Developer, Designer, Consultant, etc.",
                                                "LinkedIn/Portfolio URL (optional)"
                                            ],
                                            icon: User,
                                            screenshot: "Registration form with country dropdown highlighted"
                                        },
                                        {
                                            step: 3,
                                            title: "See Document Checklist",
                                            description: "System auto-generates required documents based on contractor's country",
                                            details: [
                                                "Dashboard shows: 'Your Compliance Status: Incomplete'",
                                                "Checklist appears with country-specific requirements",
                                                "Example for Syria: Passport (required), National ID (required), Tax Certificate (optional)",
                                                "Each item shows: Document type, Required/Optional, Status, Upload button"
                                            ],
                                            icon: FileText,
                                            screenshot: "Compliance dashboard with checklist: 3 documents required, 0 uploaded"
                                        },
                                        {
                                            step: 4,
                                            title: "Upload Documents",
                                            description: "Upload each required document with metadata",
                                            details: [
                                                "Click 'Upload Passport' → File picker (PDF, JPG, PNG up to 10MB)",
                                                "After selection: Preview thumbnail shown",
                                                "Add metadata: Document Number, Expiry Date",
                                                "Click 'Submit Document' → Status changes to 'Under Review'",
                                                "Repeat for each required document"
                                            ],
                                            icon: Upload,
                                            screenshot: "Upload modal with drag-drop zone, metadata fields, and submit button"
                                        },
                                        {
                                            step: 5,
                                            title: "Bank Details (Optional for POC)",
                                            description: "Provide payout information",
                                            details: [
                                                "Fields: Bank Name, Account Holder Name, IBAN/Account Number, SWIFT Code",
                                                "Currency preference: USD, EUR, or local currency",
                                                "Can be added later before first payment"
                                            ],
                                            icon: Database,
                                            screenshot: "Bank details form with currency selector"
                                        },
                                        {
                                            step: 6,
                                            title: "Wait for Admin Review",
                                            description: "Documents are reviewed by Mind-Links admin team",
                                            details: [
                                                "Dashboard shows: 'Under Review' status for each document",
                                                "Email notification: 'Your documents are being reviewed'",
                                                "Estimated review time: 1-2 business days",
                                                "Contractor can check status anytime in dashboard"
                                            ],
                                            icon: Clock,
                                            screenshot: "Dashboard with 'Under Review' badges, pending icon animation"
                                        },
                                        {
                                            step: 7,
                                            title: "Receive Approval/Rejection",
                                            description: "Admin approves or requests corrections",
                                            details: [
                                                "Approved: Email + dashboard status → 'Compliance Status: Approved ✓'",
                                                "Rejected: Email with reason (e.g., 'Passport image unclear, please re-upload')",
                                                "If rejected: Contractor sees 'Reupload' button, repeats Step 4",
                                                "Once all approved: Green banner 'You're all set! Ready to work.'"
                                            ],
                                            icon: CheckCheck,
                                            screenshot: "Success screen with all documents showing green checkmarks"
                                        },
                                        {
                                            step: 8,
                                            title: "Ongoing: Expiry Reminders",
                                            description: "System monitors document expiry dates",
                                            details: [
                                                "30 days before expiry: Email reminder to renew document",
                                                "Dashboard shows: 'Expiring Soon' warning badge",
                                                "On expiry: Status changes to 'Expired', needs reupload",
                                                "Contract work may be paused if critical docs expire"
                                            ],
                                            icon: AlertCircle,
                                            screenshot: "Dashboard with yellow 'Expiring Soon' warning on passport"
                                        }
                                    ].map((step, idx) => (
                                        <div key={idx} className="bg-white border-2 border-blue-200 rounded-lg p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                                                    {step.step}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <step.icon className="h-6 w-6 text-blue-600" />
                                                        <h3 className="text-xl font-bold">{step.title}</h3>
                                                    </div>
                                                    <p className="text-gray-700 mb-4 font-medium">{step.description}</p>
                                                    <div className="bg-blue-50 p-4 rounded-lg mb-3">
                                                        <h4 className="font-semibold mb-2 text-sm text-blue-900">Details:</h4>
                                                        <ul className="space-y-1 text-sm text-gray-700">
                                                            {step.details.map((detail, i) => (
                                                                <li key={i} className="flex items-start gap-2">
                                                                    <span className="text-blue-600 mt-1">•</span>
                                                                    <span>{detail}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="bg-gray-100 p-3 rounded border border-gray-300 text-xs text-gray-600 italic">
                                                        <strong>UI:</strong> {step.screenshot}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Alert className="bg-green-50 border-green-300">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <AlertDescription>
                                        <strong>End Result:</strong> Contractor has completed KYC, all documents approved, ready to sign contracts and receive payments.
                                    </AlertDescription>
                                </Alert>
                            </TabsContent>

                            {/* Client Flow */}
                            <TabsContent value="client" className="space-y-6">
                                <Alert className="bg-green-50 border-green-300">
                                    <Building2 className="h-4 w-4" />
                                    <AlertDescription>
                                        <strong>Client's Goal:</strong> Invite contractors, monitor their compliance status, ensure all team members are legally compliant.
                                    </AlertDescription>
                                </Alert>

                                <div className="space-y-4">
                                    {[
                                        {
                                            step: 1,
                                            title: "Company Registration",
                                            description: "Client company registers on Mind-Links platform",
                                            details: [
                                                "Fields: Legal Company Name, Country, Tax ID, Business Address",
                                                "Contact Person: Name, Email, Phone",
                                                "Upload: Business Registration Certificate (optional for POC)",
                                                "Status: 'Verification Pending' until admin approves"
                                            ],
                                            icon: Building2
                                        },
                                        {
                                            step: 2,
                                            title: "Access Client Dashboard",
                                            description: "After login, client sees main dashboard",
                                            details: [
                                                "Top stats: Total Contractors, Compliant, Incomplete, Expiring Docs",
                                                "Main sections: Contractors, Contracts, Payments, Compliance",
                                                "Compliance section shows: Overall status, action items"
                                            ],
                                            icon: Eye
                                        },
                                        {
                                            step: 3,
                                            title: "Invite Contractor",
                                            description: "Client initiates contractor onboarding",
                                            details: [
                                                "Click 'Invite Contractor' button",
                                                "Form: Contractor Email, First Name, Last Name, Role",
                                                "Optional: Pre-select contract type (Fixed/Hourly)",
                                                "System sends invitation email automatically",
                                                "Client sees: 'Invitation Sent' status in contractor list"
                                            ],
                                            icon: Bell
                                        },
                                        {
                                            step: 4,
                                            title: "Monitor Compliance Status",
                                            description: "Track contractor's onboarding progress",
                                            details: [
                                                "Contractors list shows status: Invited, Incomplete, Under Review, Approved",
                                                "Click contractor name → see detailed compliance view",
                                                "Green: All docs approved, Yellow: Missing/expiring, Red: Rejected",
                                                "Can see which specific documents are missing"
                                            ],
                                            icon: Shield
                                        },
                                        {
                                            step: 5,
                                            title: "View Compliance Dashboard",
                                            description: "Dedicated compliance monitoring screen",
                                            details: [
                                                "Filters: All, Compliant, Incomplete, Expiring",
                                                "Table: Contractor Name, Country, KYC Status, Missing Docs, Actions",
                                                "Click 'View Details' → see all documents and their statuses",
                                                "Export button: Download compliance report (CSV)",
                                                "Visual indicators: ✓ Approved, ⏳ Pending, ❌ Rejected, ⚠️ Expiring"
                                            ],
                                            icon: FileCheck
                                        },
                                        {
                                            step: 6,
                                            title: "Upload Client-Side Documents (Optional)",
                                            description: "Some countries require client to provide documents too",
                                            details: [
                                                "Example: Employer registration certificate for specific countries",
                                                "Client dashboard shows: 'Your Compliance Status'",
                                                "Upload same way as contractors",
                                                "Admin reviews client docs as well"
                                            ],
                                            icon: Upload
                                        },
                                        {
                                            step: 7,
                                            title: "Receive Alerts",
                                            description: "Automated notifications for compliance issues",
                                            details: [
                                                "Email when contractor completes KYC: 'Ahmed is ready to work!'",
                                                "Alert when document expiring: '3 contractors have expiring documents'",
                                                "Dashboard bell icon shows unread notifications count",
                                                "In-app notification center lists all recent events"
                                            ],
                                            icon: AlertCircle
                                        },
                                        {
                                            step: 8,
                                            title: "Compliance Report Generation",
                                            description: "Export compliance data for legal/HR review",
                                            details: [
                                                "Click 'Generate Report' in Compliance section",
                                                "Select: Date range, contractors, document types",
                                                "Format: PDF (summary) or CSV (detailed)",
                                                "Report includes: All contractors, doc status, approval dates, missing items"
                                            ],
                                            icon: FileText
                                        }
                                    ].map((step, idx) => (
                                        <div key={idx} className="bg-white border-2 border-green-200 rounded-lg p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                                                    {step.step}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <step.icon className="h-6 w-6 text-green-600" />
                                                        <h3 className="text-xl font-bold">{step.title}</h3>
                                                    </div>
                                                    <p className="text-gray-700 mb-4 font-medium">{step.description}</p>
                                                    <div className="bg-green-50 p-4 rounded-lg">
                                                        <ul className="space-y-1 text-sm text-gray-700">
                                                            {step.details.map((detail, i) => (
                                                                <li key={i} className="flex items-start gap-2">
                                                                    <span className="text-green-600 mt-1">•</span>
                                                                    <span>{detail}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            {/* Admin Flow */}
                            <TabsContent value="admin" className="space-y-6">
                                <Alert className="bg-purple-50 border-purple-300">
                                    <UserCog className="h-4 w-4" />
                                    <AlertDescription>
                                        <strong>Admin's Goal:</strong> Review and approve/reject documents, maintain compliance system integrity, manage country rules.
                                    </AlertDescription>
                                </Alert>

                                <div className="space-y-4">
                                    {[
                                        {
                                            step: 1,
                                            title: "Access Admin Dashboard",
                                            description: "Admin logs in to see global overview",
                                            details: [
                                                "Top stats: Total Contractors, Pending Reviews, Approved Today, Expiring This Month",
                                                "Quick actions: Pending Documents, Recent Activity, System Alerts",
                                                "Sections: Document Review, Compliance Monitor, Country Settings, Audit Logs"
                                            ],
                                            icon: Eye
                                        },
                                        {
                                            step: 2,
                                            title: "Document Review Queue",
                                            description: "See all pending document submissions",
                                            details: [
                                                "Table: Contractor Name, Company, Document Type, Uploaded Date, Priority",
                                                "Priority: High (>3 days old), Normal (<3 days), Low (optional docs)",
                                                "Filters: By company, by country, by document type, by date",
                                                "Click 'Review' button to inspect document"
                                            ],
                                            icon: FileText
                                        },
                                        {
                                            step: 3,
                                            title: "Review Individual Document",
                                            description: "Detailed inspection and decision",
                                            details: [
                                                "Left side: Document viewer (PDF/image with zoom, rotate)",
                                                "Right side: Metadata (contractor info, doc details, upload date)",
                                                "Check: Name matches, document clear, expiry date valid, details correct",
                                                "Decision buttons: Approve ✓ | Reject ✗",
                                                "If reject: Text box for rejection reason (required)"
                                            ],
                                            icon: Eye
                                        },
                                        {
                                            step: 4,
                                            title: "Approve Document",
                                            description: "Mark document as approved",
                                            details: [
                                                "Click 'Approve' → Confirmation modal 'Approve [Document Type] for [Name]?'",
                                                "Click 'Confirm' → Document status → 'Approved'",
                                                "System logs: Admin ID, timestamp, action",
                                                "Contractor receives email: '[Document] approved!'",
                                                "Document moves out of review queue"
                                            ],
                                            icon: CheckCheck
                                        },
                                        {
                                            step: 5,
                                            title: "Reject Document",
                                            description: "Request re-upload with reason",
                                            details: [
                                                "Click 'Reject' → Modal: 'Reason for rejection (required)'",
                                                "Common reasons dropdown: Image unclear, Details incorrect, Expired, Wrong document type",
                                                "Or custom text: 'Passport number not visible'",
                                                "Click 'Reject' → Status → 'Rejected'",
                                                "Contractor receives email with rejection reason and re-upload instructions"
                                            ],
                                            icon: XCircle
                                        },
                                        {
                                            step: 6,
                                            title: "Compliance Monitoring",
                                            description: "Global view of all contractors' compliance",
                                            details: [
                                                "Map view: Shows contractors by country with status colors",
                                                "List view: All contractors with compliance score (0-100%)",
                                                "Filters: By status, by expiry date, by country, by company",
                                                "Bulk actions: Send reminder emails, export reports",
                                                "Click contractor → see full document history and audit trail"
                                            ],
                                            icon: Shield
                                        },
                                        {
                                            step: 7,
                                            title: "Manage Country Rules",
                                            description: "Configure required documents per country",
                                            details: [
                                                "Countries list: All supported countries",
                                                "Click country (e.g., Syria) → Edit rules",
                                                "Add/remove required documents: Passport (required), Tax ID (optional), etc.",
                                                "Set: Document types, whether required/optional, expiry tracking",
                                                "Save → New contractors from this country see updated checklist"
                                            ],
                                            icon: Database
                                        },
                                        {
                                            step: 8,
                                            title: "Audit Trail & Reporting",
                                            description: "View all compliance actions and export logs",
                                            details: [
                                                "Audit log table: Timestamp, Admin, Action, Entity, Details",
                                                "Filters: Date range, admin user, action type, contractor",
                                                "Actions logged: Approve, Reject, Rule change, Client verification",
                                                "Export: CSV/PDF for legal compliance audits",
                                                "Logs are immutable (cannot be edited or deleted)"
                                            ],
                                            icon: FileCheck
                                        }
                                    ].map((step, idx) => (
                                        <div key={idx} className="bg-white border-2 border-purple-200 rounded-lg p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                                                    {step.step}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <step.icon className="h-6 w-6 text-purple-600" />
                                                        <h3 className="text-xl font-bold">{step.title}</h3>
                                                    </div>
                                                    <p className="text-gray-700 mb-4 font-medium">{step.description}</p>
                                                    <div className="bg-purple-50 p-4 rounded-lg">
                                                        <ul className="space-y-1 text-sm text-gray-700">
                                                            {step.details.map((detail, i) => (
                                                                <li key={i} className="flex items-start gap-2">
                                                                    <span className="text-purple-600 mt-1">•</span>
                                                                    <span>{detail}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

        {/* Database Schema - Hidden for presentation */}
        {/* <Card className="mb-8 border-2 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-100">
            <CardTitle className="text-2xl flex items-center gap-3">
              <Database className="h-7 w-7 text-gray-700" />
              Database Schema for Compliance
            </CardTitle>
            <CardDescription>PostgreSQL tables and relationships</CardDescription>
          </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            <div className="bg-white border-2 rounded-lg p-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <Database className="h-5 w-5" />
                                    Table: <code className="bg-gray-100 px-2 py-1 rounded">contractors</code>
                                </h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Column</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Description</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">id</TableCell>
                                            <TableCell>UUID</TableCell>
                                            <TableCell>Primary key</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">user_id</TableCell>
                                            <TableCell>UUID</TableCell>
                                            <TableCell>Foreign key to users table</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">full_name</TableCell>
                                            <TableCell>VARCHAR(255)</TableCell>
                                            <TableCell>Contractor's full legal name</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">country</TableCell>
                                            <TableCell>VARCHAR(2)</TableCell>
                                            <TableCell>ISO country code (e.g., 'SY', 'EG')</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">kyc_status</TableCell>
                                            <TableCell>ENUM</TableCell>
                                            <TableCell>'incomplete', 'under_review', 'approved', 'rejected'</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">compliance_score</TableCell>
                                            <TableCell>INTEGER</TableCell>
                                            <TableCell>0-100, based on docs approved / docs required</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">bank_details</TableCell>
                                            <TableCell>JSONB</TableCell>
                                            <TableCell>Bank name, IBAN, SWIFT, account holder</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">created_at</TableCell>
                                            <TableCell>TIMESTAMP</TableCell>
                                            <TableCell>Registration timestamp</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="bg-white border-2 rounded-lg p-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Table: <code className="bg-gray-100 px-2 py-1 rounded">documents</code>
                                </h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Column</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Description</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">id</TableCell>
                                            <TableCell>UUID</TableCell>
                                            <TableCell>Primary key</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">contractor_id</TableCell>
                                            <TableCell>UUID</TableCell>
                                            <TableCell>Foreign key to contractors</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">document_type</TableCell>
                                            <TableCell>ENUM</TableCell>
                                            <TableCell>'passport', 'national_id', 'tax_certificate', 'bank_statement'</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">file_url</TableCell>
                                            <TableCell>TEXT</TableCell>
                                            <TableCell>S3 URL (signed for security)</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">file_size</TableCell>
                                            <TableCell>INTEGER</TableCell>
                                            <TableCell>File size in bytes</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">mime_type</TableCell>
                                            <TableCell>VARCHAR(100)</TableCell>
                                            <TableCell>'application/pdf', 'image/jpeg', etc.</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">status</TableCell>
                                            <TableCell>ENUM</TableCell>
                                            <TableCell>'uploaded', 'under_review', 'approved', 'rejected'</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">rejection_reason</TableCell>
                                            <TableCell>TEXT</TableCell>
                                            <TableCell>Reason if rejected (nullable)</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">document_number</TableCell>
                                            <TableCell>VARCHAR(100)</TableCell>
                                            <TableCell>Passport/ID number (nullable)</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">expiry_date</TableCell>
                                            <TableCell>DATE</TableCell>
                                            <TableCell>Document expiration date (nullable)</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">uploaded_at</TableCell>
                                            <TableCell>TIMESTAMP</TableCell>
                                            <TableCell>When contractor uploaded</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">reviewed_at</TableCell>
                                            <TableCell>TIMESTAMP</TableCell>
                                            <TableCell>When admin reviewed (nullable)</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">reviewed_by</TableCell>
                                            <TableCell>UUID</TableCell>
                                            <TableCell>Admin user ID who reviewed (nullable)</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="bg-white border-2 rounded-lg p-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <Database className="h-5 w-5" />
                                    Table: <code className="bg-gray-100 px-2 py-1 rounded">countries</code>
                                </h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Column</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Description</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">code</TableCell>
                                            <TableCell>VARCHAR(2)</TableCell>
                                            <TableCell>ISO country code, primary key</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">name</TableCell>
                                            <TableCell>VARCHAR(100)</TableCell>
                                            <TableCell>Country name (e.g., 'Syria')</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">required_documents</TableCell>
                                            <TableCell>JSONB</TableCell>
                                            <TableCell>Array of required doc types, e.g., ['passport', 'tax_certificate']</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">optional_documents</TableCell>
                                            <TableCell>JSONB</TableCell>
                                            <TableCell>Array of optional doc types</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">currency_code</TableCell>
                                            <TableCell>VARCHAR(3)</TableCell>
                                            <TableCell>Default currency (e.g., 'SYP', 'USD')</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="bg-white border-2 rounded-lg p-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <FileCheck className="h-5 w-5" />
                                    Table: <code className="bg-gray-100 px-2 py-1 rounded">audit_logs</code>
                                </h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Column</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Description</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">id</TableCell>
                                            <TableCell>UUID</TableCell>
                                            <TableCell>Primary key</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">action</TableCell>
                                            <TableCell>VARCHAR(50)</TableCell>
                                            <TableCell>'document_approved', 'document_rejected', 'contractor_created', etc.</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">actor_id</TableCell>
                                            <TableCell>UUID</TableCell>
                                            <TableCell>User who performed action</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">actor_role</TableCell>
                                            <TableCell>VARCHAR(20)</TableCell>
                                            <TableCell>'admin', 'client', 'contractor'</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">entity_type</TableCell>
                                            <TableCell>VARCHAR(50)</TableCell>
                                            <TableCell>'document', 'contractor', 'country_rule'</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">entity_id</TableCell>
                                            <TableCell>UUID</TableCell>
                                            <TableCell>ID of entity affected</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">details</TableCell>
                                            <TableCell>JSONB</TableCell>
                                            <TableCell>Additional context (e.g., rejection reason)</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">timestamp</TableCell>
                                            <TableCell>TIMESTAMP</TableCell>
                                            <TableCell>When action occurred</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-mono text-sm">ip_address</TableCell>
                                            <TableCell>INET</TableCell>
                                            <TableCell>IP address of actor (for security)</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </CardContent>
                </Card> */}

                {/* Technical Implementation - Hidden for presentation */}
                {/* <Card className="mb-8 border-2 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
                        <CardTitle className="text-2xl flex items-center gap-3">
                            <Server className="h-7 w-7 text-indigo-700" />
                            Technical Implementation Details
                        </CardTitle>
                        <CardDescription>Backend, APIs, and infrastructure</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <Tabs defaultValue="backend" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="backend">Backend APIs</TabsTrigger>
                                <TabsTrigger value="storage">File Storage</TabsTrigger>
                                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                                <TabsTrigger value="security">Security</TabsTrigger>
                            </TabsList>

                            <TabsContent value="backend" className="space-y-4 mt-6">
                                <div className="bg-gray-50 p-6 rounded-lg border">
                                    <h3 className="font-bold mb-4">Compliance Service API Endpoints (NestJS)</h3>
                                    <div className="space-y-4 font-mono text-sm">
                                        <div className="bg-white p-4 rounded border-l-4 border-green-500">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant="outline" className="bg-green-100">POST</Badge>
                                                <code>/api/contractors</code>
                                            </div>
                                            <p className="text-gray-700 text-xs">Create contractor profile (called after registration)</p>
                                            <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-x-auto">
                                                {`{
  "userId": "uuid",
  "fullName": "Ahmed Hassan",
  "country": "SY",
  "phone": "+963...",
  "role": "developer"
}`}
                                            </pre>
                                        </div>

                                        <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant="outline" className="bg-blue-100">GET</Badge>
                                                <code>/api/contractors/:id/compliance</code>
                                            </div>
                                            <p className="text-gray-700 text-xs">Get contractor's compliance status and required documents</p>
                                            <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-x-auto">
                                                {`Response: {
  "contractorId": "uuid",
  "kycStatus": "incomplete",
  "complianceScore": 33,
  "requiredDocuments": [
    {"type": "passport", "required": true, "status": "missing"},
    {"type": "tax_certificate", "required": true, "status": "approved"}
  ]
}`}
                                            </pre>
                                        </div>

                                        <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant="outline" className="bg-purple-100">POST</Badge>
                                                <code>/api/documents/upload</code>
                                            </div>
                                            <p className="text-gray-700 text-xs">Upload document (multipart form)</p>
                                            <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-x-auto">
                                                {`Form data:
- file: File (PDF/Image)
- contractorId: UUID
- documentType: "passport" | "national_id" | ...
- documentNumber: string (optional)
- expiryDate: date (optional)`}
                                            </pre>
                                        </div>

                                        <div className="bg-white p-4 rounded border-l-4 border-orange-500">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant="outline" className="bg-orange-100">PATCH</Badge>
                                                <code>/api/documents/:id/review</code>
                                            </div>
                                            <p className="text-gray-700 text-xs">Admin approves or rejects document</p>
                                            <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-x-auto">
                                                {`{
  "action": "approve" | "reject",
  "rejectionReason": "Passport image is unclear" (if reject),
  "adminId": "uuid"
}`}
                                            </pre>
                                        </div>

                                        <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant="outline" className="bg-blue-100">GET</Badge>
                                                <code>/api/compliance/clients/:clientId</code>
                                            </div>
                                            <p className="text-gray-700 text-xs">Client sees all their contractors' compliance status</p>
                                        </div>

                                        <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant="outline" className="bg-blue-100">GET</Badge>
                                                <code>/api/compliance/admin/pending</code>
                                            </div>
                                            <p className="text-gray-700 text-xs">Admin sees all documents pending review</p>
                                        </div>

                                        <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant="outline" className="bg-blue-100">GET</Badge>
                                                <code>/api/audit-logs</code>
                                            </div>
                                            <p className="text-gray-700 text-xs">Query audit logs with filters (admin only)</p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="storage" className="space-y-4 mt-6">
                                <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-300">
                                    <h3 className="font-bold mb-4 flex items-center gap-2">
                                        <Lock className="h-5 w-5 text-blue-600" />
                                        AWS S3 Document Storage
                                    </h3>
                                    <div className="space-y-4 text-sm">
                                        <div className="bg-white p-4 rounded">
                                            <h4 className="font-semibold mb-2">Bucket Structure</h4>
                                            <pre className="bg-gray-100 p-3 rounded font-mono text-xs overflow-x-auto">
                                                {`mind-links-documents/
├── contractors/
│   ├── {contractor-id}/
│   │   ├── passport/
│   │   │   └── {timestamp}-passport.pdf
│   │   ├── national-id/
│   │   │   └── {timestamp}-id.jpg
│   │   └── tax-certificate/
│   │       └── {timestamp}-tax.pdf
└── clients/
    └── {client-id}/
        └── business-registration.pdf`}
                                            </pre>
                                        </div>

                                        <div className="bg-white p-4 rounded">
                                            <h4 className="font-semibold mb-2">Upload Process</h4>
                                            <ol className="space-y-2 text-gray-700">
                                                <li><strong>1.</strong> Frontend: User selects file, uploads to backend API</li>
                                                <li><strong>2.</strong> Backend validates: file type (PDF/JPG/PNG), size (&lt;10MB), virus scan (optional)</li>
                                                <li><strong>3.</strong> Generate unique filename: <code>timestamp-sanitized-original-name</code></li>
                                                <li><strong>4.</strong> Upload to S3 with metadata tags: contractorId, documentType</li>
                                                <li><strong>5.</strong> S3 returns URL: <code>https://s3.../contractors/uuid/passport/file.pdf</code></li>
                                                <li><strong>6.</strong> Store URL in database <code>documents</code> table</li>
                                                <li><strong>7.</strong> Set S3 object to private (not publicly accessible)</li>
                                            </ol>
                                        </div>

                                        <div className="bg-white p-4 rounded">
                                            <h4 className="font-semibold mb-2">Secure Access (Pre-signed URLs)</h4>
                                            <p className="text-gray-700 mb-2">Documents are private. Access via temporary signed URLs:</p>
                                            <pre className="bg-gray-100 p-3 rounded font-mono text-xs overflow-x-auto">
                                                {`// Backend generates signed URL (expires in 1 hour)
const signedUrl = await s3.getSignedUrlPromise('getObject', {
  Bucket: 'mind-links-documents',
  Key: 'contractors/uuid/passport/file.pdf',
  Expires: 3600 // 1 hour
});

// Return to frontend for display/download`}
                                            </pre>
                                        </div>

                                        <div className="bg-white p-4 rounded">
                                            <h4 className="font-semibold mb-2">Security Features</h4>
                                            <ul className="space-y-1 text-gray-700">
                                                <li>• <strong>Encryption at rest:</strong> S3 SSE-S3 or SSE-KMS</li>
                                                <li>• <strong>Encryption in transit:</strong> HTTPS only</li>
                                                <li>• <strong>Access control:</strong> IAM roles for backend, no public access</li>
                                                <li>• <strong>Versioning:</strong> Enabled for audit trail</li>
                                                <li>• <strong>Lifecycle policy:</strong> Archive old documents to Glacier after 2 years</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="notifications" className="space-y-4 mt-6">
                                <div className="bg-green-50 p-6 rounded-lg border-2 border-green-300">
                                    <h3 className="font-bold mb-4 flex items-center gap-2">
                                        <Bell className="h-5 w-5 text-green-600" />
                                        Notification System (SendGrid + In-App)
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded border">
                                            <h4 className="font-semibold mb-3">Email Notifications (SendGrid)</h4>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Trigger Event</TableHead>
                                                        <TableHead>Recipient</TableHead>
                                                        <TableHead>Email Template</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>Contractor invited</TableCell>
                                                        <TableCell>Contractor</TableCell>
                                                        <TableCell>"Welcome to Mind-Links! Get Started"</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Document uploaded</TableCell>
                                                        <TableCell>Contractor</TableCell>
                                                        <TableCell>"Document received, under review"</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Document approved</TableCell>
                                                        <TableCell>Contractor</TableCell>
                                                        <TableCell>"[Document Type] approved!"</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Document rejected</TableCell>
                                                        <TableCell>Contractor</TableCell>
                                                        <TableCell>"Action needed: Re-upload [Document]"</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>All docs approved</TableCell>
                                                        <TableCell>Contractor + Client</TableCell>
                                                        <TableCell>"Ready to work!" / "[Name] is compliant"</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Document expiring soon</TableCell>
                                                        <TableCell>Contractor + Client</TableCell>
                                                        <TableCell>"Renew your [Document] by [Date]"</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Pending reviews &gt; 3 days</TableCell>
                                                        <TableCell>Admin</TableCell>
                                                        <TableCell>"Daily digest: X documents pending"</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>

                                        <div className="bg-white p-4 rounded border">
                                            <h4 className="font-semibold mb-3">In-App Notifications</h4>
                                            <p className="text-sm text-gray-700 mb-3">Stored in database, displayed in notification center (bell icon in navbar)</p>
                                            <pre className="bg-gray-100 p-3 rounded font-mono text-xs overflow-x-auto">
                                                {`Table: notifications
- id, user_id, type, title, message, read, created_at

Example:
{
  "type": "document_approved",
  "title": "Passport Approved",
  "message": "Your passport has been verified and approved.",
  "read": false
}`}
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="security" className="space-y-4 mt-6">
                                <div className="bg-red-50 p-6 rounded-lg border-2 border-red-300">
                                    <h3 className="font-bold mb-4 flex items-center gap-2">
                                        <Lock className="h-5 w-5 text-red-600" />
                                        Security & Access Control
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded">
                                            <h4 className="font-semibold mb-2">Role-Based Access Control (RBAC)</h4>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Role</TableHead>
                                                        <TableHead>Can Do</TableHead>
                                                        <TableHead>Cannot Do</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell className="font-semibold">Contractor</TableCell>
                                                        <TableCell>Upload own docs, view own status</TableCell>
                                                        <TableCell>View others' docs, approve anything</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="font-semibold">Client</TableCell>
                                                        <TableCell>View contractors' status, invite contractors</TableCell>
                                                        <TableCell>Download docs, approve docs, view audit logs</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="font-semibold">Admin</TableCell>
                                                        <TableCell>Everything: review, approve, reject, view all</TableCell>
                                                        <TableCell>-</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>

                                        <div className="bg-white p-4 rounded">
                                            <h4 className="font-semibold mb-2">API Authorization Middleware</h4>
                                            <pre className="bg-gray-100 p-3 rounded font-mono text-xs overflow-x-auto">
                                                {`// Example: Protect document download endpoint
@Get('/documents/:id/download')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('contractor', 'admin')
async downloadDocument(@Param('id') id: string, @User() user) {
  const document = await this.findDocument(id);
  
  // Contractor can only download their own docs
  if (user.role === 'contractor' && document.contractorId !== user.contractorId) {
    throw new ForbiddenException();
  }
  
  // Admin can download any doc
  return this.getSignedUrl(document.fileUrl);
}`}
                                            </pre>
                                        </div>

                                        <div className="bg-white p-4 rounded">
                                            <h4 className="font-semibold mb-2">Data Protection Measures</h4>
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                                                    <span><strong>Encryption:</strong> All documents encrypted at rest (S3 SSE) and in transit (TLS 1.3)</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                                                    <span><strong>Access logs:</strong> Every document access logged with user ID, IP, timestamp</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                                                    <span><strong>Rate limiting:</strong> Max 10 uploads per minute per user (prevent abuse)</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                                                    <span><strong>File validation:</strong> MIME type check, virus scan (ClamAV), file size limit</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                                                    <span><strong>Data retention:</strong> Documents kept for 7 years per legal requirements</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                                                    <span><strong>GDPR compliance:</strong> Users can request data export or deletion</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card> */}

                {/* Example Scenario */}
                <Card className="mb-8 border-2 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-3">
                            <FileText className="h-7 w-7 text-orange-600" />
                            Complete Example: Ahmed's Compliance Journey
                        </CardTitle>
                        <CardDescription>Real-world scenario from invitation to approval</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="bg-white p-6 rounded-lg border-2">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <User className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">Ahmed Hassan</h3>
                                        <p className="text-gray-600">React Developer from Syria</p>
                                    </div>
                                </div>

                                <div className="space-y-4 text-sm">
                                    <div className="border-l-4 border-blue-500 pl-4">
                                        <p className="font-semibold mb-1">Day 1, 10:00 AM: Invitation</p>
                                        <p className="text-gray-700">TechWave LLC invites Ahmed via Mind-Links. Ahmed receives email: "TechWave wants to hire you as a React Developer!"</p>
                                    </div>

                                    <div className="border-l-4 border-green-500 pl-4">
                                        <p className="font-semibold mb-1">Day 1, 10:15 AM: Registration</p>
                                        <p className="text-gray-700">Ahmed clicks link, registers: ahmed.hassan@email.com, sets password, selects Country: Syria, Role: Developer</p>
                                    </div>

                                    <div className="border-l-4 border-purple-500 pl-4">
                                        <p className="font-semibold mb-1">Day 1, 10:20 AM: Sees Checklist</p>
                                        <p className="text-gray-700">Dashboard shows: "Compliance Status: 0% Complete. Required: Passport, National ID, Tax Certificate"</p>
                                    </div>

                                    <div className="border-l-4 border-orange-500 pl-4">
                                        <p className="font-semibold mb-1">Day 1, 10:25 AM: Uploads Passport</p>
                                        <p className="text-gray-700">Ahmed uploads passport.pdf (2.1 MB), adds: Passport # N1234567, Expiry: 2028-05-15. Status → "Under Review"</p>
                                    </div>

                                    <div className="border-l-4 border-orange-500 pl-4">
                                        <p className="font-semibold mb-1">Day 1, 10:30 AM: Uploads National ID</p>
                                        <p className="text-gray-700">Uploads national-id.jpg (1.5 MB), ID # 01234567891. Status → "Under Review"</p>
                                    </div>

                                    <div className="border-l-4 border-orange-500 pl-4">
                                        <p className="font-semibold mb-1">Day 1, 10:35 AM: Uploads Tax Certificate</p>
                                        <p className="text-gray-700">Uploads tax-cert.pdf (800 KB). All documents submitted. Dashboard: "Compliance Status: Under Review"</p>
                                    </div>

                                    <div className="border-l-4 border-red-500 pl-4">
                                        <p className="font-semibold mb-1">Day 2, 2:00 PM: Admin Reviews</p>
                                        <p className="text-gray-700">Admin Sarah opens review queue, sees Ahmed's documents. Approves Passport ✓, Approves National ID ✓, But Rejects Tax Certificate: "Document is expired, please upload current certificate"</p>
                                    </div>

                                    <div className="border-l-4 border-yellow-500 pl-4">
                                        <p className="font-semibold mb-1">Day 2, 2:05 PM: Rejection Email</p>
                                        <p className="text-gray-700">Ahmed receives email: "Action Needed: Your Tax Certificate was rejected. Reason: Document is expired. Please upload a current certificate."</p>
                                    </div>

                                    <div className="border-l-4 border-orange-500 pl-4">
                                        <p className="font-semibold mb-1">Day 2, 4:00 PM: Re-uploads</p>
                                        <p className="text-gray-700">Ahmed uploads new tax-cert-2024.pdf. Status → "Under Review" again.</p>
                                    </div>

                                    <div className="border-l-4 border-green-500 pl-4">
                                        <p className="font-semibold mb-1">Day 3, 10:00 AM: Final Approval</p>
                                        <p className="text-gray-700">Admin Sarah reviews new tax certificate. Approves ✓. All documents now approved!</p>
                                    </div>

                                    <div className="border-l-4 border-blue-500 pl-4">
                                        <p className="font-semibold mb-1">Day 3, 10:05 AM: Success!</p>
                                        <p className="text-gray-700">
                                            Ahmed receives: "Congratulations! You're fully compliant and ready to work."<br />
                                            TechWave receives: "Ahmed Hassan is now compliant and ready to start."<br />
                                            Dashboard shows: Green checkmarks, "Compliance Status: 100% Approved ✓"
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-purple-500 pl-4">
                                        <p className="font-semibold mb-1">Day 3, 11:00 AM: Contract Created</p>
                                        <p className="text-gray-700">TechWave creates contract with Ahmed for $5,000/month. Work begins!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Back Navigation */}
                <div className="flex justify-center">
                    <Link to="/product-brief">
                        <Button size="lg" className="gap-2">
                            <ArrowLeft className="h-5 w-5" />
                            Back to Product Brief
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ComplianceFlow;

