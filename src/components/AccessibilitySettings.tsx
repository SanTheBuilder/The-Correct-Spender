
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Settings, Type, Eye, Volume2, Globe, Zap } from "lucide-react";
import { useAccessibility } from "./AccessibilityProvider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const AccessibilitySettings = () => {
  const { 
    fontSize, 
    highContrast, 
    screenReaderMode, 
    language, 
    simpleMode,
    setFontSize,
    setHighContrast,
    setScreenReaderMode,
    setLanguage,
    setSimpleMode,
    t 
  } = useAccessibility();
  const { toast } = useToast();

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    toast({
      title: simpleMode ? "Text size changed" : "Font Size Updated",
      description: simpleMode ? `Text is now ${size}` : `Font size changed to ${size}`
    });
  };

  const handleHighContrastToggle = () => {
    setHighContrast(!highContrast);
    toast({
      title: simpleMode 
        ? (highContrast ? "Colors back to normal" : "High contrast on") 
        : (highContrast ? "High Contrast Disabled" : "High Contrast Enabled"),
      description: simpleMode 
        ? "Colors have been adjusted" 
        : "Visual contrast has been adjusted"
    });
  };

  const handleScreenReaderToggle = () => {
    setScreenReaderMode(!screenReaderMode);
    toast({
      title: simpleMode 
        ? (screenReaderMode ? "Screen reader help off" : "Screen reader help on")
        : (screenReaderMode ? "Screen Reader Mode Disabled" : "Screen Reader Mode Enabled"),
      description: simpleMode 
        ? "Interface adjusted for screen readers"
        : "Interface optimized for screen readers"
    });
  };

  const handleSimpleModeToggle = () => {
    setSimpleMode(!simpleMode);
    toast({
      title: !simpleMode ? "Simple mode on" : "Detailed mode on",
      description: !simpleMode 
        ? "Using simple language and basic options" 
        : "Showing advanced options and technical terms"
    });
  };

  const languages = [
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "es", label: "Español", flag: "🇪🇸" },
    { value: "fr", label: "Français", flag: "🇫🇷" },
    { value: "de", label: "Deutsch", flag: "🇩🇪" },
    { value: "it", label: "Italiano", flag: "🇮🇹" },
    { value: "pt", label: "Português", flag: "🇵🇹" },
    { value: "ru", label: "Русский", flag: "🇷🇺" },
    { value: "ja", label: "日本語", flag: "🇯🇵" },
    { value: "ko", label: "한국어", flag: "🇰🇷" },
    { value: "zh", label: "中文", flag: "🇨🇳" },
    { value: "ar", label: "العربية", flag: "🇸🇦" },
    { value: "hi", label: "हिंदी", flag: "🇮🇳" }
  ];

  return (
    <div className="space-y-6" role="main" aria-label={t("accessibilitySettings")}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6" aria-hidden="true" />
            <CardTitle>{t("accessibilitySettings")}</CardTitle>
          </div>
          <CardDescription>
            {simpleMode 
              ? "Make the app easier to use for you" 
              : "Customize the app to meet your accessibility needs"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Interface Mode Toggle */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" aria-hidden="true" />
              <Label className="text-base font-medium">{t("interfaceMode")}</Label>
            </div>
            <RadioGroup value={simpleMode ? "simple" : "detailed"} onValueChange={(value) => setSimpleMode(value === "simple")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="simple" id="simple-mode" />
                <Label htmlFor="simple-mode" className="cursor-pointer font-medium">
                  {t("simple")} - {simpleMode ? "Easy words and basic options" : t("simpleModeDescription")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="detailed" id="detailed-mode" />
                <Label htmlFor="detailed-mode" className="cursor-pointer font-medium">
                  {t("detailed")} - {simpleMode ? "More options and technical words" : t("detailedModeDescription")}
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Font Size Controls */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Type className="h-5 w-5" aria-hidden="true" />
              <Label className="text-base font-medium">{t("textSize")}</Label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2" role="radiogroup" aria-label={simpleMode ? "Text size options" : "Font size options"}>
              {[
                { value: "small", label: t("small") },
                { value: "medium", label: t("medium") },
                { value: "large", label: t("large") },
                { value: "extra-large", label: t("extraLarge") }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={fontSize === option.value ? "default" : "outline"}
                  onClick={() => handleFontSizeChange(option.value)}
                  className="text-sm"
                  role="radio"
                  aria-checked={fontSize === option.value}
                  aria-label={`${simpleMode ? "Make text" : "Set font size to"} ${option.label}`}
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
              <Label className="text-base font-medium">{t("visualAccessibility")}</Label>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="high-contrast"
                  checked={highContrast}
                  onCheckedChange={handleHighContrastToggle}
                  aria-describedby="high-contrast-description"
                />
                <Label htmlFor="high-contrast" className="cursor-pointer">
                  {simpleMode ? "Make colors stronger" : t("highContrastMode")}
                </Label>
              </div>
              <p id="high-contrast-description" className="text-sm text-muted-foreground ml-6">
                {simpleMode 
                  ? "Makes text easier to see with stronger colors" 
                  : "Increases contrast between text and background for better visibility"
                }
              </p>
            </div>
          </div>

          {/* Screen Reader Support */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" aria-hidden="true" />
              <Label className="text-base font-medium">{t("screenReaderSupport")}</Label>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="screen-reader"
                  checked={screenReaderMode}
                  onCheckedChange={handleScreenReaderToggle}
                  aria-describedby="screen-reader-description"
                />
                <Label htmlFor="screen-reader" className="cursor-pointer">
                  {simpleMode ? "Help for screen readers" : t("enhancedScreenReaderMode")}
                </Label>
              </div>
              <p id="screen-reader-description" className="text-sm text-muted-foreground ml-6">
                {simpleMode 
                  ? "Makes the app work better with screen reading software" 
                  : "Optimizes interface elements and adds extra context for screen readers"
                }
              </p>
            </div>
          </div>

          {/* Language Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" aria-hidden="true" />
              <Label className="text-base font-medium">{t("language")}</Label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto" role="radiogroup" aria-label={simpleMode ? "Language options" : "Language selection"}>
              {languages.map((lang) => (
                <Button
                  key={lang.value}
                  variant={language === lang.value ? "default" : "outline"}
                  onClick={() => setLanguage(lang.value)}
                  className="text-sm justify-start h-auto p-3"
                  role="radio"
                  aria-checked={language === lang.value}
                  aria-label={`${simpleMode ? "Change language to" : "Set language to"} ${lang.label}`}
                >
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true">{lang.flag}</span>
                    <span className="text-xs">{lang.label}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {!simpleMode && (
            /* Quick Access Instructions - Only show in detailed mode */
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessibilitySettings;
