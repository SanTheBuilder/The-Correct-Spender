
import { useState, useEffect } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import Tutorial from "@/components/Tutorial";
import { useAccessibility } from "@/components/AccessibilityProvider";
import { useAuth } from "@/components/AuthProvider";
import { getRandomFact } from "@/utils/financialData";
import AppHeader from "@/components/layout/AppHeader";
import WelcomeSection from "@/components/layout/WelcomeSection";
import FeaturesGrid from "@/components/layout/FeaturesGrid";
import GuestModeNotification from "@/components/layout/GuestModeNotification";
import FinancialFactSection from "@/components/layout/FinancialFactSection";
import SectionContent from "@/components/layout/SectionContent";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentFact, setCurrentFact] = useState<string>("");
  const { setLanguage } = useAccessibility();
  const { isGuest } = useAuth();

  // Initialize random fact on mount and page refresh
  useEffect(() => {
    setCurrentFact(getRandomFact());
  }, []);

  useEffect(() => {
    // Check if user/guest has completed setup before
    const storageKey = isGuest ? "guest-preferences" : "user-preferences";
    const savedPrefs = localStorage.getItem(storageKey);
    
    if (!savedPrefs) {
      setShowLanguageSelector(true);
    } else {
      // Check if user/guest has seen tutorial
      const prefs = JSON.parse(savedPrefs);
      if (!prefs.hasSeenTutorial) {
        setShowTutorial(true);
      }
    }
  }, [isGuest]);

  const handleLanguageSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    const storageKey = isGuest ? "guest-preferences" : "user-preferences";
    const prefs = {
      language: selectedLanguage,
      hasCompletedSetup: true,
      setupDate: new Date().toISOString(),
      hasSeenTutorial: false,
      userType: isGuest ? "guest" : "registered"
    };
    localStorage.setItem(storageKey, JSON.stringify(prefs));
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
    const storageKey = isGuest ? "guest-preferences" : "user-preferences";
    const savedPrefs = localStorage.getItem(storageKey);
    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      prefs.hasSeenTutorial = true;
      localStorage.setItem(storageKey, JSON.stringify(prefs));
    }
  };

  const handleStartAssessment = () => {
    setActiveSection("assessment");
  };

  const handleNewFact = () => {
    setCurrentFact(getRandomFact());
  };

  // Show language selector if needed
  if (showLanguageSelector) {
    return (
      <LanguageSelector 
        onLanguageSelect={handleLanguageSelect} 
        onContinue={handleContinue}
      />
    );
  }

  // Show tutorial if needed
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
        Skip to main content
      </a>

      <AppHeader />

      <div className="container mx-auto px-4 py-8">
        <main id="main-content" role="main">
          {activeSection === "overview" ? (
            <div className="space-y-8">
              <WelcomeSection />
              <FeaturesGrid onSectionChange={setActiveSection} />
              {isGuest && <GuestModeNotification />}
              <FinancialFactSection 
                currentFact={currentFact}
                onNewFact={handleNewFact}
              />
            </div>
          ) : (
            <SectionContent 
              activeSection={activeSection}
              onBack={() => setActiveSection("overview")}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
