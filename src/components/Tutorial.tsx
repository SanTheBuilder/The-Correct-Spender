
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Activity } from "lucide-react";
import { useAccessibility } from "./AccessibilityProvider";

interface TutorialProps {
  onComplete: () => void;
  onStartAssessment: () => void;
}

const Tutorial = ({ onComplete, onStartAssessment }: TutorialProps) => {
  const { t } = useAccessibility();
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
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
            <CardTitle className="text-2xl">{t("appTutorial")}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onComplete}>
              {t("skipTutorial")}
            </Button>
          </div>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {tutorialSteps.length}
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
                  {t("exploreMyOwn")}
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
