
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Users, BarChart, Calendar, CreditCard, 
  Settings, FileText, LogOut, Menu, X, Languages 
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
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
      icon: BarChart,
      name: "Analytics",
      path: "/dashboard/analytics",
      description: t('dashboard.analytics')
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
      icon: FileText, 
      name: "Contracts", 
      path: "/dashboard/contracts",
      description: t('dashboard.contracts')
    },
  ];
  
  const userItems = [
    { 
      icon: Settings, 
      name: "Settings", 
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
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 right-4 z-50 md:hidden"
        >
          {isSidebarOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
        </Button>

        <aside 
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out",
            "bg-gradient-to-b from-brand-navy to-brand-dark border-r border-white/10",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
            "md:translate-x-0"
          )}
        >
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
            <button 
              onClick={() => handleNavigation('/')} 
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <img 
                src="/lovable-uploads/d4572dc9-629c-46f5-9256-41590c40e030.png" 
                alt="Kolerr Logo" 
                className="h-10 w-10"
              />
              <span className="font-bold text-2xl bg-gradient-to-r from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to bg-clip-text text-transparent">
                Kolerr
              </span>
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
            <nav className="px-3 py-6">
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
          <div className="container mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
