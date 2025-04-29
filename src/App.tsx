
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import Index from './pages/Index';
import About from './pages/About';
import Features from './pages/Features';
import ContactPage from './pages/ContactPage';
import Pricing from './pages/Pricing';
import BlogPage from './pages/blog/BlogPage';
import DocsPage from './pages/docs/DocsPage';
import PartnersPage from './pages/partners/PartnersPage';
import SearchResults from './pages/search/SearchResults';
import AdvancedSearch from './pages/search/AdvancedSearch';
import SearchHistory from './pages/search/SearchHistory';
import CreatorProfile from './pages/creators/CreatorProfile';
import APIPage from './pages/api/APIPage';
import HelpCenter from './pages/help/HelpCenter';
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import SecurityPage from './pages/legal/SecurityPage';
import Signup from './pages/auth/SignupPage';
import Login from './pages/auth/LoginPage';
import ForgotPassword from './pages/auth/ForgotPasswordPage';
import ResetPassword from './pages/auth/ResetPassword';
import EmailVerification from './pages/auth/EmailVerification';
import DashboardLayout from './layouts/DashboardLayout';
import CampaignsPage from './pages/dashboard/Campaigns';
import KOLsPage from './pages/dashboard/KOLs';
import AnalyticsPage from './pages/dashboard/Analytics';
import ContractsPage from './pages/dashboard/Contracts';
import SettingsPage from './pages/dashboard/Settings';
import OnboardingPage from './pages/auth/OnboardingPage';
import CreateCampaign from './pages/dashboard/CreateCampaign';
import RewardsPage from './pages/dashboard/Rewards';
import ReferralsPage from './pages/dashboard/Referrals';
import CommunityPage from './pages/dashboard/Community';
import AvailableCampaigns from './pages/dashboard/kol/AvailableCampaigns';
import KOLDashboardLayout from './layouts/KOLDashboardLayout';
import CampaignDetail from './pages/campaigns/CampaignDetail';
import { useAuth } from './contexts/AuthContext';

const queryClient = new QueryClient();

function App() {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/advanced-search" element={<AdvancedSearch />} />
          <Route path="/search-history" element={<SearchHistory />} />
          <Route path="/creators/:creatorId" element={<CreatorProfile />} />
          <Route path="/campaigns/:campaignId" element={<CampaignDetail />} />
          <Route path="/api" element={<APIPage />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/security" element={<SecurityPage />} />
          
          {/* Auth routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-email/:token" element={<EmailVerification />} />
          
          {/* Dashboard routes */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <DashboardLayout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route path="campaigns" element={<CampaignsPage />} />
            <Route path="campaigns/create" element={<CreateCampaign />} />
            <Route path="kols" element={<KOLsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="contracts" element={<ContractsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="rewards" element={<RewardsPage />} />
            <Route path="referrals" element={<ReferralsPage />} />
            <Route path="community" element={<CommunityPage />} />
          </Route>
          
          {/* KOL Dashboard routes */}
          <Route
            path="/dashboard/kol"
            element={
              isAuthenticated && user?.role === "kol" ? (
                <KOLDashboardLayout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route path="campaigns" element={<AvailableCampaigns />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          
          {/* Onboarding */}
          <Route path="/onboarding/:role" element={<OnboardingPage />} />
          
          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster richColors />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
