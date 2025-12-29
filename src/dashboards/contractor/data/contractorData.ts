// Contractor Dashboard Mock Data
import { 
  generateLogoUrl,
  type Contract
} from "@/shared/types/common";

// Mock contracts from contractor perspective (using shared contract data structure)
export const mockContracts = [
  {
    id: "contract1",
    title: "Designer - Jackie F.",
    clientName: "DT Dean Torphy",
    clientInitials: "DT",
    type: "FIXED",
    status: "WAITING FOR CONTRACTOR SIGN",
    amount: 4000,
    currency: "CAD",
    frequency: "Monthly",
    dueIn: 19,
    startDate: "2022-02-15",
    endDate: null,
  },
  {
    id: "contract2",
    title: "Pat Schneider",
    clientName: "FS Felipe Senger",
    clientInitials: "FS",
    type: "PAY AS YOU GO",
    status: "DUE IN 19 DAYS",
    amount: 9120,
    currency: "USD",
    frequency: "Milestone",
    dueIn: 19,
    startDate: "2021-11-10",
    endDate: null,
  },
];

// Contractor earnings data
export const contractorEarnings = {
  totalEarned: 52340,
  currentMonth: 9120,
  pendingPayments: 4000,
  availableBalance: 48340,
};

// Contractor invoices
export const mockInvoices = [
  {
    id: "inv1",
    contractId: "contract1",
    amount: 4000,
    currency: "CAD",
    status: "pending",
    dueDate: "2024-12-15",
    issueDate: "2024-11-15",
  },
  {
    id: "inv2",
    contractId: "contract2",
    amount: 9120,
    currency: "USD",
    status: "paid",
    dueDate: "2024-11-30",
    issueDate: "2024-11-01",
    paidDate: "2024-11-28",
  },
];

// Contractor timesheets
export const mockTimesheets = [
  {
    id: "ts1",
    contractId: "contract2",
    weekEnding: "2024-11-30",
    hoursWorked: 40,
    hourlyRate: 50,
    totalAmount: 2000,
    status: "approved",
  },
  {
    id: "ts2",
    contractId: "contract2",
    weekEnding: "2024-11-23",
    hoursWorked: 38,
    hourlyRate: 50,
    totalAmount: 1900,
    status: "approved",
  },
];











