// Admin-specific type definitions
import { type PayrollRun } from "@/shared/types/common";

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

// Extended payroll runs with client info
export interface PayrollRunWithClient extends PayrollRun {
  clientId: string;
  clientName: string;
}











