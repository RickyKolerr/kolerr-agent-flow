import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

// Components
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";

// Context
import { AuthProvider } from "@/contexts/AuthContext";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex min-h-screen flex-col">
              <MainNav />
              <main className="flex-1">
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
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
