
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Calculator, MessageCircle, Settings } from "lucide-react";
import { useAccessibility } from "../AccessibilityProvider";
import { useAuth } from "../AuthProvider";

interface FeaturesGridProps {
  onSectionChange: (section: string) => void;
}

const FeaturesGrid = ({ onSectionChange }: FeaturesGridProps) => {
  const { language, simpleMode, t } = useAccessibility();
  const { user, isGuest } = useAuth();

  const features = [
    {
      id: "assessment",
      title: simpleMode ? t("checkMoneyHealth") : t("financialHealthAssessment"),
      description: simpleMode 
        ? t("checkMoneyHealthDesc") 
        : (isGuest ? 
           t("guestDataNotSaved") + " - " + (language === 'es' ? "Evalúa tu situación financiera actual" :
            language === 'fr' ? "Évaluez votre situation financière actuelle" :
            "Evaluate your current financial situation") :
           "Evaluate your current financial situation and get personalized insights"),
      icon: Activity,
      color: "text-green-600"
    },
    {
      id: "budgeting",
      title: simpleMode ? t("budgetHelper") : t("budgetToolsTitle"),
      description: simpleMode 
        ? t("budgetHelperDesc") 
        : (isGuest ?
           t("guestDataNotSaved") + " - " + (language === 'es' ? "Crea y gestiona presupuestos" :
            language === 'fr' ? "Créez et gérez des budgets" :
            "Create and manage budgets") :
           "Create and manage budgets that work for your lifestyle"),
      icon: Calculator,
      color: "text-blue-600"
    },
    {
      id: "chat",
      title: simpleMode ? t("moneyHelperChat") : t("aiChatTitle"),
      description: simpleMode 
        ? t("moneyHelperChatDesc") 
        : t("aiChatSubtitle"),
      icon: MessageCircle,
      color: "text-purple-600"
    },
    {
      id: "accessibility",
      title: simpleMode ? t("makeAppEasier") : t("accessibilitySettings"),
      description: simpleMode 
        ? t("makeAppEasierDesc") 
        : t("accessibilitySubtitle"),
      icon: Settings,
      color: "text-orange-600"
    },
    // Add app settings only for authenticated users (not guests)
    ...(user && !isGuest ? [{
      id: "app-settings",
      title: simpleMode ? t("appSettings") || "App Settings" : t("appSettings") || "App Settings",
      description: simpleMode 
        ? t("manageYourAccount") || "Manage your account"
        : t("manageAppPreferences") || "Manage your account and app preferences",
      icon: Settings,
      color: "text-slate-600"
    }] : [])
  ];

  return (
    <section aria-labelledby="features-heading">
      <h2 id="features-heading" className="sr-only">
        {simpleMode ? 
          (language === 'es' ? "Cosas que puedes hacer" : 
           language === 'fr' ? "Choses que vous pouvez faire" : 
           "Things you can do") : 
          (language === 'es' ? "Funciones Disponibles" : 
           language === 'fr' ? "Fonctionnalités Disponibles" : 
           "Available Features")
        }
      </h2>
      <div className={`grid ${user && !isGuest ? 'md:grid-cols-2 lg:grid-cols-5' : 'md:grid-cols-2 lg:grid-cols-4'} gap-6`} role="grid">
        {features.map((feature) => (
          <Card 
            key={feature.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
            role="gridcell"
          >
            <CardHeader className="text-center">
              <feature.icon 
                className={`h-12 w-12 mx-auto ${feature.color}`} 
                aria-hidden="true"
              />
              <CardTitle className="text-xl">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                onClick={() => onSectionChange(feature.id)}
                aria-label={`${t("start")} ${feature.title}`}
              >
                {simpleMode ? t("start") : t("getStarted")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;
