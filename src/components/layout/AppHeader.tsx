
import { DollarSign } from "lucide-react";
import { useAccessibility } from "../AccessibilityProvider";
import { useAuth } from "../AuthProvider";
import UserMenu from "../UserMenu";

const AppHeader = () => {
  const { language, simpleMode, t } = useAccessibility();
  const { user, isGuest } = useAuth();

  return (
    <header className="border-b" role="banner">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-primary" aria-hidden="true" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t("appTitle")}</h1>
              <p className="text-muted-foreground">{t("appSubtitle")}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {(user || isGuest) && (
              <div className="text-sm text-muted-foreground">
                {isGuest 
                  ? `${simpleMode ? 
                      (language === 'es' ? "Modo Invitado" : 
                       language === 'fr' ? "Mode Invité" : 
                       "Guest Mode") : 
                      (language === 'es' ? "Usuario Invitado" : 
                       language === 'fr' ? "Utilisateur Invité" : 
                       "Guest User")}` 
                  : `${simpleMode ? 
                      (language === 'es' ? "Bienvenido" : 
                       language === 'fr' ? "Bienvenue" : 
                       "Welcome") : 
                      t("welcomeBack")}, ${user?.email || "Guest"}`
                }
              </div>
            )}
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
