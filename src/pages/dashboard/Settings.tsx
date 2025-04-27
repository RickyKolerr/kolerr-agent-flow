
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";
import { Settings as SettingsIcon, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SettingsGeneral } from "@/components/settings/SettingsGeneral";
import { SettingsBilling } from "@/components/settings/SettingsBilling";

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(
    location.pathname.includes("billing") ? "billing" : "general"
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(value === "billing" ? "/dashboard/settings/billing" : "/dashboard/settings");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings & Billing</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and subscription preferences.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            General Settings
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Billing & Subscription
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <SettingsGeneral />
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <SettingsBilling />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
