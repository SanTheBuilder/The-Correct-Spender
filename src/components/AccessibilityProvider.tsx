
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AccessibilityContextType {
  fontSize: string;
  highContrast: boolean;
  screenReaderMode: boolean;
  language: string;
  simpleMode: boolean;
  setFontSize: (size: string) => void;
  setHighContrast: (enabled: boolean) => void;
  setScreenReaderMode: (enabled: boolean) => void;
  setLanguage: (lang: string) => void;
  setSimpleMode: (simple: boolean) => void;
  announceToScreenReader: (message: string) => void;
  t: (key: string) => string;
}

// Translation dictionary
const translations = {
  en: {
    appTitle: "The Correct Spender",
    appSubtitle: "Your accessible financial wellness companion",
    welcomeTitle: "Take Control of Your Financial Future",
    welcomeDescription: "Whether you're new to managing money or looking to improve your financial health, we're here to help you make informed decisions without the need for expensive advisors.",
    selectLanguage: "Select Language",
    languageDescription: "Choose your preferred language to continue",
    continue: "Continue",
    accessibilitySettings: "Accessibility Settings",
    textSize: "Text Size",
    visualAccessibility: "Visual Accessibility",
    screenReaderSupport: "Screen Reader Support",
    language: "Language",
    interfaceMode: "Interface Mode",
    simple: "Simple",
    detailed: "Detailed",
    small: "Small",
    medium: "Medium",
    large: "Large",
    extraLarge: "Extra Large",
    highContrastMode: "High Contrast Mode",
    enhancedScreenReaderMode: "Enhanced Screen Reader Mode",
    simpleMode: "Simple Mode",
    simpleModeDescription: "Use basic language and simplified interface",
    detailedMode: "Detailed Mode",
    detailedModeDescription: "Show advanced options and technical terms"
  },
  es: {
    appTitle: "El Gastador Correcto",
    appSubtitle: "Tu compañero accesible de bienestar financiero",
    welcomeTitle: "Toma Control de Tu Futuro Financiero",
    welcomeDescription: "Ya sea que seas nuevo manejando dinero o busques mejorar tu salud financiera, estamos aquí para ayudarte a tomar decisiones informadas sin necesidad de asesores costosos.",
    selectLanguage: "Seleccionar Idioma",
    languageDescription: "Elige tu idioma preferido para continuar",
    continue: "Continuar",
    accessibilitySettings: "Configuración de Accesibilidad",
    textSize: "Tamaño de Texto",
    visualAccessibility: "Accesibilidad Visual",
    screenReaderSupport: "Soporte para Lector de Pantalla",
    language: "Idioma",
    interfaceMode: "Modo de Interfaz",
    simple: "Simple",
    detailed: "Detallado",
    small: "Pequeño",
    medium: "Mediano",
    large: "Grande",
    extraLarge: "Extra Grande",
    highContrastMode: "Modo de Alto Contraste",
    enhancedScreenReaderMode: "Modo Mejorado de Lector de Pantalla",
    simpleMode: "Modo Simple",
    simpleModeDescription: "Usar lenguaje básico e interfaz simplificada",
    detailedMode: "Modo Detallado",
    detailedModeDescription: "Mostrar opciones avanzadas y términos técnicos"
  },
  fr: {
    appTitle: "Le Dépenseur Correct",
    appSubtitle: "Votre compagnon de bien-être financier accessible",
    welcomeTitle: "Prenez le Contrôle de Votre Avenir Financier",
    welcomeDescription: "Que vous soyez nouveau dans la gestion de l'argent ou que vous cherchiez à améliorer votre santé financière, nous sommes là pour vous aider à prendre des décisions éclairées sans avoir besoin de conseillers coûteux.",
    selectLanguage: "Sélectionner la Langue",
    languageDescription: "Choisissez votre langue préférée pour continuer",
    continue: "Continuer",
    accessibilitySettings: "Paramètres d'Accessibilité",
    textSize: "Taille du Texte",
    visualAccessibility: "Accessibilité Visuelle",
    screenReaderSupport: "Support de Lecteur d'Écran",
    language: "Langue",
    interfaceMode: "Mode d'Interface",
    simple: "Simple",
    detailed: "Détaillé",
    small: "Petit",
    medium: "Moyen",
    large: "Grand",
    extraLarge: "Extra Grand",
    highContrastMode: "Mode Haut Contraste",
    enhancedScreenReaderMode: "Mode Lecteur d'Écran Amélioré",
    simpleMode: "Mode Simple",
    simpleModeDescription: "Utiliser un langage de base et une interface simplifiée",
    detailedMode: "Mode Détaillé",
    detailedModeDescription: "Afficher les options avancées et les termes techniques"
  }
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
};

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider = ({ children }: AccessibilityProviderProps) => {
  const [fontSize, setFontSize] = useState("medium");
  const [highContrast, setHighContrast] = useState(false);
  const [screenReaderMode, setScreenReaderMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [simpleMode, setSimpleMode] = useState(true);

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.setAttribute("class", "sr-only");
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  useEffect(() => {
    const savedPrefs = localStorage.getItem("accessibility-preferences");
    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      setFontSize(prefs.fontSize || "medium");
      setHighContrast(prefs.highContrast || false);
      setScreenReaderMode(prefs.screenReaderMode || false);
      setLanguage(prefs.language || "en");
      setSimpleMode(prefs.simpleMode !== undefined ? prefs.simpleMode : true);
    }
  }, []);

  useEffect(() => {
    const prefs = {
      fontSize,
      highContrast,
      screenReaderMode,
      language,
      simpleMode
    };
    localStorage.setItem("accessibility-preferences", JSON.stringify(prefs));
    
    // Apply font size
    const root = document.documentElement;
    switch (fontSize) {
      case "small":
        root.style.fontSize = "14px";
        break;
      case "large":
        root.style.fontSize = "18px";
        break;
      case "extra-large":
        root.style.fontSize = "22px";
        break;
      default:
        root.style.fontSize = "16px";
    }

    // Apply contrast
    document.body.classList.toggle("high-contrast", highContrast);
    
    // Apply screen reader mode
    document.body.classList.toggle("screen-reader-mode", screenReaderMode);
    
    // Apply simple mode
    document.body.classList.toggle("simple-mode", simpleMode);
  }, [fontSize, highContrast, screenReaderMode, language, simpleMode]);

  const value = {
    fontSize,
    highContrast,
    screenReaderMode,
    language,
    simpleMode,
    setFontSize,
    setHighContrast,
    setScreenReaderMode,
    setLanguage,
    setSimpleMode,
    announceToScreenReader,
    t
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
