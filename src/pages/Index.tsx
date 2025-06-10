
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Calculator, MessageCircle, Activity, Settings } from "lucide-react";
import FinancialHealthAssessment from "@/components/FinancialHealthAssessment";
import BudgetingTools from "@/components/BudgetingTools";
import AIChat from "@/components/AIChat";
import AccessibilitySettings from "@/components/AccessibilitySettings";
import LanguageSelector from "@/components/LanguageSelector";
import { AccessibilityProvider, useAccessibility } from "@/components/AccessibilityProvider";

const AppContent = () => {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const { language, setLanguage, simpleMode, t } = useAccessibility();

  useEffect(() => {
    // Check if user has previously selected a language
    const savedPrefs = localStorage.getItem("accessibility-preferences");
    if (!savedPrefs) {
      setShowLanguageSelector(true);
    }
  }, []);

  const handleLanguageSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };

  const handleContinue = () => {
    setShowLanguageSelector(false);
  };

  const features = [
    {
      id: "assessment",
      title: simpleMode ? "Check Your Money Health" : "Financial Health Assessment",
      description: simpleMode 
        ? "See how you're doing with money and get help" 
        : "Evaluate your current financial situation and get personalized insights",
      icon: Activity,
      color: "text-green-600"
    },
    {
      id: "budgeting",
      title: simpleMode ? "Budget Helper" : "Budgeting Tools",
      description: simpleMode 
        ? "Make a plan for your money that works for you" 
        : "Create and manage budgets that work for your lifestyle",
      icon: Calculator,
      color: "text-blue-600"
    },
    {
      id: "chat",
      title: simpleMode ? "Money Helper Chat" : "AI Financial Advisor",
      description: simpleMode 
        ? "Ask questions and get help with money decisions" 
        : "Get instant advice and feedback on your financial decisions",
      icon: MessageCircle,
      color: "text-purple-600"
    },
    {
      id: "accessibility",
      title: simpleMode ? "Make App Easier to Use" : "Accessibility Settings",
      description: simpleMode 
        ? "Change how the app looks and works for you" 
        : "Customize the app to meet your accessibility needs",
      icon: Settings,
      color: "text-orange-600"
    }
  ];

  if (showLanguageSelector) {
    return (
      <LanguageSelector 
        onLanguageSelect={handleLanguageSelect}
        onContinue={handleContinue}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded z-50"
      >
        {simpleMode ? "Skip to main content" : "Skip to main content"}
      </a>

      {/* Header */}
      <header className="border-b" role="banner">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-primary" aria-hidden="true" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t("appTitle")}</h1>
              <p className="text-muted-foreground">{t("appSubtitle")}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <main id="main-content" role="main">
          {activeSection === "overview" && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <section className="text-center space-y-4" aria-labelledby="welcome-heading">
                <h2 id="welcome-heading" className="text-3xl font-bold text-foreground">
                  {t("welcomeTitle")}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t("welcomeDescription")}
                </p>
              </section>

              {/* Features Grid */}
              <section aria-labelledby="features-heading">
                <h2 id="features-heading" className="sr-only">
                  {simpleMode ? "Things you can do" : "Available Features"}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" role="grid">
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
                          onClick={() => setActiveSection(feature.id)}
                          aria-label={`${simpleMode ? "Go to" : "Go to"} ${feature.title}`}
                        >
                          {simpleMode ? "Start" : "Get Started"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Quick Stats or Tips */}
              <section aria-labelledby="stats-heading">
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle id="stats-heading" className="text-center">
                      {simpleMode ? "Did You Know?" : "Did You Know?"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-2">
                    <ul className="space-y-2" aria-label={simpleMode ? "Money facts" : "Financial statistics"}>
                      <li className="text-muted-foreground">
                        {simpleMode 
                          ? "• Many people can't afford a $1,000 emergency" 
                          : "• 64% of Americans can't afford a $1,000 emergency expense"
                        }
                      </li>
                      <li className="text-muted-foreground">
                        {simpleMode 
                          ? "• Most people spend more money than they make" 
                          : "• The average American spends $18,000 more than they earn each year"
                        }
                      </li>
                      <li className="text-muted-foreground">
                        {simpleMode 
                          ? "• Making a budget can help you save money" 
                          : "• Simple budgeting can help save 10-20% of your income"
                        }
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </section>
            </div>
          )}

          {activeSection === "assessment" && (
            <div>
              <Button 
                variant="outline" 
                onClick={() => setActiveSection("overview")}
                className="mb-6"
                aria-label={simpleMode ? "Go back" : "Return to overview"}
              >
                ← {simpleMode ? "Back" : "Back to Overview"}
              </Button>
              <FinancialHealthAssessment />
            </div>
          )}

          {activeSection === "budgeting" && (
            <div>
              <Button 
                variant="outline" 
                onClick={() => setActiveSection("overview")}
                className="mb-6"
                aria-label={simpleMode ? "Go back" : "Return to overview"}
              >
                ← {simpleMode ? "Back" : "Back to Overview"}
              </Button>
              <BudgetingTools />
            </div>
          )}

          {activeSection === "chat" && (
            <div>
              <Button 
                variant="outline" 
                onClick={() => setActiveSection("overview")}
                className="mb-6"
                aria-label={simpleMode ? "Go back" : "Return to overview"}
              >
                ← {simpleMode ? "Back" : "Back to Overview"}
              </Button>
              <AIChat />
            </div>
          )}

          {activeSection === "accessibility" && (
            <div>
              <Button 
                variant="outline" 
                onClick={() => setActiveSection("overview")}
                className="mb-6"
                aria-label={simpleMode ? "Go back" : "Return to overview"}
              >
                ← {simpleMode ? "Back" : "Back to Overview"}
              </Button>
              <AccessibilitySettings />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <AccessibilityProvider>
      <AppContent />
    </AccessibilityProvider>
  );
};

export default Index;
