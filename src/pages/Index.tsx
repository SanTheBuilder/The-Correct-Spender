
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Calculator, MessageCircle, Activity, Settings } from "lucide-react";
import FinancialHealthAssessment from "@/components/FinancialHealthAssessment";
import BudgetingTools from "@/components/BudgetingTools";
import AIChat from "@/components/AIChat";
import AccessibilitySettings from "@/components/AccessibilitySettings";
import LanguageSelector from "@/components/LanguageSelector";
import Tutorial from "@/components/Tutorial";
import { AccessibilityProvider, useAccessibility } from "@/components/AccessibilityProvider";
import { getRandomFact } from "@/utils/financialData";

const AppContent = () => {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentFact, setCurrentFact] = useState<string>("");
  const { language, setLanguage, simpleMode, t } = useAccessibility();

  // Initialize random fact on mount and page refresh
  useEffect(() => {
    setCurrentFact(getRandomFact());
  }, []);

  useEffect(() => {
    // Check if user has completed setup before
    const savedPrefs = localStorage.getItem("user-preferences");
    if (!savedPrefs) {
      setShowLanguageSelector(true);
    } else {
      // Check if user has seen tutorial
      const prefs = JSON.parse(savedPrefs);
      if (!prefs.hasSeenTutorial) {
        setShowTutorial(true);
      }
    }
  }, []);

  const handleLanguageSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    const prefs = {
      language: selectedLanguage,
      hasCompletedSetup: true,
      setupDate: new Date().toISOString(),
      hasSeenTutorial: false
    };
    localStorage.setItem("user-preferences", JSON.stringify(prefs));
    setShowLanguageSelector(false);
    setShowTutorial(true);
  };

  const handleContinue = () => {
    setShowLanguageSelector(false);
    setShowTutorial(true);
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    // Update preferences to mark tutorial as seen
    const savedPrefs = localStorage.getItem("user-preferences");
    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      prefs.hasSeenTutorial = true;
      localStorage.setItem("user-preferences", JSON.stringify(prefs));
    }
  };

  const handleStartAssessment = () => {
    setActiveSection("assessment");
  };

  const features = [
    {
      id: "assessment",
      title: simpleMode ? t("checkMoneyHealth") : t("financialHealthAssessment"),
      description: simpleMode 
        ? t("checkMoneyHealthDesc") 
        : "Evaluate your current financial situation and get personalized insights",
      icon: Activity,
      color: "text-green-600"
    },
    {
      id: "budgeting",
      title: simpleMode ? t("budgetHelper") : "Budgeting Tools",
      description: simpleMode 
        ? t("budgetHelperDesc") 
        : "Create and manage budgets that work for your lifestyle",
      icon: Calculator,
      color: "text-blue-600"
    },
    {
      id: "chat",
      title: simpleMode ? t("moneyHelperChat") : "AI Financial Advisor",
      description: simpleMode 
        ? t("moneyHelperChatDesc") 
        : "Get instant advice and feedback on your financial decisions",
      icon: MessageCircle,
      color: "text-purple-600"
    },
    {
      id: "accessibility",
      title: simpleMode ? t("makeAppEasier") : t("accessibilitySettings"),
      description: simpleMode 
        ? t("makeAppEasierDesc") 
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

  if (showTutorial) {
    return (
      <Tutorial 
        onComplete={handleTutorialComplete}
        onStartAssessment={handleStartAssessment}
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
        {t("skipToMain")}
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
                          {simpleMode ? t("start") : t("getStarted")}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Dynamic Financial Fact */}
              <section aria-labelledby="facts-heading">
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle id="facts-heading" className="text-center">
                      {t("didYouKnow")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-2">
                    <p className="text-lg font-medium text-foreground">{currentFact}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCurrentFact(getRandomFact())}
                      className="mt-3"
                    >
                      {t("showAnotherFact")}
                    </Button>
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
                aria-label={simpleMode ? t("back") : t("backToOverview")}
              >
                ← {simpleMode ? t("back") : t("backToOverview")}
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
                aria-label={simpleMode ? t("back") : t("backToOverview")}
              >
                ← {simpleMode ? t("back") : t("backToOverview")}
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
                aria-label={simpleMode ? t("back") : t("backToOverview")}
              >
                ← {simpleMode ? t("back") : t("backToOverview")}
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
                aria-label={simpleMode ? t("back") : t("backToOverview")}
              >
                ← {simpleMode ? t("back") : t("backToOverview")}
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
