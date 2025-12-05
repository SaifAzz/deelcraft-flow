// Mock Data for Client Dashboard

export interface KYCDocument {
  id: string;
  type: string;
  name: string;
  status: "approved" | "pending" | "rejected" | "expiring";
  uploadedDate?: string;
  expiryDate?: string;
  fileUrl?: string;
}

export interface KYCInfo {
  contractorId: string;
  status: "approved" | "incomplete" | "expiring";
  submittedDate?: string;
  approvedDate?: string;
  documents: KYCDocument[];
  verificationLevel: "basic" | "standard" | "enhanced";
  notes?: string;
}

export interface Contractor {
  id: string;
  name: string;
  email: string;
  country: string;
  avatar?: string;
  logo?: string;
  complianceStatus: "approved" | "incomplete" | "expiring";
  missingDocs: number;
  complianceScore: number;
  activeContracts: number;
  totalEarned: number;
  kycStatus: "approved" | "incomplete" | "expiring";
  joinedDate: string;
  kycInfo?: KYCInfo;
}

export interface Contract {
  id: string;
  contractorId: string;
  contractorName: string;
  type: "fixed" | "hourly";
  amount: number;
  currency: string;
  status: "active" | "draft" | "completed";
  startDate: string;
  endDate?: string;
  progress: number;
  milestones?: Milestone[];
  hourlyRate?: number;
  totalHours?: number;
}

export interface Milestone {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: "pending" | "completed" | "approved";
  completedDate?: string;
}

export interface PayrollRun {
  id: string;
  period: string;
  startDate: string;
  endDate: string;
  contractors: number;
  totalAmount: number;
  status: "draft" | "approved" | "processed";
  createdAt: string;
  processedAt?: string;
  lineItems: PayrollLineItem[];
}

export interface PayrollLineItem {
  id: string;
  contractorId: string;
  contractorName: string;
  contractId: string;
  contractType: string;
  amount: number;
  currency: string;
  details: string;
  adjustments?: Adjustment[];
}

export interface Adjustment {
  id: string;
  type: "bonus" | "deduction" | "correction";
  amount: number;
  reason: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: "payment" | "funding";
  description: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  contractorId?: string;
  contractorName?: string;
}

export interface Activity {
  id: string;
  type: "contract" | "payment" | "contractor" | "compliance";
  text: string;
  time: string;
  icon: string;
  color: string;
}

export interface Deadline {
  id: string;
  title: string;
  date: string;
  type: "payroll" | "contract" | "compliance" | "report";
  urgent: boolean;
}

export interface Notification {
  id: string;
  type: "compliance" | "contract" | "payment" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  contractorId?: string;
  contractorName?: string;
  actionUrl?: string;
}

export interface ClientDocument {
  id: string;
  type: string;
  name: string;
  status: "approved" | "pending" | "rejected" | "expired";
  uploadedDate: string;
  reviewedDate?: string;
  expiryDate?: string;
  fileUrl?: string;
  requiredFor: string[];
}

// Mock KYC Data
export const mockKYCInfo: Record<string, KYCInfo> = {
  c1: {
    contractorId: "c1",
    status: "approved",
    submittedDate: "2024-01-20",
    approvedDate: "2024-01-25",
    verificationLevel: "enhanced",
    documents: [
      {
        id: "doc1",
        type: "Identity Document",
        name: "Passport - Ahmed Hassan",
        status: "approved",
        uploadedDate: "2024-01-20",
        expiryDate: "2029-01-20",
      },
      {
        id: "doc2",
        type: "Proof of Address",
        name: "Utility Bill - Damascus",
        status: "approved",
        uploadedDate: "2024-01-21",
      },
      {
        id: "doc3",
        type: "Tax ID",
        name: "Tax Identification Number",
        status: "approved",
        uploadedDate: "2024-01-22",
      },
      {
        id: "doc4",
        type: "Bank Statement",
        name: "Bank Statement - Q1 2024",
        status: "approved",
        uploadedDate: "2024-01-23",
      },
    ],
    notes: "All documents verified and approved. Enhanced verification completed.",
  },
  c2: {
    contractorId: "c2",
    status: "approved",
    submittedDate: "2024-02-25",
    approvedDate: "2024-03-01",
    verificationLevel: "standard",
    documents: [
      {
        id: "doc5",
        type: "Identity Document",
        name: "National ID - Sara Ibrahim",
        status: "approved",
        uploadedDate: "2024-02-25",
        expiryDate: "2030-02-25",
      },
      {
        id: "doc6",
        type: "Proof of Address",
        name: "Rental Agreement - Cairo",
        status: "approved",
        uploadedDate: "2024-02-26",
      },
      {
        id: "doc7",
        type: "Tax ID",
        name: "Tax Identification Number",
        status: "approved",
        uploadedDate: "2024-02-27",
      },
    ],
    notes: "Standard verification completed successfully.",
  },
  c3: {
    contractorId: "c3",
    status: "incomplete",
    submittedDate: "2024-03-15",
    verificationLevel: "basic",
    documents: [
      {
        id: "doc8",
        type: "Identity Document",
        name: "Emirates ID - Layla Mostafa",
        status: "pending",
        uploadedDate: "2024-03-15",
        expiryDate: "2025-03-15",
      },
      {
        id: "doc9",
        type: "Proof of Address",
        name: "Bank Statement",
        status: "rejected",
        uploadedDate: "2024-03-16",
      },
    ],
    notes: "Missing: Updated bank statement and tax ID. Bank statement was rejected - needs to be more recent.",
  },
  c4: {
    contractorId: "c4",
    status: "expiring",
    submittedDate: "2024-04-10",
    approvedDate: "2024-04-15",
    verificationLevel: "standard",
    documents: [
      {
        id: "doc10",
        type: "Identity Document",
        name: "Passport - Mohammed Ali",
        status: "expiring",
        uploadedDate: "2024-04-10",
        expiryDate: "2024-12-15",
      },
      {
        id: "doc11",
        type: "Proof of Address",
        name: "Utility Bill - Riyadh",
        status: "approved",
        uploadedDate: "2024-04-11",
      },
      {
        id: "doc12",
        type: "Tax ID",
        name: "Tax Identification Number",
        status: "approved",
        uploadedDate: "2024-04-12",
      },
    ],
    notes: "Passport expiring soon. Please request updated document before expiration.",
  },
  c5: {
    contractorId: "c5",
    status: "approved",
    submittedDate: "2024-05-18",
    approvedDate: "2024-05-22",
    verificationLevel: "enhanced",
    documents: [
      {
        id: "doc13",
        type: "Identity Document",
        name: "National ID - Fatima Zahra",
        status: "approved",
        uploadedDate: "2024-05-18",
        expiryDate: "2031-05-18",
      },
      {
        id: "doc14",
        type: "Proof of Address",
        name: "Property Deed - Amman",
        status: "approved",
        uploadedDate: "2024-05-19",
      },
      {
        id: "doc15",
        type: "Tax ID",
        name: "Tax Identification Number",
        status: "approved",
        uploadedDate: "2024-05-20",
      },
      {
        id: "doc16",
        type: "Bank Statement",
        name: "Bank Statement - Q2 2024",
        status: "approved",
        uploadedDate: "2024-05-21",
      },
    ],
    notes: "Enhanced verification completed. All documents in order.",
  },
};

