import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, DollarSign, Calendar, Clock, FileText, CreditCard, TrendingUp, User, Building2, UserCog, ArrowLeft, ArrowRight, Database, Server, Eye, CheckCheck, AlertCircle, Wallet, Download, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

const PayrollFlow = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-12">
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
              <DollarSign className="h-12 w-12" />
            </div>
            <div>
              <h1 className="text-5xl font-bold">Payroll Management</h1>
              <p className="text-xl opacity-90 mt-2">Complete Flow, Dashboards & Implementation Details</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Overview */}
        <Card className="mb-8 border-2 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="text-3xl flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-green-600" />
              What is Payroll Management?
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <p className="text-lg text-gray-700">
                Payroll Management in Mind-Links is a <strong>comprehensive system</strong> that automates contractor payment calculations, approval workflows, payment processing, and balance tracking—ensuring accurate, transparent, and timely payments.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                  <h3 className="font-bold text-lg mb-2 text-green-900">Why It Matters</h3>
                  <p className="text-sm text-gray-700">
                    Contractors need to be paid accurately, on time, and transparently. Poor payroll execution kills trust and retention.
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                  <h3 className="font-bold text-lg mb-2 text-blue-900">What We Handle</h3>
                  <p className="text-sm text-gray-700">
                    Monthly cycles, contract-based calculations (fixed/hourly), approvals, payment processing, payslips, and balance tracking.
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
                  <h3 className="font-bold text-lg mb-2 text-purple-900">Who Benefits</h3>
                  <p className="text-sm text-gray-700">
                    Clients get control and visibility, contractors get transparency and proof of income, admins get audit trails.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payroll Cycle Overview */}
        <Card className="mb-8 border-2 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-2xl">The Monthly Payroll Cycle</CardTitle>
            <CardDescription>End-to-end flow from contract work to contractor balance</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-lg border-2 border-blue-300">
                <h3 className="font-bold text-lg mb-4">Payroll Cycle Stages</h3>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  {[
                    { label: "1. Work Done", icon: CheckCircle2, color: "blue" },
                    { label: "2. Approve Work", icon: CheckCheck, color: "green" },
                    { label: "3. Create Payroll", icon: Calendar, color: "purple" },
                    { label: "4. Review & Approve", icon: Eye, color: "orange" },
                    { label: "5. Process Payment", icon: CreditCard, color: "pink" },
                    { label: "6. Generate Payslips", icon: FileText, color: "teal" },
                    { label: "7. Update Balances", icon: Wallet, color: "indigo" }
                  ].map((stage, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 text-center">
                      <div className={`bg-${stage.color}-600 p-4 rounded-full`}>
                        <stage.icon className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-sm font-semibold max-w-[100px]">{stage.label}</p>
                      {idx < 6 && <ArrowRight className="h-4 w-4 text-gray-400 mt-2" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg border-2">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Fixed Contract Payroll
                  </h4>
                  <ol className="space-y-2 text-sm text-gray-700">
                    <li><strong>1.</strong> Client creates contract with milestones</li>
                    <li><strong>2.</strong> Contractor completes milestone</li>
                    <li><strong>3.</strong> Client approves milestone</li>
                    <li><strong>4.</strong> End of month: System aggregates approved milestones</li>
                    <li><strong>5.</strong> Client reviews payroll run</li>
                    <li><strong>6.</strong> Client approves, payment processed</li>
                  </ol>
                </div>

                <div className="bg-white p-6 rounded-lg border-2">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    Hourly Contract Payroll
                  </h4>
                  <ol className="space-y-2 text-sm text-gray-700">
                    <li><strong>1.</strong> Client creates hourly contract (rate/hr)</li>
                    <li><strong>2.</strong> Contractor logs hours weekly</li>
                    <li><strong>3.</strong> Client approves timesheets</li>
                    <li><strong>4.</strong> End of month: System calculates hours × rate</li>
                    <li><strong>5.</strong> Client reviews payroll run</li>
                    <li><strong>6.</strong> Client approves, payment processed</li>
                  </ol>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Flows */}
        <Card className="mb-8 border-2 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="text-2xl">Complete Payroll Flows by User Role</CardTitle>
            <CardDescription>Step-by-step journeys for each user type</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="client" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="client">
                  <Building2 className="h-4 w-4 mr-2" />
                  Client Flow
                </TabsTrigger>
                <TabsTrigger value="contractor">
                  <User className="h-4 w-4 mr-2" />
                  Contractor Flow
                </TabsTrigger>
                <TabsTrigger value="admin">
                  <UserCog className="h-4 w-4 mr-2" />
                  Admin Flow
                </TabsTrigger>
              </TabsList>

              {/* Client Flow */}
              <TabsContent value="client" className="space-y-6">
                <Alert className="bg-green-50 border-green-300">
                  <Building2 className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Client's Goal:</strong> Run monthly payroll, review contractor payments, approve and process them accurately and on time.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: "Create Contract First",
                      description: "Before payroll, client must create a contract",
                      details: [
                        "Navigate to 'Contracts' → Click 'Create Contract'",
                        "Select contractor from list (must be KYC-approved)",
                        "Choose type: Fixed or Hourly",
                        "Fixed: Set total amount, create milestones (description, amount, due date)",
                        "Hourly: Set hourly rate (e.g., $50/hr), payment frequency (monthly)",
                        "Set start and end dates, currency (USD, EUR, etc.)",
                        "Sign contract (e-signature or simple approval for POC)",
                        "Contractor receives contract for review and acceptance"
                      ],
                      icon: FileText
                    },
                    {
                      step: 2,
                      title: "Approve Milestones/Timesheets",
                      description: "Throughout the month, approve completed work",
                      details: [
                        "Fixed: Contractor marks milestone as 'Complete'",
                        "Client receives notification: 'Milestone ready for review'",
                        "Client reviews deliverables → Approves or Requests Changes",
                        "Hourly: Contractor submits weekly timesheet (Mon-Sun, hours per day)",
                        "Client reviews hours → Approves or Edits hours",
                        "Only approved work is included in payroll"
                      ],
                      icon: CheckCheck
                    },
                    {
                      step: 3,
                      title: "Navigate to Payroll Section",
                      description: "At end of month, client initiates payroll",
                      details: [
                        "Dashboard shows: 'Payroll' tab in navigation",
                        "Main payroll page shows:",
                        "• Upcoming Payroll: 'November 2024 (Due: Nov 30)'",
                        "• Recent Payrolls: October (Processed), September (Processed)",
                        "• Quick stats: 5 contractors, $12,500 pending"
                      ],
                      icon: Eye
                    },
                    {
                      step: 4,
                      title: "Create Payroll Run",
                      description: "Initialize payroll for current period",
                      details: [
                        "Click 'Create Payroll Run' button",
                        "Modal opens: 'Create Payroll for November 2024?'",
                        "Select period: November 1-30, 2024 (pre-filled)",
                        "Click 'Generate' → System processes:",
                        "• Queries all active contracts",
                        "• For fixed: Sums approved milestones with due dates in November",
                        "• For hourly: Sums approved hours × rate for November",
                        "• Creates payroll_run record with status 'draft'",
                        "• Creates payroll_line_items for each contractor",
                        "Takes 5-10 seconds, then shows payroll summary"
                      ],
                      icon: Calendar
                    },
                    {
                      step: 5,
                      title: "Review Payroll Summary",
                      description: "Client sees full breakdown before approval",
                      details: [
                        "Payroll Run page shows:",
                        "• Header: 'November 2024 Payroll - Draft'",
                        "• Total: $12,500 across 5 contractors",
                        "• Table: Contractor Name, Contract Type, Amount, Currency, Details",
                        "Example rows:",
                        "  - Ahmed Hassan | Fixed | $3,000 | USD | Milestone 1, Milestone 2",
                        "  - Sara Ibrahim | Hourly | $2,000 | USD | 40 hours × $50/hr",
                        "• Click 'View Details' on row → see itemized breakdown",
                        "• Filters: By contractor, by contract, by currency"
                      ],
                      icon: BarChart3
                    },
                    {
                      step: 6,
                      title: "Make Adjustments (Optional)",
                      description: "Add bonuses, deductions, or corrections",
                      details: [
                        "Click 'Add Adjustment' button on contractor row",
                        "Modal: 'Add Adjustment for Ahmed Hassan'",
                        "Type: Bonus / Deduction / Correction",
                        "Amount: $500 (example: performance bonus)",
                        "Reason: 'Excellent work on Project X' (optional note)",
                        "Click 'Add' → New line item appears in payroll",
                        "Total updates: Ahmed's total now $3,500",
                        "Can also edit individual line items if needed"
                      ],
                      icon: DollarSign
                    },
                    {
                      step: 7,
                      title: "Approve Payroll Run",
                      description: "Final approval before processing",
                      details: [
                        "Review all line items one more time",
                        "Check total: $12,500 is correct",
                        "Click 'Approve Payroll' button",
                        "Confirmation modal: 'Approve and process payments for $12,500?'",
                        "Security: Enter password or 2FA code",
                        "Click 'Confirm Approval'",
                        "Status changes: Draft → Approved",
                        "System logs approval (timestamp, user ID)"
                      ],
                      icon: CheckCircle2
                    },
                    {
                      step: 8,
                      title: "Process Payments (Mock for POC)",
                      description: "System simulates payment processing",
                      details: [
                        "After approval, 'Process Payments' button appears",
                        "Click 'Process Payments'",
                        "System flow:",
                        "• For each line item, create Stripe Payment Intent (sandbox)",
                        "• Stripe returns success (mocked)",
                        "• Credit contractor's internal ledger balance",
                        "• Create ledger_entry: type='credit', amount, balance_after",
                        "• Generate payslip PDF for contractor",
                        "• Send email to contractor: 'You've been paid!'",
                        "• Update payroll_run status: Approved → Processed",
                        "Takes ~30 seconds for POC",
                        "Client sees: 'Payroll processed successfully! 5 payments completed.'"
                      ],
                      icon: CreditCard
                    },
                    {
                      step: 9,
                      title: "View Payroll Confirmation",
                      description: "See final confirmation and receipts",
                      details: [
                        "Payroll Run page updates:",
                        "• Status badge: 'Processed' (green)",
                        "• All line items show: 'Paid' checkmark",
                        "• Payment date shown: Nov 30, 2024, 3:45 PM",
                        "• Download buttons: 'Export CSV', 'Download Report PDF'",
                        "Client dashboard updates:",
                        "• 'Recent Payrolls' shows November as completed",
                        "• Analytics update: Total paid this year, avg per contractor"
                      ],
                      icon: FileText
                    },
                    {
                      step: 10,
                      title: "Ongoing: Monitor & Report",
                      description: "Track payroll history and analytics",
                      details: [
                        "Payroll History page:",
                        "• Table of all payroll runs (filterable by date, status)",
                        "• Click any run → see full details",
                        "Analytics Dashboard:",
                        "• Total paid this month, this quarter, this year",
                        "• Breakdown by contractor (who received most/least)",
                        "• Breakdown by contract type (fixed vs hourly spend)",
                        "• Chart: Payroll costs over time (line graph)",
                        "• Export: CSV for accounting (QuickBooks, Xero)"
                      ],
                      icon: TrendingUp
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

              {/* Contractor Flow */}
              <TabsContent value="contractor" className="space-y-6">
                <Alert className="bg-blue-50 border-blue-300">
                  <User className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Contractor's Goal:</strong> Track work, submit for approval, view balance, receive payslips, and optionally request withdrawals.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: "Review & Accept Contract",
                      description: "Contractor receives contract from client",
                      details: [
                        "Email: 'TechWave LLC sent you a contract!'",
                        "Click link → Contract review page",
                        "See: Contract type, amount/rate, terms, start/end dates",
                        "Download contract PDF to review",
                        "Click 'Accept Contract' button",
                        "E-signature (or simple approval for POC)",
                        "Status: Contract active, contractor can start working"
                      ],
                      icon: FileText
                    },
                    {
                      step: 2,
                      title: "Work on Project (Fixed Contract)",
                      description: "Complete milestones and submit for approval",
                      details: [
                        "Dashboard shows: 'Active Contracts' section",
                        "Click contract → see milestones list",
                        "Example milestones:",
                        "  - Milestone 1: Design mockups ($1,000) - Due: Nov 10",
                        "  - Milestone 2: Frontend development ($2,000) - Due: Nov 20",
                        "When milestone complete:",
                        "• Click 'Mark Complete' button",
                        "• Modal: 'Describe completion and attach deliverables'",
                        "• Upload files (optional): design-files.zip",
                        "• Add notes: 'All mockups delivered as per requirements'",
                        "• Click 'Submit for Approval'",
                        "• Status: Pending Approval",
                        "• Email sent to client for review"
                      ],
                      icon: CheckCircle2
                    },
                    {
                      step: 3,
                      title: "Log Hours (Hourly Contract)",
                      description: "Submit weekly timesheets for hourly work",
                      details: [
                        "Dashboard: 'Submit Timesheet' button",
                        "Click → Timesheet form for current week (Mon-Sun)",
                        "Grid: Days of week × Hours worked",
                        "Example: Mon: 8h, Tue: 8h, Wed: 8h, Thu: 8h, Fri: 8h = 40h total",
                        "Optional: Add notes per day (what you worked on)",
                        "Click 'Submit Timesheet'",
                        "Status: Pending Approval",
                        "Email sent to client",
                        "Can submit weekly or bi-weekly (configurable)"
                      ],
                      icon: Clock
                    },
                    {
                      step: 4,
                      title: "Wait for Client Approval",
                      description: "Client reviews and approves work",
                      details: [
                        "Dashboard shows: 'Pending Approvals' section",
                        "Milestone: 'Milestone 1 - Pending Approval'",
                        "Or: 'Timesheet Nov 1-7 - Pending Approval'",
                        "When approved:",
                        "• Status changes to 'Approved' with green checkmark",
                        "• Email: 'Your [milestone/timesheet] was approved!'",
                        "• Work is now eligible for next payroll run"
                      ],
                      icon: Eye
                    },
                    {
                      step: 5,
                      title: "View Wallet Dashboard",
                      description: "Track earnings and balance",
                      details: [
                        "Navigate to 'Wallet' section",
                        "Top card: Current Balance (large display)",
                        "Example: '$5,000 USD'",
                        "Below: 'Recent Transactions' (last 5)",
                        "Transaction types:",
                        "  - Credit: '+$3,000 - Nov Payroll (Milestone 1, 2)'",
                        "  - Credit: '+$2,000 - Oct Timesheet'",
                        "Each shows: Date, amount, description, balance after",
                        "Button: 'View All Transactions' → full history"
                      ],
                      icon: Wallet
                    },
                    {
                      step: 6,
                      title: "Receive Payroll Notification",
                      description: "Get notified when client processes payroll",
                      details: [
                        "End of month: Client processes payroll",
                        "Contractor receives email: 'You've been paid! $3,000'",
                        "In-app notification: Bell icon shows '1 new'",
                        "Click notification → redirects to Wallet",
                        "Balance updated: Old: $2,000 → New: $5,000",
                        "New transaction appears at top of list"
                      ],
                      icon: CreditCard
                    },
                    {
                      step: 7,
                      title: "View & Download Payslip",
                      description: "Access professional payslip PDF",
                      details: [
                        "Navigate to 'Payslips' tab in Wallet section",
                        "Table: Month, Amount, Status, Download",
                        "Example rows:",
                        "  - November 2024 | $3,000 | Paid | [Download PDF]",
                        "  - October 2024 | $2,000 | Paid | [Download PDF]",
                        "Click 'Download PDF' → opens payslip",
                        "Payslip contains:",
                        "  - Contractor name, company name",
                        "  - Pay period: Nov 1-30, 2024",
                        "  - Gross amount: $3,000",
                        "  - Currency: USD",
                        "  - Payment date: Nov 30, 2024",
                        "  - Breakdown: Milestone 1 ($1,000), Milestone 2 ($2,000)",
                        "  - Company logo, digital signature (POC: text signature)"
                      ],
                      icon: FileText
                    },
                    {
                      step: 8,
                      title: "Request Withdrawal (Mocked for POC)",
                      description: "Simulate requesting payout to bank",
                      details: [
                        "In Wallet section: 'Withdraw Funds' button",
                        "Click → Withdrawal modal",
                        "Current balance: $5,000",
                        "Enter amount: $3,000 (or click 'Withdraw All')",
                        "Select bank account: From saved accounts or add new",
                        "Review: '$3,000 will be sent to [Bank Name] ...4567'",
                        "Click 'Request Withdrawal'",
                        "POC: System creates payout_request record",
                        "Status: 'Processing (Mock)' → immediately → 'Completed (Mock)'",
                        "Ledger debit: -$3,000, balance updates: $5,000 → $2,000",
                        "Email: 'Withdrawal processed! $3,000 sent to your account'",
                        "Note: In production, this would trigger real bank transfer via Wise/Payoneer"
                      ],
                      icon: Download
                    },
                    {
                      step: 9,
                      title: "View Transaction History",
                      description: "Full history of all financial activity",
                      details: [
                        "'View All Transactions' page",
                        "Table: Date, Type, Description, Amount, Balance",
                        "Filter by: Date range, Type (credit/debit)",
                        "Export: 'Download CSV' for personal records",
                        "Example rows:",
                        "  - Nov 30 | Credit | Nov Payroll | +$3,000 | $5,000",
                        "  - Dec 5 | Debit | Withdrawal | -$3,000 | $2,000",
                        "  - Oct 31 | Credit | Oct Payroll | +$2,000 | $2,000",
                        "All amounts show currency: USD, EUR, etc."
                      ],
                      icon: BarChart3
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
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <ul className="space-y-1 text-sm text-gray-700">
                              {step.details.map((detail, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-blue-600 mt-1">•</span>
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
                    <strong>Admin's Goal:</strong> Monitor all payroll activity across all clients, ensure data integrity, investigate issues, and maintain audit logs.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: "Access Admin Payroll Dashboard",
                      description: "Global overview of all payroll activity",
                      details: [
                        "Admin logs in → Dashboard",
                        "Top stats:",
                        "  - Total Paid This Month: $45,000 across 15 contractors",
                        "  - Active Payroll Runs: 3 (TechWave, DesignCo, StartupX)",
                        "  - Processed This Week: $12,500",
                        "  - Pending Approval: $8,000",
                        "Quick links: All Payrolls, Pending Runs, Transaction Logs"
                      ],
                      icon: BarChart3
                    },
                    {
                      step: 2,
                      title: "View All Payroll Runs",
                      description: "List of all payroll runs across clients",
                      details: [
                        "Table: Client, Period, Contractors, Total, Status, Date",
                        "Example rows:",
                        "  - TechWave LLC | Nov 2024 | 5 | $12,500 | Processed | Nov 30",
                        "  - DesignCo | Nov 2024 | 3 | $8,000 | Approved | Nov 29",
                        "  - StartupX | Nov 2024 | 2 | $5,000 | Draft | Nov 28",
                        "Filters: By client, by status, by date range",
                        "Click row → see detailed line items for that payroll"
                      ],
                      icon: Eye
                    },
                    {
                      step: 3,
                      title: "Inspect Payroll Details",
                      description: "Drill down into individual payroll run",
                      details: [
                        "Click 'TechWave Nov 2024' → Detail page",
                        "Header: Client name, period, total, status",
                        "Line items table: Contractor, Contract, Amount, Status",
                        "Can see: Original amount, adjustments, final amount",
                        "Payment details: Stripe Payment Intent IDs (for mock)",
                        "Audit section: Who created, who approved, when processed"
                      ],
                      icon: FileText
                    },
                    {
                      step: 4,
                      title: "Monitor Ledger Balances",
                      description: "Track contractor wallet balances",
                      details: [
                        "'Contractor Balances' page",
                        "Table: Contractor, Current Balance, Total Earned, Total Withdrawn",
                        "Example:",
                        "  - Ahmed Hassan | $5,000 | $20,000 | $15,000",
                        "  - Sara Ibrahim | $2,000 | $10,000 | $8,000",
                        "Click contractor → see full ledger history",
                        "Flags: Show contractors with high balances (>$10k) in red"
                      ],
                      icon: Wallet
                    },
                    {
                      step: 5,
                      title: "View Transaction Logs",
                      description: "Audit all financial movements",
                      details: [
                        "'Transaction Logs' page (read-only)",
                        "Table: Timestamp, Type, Contractor, Amount, Balance After, Related Entity",
                        "Types: Credit (payroll), Debit (withdrawal)",
                        "Example:",
                        "  - Nov 30, 3:45 PM | Credit | Ahmed Hassan | +$3,000 | $5,000 | Payroll Run #123",
                        "Filters: By contractor, by type, by date, by client",
                        "Export: CSV for accounting review",
                        "Logs are immutable (cannot edit/delete)"
                      ],
                      icon: Database
                    },
                    {
                      step: 6,
                      title: "Investigate Issues",
                      description: "Handle discrepancies or support requests",
                      details: [
                        "Contractor reports: 'I didn't receive payment'",
                        "Admin searches: Contractor name → finds payroll run",
                        "Checks:",
                        "  - Was milestone/timesheet approved? Yes",
                        "  - Was payroll run processed? Yes",
                        "  - Was ledger credited? Yes → Balance shows +$3,000",
                        "  - Was payslip generated? Yes → PDF available",
                        "Conclusion: Payment processed correctly, check inbox/spam",
                        "If issue found: Admin can manually adjust ledger (with audit log)",
                        "Admin note: 'Resolved: Confirmed payment processed correctly'"
                      ],
                      icon: AlertCircle
                    },
                    {
                      step: 7,
                      title: "Generate System Reports",
                      description: "Export data for analysis and compliance",
                      details: [
                        "'Reports' section",
                        "Available reports:",
                        "  - Monthly Payroll Summary (all clients)",
                        "  - Contractor Earnings Report (per contractor)",
                        "  - Client Spending Report (per client)",
                        "  - Ledger Balance Report (current balances)",
                        "  - Tax Documentation Report (for future tax features)",
                        "Select report type, date range, filters",
                        "Click 'Generate' → PDF or CSV",
                        "Can schedule: Send monthly report to email automatically"
                      ],
                      icon: FileText
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
              Database Schema for Payroll
            </CardTitle>
            <CardDescription>PostgreSQL tables and relationships</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="bg-white border-2 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">
                  Table: <code className="bg-gray-100 px-2 py-1 rounded">contracts</code>
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
                      <TableCell className="font-mono text-sm">client_id</TableCell>
                      <TableCell>UUID</TableCell>
                      <TableCell>Foreign key to clients</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">contractor_id</TableCell>
                      <TableCell>UUID</TableCell>
                      <TableCell>Foreign key to contractors</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">type</TableCell>
                      <TableCell>ENUM</TableCell>
                      <TableCell>'fixed', 'hourly'</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">currency</TableCell>
                      <TableCell>VARCHAR(3)</TableCell>
                      <TableCell>'USD', 'EUR', 'EGP', etc.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">rate</TableCell>
                      <TableCell>DECIMAL(10,2)</TableCell>
                      <TableCell>Hourly rate (if hourly contract)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">total_amount</TableCell>
                      <TableCell>DECIMAL(10,2)</TableCell>
                      <TableCell>Total contract value (if fixed)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">start_date</TableCell>
                      <TableCell>DATE</TableCell>
                      <TableCell>Contract start</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">end_date</TableCell>
                      <TableCell>DATE</TableCell>
                      <TableCell>Contract end (nullable)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">status</TableCell>
                      <TableCell>ENUM</TableCell>
                      <TableCell>'draft', 'active', 'paused', 'completed', 'terminated'</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="bg-white border-2 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">
                  Table: <code className="bg-gray-100 px-2 py-1 rounded">milestones</code> (for fixed contracts)
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
                      <TableCell className="font-mono text-sm">contract_id</TableCell>
                      <TableCell>UUID</TableCell>
                      <TableCell>Foreign key to contracts</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">description</TableCell>
                      <TableCell>TEXT</TableCell>
                      <TableCell>What needs to be delivered</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">amount</TableCell>
                      <TableCell>DECIMAL(10,2)</TableCell>
                      <TableCell>Payment amount for this milestone</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">due_date</TableCell>
                      <TableCell>DATE</TableCell>
                      <TableCell>Expected completion date</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">status</TableCell>
                      <TableCell>ENUM</TableCell>
                      <TableCell>'pending', 'in_progress', 'submitted', 'approved', 'paid'</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">submitted_at</TableCell>
                      <TableCell>TIMESTAMP</TableCell>
                      <TableCell>When contractor marked complete</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">approved_at</TableCell>
                      <TableCell>TIMESTAMP</TableCell>
                      <TableCell>When client approved</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="bg-white border-2 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">
                  Table: <code className="bg-gray-100 px-2 py-1 rounded">timesheets</code> (for hourly contracts)
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
                      <TableCell className="font-mono text-sm">contract_id</TableCell>
                      <TableCell>UUID</TableCell>
                      <TableCell>Foreign key to contracts</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">period_start</TableCell>
                      <TableCell>DATE</TableCell>
                      <TableCell>Week start (Monday)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">period_end</TableCell>
                      <TableCell>DATE</TableCell>
                      <TableCell>Week end (Sunday)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">hours</TableCell>
                      <TableCell>DECIMAL(5,2)</TableCell>
                      <TableCell>Total hours worked (e.g., 40.00)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">hours_breakdown</TableCell>
                      <TableCell>JSONB</TableCell>
                      <TableCell>Hours per day: {"{'mon': 8, 'tue': 8, ...}"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">status</TableCell>
                      <TableCell>ENUM</TableCell>
                      <TableCell>'draft', 'submitted', 'approved', 'paid'</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">submitted_at</TableCell>
                      <TableCell>TIMESTAMP</TableCell>
                      <TableCell>When contractor submitted</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">approved_at</TableCell>
                      <TableCell>TIMESTAMP</TableCell>
                      <TableCell>When client approved</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="bg-white border-2 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">
                  Table: <code className="bg-gray-100 px-2 py-1 rounded">payroll_runs</code>
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
                      <TableCell className="font-mono text-sm">client_id</TableCell>
                      <TableCell>UUID</TableCell>
                      <TableCell>Foreign key to clients</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">period_start</TableCell>
                      <TableCell>DATE</TableCell>
                      <TableCell>Payroll period start (e.g., Nov 1)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">period_end</TableCell>
                      <TableCell>DATE</TableCell>
                      <TableCell>Payroll period end (e.g., Nov 30)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">status</TableCell>
                      <TableCell>ENUM</TableCell>
                      <TableCell>'draft', 'review', 'approved', 'processed'</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">total_amount</TableCell>
                      <TableCell>DECIMAL(12,2)</TableCell>
                      <TableCell>Sum of all line items</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">created_by</TableCell>
                      <TableCell>UUID</TableCell>
                      <TableCell>User who created the run</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">approved_by</TableCell>
                      <TableCell>UUID</TableCell>
                      <TableCell>User who approved (nullable)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">processed_at</TableCell>
                      <TableCell>TIMESTAMP</TableCell>
                      <TableCell>When payments were processed</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="bg-white border-2 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">
                  Table: <code className="bg-gray-100 px-2 py-1 rounded">payroll_line_items</code>
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
                      <TableCell className="font-mono text-sm">payroll_run_id</TableCell>
                      <TableCell>UUID</TableCell>
                      <TableCell>Foreign key to payroll_runs</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">contractor_id</TableCell>
                      <TableCell>UUID</TableCell>
                      <TableCell>Foreign key to contractors</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">contract_id</TableCell>
                      <TableCell>UUID</TableCell>
                      <TableCell>Foreign key to contracts</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">type</TableCell>
                      <TableCell>VARCHAR(50)</TableCell>
                      <TableCell>'milestone', 'hours', 'bonus', 'deduction', 'adjustment'</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">amount</TableCell>
                      <TableCell>DECIMAL(10,2)</TableCell>
                      <TableCell>Payment amount</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">currency</TableCell>
                      <TableCell>VARCHAR(3)</TableCell>
                      <TableCell>'USD', 'EUR', etc.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">description</TableCell>
                      <TableCell>TEXT</TableCell>
                      <TableCell>What this line item is for</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">related_entity_type</TableCell>
                      <TableCell>VARCHAR(50)</TableCell>
                      <TableCell>'milestone', 'timesheet', 'manual'</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">related_entity_id</TableCell>
                      <TableCell>UUID</TableCell>
                      <TableCell>ID of milestone/timesheet (nullable)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="bg-white border-2 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">
                  Table: <code className="bg-gray-100 px-2 py-1 rounded">ledger_entries</code>
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
                      <TableCell className="font-mono text-sm">type</TableCell>
                      <TableCell>ENUM</TableCell>
                      <TableCell>'credit', 'debit'</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">amount</TableCell>
                      <TableCell>DECIMAL(10,2)</TableCell>
                      <TableCell>Transaction amount (always positive)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">currency</TableCell>
                      <TableCell>VARCHAR(3)</TableCell>
                      <TableCell>'USD', 'EUR', etc.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">balance_after</TableCell>
                      <TableCell>DECIMAL(10,2)</TableCell>
                      <TableCell>Contractor balance after this entry</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">description</TableCell>
                      <TableCell>TEXT</TableCell>
                      <TableCell>Transaction description</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">related_entity_type</TableCell>
                      <TableCell>VARCHAR(50)</TableCell>
                      <TableCell>'payroll_run', 'payout_request', 'adjustment'</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">related_entity_id</TableCell>
                      <TableCell>UUID</TableCell>
                      <TableCell>ID of related entity</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">created_at</TableCell>
                      <TableCell>TIMESTAMP</TableCell>
                      <TableCell>Transaction timestamp (immutable)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="bg-white border-2 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">
                  Table: <code className="bg-gray-100 px-2 py-1 rounded">payslips</code>
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
                      <TableCell className="font-mono text-sm">payroll_run_id</TableCell>
                      <TableCell>UUID</TableCell>
                      <TableCell>Foreign key to payroll_runs</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">contractor_id</TableCell>
                      <TableCell>UUID</TableCell>
                      <TableCell>Foreign key to contractors</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">period_start</TableCell>
                      <TableCell>DATE</TableCell>
                      <TableCell>Pay period start</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">period_end</TableCell>
                      <TableCell>DATE</TableCell>
                      <TableCell>Pay period end</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">gross_amount</TableCell>
                      <TableCell>DECIMAL(10,2)</TableCell>
                      <TableCell>Total payment (POC: no deductions)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">currency</TableCell>
                      <TableCell>VARCHAR(3)</TableCell>
                      <TableCell>'USD', 'EUR', etc.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">pdf_url</TableCell>
                      <TableCell>TEXT</TableCell>
                      <TableCell>S3 URL to payslip PDF</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">generated_at</TableCell>
                      <TableCell>TIMESTAMP</TableCell>
                      <TableCell>When PDF was generated</TableCell>
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
            <CardDescription>Backend APIs, calculations, and infrastructure</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="apis" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="apis">Backend APIs</TabsTrigger>
                <TabsTrigger value="calculations">Calculations Logic</TabsTrigger>
                <TabsTrigger value="payment">Payment Processing</TabsTrigger>
              </TabsList>

              <TabsContent value="apis" className="space-y-4 mt-6">
                <div className="bg-gray-50 p-6 rounded-lg border">
                  <h3 className="font-bold mb-4">Payroll Service API Endpoints (NestJS)</h3>
                  <div className="space-y-4 font-mono text-sm">
                    <div className="bg-white p-4 rounded border-l-4 border-green-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-green-100">POST</Badge>
                        <code>/api/contracts</code>
                      </div>
                      <p className="text-gray-700 text-xs mb-2">Create contract (fixed or hourly)</p>
                      <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
{`{
  "clientId": "uuid",
  "contractorId": "uuid",
  "type": "fixed" | "hourly",
  "currency": "USD",
  "rate": 50.00 (if hourly),
  "totalAmount": 5000.00 (if fixed),
  "startDate": "2024-11-01",
  "milestones": [ ... ] (if fixed)
}`}
                      </pre>
                    </div>

                    <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-blue-100">POST</Badge>
                        <code>/api/payroll/create-run</code>
                      </div>
                      <p className="text-gray-700 text-xs mb-2">Create payroll run for a client/period</p>
                      <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
{`{
  "clientId": "uuid",
  "periodStart": "2024-11-01",
  "periodEnd": "2024-11-30"
}

// System generates line items automatically`}
                      </pre>
                    </div>

                    <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-purple-100">PATCH</Badge>
                        <code>/api/payroll/:id/approve</code>
                      </div>
                      <p className="text-gray-700 text-xs mb-2">Client approves payroll run</p>
                      <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
{`{
  "approvedBy": "uuid",
  "password": "..." (2FA)
}`}
                      </pre>
                    </div>

                    <div className="bg-white p-4 rounded border-l-4 border-orange-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-orange-100">POST</Badge>
                        <code>/api/payroll/:id/process</code>
                      </div>
                      <p className="text-gray-700 text-xs mb-2">Process payments (mock for POC)</p>
                      <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
{`// Triggers:
// 1. Create Stripe Payment Intents (sandbox)
// 2. Credit contractor ledgers
// 3. Generate payslips
// 4. Send notifications`}
                      </pre>
                    </div>

                    <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-blue-100">GET</Badge>
                        <code>/api/contractors/:id/balance</code>
                      </div>
                      <p className="text-gray-700 text-xs mb-2">Get contractor's current balance and recent transactions</p>
                    </div>

                    <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-blue-100">GET</Badge>
                        <code>/api/payslips/:id/download</code>
                      </div>
                      <p className="text-gray-700 text-xs mb-2">Download payslip PDF (pre-signed S3 URL)</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="calculations" className="space-y-4 mt-6">
                <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-300">
                  <h3 className="font-bold mb-4">Payroll Calculation Logic</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded">
                      <h4 className="font-semibold mb-2">Fixed Contract Calculation</h4>
                      <pre className="bg-gray-100 p-3 rounded font-mono text-xs overflow-x-auto">
{`// SQL query for approved milestones in period
SELECT SUM(amount) as total
FROM milestones
WHERE contract_id = :contractId
  AND status = 'approved'
  AND due_date >= :periodStart
  AND due_date <= :periodEnd;

// Example:
// Milestone 1: $1,000 (due Nov 10, approved Nov 12)
// Milestone 2: $2,000 (due Nov 20, approved Nov 22)
// Total: $3,000`}
                      </pre>
                    </div>

                    <div className="bg-white p-4 rounded">
                      <h4 className="font-semibold mb-2">Hourly Contract Calculation</h4>
                      <pre className="bg-gray-100 p-3 rounded font-mono text-xs overflow-x-auto">
{`// SQL query for approved hours in period
SELECT 
  c.rate,
  SUM(t.hours) as total_hours,
  (c.rate * SUM(t.hours)) as total_amount
FROM timesheets t
JOIN contracts c ON t.contract_id = c.id
WHERE t.contract_id = :contractId
  AND t.status = 'approved'
  AND t.period_start >= :periodStart
  AND t.period_end <= :periodEnd
GROUP BY c.rate;

// Example:
// Week 1: 40 hours (approved)
// Week 2: 38 hours (approved)
// Rate: $50/hr
// Total: 78 hours × $50 = $3,900`}
                      </pre>
                    </div>

                    <div className="bg-white p-4 rounded">
                      <h4 className="font-semibold mb-2">Payroll Run Generation (Pseudocode)</h4>
                      <pre className="bg-gray-100 p-3 rounded font-mono text-xs overflow-x-auto">
{`async function createPayrollRun(clientId, periodStart, periodEnd) {
  // 1. Create payroll_run record
  const payrollRun = await db.payrollRuns.create({
    clientId,
    periodStart,
    periodEnd,
    status: 'draft'
  });

  // 2. Get all active contracts for client
  const contracts = await db.contracts.findMany({
    where: { clientId, status: 'active' }
  });

  let totalAmount = 0;

  // 3. For each contract, calculate amount
  for (const contract of contracts) {
    let amount = 0;
    let description = '';

    if (contract.type === 'fixed') {
      // Sum approved milestones
      const result = await db.milestones.aggregate({
        where: {
          contractId: contract.id,
          status: 'approved',
          dueDate: { gte: periodStart, lte: periodEnd }
        },
        _sum: { amount: true }
      });
      amount = result._sum.amount || 0;
      description = 'Approved milestones';
    } else if (contract.type === 'hourly') {
      // Sum approved hours × rate
      const result = await db.timesheets.aggregate({
        where: {
          contractId: contract.id,
          status: 'approved',
          periodStart: { gte: periodStart },
          periodEnd: { lte: periodEnd }
        },
        _sum: { hours: true }
      });
      const hours = result._sum.hours || 0;
      amount = hours * contract.rate;
      description = \`\${hours} hours × $\${contract.rate}/hr\`;
    }

    // 4. Create payroll_line_item
    if (amount > 0) {
      await db.payrollLineItems.create({
        payrollRunId: payrollRun.id,
        contractorId: contract.contractorId,
        contractId: contract.id,
        type: contract.type === 'fixed' ? 'milestone' : 'hours',
        amount,
        currency: contract.currency,
        description
      });
      totalAmount += amount;
    }
  }

  // 5. Update total
  await db.payrollRuns.update({
    where: { id: payrollRun.id },
    data: { totalAmount }
  });

  return payrollRun;
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payment" className="space-y-4 mt-6">
                <div className="bg-green-50 p-6 rounded-lg border-2 border-green-300">
                  <h3 className="font-bold mb-4">Payment Processing Flow (POC - Mock)</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded">
                      <h4 className="font-semibold mb-2">Process Payments Function (Pseudocode)</h4>
                      <pre className="bg-gray-100 p-3 rounded font-mono text-xs overflow-x-auto">
{`async function processPayrollPayments(payrollRunId) {
  const payrollRun = await db.payrollRuns.findUnique({
    where: { id: payrollRunId },
    include: { lineItems: true }
  });

  if (payrollRun.status !== 'approved') {
    throw new Error('Payroll must be approved first');
  }

  // For each line item
  for (const lineItem of payrollRun.lineItems) {
    // 1. Create Stripe Payment Intent (SANDBOX MODE)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: lineItem.amount * 100, // cents
      currency: lineItem.currency.toLowerCase(),
      metadata: {
        payrollRunId,
        contractorId: lineItem.contractorId,
        environment: 'sandbox'
      }
    });

    // 2. Mock success (in prod: wait for webhook)
    await sleep(1000); // simulate processing

    // 3. Credit contractor's ledger
    const currentBalance = await getContractorBalance(lineItem.contractorId);
    const newBalance = currentBalance + lineItem.amount;

    await db.ledgerEntries.create({
      contractorId: lineItem.contractorId,
      type: 'credit',
      amount: lineItem.amount,
      currency: lineItem.currency,
      balanceAfter: newBalance,
      description: \`Payroll: \${payrollRun.periodStart} - \${payrollRun.periodEnd}\`,
      relatedEntityType: 'payroll_run',
      relatedEntityId: payrollRunId
    });

    // 4. Generate payslip PDF
    const payslip = await generatePayslipPDF({
      contractor: lineItem.contractor,
      client: payrollRun.client,
      period: { start: payrollRun.periodStart, end: payrollRun.periodEnd },
      grossAmount: lineItem.amount,
      currency: lineItem.currency,
      lineItems: [lineItem]
    });

    // 5. Upload to S3
    const pdfUrl = await uploadToS3(payslip, \`payslips/\${lineItem.contractorId}/...\`);

    // 6. Save payslip record
    await db.payslips.create({
      payrollRunId,
      contractorId: lineItem.contractorId,
      periodStart: payrollRun.periodStart,
      periodEnd: payrollRun.periodEnd,
      grossAmount: lineItem.amount,
      currency: lineItem.currency,
      pdfUrl
    });

    // 7. Send email notification
    await sendEmail({
      to: lineItem.contractor.email,
      subject: \`You've been paid! $\${lineItem.amount}\`,
      template: 'payroll-processed',
      data: { contractor, amount: lineItem.amount, pdfUrl }
    });
  }

  // 8. Mark payroll as processed
  await db.payrollRuns.update({
    where: { id: payrollRunId },
    data: {
      status: 'processed',
      processedAt: new Date()
    }
  });

  return { success: true, paymentsProcessed: payrollRun.lineItems.length };
}`}
                      </pre>
                    </div>

                    <div className="bg-white p-4 rounded">
                      <h4 className="font-semibold mb-2">Stripe Sandbox Integration</h4>
                      <pre className="bg-gray-100 p-3 rounded font-mono text-xs overflow-x-auto">
{`// Use Stripe test API key
const stripe = new Stripe(process.env.STRIPE_TEST_KEY);

// All payment intents are in test mode
// No real money is moved
// Logs available in Stripe Dashboard (test mode)

// For POC: Immediately mark as succeeded
// In production: Wait for webhook confirmation`}
                      </pre>
                    </div>

                    <div className="bg-white p-4 rounded">
                      <h4 className="font-semibold mb-2">Payslip PDF Generation</h4>
                      <p className="text-sm text-gray-700 mb-2">Using PDFKit or Puppeteer to generate professional payslips:</p>
                      <pre className="bg-gray-100 p-3 rounded font-mono text-xs overflow-x-auto">
{`// Option 1: PDFKit (lightweight)
const PDFDocument = require('pdfkit');

function generatePayslipPDF(data) {
  const doc = new PDFDocument();
  
  // Header
  doc.fontSize(20).text('Payslip', { align: 'center' });
  doc.fontSize(12).text(\`\${data.client.name}\`, { align: 'center' });
  
  // Contractor info
  doc.moveDown();
  doc.text(\`Contractor: \${data.contractor.fullName}\`);
  doc.text(\`Pay Period: \${data.period.start} - \${data.period.end}\`);
  
  // Amounts
  doc.moveDown();
  doc.fontSize(14).text('Earnings');
  data.lineItems.forEach(item => {
    doc.fontSize(10).text(\`\${item.description}: $\${item.amount}\`);
  });
  
  doc.moveDown();
  doc.fontSize(16).text(\`Total: $\${data.grossAmount} \${data.currency}\`, { bold: true });
  
  return doc; // Stream to S3
}

// Option 2: Puppeteer (HTML template → PDF)
// More flexible for complex designs`}
                      </pre>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card> */}

        {/* Complete Example */}
        <Card className="mb-8 border-2 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <TrendingUp className="h-7 w-7 text-orange-600" />
              Complete Example: TechWave's November 2024 Payroll
            </CardTitle>
            <CardDescription>Real-world scenario from contract work to processed payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border-2">
                <h3 className="text-xl font-bold mb-4">Scenario Setup</h3>
                <p className="text-gray-700 mb-4">
                  <strong>Client:</strong> TechWave LLC (Dubai)<br/>
                  <strong>Contractors:</strong> 3 people<br/>
                  <strong>Period:</strong> November 1-30, 2024
                </p>

                <div className="space-y-4 text-sm">
                  <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded">
                    <h4 className="font-semibold mb-2">Ahmed Hassan (Syria) - Fixed Contract</h4>
                    <p className="text-gray-700">
                      • Contract: $5,000 total, 3 milestones<br/>
                      • Nov 10: Completes Milestone 1 ($2,000) → Approved Nov 12<br/>
                      • Nov 20: Completes Milestone 2 ($2,000) → Approved Nov 22<br/>
                      • <strong>Total for November: $4,000</strong>
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded">
                    <h4 className="font-semibold mb-2">Sara Ibrahim (Egypt) - Hourly Contract</h4>
                    <p className="text-gray-700">
                      • Contract: $50/hour<br/>
                      • Week 1 (Nov 1-7): 40 hours → Approved Nov 8<br/>
                      • Week 2 (Nov 8-14): 40 hours → Approved Nov 15<br/>
                      • Week 3 (Nov 15-21): 38 hours → Approved Nov 22<br/>
                      • Week 4 (Nov 22-28): 40 hours → Approved Nov 29<br/>
                      • <strong>Total: 158 hours × $50 = $7,900</strong>
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 p-4 rounded">
                    <h4 className="font-semibold mb-2">Layla Mostafa (UAE) - Fixed Contract</h4>
                    <p className="text-gray-700">
                      • Contract: $3,000 total, 2 milestones<br/>
                      • Nov 15: Completes Milestone 1 ($1,500) → Approved Nov 16<br/>
                      • Milestone 2 not due until Dec 15<br/>
                      • <strong>Total for November: $1,500</strong>
                    </p>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-4 rounded mt-4">
                    <h4 className="font-semibold mb-2 text-lg">Total November Payroll: $13,400</h4>
                  </div>

                  <div className="border-t-2 pt-4 mt-6">
                    <h4 className="font-semibold mb-3">Nov 30, 2024 - Payroll Processing Day</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                        <div>
                          <p className="font-medium">10:00 AM - Client Creates Payroll Run</p>
                          <p className="text-gray-600 text-xs">TechWave admin clicks "Create Payroll Run" for November</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                        <div>
                          <p className="font-medium">10:01 AM - System Generates Line Items</p>
                          <p className="text-gray-600 text-xs">
                            • Ahmed: $4,000 (Milestone 1 + 2)<br/>
                            • Sara: $7,900 (158 hours)<br/>
                            • Layla: $1,500 (Milestone 1)<br/>
                            • Total: $13,400
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                        <div>
                          <p className="font-medium">10:05 AM - Client Reviews Payroll</p>
                          <p className="text-gray-600 text-xs">Admin sees breakdown, verifies amounts are correct</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                        <div>
                          <p className="font-medium">10:10 AM - Client Adds Bonus for Sara</p>
                          <p className="text-gray-600 text-xs">Clicks "Add Adjustment" → Bonus: $100 "Excellent work this month"<br/>Sara's new total: $8,000</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
                        <div>
                          <p className="font-medium">10:15 AM - Client Approves Payroll</p>
                          <p className="text-gray-600 text-xs">Final total: $13,500 | Clicks "Approve Payroll" → Enters 2FA code</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">6</div>
                        <div>
                          <p className="font-medium">10:20 AM - Client Processes Payments</p>
                          <p className="text-gray-600 text-xs">Clicks "Process Payments" → System begins processing...</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">7</div>
                        <div>
                          <p className="font-medium">10:20:05 AM - System Creates Stripe Payment Intents</p>
                          <p className="text-gray-600 text-xs">
                            • Ahmed: Intent created, $4,000 USD<br/>
                            • Sara: Intent created, $8,000 USD<br/>
                            • Layla: Intent created, $1,500 USD
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">8</div>
                        <div>
                          <p className="font-medium">10:20:10 AM - System Credits Ledgers</p>
                          <p className="text-gray-600 text-xs">
                            • Ahmed: Balance $2,000 → $6,000<br/>
                            • Sara: Balance $1,000 → $9,000<br/>
                            • Layla: Balance $500 → $2,000
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">9</div>
                        <div>
                          <p className="font-medium">10:20:15 AM - System Generates Payslips</p>
                          <p className="text-gray-600 text-xs">3 PDFs generated and uploaded to S3</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">10</div>
                        <div>
                          <p className="font-medium">10:20:20 AM - System Sends Emails</p>
                          <p className="text-gray-600 text-xs">
                            All 3 contractors receive: "You've been paid! [Amount]"
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">✓</div>
                        <div>
                          <p className="font-medium text-green-700">10:20:25 AM - Payroll Processed Successfully!</p>
                          <p className="text-gray-600 text-xs">Status: Processed | 3 payments completed</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 pt-4 mt-6">
                    <h4 className="font-semibold mb-3">Contractor Dashboards Updated</h4>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded border-2 border-blue-300">
                        <h5 className="font-semibold mb-2">Ahmed's Wallet</h5>
                        <p className="text-2xl font-bold text-blue-700">$6,000</p>
                        <p className="text-xs text-gray-600 mt-2">
                          Recent: +$4,000 (Nov Payroll)<br/>
                          Payslip: November_2024.pdf
                        </p>
                      </div>

                      <div className="bg-green-50 p-4 rounded border-2 border-green-300">
                        <h5 className="font-semibold mb-2">Sara's Wallet</h5>
                        <p className="text-2xl font-bold text-green-700">$9,000</p>
                        <p className="text-xs text-gray-600 mt-2">
                          Recent: +$8,000 (Nov Payroll + Bonus)<br/>
                          Payslip: November_2024.pdf
                        </p>
                      </div>

                      <div className="bg-purple-50 p-4 rounded border-2 border-purple-300">
                        <h5 className="font-semibold mb-2">Layla's Wallet</h5>
                        <p className="text-2xl font-bold text-purple-700">$2,000</p>
                        <p className="text-xs text-gray-600 mt-2">
                          Recent: +$1,500 (Nov Payroll)<br/>
                          Payslip: November_2024.pdf
                        </p>
                      </div>
                    </div>
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

export default PayrollFlow;

