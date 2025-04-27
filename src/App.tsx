
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardOverview from "@/pages/dashboard/Overview";
import KOLsPage from "@/pages/dashboard/KOLs";
import CampaignsPage from "@/pages/dashboard/Campaigns";
import BookingsPage from "@/pages/dashboard/Bookings";
import CreditsPage from "@/pages/dashboard/Credits";
import ProfilePage from "@/pages/dashboard/Profile";
import BillingPage from "@/pages/dashboard/Billing";
import SubscriptionPage from "@/pages/dashboard/Subscription";
import ContractsPage from "@/pages/dashboard/Contracts";
import SettingsPage from "@/pages/dashboard/Settings";
import PaymentPage from "@/pages/dashboard/Payment";
import NotFound from "@/pages/NotFound";

// Context
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* Protected dashboard routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/dashboard/overview" replace />} />
              <Route path="overview" element={<DashboardOverview />} />
              <Route path="kols" element={<KOLsPage />} />
              <Route path="campaigns" element={<CampaignsPage />} />
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="credits" element={<CreditsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="billing" element={<BillingPage />} />
              <Route path="subscription" element={<SubscriptionPage />} />
              <Route path="contracts" element={<ContractsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="payment" element={<PaymentPage />} />
            </Route>
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
