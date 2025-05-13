
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useViewportFix } from "@/hooks/useViewportFix";

// Context providers
import { AuthProvider, ProtectedRoute, RoleProtectedRoute, useAuth } from "@/contexts/AuthContext";
import { CreditProvider } from "@/contexts/CreditContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Chat components
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";

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

// Documentation guide pages
import PlatformOverviewGuide from "@/pages/docs/guides/PlatformOverview";
import CampaignCreationGuide from "@/pages/docs/guides/CampaignCreation";
import KOLDiscoveryGuide from "@/pages/docs/guides/KOLDiscovery";
import AnalyticsDashboardGuide from "@/pages/docs/guides/AnalyticsDashboard";

// Chat pages
import ChatPage from "@/pages/chat/ChatPage";
import MessagesPage from "@/pages/dashboard/Messages";
import KolMessagesPage from "@/pages/dashboard/kol/Messages";

// Onboarding pages
import OnboardingBrand from "@/pages/auth/OnboardingBrand";
import OnboardingKOL from "@/pages/auth/OnboardingKOL";

// Dashboard pages
import Overview from "@/pages/dashboard/Overview";
import KOLsPage from "@/pages/dashboard/KOLs";
import CampaignsPage from "@/pages/dashboard/Campaigns";
import BookingsPage from "@/pages/dashboard/Bookings";
import ScheduleBookingPage from "@/pages/dashboard/ScheduleBooking";
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
import CreatorHub from "@/pages/dashboard/CreatorHub";
import TeamManagement from "@/pages/dashboard/TeamManagement";

// KOL dashboard pages
import AvailableCampaigns from "@/pages/dashboard/kol/AvailableCampaigns";
import Applications from "@/pages/dashboard/kol/Applications";
import Analytics from "@/pages/dashboard/kol/Analytics";
import KOLContracts from "@/pages/dashboard/kol/KOLContracts";
import KolCreatorHub from "@/pages/dashboard/kol/CreatorHub";

// Search pages
import Index from "@/pages/Index";
import SearchResults from "@/pages/search/SearchResults";
import AdvancedSearch from "@/pages/search/AdvancedSearch";
import SearchHistory from "@/pages/search/SearchHistory";
import CreatorProfile from "@/pages/creators/CreatorProfile";

// Campaign pages
import CampaignDetail from "@/pages/campaigns/CampaignDetail";

// Components
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";

// New booking related components
import BookingSuccess from "@/components/booking/BookingSuccess";

// Helper to redirect based on role
const RoleBasedRedirect = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  if (user?.role === 'kol') {
    return <Navigate to="/dashboard/kol/campaigns" replace />;
  } else {
    return <Navigate to="/dashboard/overview" replace />;
  }
};

// Helper component to conditionally render MainNav and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const isAuthRoute = ['/login', '/signup', '/forgot-password'].includes(location.pathname) || location.pathname.startsWith('/onboarding');
  const isChatRoute = location.pathname.startsWith('/chat');
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  
  // Apply viewport fix
  useViewportFix();
  
  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboardRoute && !isAuthRoute && !isChatRoute && (
        <MainNav />
      )}
      
      <main className={`${!isDashboardRoute && !isAuthRoute && !isChatRoute ? "flex-1 pt-16" : "flex-1"} ${isHomePage ? 'home-page-container' : ''} content-container`}>
        {children}
      </main>
      
      {!isDashboardRoute && !isAuthRoute && !isChatRoute && <Footer />}
      
      {/* The FloatingChatButton will self-determine when to show */}
      <FloatingChatButton />
    </div>
  );
};

function App() {
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
                    {/* Public routes */}
                    <Route path="/" element={<Index />} />
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
                    
                    {/* Documentation guide pages */}
                    <Route path="/docs/guides/platform-overview" element={<PlatformOverviewGuide />} />
                    <Route path="/docs/guides/campaign-creation" element={<CampaignCreationGuide />} />
                    <Route path="/docs/guides/kol-discovery" element={<KOLDiscoveryGuide />} />
                    <Route path="/docs/guides/analytics-dashboard" element={<AnalyticsDashboardGuide />} />
                    
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
                    
                    {/* Chat routes */}
                    <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
                    <Route path="/chat/:conversationId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
                    
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
                      <Route index element={<RoleBasedRedirect />} />
                      <Route path="overview" element={<Overview />} />
                      
                      {/* Brand-specific routes */}
                      <Route path="kols" element={
                        <RoleProtectedRoute allowedRoles={['brand', 'admin']}>
                          <KOLsPage />
                        </RoleProtectedRoute>
                      } />
                      <Route path="campaigns/create" element={
                        <RoleProtectedRoute allowedRoles={['brand', 'admin']}>
                          <CreateCampaign />
                        </RoleProtectedRoute>
                      } />
                      <Route path="campaigns" element={
                        <RoleProtectedRoute allowedRoles={['brand', 'admin']}>
                          <CampaignsPage />
                        </RoleProtectedRoute>
                      } />
                      <Route path="campaigns/edit/:campaignId" element={<EditCampaignPage />} />
                      <Route path="bookings" element={
                        <RoleProtectedRoute allowedRoles={['brand', 'admin']}>
                          <BookingsPage />
                        </RoleProtectedRoute>
                      } />
                      <Route path="schedule-booking" element={
                        <RoleProtectedRoute allowedRoles={['brand', 'admin']}>
                          <ScheduleBookingPage />
                        </RoleProtectedRoute>
                      } />
                      <Route path="credits" element={<CreditsPage />} />
                      <Route path="messages" element={<MessagesPage />} />
                      <Route path="creator-hub" element={<CreatorHub />} />
                      <Route path="team" element={
                        <RoleProtectedRoute allowedRoles={['brand', 'admin']}>
                          <TeamManagement />
                        </RoleProtectedRoute>
                      } />
                      
                      {/* Booking routes */}
                      <Route path="booking-success" element={<BookingSuccess />} />
                      
                      {/* Contract routes */}
                      <Route path="contracts" element={<ContractsPage />} />
                      <Route path="contracts/create" element={<CreateContract />} />
                      <Route path="contracts/:contractId" element={<ViewContract />} />
                      
                      {/* KOL-specific routes */}
                      <Route path="kol/campaigns" element={
                        <RoleProtectedRoute allowedRoles={['kol', 'admin']}>
                          <AvailableCampaigns />
                        </RoleProtectedRoute>
                      } />
                      <Route path="kol/applications" element={
                        <RoleProtectedRoute allowedRoles={['kol', 'admin']}>
                          <Applications />
                        </RoleProtectedRoute>
                      } />
                      <Route path="kol/analytics" element={
                        <RoleProtectedRoute allowedRoles={['kol', 'admin']}>
                          <Analytics />
                        </RoleProtectedRoute>
                      } />
                      <Route path="kol/contracts" element={
                        <RoleProtectedRoute allowedRoles={['kol', 'admin']}>
                          <KOLContracts />
                        </RoleProtectedRoute>
                      } />
                      <Route path="kol/messages" element={
                        <RoleProtectedRoute allowedRoles={['kol', 'admin']}>
                          <KolMessagesPage />
                        </RoleProtectedRoute>
                      } />
                      <Route path="kol/creator-hub" element={
                        <RoleProtectedRoute allowedRoles={['kol', 'admin']}>
                          <KolCreatorHub />
                        </RoleProtectedRoute>
                      } />
                      
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
}

export default App;

import EditCampaignPage from "./pages/dashboard/EditCampaign";

