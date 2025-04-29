import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";

// Context providers
import { AuthProvider, ProtectedRoute, RoleProtectedRoute } from "@/contexts/AuthContext";
import { CreditProvider } from "@/contexts/CreditContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Pages
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/About";
import FeaturesPage from "@/pages/Features";
import PricingPage from "@/pages/Pricing";
import DocsPage from "@/pages/docs/DocsPage";
import ContactPage from "@/pages/ContactPage";
import PartnersPage from "@/pages/partners/PartnersPage";
import APIPage from "@/pages/api/APIPage";
import BlogPage from "@/pages/blog/BlogPage";
import HelpCenter from "@/pages/help/HelpCenter";
import TermsPage from "@/pages/legal/Terms";
import PrivacyPage from "@/pages/legal/Privacy";
import SecurityPage from "@/pages/legal/SecurityPage";
import CompliancePage from "@/pages/legal/CompliancePage";
import CareersPage from "@/pages/company/CareersPage";
import PressPage from "@/pages/company/PressPage";
import SustainabilityPage from "@/pages/company/SustainabilityPage";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPassword from "@/pages/auth/ResetPassword";
import EmailVerification from "@/pages/auth/EmailVerification";
import DashboardLayout from "@/layouts/DashboardLayout";
import NotFound from "@/pages/NotFound";

// Onboarding pages
import OnboardingBrand from "@/pages/auth/OnboardingBrand";
import OnboardingKOL from "@/pages/auth/OnboardingKOL";

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
import CreateCampaign from "@/pages/dashboard/CreateCampaign";
import CreateContract from "@/pages/dashboard/CreateContract";
import ViewContract from "@/pages/dashboard/ViewContract";

// KOL dashboard pages
import AvailableCampaigns from "@/pages/dashboard/kol/AvailableCampaigns";
import Applications from "@/pages/dashboard/kol/Applications";
import Analytics from "@/pages/dashboard/kol/Analytics";
import Referrals from "@/pages/dashboard/kol/Referrals";
import Rewards from "@/pages/dashboard/kol/Rewards";
import Community from "@/pages/dashboard/kol/Community";
import KOLContracts from "@/pages/dashboard/kol/KOLContracts";

// Search pages
import SearchResults from "@/pages/search/SearchResults";
import AdvancedSearch from "@/pages/search/AdvancedSearch";
import SearchHistory from "@/pages/search/SearchHistory";
import CreatorProfile from "@/pages/creators/CreatorProfile";

// Campaign pages
import CampaignDetail from "@/pages/campaigns/CampaignDetail";

// Components
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";

// Helper component to conditionally render MainNav and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const isAuthRoute = ['/login', '/signup', '/forgot-password'].includes(location.pathname) || location.pathname.startsWith('/onboarding');
  
  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboardRoute && !isAuthRoute && <MainNav />}
      <main className={!isDashboardRoute && !isAuthRoute ? "flex-1 pt-16" : "flex-1"}>
        {children}
      </main>
      {!isDashboardRoute && !isAuthRoute && <Footer />}
    </div>
  );
};

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <LanguageProvider>
          <AuthProvider>
            <CreditProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <Layout>
                  <Routes>
                    {/* Public routes - REMOVED DUPLICATE INDEX ROUTE */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/features" element={<FeaturesPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/docs" element={<DocsPage />} />
                    <Route path="/api" element={<APIPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/help" element={<HelpCenter />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/partners" element={<PartnersPage />} />
                    
                    {/* New company pages */}
                    <Route path="/careers" element={<CareersPage />} />
                    <Route path="/press" element={<PressPage />} />
                    <Route path="/sustainability" element={<SustainabilityPage />} />
                    
                    {/* Campaign routes - Public but with auth-aware UI */}
                    <Route path="/campaigns/:campaignId" element={<CampaignDetail />} />
                    
                    {/* Search routes */}
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/search/advanced" element={<AdvancedSearch />} />
                    <Route path="/search/history" element={<SearchHistory />} />
                    <Route path="/creators/:creatorId" element={<CreatorProfile />} />
                    
                    {/* Legal routes */}
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/security" element={<SecurityPage />} />
                    <Route path="/compliance" element={<CompliancePage />} />
                    
                    {/* Auth routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/verify-email" element={<EmailVerification />} />
                    
                    {/* Onboarding routes */}
                    <Route path="/onboarding/brand" element={
                      <ProtectedRoute>
                        <OnboardingBrand />
                      </ProtectedRoute>
                    } />
                    <Route path="/onboarding/kol" element={
                      <ProtectedRoute>
                        <OnboardingKOL />
                      </ProtectedRoute>
                    } />
                    
                    {/* Protected dashboard routes */}
                    <Route path="/dashboard" element={<DashboardLayout />}>
                      <Route index element={<Navigate to="/dashboard/kol/campaigns" replace />} />
                      <Route path="overview" element={<Overview />} />
                      
                      {/* Brand-specific routes */}
                      <Route path="kols" element={<KOLsPage />} />
                      <Route path="campaigns/create" element={<CreateCampaign />} />
                      <Route path="campaigns" element={<CampaignsPage />} />
                      <Route path="bookings" element={<BookingsPage />} />
                      <Route path="credits" element={<CreditsPage />} />
                      
                      {/* Contract routes */}
                      <Route path="contracts" element={<ContractsPage />} />
                      <Route path="contracts/create" element={<CreateContract />} />
                      <Route path="contracts/:contractId" element={<ViewContract />} />
                      
                      {/* KOL-specific routes */}
                      <Route path="kol/campaigns" element={<AvailableCampaigns />} />
                      <Route path="kol/applications" element={<Applications />} />
                      <Route path="kol/analytics" element={<Analytics />} />
                      <Route path="kol/referrals" element={<Referrals />} />
                      <Route path="kol/rewards" element={<Rewards />} />
                      <Route path="kol/community" element={<Community />} />
                      <Route path="kol/contracts" element={<KOLContracts />} />
                      
                      {/* Common routes */}
                      <Route path="profile" element={<ProfilePage />} />
                      <Route path="billing" element={<BillingPage />} />
                      <Route path="subscription" element={<SubscriptionPage />} />
                      <Route path="settings" element={<SettingsPage />} />
                      <Route path="settings/billing" element={<SettingsPage />} />
                      <Route path="settings/billing/preferences" element={<SettingsPage />} />
                      <Route path="payment" element={<PaymentPage />} />
                    </Route>
                    
                    {/* Catch all route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </TooltipProvider>
            </CreditProvider>
          </AuthProvider>
        </LanguageProvider>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;
