import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Users, Calendar, CreditCard, 
  Settings, LogOut, Menu, X, Languages,
  Star, Link, BadgePercent, TrendingUp, MessageCircle, FileSearch, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Auto-hide sidebar on login/initial load
  useEffect(() => {
    // Start with sidebar closed on mobile, open on desktop
    setIsSidebarOpen(window.innerWidth >= 768);
  }, []);

  // Handle clicks outside sidebar to close it on mobile
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (window.innerWidth < 768 && 
          isSidebarOpen && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSidebarOpen]);

  // Determine menu items based on user role
  const getBrandMenuItems = () => [
    { 
      icon: LayoutDashboard, 
      name: "Overview", 
      path: "/dashboard/overview",
      description: t('dashboard.overview')
    },
    { 
      icon: Users, 
      name: "KOLs", 
      path: "/dashboard/kols",
      description: t('dashboard.kols')
    },
    { 
      icon: Calendar, 
      name: "Bookings", 
      path: "/dashboard/bookings",
      description: t('dashboard.bookings')
    },
    { 
      icon: CreditCard, 
      name: "Credits", 
      path: "/dashboard/credits",
      description: t('dashboard.credits')
    },
    { 
      icon: MessageCircle, 
      name: "Messages", 
      path: "/dashboard/messages",
      description: "Chat with creators and partners"
    },
    { 
      icon: FileText, 
      name: "Contracts", 
      path: "/dashboard/contracts",
      description: t('dashboard.contracts')
    },
  ];

  const getKolMenuItems = () => [
    { 
      icon: FileSearch, 
      name: "Available Campaigns", 
      path: "/dashboard/kol/campaigns",
      description: "Browse available campaigns"
    },
    { 
      icon: FileText, 
      name: "My Applications", 
      path: "/dashboard/kol/applications",
      description: "Track your campaign applications"
    },
    { 
      icon: TrendingUp, 
      name: "Performance", 
      path: "/dashboard/kol/analytics",
      description: "Your performance analytics"
    },
    { 
      icon: MessageCircle, 
      name: "Messages", 
      path: "/dashboard/kol/messages",
      description: "Chat with brands and partners"
    },
    { 
      icon: FileText, 
      name: "Contracts", 
      path: "/dashboard/kol/contracts", 
      description: "Manage your contracts"
    },
    { 
      icon: Link, 
      name: "Referrals", 
      path: "/dashboard/kol/referrals",
      description: "Refer other creators"
    },
    { 
      icon: BadgePercent, 
      name: "Rewards", 
      path: "/dashboard/kol/rewards",
      description: "Your reward points and benefits"
    },
    { 
      icon: MessageCircle, 
      name: "Community", 
      path: "/dashboard/kol/community",
      description: "Connect with other creators"
    },
  ];
  
  // Select the appropriate menu items based on user role
  const menuItems = user?.role === 'kol' ? getKolMenuItems() : getBrandMenuItems();
  
  const userItems = [
    { 
      icon: Settings, 
      name: "Settings & Billing", 
      path: "/dashboard/settings",
      description: t('dashboard.settings')
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="fixed top-4 right-4 z-50 md:hidden"
        >
          {isSidebarOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
        </Button>

        <aside 
          ref={sidebarRef}
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out",
            "bg-gradient-to-b from-brand-navy to-brand-dark border-r border-white/10",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
            "md:translate-x-0 md:transition-all md:ease-in-out md:duration-300",
            !isSidebarOpen && "md:w-0 md:border-none md:overflow-hidden"
          )}
        >
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <img 
                src="/lovable-uploads/ff866eaa-8037-4015-a3f1-e8d5c10916b3.png" 
                alt="Kolerr Logo" 
                className="h-10 w-10"
              />
            </button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleLanguage} 
              className="text-white/70 hover:text-white hover:bg-white/10"
              title={language === 'en' ? t('language.vi') : t('language.en')}
            >
              <Languages className="h-5 w-5" />
            </Button>
          </div>

          <TooltipProvider>
            <nav className="px-3 py-6 flex flex-col h-[calc(100%-4rem-5rem)]">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <Tooltip key={item.name} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className={cn(
                          "flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors gap-3",
                          location.pathname === item.path
                            ? "bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to text-white font-medium"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="ml-2">
                      {item.description}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>

              <Separator className="my-6 bg-white/10" />

              <div className="space-y-1">
                {userItems.map((item) => (
                  <Tooltip key={item.name} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className={cn(
                          "flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors gap-3",
                          location.pathname === item.path
                            ? "bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to text-white font-medium"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="ml-2">
                      {item.description}
                    </TooltipContent>
                  </Tooltip>
                ))}
                <button
                  onClick={() => logout()}
                  className="flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors gap-3 text-white/70 hover:text-white hover:bg-white/10"
                >
                  <LogOut className="h-5 w-5" />
                  <span>{t('mainNav.logout')}</span>
                </button>
              </div>
            </nav>
          </TooltipProvider>

          <div className="absolute bottom-0 w-full p-4 border-t border-white/10 bg-black/20">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-brand-gradient-via">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-brand-gradient-via text-white">
                  {user?.name ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate text-white">{user?.name}</p>
                <p className="text-xs truncate text-white/70">{user?.email}</p>
              </div>
            </div>
          </div>
        </aside>

        <main 
          className={cn(
            "flex-1 overflow-auto transition-all duration-300 ease-in-out",
            "bg-gradient-to-br from-background via-background to-brand-navy/5",
            isSidebarOpen ? "md:ml-64" : "ml-0"
          )}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-30 hidden md:flex"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="container mx-auto p-6 pt-16 md:pt-6">
            <Outlet />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
