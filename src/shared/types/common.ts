// Shared Type Definitions

// Helper function to generate logo URL from initials (circular avatars with professional colors)
export const generateLogoUrl = (name: string, type: "company" | "person" = "company"): string => {
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

// KYC & Compliance Types
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

// Contractor Types
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

// Contract Types
export interface Milestone {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: "pending" | "completed" | "approved";
  completedDate?: string;
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

// Payroll Types
export interface Adjustment {
  id: string;
  type: "bonus" | "deduction" | "correction";
  amount: number;
  reason: string;
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

// Transaction Types
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

// Activity & Notification Types
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

// Document Types
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

// Client Profile Types
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











