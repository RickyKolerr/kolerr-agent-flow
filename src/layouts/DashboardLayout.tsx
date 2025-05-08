
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  HomeIcon,
  UserIcon,
  BarChartIcon,
  MessageSquare,
  Calendar,
  FileText,
  Settings,
  User2,
  Users,
  Wallet,
  Stamp,
  Star,
  AreaChart,
} from "lucide-react";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobileDevice = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!isMobileDevice) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [isMobileDevice]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex min-h-screen">
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full w-72 flex-col overflow-y-auto border-r bg-white px-3 py-4 transition-transform duration-300 ease-in-out dark:border-neutral-700 dark:bg-neutral-900",
          {
            "-translate-x-full": !isSidebarOpen,
            "translate-x-0": isSidebarOpen,
          }
        )}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Kolerr</h1>
          {isMobileDevice && (
            <button
              onClick={toggleSidebar}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
            >
              {isSidebarOpen ? "Close" : "Open"}
            </button>
          )}
        </div>
        <nav className="mt-6 space-y-1">
          {navigationRoutes(user?.role).map((route, index) => (
            <a
              key={index}
              href={route.path}
              className="group flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <route.icon className="h-4 w-4 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span>{route.title}</span>
            </a>
          ))}
        </nav>
      </aside>
      
      <div className={cn("flex-1 space-y-4 p-0", {
        "md:ml-72": isSidebarOpen,
        "ml-0": !isSidebarOpen,
      })}>
        <header className="fixed top-0 left-0 z-40 w-full bg-white p-4 shadow-md dark:bg-neutral-900">
          <div className="container mx-auto flex items-center justify-between">
            <div className="text-xl font-semibold">
              {/* You can add a header title or breadcrumbs here */}
            </div>
            {/* Add user info or additional header elements here */}
          </div>
        </header>
        
        <div className={cn("px-4 md:px-8 pb-8", {
          "mt-16": isMobileDevice,
        })}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export const navigationRoutes = (role: string = 'brand') => {
  const routes = [
    {
      title: "Dashboard",
      icon: HomeIcon,
      path: role === 'kol' ? "/dashboard/kol/campaigns" : "/dashboard/overview",
      roles: ["brand", "kol", "admin"],
    },
    {
      title: "Messages",
      icon: MessageSquare,
      path: role === 'kol' ? "/dashboard/kol/messages" : "/dashboard/messages",
      roles: ["brand", "kol", "admin"],
    },
  ];

  // Brand-specific routes
  if (role === 'brand' || role === 'admin') {
    routes.push(
      {
        title: "KOLs",
        icon: User2,
        path: "/dashboard/kols",
        roles: ["brand", "admin"],
      },
      {
        title: "Campaigns",
        icon: BarChartIcon,
        path: "/dashboard/campaigns",
        roles: ["brand", "admin"],
      },
      {
        title: "Bookings",
        icon: Calendar,
        path: "/dashboard/bookings",
        roles: ["brand", "admin"],
      },
      {
        title: "Applications",
        icon: FileText,
        path: "/dashboard/applications",
        roles: ["brand", "admin"],
      },
      {
        title: "Team",
        icon: Users,
        path: "/dashboard/team",
        roles: ["brand", "admin"],
      },
      {
        title: "Creator Hub",
        icon: Star,
        path: "/dashboard/creator-hub",
        roles: ["brand", "admin"],
      },
    );
  }

  // KOL-specific routes
  if (role === 'kol' || role === 'admin') {
    routes.push(
      {
        title: "Available Campaigns",
        icon: BarChartIcon,
        path: "/dashboard/kol/campaigns",
        roles: ["kol", "admin"],
      },
      {
        title: "My Applications",
        icon: FileText,
        path: "/dashboard/kol/applications",
        roles: ["kol", "admin"],
      },
      {
        title: "Analytics",
        icon: AreaChart,
        path: "/dashboard/kol/analytics",
        roles: ["kol", "admin"],
      },
      {
        title: "Creator Hub",
        icon: Star,
        path: "/dashboard/kol/creator-hub",
        roles: ["kol", "admin"],
      },
    );
  }

  // Common routes
  routes.push(
    {
      title: "Contracts",
      icon: Stamp,
      path: role === 'kol' ? "/dashboard/kol/contracts" : "/dashboard/contracts",
      roles: ["brand", "kol", "admin"],
    },
    {
      title: "Profile",
      icon: UserIcon,
      path: "/dashboard/profile",
      roles: ["brand", "kol", "admin"],
    },
    {
      title: "Credits",
      icon: Wallet,
      path: "/dashboard/credits",
      roles: ["brand", "kol", "admin"],
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
      roles: ["brand", "kol", "admin"],
    },
  );

  return routes;
};

export default DashboardLayout;
