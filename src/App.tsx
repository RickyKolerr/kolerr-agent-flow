
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";

// Pages
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/About";
import FeaturesPage from "@/pages/Features";
import PricingPage from "@/pages/Pricing";
import DocsPage from "@/pages/docs/DocsPage";
import ContactPage from "@/pages/ContactPage";
import PartnersPage from "@/pages/partners/PartnersPage";
import APIPage from "@/pages/api/APIPage";
import TermsPage from "@/pages/legal/Terms";
import PrivacyPage from "@/pages/legal/Privacy";
import SecurityPage from "@/pages/legal/SecurityPage";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import DashboardLayout from "@/layouts/DashboardLayout";
import NotFound from "@/pages/NotFound";

// Dashboard pages
import Overview from "@/pages/dashboard/Overview";
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

// Components
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";

// Context
import { AuthProvider } from "@/contexts/AuthContext";

// Helper component to conditionally render MainNav and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const isAuthRoute = ['/login', '/signup', '/forgot-password'].includes(location.pathname);
  
  return (
    <>
      {!isDashboardRoute && !isAuthRoute && <MainNav />}
      <main className={!isDashboardRoute && !isAuthRoute ? "pt-16" : ""}>
        {children}
      </main>
      {!isDashboardRoute && !isAuthRoute && <Footer />}
    </>
  );
};

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/docs" element={<DocsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/partners" element={<PartnersPage />} />
                <Route path="/api" element={<APIPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                
                {/* Legal routes */}
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/security" element={<SecurityPage />} />
                
                {/* Protected dashboard routes */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Navigate to="/dashboard/overview" replace />} />
                  <Route path="overview" element={<Overview />} />
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
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
