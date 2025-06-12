
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

// Comprehensive translation dictionary
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
    detailedModeDescription: "Show advanced options and technical terms",
    // Financial Health Assessment
    financialHealthAssessment: "Financial Health Assessment",
    financialHealthDescription: "Enter your financial information to get a personalized health score and recommendations",
    monthlyIncome: "Monthly Income ($)",
    monthlyExpenses: "Monthly Expenses ($)",
    totalSavings: "Total Savings ($)",
    totalDebt: "Total Debt ($)",
    emergencyFund: "Emergency Fund ($)",
    calculateScore: "Calculate My Financial Health Score",
    yourScore: "Your Financial Health Score",
    excellent: "Excellent",
    good: "Good",
    fair: "Fair",
    needsImprovement: "Needs Improvement",
    savingsRate: "Savings Rate",
    emergencyMonths: "Emergency Months",
    debtToIncome: "Debt to Income",
    recommendations: "Personalized Recommendations:",
    additionalTips: "Additional Tips:",
    wasHelpful: "Was this advice helpful?",
    helpful: "Helpful",
    notHelpful: "Not Helpful",
    getAIHelp: "Get AI Help",
    // Tutorial
    tutorialWelcome: "Welcome to The Correct Spender!",
    tutorialWelcomeDesc: "This app helps you manage your money better. Let's take a quick tour to show you how everything works.",
    tutorialAssessment: "Financial Health Assessment",
    tutorialAssessmentDesc: "Start here to check how you're doing with money. You'll get a score and personalized advice to improve your finances.",
    tutorialBudget: "Budget Helper",
    tutorialBudgetDesc: "Create a budget plan that works for your income. The app will suggest the best budget rule for your situation.",
    tutorialAI: "AI Money Helper",
    tutorialAIDesc: "Ask questions and get instant help with money decisions. It's like having a financial advisor available 24/7.",
    tutorialAccessibility: "Accessibility Settings",
    tutorialAccessibilityDesc: "Make the app work better for you. Change text size, colors, language, and more to fit your needs.",
    tutorialReady: "Ready to Start!",
    tutorialReadyDesc: "We recommend starting with the Financial Health Assessment to understand your current situation and get personalized advice.",
    appTutorial: "App Tutorial",
    skipTutorial: "Skip Tutorial",
    previous: "Previous",
    next: "Next",
    startAssessment: "Start Assessment",
    exploreMyOwn: "Explore on My Own",
    // Navigation and Common
    back: "Back",
    backToOverview: "Back to Overview",
    start: "Start",
    getStarted: "Get Started",
    didYouKnow: "Did You Know?",
    showAnotherFact: "Show Another Fact",
    skipToMain: "Skip to main content",
    // Features
    checkMoneyHealth: "Check Your Money Health",
    checkMoneyHealthDesc: "See how you're doing with money and get help",
    budgetHelper: "Budget Helper",
    budgetHelperDesc: "Make a plan for your money that works for you",
    moneyHelperChat: "Money Helper Chat",
    moneyHelperChatDesc: "Ask questions and get help with money decisions",
    makeAppEasier: "Make App Easier to Use",
    makeAppEasierDesc: "Change how the app looks and works for you",
    // Error messages
    invalidInput: "Invalid Input",
    enterValidIncome: "Please enter a valid monthly income",
    assessmentComplete: "Assessment Complete!",
    scoreMessage: "Your financial health score is",
    thankYou: "Thank you!",
    adviceHelpful: "We're glad the advice was helpful",
    moreAdvice: "More advice coming up!",
    additionalTipsDesc: "Here are additional tips that might help",
    aiHelper: "AI Helper",
    navigateToAI: "Navigate to the AI Chat section for personalized assistance"
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
    detailedModeDescription: "Mostrar opciones avanzadas y términos técnicos",
    // Financial Health Assessment
    financialHealthAssessment: "Evaluación de Salud Financiera",
    financialHealthDescription: "Ingresa tu información financiera para obtener un puntaje personalizado y recomendaciones",
    monthlyIncome: "Ingresos Mensuales ($)",
    monthlyExpenses: "Gastos Mensuales ($)",
    totalSavings: "Ahorros Totales ($)",
    totalDebt: "Deuda Total ($)",
    emergencyFund: "Fondo de Emergencia ($)",
    calculateScore: "Calcular Mi Puntaje de Salud Financiera",
    yourScore: "Tu Puntaje de Salud Financiera",
    excellent: "Excelente",
    good: "Bueno",
    fair: "Regular",
    needsImprovement: "Necesita Mejora",
    savingsRate: "Tasa de Ahorro",
    emergencyMonths: "Meses de Emergencia",
    debtToIncome: "Deuda a Ingresos",
    recommendations: "Recomendaciones Personalizadas:",
    additionalTips: "Consejos Adicionales:",
    wasHelpful: "¿Fue útil este consejo?",
    helpful: "Útil",
    notHelpful: "No Útil",
    getAIHelp: "Obtener Ayuda de IA",
    // Tutorial
    tutorialWelcome: "¡Bienvenido a El Gastador Correcto!",
    tutorialWelcomeDesc: "Esta aplicación te ayuda a manejar mejor tu dinero. Hagamos un recorrido rápido para mostrarte cómo funciona todo.",
    tutorialAssessment: "Evaluación de Salud Financiera",
    tutorialAssessmentDesc: "Comienza aquí para verificar cómo te va con el dinero. Obtendrás un puntaje y consejos personalizados para mejorar tus finanzas.",
    tutorialBudget: "Ayudante de Presupuesto",
    tutorialBudgetDesc: "Crea un plan de presupuesto que funcione para tus ingresos. La aplicación sugerirá la mejor regla de presupuesto para tu situación.",
    tutorialAI: "Ayudante de Dinero IA",
    tutorialAIDesc: "Haz preguntas y obtén ayuda instantánea con decisiones de dinero. Es como tener un asesor financiero disponible 24/7.",
    tutorialAccessibility: "Configuración de Accesibilidad",
    tutorialAccessibilityDesc: "Haz que la aplicación funcione mejor para ti. Cambia el tamaño del texto, colores, idioma y más para satisfacer tus necesidades.",
    tutorialReady: "¡Listo para Comenzar!",
    tutorialReadyDesc: "Recomendamos comenzar con la Evaluación de Salud Financiera para entender tu situación actual y obtener consejos personalizados.",
    appTutorial: "Tutorial de la Aplicación",
    skipTutorial: "Saltar Tutorial",
    previous: "Anterior",
    next: "Siguiente",
    startAssessment: "Comenzar Evaluación",
    exploreMyOwn: "Explorar por Mi Cuenta",
    // Navigation and Common
    back: "Atrás",
    backToOverview: "Volver al Resumen",
    start: "Comenzar",
    getStarted: "Empezar",
    didYouKnow: "¿Sabías Que?",
    showAnotherFact: "Mostrar Otro Dato",
    skipToMain: "Saltar al contenido principal",
    // Features
    checkMoneyHealth: "Verificar Salud del Dinero",
    checkMoneyHealthDesc: "Ve cómo te va con el dinero y obtén ayuda",
    budgetHelper: "Ayudante de Presupuesto",
    budgetHelperDesc: "Haz un plan para tu dinero que funcione para ti",
    moneyHelperChat: "Chat Ayudante de Dinero",
    moneyHelperChatDesc: "Haz preguntas y obtén ayuda con decisiones de dinero",
    makeAppEasier: "Hacer la App Más Fácil de Usar",
    makeAppEasierDesc: "Cambia cómo se ve y funciona la app para ti",
    // Error messages
    invalidInput: "Entrada Inválida",
    enterValidIncome: "Por favor ingresa un ingreso mensual válido",
    assessmentComplete: "¡Evaluación Completa!",
    scoreMessage: "Tu puntaje de salud financiera es",
    thankYou: "¡Gracias!",
    adviceHelpful: "Nos alegra que el consejo haya sido útil",
    moreAdvice: "¡Más consejos en camino!",
    additionalTipsDesc: "Aquí hay consejos adicionales que podrían ayudar",
    aiHelper: "Ayudante IA",
    navigateToAI: "Navega a la sección de Chat IA para asistencia personalizada"
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
    detailedModeDescription: "Afficher les options avancées et les termes techniques",
    // Financial Health Assessment
    financialHealthAssessment: "Évaluation de la Santé Financière",
    financialHealthDescription: "Entrez vos informations financières pour obtenir un score personnalisé et des recommandations",
    monthlyIncome: "Revenus Mensuels ($)",
    monthlyExpenses: "Dépenses Mensuelles ($)",
    totalSavings: "Épargne Totale ($)",
    totalDebt: "Dette Totale ($)",
    emergencyFund: "Fonds d'Urgence ($)",
    calculateScore: "Calculer Mon Score de Santé Financière",
    yourScore: "Votre Score de Santé Financière",
    excellent: "Excellent",
    good: "Bon",
    fair: "Passable",
    needsImprovement: "Nécessite une Amélioration",
    savingsRate: "Taux d'Épargne",
    emergencyMonths: "Mois d'Urgence",
    debtToIncome: "Dette sur Revenus",
    recommendations: "Recommandations Personnalisées:",
    additionalTips: "Conseils Supplémentaires:",
    wasHelpful: "Ce conseil était-il utile?",
    helpful: "Utile",
    notHelpful: "Pas Utile",
    getAIHelp: "Obtenir l'Aide de l'IA",
    // Tutorial
    tutorialWelcome: "Bienvenue sur Le Dépenseur Correct!",
    tutorialWelcomeDesc: "Cette application vous aide à mieux gérer votre argent. Faisons un tour rapide pour vous montrer comment tout fonctionne.",
    tutorialAssessment: "Évaluation de la Santé Financière",
    tutorialAssessmentDesc: "Commencez ici pour vérifier comment vous vous en sortez avec l'argent. Vous obtiendrez un score et des conseils personnalisés pour améliorer vos finances.",
    tutorialBudget: "Assistant Budget",
    tutorialBudgetDesc: "Créez un plan budgétaire qui fonctionne pour vos revenus. L'application suggérera la meilleure règle budgétaire pour votre situation.",
    tutorialAI: "Assistant Argent IA",
    tutorialAIDesc: "Posez des questions et obtenez une aide instantanée avec les décisions d'argent. C'est comme avoir un conseiller financier disponible 24h/24 et 7j/7.",
    tutorialAccessibility: "Paramètres d'Accessibilité",
    tutorialAccessibilityDesc: "Faites fonctionner l'application mieux pour vous. Changez la taille du texte, les couleurs, la langue et plus pour répondre à vos besoins.",
    tutorialReady: "Prêt à Commencer!",
    tutorialReadyDesc: "Nous recommandons de commencer par l'Évaluation de la Santé Financière pour comprendre votre situation actuelle et obtenir des conseils personnalisés.",
    appTutorial: "Tutoriel de l'Application",
    skipTutorial: "Ignorer le Tutoriel",
    previous: "Précédent",
    next: "Suivant",
    startAssessment: "Commencer l'Évaluation",
    exploreMyOwn: "Explorer par Moi-même",
    // Navigation and Common
    back: "Retour",
    backToOverview: "Retour à l'Aperçu",
    start: "Commencer",
    getStarted: "Commencer",
    didYouKnow: "Le Saviez-vous?",
    showAnotherFact: "Afficher un Autre Fait",
    skipToMain: "Aller au contenu principal",
    // Features
    checkMoneyHealth: "Vérifier la Santé de l'Argent",
    checkMoneyHealthDesc: "Voyez comment vous vous en sortez avec l'argent et obtenez de l'aide",
    budgetHelper: "Assistant Budget",
    budgetHelperDesc: "Faites un plan pour votre argent qui fonctionne pour vous",
    moneyHelperChat: "Chat Assistant Argent",
    moneyHelperChatDesc: "Posez des questions et obtenez de l'aide avec les décisions d'argent",
    makeAppEasier: "Rendre l'App Plus Facile à Utiliser",
    makeAppEasierDesc: "Changez comment l'app apparaît et fonctionne pour vous",
    // Error messages
    invalidInput: "Entrée Invalide",
    enterValidIncome: "Veuillez entrer un revenu mensuel valide",
    assessmentComplete: "Évaluation Terminée!",
    scoreMessage: "Votre score de santé financière est",
    thankYou: "Merci!",
    adviceHelpful: "Nous sommes heureux que le conseil ait été utile",
    moreAdvice: "Plus de conseils arrivent!",
    additionalTipsDesc: "Voici des conseils supplémentaires qui pourraient aider",
    aiHelper: "Assistant IA",
    navigateToAI: "Naviguez vers la section Chat IA pour une assistance personnalisée"
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
