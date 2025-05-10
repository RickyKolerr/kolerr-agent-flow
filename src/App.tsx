import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/About";
import FeaturesPage from "@/pages/Features";
import PricingPage from "@/pages/Pricing";
import NotFoundPage from "@/pages/NotFound";

import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPassword";
import EmailVerificationPage from "@/pages/auth/EmailVerification";
import OnboardingKOLPage from "@/pages/auth/OnboardingKOL";
import OnboardingBrandPage from "@/pages/auth/OnboardingBrand";

import DashboardLayout from "@/layouts/DashboardLayout";
import OverviewPage from "@/pages/dashboard/Overview";
import KOLsPage from "@/pages/dashboard/KOLs";
import BookingsPage from "@/pages/dashboard/Bookings";
import CreditsPage from "@/pages/dashboard/Credits";
import MessagesPage from "@/pages/dashboard/Messages";
import CampaignsPage from "@/pages/dashboard/Campaigns";
import ContractsPage from "@/pages/dashboard/Contracts";
import CreateContractPage from "@/pages/dashboard/CreateContract";
import ViewContractPage from "@/pages/dashboard/ViewContract";
import TeamManagementPage from "@/pages/dashboard/TeamManagement";
import CreateCampaignPage from "@/pages/dashboard/CreateCampaign";
import ProfilePage from "@/pages/dashboard/Profile";
import SettingsPage from "@/pages/dashboard/Settings";
import AnalyticsPage from "@/pages/dashboard/Analytics";
import SubscriptionPage from "@/pages/dashboard/Subscription";
import PaymentPage from "@/pages/dashboard/Payment";
import PaymentSuccessPage from "@/pages/dashboard/PaymentSuccess";
import ScheduleBookingPage from "@/pages/dashboard/ScheduleBooking";
import CreatorHubPage from "@/pages/dashboard/CreatorHub";

import KOLAvailableCampaignsPage from "@/pages/dashboard/kol/AvailableCampaigns";
import KOLCampaignDetailPage from "@/pages/dashboard/kol/CampaignDetail";
import KOLApplicationsPage from "@/pages/dashboard/kol/Applications";
import KOLAnalyticsPage from "@/pages/dashboard/kol/Analytics";
import KOLMessagesPage from "@/pages/dashboard/kol/Messages";
import KOLContractsPage from "@/pages/dashboard/kol/KOLContracts";
import KOLCreatorHubPage from "@/pages/dashboard/kol/CreatorHub";

import DocsPage from "@/pages/docs/DocsPage";
import APIPage from "@/pages/api/APIPage";
import BlogPage from "@/pages/blog/BlogPage";
import HelpCenterPage from "@/pages/help/HelpCenter";

import PartnersPage from "@/pages/partners/PartnersPage";
import ContactPage from "@/pages/ContactPage";
import CareersPage from "@/pages/company/CareersPage";
import PressPage from "@/pages/company/PressPage";
import SustainabilityPage from "@/pages/company/SustainabilityPage";

import PrivacyPage from "@/pages/legal/Privacy";
import TermsPage from "@/pages/legal/Terms";
import SecurityPage from "@/pages/legal/SecurityPage";
import CompliancePage from "@/pages/legal/CompliancePage";

import AdvancedSearchPage from "@/pages/search/AdvancedSearch";
import SearchResultsPage from "@/pages/search/SearchResults";
import SearchHistoryPage from "@/pages/search/SearchHistory";

import { AuthProvider } from "@/contexts/AuthContext";
import { CreditProvider } from "@/contexts/CreditContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CreditProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            
            {/* Auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/verify-email" element={<EmailVerificationPage />} />
            <Route path="/onboarding/kol" element={<OnboardingKOLPage />} />
            <Route path="/onboarding/brand" element={<OnboardingBrandPage />} />
            
            {/* Dashboard routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<OverviewPage />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="kols" element={<KOLsPage />} />
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="credits" element={<CreditsPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="campaigns" element={<CampaignsPage />} />
              <Route path="campaigns/create" element={<CreateCampaignPage />} />
              <Route path="contracts" element={<ContractsPage />} />
              <Route path="contracts/create" element={<CreateContractPage />} />
              <Route path="contracts/:id" element={<ViewContractPage />} />
              <Route path="team-management" element={<TeamManagementPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="subscription" element={<SubscriptionPage />} />
              <Route path="payment" element={<PaymentPage />} />
              <Route path="payment/success" element={<PaymentSuccessPage />} />
              <Route path="schedule-booking" element={<ScheduleBookingPage />} />
              
              {/* KOL Dashboard routes */}
              <Route path="kol/campaigns" element={<KOLAvailableCampaignsPage />} />
              <Route path="kol/campaigns/:campaignId" element={<KOLCampaignDetailPage />} />
              <Route path="kol/applications" element={<KOLApplicationsPage />} />
              <Route path="kol/analytics" element={<KOLAnalyticsPage />} />
              <Route path="kol/messages" element={<KOLMessagesPage />} />
              <Route path="kol/contracts" element={<KOLContractsPage />} />
              <Route path="kol/creator-hub" element={<KOLCreatorHubPage />} />
            </Route>
            
            {/* Other routes */}
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/api" element={<APIPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/sustainability" element={<SustainabilityPage />} />
            
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            
            <Route path="/search/advanced" element={<AdvancedSearchPage />} />
            <Route path="/search/results" element={<SearchResultsPage />} />
            <Route path="/search/history" element={<SearchHistoryPage />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster position="top-center" />
        </CreditProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
