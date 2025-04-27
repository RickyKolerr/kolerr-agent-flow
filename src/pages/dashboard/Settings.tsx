
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bell, Shield, UserCog, Globe, Key, Save, Mail, Settings2, Smartphone, 
  Languages, Github, Twitter, Linkedin, Instagram
} from "lucide-react";
import { toast } from "sonner";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("account");

  // Mock settings
  const settings = {
    account: {
      username: "alexjohnson",
      email: "alex.johnson@example.com",
      language: "english",
      timezone: "America/New_York"
    },
    notification: {
      email: {
        marketing: true,
        security: true,
        account: true,
        updates: true
      },
      push: {
        newMessage: true,
        contractSigned: true,
        bookingRequests: true,
        campaignUpdates: false
      }
    },
    security: {
      twoFactorEnabled: false,
      lastPassChange: "2023-05-15"
    },
    appearance: {
      theme: "dark",
      denseMode: false
    },
    integrations: {
      github: false,
      twitter: true,
      linkedin: true,
      instagram: true
    }
  };

  const handleSaveSettings = (settingType: string) => {
    toast.success(`${settingType.charAt(0).toUpperCase() + settingType.slice(1)} settings saved successfully!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar tabs for larger screens */}
        <div className="md:w-64 flex-shrink-0 space-y-1 hidden md:block">
          <div 
            className={`flex items-center p-2 rounded-md cursor-pointer ${activeTab === 'account' ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
            onClick={() => setActiveTab('account')}
          >
            <UserCog className="h-5 w-5 mr-2" />
            <span>Account</span>
          </div>
          <div 
            className={`flex items-center p-2 rounded-md cursor-pointer ${activeTab === 'notifications' ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell className="h-5 w-5 mr-2" />
            <span>Notifications</span>
          </div>
          <div 
            className={`flex items-center p-2 rounded-md cursor-pointer ${activeTab === 'security' ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
            onClick={() => setActiveTab('security')}
          >
            <Shield className="h-5 w-5 mr-2" />
            <span>Security</span>
          </div>
          <div 
            className={`flex items-center p-2 rounded-md cursor-pointer ${activeTab === 'appearance' ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
            onClick={() => setActiveTab('appearance')}
          >
            <Settings2 className="h-5 w-5 mr-2" />
            <span>Appearance</span>
          </div>
          <div 
            className={`flex items-center p-2 rounded-md cursor-pointer ${activeTab === 'integrations' ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
            onClick={() => setActiveTab('integrations')}
          >
            <Globe className="h-5 w-5 mr-2" />
            <span>Integrations</span>
          </div>
        </div>

        {/* Tabs for mobile */}
        <div className="md:hidden">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="account"><UserCog className="h-5 w-5" /></TabsTrigger>
              <TabsTrigger value="notifications"><Bell className="h-5 w-5" /></TabsTrigger>
              <TabsTrigger value="security"><Shield className="h-5 w-5" /></TabsTrigger>
              <TabsTrigger value="appearance"><Settings2 className="h-5 w-5" /></TabsTrigger>
              <TabsTrigger value="integrations"><Globe className="h-5 w-5" /></TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Settings content */}
        <div className="flex-1 space-y-6">
          {activeTab === 'account' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserCog className="h-5 w-5 mr-2" />
                    Account Settings
                  </CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue={settings.account.username} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={settings.account.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue={settings.account.language}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                            <SelectItem value="chinese">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue={settings.account.timezone}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                            <SelectItem value="America/Chicago">Central Time (US & Canada)</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time (US & Canada)</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                            <SelectItem value="Europe/London">London</SelectItem>
                            <SelectItem value="Europe/Paris">Paris</SelectItem>
                            <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleSaveSettings('account')}
                    className="bg-brand-pink hover:bg-brand-pink/90"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delete Account</CardTitle>
                  <CardDescription>Permanently delete your account and all associated data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      This action cannot be undone. All your data including campaigns, contracts, and settings will be permanently deleted.
                    </p>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Mail className="h-5 w-5" />
                      <h3 className="text-lg font-medium">Email Notifications</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="marketing-email" className="cursor-pointer">Marketing and promotions</Label>
                        <Switch id="marketing-email" checked={settings.notification.email.marketing} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="security-email" className="cursor-pointer">Security alerts</Label>
                        <Switch id="security-email" checked={settings.notification.email.security} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="account-email" className="cursor-pointer">Account updates</Label>
                        <Switch id="account-email" checked={settings.notification.email.account} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="updates-email" className="cursor-pointer">Platform updates and news</Label>
                        <Switch id="updates-email" checked={settings.notification.email.updates} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center space-x-2 mb-4">
                      <Smartphone className="h-5 w-5" />
                      <h3 className="text-lg font-medium">Push Notifications</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="message-push" className="cursor-pointer">New messages</Label>
                        <Switch id="message-push" checked={settings.notification.push.newMessage} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="contract-push" className="cursor-pointer">Contract signed</Label>
                        <Switch id="contract-push" checked={settings.notification.push.contractSigned} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="booking-push" className="cursor-pointer">Booking requests</Label>
                        <Switch id="booking-push" checked={settings.notification.push.bookingRequests} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="campaign-push" className="cursor-pointer">Campaign updates</Label>
                        <Switch id="campaign-push" checked={settings.notification.push.campaignUpdates} />
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => handleSaveSettings('notification')}
                  className="bg-brand-pink hover:bg-brand-pink/90"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <Key className="h-5 w-5 mr-2" />
                      Password
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Last changed: {new Date(settings.security.lastPassChange).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      className="bg-brand-pink hover:bg-brand-pink/90"
                      onClick={() => handleSaveSettings('password')}
                    >
                      Update Password
                    </Button>
                  </div>

                  <div className="pt-6 border-t border-border space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication (2FA)</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Add an extra layer of security to your account</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {settings.security.twoFactorEnabled 
                            ? 'Two-factor authentication is currently enabled.'
                            : 'Two-factor authentication is currently disabled.'}
                        </p>
                      </div>
                      <Button 
                        variant={settings.security.twoFactorEnabled ? "outline" : "default"}
                        className={!settings.security.twoFactorEnabled ? "bg-brand-pink hover:bg-brand-pink/90" : ""}
                      >
                        {settings.security.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                      </Button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border space-y-4">
                    <h3 className="text-lg font-medium">Active Sessions</h3>
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">New York, USA • Chrome on Mac</p>
                          <p className="text-xs text-muted-foreground">Started 2 hours ago</p>
                        </div>
                        <Badge>Current</Badge>
                      </div>
                    </div>
                    <Button variant="outline">Sign out of all sessions</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings2 className="h-5 w-5 mr-2" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>Customize how the application looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="theme" className="text-lg font-medium block mb-3">Theme</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className={`border rounded-md p-4 text-center cursor-pointer transition-all ${settings.appearance.theme === 'light' ? 'border-brand-pink bg-pink-500/10' : 'hover:bg-muted'}`}>
                        <div className="h-20 rounded bg-white mb-2"></div>
                        <span className="text-sm font-medium">Light</span>
                      </div>
                      <div className={`border rounded-md p-4 text-center cursor-pointer transition-all ${settings.appearance.theme === 'dark' ? 'border-brand-pink bg-pink-500/10' : 'hover:bg-muted'}`}>
                        <div className="h-20 rounded bg-gray-900 mb-2"></div>
                        <span className="text-sm font-medium">Dark</span>
                      </div>
                      <div className={`border rounded-md p-4 text-center cursor-pointer transition-all ${settings.appearance.theme === 'system' ? 'border-brand-pink bg-pink-500/10' : 'hover:bg-muted'}`}>
                        <div className="h-20 rounded bg-gradient-to-r from-white to-gray-900 mb-2"></div>
                        <span className="text-sm font-medium">System</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dense-mode" className="text-lg font-medium block">Dense Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Compact UI with less whitespace
                        </p>
                      </div>
                      <Switch id="dense-mode" checked={settings.appearance.denseMode} />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <Label htmlFor="accent-color" className="text-lg font-medium block mb-3">Accent Color</Label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-pink-500 mb-1 cursor-pointer ring-2 ring-offset-2 ring-pink-500"></div>
                        <span className="text-xs">Pink</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-500 mb-1 cursor-pointer"></div>
                        <span className="text-xs">Blue</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-green-500 mb-1 cursor-pointer"></div>
                        <span className="text-xs">Green</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-purple-500 mb-1 cursor-pointer"></div>
                        <span className="text-xs">Purple</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-orange-500 mb-1 cursor-pointer"></div>
                        <span className="text-xs">Orange</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-yellow-500 mb-1 cursor-pointer"></div>
                        <span className="text-xs">Yellow</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => handleSaveSettings('appearance')}
                  className="bg-brand-pink hover:bg-brand-pink/90"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Appearance
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'integrations' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Integrations
                </CardTitle>
                <CardDescription>Connect your accounts to external services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center">
                      <Github className="h-8 w-8 mr-4" />
                      <div>
                        <p className="font-medium">GitHub</p>
                        <p className="text-sm text-muted-foreground">Connect your GitHub account</p>
                      </div>
                    </div>
                    <Button variant={settings.integrations.github ? "outline" : "default"}>
                      {settings.integrations.github ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center">
                      <Twitter className="h-8 w-8 mr-4 text-blue-400" />
                      <div>
                        <p className="font-medium">Twitter</p>
                        <p className="text-sm text-muted-foreground">Connect your Twitter account</p>
                      </div>
                    </div>
                    <Button variant={settings.integrations.twitter ? "outline" : "default"}>
                      {settings.integrations.twitter ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center">
                      <Linkedin className="h-8 w-8 mr-4 text-blue-600" />
                      <div>
                        <p className="font-medium">LinkedIn</p>
                        <p className="text-sm text-muted-foreground">Connect your LinkedIn account</p>
                      </div>
                    </div>
                    <Button variant={settings.integrations.linkedin ? "outline" : "default"}>
                      {settings.integrations.linkedin ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Instagram className="h-8 w-8 mr-4 text-pink-500" />
                      <div>
                        <p className="font-medium">Instagram</p>
                        <p className="text-sm text-muted-foreground">Connect your Instagram account</p>
                      </div>
                    </div>
                    <Button variant={settings.integrations.instagram ? "outline" : "default"}>
                      {settings.integrations.instagram ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="text-lg font-medium mb-4">API Access</h3>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex space-x-2">
                      <Input id="api-key" value="••••••••••••••••••••••••••••••" readOnly className="flex-1" />
                      <Button variant="outline">Regenerate</Button>
                      <Button variant="outline">Copy</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your API key allows third-party applications to access your account data.
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => handleSaveSettings('integrations')}
                  className="bg-brand-pink hover:bg-brand-pink/90"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Integration Settings
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
