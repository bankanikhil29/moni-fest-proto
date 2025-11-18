import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CampaignProvider } from "./contexts/CampaignStore";
import Index from "./pages/Index";
import FindCreators from "./pages/FindCreators";
import FindBrands from "./pages/FindBrands";
import JoinAsCreator from "./pages/JoinAsCreator";
import GetStarted from "./pages/GetStarted";
import UserTypeSelection from "./pages/UserTypeSelection";
import InfluencerProfileSetup from "./pages/InfluencerProfileSetup";
import BrandProfileSetup from "./pages/BrandProfileSetup";
import DocumentVerification from "./pages/DocumentVerification";
import VideoVerification from "./pages/VideoVerification";
import VerificationSuccess from "./pages/VerificationSuccess";

import BrandDashboard from "./pages/BrandDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import CreatorProfile from "./pages/CreatorProfile";
import CreatorBooking from "./pages/CreatorBooking";
import PaymentPage from "./pages/PaymentPage";
import NotFound from "./pages/NotFound";
import CampaignsListPage from "./pages/CampaignsListPage";
import CampaignDetailsPage from "./pages/CampaignDetailsPage";
import CreateCampaignWizardPage from "./pages/CreateCampaignWizardPage";

const queryClient = new QueryClient();

// Layout component that conditionally shows sidebar
const AppLayout = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname === '/brand-dashboard' || location.pathname === '/manager-dashboard';

  if (isDashboardRoute) {
    // Dashboard routes with sidebar
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1">
            <Routes>
              <Route path="/brand-dashboard" element={<BrandDashboard />} />
              <Route path="/manager-dashboard" element={<ManagerDashboard />} />
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  // Public routes without sidebar (full width)
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/find-creators" element={<FindCreators />} />
      <Route path="/find-brands" element={<FindBrands />} />
      <Route path="/join-as-creator" element={<JoinAsCreator />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/user-type-selection" element={<UserTypeSelection />} />
      <Route path="/influencer-setup" element={<InfluencerProfileSetup />} />
      <Route path="/brand-setup" element={<BrandProfileSetup />} />
      <Route path="/document-verification" element={<DocumentVerification />} />
      <Route path="/video-verification" element={<VideoVerification />} />
      <Route path="/verification-success" element={<VerificationSuccess />} />
      <Route path="/creator-profile/:id" element={<CreatorProfile />} />
      <Route path="/creator-booking/:id" element={<CreatorBooking />} />
      <Route path="/payment/:id" element={<PaymentPage />} />
      <Route path="/campaigns" element={<CampaignsListPage />} />
      <Route path="/campaigns/:id" element={<CampaignDetailsPage />} />
      <Route path="/create-campaign" element={<CreateCampaignWizardPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CampaignProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </TooltipProvider>
    </CampaignProvider>
  </QueryClientProvider>
);

export default App;
