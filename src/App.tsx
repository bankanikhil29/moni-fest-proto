import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FindCreators from "./pages/FindCreators";
import FindBrands from "./pages/FindBrands";
import JoinAsCreator from "./pages/JoinAsCreator";
import GetStarted from "./pages/GetStarted";
import CreatorDashboard from "./pages/CreatorDashboard";
import BrandDashboard from "./pages/BrandDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import CreatorProfile from "./pages/CreatorProfile";
import CreatorBooking from "./pages/CreatorBooking";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/find-creators" element={<FindCreators />} />
          <Route path="/find-brands" element={<FindBrands />} />
          <Route path="/join-as-creator" element={<JoinAsCreator />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/creator-dashboard" element={<CreatorDashboard />} />
          <Route path="/brand-dashboard" element={<BrandDashboard />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/creator-profile/:id" element={<CreatorProfile />} />
          <Route path="/creator-booking/:id" element={<CreatorBooking />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route path="/payment-success/:id" element={<PaymentSuccess />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
