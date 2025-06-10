
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Settings, Type, Eye, Volume2, Globe } from "lucide-react";

const AccessibilitySettings = () => {
  const [fontSize, setFontSize] = useState("medium");
  const [highContrast, setHighContrast] = useState(false);
  const [screenReaderMode, setScreenReaderMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const { toast } = useToast();

  const applyFontSize = (size: string) => {
    setFontSize(size);
    const root = document.documentElement;
    switch (size) {
      case "small":
        root.style.fontSize = "14px";
        break;
      case "large":
        root.style.fontSize = "18px";
        break;
      case "extra-large":
        root.style.fontSize = "22px";
        break;
      default:
        root.style.fontSize = "16px";
    }
    toast({
      title: "Font Size Updated",
      description: `Font size changed to ${size}`
    });
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle("high-contrast", !highContrast);
    toast({
      title: highContrast ? "High Contrast Disabled" : "High Contrast Enabled",
      description: "Visual contrast has been adjusted"
    });
  };

  const toggleScreenReader = () => {
    setScreenReaderMode(!screenReaderMode);
    document.body.classList.toggle("screen-reader-mode", !screenReaderMode);
    toast({
      title: screenReaderMode ? "Screen Reader Mode Disabled" : "Screen Reader Mode Enabled",
      description: "Interface optimized for screen readers"
    });
  };

  return (
    <div className="space-y-6" role="main" aria-label="Accessibility Settings">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6" aria-hidden="true" />
            <CardTitle>Accessibility Settings</CardTitle>
          </div>
          <CardDescription>
            Customize the app to meet your accessibility needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Font Size Controls */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Type className="h-5 w-5" aria-hidden="true" />
              <Label className="text-base font-medium">Text Size</Label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2" role="radiogroup" aria-label="Font size options">
              {[
                { value: "small", label: "Small" },
                { value: "medium", label: "Medium" },
                { value: "large", label: "Large" },
                { value: "extra-large", label: "Extra Large" }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={fontSize === option.value ? "default" : "outline"}
                  onClick={() => applyFontSize(option.value)}
                  className="text-sm"
                  role="radio"
                  aria-checked={fontSize === option.value}
                  aria-label={`Set font size to ${option.label}`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Visual Accessibility */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5" aria-hidden="true" />
              <Label className="text-base font-medium">Visual Accessibility</Label>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="high-contrast"
                  checked={highContrast}
                  onCheckedChange={toggleHighContrast}
                  aria-describedby="high-contrast-description"
                />
                <Label htmlFor="high-contrast" className="cursor-pointer">
                  High Contrast Mode
                </Label>
              </div>
              <p id="high-contrast-description" className="text-sm text-muted-foreground ml-6">
                Increases contrast between text and background for better visibility
              </p>
            </div>
          </div>

          {/* Screen Reader Support */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" aria-hidden="true" />
              <Label className="text-base font-medium">Screen Reader Support</Label>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="screen-reader"
                  checked={screenReaderMode}
                  onCheckedChange={toggleScreenReader}
                  aria-describedby="screen-reader-description"
                />
                <Label htmlFor="screen-reader" className="cursor-pointer">
                  Enhanced Screen Reader Mode
                </Label>
              </div>
              <p id="screen-reader-description" className="text-sm text-muted-foreground ml-6">
                Optimizes interface elements and adds extra context for screen readers
              </p>
            </div>
          </div>

          {/* Language Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" aria-hidden="true" />
              <Label className="text-base font-medium">Language</Label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2" role="radiogroup" aria-label="Language options">
              {[
                { value: "en", label: "English" },
                { value: "es", label: "Español" },
                { value: "fr", label: "Français" }
              ].map((lang) => (
                <Button
                  key={lang.value}
                  variant={language === lang.value ? "default" : "outline"}
                  onClick={() => setLanguage(lang.value)}
                  className="text-sm"
                  role="radio"
                  aria-checked={language === lang.value}
                  aria-label={`Set language to ${lang.label}`}
                >
                  {lang.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Access Instructions */}
          <Card className="bg-muted/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Access Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><kbd className="px-2 py-1 bg-background rounded border">Tab</kbd> - Navigate between elements</p>
              <p><kbd className="px-2 py-1 bg-background rounded border">Enter</kbd> or <kbd className="px-2 py-1 bg-background rounded border">Space</kbd> - Activate buttons</p>
              <p><kbd className="px-2 py-1 bg-background rounded border">Esc</kbd> - Close dialogs or return to previous section</p>
              <p><kbd className="px-2 py-1 bg-background rounded border">Ctrl</kbd> + <kbd className="px-2 py-1 bg-background rounded border">+</kbd> - Increase browser zoom</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessibilitySettings;
