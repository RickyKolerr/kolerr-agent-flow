
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { SearchPreferences } from "./SearchPreferences";
import { CreditAlertSettings } from "./CreditAlertSettings";
import { LanguagePreferences } from "./LanguagePreferences";
import { NotificationSettings } from "./NotificationSettings";
import { SecuritySettings } from "./SecuritySettings";
import { AppearanceSettings } from "./AppearanceSettings";

export const SettingsGeneral = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <SearchPreferences />
      <NotificationSettings />
      <SecuritySettings />
      <AppearanceSettings />
      <CreditAlertSettings />
      <LanguagePreferences />
    </div>
  );
};
