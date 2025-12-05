import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import KickoffMeeting from "./pages/KickoffMeeting";
import ProductBrief from "./pages/ProductBrief";
import ComplianceFlow from "./pages/ComplianceFlow";
import PayrollFlow from "./pages/PayrollFlow";
import AuthenticationArchitecture from "./pages/AuthenticationArchitecture";
import AuthPocApproaches from "./pages/AuthPocApproaches";
import LambdaArchitecture from "./pages/LambdaArchitecture";
import EcsArchitecture from "./pages/EcsArchitecture";
import FullSystemArchitecture from "./pages/FullSystemArchitecture";
import ClientDashboard from "./pages/ClientDashboard";
import ClientDetails from "./pages/ClientDetails";
import ContractorDashboard from "./pages/ContractorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CompanyProfileOnboarding from "./pages/CompanyProfileOnboarding";
import EntityCreation from "./pages/EntityCreation";
import EntityVerification from "./pages/EntityVerification";
import MindLinksWebsite from "./pages/MindLinksWebsite";
import OnboardingShowcasePage from "./pages/OnboardingShowcasePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MindLinksWebsite />} />
          <Route path="/onboarding-showcase" element={<OnboardingShowcasePage />} />
          <Route path="/kickoff" element={<KickoffMeeting />} />
          <Route path="/product-brief" element={<ProductBrief />} />
          <Route path="/compliance-flow" element={<ComplianceFlow />} />
          <Route path="/payroll-flow" element={<PayrollFlow />} />
          <Route path="/authentication-architecture" element={<AuthenticationArchitecture />} />
          <Route path="/auth-poc-approaches" element={<AuthPocApproaches />} />
          <Route path="/lambda-architecture" element={<LambdaArchitecture />} />
          <Route path="/ecs-architecture" element={<EcsArchitecture />} />
          <Route path="/full-system-architecture" element={<FullSystemArchitecture />} />
          <Route path="/company-profile-onboarding" element={<CompanyProfileOnboarding />} />
          <Route path="/entity-creation" element={<EntityCreation />} />
          <Route path="/entity-verification" element={<EntityVerification />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/contractor-dashboard" element={<ContractorDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/client/:id" element={<ClientDetails />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
