
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar, ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Form schema
const contractFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.string().min(1, "Contract type is required"),
  kolId: z.string().min(1, "KOL selection is required"),
  campaignId: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  value: z.string().optional(),
  terms: z.string().min(1, "Terms are required"),
});

type ContractFormValues = z.infer<typeof contractFormSchema>;

// Mock KOLs data
const mockKols = [
  {
    id: "kol1",
    name: "Sophia Chen",
    handle: "@fashionwithsophia",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop",
    category: "Fashion"
  },
  {
    id: "kol2",
    name: "Jake Thomas",
    handle: "@jakeadventures",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop",
    category: "Adventure"
  },
  {
    id: "kol3",
    name: "Aisha Mohamed",
    handle: "@aisha_beauty",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&auto=format&fit=crop",
    category: "Beauty"
  },
  {
    id: "kol4",
    name: "Mike Wilson",
    handle: "@mike_fitness",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop",
    category: "Fitness"
  },
  {
    id: "kol5",
    name: "Priya Singh",
    handle: "@priyacooks",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&auto=format&fit=crop",
    category: "Cooking"
  }
];

// Mock campaigns data
const mockCampaigns = [
  { id: "camp1", name: "Summer Collection Launch" },
  { id: "camp2", name: "New Product Teaser" },
  { id: "camp3", name: "Holiday Special" },
  { id: "camp4", name: "Fitness Challenge" },
];

// Contract templates
const contractTemplates = [
  {
    id: "template1",
    title: "Standard Content Creation",
    description: "Basic agreement for sponsored content",
    content: "This agreement outlines the terms for creating sponsored content including deliverables, timeline, and compensation.",
    type: "standard"
  },
  {
    id: "template2",
    title: "Product Review Agreement",
    description: "Terms for honest product reviews",
    content: "This contract establishes guidelines for creating authentic product reviews while maintaining transparency with the audience.",
    type: "review"
  },
  {
    id: "template3",
    title: "Brand Ambassador Contract",
    description: "Long-term brand representation",
    content: "A comprehensive agreement for ongoing brand representation including exclusivity clauses and performance metrics.",
    type: "ambassador"
  },
  {
    id: "template4",
    title: "Event Appearance Contract",
    description: "Terms for in-person events",
    content: "Details the expectations, compensation, and logistics for creator appearances at brand events.",
    type: "event"
  }
];

export default function CreateContract() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [activeTabKols, setActiveTabKols] = useState("recommended");

  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      title: "",
      type: "",
      kolId: "",
      campaignId: "",
      startDate: "",
      endDate: "",
      value: "",
      terms: "",
    },
  });

  const onSubmit = (data: ContractFormValues) => {
    console.log("Contract data:", data);
    
    // Show success message
    toast.success("Contract created successfully!");
    
    // Navigate back to contracts page
    setTimeout(() => {
      navigate("/dashboard/contracts");
    }, 1500);
  };

  const applyTemplate = (templateId: string) => {
    const template = contractTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      form.setValue("type", template.type);
      form.setValue("title", template.title);
      form.setValue("terms", template.content);
      
      toast.info(`Applied template: ${template.title}`);
    }
  };

  const filteredKols = activeTabKols === "all" ? mockKols : 
    mockKols.filter((_, index) => index < 3); // Just showing first 3 for "recommended"

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/dashboard/contracts")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create Contract</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
              <CardDescription>
                Fill in the details for your new creator contract
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contract Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Summer Collection Promo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contract Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select contract type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="standard">Standard Content Creation</SelectItem>
                              <SelectItem value="review">Product Review</SelectItem>
                              <SelectItem value="ambassador">Brand Ambassador</SelectItem>
                              <SelectItem value="event">Event Appearance</SelectItem>
                              <SelectItem value="custom">Custom Contract</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="kolId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Creator</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a creator" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockKols.map((kol) => (
                              <SelectItem key={kol.id} value={kol.id}>
                                {kol.name} ({kol.handle})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="campaignId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Associated Campaign (Optional)</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a campaign" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {mockCampaigns.map((campaign) => (
                              <SelectItem key={campaign.id} value={campaign.id}>
                                {campaign.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type="date" {...field} />
                              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type="date" {...field} />
                              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contract Value ($)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="1000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contract Terms</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter the terms of the agreement..."
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      className="bg-brand-pink hover:bg-brand-pink/90"
                    >
                      Create Contract
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/dashboard/contracts")}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Contract Templates
              </CardTitle>
              <CardDescription>
                Select a template to jumpstart your contract
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {contractTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`p-3 border rounded-lg transition-colors cursor-pointer ${
                    selectedTemplate === template.id
                      ? "border-brand-pink bg-brand-pink/5"
                      : "hover:bg-accent"
                  }`}
                  onClick={() => applyTemplate(template.id)}
                >
                  <h3 className="font-medium">{template.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {template.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select Creator</CardTitle>
              <CardDescription>
                Choose a creator for this contract
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="recommended" onValueChange={setActiveTabKols}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                  <TabsTrigger value="all">All Creators</TabsTrigger>
                </TabsList>
                <TabsContent value="recommended" className="space-y-4 mt-4">
                  {filteredKols.slice(0, 3).map((kol) => (
                    <div
                      key={kol.id}
                      className="flex items-center space-x-3 p-2 hover:bg-accent rounded-lg cursor-pointer"
                      onClick={() => form.setValue("kolId", kol.id)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={kol.avatar} alt={kol.name} />
                        <AvatarFallback>{kol.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{kol.name}</p>
                        <p className="text-sm text-muted-foreground">{kol.handle}</p>
                      </div>
                      <Badge variant="outline" className="ml-auto">
                        {kol.category}
                      </Badge>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="all" className="space-y-4 mt-4">
                  {filteredKols.map((kol) => (
                    <div
                      key={kol.id}
                      className="flex items-center space-x-3 p-2 hover:bg-accent rounded-lg cursor-pointer"
                      onClick={() => form.setValue("kolId", kol.id)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={kol.avatar} alt={kol.name} />
                        <AvatarFallback>{kol.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{kol.name}</p>
                        <p className="text-sm text-muted-foreground">{kol.handle}</p>
                      </div>
                      <Badge variant="outline" className="ml-auto">
                        {kol.category}
                      </Badge>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
