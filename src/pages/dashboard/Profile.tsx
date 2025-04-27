
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Save, Upload, User, Building, Mail, Phone, Globe, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");

  // Mock profile data
  const profile = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    company: "Brand Innovations Inc.",
    role: "Marketing Director",
    phone: "+1 (555) 123-4567",
    website: "www.brandinnovations.com",
    address: "123 Business Ave, Suite 500, New York, NY 10001",
    bio: "Marketing professional with over 10 years of experience in influencer marketing campaigns. Specializing in brand partnerships and digital strategy for fashion and lifestyle brands.",
    social: {
      twitter: "@alexjmarketing",
      instagram: "@alexj_brands",
      facebook: "alexjohnsonmarketing",
      linkedin: "alex-johnson-marketing"
    }
  };

  const handleProfileUpdate = () => {
    toast.success("Profile updated successfully!");
  };

  const handleAvatarChange = () => {
    toast.info("Avatar upload functionality would go here");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
      </div>

      <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="company">Company Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="mt-6 space-y-6">
          {/* Profile header with avatar */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-24 w-24 border-2 border-border">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback>
                      {profile.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button onClick={handleAvatarChange} variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Change
                  </Button>
                </div>
                <div className="space-y-2 text-center md:text-left flex-1">
                  <h3 className="text-xl font-bold">{profile.name}</h3>
                  <p className="text-muted-foreground">{profile.role} at {profile.company}</p>
                  <p className="text-muted-foreground text-sm">{profile.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal details form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={profile.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={profile.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue={profile.phone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Job Title</Label>
                  <Input id="role" defaultValue={profile.role} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea id="bio" rows={5} defaultValue={profile.bio} />
              </div>
              <Button onClick={handleProfileUpdate} className="bg-brand-pink hover:bg-brand-pink/90">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Social profiles */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media Profiles</CardTitle>
              <CardDescription>Connect your social accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex items-center">
                    <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                    Twitter
                  </Label>
                  <Input id="twitter" defaultValue={profile.social.twitter} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="flex items-center">
                    <Instagram className="h-4 w-4 mr-2 text-pink-500" />
                    Instagram
                  </Label>
                  <Input id="instagram" defaultValue={profile.social.instagram} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook" className="flex items-center">
                    <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                    Facebook
                  </Label>
                  <Input id="facebook" defaultValue={profile.social.facebook} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="flex items-center">
                    <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
                    LinkedIn
                  </Label>
                  <Input id="linkedin" defaultValue={profile.social.linkedin} />
                </div>
              </div>
              <Button onClick={handleProfileUpdate} className="bg-brand-pink hover:bg-brand-pink/90">
                <Save className="mr-2 h-4 w-4" />
                Save Social Profiles
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="company" className="mt-6 space-y-6">
          {/* Company details form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Company Information
              </CardTitle>
              <CardDescription>Update your company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue={profile.company} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                  </Label>
                  <Input id="website" defaultValue={profile.website} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address" className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Address
                  </Label>
                  <Input id="address" defaultValue={profile.address} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-description">Company Description</Label>
                <Textarea id="company-description" rows={5} defaultValue="Brand Innovations Inc. is a forward-thinking marketing agency specializing in influencer marketing for fashion, beauty, and lifestyle brands. We connect brands with the right influencers to create authentic partnerships that drive engagement and conversions." />
              </div>
              <Button onClick={handleProfileUpdate} className="bg-brand-pink hover:bg-brand-pink/90">
                <Save className="mr-2 h-4 w-4" />
                Save Company Details
              </Button>
            </CardContent>
          </Card>
                
          {/* Company branding */}
          <Card>
            <CardHeader>
              <CardTitle>Brand Assets</CardTitle>
              <CardDescription>Upload your company logo and branding materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label>Company Logo</Label>
                  <div className="border border-dashed border-border rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground text-center">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG or SVG (max. 2MB)
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Upload Logo
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label>Brand Colors</Label>
                  <div className="border border-border rounded-md p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded bg-[#FF3366] mr-2"></div>
                        <span>Primary</span>
                      </div>
                      <Input className="w-24" defaultValue="#FF3366" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded bg-[#333333] mr-2"></div>
                        <span>Secondary</span>
                      </div>
                      <Input className="w-24" defaultValue="#333333" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label>Brand Guidelines</Label>
                  <div className="border border-dashed border-border rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground text-center">
                      Upload brand guidelines
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF format (max. 10MB)
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Upload Document
                    </Button>
                  </div>
                </div>
              </div>
              <Button onClick={handleProfileUpdate} className="bg-brand-pink hover:bg-brand-pink/90">
                <Save className="mr-2 h-4 w-4" />
                Save Brand Assets
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
