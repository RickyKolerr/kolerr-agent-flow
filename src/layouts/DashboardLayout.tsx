import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Users, BarChart, Calendar, CreditCard, 
  User, Settings, FileText, LogOut, Menu, X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      name: "Overview", 
      path: "/dashboard/overview",
    },
    { 
      icon: Users, 
      name: "KOLs", 
      path: "/dashboard/kols",
    },
    { 
      icon: BarChart, 
      name: "Campaigns", 
      path: "/dashboard/campaigns",
    },
    { 
      icon: Calendar, 
      name: "Bookings", 
      path: "/dashboard/bookings",
    },
    { 
      icon: CreditCard, 
      name: "Credits", 
      path: "/dashboard/credits"
    },
    { 
      icon: FileText, 
      name: "Contracts", 
      path: "/dashboard/contracts"
    },
  ];
  
  const userItems = [
    { 
      icon: User, 
      name: "Profile", 
      path: "/dashboard/profile",
    },
    { 
      icon: CreditCard, 
      name: "Billing", 
      path: "/dashboard/billing",
    },
    { 
      icon: Settings, 
      name: "Settings", 
      path: "/dashboard/settings",
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
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

  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="fixed top-4 right-4 z-50 md:hidden"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </Button>

        <aside 
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border shadow-lg transition-transform duration-300 ease-in-out",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
            "md:translate-x-0"
          )}
        >
          <div className="h-16 flex items-center px-6">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-brand-pink flex items-center justify-center">
                <span className="font-bold text-white">K</span>
              </div>
              <span className="font-bold text-xl text-white">Kolerr</span>
            </div>
          </div>

          <nav className="px-4 py-6">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                    location.pathname === item.path
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            <Separator className="my-4 bg-sidebar-border" />

            <div className="space-y-1">
              {userItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                    location.pathname === item.path
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  <span>{item.name}</span>
                </button>
              ))}
              <button
                onClick={() => logout()}
                className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent/50 text-sidebar-foreground transition-colors"
              >
                <LogOut className="h-4 w-4 mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </nav>

          <div className="absolute bottom-0 w-full px-4 py-4 border-t border-sidebar-border">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
              </Avatar>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium truncate text-white">{user?.name}</p>
                <p className="text-xs truncate text-white/70">{user?.email}</p>
              </div>
            </div>
          </div>
        </aside>

        <main 
          className={cn(
            "flex-1 overflow-auto transition-all",
            isSidebarOpen ? "md:ml-64" : "ml-0"
          )}
        >
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
