
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  onLanguageSelect: (language: string) => void;
  onContinue: () => void;
}

const LanguageSelector = ({ onLanguageSelect, onContinue }: LanguageSelectorProps) => {
  const languages = [
    { 
      code: "en", 
      name: "English", 
      flag: "🇺🇸",
      welcome: "Welcome to The Correct Spender"
    },
    { 
      code: "es", 
      name: "Español", 
      flag: "🇪🇸",
      welcome: "Bienvenido a El Gastador Correcto"
    },
    { 
      code: "fr", 
      name: "Français", 
      flag: "🇫🇷",
      welcome: "Bienvenue sur Le Dépenseur Correct"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="h-12 w-12 text-primary" aria-hidden="true" />
          </div>
          <CardTitle className="text-3xl">Select Language / Seleccionar Idioma / Sélectionner la Langue</CardTitle>
          <CardDescription className="text-lg">
            Choose your preferred language to continue / Elige tu idioma preferido para continuar / Choisissez votre langue préférée pour continuer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant="outline"
                className="h-auto p-6 text-left justify-start hover:bg-accent hover:border-primary"
                onClick={() => onLanguageSelect(lang.code)}
              >
                <div className="flex items-center gap-4 w-full">
                  <span className="text-3xl" aria-hidden="true">{lang.flag}</span>
                  <div className="flex-1">
                    <div className="text-xl font-semibold">{lang.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">{lang.welcome}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
          
          <div className="text-center pt-4">
            <Button onClick={onContinue} size="lg">
              Continue / Continuar / Continuer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageSelector;
