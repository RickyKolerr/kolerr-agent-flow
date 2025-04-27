import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Bell,
  User,
  Shield,
  Globe,
  Smartphone,
  Palette,
  Save,
  Mail,
  Search,
  ChevronRight,
  CreditCard,
  FileText,
  Menu
} from "lucide-react";
import { SearchPreferences } from "@/components/settings/SearchPreferences";
import { SavedSearches } from "@/components/search/SavedSearches";
import { CreditAlertSettings } from "@/components/settings/CreditAlertSettings";
import { APIPortal } from "@/components/api/APIPortal";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

type SettingSection = {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
};

const Settings = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<string>("profile");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    emailNotifications: true,
    pushNotifications: false,
    security: false,
  });

  const toggleExpanded = (section: string) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections: SettingSection[] = [
    {
      id: "profile",
      icon: User,
      title: "Profile",
      description: "Manage your personal information"
    },
    {
      id: "notifications",
      icon: Bell,
      title: "Notifications",
      description: "Configure how you receive updates"
    },
    {
      id: "security",
      icon: Shield,
      title: "Security",
      description: "Protect your account"
    },
    {
      id: "appearance",
      icon: Palette,
      title: "Appearance",
      description: "Customize your interface"
    },
    {
      id: "preferences",
      icon: Search,
      title: "Search & Credits",
      description: "Manage search settings and credits"
    }
  ];

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase() || "U";
  };

  const renderMobileSettingsNav = () => {
    const activeSection = sections.find(s => s.id === activeSection);
    const ActiveIcon = activeSection?.icon;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              {ActiveIcon && <ActiveIcon className="h-4 w-4" />}
              {activeSection?.title}
            </span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          {sections.map((section) => (
            <DropdownMenuItem 
              key={section.id}
              className="flex items-center gap-2"
              onClick={() => setActiveSection(section.id)}
            >
              <section.icon className="h-4 w-4" />
              <span>{section.title}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const renderDesktopSettingsNav = () => (
    <div className="hidden md:block w-56 shrink-0 mr-6">
      <div className="space-y-1">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "secondary" : "ghost"}
            className="w-full justify-start mb-1"
            onClick={() => setActiveSection(section.id)}
          >
            <section.icon className="h-4 w-4 mr-2" />
            <span>{section.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );

  const renderProfileSection = () => (
    <>
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-shrink-0">
              <Avatar className="h-20 w-20 border-2 border-brand-gradient-via">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-brand-gradient-via text-white text-xl">
                  {user?.name ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="font-medium">Profile Photo</h3>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">Upload Photo</Button>
                <Button size="sm" variant="outline" className="text-red-500">Remove</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Recommended size: 300x300px. Max file size: 2MB.
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="Demo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="User" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="demo@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" defaultValue="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue="Marketing Manager" />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderNotificationsSection = () => (
    <>
      <Card>
        <CardContent className="p-6 space-y-6">
          <Collapsible
            open={expanded.emailNotifications}
            onOpenChange={() => toggleExpanded("emailNotifications")}
            className="w-full"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 py-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-medium">Email Notifications</h3>
              </div>
              <ChevronRight className={`h-5 w-5 transition-transform ${expanded.emailNotifications ? 'rotate-90' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email_campaigns">Campaign Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when campaign statuses change
                  </p>
                </div>
                <Switch id="email_campaigns" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email_bookings">Booking Confirmations</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails when KOL bookings are confirmed
                  </p>
                </div>
                <Switch id="email_bookings" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email_contracts">Contract Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about contract signings and updates
                  </p>
                </div>
                <Switch id="email_contracts" defaultChecked />
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <Separator />
          
          <Collapsible
            open={expanded.pushNotifications}
            onOpenChange={() => toggleExpanded("pushNotifications")}
            className="w-full"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 py-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-medium">Push Notifications</h3>
              </div>
              <ChevronRight className={`h-5 w-5 transition-transform ${expanded.pushNotifications ? 'rotate-90' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push_all">All Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable all push notifications
                  </p>
                </div>
                <Switch id="push_all" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push_messages">Direct Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you receive messages from KOLs
                  </p>
                </div>
                <Switch id="push_messages" defaultChecked />
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="flex justify-end">
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderSecuritySection = () => (
    <>
      <Card>
        <CardContent className="p-6 space-y-6">
          <Collapsible
            open={expanded.security}
            onOpenChange={() => toggleExpanded("security")}
            className="w-full"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 py-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-medium">Password & Authentication</h3>
              </div>
              <ChevronRight className={`h-5 w-5 transition-transform ${expanded.security ? 'rotate-90' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-2">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current_password">Current Password</Label>
                  <Input id="current_password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input id="new_password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Confirm New Password</Label>
                  <Input id="confirm_password" type="password" />
                </div>
                <Button onClick={() => toast.success("Password updated successfully")} className="w-full sm:w-auto">
                  Update Password
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enable_2fa">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch id="enable_2fa" />
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="font-medium">Active Sessions</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              <div className="flex justify-between items-start p-2 bg-muted/50 rounded-md">
                <div>
                  <p className="font-medium">Current Session</p>
                  <div className="text-sm text-muted-foreground">
                    <p>Chrome on Windows</p>
                    <p>Last active: Just now</p>
                  </div>
                </div>
                <Badge>Active</Badge>
              </div>
              
              <div className="flex justify-between items-start p-2 bg-muted/50 rounded-md">
                <div>
                  <p className="font-medium">Mobile Session</p>
                  <div className="text-sm text-muted-foreground">
                    <p>Kolerr App on iPhone</p>
                    <p>Last active: 2 days ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Revoke
                </Button>
              </div>
            </div>
            
            <Button variant="outline" className="mt-2 w-full">
              Sign Out of All Other Sessions
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderAppearanceSection = () => (
    <>
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Theme</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                className="flex flex-col h-auto p-2 aspect-square items-center justify-center border-2 border-brand-pink"
              >
                <div className="w-full h-12 rounded-md bg-white mb-2"></div>
                <span className="text-xs">Light</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col h-auto p-2 aspect-square items-center justify-center"
              >
                <div className="w-full h-12 rounded-md bg-gray-900 mb-2"></div>
                <span className="text-xs">Dark</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col h-auto p-2 aspect-square items-center justify-center"
              >
                <div className="w-full h-12 rounded-md bg-gradient-to-b from-white to-gray-900 mb-2"></div>
                <span className="text-xs">System</span>
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="font-medium">Accent Color</h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                { name: "Pink", color: "#F472B6" },
                { name: "Blue", color: "#3B82F6" },
                { name: "Green", color: "#10B981" },
                { name: "Orange", color: "#F97316" },
              ].map((accent) => (
                <div key={accent.name} className="flex flex-col items-center space-y-2">
                  <div 
                    className={`w-8 h-8 rounded-full cursor-pointer shadow-sm border-2 ${accent.name === "Pink" ? "border-white" : "border-transparent"}`}
                    style={{ backgroundColor: accent.color }}
                  />
                  <span className="text-xs">{accent.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderPreferencesSection = () => (
    <div className="space-y-6">
      <SearchPreferences />
      <CreditAlertSettings />
      <SavedSearches />
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "notifications":
        return renderNotificationsSection();
      case "security":
        return renderSecuritySection();
      case "appearance":
        return renderAppearanceSection();
      case "preferences":
        return renderPreferencesSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row">
        {isMobile ? renderMobileSettingsNav() : renderDesktopSettingsNav()}
        
        <div className="flex-1">
          {renderActiveSection()}
        </div>
      </div>
      
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-10">
          <Button onClick={handleSave} size="lg" variant="gradient" className="shadow-lg">
            <Save className="mr-2 h-4 w-4" />
            Save All Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default Settings;
