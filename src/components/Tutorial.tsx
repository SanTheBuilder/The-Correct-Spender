
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Activity } from "lucide-react";
import { useAccessibility } from "./AccessibilityProvider";
import { useAuth } from "./AuthProvider";

interface TutorialProps {
  onComplete: () => void;
  onStartAssessment: () => void;
}

const Tutorial = ({ onComplete, onStartAssessment }: TutorialProps) => {
  const { t, language } = useAccessibility();
  const { isGuest } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);

  const getTutorialSteps = () => {
    if (isGuest) {
      return [
        {
          title: t("guestWelcome") || "Welcome, Guest!",
          content: t("guestWelcomeDesc") || "You're exploring our financial app in guest mode. You can try all features, but your data won't be saved. Consider signing up for full access!",
          icon: "👋"
        },
        {
          title: t("testFinancialAssessment") || "Test Financial Health Assessment",
          content: t("testFinancialAssessmentDesc") || "Try our financial health assessment tool. Your results won't be saved in guest mode, but you can see how it works!",
          icon: "📊"
        },
        {
          title: t("tryBudgetTools") || "Try Budget Tools",
          content: t("tryBudgetToolsDesc") || "Explore our budgeting tools to see how they can help manage your finances. Sign up to save your budgets!",
          icon: "💰"
        },
        {
          title: t("chatWithAIAdvisor") || "Chat with AI Advisor",
          content: t("chatWithAIAdvisorDesc") || "Chat with our AI financial advisor for instant advice. All users get the same quality assistance!",
          icon: "🤖"
        },
        {
          title: t("customizeExperience") || "Customize Your Experience",
          content: t("customizeExperienceDesc") || "Adjust accessibility settings to make the app work better for you. These preferences are saved locally.",
          icon: "⚙️"
        },
        {
          title: t("readyToExplore") || "Ready to Explore!",
          content: t("readyToExploreDesc") || "You're all set to explore our financial tools! Remember, you can sign up anytime to save your progress and access additional features.",
          icon: "🚀"
        }
      ];
    }
    
    return [
      {
        title: t("tutorialWelcome"),
        content: t("tutorialWelcomeDesc"),
        icon: "👋"
      },
      {
        title: t("tutorialAssessment"),
        content: t("tutorialAssessmentDesc"),
        icon: "📊"
      },
      {
        title: t("tutorialBudget"),
        content: t("tutorialBudgetDesc"),
        icon: "💰"
      },
      {
        title: t("tutorialAI"),
        content: t("tutorialAIDesc"),
        icon: "🤖"
      },
      {
        title: t("tutorialAccessibility"),
        content: t("tutorialAccessibilityDesc"),
        icon: "⚙️"
      },
      {
        title: t("tutorialReady"),
        content: t("tutorialReadyDesc"),
        icon: "🚀"
      }
    ];
  };

  const tutorialSteps = getTutorialSteps();

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartAssessment = () => {
    onStartAssessment();
    onComplete();
  };

  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">
              {isGuest ? (t("guestTutorial") || "Guest Tutorial") : t("appTutorial")}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onComplete}>
              {t("skipTutorial")}
            </Button>
          </div>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">
            {`${t("step") || "Step"} ${currentStep + 1} ${t("of") || "of"} ${tutorialSteps.length}`}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">
              {tutorialSteps[currentStep].icon}
            </div>
            <h2 className="text-xl font-semibold">
              {tutorialSteps[currentStep].title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {tutorialSteps[currentStep].content}
            </p>
          </div>

          <div className="flex justify-between items-center pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              {t("previous")}
            </Button>

            {currentStep === tutorialSteps.length - 1 ? (
              <div className="flex gap-2">
                <Button variant="outline" onClick={onComplete}>
                  {isGuest ? (t("startExploring") || "Start Exploring") : t("exploreMyOwn")}
                </Button>
                <Button onClick={handleStartAssessment} className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  {t("startAssessment")}
                </Button>
              </div>
            ) : (
              <Button onClick={nextStep} className="flex items-center gap-2">
                {t("next")}
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tutorial;
