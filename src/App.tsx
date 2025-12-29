import { Toaster } from "@/shared/components/ui/toaster";
import { Toaster as Sonner } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
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
import BackendMicroservicesArchitecture from "./pages/BackendMicroservicesArchitecture";
import WebsiteBackendArchitecture from "./pages/WebsiteBackendArchitecture";
import ContractorDashboardBackend from "./pages/ContractorDashboardBackend";
import ClientDashboardBackend from "./pages/ClientDashboardBackend";
import AdminDashboardBackend from "./pages/AdminDashboardBackend";
import ClientDashboard from "./dashboards/client/pages/Dashboard";
import ContractorDashboard from "./dashboards/contractor/pages/Dashboard";
import AdminDashboard from "./dashboards/admin/pages/Dashboard";
import AdminClientDetails from "./dashboards/admin/pages/ClientDetails";
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
          <Route path="/backend-microservices-architecture" element={<BackendMicroservicesArchitecture />} />
          <Route path="/website-backend-architecture" element={<WebsiteBackendArchitecture />} />
          <Route path="/contractor-dashboard-backend" element={<ContractorDashboardBackend />} />
          <Route path="/client-dashboard-backend" element={<ClientDashboardBackend />} />
          <Route path="/admin-dashboard-backend" element={<AdminDashboardBackend />} />
          <Route path="/company-profile-onboarding" element={<CompanyProfileOnboarding />} />
          <Route path="/entity-creation" element={<EntityCreation />} />
          <Route path="/entity-verification" element={<EntityVerification />} />
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/contractor/dashboard" element={<ContractorDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/clients/:id" element={<AdminClientDetails />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

