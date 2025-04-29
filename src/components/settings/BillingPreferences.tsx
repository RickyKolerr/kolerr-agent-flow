
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, Bell, Clock } from "lucide-react";

const billingPreferencesSchema = z.object({
  emailReceipts: z.boolean().default(true),
  paymentReminders: z.boolean().default(true),
  autoRenew: z.boolean().default(true),
  reminderTime: z.string().default("7"),
  cardExpiryNotice: z.boolean().default(true),
});

type BillingPreferencesValues = z.infer<typeof billingPreferencesSchema>;

export const BillingPreferences = () => {
  const [isSaving, setIsSaving] = useState(false);

  // Initialize with default preferences
  // In a real app, these would be fetched from an API
  const form = useForm<BillingPreferencesValues>({
    resolver: zodResolver(billingPreferencesSchema),
    defaultValues: {
      emailReceipts: true,
      paymentReminders: true,
      autoRenew: true,
      reminderTime: "7",
      cardExpiryNotice: true,
    },
  });

  const onSubmit = (data: BillingPreferencesValues) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Saving billing preferences:", data);
      setIsSaving(false);
      
      toast.success("Billing preferences updated", {
        description: "Your billing preferences have been updated successfully.",
      });
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Billing Preferences
        </CardTitle>
        <CardDescription>
          Customize how you receive billing information and manage automatic payments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="emailReceipts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Email Receipts
                      </FormLabel>
                      <FormDescription>
                        Receive email receipts for all successful payments
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="paymentReminders"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Payment Reminders
                      </FormLabel>
                      <FormDescription>
                        Get notified before your subscription renews
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {form.watch("paymentReminders") && (
                <FormField
                  control={form.control}
                  name="reminderTime"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 ml-6">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Reminder Time
                        </FormLabel>
                        <FormDescription>
                          When to send payment reminders
                        </FormDescription>
                      </div>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select days" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 day before</SelectItem>
                          <SelectItem value="3">3 days before</SelectItem>
                          <SelectItem value="7">7 days before</SelectItem>
                          <SelectItem value="14">14 days before</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name="autoRenew"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Auto-Renew Subscription
                      </FormLabel>
                      <FormDescription>
                        Automatically renew your subscription when it expires
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cardExpiryNotice"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Card Expiry Notifications
                      </FormLabel>
                      <FormDescription>
                        Get notified when your payment method is about to expire
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Preferences"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
