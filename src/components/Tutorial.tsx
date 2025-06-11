
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Activity, CheckCircle } from "lucide-react";

interface TutorialProps {
  onComplete: () => void;
  onStartAssessment: () => void;
}

const Tutorial = ({ onComplete, onStartAssessment }: TutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to The Correct Spender!",
      content: "This app helps you manage your money better. Let's take a quick tour to show you how everything works.",
      icon: "👋"
    },
    {
      title: "Financial Health Assessment",
      content: "Start here to check how you're doing with money. You'll get a score and personalized advice to improve your finances.",
      icon: "📊"
    },
    {
      title: "Budget Helper",
      content: "Create a budget plan that works for your income. The app will suggest the best budget rule for your situation.",
      icon: "💰"
    },
    {
      title: "AI Money Helper",
      content: "Ask questions and get instant help with money decisions. It's like having a financial advisor available 24/7.",
      icon: "🤖"
    },
    {
      title: "Accessibility Settings",
      content: "Make the app work better for you. Change text size, colors, language, and more to fit your needs.",
      icon: "⚙️"
    },
    {
      title: "Ready to Start!",
      content: "We recommend starting with the Financial Health Assessment to understand your current situation and get personalized advice.",
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
            <CardTitle className="text-2xl">App Tutorial</CardTitle>
            <Button variant="ghost" size="sm" onClick={onComplete}>
              Skip Tutorial
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
              Previous
            </Button>

            {currentStep === tutorialSteps.length - 1 ? (
              <div className="flex gap-2">
                <Button variant="outline" onClick={onComplete}>
                  Explore on My Own
                </Button>
                <Button onClick={handleStartAssessment} className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Start Assessment
                </Button>
              </div>
            ) : (
              <Button onClick={nextStep} className="flex items-center gap-2">
                Next
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
