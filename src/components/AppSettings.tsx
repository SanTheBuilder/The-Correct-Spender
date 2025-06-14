
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Settings, User, Bell, Shield, Download, Trash2 } from "lucide-react";
import { useAccessibility } from "./AccessibilityProvider";
import { useAuth } from "./AuthProvider";
import { useState } from "react";
import AccessibilitySettings from "./AccessibilitySettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AppSettings = () => {
  const { user } = useAuth();
  const { t } = useAccessibility();
  const { toast } = useToast();
  
  // User preferences state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  const [firstName, setFirstName] = useState(user?.user_metadata?.first_name || "");
  const [lastName, setLastName] = useState(user?.user_metadata?.last_name || "");

  const handleSaveProfile = () => {
    // In a real app, this would update the user profile
    toast({
      title: t("profileUpdated") || "Profile Updated",
      description: t("profileSavedSuccessfully") || "Your profile has been saved successfully.",
    });
  };

  const handleExportData = () => {
    toast({
      title: t("dataExported") || "Data Exported",
      description: t("dataExportStarted") || "Your data export has been started. You'll receive an email when it's ready.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: t("accountDeletionRequested") || "Account Deletion Requested",
      description: t("accountDeletionConfirm") || "Please contact support to confirm account deletion.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6" role="main" aria-label={t("appSettings") || "App Settings"}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6" aria-hidden="true" />
            <CardTitle>{t("appSettings") || "App Settings"}</CardTitle>
          </div>
          <CardDescription>
            {t("manageAppPreferences") || "Manage your app preferences and account settings"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">{t("profile") || "Profile"}</TabsTrigger>
              <TabsTrigger value="notifications">{t("notifications") || "Notifications"}</TabsTrigger>
              <TabsTrigger value="accessibility">{t("accessibility") || "Accessibility"}</TabsTrigger>
              <TabsTrigger value="privacy">{t("privacy") || "Privacy"}</TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" aria-hidden="true" />
                  <Label className="text-base font-medium">{t("profileInformation") || "Profile Information"}</Label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t("firstName") || "First Name"}</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder={t("enterFirstName") || "Enter your first name"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t("lastName") || "Last Name"}</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder={t("enterLastName") || "Enter your last name"}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("email") || "Email"}</Label>
                  <Input
                    id="email"
                    value={user?.email || ""}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-sm text-muted-foreground">
                    {t("emailCannotBeChanged") || "Email address cannot be changed"}
                  </p>
                </div>

                <Button onClick={handleSaveProfile}>
                  {t("saveProfile") || "Save Profile"}
                </Button>
              </div>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5" aria-hidden="true" />
                  <Label className="text-base font-medium">{t("notificationPreferences") || "Notification Preferences"}</Label>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                    <Label htmlFor="email-notifications" className="cursor-pointer">
                      {t("emailNotifications") || "Email Notifications"}
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">
                    {t("emailNotificationsDesc") || "Receive notifications about your financial goals and budget updates"}
                  </p>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="push-notifications"
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                    <Label htmlFor="push-notifications" className="cursor-pointer">
                      {t("pushNotifications") || "Push Notifications"}
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">
                    {t("pushNotificationsDesc") || "Get real-time alerts about spending and budget limits"}
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Accessibility Settings */}
            <TabsContent value="accessibility">
              <AccessibilitySettings />
            </TabsContent>

            {/* Privacy & Data Settings */}
            <TabsContent value="privacy" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" aria-hidden="true" />
                  <Label className="text-base font-medium">{t("privacyDataSettings") || "Privacy & Data Settings"}</Label>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="data-sharing"
                      checked={dataSharing}
                      onCheckedChange={setDataSharing}
                    />
                    <Label htmlFor="data-sharing" className="cursor-pointer">
                      {t("allowDataSharing") || "Allow Anonymous Data Sharing"}
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">
                    {t("dataSharingDesc") || "Help improve the app by sharing anonymous usage data"}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium">{t("dataManagement") || "Data Management"}</h4>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={handleExportData} className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      {t("exportData") || "Export My Data"}
                    </Button>
                    
                    <Button variant="destructive" onClick={handleDeleteAccount} className="flex items-center gap-2">
                      <Trash2 className="h-4 w-4" />
                      {t("deleteAccount") || "Delete Account"}
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {t("dataManagementDesc") || "Export your data or permanently delete your account and all associated data"}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppSettings;
