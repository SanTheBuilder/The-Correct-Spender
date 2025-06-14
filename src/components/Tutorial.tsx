
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
    const guestSteps = {
      en: [
        {
          title: "Welcome, Guest!",
          content: "You're exploring our financial app in guest mode. You can try all features, but your data won't be saved. Consider signing up for full access!",
          icon: "👋"
        },
        {
          title: "Test Financial Health Assessment",
          content: "Try our financial health assessment tool. Your results won't be saved in guest mode, but you can see how it works!",
          icon: "📊"
        },
        {
          title: "Try Budget Tools",
          content: "Explore our budgeting tools to see how they can help manage your finances. Sign up to save your budgets!",
          icon: "💰"
        },
        {
          title: "Chat with AI Advisor",
          content: "Chat with our AI financial advisor for instant advice. All users get the same quality assistance!",
          icon: "🤖"
        },
        {
          title: "Customize Your Experience",
          content: "Adjust accessibility settings to make the app work better for you. These preferences are saved locally.",
          icon: "⚙️"
        },
        {
          title: "Ready to Explore!",
          content: "You're all set to explore our financial tools! Remember, you can sign up anytime to save your progress and access additional features.",
          icon: "🚀"
        }
      ],
      es: [
        {
          title: "¡Bienvenido, Invitado!",
          content: "Estás explorando nuestra app financiera en modo invitado. Puedes probar todas las funciones, ¡pero tus datos no se guardarán. ¡Considera registrarte para acceso completo!",
          icon: "👋"
        },
        {
          title: "Prueba la Evaluación de Salud Financiera",
          content: "Prueba nuestra herramienta de evaluación de salud financiera. Tus resultados no se guardarán en modo invitado, ¡pero puedes ver cómo funciona!",
          icon: "📊"
        },
        {
          title: "Prueba las Herramientas de Presupuesto",
          content: "Explora nuestras herramientas de presupuesto para ver cómo pueden ayudar a gestionar tus finanzas. ¡Regístrate para guardar tus presupuestos!",
          icon: "💰"
        },
        {
          title: "Chatea con el Asesor IA",
          content: "Chatea con nuestro asesor financiero IA para consejos instantáneos. ¡Todos los usuarios reciben la misma calidad de asistencia!",
          icon: "🤖"
        },
        {
          title: "Personaliza Tu Experiencia",
          content: "Ajusta la configuración de accesibilidad para que la app funcione mejor para ti. Estas preferencias se guardan localmente.",
          icon: "⚙️"
        },
        {
          title: "¡Listo para Explorar!",
          content: "¡Ya estás listo para explorar nuestras herramientas financieras! Recuerda, puedes registrarte en cualquier momento para guardar tu progreso y acceder a funciones adicionales.",
          icon: "🚀"
        }
      ],
      fr: [
        {
          title: "Bienvenue, Invité!",
          content: "Vous explorez notre app financière en mode invité. Vous pouvez essayer toutes les fonctionnalités, mais vos données ne seront pas sauvegardées. Considérez vous inscrire pour un accès complet!",
          icon: "👋"
        },
        {
          title: "Testez l'Évaluation de Santé Financière",
          content: "Essayez notre outil d'évaluation de santé financière. Vos résultats ne seront pas sauvegardés en mode invité, mais vous pouvez voir comment cela fonctionne!",
          icon: "📊"
        },
        {
          title: "Essayez les Outils de Budget",
          content: "Explorez nos outils de budgétisation pour voir comment ils peuvent aider à gérer vos finances. Inscrivez-vous pour sauvegarder vos budgets!",
          icon: "💰"
        },
        {
          title: "Chattez avec le Conseiller IA",
          content: "Chattez avec notre conseiller financier IA pour des conseils instantanés. Tous les utilisateurs reçoivent la même qualité d'assistance!",
          icon: "🤖"
        },
        {
          title: "Personnalisez Votre Expérience",
          content: "Ajustez les paramètres d'accessibilité pour que l'app fonctionne mieux pour vous. Ces préférences sont sauvegardées localement.",
          icon: "⚙️"
        },
        {
          title: "Prêt à Explorer!",
          content: "Vous êtes prêt à explorer nos outils financiers! Rappelez-vous, vous pouvez vous inscrire à tout moment pour sauvegarder votre progrès et accéder à des fonctionnalités supplémentaires.",
          icon: "🚀"
        }
      ]
    };

    const registeredSteps = [
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

    if (isGuest) {
      return guestSteps[language as keyof typeof guestSteps] || guestSteps.en;
    }
    
    return registeredSteps;
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
              {isGuest ? 
                (language === 'es' ? "Tutorial de Invitado" : 
                 language === 'fr' ? "Tutoriel d'Invité" : 
                 "Guest Tutorial") : 
                t("appTutorial")
              }
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onComplete}>
              {t("skipTutorial")}
            </Button>
          </div>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">
            {language === 'es' ? `Paso ${currentStep + 1} de ${tutorialSteps.length}` :
             language === 'fr' ? `Étape ${currentStep + 1} de ${tutorialSteps.length}` :
             `Step ${currentStep + 1} of ${tutorialSteps.length}`}
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
                  {isGuest ? 
                    (language === 'es' ? "Comenzar a Explorar" :
                     language === 'fr' ? "Commencer à Explorer" :
                     "Start Exploring") : 
                    t("exploreMyOwn")
                  }
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
