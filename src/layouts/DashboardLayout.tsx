import { useState, useEffect, useMemo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MainNav } from "@/components/MainNav";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { UserRole } from "@/contexts/AuthContext";
import { MessageCircle } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

interface NavLink {
  name: string;
  href: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
}

// Update the sidebar navigation to include the chat link
const generateNavigation = (role: string, unreadCount = 0) => {
  const commonLinks = [
    {
      name: "Overview",
      href: "/dashboard/overview",
      icon: Icons.overview,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: Icons.profile,
    },
    {
      name: "Billing",
      href: "/dashboard/billing",
      icon: Icons.billing,
    },
    {
      name: "Subscription",
      href: "/dashboard/subscription",
      icon: Icons.subscription,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Icons.settings,
    },
    {
      name: "Messages",
      href: "/dashboard/messages",
      icon: MessageCircle,
      badge: unreadCount > 0 ? unreadCount.toString() : undefined,
      badgeColor: "bg-brand-pink"
    },
  ];

  const brandLinks = [
    {
      name: "KOLs",
      href: "/dashboard/kols",
      icon: Icons.kols,
    },
    {
      name: "Campaigns",
      href: "/dashboard/campaigns",
      icon: Icons.campaigns,
    },
    {
      name: "Bookings",
      href: "/dashboard/bookings",
      icon: Icons.bookings,
    },
    {
      name: "Credits",
      href: "/dashboard/credits",
      icon: Icons.credits,
    },
    {
      name: "Contracts",
      href: "/dashboard/contracts",
      icon: Icons.contracts,
    }
  ];

  const kolLinks = [
    {
      name: "Available Campaigns",
      href: "/dashboard/kol/campaigns",
      icon: Icons.campaigns,
    },
    {
      name: "Applications",
      href: "/dashboard/kol/applications",
      icon: Icons.applications,
    },
    {
      name: "Analytics",
      href: "/dashboard/kol/analytics",
      icon: Icons.analytics,
    },
    {
      name: "Referrals",
      href: "/dashboard/kol/referrals",
      icon: Icons.referrals,
    },
    {
      name: "Rewards",
      href: "/dashboard/kol/rewards",
      icon: Icons.rewards,
    },
    {
      name: "Community",
      href: "/dashboard/kol/community",
      icon: Icons.community,
    },
    {
      name: "Contracts",
      href: "/dashboard/kol/contracts",
      icon: Icons.contracts,
    }
  ];

  let roleSpecificLinks: NavLink[] = [];
  if (role === "brand") {
    roleSpecificLinks = brandLinks;
  } else if (role === "kol") {
    roleSpecificLinks = kolLinks;
  }

  // Return the merged navigation based on role
  return [...commonLinks, ...roleSpecificLinks];
};

// Inside the DashboardLayout component, update the navigation to include unread count
const DashboardLayout = () => {
  const { user, isAuthenticated } = useAuth();
  const { unreadCount } = useChat();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    setIsLoading(false);
  }, []);
  
  const navigation = useMemo(() => {
    return generateNavigation(user?.role || 'brand', unreadCount);
  }, [user?.role, unreadCount]);
  
  if (!isMounted) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  return (
    <div className="flex h-screen bg-gray-100 text-gray-700">
      {/* Sidebar navigation */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Icons.menu className="h-6 w-6" />
            <span className="sr-only">Open navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:w-60 border-r pr-0">
          <SheetHeader className="pl-6 pb-10 pt-6">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <MainNav />
          <ScrollArea className="flex-1">
            <div className="py-4">
              {navigation.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className={cn(
                    "justify-start px-6",
                    location.pathname === item.href ? "font-semibold" : "font-normal"
                  )}
                  onClick={() => {
                    navigate(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                  {item.badge && (
                    <span className={cn(
                      "ml-auto rounded-sm px-2 py-0.5 text-xs font-semibold",
                      item.badgeColor || "bg-secondary",
                      "text-secondary-foreground"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="w-full h-16 flex items-center justify-between border-b p-4 md:pl-6">
          <div className="flex items-center space-x-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Icons.menu className="h-6 w-6" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
            </Sheet>
            <div className="hidden md:flex">
              <MainNav />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{user.name}</span>
          </div>
        </header>
        
        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
