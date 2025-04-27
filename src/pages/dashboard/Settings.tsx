
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Bell,
  User,
  Shield,
  Globe,
  Smartphone,
  Palette,
  Save,
  Lock,
  Mail,
  BellRing,
  AlertCircle,
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden md:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden md:inline">API</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account profile information and settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-3xl font-semibold">DU</span>
                  </div>
                </div>
                <div className="space-y-2">
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
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" defaultValue="Digital marketing professional with a focus on influencer collaborations." />
                </div>
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive and how.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                
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
                
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="email_marketing">Marketing Communications</Label>
                      <Badge variant="outline">Weekly</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive platform updates and new feature announcements
                    </p>
                  </div>
                  <Switch id="email_marketing" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Push Notifications</h3>
                
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
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and authentication methods.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Change Password</h3>
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
                </div>
                <Button onClick={() => toast.success("Password updated successfully")}>
                  <Lock className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable_2fa">Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch id="enable_2fa" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Session Management</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <div className="text-sm text-muted-foreground">
                        <p>Chrome on Windows</p>
                        <p>Last active: Just now</p>
                      </div>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  
                  <div className="flex justify-between items-start">
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
                <Button variant="outline" className="mt-2 w-full sm:w-auto">
                  Sign Out of All Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how Kolerr looks and feels for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Theme Preferences</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-full h-24 rounded-lg bg-white border border-border flex items-center justify-center">
                      <span className="text-black">Light</span>
                    </div>
                    <Label>
                      <input 
                        type="radio" 
                        name="theme" 
                        value="light" 
                        className="mr-1" 
                      />
                      Light Mode
                    </Label>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-full h-24 rounded-lg bg-gray-900 border border-border flex items-center justify-center">
                      <span className="text-white">Dark</span>
                    </div>
                    <Label>
                      <input 
                        type="radio" 
                        name="theme" 
                        value="dark" 
                        className="mr-1"
                        defaultChecked
                      />
                      Dark Mode
                    </Label>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-full h-24 rounded-lg bg-gradient-to-b from-white to-gray-900 border border-border flex items-center justify-center">
                      <span>Auto</span>
                    </div>
                    <Label>
                      <input 
                        type="radio" 
                        name="theme" 
                        value="system" 
                        className="mr-1" 
                      />
                      System Default
                    </Label>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Accent Color</h3>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-4">
                  {[
                    { name: "Default", color: "#F472B6" },
                    { name: "Blue", color: "#3B82F6" },
                    { name: "Green", color: "#10B981" },
                    { name: "Red", color: "#EF4444" },
                    { name: "Yellow", color: "#F59E0B" },
                    { name: "Purple", color: "#8B5CF6" },
                    { name: "Orange", color: "#F97316" }
                  ].map((accent) => (
                    <div key={accent.name} className="flex flex-col items-center space-y-2">
                      <div 
                        className="w-10 h-10 rounded-full cursor-pointer shadow-sm border-2 border-transparent hover:border-gray-500"
                        style={{ backgroundColor: accent.color }}
                      />
                      <span className="text-xs">{accent.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Interface Density</h3>
                <div className="flex items-center space-x-4">
                  <Label>
                    <input type="radio" name="density" value="compact" className="mr-1" />
                    Compact
                  </Label>
                  <Label>
                    <input type="radio" name="density" value="default" className="mr-1" defaultChecked />
                    Default
                  </Label>
                  <Label>
                    <input type="radio" name="density" value="comfortable" className="mr-1" />
                    Comfortable
                  </Label>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>
                Manage your API keys and authentication for integration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">API Keys</h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap justify-between gap-2">
                    <div className="space-y-0.5">
                      <p className="font-medium">Production Key</p>
                      <p className="font-mono text-sm bg-muted px-3 py-1 rounded">
                        ••••••••••••••••••••••••4c7a
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Copy</Button>
                      <Button variant="outline" size="sm">Regenerate</Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap justify-between gap-2">
                    <div className="space-y-0.5">
                      <p className="font-medium">Development Key</p>
                      <p className="font-mono text-sm bg-muted px-3 py-1 rounded">
                        ••••••••••••••••••••••••9f3b
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Copy</Button>
                      <Button variant="outline" size="sm">Regenerate</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Webhooks</h3>
                <div className="space-y-2">
                  <Label htmlFor="webhook_url">Webhook URL</Label>
                  <div className="flex space-x-2">
                    <Input id="webhook_url" placeholder="https://your-app.com/webhooks/kolerr" />
                    <Button>Save</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We'll send POST requests to this URL when events happen in your account.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium">Webhook Events</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event_campaign" className="rounded" defaultChecked />
                      <Label htmlFor="event_campaign">Campaign updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event_booking" className="rounded" defaultChecked />
                      <Label htmlFor="event_booking">Booking confirmations</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event_contract" className="rounded" defaultChecked />
                      <Label htmlFor="event_contract">Contract signings</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event_payment" className="rounded" />
                      <Label htmlFor="event_payment">Payment events</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Rate Limits</h3>
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex flex-col sm:flex-row justify-between gap-2">
                    <div>
                      <p className="font-medium">API Rate Limit</p>
                      <p className="text-sm text-muted-foreground">Current plan: 100 requests per minute</p>
                    </div>
                    <Button variant="outline">Upgrade Plan</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save API Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