// Helper function to generate logo URL from initials (circular avatars with professional colors)
const generateLogoUrl = (name: string, type: "company" | "person" = "company"): string => {
  const initials = name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  // Professional muted color palette for companies
  const colors = type === "company" 
    ? ["475569", "64748B", "475569", "64748B", "475569", "64748B"] // Slate tones
    : ["3B82F6", "6366F1", "8B5CF6", "EC4899", "F59E0B", "10B981", "EF4444", "14B8A6"];
  const colorIndex = name.length % colors.length;
  // Use rounded=true for circular avatars
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&size=128&background=${colors[colorIndex]}&color=fff&bold=true&font-size=0.5&rounded=true`;
};

// Mock Data
export const mockContractors: Contractor[] = [
  {
    id: "c1",
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    country: "Syria",
    logo: generateLogoUrl("Ahmed Hassan", "person"),
    complianceStatus: "approved",
    missingDocs: 0,
    complianceScore: 100,
    activeContracts: 2,
    totalEarned: 12000,
    kycStatus: "approved",
    joinedDate: "2024-01-15",
    kycInfo: mockKYCInfo.c1,
  },
  {
    id: "c2",
    name: "Sara Ibrahim",
    email: "sara@example.com",
    country: "Egypt",
    logo: generateLogoUrl("Sara Ibrahim", "person"),
    complianceStatus: "approved",
    missingDocs: 0,
    complianceScore: 100,
    activeContracts: 1,
    totalEarned: 8000,
    kycStatus: "approved",
    joinedDate: "2024-02-20",
    kycInfo: mockKYCInfo.c2,
  },
  {
    id: "c3",
    name: "Layla Mostafa",
    email: "layla@example.com",
    country: "UAE",
    logo: generateLogoUrl("Layla Mostafa", "person"),
    complianceStatus: "incomplete",
    missingDocs: 2,
    complianceScore: 60,
    activeContracts: 1,
    totalEarned: 3000,
    kycStatus: "incomplete",
    joinedDate: "2024-03-10",
    kycInfo: mockKYCInfo.c3,
  },
  {
    id: "c4",
    name: "Mohammed Ali",
    email: "mohammed@example.com",
    country: "Saudi Arabia",
    logo: generateLogoUrl("Mohammed Ali", "person"),
    complianceStatus: "expiring",
    missingDocs: 0,
    complianceScore: 80,
    activeContracts: 0,
    totalEarned: 0,
    kycStatus: "expiring",
    joinedDate: "2024-04-05",
    kycInfo: mockKYCInfo.c4,
  },
  {
    id: "c5",
    name: "Fatima Zahra",
    email: "fatima@example.com",
    country: "Jordan",
    logo: generateLogoUrl("Fatima Zahra", "person"),
    complianceStatus: "approved",
    missingDocs: 0,
    complianceScore: 100,
    activeContracts: 1,
    totalEarned: 5000,
    kycStatus: "approved",
    joinedDate: "2024-05-12",
    kycInfo: mockKYCInfo.c5,
  },
  {
    id: "c6",
    name: "Omar Khalil",
    email: "omar@example.com",
    country: "Lebanon",
    logo: generateLogoUrl("Omar Khalil", "person"),
    complianceStatus: "approved",
    missingDocs: 0,
    complianceScore: 100,
    activeContracts: 2,
    totalEarned: 9500,
    kycStatus: "approved",
    joinedDate: "2024-06-20",
  },
  {
    id: "c7",
    name: "Nour Amin",
    email: "nour@example.com",
    country: "Palestine",
    logo: generateLogoUrl("Nour Amin", "person"),
    complianceStatus: "incomplete",
    missingDocs: 1,
    complianceScore: 70,
    activeContracts: 1,
    totalEarned: 4000,
    kycStatus: "incomplete",
    joinedDate: "2024-07-10",
  },
  {
    id: "c8",
    name: "Yasmin Al-Farsi",
    email: "yasmin@example.com",
    country: "Oman",
    logo: generateLogoUrl("Yasmin Al-Farsi", "person"),
    complianceStatus: "approved",
    missingDocs: 0,
    complianceScore: 100,
    activeContracts: 1,
    totalEarned: 7000,
    kycStatus: "approved",
    joinedDate: "2024-08-15",
  },
  {
    id: "c9",
    name: "Karim Mansour",
    email: "karim@example.com",
    country: "Kuwait",
    logo: generateLogoUrl("Karim Mansour", "person"),
    complianceStatus: "expiring",
    missingDocs: 0,
    complianceScore: 85,
    activeContracts: 1,
    totalEarned: 6500,
    kycStatus: "expiring",
    joinedDate: "2024-09-05",
  },
  {
    id: "c10",
    name: "Aisha Rahman",
    email: "aisha@example.com",
    country: "Bahrain",
    logo: generateLogoUrl("Aisha Rahman", "person"),
    complianceStatus: "approved",
    missingDocs: 0,
    complianceScore: 100,
    activeContracts: 2,
    totalEarned: 11000,
    kycStatus: "approved",
    joinedDate: "2024-09-20",
  },
  {
    id: "c11",
    name: "Tariq Al-Sayed",
    email: "tariq@example.com",
    country: "Qatar",
    logo: generateLogoUrl("Tariq Al-Sayed", "person"),
    complianceStatus: "incomplete",
    missingDocs: 3,
    complianceScore: 50,
    activeContracts: 0,
    totalEarned: 2000,
    kycStatus: "incomplete",
    joinedDate: "2024-10-01",
  },
  {
    id: "c12",
    name: "Dina Haddad",
    email: "dina@example.com",
    country: "Iraq",
    logo: generateLogoUrl("Dina Haddad", "person"),
    complianceStatus: "approved",
    missingDocs: 0,
    complianceScore: 100,
    activeContracts: 1,
    totalEarned: 5500,
    kycStatus: "approved",
    joinedDate: "2024-10-15",
  },
  {
    id: "c13",
    name: "Hassan Mahmoud",
    email: "hassan@example.com",
    country: "Yemen",
    logo: generateLogoUrl("Hassan Mahmoud", "person"),
    complianceStatus: "expiring",
    missingDocs: 0,
    complianceScore: 75,
    activeContracts: 1,
    totalEarned: 3500,
    kycStatus: "expiring",
    joinedDate: "2024-11-01",
  },
  {
    id: "c14",
    name: "Rania Boutros",
    email: "rania@example.com",
    country: "Morocco",
    logo: generateLogoUrl("Rania Boutros", "person"),
    complianceStatus: "approved",
    missingDocs: 0,
    complianceScore: 100,
    activeContracts: 2,
    totalEarned: 8500,
    kycStatus: "approved",
    joinedDate: "2024-11-10",
  },
  {
    id: "c15",
    name: "Ali Ben Salah",
    email: "ali@example.com",
    country: "Tunisia",
    logo: generateLogoUrl("Ali Ben Salah", "person"),
    complianceStatus: "incomplete",
    missingDocs: 2,
    complianceScore: 65,
    activeContracts: 1,
    totalEarned: 4200,
    kycStatus: "incomplete",
    joinedDate: "2024-11-15",
  },
];

export const mockContracts: Contract[] = [
  {
    id: "C-001",
    contractorId: "c1",
    contractorName: "Ahmed Hassan",
    type: "fixed",
    amount: 5000,
    currency: "USD",
    status: "active",
    startDate: "2024-10-01",
    endDate: "2024-12-31",
    progress: 60,
    milestones: [
      {
        id: "m1",
        title: "Design Mockups",
        amount: 1000,
        dueDate: "2024-11-10",
        status: "completed",
        completedDate: "2024-11-08",
      },
      {
        id: "m2",
        title: "Frontend Development",
        amount: 2000,
        dueDate: "2024-11-30",
        status: "completed",
        completedDate: "2024-11-28",
      },
      {
        id: "m3",
        title: "Backend Integration",
        amount: 1500,
        dueDate: "2024-12-15",
        status: "pending",
      },
      {
        id: "m4",
        title: "Testing & Deployment",
        amount: 500,
        dueDate: "2024-12-31",
        status: "pending",
      },
    ],
  },
  {
    id: "C-002",
    contractorId: "c2",
    contractorName: "Sara Ibrahim",
    type: "hourly",
    amount: 0,
    currency: "USD",
    status: "active",
    startDate: "2024-10-15",
    hourlyRate: 50,
    totalHours: 40,
    progress: 40,
  },
  {
    id: "C-003",
    contractorId: "c3",
    contractorName: "Layla Mostafa",
    type: "fixed",
    amount: 3000,
    currency: "USD",
    status: "draft",
    startDate: "2024-11-01",
    progress: 0,
    milestones: [
      {
        id: "m5",
        title: "Milestone 1",
        amount: 1500,
        dueDate: "2024-12-01",
        status: "pending",
      },
    ],
  },
  {
    id: "C-004",
    contractorId: "c1",
    contractorName: "Ahmed Hassan",
    type: "fixed",
    amount: 7000,
    currency: "USD",
    status: "active",
    startDate: "2024-09-01",
    endDate: "2025-01-31",
    progress: 45,
    milestones: [
      {
        id: "m6",
        title: "Phase 1",
        amount: 3000,
        dueDate: "2024-10-31",
        status: "completed",
        completedDate: "2024-10-28",
      },
      {
        id: "m7",
        title: "Phase 2",
        amount: 2500,
        dueDate: "2024-12-15",
        status: "approved",
        completedDate: "2024-12-10",
      },
      {
        id: "m8",
        title: "Phase 3",
        amount: 1500,
        dueDate: "2025-01-31",
        status: "pending",
      },
    ],
  },
  {
    id: "C-005",
    contractorId: "c5",
    contractorName: "Fatima Zahra",
    type: "hourly",
    amount: 0,
    currency: "USD",
    status: "active",
    startDate: "2024-11-01",
    hourlyRate: 45,
    totalHours: 60,
    progress: 50,
  },
  {
    id: "C-006",
    contractorId: "c4",
    contractorName: "Mohammed Ali",
    type: "fixed",
    amount: 4500,
    currency: "USD",
    status: "active",
    startDate: "2024-10-15",
    endDate: "2024-12-15",
    progress: 70,
    milestones: [
      {
        id: "m9",
        title: "Initial Setup",
        amount: 1500,
        dueDate: "2024-11-01",
        status: "completed",
        completedDate: "2024-10-30",
      },
      {
        id: "m10",
        title: "Development Phase",
        amount: 3000,
        dueDate: "2024-12-15",
        status: "approved",
        completedDate: "2024-12-05",
      },
    ],
  },
  {
    id: "C-007",
    contractorId: "c6",
    contractorName: "Omar Khalil",
    type: "fixed",
    amount: 6000,
    currency: "USD",
    status: "draft",
    startDate: "2024-12-01",
    progress: 0,
  },
  {
    id: "C-008",
    contractorId: "c7",
    contractorName: "Nour Amin",
    type: "hourly",
    amount: 0,
    currency: "USD",
    status: "active",
    startDate: "2024-10-20",
    hourlyRate: 55,
    totalHours: 35,
    progress: 30,
  },
  {
    id: "C-009",
    contractorId: "c1",
    contractorName: "Ahmed Hassan",
    type: "fixed",
    amount: 8000,
    currency: "USD",
    status: "completed",
    startDate: "2024-07-01",
    endDate: "2024-09-30",
    progress: 100,
  },
  {
    id: "C-010",
    contractorId: "c2",
    contractorName: "Sara Ibrahim",
    type: "hourly",
    amount: 0,
    currency: "USD",
    status: "active",
    startDate: "2024-09-01",
    hourlyRate: 50,
    totalHours: 80,
    progress: 60,
  },
  {
    id: "C-011",
    contractorId: "c3",
    contractorName: "Layla Mostafa",
    type: "fixed",
    amount: 4000,
    currency: "USD",
    status: "active",
    startDate: "2024-11-10",
    endDate: "2025-01-10",
    progress: 25,
  },
  {
    id: "C-012",
    contractorId: "c5",
    contractorName: "Fatima Zahra",
    type: "fixed",
    amount: 5500,
    currency: "USD",
    status: "draft",
    startDate: "2024-12-15",
    progress: 0,
  },
];

export const mockPayrollRuns: PayrollRun[] = [
  {
    id: "PR-001",
    period: "November 2024",
    startDate: "2024-11-01",
    endDate: "2024-11-30",
    contractors: 5,
    totalAmount: 12500,
    status: "draft",
    createdAt: "2024-11-28",
    lineItems: [
      {
        id: "li1",
        contractorId: "c1",
        contractorName: "Ahmed Hassan",
        contractId: "C-001",
        contractType: "Fixed",
        amount: 3000,
        currency: "USD",
        details: "Milestone 1, Milestone 2",
      },
      {
        id: "li2",
        contractorId: "c2",
        contractorName: "Sara Ibrahim",
        contractId: "C-002",
        contractType: "Hourly",
        amount: 2000,
        currency: "USD",
        details: "40 hours × $50/hr",
      },
      {
        id: "li3",
        contractorId: "c3",
        contractorName: "Layla Mostafa",
        contractId: "C-003",
        contractType: "Fixed",
        amount: 1500,
        currency: "USD",
        details: "Milestone 1",
      },
      {
        id: "li4",
        contractorId: "c1",
        contractorName: "Ahmed Hassan",
        contractId: "C-004",
        contractType: "Fixed",
        amount: 3000,
        currency: "USD",
        details: "Phase 1, Phase 2",
      },
      {
        id: "li5",
        contractorId: "c5",
        contractorName: "Fatima Zahra",
        contractId: "C-005",
        contractType: "Fixed",
        amount: 3000,
        currency: "USD",
        details: "Project completion",
      },
    ],
  },
  {
    id: "PR-002",
    period: "October 2024",
    startDate: "2024-10-01",
    endDate: "2024-10-31",
    contractors: 4,
    totalAmount: 10000,
    status: "processed",
    createdAt: "2024-10-28",
    processedAt: "2024-10-31",
    lineItems: [
      {
        id: "li6",
        contractorId: "c1",
        contractorName: "Ahmed Hassan",
        contractId: "C-001",
        contractType: "Fixed",
        amount: 3000,
        currency: "USD",
        details: "Milestone 1",
      },
      {
        id: "li7",
        contractorId: "c2",
        contractorName: "Sara Ibrahim",
        contractId: "C-002",
        contractType: "Hourly",
        amount: 2000,
        currency: "USD",
        details: "40 hours × $50/hr",
      },
      {
        id: "li8",
        contractorId: "c4",
        contractorName: "Mohammed Ali",
        contractId: "C-006",
        contractType: "Fixed",
        amount: 2500,
        currency: "USD",
        details: "Project milestone",
      },
      {
        id: "li9",
        contractorId: "c5",
        contractorName: "Fatima Zahra",
        contractId: "C-005",
        contractType: "Fixed",
        amount: 2500,
        currency: "USD",
        details: "Initial payment",
      },
    ],
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: "t1",
    date: "2024-11-30",
    type: "payment",
    description: "Payroll - November 2024",
    amount: -12500,
    currency: "USD",
    status: "completed",
  },
  {
    id: "t2",
    date: "2024-11-25",
    type: "funding",
    description: "Added to escrow",
    amount: 20000,
    currency: "USD",
    status: "completed",
  },
  {
    id: "t3",
    date: "2024-10-31",
    type: "payment",
    description: "Payroll - October 2024",
    amount: -10000,
    currency: "USD",
    status: "completed",
  },
  {
    id: "t4",
    date: "2024-10-15",
    type: "funding",
    description: "Added to escrow",
    amount: 15000,
    currency: "USD",
    status: "completed",
  },
  {
    id: "t5",
    date: "2024-09-30",
    type: "payment",
    description: "Payroll - September 2024",
    amount: -8500,
    currency: "USD",
    status: "completed",
  },
];

export const mockActivities: Activity[] = [
  {
    id: "a1",
    type: "contract",
    text: "Ahmed Hassan completed Milestone 1",
    time: "2 hours ago",
    icon: "CheckCircle2",
    color: "bg-green-500",
  },
  {
    id: "a2",
    type: "payment",
    text: "Payroll processed for November 2024",
    time: "1 day ago",
    icon: "DollarSign",
    color: "bg-blue-500",
  },
  {
    id: "a3",
    type: "contractor",
    text: "Sara Ibrahim joined your team",
    time: "2 days ago",
    icon: "UserPlus",
    color: "bg-purple-500",
  },
  {
    id: "a4",
    type: "compliance",
    text: "3 documents pending review",
    time: "3 days ago",
    icon: "AlertCircle",
    color: "bg-orange-500",
  },
];

export const mockDeadlines: Deadline[] = [
  {
    id: "d1",
    title: "Payroll Due",
    date: "Nov 30, 2024",
    type: "payroll",
    urgent: true,
  },
  {
    id: "d2",
    title: "Contract Renewal",
    date: "Dec 5, 2024",
    type: "contract",
    urgent: false,
  },
  {
    id: "d3",
    title: "Document Expiry",
    date: "Dec 10, 2024",
    type: "compliance",
    urgent: true,
  },
  {
    id: "d4",
    title: "Monthly Report",
    date: "Dec 15, 2024",
    type: "report",
    urgent: false,
  },
];

// Dashboard Stats
export const dashboardStats = {
  activeContracts: 12,
  totalContractors: 18,
  escrowBalance: 45250,
  pendingApprovals: 7,
};

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "compliance",
    title: "Ahmed Hassan is ready to work!",
    message: "Ahmed has completed KYC verification and all documents are approved.",
    timestamp: "2024-11-22T10:30:00",
    read: false,
    contractorId: "c1",
    contractorName: "Ahmed Hassan",
    actionUrl: "/compliance",
  },
  {
    id: "n2",
    type: "compliance",
    title: "3 contractors have expiring documents",
    message: "Mohammed Ali, Sara Ibrahim, and Fatima Zahra have documents expiring in the next 30 days.",
    timestamp: "2024-11-22T09:15:00",
    read: false,
    actionUrl: "/compliance",
  },
  {
    id: "n3",
    type: "compliance",
    title: "Layla Mostafa needs attention",
    message: "Layla's KYC verification is incomplete. 2 documents are missing.",
    timestamp: "2024-11-21T14:20:00",
    read: true,
    contractorId: "c3",
    contractorName: "Layla Mostafa",
    actionUrl: "/compliance",
  },
  {
    id: "n4",
    type: "contract",
    title: "New contract signed",
    message: "Ahmed Hassan has signed the Fixed Price contract for $5,000.",
    timestamp: "2024-11-20T16:45:00",
    read: true,
    contractorId: "c1",
    contractorName: "Ahmed Hassan",
  },
  {
    id: "n5",
    type: "payment",
    title: "Payment processed",
    message: "Payroll run for November 2024 has been successfully processed.",
    timestamp: "2024-11-20T10:00:00",
    read: true,
  },
];

// Mock Client Documents
export const mockClientDocuments: ClientDocument[] = [
  {
    id: "cd1",
    type: "Employer Registration Certificate",
    name: "UAE_Employer_Registration_2024.pdf",
    status: "approved",
    uploadedDate: "2024-01-10",
    reviewedDate: "2024-01-12",
    requiredFor: ["UAE"],
  },
  {
    id: "cd2",
    type: "Business License",
    name: "Business_License_2024.pdf",
    status: "approved",
    uploadedDate: "2024-01-10",
    reviewedDate: "2024-01-12",
    requiredFor: ["UAE", "Saudi Arabia"],
  },
  {
    id: "cd3",
    type: "Tax Registration",
    name: "Tax_Registration_Certificate.pdf",
    status: "pending",
    uploadedDate: "2024-11-20",
    requiredFor: ["Egypt"],
  },
];

// ==================== ADMIN-SPECIFIC DATA ====================

// Admin interfaces
export interface PendingDocument {
  id: string;
  contractorId: string;
  contractorName: string;
  contractorEmail: string;
  clientId: string;
  clientName: string;
  documentType: string;
  uploadedDate: string;
  priority: "high" | "normal" | "low";
  fileUrl: string;
  status: "pending";
  daysOld: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  adminId: string;
  adminName: string;
  action: string;
  entityType: string;
  entityId: string;
  details: Record<string, any>;
  ipAddress: string;
}

export interface CountryRule {
  countryCode: string;
  countryName: string;
  requiredDocuments: string[];
  optionalDocuments: string[];
  currency: string;
}

export interface PlatformAnalytics {
  totalRevenue: {
    thisMonth: number;
    lastMonth: number;
    allTime: number;
  };
  activeUsers: {
    clients: number;
    contractors: number;
    adminUsers: number;
  };
  growthMetrics: {
    revenueGrowth: number;
    clientGrowth: number;
    contractorGrowth: number;
  };
  documentMetrics: {
    pending: number;
    approved: number;
    rejected: number;
    avgReviewTime: number;
  };
  payrollMetrics: {
    runsThisMonth: number;
    totalProcessed: number;
    avgProcessingTime: number;
  };
}

export interface ContractorBalance {
  contractorId: string;
  contractorName: string;
  contractorEmail: string;
  currentBalance: number;
  totalEarned: number;
  totalWithdrawn: number;
  currency: string;
  lastTransaction: string;
  clientName: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "compliance_admin" | "support_admin";
  status: "active" | "inactive";
  lastLogin: string;
  actionsCount: number;
}

export interface SystemAlert {
  id: string;
  type: "error" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

// Mock pending documents
export const mockPendingDocuments: PendingDocument[] = [
  {
    id: "pd1",
    contractorId: "c3",
    contractorName: "Layla Mostafa",
    contractorEmail: "layla@example.com",
    clientId: "client1",
    clientName: "TechWave LLC",
    documentType: "Passport",
    uploadedDate: "2024-11-17",
    priority: "high",
    fileUrl: "/mock/documents/layla-passport.pdf",
    status: "pending",
    daysOld: 13,
  },
  {
    id: "pd2",
    contractorId: "c3",
    contractorName: "Layla Mostafa",
    contractorEmail: "layla@example.com",
    clientId: "client1",
    clientName: "TechWave LLC",
    documentType: "Bank Statement",
    uploadedDate: "2024-11-18",
    priority: "high",
    fileUrl: "/mock/documents/layla-bank.pdf",
    status: "pending",
    daysOld: 12,
  },
  {
    id: "pd3",
    contractorId: "c6",
    contractorName: "Omar Khalil",
    contractorEmail: "omar@example.com",
    clientId: "client2",
    clientName: "DesignCo",
    documentType: "Tax ID",
    uploadedDate: "2024-11-25",
    priority: "normal",
    fileUrl: "/mock/documents/omar-tax.pdf",
    status: "pending",
    daysOld: 5,
  },
  {
    id: "pd4",
    contractorId: "c7",
    contractorName: "Nour Amin",
    contractorEmail: "nour@example.com",
    clientId: "client3",
    clientName: "StartupX",
    documentType: "Proof of Address",
    uploadedDate: "2024-11-28",
    priority: "normal",
    fileUrl: "/mock/documents/nour-address.pdf",
    status: "pending",
    daysOld: 2,
  },
  {
    id: "pd5",
    contractorId: "c1",
    contractorName: "Ahmed Hassan",
    contractorEmail: "ahmed@example.com",
    clientId: "client1",
    clientName: "TechWave LLC",
    documentType: "Work Permit",
    uploadedDate: "2024-11-20",
    priority: "high",
    fileUrl: "/mock/documents/ahmed-permit.pdf",
    status: "pending",
    daysOld: 10,
  },
  {
    id: "pd6",
    contractorId: "c2",
    contractorName: "Sara Ibrahim",
    contractorEmail: "sara@example.com",
    clientId: "client2",
    clientName: "Global Innovations Inc",
    documentType: "Tax Certificate",
    uploadedDate: "2024-11-22",
    priority: "normal",
    fileUrl: "/mock/documents/sara-tax.pdf",
    status: "pending",
    daysOld: 8,
  },
  {
    id: "pd7",
    contractorId: "c5",
    contractorName: "Fatima Zahra",
    contractorEmail: "fatima@example.com",
    clientId: "client1",
    clientName: "TechWave LLC",
    documentType: "Passport",
    uploadedDate: "2024-11-23",
    priority: "high",
    fileUrl: "/mock/documents/fatima-passport.pdf",
    status: "pending",
    daysOld: 7,
  },
  {
    id: "pd8",
    contractorId: "c4",
    contractorName: "Mohammed Ali",
    contractorEmail: "mohammed@example.com",
    clientId: "client3",
    clientName: "Digital Solutions Ltd",
    documentType: "Bank Statement",
    uploadedDate: "2024-11-24",
    priority: "normal",
    fileUrl: "/mock/documents/mohammed-bank.pdf",
    status: "pending",
    daysOld: 6,
  },
  {
    id: "pd9",
    contractorId: "c6",
    contractorName: "Omar Khalil",
    contractorEmail: "omar@example.com",
    clientId: "client2",
    clientName: "DesignCo",
    documentType: "Proof of Address",
    uploadedDate: "2024-11-26",
    priority: "normal",
    fileUrl: "/mock/documents/omar-address.pdf",
    status: "pending",
    daysOld: 4,
  },
  {
    id: "pd10",
    contractorId: "c1",
    contractorName: "Ahmed Hassan",
    contractorEmail: "ahmed@example.com",
    clientId: "client1",
    clientName: "TechWave LLC",
    documentType: "Insurance Document",
    uploadedDate: "2024-11-27",
    priority: "high",
    fileUrl: "/mock/documents/ahmed-insurance.pdf",
    status: "pending",
    daysOld: 3,
  },
  {
    id: "pd11",
    contractorId: "c2",
    contractorName: "Sara Ibrahim",
    contractorEmail: "sara@example.com",
    clientId: "client2",
    clientName: "Global Innovations Inc",
    documentType: "National ID",
    uploadedDate: "2024-11-26",
    priority: "normal",
    fileUrl: "/mock/documents/sara-id.pdf",
    status: "pending",
    daysOld: 4,
  },
  {
    id: "pd12",
    contractorId: "c3",
    contractorName: "Layla Mostafa",
    contractorEmail: "layla@example.com",
    clientId: "client1",
    clientName: "TechWave LLC",
    documentType: "Work Contract",
    uploadedDate: "2024-11-25",
    priority: "high",
    fileUrl: "/mock/documents/layla-contract.pdf",
    status: "pending",
    daysOld: 5,
  },
];

// Mock audit logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: "log1",
    timestamp: "2024-11-30T14:30:00",
    adminId: "admin1",
    adminName: "Sarah Admin",
    action: "document_approved",
    entityType: "document",
    entityId: "doc1",
    details: {
      contractorName: "Ahmed Hassan",
      documentType: "Passport",
      clientName: "TechWave LLC",
    },
    ipAddress: "192.168.1.1",
  },
  {
    id: "log2",
    timestamp: "2024-11-30T13:15:00",
    adminId: "admin1",
    adminName: "Sarah Admin",
    action: "document_rejected",
    entityType: "document",
    entityId: "doc9",
    details: {
      contractorName: "Layla Mostafa",
      documentType: "Bank Statement",
      reason: "Document is not recent enough, please upload current statement",
      clientName: "TechWave LLC",
    },
    ipAddress: "192.168.1.1",
  },
  {
    id: "log3",
    timestamp: "2024-11-30T10:00:00",
    adminId: "admin2",
    adminName: "John Support",
    action: "payroll_reviewed",
    entityType: "payroll_run",
    entityId: "PR-001",
    details: {
      clientName: "TechWave LLC",
      period: "November 2024",
      totalAmount: 12500,
      contractors: 5,
    },
    ipAddress: "192.168.1.5",
  },
  {
    id: "log4",
    timestamp: "2024-11-29T16:45:00",
    adminId: "admin1",
    adminName: "Sarah Admin",
    action: "country_rule_updated",
    entityType: "country_rule",
    entityId: "SY",
    details: {
      country: "Syria",
      change: "Added Bank Statement to required documents",
    },
    ipAddress: "192.168.1.1",
  },
  {
    id: "log5",
    timestamp: "2024-11-29T14:20:00",
    adminId: "admin3",
    adminName: "Mike Compliance",
    action: "document_approved",
    entityType: "document",
    entityId: "doc5",
    details: {
      contractorName: "Sara Ibrahim",
      documentType: "National ID",
      clientName: "TechWave LLC",
    },
    ipAddress: "192.168.1.8",
  },
  {
    id: "log6",
    timestamp: "2024-11-29T11:30:00",
    adminId: "admin2",
    adminName: "John Support",
    action: "manual_adjustment",
    entityType: "ledger",
    entityId: "c1",
    details: {
      contractorName: "Ahmed Hassan",
      adjustmentAmount: 500,
      reason: "Bonus for exceptional performance",
      balanceBefore: 5500,
      balanceAfter: 6000,
    },
    ipAddress: "192.168.1.5",
  },
  {
    id: "log7",
    timestamp: "2024-11-28T15:10:00",
    adminId: "admin1",
    adminName: "Sarah Admin",
    action: "document_approved",
    entityType: "document",
    entityId: "doc13",
    details: {
      contractorName: "Fatima Zahra",
      documentType: "National ID",
      clientName: "TechWave LLC",
    },
    ipAddress: "192.168.1.1",
  },
  {
    id: "log8",
    timestamp: "2024-11-28T12:00:00",
    adminId: "admin2",
    adminName: "John Support",
    action: "contract_created",
    entityType: "contract",
    entityId: "C-004",
    details: {
      contractorName: "Mohammed Ali",
      clientName: "Digital Solutions Ltd",
      amount: 7000,
    },
    ipAddress: "192.168.1.5",
  },
  {
    id: "log9",
    timestamp: "2024-11-27T16:30:00",
    adminId: "admin3",
    adminName: "Mike Compliance",
    action: "document_rejected",
    entityType: "document",
    entityId: "doc14",
    details: {
      contractorName: "Omar Khalil",
      documentType: "Passport",
      reason: "Expired document",
      clientName: "DesignCo",
    },
    ipAddress: "192.168.1.8",
  },
  {
    id: "log10",
    timestamp: "2024-11-27T14:15:00",
    adminId: "admin1",
    adminName: "Sarah Admin",
    action: "payroll_approved",
    entityType: "payroll_run",
    entityId: "PR-002",
    details: {
      clientName: "DesignCo",
      period: "November 2024",
      totalAmount: 8500,
      contractors: 3,
    },
    ipAddress: "192.168.1.1",
  },
  {
    id: "log11",
    timestamp: "2024-11-27T11:00:00",
    adminId: "admin2",
    adminName: "John Support",
    action: "document_approved",
    entityType: "document",
    entityId: "doc15",
    details: {
      contractorName: "Yasmin Al-Farsi",
      documentType: "Tax Certificate",
      clientName: "TechWave LLC",
    },
    ipAddress: "192.168.1.5",
  },
  {
    id: "log12",
    timestamp: "2024-11-26T17:45:00",
    adminId: "admin1",
    adminName: "Sarah Admin",
    action: "country_rule_updated",
    entityType: "country_rule",
    entityId: "AE",
    details: {
      country: "UAE",
      change: "Updated tax certificate requirements",
    },
    ipAddress: "192.168.1.1",
  },
  {
    id: "log13",
    timestamp: "2024-11-26T15:20:00",
    adminId: "admin3",
    adminName: "Mike Compliance",
    action: "contractor_onboarded",
    entityType: "contractor",
    entityId: "c10",
    details: {
      contractorName: "Aisha Rahman",
      country: "Bahrain",
      clientName: "TechWave LLC",
    },
    ipAddress: "192.168.1.8",
  },
  {
    id: "log14",
    timestamp: "2024-11-26T13:00:00",
    adminId: "admin2",
    adminName: "John Support",
    action: "manual_adjustment",
    entityType: "ledger",
    entityId: "c5",
    details: {
      contractorName: "Fatima Zahra",
      adjustmentAmount: -200,
      reason: "Correction for overpayment",
      balanceBefore: 7200,
      balanceAfter: 7000,
    },
    ipAddress: "192.168.1.5",
  },
  {
    id: "log15",
    timestamp: "2024-11-25T16:10:00",
    adminId: "admin1",
    adminName: "Sarah Admin",
    action: "document_approved",
    entityType: "document",
    entityId: "doc16",
    details: {
      contractorName: "Karim Mansour",
      documentType: "National ID",
      clientName: "Global Innovations Inc",
    },
    ipAddress: "192.168.1.1",
  },
  {
    id: "log16",
    timestamp: "2024-11-25T14:30:00",
    adminId: "admin3",
    adminName: "Mike Compliance",
    action: "payroll_processed",
    entityType: "payroll_run",
    entityId: "PR-003",
    details: {
      clientName: "StartupX",
      period: "October 2024",
      totalAmount: 5000,
      contractors: 2,
    },
    ipAddress: "192.168.1.8",
  },
  {
    id: "log17",
    timestamp: "2024-11-25T11:45:00",
    adminId: "admin2",
    adminName: "John Support",
    action: "contract_updated",
    entityType: "contract",
    entityId: "C-002",
    details: {
      contractorName: "Sara Ibrahim",
      change: "Extended end date to 2025-03-31",
      clientName: "Global Innovations Inc",
    },
    ipAddress: "192.168.1.5",
  },
  {
    id: "log18",
    timestamp: "2024-11-24T17:00:00",
    adminId: "admin1",
    adminName: "Sarah Admin",
    action: "document_rejected",
    entityType: "document",
    entityId: "doc17",
    details: {
      contractorName: "Tariq Al-Sayed",
      documentType: "Bank Statement",
      reason: "Insufficient information visible",
      clientName: "DesignCo",
    },
    ipAddress: "192.168.1.1",
  },
  {
    id: "log19",
    timestamp: "2024-11-24T14:20:00",
    adminId: "admin3",
    adminName: "Mike Compliance",
    action: "document_approved",
    entityType: "document",
    entityId: "doc18",
    details: {
      contractorName: "Dina Haddad",
      documentType: "Passport",
      clientName: "TechWave LLC",
    },
    ipAddress: "192.168.1.8",
  },
  {
    id: "log20",
    timestamp: "2024-11-24T10:30:00",
    adminId: "admin2",
    adminName: "John Support",
    action: "contractor_suspended",
    entityType: "contractor",
    entityId: "c11",
    details: {
      contractorName: "Tariq Al-Sayed",
      reason: "Failed compliance check",
      clientName: "DesignCo",
    },
    ipAddress: "192.168.1.5",
  },
];

// Mock country rules
export const mockCountryRules: Record<string, CountryRule> = {
  SY: {
    countryCode: "SY",
    countryName: "Syria",
    requiredDocuments: ["Passport", "Tax ID", "Proof of Address"],
    optionalDocuments: ["Bank Statement"],
    currency: "SYP",
  },
  EG: {
    countryCode: "EG",
    countryName: "Egypt",
    requiredDocuments: ["National ID", "Tax Certificate", "Proof of Address"],
    optionalDocuments: ["Passport", "Bank Statement"],
    currency: "EGP",
  },
  AE: {
    countryCode: "AE",
    countryName: "United Arab Emirates",
    requiredDocuments: ["Emirates ID", "Passport", "Proof of Address"],
    optionalDocuments: ["Bank Statement"],
    currency: "AED",
  },
  SA: {
    countryCode: "SA",
    countryName: "Saudi Arabia",
    requiredDocuments: ["National ID", "Passport", "Tax ID"],
    optionalDocuments: ["Proof of Address", "Bank Statement"],
    currency: "SAR",
  },
  JO: {
    countryCode: "JO",
    countryName: "Jordan",
    requiredDocuments: ["National ID", "Tax ID", "Proof of Address"],
    optionalDocuments: ["Passport", "Bank Statement"],
    currency: "JOD",
  },
  LB: {
    countryCode: "LB",
    countryName: "Lebanon",
    requiredDocuments: ["National ID", "Passport", "Proof of Address"],
    optionalDocuments: ["Tax ID", "Bank Statement"],
    currency: "LBP",
  },
  IQ: {
    countryCode: "IQ",
    countryName: "Iraq",
    requiredDocuments: ["National ID", "Passport", "Proof of Address"],
    optionalDocuments: ["Tax ID", "Bank Statement"],
    currency: "IQD",
  },
  KW: {
    countryCode: "KW",
    countryName: "Kuwait",
    requiredDocuments: ["Civil ID", "Passport", "Proof of Address"],
    optionalDocuments: ["Tax ID", "Bank Statement"],
    currency: "KWD",
  },
  QA: {
    countryCode: "QA",
    countryName: "Qatar",
    requiredDocuments: ["Qatar ID", "Passport", "Proof of Address"],
    optionalDocuments: ["Tax ID", "Bank Statement"],
    currency: "QAR",
  },
  BH: {
    countryCode: "BH",
    countryName: "Bahrain",
    requiredDocuments: ["CPR Card", "Passport", "Proof of Address"],
    optionalDocuments: ["Tax ID", "Bank Statement"],
    currency: "BHD",
  },
  OM: {
    countryCode: "OM",
    countryName: "Oman",
    requiredDocuments: ["Oman ID", "Passport", "Proof of Address"],
    optionalDocuments: ["Tax ID", "Bank Statement"],
    currency: "OMR",
  },
  YE: {
    countryCode: "YE",
    countryName: "Yemen",
    requiredDocuments: ["National ID", "Passport", "Proof of Address"],
    optionalDocuments: ["Tax ID", "Bank Statement"],
    currency: "YER",
  },
  MA: {
    countryCode: "MA",
    countryName: "Morocco",
    requiredDocuments: ["National ID", "Passport", "Proof of Address"],
    optionalDocuments: ["Tax ID", "Bank Statement"],
    currency: "MAD",
  },
  TN: {
    countryCode: "TN",
    countryName: "Tunisia",
    requiredDocuments: ["National ID", "Passport", "Proof of Address"],
    optionalDocuments: ["Tax ID", "Bank Statement"],
    currency: "TND",
  },
  DZ: {
    countryCode: "DZ",
    countryName: "Algeria",
    requiredDocuments: ["National ID", "Passport", "Proof of Address"],
    optionalDocuments: ["Tax ID", "Bank Statement"],
    currency: "DZD",
  },
  LY: {
    countryCode: "LY",
    countryName: "Libya",
    requiredDocuments: ["National ID", "Passport", "Proof of Address"],
    optionalDocuments: ["Tax ID", "Bank Statement"],
    currency: "LYD",
  },
  PS: {
    countryCode: "PS",
    countryName: "Palestine",
    requiredDocuments: ["National ID", "Passport", "Proof of Address"],
    optionalDocuments: ["Tax ID", "Bank Statement"],
    currency: "ILS",
  },
  IL: {
    countryCode: "IL",
    countryName: "Israel",
    requiredDocuments: ["ID Card", "Passport", "Proof of Address"],
    optionalDocuments: ["Tax ID", "Bank Statement"],
    currency: "ILS",
  },
  TR: {
    countryCode: "TR",
    countryName: "Turkey",
    requiredDocuments: ["National ID", "Passport", "Proof of Address"],
    optionalDocuments: ["Tax ID", "Bank Statement"],
    currency: "TRY",
  },
};

// Mock platform analytics
export const mockPlatformAnalytics: PlatformAnalytics = {
  totalRevenue: {
    thisMonth: 125000,
    lastMonth: 98000,
    allTime: 1250000,
  },
  activeUsers: {
    clients: 45,
    contractors: 230,
    adminUsers: 8,
  },
  growthMetrics: {
    revenueGrowth: 27.5,
    clientGrowth: 15.2,
    contractorGrowth: 22.1,
  },
  documentMetrics: {
    pending: 4,
    approved: 156,
    rejected: 12,
    avgReviewTime: 1.8,
  },
  payrollMetrics: {
    runsThisMonth: 12,
    totalProcessed: 125000,
    avgProcessingTime: 24,
  },
};

// Mock contractor balances
export const mockContractorBalances: ContractorBalance[] = [
  {
    contractorId: "c1",
    contractorName: "Ahmed Hassan",
    contractorEmail: "ahmed@example.com",
    currentBalance: 6000,
    totalEarned: 20000,
    totalWithdrawn: 14000,
    currency: "USD",
    lastTransaction: "2024-11-30",
    clientName: "TechWave LLC",
  },
  {
    contractorId: "c2",
    contractorName: "Sara Ibrahim",
    contractorEmail: "sara@example.com",
    currentBalance: 9000,
    totalEarned: 18000,
    totalWithdrawn: 9000,
    currency: "USD",
    lastTransaction: "2024-11-30",
    clientName: "TechWave LLC",
  },
  {
    contractorId: "c3",
    contractorName: "Layla Mostafa",
    contractorEmail: "layla@example.com",
    currentBalance: 3000,
    totalEarned: 5000,
    totalWithdrawn: 2000,
    currency: "USD",
    lastTransaction: "2024-11-25",
    clientName: "TechWave LLC",
  },
  {
    contractorId: "c5",
    contractorName: "Fatima Zahra",
    contractorEmail: "fatima@example.com",
    currentBalance: 8500,
    totalEarned: 12000,
    totalWithdrawn: 3500,
    currency: "USD",
    lastTransaction: "2024-11-30",
    clientName: "TechWave LLC",
  },
  {
    contractorId: "c6",
    contractorName: "Omar Khalil",
    contractorEmail: "omar@example.com",
    currentBalance: 12500,
    totalEarned: 35000,
    totalWithdrawn: 22500,
    currency: "USD",
    lastTransaction: "2024-11-28",
    clientName: "DesignCo",
  },
];

// Mock admin users
export const mockAdminUsers: AdminUser[] = [
  {
    id: "admin1",
    name: "Sarah Admin",
    email: "sarah@mindlinks.com",
    role: "super_admin",
    status: "active",
    lastLogin: "2024-11-30T14:30:00",
    actionsCount: 1247,
  },
  {
    id: "admin2",
    name: "John Support",
    email: "john@mindlinks.com",
    role: "support_admin",
    status: "active",
    lastLogin: "2024-11-30T10:15:00",
    actionsCount: 832,
  },
  {
    id: "admin3",
    name: "Mike Compliance",
    email: "mike@mindlinks.com",
    role: "compliance_admin",
    status: "active",
    lastLogin: "2024-11-29T16:45:00",
    actionsCount: 1089,
  },
  {
    id: "admin4",
    name: "Lisa Manager",
    email: "lisa@mindlinks.com",
    role: "super_admin",
    status: "active",
    lastLogin: "2024-11-29T09:20:00",
    actionsCount: 956,
  },
];

// Mock system alerts
export const mockSystemAlerts: SystemAlert[] = [
  {
    id: "alert1",
    type: "warning",
    title: "High Volume of Pending Documents",
    message: "4 documents have been pending review for more than 3 days",
    timestamp: "2024-11-30T08:00:00",
    resolved: false,
  },
  {
    id: "alert2",
    type: "info",
    title: "Monthly Payroll Deadline Approaching",
    message: "3 clients have payroll runs due within the next 48 hours",
    timestamp: "2024-11-29T15:00:00",
    resolved: false,
  },
  {
    id: "alert3",
    type: "error",
    title: "Payment Processing Issue Resolved",
    message: "Stripe webhook delay has been resolved. All payments are now processing normally.",
    timestamp: "2024-11-28T11:30:00",
    resolved: true,
  },
];

// Extended payroll runs with client info
export interface PayrollRunWithClient extends PayrollRun {
  clientId: string;
  clientName: string;
}

// Entity Information
export interface EntityInfo {
  countryOfIncorporation: string;
  legalEntityNameOriginal?: string;
  entityName: string;
  entityType: string;
  isForeignEntity?: boolean;
  industryCategory: string;
  phone: {
    dialCode: string;
    number: string;
  };
  taxId: string;
  licenseNumber: string;
  businessCode?: string;
  registeredAddress: {
    line1: string;
    line2?: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  operatingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    postalCode: string;
    country: string;
  };
  useDeelContractor?: boolean;
  useDeelCOR?: boolean;
  useDeelEOR?: boolean;
  pocDesignated?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

// Client Company Profiles
export interface ClientProfile {
  id: string;
  companyName: string;
  logo?: string;
  country: string;
  industry: string;
  productsServices: string;
  workType: string;
  companyWebsite?: string;
  companyLinkedIn?: string;
  personalLinkedIn?: string;
  pointOfContact: {
    firstName: string;
    lastName: string;
    email: string;
  };
  registrationDate: string;
  status: "active" | "pending_review" | "suspended";
  activeContracts: number;
  totalContractors: number;
  monthlySpend: number;
  documents: ClientDocument[];
  verificationStatus: "verified" | "pending" | "incomplete";
  entityInfo?: EntityInfo;
}

export const mockClientProfiles: ClientProfile[] = [
  {
    id: "client1",
    companyName: "TechWave LLC",
    logo: generateLogoUrl("TechWave LLC"),
    country: "United States",
    industry: "Technology / Software",
    productsServices: "We build enterprise SaaS solutions for healthcare providers, focusing on patient management systems, electronic health records (EHR), and telemedicine platforms.",
    workType: "We're expanding our development team and need skilled frontend developers (React/Vue), backend engineers (Node.js/Python), and UX/UI designers to work on multiple client projects simultaneously.",
    companyWebsite: "https://techwave.com",
    companyLinkedIn: "https://linkedin.com/company/techwave",
    personalLinkedIn: "https://linkedin.com/in/john-smith-ceo",
    pointOfContact: {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@techwave.com"
    },
    registrationDate: "2024-01-15",
    status: "active",
    activeContracts: 5,
    totalContractors: 5,
    monthlySpend: 25000,
    documents: mockClientDocuments.slice(0, 2),
    verificationStatus: "verified",
    entityInfo: {
      countryOfIncorporation: "United States",
      entityName: "TechWave LLC",
      entityType: "Limited Liability Company (LLC)",
      industryCategory: "Technology / Software Development",
      phone: {
        dialCode: "+1",
        number: "555-0123"
      },
      taxId: "US-TAX-123456789",
      licenseNumber: "LLC-2024-001234",
      businessCode: "NAICS-541511",
      registeredAddress: {
        line1: "1234 Innovation Drive",
        line2: "Suite 500",
        city: "San Francisco",
        province: "California",
        postalCode: "94105",
        country: "United States"
      },
      operatingAddress: {
        line1: "1234 Innovation Drive",
        line2: "Suite 500",
        city: "San Francisco",
        postalCode: "94105",
        country: "United States"
      },
      useDeelContractor: true,
      useDeelCOR: true,
      pocDesignated: {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@techwave.com"
      }
    }
  },
  {
    id: "client2",
    companyName: "Global Innovations Inc",
    logo: generateLogoUrl("Global Innovations Inc"),
    country: "United Kingdom",
    industry: "E-commerce",
    productsServices: "Leading e-commerce platform specializing in sustainable fashion and eco-friendly products. We connect conscious consumers with ethical brands worldwide.",
    workType: "Looking for full-stack developers experienced with microservices architecture, DevOps engineers for our Kubernetes infrastructure, and data analysts to optimize our recommendation engine.",
    companyWebsite: "https://globalinnovations.co.uk",
    companyLinkedIn: "https://linkedin.com/company/global-innovations",
    pointOfContact: {
      firstName: "Emily",
      lastName: "Watson",
      email: "emily.watson@globalinnovations.co.uk"
    },
    registrationDate: "2024-02-20",
    status: "active",
    activeContracts: 3,
    totalContractors: 3,
    monthlySpend: 18000,
    documents: mockClientDocuments.slice(0, 1),
    verificationStatus: "verified",
    entityInfo: {
      countryOfIncorporation: "United Kingdom",
      entityName: "Global Innovations Inc",
      entityType: "Private Limited Company",
      industryCategory: "E-commerce / Retail",
      phone: {
        dialCode: "+44",
        number: "20-7946-0958"
      },
      taxId: "GB-987654321",
      licenseNumber: "UK-REG-567890",
      registeredAddress: {
        line1: "45 Tech Hub Street",
        city: "London",
        province: "Greater London",
        postalCode: "EC1A 1BB",
        country: "United Kingdom"
      },
      useDeelContractor: true,
      useDeelEOR: true
    }
  },
  {
    id: "client3",
    companyName: "Digital Solutions Ltd",
    logo: generateLogoUrl("Digital Solutions Ltd"),
    country: "Canada",
    industry: "Digital Marketing",
    productsServices: "Full-service digital marketing agency providing SEO, content marketing, social media management, and performance marketing solutions for B2B and B2C clients.",
    workType: "We need creative content writers, SEO specialists, social media managers, and graphic designers to support our growing client base across North America.",
    companyWebsite: "https://digitalsolutions.ca",
    companyLinkedIn: "https://linkedin.com/company/digital-solutions-ltd",
    pointOfContact: {
      firstName: "Michael",
      lastName: "Chen",
      email: "m.chen@digitalsolutions.ca"
    },
    registrationDate: "2024-03-10",
    status: "active",
    activeContracts: 2,
    totalContractors: 4,
    monthlySpend: 12000,
    documents: [],
    verificationStatus: "pending",
    entityInfo: {
      countryOfIncorporation: "Canada",
      entityName: "Digital Solutions Ltd",
      entityType: "Corporation",
      industryCategory: "Marketing / Advertising",
      phone: {
        dialCode: "+1",
        number: "416-555-7890"
      },
      taxId: "CA-BN-123456789",
      licenseNumber: "ON-CORP-456789",
      registeredAddress: {
        line1: "789 Marketing Avenue",
        city: "Toronto",
        province: "Ontario",
        postalCode: "M5H 2N2",
        country: "Canada"
      },
      useDeelContractor: true
    }
  },
  {
    id: "client4",
    companyName: "StartupHub Co",
    logo: generateLogoUrl("StartupHub Co"),
    country: "Germany",
    industry: "FinTech",
    productsServices: "Innovative fintech startup building next-generation payment processing solutions and digital wallet services for European markets.",
    workType: "Seeking blockchain developers, mobile app developers (iOS/Android), and compliance specialists familiar with EU financial regulations.",
    companyWebsite: "https://startuphub.de",
    pointOfContact: {
      firstName: "Anna",
      lastName: "Mueller",
      email: "anna@startuphub.de"
    },
    registrationDate: "2024-04-05",
    status: "pending_review",
    activeContracts: 1,
    totalContractors: 2,
    monthlySpend: 8000,
    documents: mockClientDocuments.slice(2, 3),
    verificationStatus: "incomplete",
    entityInfo: {
      countryOfIncorporation: "Germany",
      entityName: "StartupHub GmbH",
      legalEntityNameOriginal: "StartupHub Co",
      entityType: "GmbH (Limited Liability Company)",
      isForeignEntity: false,
      industryCategory: "Financial Technology / Payments",
      phone: {
        dialCode: "+49",
        number: "30-12345678"
      },
      taxId: "DE-123456789",
      licenseNumber: "HRB-98765",
      businessCode: "WZ-6419",
      registeredAddress: {
        line1: "Alexanderplatz 1",
        city: "Berlin",
        province: "Berlin",
        postalCode: "10178",
        country: "Germany"
      },
      useDeelContractor: true,
      useDeelCOR: false,
      useDeelEOR: true
    }
  },
  {
    id: "client5",
    companyName: "StartupHub Co",
    logo: generateLogoUrl("StartupHub Co"),
    country: "Canada",
    industry: "Business Services",
    productsServices: "Accelerator and incubator services for early-stage startups",
    workType: "Need business analysts, project managers, and software developers for startup coaching",
    companyWebsite: "https://startuphub.ca",
    companyLinkedIn: "https://linkedin.com/company/startuphub",
    personalLinkedIn: "https://linkedin.com/in/sarah-chen",
    pointOfContact: {
      firstName: "Sarah",
      lastName: "Chen",
      email: "sarah.chen@startuphub.ca"
    },
    registrationDate: "2024-03-20",
    status: "active",
    activeContracts: 3,
    totalContractors: 3,
    monthlySpend: 15000,
    documents: mockClientDocuments.slice(0, 2),
    verificationStatus: "verified",
    entityInfo: {
      countryOfIncorporation: "Canada",
      entityName: "StartupHub Co",
      entityType: "Corporation",
      industryCategory: "Business Services",
      phone: { dialCode: "+1", number: "416-555-0156" },
      taxId: "CA-TAX-789012",
      licenseNumber: "CA-2024-005678",
      businessCode: "NAICS-561000",
      registeredAddress: {
        line1: "789 Bay Street",
        city: "Toronto",
        province: "Ontario",
        postalCode: "M5G 2N8",
        country: "Canada"
      },
      operatingAddress: {
        line1: "789 Bay Street",
        city: "Toronto",
        postalCode: "M5G 2N8",
        country: "Canada"
      },
      useDeelContractor: true,
      useDeelCOR: false,
      useDeelEOR: false
    }
  },
  {
    id: "client6",
    companyName: "FinTech Solutions Ltd",
    logo: generateLogoUrl("FinTech Solutions Ltd"),
    country: "Singapore",
    industry: "Financial Services",
    productsServices: "Payment processing and banking software solutions",
    workType: "Seeking blockchain developers, security engineers, and DevOps specialists",
    companyWebsite: "https://fintechsolutions.sg",
    companyLinkedIn: "https://linkedin.com/company/fintechsolutions",
    personalLinkedIn: "https://linkedin.com/in/raj-patel",
    pointOfContact: {
      firstName: "Raj",
      lastName: "Patel",
      email: "raj.patel@fintechsolutions.sg"
    },
    registrationDate: "2024-02-10",
    status: "active",
    activeContracts: 6,
    totalContractors: 8,
    monthlySpend: 32000,
    documents: mockClientDocuments.slice(0, 2),
    verificationStatus: "verified",
    entityInfo: {
      countryOfIncorporation: "Singapore",
      entityName: "FinTech Solutions Pte Ltd",
      entityType: "Private Limited Company",
      industryCategory: "Financial Technology",
      phone: { dialCode: "+65", number: "6789-1234" },
      taxId: "SG-TAX-456789",
      licenseNumber: "SG-2024-003456",
      businessCode: "SSIC-64190",
      registeredAddress: {
        line1: "50 Raffles Place",
        line2: "#32-01",
        city: "Singapore",
        postalCode: "048623",
        country: "Singapore"
      },
      operatingAddress: {
        line1: "50 Raffles Place",
        line2: "#32-01",
        city: "Singapore",
        postalCode: "048623",
        country: "Singapore"
      },
      useDeelContractor: true,
      useDeelCOR: true,
      useDeelEOR: false
    }
  },
  {
    id: "client7",
    companyName: "GreenTech Industries",
    logo: generateLogoUrl("GreenTech Industries"),
    country: "Sweden",
    industry: "Clean Energy",
    productsServices: "Renewable energy solutions and sustainability consulting",
    workType: "Environmental engineers, data scientists, and IoT developers needed",
    companyWebsite: "https://greentech.se",
    companyLinkedIn: "https://linkedin.com/company/greentech-industries",
    personalLinkedIn: "https://linkedin.com/in/anna-berg",
    pointOfContact: {
      firstName: "Anna",
      lastName: "Berg",
      email: "anna.berg@greentech.se"
    },
    registrationDate: "2024-01-05",
    status: "active",
    activeContracts: 4,
    totalContractors: 5,
    monthlySpend: 20000,
    documents: mockClientDocuments.slice(0, 2),
    verificationStatus: "verified",
    entityInfo: {
      countryOfIncorporation: "Sweden",
      entityName: "GreenTech Industries AB",
      entityType: "Aktiebolag (AB)",
      industryCategory: "Clean Energy",
      phone: { dialCode: "+46", number: "8-123-4567" },
      taxId: "SE-VAT-556789-0123",
      licenseNumber: "SE-2024-001234",
      businessCode: "SNI-35110",
      registeredAddress: {
        line1: "Storgatan 15",
        city: "Stockholm",
        postalCode: "114 51",
        country: "Sweden"
      },
      operatingAddress: {
        line1: "Storgatan 15",
        city: "Stockholm",
        postalCode: "114 51",
        country: "Sweden"
      },
      useDeelContractor: true,
      useDeelCOR: false,
      useDeelEOR: true
    }
  },
  {
    id: "client8",
    companyName: "MediaCraft Studios",
    logo: generateLogoUrl("MediaCraft Studios"),
    country: "Australia",
    industry: "Media & Entertainment",
    productsServices: "Video production, animation, and digital content creation",
    workType: "Video editors, 3D animators, and motion graphics designers",
    companyWebsite: "https://mediacraftstudios.com.au",
    companyLinkedIn: "https://linkedin.com/company/mediacraftstudios",
    personalLinkedIn: "https://linkedin.com/in/james-cooper",
    pointOfContact: {
      firstName: "James",
      lastName: "Cooper",
      email: "james.cooper@mediacraftstudios.com.au"
    },
    registrationDate: "2024-04-15",
    status: "pending_review",
    activeContracts: 2,
    totalContractors: 2,
    monthlySpend: 8500,
    documents: mockClientDocuments.slice(0, 1),
    verificationStatus: "pending",
    entityInfo: {
      countryOfIncorporation: "Australia",
      entityName: "MediaCraft Studios Pty Ltd",
      entityType: "Proprietary Limited Company",
      industryCategory: "Media Production",
      phone: { dialCode: "+61", number: "2-9876-5432" },
      taxId: "AU-ABN-12-345-678-901",
      licenseNumber: "AU-2024-007890",
      businessCode: "ANZSIC-5921",
      registeredAddress: {
        line1: "Level 8, 123 George Street",
        city: "Sydney",
        province: "New South Wales",
        postalCode: "2000",
        country: "Australia"
      },
      operatingAddress: {
        line1: "Level 8, 123 George Street",
        city: "Sydney",
        postalCode: "2000",
        country: "Australia"
      },
      useDeelContractor: true,
      useDeelCOR: false,
      useDeelEOR: false
    }
  },
  {
    id: "client9",
    companyName: "HealthPlus Medical",
    logo: generateLogoUrl("HealthPlus Medical"),
    country: "United States",
    industry: "Healthcare",
    productsServices: "Telemedicine platform and healthcare management software",
    workType: "Healthcare IT specialists, HIPAA compliance experts, and mobile app developers",
    companyWebsite: "https://healthplusmedical.com",
    companyLinkedIn: "https://linkedin.com/company/healthplusmedical",
    personalLinkedIn: "https://linkedin.com/in/dr-lisa-martinez",
    pointOfContact: {
      firstName: "Lisa",
      lastName: "Martinez",
      email: "lisa.martinez@healthplusmedical.com"
    },
    registrationDate: "2024-02-28",
    status: "active",
    activeContracts: 7,
    totalContractors: 9,
    monthlySpend: 38000,
    documents: mockClientDocuments.slice(0, 2),
    verificationStatus: "verified",
    entityInfo: {
      countryOfIncorporation: "United States",
      entityName: "HealthPlus Medical Inc.",
      entityType: "Corporation",
      industryCategory: "Healthcare Technology",
      phone: { dialCode: "+1", number: "617-555-0199" },
      taxId: "US-EIN-98-7654321",
      licenseNumber: "US-2024-009876",
      businessCode: "NAICS-621111",
      registeredAddress: {
        line1: "500 Boylston Street",
        line2: "Suite 1200",
        city: "Boston",
        province: "Massachusetts",
        postalCode: "02116",
        country: "United States"
      },
      operatingAddress: {
        line1: "500 Boylston Street",
        line2: "Suite 1200",
        city: "Boston",
        postalCode: "02116",
        country: "United States"
      },
      useDeelContractor: true,
      useDeelCOR: true,
      useDeelEOR: true
    }
  },
  {
    id: "client10",
    companyName: "EduTech Academy",
    logo: generateLogoUrl("EduTech Academy"),
    country: "United Kingdom",
    industry: "Education Technology",
    productsServices: "Online learning platform and educational content creation",
    workType: "Instructional designers, full-stack developers, and content writers",
    companyWebsite: "https://edutechacademy.co.uk",
    companyLinkedIn: "https://linkedin.com/company/edutechacademy",
    personalLinkedIn: "https://linkedin.com/in/david-thompson",
    pointOfContact: {
      firstName: "David",
      lastName: "Thompson",
      email: "david.thompson@edutechacademy.co.uk"
    },
    registrationDate: "2024-03-10",
    status: "active",
    activeContracts: 5,
    totalContractors: 6,
    monthlySpend: 22000,
    documents: mockClientDocuments.slice(0, 2),
    verificationStatus: "verified",
    entityInfo: {
      countryOfIncorporation: "United Kingdom",
      entityName: "EduTech Academy Ltd",
      entityType: "Private Limited Company",
      industryCategory: "Education Technology",
      phone: { dialCode: "+44", number: "20-7946-0958" },
      taxId: "GB-VAT-123456789",
      licenseNumber: "UK-2024-005432",
      businessCode: "SIC-62011",
      registeredAddress: {
        line1: "25 King Street",
        city: "London",
        postalCode: "WC2E 8JD",
        country: "United Kingdom"
      },
      operatingAddress: {
        line1: "25 King Street",
        city: "London",
        postalCode: "WC2E 8JD",
        country: "United Kingdom"
      },
      useDeelContractor: true,
      useDeelCOR: false,
      useDeelEOR: true
    }
  }
];

export const mockAdminPayrollRuns: PayrollRunWithClient[] = [
  {
    ...mockPayrollRuns[0],
    clientId: "client1",
    clientName: "TechWave LLC",
  },
  {
    ...mockPayrollRuns[1],
    clientId: "client1",
    clientName: "TechWave LLC",
  },
  {
    id: "PR-003",
    period: "November 2024",
    startDate: "2024-11-01",
    endDate: "2024-11-30",
    contractors: 3,
    totalAmount: 8500,
    status: "approved",
    createdAt: "2024-11-28",
    lineItems: [],
    clientId: "client2",
    clientName: "DesignCo",
  },
  {
    id: "PR-004",
    period: "November 2024",
    startDate: "2024-11-01",
    endDate: "2024-11-30",
    contractors: 2,
    totalAmount: 5000,
    status: "processed",
    createdAt: "2024-11-27",
    processedAt: "2024-11-29",
    lineItems: [],
    clientId: "client3",
    clientName: "StartupX",
  },
  {
    id: "PR-005",
    period: "September 2024",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    contractors: 4,
    totalAmount: 11000,
    status: "processed",
    createdAt: "2024-09-28",
    processedAt: "2024-09-30",
    lineItems: [],
    clientId: "client1",
    clientName: "TechWave LLC",
  },
  {
    id: "PR-006",
    period: "September 2024",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    contractors: 2,
    totalAmount: 6500,
    status: "processed",
    createdAt: "2024-09-28",
    processedAt: "2024-10-01",
    lineItems: [],
    clientId: "client2",
    clientName: "DesignCo",
  },
  {
    id: "PR-007",
    period: "August 2024",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    contractors: 3,
    totalAmount: 9500,
    status: "processed",
    createdAt: "2024-08-28",
    processedAt: "2024-08-31",
    lineItems: [],
    clientId: "client1",
    clientName: "TechWave LLC",
  },
  {
    id: "PR-008",
    period: "August 2024",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    contractors: 2,
    totalAmount: 7000,
    status: "processed",
    createdAt: "2024-08-28",
    processedAt: "2024-09-01",
    lineItems: [],
    clientId: "client3",
    clientName: "StartupX",
  },
  {
    id: "PR-009",
    period: "July 2024",
    startDate: "2024-07-01",
    endDate: "2024-07-31",
    contractors: 4,
    totalAmount: 13000,
    status: "processed",
    createdAt: "2024-07-28",
    processedAt: "2024-07-31",
    lineItems: [],
    clientId: "client1",
    clientName: "TechWave LLC",
  },
  {
    id: "PR-010",
    period: "December 2024",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    contractors: 5,
    totalAmount: 14500,
    status: "draft",
    createdAt: "2024-11-30",
    lineItems: [],
    clientId: "client1",
    clientName: "TechWave LLC",
  },
  {
    id: "PR-011",
    period: "December 2024",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    contractors: 3,
    totalAmount: 9000,
    status: "approved",
    createdAt: "2024-11-30",
    lineItems: [],
    clientId: "client2",
    clientName: "DesignCo",
  },
  {
    id: "PR-012",
    period: "October 2024",
    startDate: "2024-10-01",
    endDate: "2024-10-31",
    contractors: 3,
    totalAmount: 8500,
    status: "processed",
    createdAt: "2024-10-28",
    processedAt: "2024-10-31",
    lineItems: [],
    clientId: "client2",
    clientName: "DesignCo",
  },
];

