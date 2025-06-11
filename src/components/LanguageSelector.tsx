
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
    },
    { 
      code: "de", 
      name: "Deutsch", 
      flag: "🇩🇪",
      welcome: "Willkommen bei Der Richtige Spender"
    },
    { 
      code: "it", 
      name: "Italiano", 
      flag: "🇮🇹",
      welcome: "Benvenuto su Il Spendaccione Corretto"
    },
    { 
      code: "pt", 
      name: "Português", 
      flag: "🇵🇹",
      welcome: "Bem-vindo ao O Gastador Correto"
    },
    { 
      code: "ru", 
      name: "Русский", 
      flag: "🇷🇺",
      welcome: "Добро пожаловать в Правильный Тратитель"
    },
    { 
      code: "ja", 
      name: "日本語", 
      flag: "🇯🇵",
      welcome: "正しい支出者へようこそ"
    },
    { 
      code: "ko", 
      name: "한국어", 
      flag: "🇰🇷",
      welcome: "올바른 지출자에 오신 것을 환영합니다"
    },
    { 
      code: "zh", 
      name: "中文", 
      flag: "🇨🇳",
      welcome: "欢迎来到正确的支出者"
    },
    { 
      code: "ar", 
      name: "العربية", 
      flag: "🇸🇦",
      welcome: "مرحباً بك في المنفق الصحيح"
    },
    { 
      code: "hi", 
      name: "हिंदी", 
      flag: "🇮🇳",
      welcome: "सही खर्च करने वाले में आपका स्वागत है"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant="outline"
                className="h-auto p-4 text-left justify-start hover:bg-accent hover:border-primary"
                onClick={() => onLanguageSelect(lang.code)}
              >
                <div className="flex items-center gap-3 w-full">
                  <span className="text-2xl" aria-hidden="true">{lang.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-lg font-semibold truncate">{lang.name}</div>
                    <div className="text-xs text-muted-foreground mt-1 truncate">{lang.welcome}</div>
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
