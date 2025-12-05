import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Globe,
  Link,
  User,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  Phone,
  CheckCircle2,
  Shield,
  Send,
  XCircle,
  Calendar,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { mockClientProfiles } from "@/data/mockData";

// Common document types for companies
const COMMON_DOCUMENT_TYPES = [
  "Business License",
  "Tax Registration Certificate",
  "Employer Registration Certificate",
  "Certificate of Incorporation",
  "Articles of Association",
  "Memorandum of Association",
  "Bank Statement",
  "Proof of Address",
  "Identity Document",
  "Power of Attorney",
  "Compliance Certificate",
  "Insurance Certificate",
  "Other"
];

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const foundClient = mockClientProfiles.find(c => c.id === id);
  const [client, setClient] = useState(foundClient);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>("");
  const [requestNotes, setRequestNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedDocumentForReject, setSelectedDocumentForReject] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState<string>("");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  if (!client) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Client Not Found</h2>
          <p className="text-muted-foreground mb-4">The client profile you are looking for does not exist.</p>
          <Button onClick={() => navigate("/admin-dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-700 hover:bg-emerald-800">Active</Badge>;
      case "pending_review":
        return <Badge variant="secondary" className="text-amber-700 bg-amber-50 border-amber-200">Pending Review</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex gap-1 items-center">
            <CheckCircle2 className="h-3 w-3" /> Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex gap-1 items-center">
            <Clock className="h-3 w-3" /> Verification Pending
          </Badge>
        );
      case "incomplete":
        return (
          <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 flex gap-1 items-center">
            <AlertTriangle className="h-3 w-3" /> Incomplete
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleRequestDocument = async () => {
    if (!selectedDocumentType) {
      toast({
        title: "Document Type Required",
        description: "Please select a document type to request.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setRequestDialogOpen(false);
      setSelectedDocumentType("");
      setRequestNotes("");
      
      toast({
        title: "Document Request Sent",
        description: `A request for ${selectedDocumentType} has been sent to ${client?.companyName}. They will receive a notification to upload the document.`,
      });
    }, 1000);
  };

  const handleApproveDocument = (docId: string) => {
    if (!client) return;
    
    const updatedDocuments = client.documents.map(doc =>
      doc.id === docId
        ? { ...doc, status: "approved" as const, reviewedDate: new Date().toISOString() }
        : doc
    );
    
    setClient({ ...client, documents: updatedDocuments });
    
    const doc = client.documents.find(d => d.id === docId);
    toast({
      title: "Document Approved",
      description: `${doc?.type} has been approved successfully.`,
    });
  };

  const handleRejectDocument = () => {
    if (!client || !selectedDocumentForReject) return;
    
    if (!rejectReason.trim()) {
      toast({
        title: "Rejection Reason Required",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      });
      return;
    }

    const updatedDocuments = client.documents.map(doc =>
      doc.id === selectedDocumentForReject
        ? { ...doc, status: "rejected" as const, reviewedDate: new Date().toISOString() }
        : doc
    );
    
    setClient({ ...client, documents: updatedDocuments });
    
    const doc = client.documents.find(d => d.id === selectedDocumentForReject);
    toast({
      title: "Document Rejected",
      description: `${doc?.type} has been rejected. The client will be notified with the reason.`,
      variant: "destructive",
    });
    
    setRejectDialogOpen(false);
    setSelectedDocumentForReject(null);
    setRejectReason("");
  };

  const handleExpireDocument = (docId: string) => {
    if (!client) return;
    
    const updatedDocuments = client.documents.map(doc =>
      doc.id === docId
        ? { ...doc, status: "expired" as const, reviewedDate: new Date().toISOString() }
        : doc
    );
    
    setClient({ ...client, documents: updatedDocuments });
    
    const doc = client.documents.find(d => d.id === docId);
    toast({
      title: "Document Marked as Expired",
      description: `${doc?.type} has been marked as expired. The client will be notified to upload a new document.`,
    });
  };

  const handleChangeDocumentStatus = (docId: string, newStatus: "approved" | "pending" | "rejected" | "expired", reason?: string) => {
    if (!client) return;

    const updatedDocuments = client.documents.map(doc =>
      doc.id === docId
        ? { 
            ...doc, 
            status: newStatus, 
            reviewedDate: newStatus !== "pending" ? new Date().toISOString() : doc.reviewedDate 
          }
        : doc
    );
    
    setClient({ ...client, documents: updatedDocuments });
    
    const doc = client.documents.find(d => d.id === docId);
    const statusMessages = {
      approved: `${doc?.type} has been approved successfully.`,
      rejected: `${doc?.type} has been rejected.${reason ? ` Reason: ${reason}` : ''}`,
      expired: `${doc?.type} has been marked as expired. The client will be notified to upload a new document.`,
      pending: `${doc?.type} status has been changed to pending.`,
    };

    toast({
      title: `Document ${newStatus === "approved" ? "Approved" : newStatus === "rejected" ? "Rejected" : newStatus === "expired" ? "Expired" : "Status Changed"}`,
      description: statusMessages[newStatus],
      variant: newStatus === "rejected" ? "destructive" : "default",
    });

    setViewDialogOpen(false);
    setSelectedDocument(null);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      case "expired":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin-dashboard")} className="hover:bg-muted/50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-3">
              {client.logo ? (
                <div className="h-9 w-9 rounded-lg border border-border/30 flex items-center justify-center overflow-hidden bg-background shadow-sm">
                  <img
                    src={client.logo}
                    alt={client.companyName}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.classList.add('hidden');
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                  <div className="h-full w-full hidden items-center justify-center bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100">
                    <span className="text-xs font-bold text-slate-700">
                      {client.companyName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 border border-slate-200/30 flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-slate-700">
                    {client.companyName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-sm font-semibold text-foreground">{client.companyName}</h1>
                <p className="text-xs text-muted-foreground">Client Profile</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {client.status === "pending_review" && (
              <>
                <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/5 hover:border-destructive">
                  Reject
                </Button>
                <Button className="bg-emerald-700 hover:bg-emerald-800 shadow-sm">
                  Approve Client
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar Info */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Card className="border border-border/30 shadow-sm bg-gradient-to-br from-background to-muted/10">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-5">
                    <div className="h-32 w-32 rounded-full border-4 border-background shadow-xl ring-4 ring-slate-200/50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 relative">
                      {client.logo ? (
                        <>
                          <img 
                            src={client.logo} 
                            alt={client.companyName}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.classList.add('hidden');
                              const fallback = target.nextElementSibling as HTMLElement;
                              if (fallback) fallback.classList.remove('hidden');
                            }}
                          />
                          <div className="h-full w-full hidden items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 absolute inset-0">
                            <span className="text-4xl font-bold text-slate-700">
                              {client.companyName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </span>
                          </div>
                        </>
                      ) : (
                        <span className="text-4xl font-bold text-slate-700">
                          {client.companyName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    {client.verificationStatus === "verified" && (
                      <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-emerald-500 border-3 border-background shadow-lg flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">{client.companyName}</h2>
                  <div className="flex items-center gap-2 mb-6">
                    {getStatusBadge(client.status)}
                    {getVerificationBadge(client.verificationStatus)}
                  </div>
                  <div className="grid grid-cols-3 gap-4 w-full pt-6 border-t border-border/30">
                    <div className="p-3 bg-muted/20 rounded-lg border border-border/30">
                      <div className="text-2xl font-bold text-foreground mb-1">{client.activeContracts}</div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Contracts</div>
                    </div>
                    <div className="p-3 bg-muted/20 rounded-lg border border-border/30">
                      <div className="text-2xl font-bold text-foreground mb-1">{client.totalContractors}</div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Contractors</div>
                    </div>
                    <div className="p-3 bg-muted/20 rounded-lg border border-border/30">
                      <div className="text-2xl font-bold text-foreground mb-1">{client.documents.length}</div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Documents</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-muted/10 rounded-xl border border-border/30">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 text-sm">
                        <Avatar className="h-10 w-10 border border-border/30 shadow-sm">
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-sm font-semibold">
                            {client.pointOfContact.firstName[0]}{client.pointOfContact.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="overflow-hidden pt-0.5">
                          <p className="font-semibold text-foreground text-base">
                            {client.pointOfContact.firstName} {client.pointOfContact.lastName}
                          </p>
                          <p className="text-muted-foreground truncate text-sm">{client.pointOfContact.email}</p>
                        </div>
                      </div>
                      {client.entityInfo?.phone && (
                        <div className="flex items-center gap-3 text-sm pl-1">
                          <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0 border border-border/30">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <p className="font-semibold text-foreground">{client.entityInfo.phone.dialCode} {client.entityInfo.phone.number}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-muted/10 rounded-xl border border-border/30">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Online Presence</h3>
                    <div className="space-y-2">
                      {client.companyWebsite && (
                        <a 
                          href={client.companyWebsite} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm text-foreground hover:text-primary p-3 hover:bg-muted/30 rounded-lg transition-all group border border-border/20 hover:border-primary/30"
                        >
                          <div className="h-9 w-9 rounded-lg bg-slate-50 text-slate-700 flex items-center justify-center group-hover:bg-slate-100 group-hover:scale-105 transition-all shadow-sm border border-slate-100/50">
                            <Globe className="h-4 w-4" />
                          </div>
                          <span className="font-semibold">Website</span>
                        </a>
                      )}
                      {client.companyLinkedIn && (
                        <a 
                          href={client.companyLinkedIn} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm text-foreground hover:text-slate-700 p-3 hover:bg-muted/30 rounded-lg transition-all group border border-border/20 hover:border-slate-200/50"
                        >
                          <div className="h-9 w-9 rounded-lg bg-slate-50 text-slate-700 flex items-center justify-center group-hover:bg-slate-100 group-hover:scale-105 transition-all shadow-sm border border-slate-100/50">
                            <Link className="h-4 w-4" />
                          </div>
                          <span className="font-semibold">LinkedIn</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="border border-border/30 shadow-sm bg-gradient-to-br from-background to-muted/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100/50">
                    <DollarSign className="h-4 w-4 text-emerald-700" />
                  </div>
                  Financial Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="p-6 bg-gradient-to-br from-emerald-50 via-emerald-50/50 to-emerald-50/30 rounded-xl border border-emerald-100/40 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="p-2 bg-white/70 rounded-lg shadow-sm border border-white/50">
                      <DollarSign className="h-5 w-5 text-emerald-700" />
                    </div>
                    <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Monthly Spend</span>
                  </div>
                  <div className="text-4xl font-bold text-foreground mt-3">${(client.monthlySpend).toLocaleString()}</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-muted/20 rounded-xl border border-border/30 hover:bg-muted/30 transition-colors">
                    <div className="text-xs text-muted-foreground font-semibold mb-1.5 uppercase tracking-wide">Last Payment</div>
                    <div className="font-bold text-foreground text-base">Nov 30, 2024</div>
                  </div>
                  <div className="p-4 bg-muted/20 rounded-xl border border-border/30 hover:bg-muted/30 transition-colors">
                    <div className="text-xs text-muted-foreground font-semibold mb-1.5 uppercase tracking-wide">Next Invoice</div>
                    <div className="font-bold text-foreground text-base">Dec 31, 2024</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8">
            <Tabs defaultValue="entity" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent bg-none space-x-8 mb-6">
                <TabsTrigger 
                  value="overview" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:bg-none data-[state=active]:shadow-none data-[state=active]:text-primary hover:text-primary transition-colors py-3 px-1 text-sm font-medium text-muted-foreground"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="entity" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:bg-none data-[state=active]:shadow-none data-[state=active]:text-primary hover:text-primary transition-colors py-3 px-1 text-sm font-medium text-muted-foreground"
                >
                  Entity Details
                </TabsTrigger>
                <TabsTrigger 
                  value="documents" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:bg-none data-[state=active]:shadow-none data-[state=active]:text-primary hover:text-primary transition-colors py-3 px-1 text-sm font-medium text-muted-foreground"
                >
                  Documents
                </TabsTrigger>
                <TabsTrigger 
                  value="onboarding" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:bg-none data-[state=active]:shadow-none data-[state=active]:text-primary hover:text-primary transition-colors py-3 px-1 text-sm font-medium text-muted-foreground"
                >
                  Onboarding Info
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="overview" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Company Overview Card */}
                  <Card className="border-none shadow-sm bg-gradient-to-br from-background to-muted/20">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border border-primary/20">
                          <Building2 className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{client.companyName}</CardTitle>
                          <CardDescription className="text-base mt-1">Company overview and business information</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-background/60 rounded-xl border border-border/50 hover:bg-background/80 transition-colors">
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Industry</div>
                          <div className="text-base font-semibold text-foreground">{client.industry}</div>
                        </div>
                        <div className="p-4 bg-background/60 rounded-xl border border-border/50 hover:bg-background/80 transition-colors">
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Globe className="h-3 w-3" />
                            Country
                          </div>
                          <div className="text-base font-semibold text-foreground">{client.country}</div>
                        </div>
                        <div className="p-4 bg-background/60 rounded-xl border border-border/50 hover:bg-background/80 transition-colors">
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Registration Date</div>
                          <div className="text-base font-semibold text-foreground">{new Date(client.registrationDate).toLocaleDateString()}</div>
                        </div>
                        <div className="p-4 bg-background/60 rounded-xl border border-border/50 hover:bg-background/80 transition-colors">
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Client ID</div>
                          <div className="font-mono text-sm font-semibold text-foreground bg-muted/40 px-2 py-1 rounded-md inline-block">
                            {client.id}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Products & Services Card */}
                  <Card className="border-none shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-slate-700" />
                        </div>
                        Products & Services
                      </CardTitle>
                      <CardDescription>Description of the company's offerings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="p-5 bg-muted/10 rounded-xl border border-border/40">
                        <p className="text-sm leading-relaxed text-foreground">{client.productsServices}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Work Type & Requirements Card */}
                  <Card className="border-none shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center">
                          <User className="h-4 w-4 text-slate-700" />
                        </div>
                        Work Type & Requirements
                      </CardTitle>
                      <CardDescription>Contractor engagement and project needs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="p-5 bg-muted/10 rounded-xl border border-border/40">
                        <p className="text-sm leading-relaxed text-foreground">{client.workType}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Stats Card */}
                  <Card className="border-none shadow-sm bg-gradient-to-br from-primary/5 to-transparent">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        Quick Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-background/60 rounded-xl border border-border/50 text-center">
                          <div className="text-2xl font-bold text-foreground mb-1">{client.activeContracts}</div>
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Active Contracts</div>
                        </div>
                        <div className="p-4 bg-background/60 rounded-xl border border-border/50 text-center">
                          <div className="text-2xl font-bold text-foreground mb-1">{client.totalContractors}</div>
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Total Contractors</div>
                        </div>
                        <div className="p-4 bg-background/60 rounded-xl border border-border/50 text-center">
                          <div className="text-2xl font-bold text-foreground mb-1">${(client.monthlySpend / 1000).toFixed(1)}k</div>
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Monthly Spend</div>
                        </div>
                        <div className="p-4 bg-background/60 rounded-xl border border-border/50 text-center">
                          <div className="text-2xl font-bold text-foreground mb-1">{client.documents.length}</div>
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Documents</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="entity" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {client.entityInfo ? (
                    <div className="space-y-6">
                      {/* Entity Overview Card */}
                      <Card className="border-none shadow-sm bg-gradient-to-br from-background to-muted/20">
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border border-primary/20">
                                <Shield className="h-7 w-7 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-2xl mb-1">{client.entityInfo.entityName}</CardTitle>
                                <CardDescription className="text-base">Legal entity details and registration information</CardDescription>
                              </div>
                            </div>
                            <Badge variant="outline" className="flex gap-2 py-2 px-4 bg-background/80 backdrop-blur-sm border-primary/20 text-primary font-medium">
                              <Shield className="h-4 w-4" />
                              {client.entityInfo.entityType}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-4 bg-background/60 rounded-xl border border-border/50">
                              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Registration Country</div>
                              <div className="text-base font-semibold text-foreground flex items-center gap-2">
                                <Globe className="h-4 w-4 text-primary" />
                                {client.entityInfo.countryOfIncorporation}
                              </div>
                            </div>
                            <div className="p-4 bg-background/60 rounded-xl border border-border/50">
                              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Industry Category</div>
                              <div className="text-base font-semibold text-foreground">{client.entityInfo.industryCategory}</div>
                            </div>
                            <div className="p-4 bg-background/60 rounded-xl border border-border/50">
                              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Business Code</div>
                              <div className="font-mono text-base font-semibold text-foreground">{client.entityInfo.businessCode || "N/A"}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Legal Information Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-none shadow-sm">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                <FileText className="h-4 w-4 text-slate-700" />
                              </div>
                              Legal Information
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-5">
                            <div>
                              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Legal Entity Name</div>
                              <div className="text-lg font-bold text-foreground">{client.entityInfo.entityName}</div>
                              {client.entityInfo.legalEntityNameOriginal && (
                                <div className="text-xs text-muted-foreground mt-1.5">Original: {client.entityInfo.legalEntityNameOriginal}</div>
                              )}
                            </div>
                            <Separator />
                            <div>
                              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tax Identification Number</div>
                              <div className="font-mono text-base font-semibold bg-muted/40 px-4 py-2.5 rounded-lg inline-block border-2 border-border/60 text-foreground">
                                {client.entityInfo.taxId}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">License Number</div>
                              <div className="font-mono text-sm font-semibold text-foreground bg-muted/20 px-3 py-1.5 rounded-md inline-block">
                                {client.entityInfo.licenseNumber}
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                <Phone className="h-4 w-4 text-slate-700" />
                              </div>
                              Contact Details
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-5">
                            {client.entityInfo.phone && (
                              <>
                                <div>
                                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Phone Number</div>
                                  <div className="text-base font-semibold text-foreground flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    {client.entityInfo.phone.dialCode} {client.entityInfo.phone.number}
                                  </div>
                                </div>
                                <Separator />
                              </>
                            )}
                            {client.entityInfo.pocDesignated && (
                              <div>
                                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Designated Point of Contact</div>
                                <div className="space-y-1">
                                  <div className="text-base font-semibold text-foreground">
                                    {client.entityInfo.pocDesignated.firstName} {client.entityInfo.pocDesignated.lastName}
                                  </div>
                                  <div className="text-sm text-muted-foreground">{client.entityInfo.pocDesignated.email}</div>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>

                      {/* Address Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-none shadow-sm bg-gradient-to-br from-slate-50/30 to-transparent border border-slate-100/50">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-3">
                              <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center shadow-sm">
                                <MapPin className="h-5 w-5 text-slate-700" />
                              </div>
                              Registered Address
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 text-sm">
                              <p className="font-semibold text-foreground text-base">{client.entityInfo.registeredAddress.line1}</p>
                              {client.entityInfo.registeredAddress.line2 && (
                                <p className="text-muted-foreground">{client.entityInfo.registeredAddress.line2}</p>
                              )}
                              <p className="text-muted-foreground">
                                {client.entityInfo.registeredAddress.city}, {client.entityInfo.registeredAddress.province} {client.entityInfo.registeredAddress.postalCode}
                              </p>
                              <p className="font-semibold text-foreground pt-2 border-t border-border/40">{client.entityInfo.registeredAddress.country}</p>
                            </div>
                          </CardContent>
                        </Card>
                        
                        {client.entityInfo.operatingAddress && (
                          <Card className="border-none shadow-sm bg-gradient-to-br from-slate-50/30 to-transparent border border-slate-100/50">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center shadow-sm">
                                  <MapPin className="h-5 w-5 text-slate-700" />
                                </div>
                                Operating Address
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2 text-sm">
                                <p className="font-semibold text-foreground text-base">{client.entityInfo.operatingAddress.line1}</p>
                                {client.entityInfo.operatingAddress.line2 && (
                                  <p className="text-muted-foreground">{client.entityInfo.operatingAddress.line2}</p>
                                )}
                                <p className="text-muted-foreground">
                                  {client.entityInfo.operatingAddress.city}, {client.entityInfo.operatingAddress.postalCode}
                                </p>
                                <p className="font-semibold text-foreground pt-2 border-t border-border/40">{client.entityInfo.operatingAddress.country}</p>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>

                      {/* Services Used */}
                      <Card className="border-none shadow-sm">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-emerald-700" />
                            </div>
                            Services & Products
                          </CardTitle>
                          <CardDescription>Mind Links services currently in use</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-4">
                            {client.entityInfo.useDeelContractor && (
                              <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-slate-50 to-slate-50/50 text-slate-700 rounded-xl border-2 border-slate-200/60 transition-all hover:shadow-md hover:scale-[1.02] cursor-default">
                                <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                  <CheckCircle2 className="h-5 w-5 text-slate-700" />
                                </div>
                                <span className="text-sm font-semibold">Contractor Management</span>
                              </div>
                            )}
                            {client.entityInfo.useDeelCOR && (
                              <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-slate-50 to-slate-50/50 text-slate-700 rounded-xl border-2 border-slate-200/60 transition-all hover:shadow-md hover:scale-[1.02] cursor-default">
                                <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                  <CheckCircle2 className="h-5 w-5 text-slate-700" />
                                </div>
                                <span className="text-sm font-semibold">Contractor of Record (COR)</span>
                              </div>
                            )}
                            {client.entityInfo.useDeelEOR && (
                              <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-slate-50 to-slate-50/50 text-slate-700 rounded-xl border-2 border-slate-200/60 transition-all hover:shadow-md hover:scale-[1.02] cursor-default">
                                <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                  <CheckCircle2 className="h-5 w-5 text-slate-700" />
                                </div>
                                <span className="text-sm font-semibold">Employer of Record (EOR)</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <Card className="border-none shadow-sm">
                      <CardContent className="py-16 text-center">
                        <div className="h-16 w-16 bg-muted/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Building2 className="h-8 w-8 text-muted-foreground/50" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Entity information not available</h3>
                        <p className="text-sm text-muted-foreground">This client has not completed entity registration yet.</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="documents" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <Card className="border-none shadow-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Company Documents</CardTitle>
                          <CardDescription className="mt-1">Legal documents and compliance certificates</CardDescription>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-9"
                          onClick={() => setRequestDialogOpen(true)}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Request Document
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {client.documents.length > 0 ? (
                        <div className="grid gap-4">
                          {client.documents.map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between p-5 border border-border/50 rounded-xl hover:bg-muted/20 hover:border-slate-300/50 transition-all duration-200 group bg-card">
                              <div className="flex items-center gap-5 flex-1">
                                <div className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-sm border group-hover:scale-105 transition-transform ${
                                  doc.status === "approved" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                  doc.status === "rejected" ? "bg-slate-50 text-slate-700 border-slate-200" :
                                  doc.status === "expired" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                  "bg-slate-50 text-slate-700 border-slate-100"
                                }`}>
                                  {doc.status === "approved" ? (
                                    <CheckCircle className="h-6 w-6" />
                                  ) : doc.status === "rejected" ? (
                                    <XCircle className="h-6 w-6" />
                                  ) : doc.status === "expired" ? (
                                    <Calendar className="h-6 w-6" />
                                  ) : (
                                    <FileText className="h-6 w-6" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold text-foreground text-base mb-1">{doc.type}</p>
                                  <p className="text-sm text-muted-foreground font-medium">{doc.name}</p>
                                  {doc.expiryDate && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                                    </p>
                                  )}
                                  {doc.reviewedDate && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Reviewed: {new Date(doc.reviewedDate).toLocaleDateString()}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                                    Uploaded {new Date(doc.uploadedDate).toLocaleDateString()}
                                  </p>
                                  <Badge 
                                    variant={getStatusBadgeVariant(doc.status)} 
                                    className={`font-medium capitalize ${
                                      doc.status === "approved" ? "bg-emerald-700 hover:bg-emerald-800 text-white" :
                                      doc.status === "pending" ? "bg-amber-100 text-amber-700 border-amber-200" :
                                      doc.status === "rejected" ? "bg-slate-700 hover:bg-slate-800 text-white" :
                                      "bg-slate-100 text-slate-700 border-slate-300"
                                    }`}
                                  >
                                    {doc.status}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                  {doc.status === "pending" && (
                                    <>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleApproveDocument(doc.id)}
                                        className="h-8 px-3 text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                                      >
                                        <Check className="h-3.5 w-3.5 mr-1.5" />
                                        Approve
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          setSelectedDocumentForReject(doc.id);
                                          setRejectDialogOpen(true);
                                        }}
                                        className="h-8 px-3 text-slate-700 border-slate-200 hover:bg-slate-50"
                                      >
                                        <X className="h-3.5 w-3.5 mr-1.5" />
                                        Reject
                                      </Button>
                                    </>
                                  )}
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0"
                                    onClick={() => {
                                      setSelectedDocument(doc.id);
                                      setViewDialogOpen(true);
                                    }}
                                  >
                                    View
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-16 bg-muted/10 rounded-xl border border-dashed border-border/60">
                          <div className="h-14 w-14 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="h-7 w-7 text-muted-foreground/60" />
                          </div>
                          <h3 className="text-base font-semibold text-foreground">No documents available</h3>
                          <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">This client has not uploaded any compliance documents yet.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="onboarding" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <Card className="border-none shadow-sm">
                    <CardHeader>
                      <CardTitle>Onboarding Summary</CardTitle>
                      <CardDescription>Information collected during the onboarding process</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-muted/10 rounded-xl p-6 border border-border/40">
                        <h3 className="text-sm font-semibold mb-6 flex items-center gap-2.5 text-foreground">
                          <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-emerald-700" />
                          </div>
                          Completed Steps
                        </h3>
                        <div className="space-y-8 relative before:absolute before:left-[19px] before:top-3 before:bottom-3 before:w-[2px] before:bg-border/40 pl-2">
                          <div className="flex items-start gap-4 relative">
                            <div className="mt-0.5 relative z-10">
                              <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-sm font-bold border-4 border-white shadow-sm">1</div>
                            </div>
                            <div className="pt-1">
                              <p className="text-base font-semibold text-foreground">Account Creation</p>
                              <p className="text-sm text-muted-foreground mt-0.5">Created on {new Date(client.registrationDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 relative">
                            <div className="mt-0.5 relative z-10">
                              <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-sm font-bold border-4 border-white shadow-sm">2</div>
                            </div>
                            <div className="pt-1">
                              <p className="text-base font-semibold text-foreground">Company Profile Setup</p>
                              <p className="text-sm text-muted-foreground mt-0.5">Industry, size, and operating details provided</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 relative">
                            <div className="mt-0.5 relative z-10">
                              <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-sm font-bold border-4 border-white shadow-sm">3</div>
                            </div>
                            <div className="pt-1">
                              <p className="text-base font-semibold text-foreground">Entity Verification</p>
                              <p className="text-sm text-muted-foreground mt-0.5">
                                {client.verificationStatus === "verified" 
                                  ? "Documents verified and approved"
                                  : client.verificationStatus === "pending"
                                  ? "Documents under review"
                                  : "Pending document submission"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Request Document Dialog */}
      <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-slate-700" />
              Request Document
            </DialogTitle>
            <DialogDescription>
              Request a specific document from {client?.companyName}. They will receive a notification to upload the requested document.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="document-type">Document Type *</Label>
              <Select value={selectedDocumentType} onValueChange={setSelectedDocumentType}>
                <SelectTrigger id="document-type">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {COMMON_DOCUMENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any specific requirements or notes about the document request..."
                value={requestNotes}
                onChange={(e) => setRequestNotes(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                This message will be included in the notification sent to the client.
              </p>
            </div>
            {client && (
              <div className="p-3 bg-muted/50 rounded-lg border border-border/30">
                <p className="text-sm font-medium text-foreground mb-1">Request will be sent to:</p>
                <p className="text-sm text-muted-foreground">{client.pointOfContact.firstName} {client.pointOfContact.lastName}</p>
                <p className="text-xs text-muted-foreground">{client.pointOfContact.email}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setRequestDialogOpen(false);
                setSelectedDocumentType("");
                setRequestNotes("");
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRequestDocument}
              disabled={isSubmitting || !selectedDocumentType}
              className="bg-slate-700 hover:bg-slate-800"
            >
              {isSubmitting ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Request
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Document Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-slate-700" />
              Reject Document
            </DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this document. The client will be notified with this reason.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedDocumentForReject && client && (
              <div className="p-3 bg-muted/50 rounded-lg border border-border/30">
                <p className="text-sm font-medium text-foreground mb-1">Document:</p>
                <p className="text-sm text-muted-foreground">
                  {client.documents.find(d => d.id === selectedDocumentForReject)?.type}
                </p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="reject-reason">Rejection Reason *</Label>
              <Textarea
                id="reject-reason"
                placeholder="Explain why this document is being rejected..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                This reason will be included in the notification sent to the client.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setRejectDialogOpen(false);
                setSelectedDocumentForReject(null);
                setRejectReason("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRejectDocument}
              disabled={!rejectReason.trim()}
              className="bg-slate-700 hover:bg-slate-800"
            >
              <X className="mr-2 h-4 w-4" />
              Reject Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Document Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-slate-700" />
              Document Details
            </DialogTitle>
            <DialogDescription>
              View document information and manage its status
            </DialogDescription>
          </DialogHeader>
          {selectedDocument && client && (() => {
            const doc = client.documents.find(d => d.id === selectedDocument);
            if (!doc) return null;
            
            return (
              <div className="space-y-6 py-4">
                {/* Document Info */}
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg border border-border/30">
                    <div className="flex items-start gap-4">
                      <div className={`h-16 w-16 rounded-xl flex items-center justify-center shadow-sm border flex-shrink-0 ${
                        doc.status === "approved" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        doc.status === "rejected" ? "bg-slate-50 text-slate-700 border-slate-200" :
                        doc.status === "expired" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-slate-50 text-slate-700 border-slate-100"
                      }`}>
                        {doc.status === "approved" ? (
                          <CheckCircle className="h-8 w-8" />
                        ) : doc.status === "rejected" ? (
                          <XCircle className="h-8 w-8" />
                        ) : doc.status === "expired" ? (
                          <Calendar className="h-8 w-8" />
                        ) : (
                          <FileText className="h-8 w-8" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground mb-2">{doc.type}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{doc.name}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge 
                            variant={getStatusBadgeVariant(doc.status)} 
                            className={`font-medium capitalize ${
                              doc.status === "approved" ? "bg-emerald-700 hover:bg-emerald-800 text-white" :
                              doc.status === "pending" ? "bg-amber-100 text-amber-700 border-amber-200" :
                              doc.status === "rejected" ? "bg-slate-700 hover:bg-slate-800 text-white" :
                              "bg-slate-100 text-slate-700 border-slate-300"
                            }`}
                          >
                            {doc.status}
                          </Badge>
                          {doc.requiredFor.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              Required for: {doc.requiredFor.join(", ")}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Document Metadata */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/30 rounded-lg border border-border/30">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Uploaded Date</p>
                      <p className="text-sm font-medium text-foreground">
                        {new Date(doc.uploadedDate).toLocaleDateString()}
                      </p>
                    </div>
                    {doc.reviewedDate && (
                      <div className="p-3 bg-muted/30 rounded-lg border border-border/30">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Reviewed Date</p>
                        <p className="text-sm font-medium text-foreground">
                          {new Date(doc.reviewedDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {doc.expiryDate && (
                      <div className="p-3 bg-muted/30 rounded-lg border border-border/30">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Expiry Date</p>
                        <p className="text-sm font-medium text-foreground">
                          {new Date(doc.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {doc.fileUrl && (
                      <div className="p-3 bg-muted/30 rounded-lg border border-border/30">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">File</p>
                        <a 
                          href={doc.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-slate-700 hover:text-slate-900 underline"
                        >
                          View File
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Document Preview Placeholder */}
                {doc.fileUrl && (
                  <div className="p-6 bg-muted/20 rounded-lg border border-border/30 border-dashed">
                    <div className="flex flex-col items-center justify-center text-center">
                      <FileText className="h-12 w-12 text-muted-foreground/50 mb-3" />
                      <p className="text-sm font-medium text-foreground mb-1">Document Preview</p>
                      <p className="text-xs text-muted-foreground mb-4">
                        {doc.name}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(doc.fileUrl, '_blank')}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Open Document
                      </Button>
                    </div>
                  </div>
                )}

                {/* Status Change Section */}
                <Separator />
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Change Document Status</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {doc.status !== "approved" && (
                        <Button
                          variant="outline"
                          onClick={() => handleChangeDocumentStatus(doc.id, "approved")}
                          className="h-auto py-3 flex flex-col items-center gap-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300"
                        >
                          <CheckCircle className="h-5 w-5 text-emerald-700" />
                          <span className="text-sm font-medium text-emerald-700">Approve</span>
                        </Button>
                      )}
                      {doc.status !== "rejected" && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setViewDialogOpen(false);
                            setSelectedDocumentForReject(doc.id);
                            setRejectDialogOpen(true);
                          }}
                          className="h-auto py-3 flex flex-col items-center gap-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                        >
                          <XCircle className="h-5 w-5 text-slate-700" />
                          <span className="text-sm font-medium text-slate-700">Reject</span>
                        </Button>
                      )}
                      {doc.status !== "expired" && (
                        <Button
                          variant="outline"
                          onClick={() => handleChangeDocumentStatus(doc.id, "expired")}
                          className="h-auto py-3 flex flex-col items-center gap-2 border-amber-200 hover:bg-amber-50 hover:border-amber-300"
                        >
                          <Calendar className="h-5 w-5 text-amber-700" />
                          <span className="text-sm font-medium text-amber-700">Mark as Expired</span>
                        </Button>
                      )}
                      {doc.status !== "pending" && (
                        <Button
                          variant="outline"
                          onClick={() => handleChangeDocumentStatus(doc.id, "pending")}
                          className="h-auto py-3 flex flex-col items-center gap-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                        >
                          <Clock className="h-5 w-5 text-slate-700" />
                          <span className="text-sm font-medium text-slate-700">Set to Pending</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setViewDialogOpen(false);
                setSelectedDocument(null);
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientDetails;
