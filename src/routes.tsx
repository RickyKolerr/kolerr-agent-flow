
import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import Overview from "@/pages/dashboard/Overview";
import KOLs from "@/pages/dashboard/KOLs"; // Fixed casing to match the actual file
import Bookings from "@/pages/dashboard/Bookings";
import Credits from "@/pages/dashboard/Credits";
import Settings from "@/pages/dashboard/Settings";
import Campaigns from "@/pages/dashboard/Campaigns";
import Analytics from "@/pages/dashboard/Analytics";
import Contracts from "@/pages/dashboard/Contracts";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Onboarding from "@/pages/Onboarding";
import KolCampaigns from "@/pages/dashboard/kol/Campaigns";
import KolApplications from "@/pages/dashboard/kol/Applications";
import KolAnalytics from "@/pages/dashboard/kol/Analytics";
import KolContracts from "@/pages/dashboard/kol/Contracts";
import CreatorHub from "@/pages/dashboard/kol/CreatorHub";
import Messages from "@/pages/dashboard/Messages";
import KolMessages from "@/pages/dashboard/kol/Messages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/onboarding/:role",
    element: <Onboarding />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "kols",
        element: <Kols />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "credits",
        element: <Credits />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "campaigns",
        element: <Campaigns />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "contracts",
        element: <Contracts />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      
      // KOL routes
      {
        path: "kol/campaigns",
        element: <KolCampaigns />,
      },
      {
        path: "kol/applications",
        element: <KolApplications />,
      },
      {
        path: "kol/analytics",
        element: <KolAnalytics />,
      },
      {
        path: "kol/contracts",
        element: <KolContracts />,
      },
      {
        path: "kol/messages",
        element: <KolMessages />,
      },
      
      // New Creator Hub route
      {
        path: "kol/creator-hub",
        element: <CreatorHub />,
      },
      
      // Redirects from old routes to new unified hub
      {
        path: "kol/referrals",
        element: <Navigate to="/dashboard/kol/creator-hub?tab=referrals" replace />,
      },
      {
        path: "kol/rewards",
        element: <Navigate to="/dashboard/kol/creator-hub?tab=rewards" replace />,
      },
      {
        path: "kol/community",
        element: <Navigate to="/dashboard/kol/creator-hub?tab=community" replace />,
      },
    ]
  },
]);

export default router;
