
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  fontSize: number;
  setFontSize: (size: number) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  screenReader: boolean;
  setScreenReader: (enabled: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;
  simpleMode: boolean;
  setSimpleMode: (enabled: boolean) => void;
  t: (key: string) => string;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

const translations = {
  en: {
    // App basic
    appTitle: "The Correct Spender",
    appSubtitle: "Your Personal Financial Wellness Platform",
    skipToMain: "Skip to main content",
    
    // Welcome messages
    welcomeTitle: "Welcome to Your Financial Journey",
    welcomeDescription: "Take control of your finances with our comprehensive tools and AI-powered guidance.",
    welcomeGuestTitle: "Welcome, Guest!",
    welcomeGuestDescription: "Explore our financial tools in guest mode. Sign up for a full experience!",
    
    // Navigation and buttons
    getStarted: "Get Started",
    start: "Start",
    back: "Back",
    backToOverview: "Back to Overview",
    next: "Next",
    previous: "Previous",
    continue: "Continue",
    finish: "Finish",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    submit: "Submit",
    
    // Features
    financialHealthAssessment: "Financial Health Assessment",
    budgetHelper: "Budget Helper",
    budgetHelperDesc: "Simple tools to manage your money",
    moneyHelperChat: "Money Helper Chat",
    moneyHelperChatDesc: "Ask questions about money",
    makeAppEasier: "Make App Easier",
    makeAppEasierDesc: "Change settings to help you use the app",
    accessibilitySettings: "Accessibility Settings",
    checkMoneyHealth: "Check Money Health",
    checkMoneyHealthDesc: "See how you're doing with money",
    
    // Tutorial
    tutorialWelcome: "Welcome to Your Financial Journey!",
    tutorialWelcomeDesc: "We'll guide you through the features that will help you achieve your financial goals.",
    tutorialAssessment: "Financial Health Check",
    tutorialAssessmentDesc: "Start with our comprehensive assessment to understand your current financial position.",
    tutorialBudget: "Smart Budgeting",
    tutorialBudgetDesc: "Create budgets that work for your lifestyle and track your spending effortlessly.",
    tutorialAI: "AI Financial Advisor",
    tutorialAIDesc: "Get personalized advice and instant answers to your financial questions.",
    tutorialAccessibility: "Personalized Experience",
    tutorialAccessibilityDesc: "Customize the app to match your preferences and accessibility needs.",
    tutorialReady: "You're All Set!",
    tutorialReadyDesc: "Ready to take control of your finances? Let's start with a quick assessment.",
    appTutorial: "App Tutorial",
    skipTutorial: "Skip Tutorial",
    exploreMyOwn: "Explore on My Own",
    startAssessment: "Start Assessment",
    
    // Financial facts
    didYouKnow: "Did You Know?",
    showAnotherFact: "Show Another Fact",
    
    // AI Chat
    aiChatTitle: "AI Financial Advisor",
    aiChatSubtitle: "Get personalized financial advice",
    askAboutMoney: "Ask about money...",
    quickQuestions: "Quick Questions",
    popularTopics: "Popular Topics",
    sendMessage: "Send Message",
    
    // Budget Tools
    budgetToolsTitle: "Budget Tools",
    budgetToolsSubtitle: "Manage your money wisely",
    monthlyIncome: "Monthly Income",
    monthlyExpenses: "Monthly Expenses",
    housingRent: "Housing/Rent",
    transportation: "Transportation",
    groceries: "Groceries",
    utilities: "Utilities",
    entertainment: "Entertainment",
    other: "Other",
    totalExpenses: "Total Expenses",
    remainingBudget: "Remaining Budget",
    budgetStatus: "Budget Status",
    withinBudget: "Within Budget",
    overBudget: "Over Budget",
    
    // Assessment
    assessmentTitle: "Financial Health Assessment",
    assessmentSubtitle: "Evaluate your financial wellness",
    monthlyIncomeQuestion: "What is your monthly income?",
    monthlySavingsQuestion: "How much do you save monthly?",
    debtAmountQuestion: "What is your total debt amount?",
    emergencyFundQuestion: "How many months of expenses do you have saved?",
    calculateScore: "Calculate Score",
    yourScore: "Your Score",
    excellent: "Excellent",
    good: "Good",
    fair: "Fair",
    poor: "Poor",
    
    // Accessibility
    accessibilityTitle: "Accessibility Settings",
    accessibilitySubtitle: "Customize your experience",
    fontSize: "Font Size",
    highContrast: "High Contrast",
    screenReaderMode: "Screen Reader Mode",
    simpleLanguage: "Simple Language",
    languageSelection: "Language",
    
    // Auth
    signIn: "Sign In",
    signUp: "Sign Up",
    signOut: "Sign Out",
    guestMode: "Guest Mode",
    email: "Email",
    password: "Password",
    firstName: "First Name",
    lastName: "Last Name",
    
    // Common
    loading: "Loading...",
    error: "Error",
    success: "Success",
    warning: "Warning",
    info: "Information"
  },
  es: {
    // App basic
    appTitle: "El Gastador Correcto",
    appSubtitle: "Tu Plataforma de Bienestar Financiero Personal",
    skipToMain: "Saltar al contenido principal",
    
    // Welcome messages
    welcomeTitle: "Bienvenido a Tu Viaje Financiero",
    welcomeDescription: "Toma control de tus finanzas con nuestras herramientas integrales y orientación impulsada por IA.",
    welcomeGuestTitle: "¡Bienvenido, Invitado!",
    welcomeGuestDescription: "Explora nuestras herramientas financieras en modo invitado. ¡Regístrate para una experiencia completa!",
    
    // Navigation and buttons
    getStarted: "Comenzar",
    start: "Iniciar",
    back: "Atrás",
    backToOverview: "Volver al Resumen",
    next: "Siguiente",
    previous: "Anterior",
    continue: "Continuar",
    finish: "Finalizar",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    submit: "Enviar",
    
    // Features
    financialHealthAssessment: "Evaluación de Salud Financiera",
    budgetHelper: "Ayudante de Presupuesto",
    budgetHelperDesc: "Herramientas simples para gestionar tu dinero",
    moneyHelperChat: "Chat de Ayuda Financiera",
    moneyHelperChatDesc: "Haz preguntas sobre dinero",
    makeAppEasier: "Hacer la App Más Fácil",
    makeAppEasierDesc: "Cambiar configuraciones para ayudarte a usar la app",
    accessibilitySettings: "Configuración de Accesibilidad",
    checkMoneyHealth: "Revisar Salud Financiera",
    checkMoneyHealthDesc: "Ve cómo estás con el dinero",
    
    // Tutorial
    tutorialWelcome: "¡Bienvenido a Tu Viaje Financiero!",
    tutorialWelcomeDesc: "Te guiaremos a través de las características que te ayudarán a lograr tus metas financieras.",
    tutorialAssessment: "Revisión de Salud Financiera",
    tutorialAssessmentDesc: "Comienza con nuestra evaluación integral para entender tu posición financiera actual.",
    tutorialBudget: "Presupuesto Inteligente",
    tutorialBudgetDesc: "Crea presupuestos que funcionen para tu estilo de vida y rastrea tus gastos sin esfuerzo.",
    tutorialAI: "Asesor Financiero IA",
    tutorialAIDesc: "Obtén consejos personalizados y respuestas instantáneas a tus preguntas financieras.",
    tutorialAccessibility: "Experiencia Personalizada",
    tutorialAccessibilityDesc: "Personaliza la app para que coincida con tus preferencias y necesidades de accesibilidad.",
    tutorialReady: "¡Ya Estás Listo!",
    tutorialReadyDesc: "¿Listo para tomar control de tus finanzas? Comencemos con una evaluación rápida.",
    appTutorial: "Tutorial de la App",
    skipTutorial: "Saltar Tutorial",
    exploreMyOwn: "Explorar por Mi Cuenta",
    startAssessment: "Comenzar Evaluación",
    
    // Financial facts
    didYouKnow: "¿Sabías Que?",
    showAnotherFact: "Mostrar Otro Dato",
    
    // AI Chat
    aiChatTitle: "Asesor Financiero IA",
    aiChatSubtitle: "Obtén consejos financieros personalizados",
    askAboutMoney: "Pregunta sobre dinero...",
    quickQuestions: "Preguntas Rápidas",
    popularTopics: "Temas Populares",
    sendMessage: "Enviar Mensaje",
    
    // Budget Tools
    budgetToolsTitle: "Herramientas de Presupuesto",
    budgetToolsSubtitle: "Gestiona tu dinero sabiamente",
    monthlyIncome: "Ingresos Mensuales",
    monthlyExpenses: "Gastos Mensuales",
    housingRent: "Vivienda/Alquiler",
    transportation: "Transporte",
    groceries: "Comestibles",
    utilities: "Servicios Públicos",
    entertainment: "Entretenimiento",
    other: "Otros",
    totalExpenses: "Gastos Totales",
    remainingBudget: "Presupuesto Restante",
    budgetStatus: "Estado del Presupuesto",
    withinBudget: "Dentro del Presupuesto",
    overBudget: "Sobre el Presupuesto",
    
    // Assessment
    assessmentTitle: "Evaluación de Salud Financiera",
    assessmentSubtitle: "Evalúa tu bienestar financiero",
    monthlyIncomeQuestion: "¿Cuáles son tus ingresos mensuales?",
    monthlySavingsQuestion: "¿Cuánto ahorras mensualmente?",
    debtAmountQuestion: "¿Cuál es el monto total de tu deuda?",
    emergencyFundQuestion: "¿Cuántos meses de gastos tienes ahorrados?",
    calculateScore: "Calcular Puntuación",
    yourScore: "Tu Puntuación",
    excellent: "Excelente",
    good: "Bueno",
    fair: "Regular",
    poor: "Malo",
    
    // Accessibility
    accessibilityTitle: "Configuración de Accesibilidad",
    accessibilitySubtitle: "Personaliza tu experiencia",
    fontSize: "Tamaño de Fuente",
    highContrast: "Alto Contraste",
    screenReaderMode: "Modo Lector de Pantalla",
    simpleLanguage: "Lenguaje Simple",
    languageSelection: "Idioma",
    
    // Auth
    signIn: "Iniciar Sesión",
    signUp: "Registrarse",
    signOut: "Cerrar Sesión",
    guestMode: "Modo Invitado",
    email: "Correo Electrónico",
    password: "Contraseña",
    firstName: "Nombre",
    lastName: "Apellido",
    
    // Common
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    warning: "Advertencia",
    info: "Información"
  },
  fr: {
    // App basic
    appTitle: "Le Dépenseur Correct",
    appSubtitle: "Votre Plateforme de Bien-être Financier Personnel",
    skipToMain: "Passer au contenu principal",
    
    // Welcome messages
    welcomeTitle: "Bienvenue dans Votre Parcours Financier",
    welcomeDescription: "Prenez le contrôle de vos finances avec nos outils complets et nos conseils alimentés par l'IA.",
    welcomeGuestTitle: "Bienvenue, Invité!",
    welcomeGuestDescription: "Explorez nos outils financiers en mode invité. Inscrivez-vous pour une expérience complète!",
    
    // Navigation and buttons
    getStarted: "Commencer",
    start: "Démarrer",
    back: "Retour",
    backToOverview: "Retour à l'Aperçu",
    next: "Suivant",
    previous: "Précédent",
    continue: "Continuer",
    finish: "Terminer",
    save: "Sauvegarder",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    submit: "Soumettre",
    
    // Features
    financialHealthAssessment: "Évaluation de la Santé Financière",
    budgetHelper: "Assistant Budget",
    budgetHelperDesc: "Outils simples pour gérer votre argent",
    moneyHelperChat: "Chat d'Aide Financière",
    moneyHelperChatDesc: "Posez des questions sur l'argent",
    makeAppEasier: "Rendre l'App Plus Facile",
    makeAppEasierDesc: "Changer les paramètres pour vous aider à utiliser l'app",
    accessibilitySettings: "Paramètres d'Accessibilité",
    checkMoneyHealth: "Vérifier la Santé Financière",
    checkMoneyHealthDesc: "Voyez comment vous vous en sortez avec l'argent",
    
    // Tutorial
    tutorialWelcome: "Bienvenue dans Votre Parcours Financier!",
    tutorialWelcomeDesc: "Nous vous guiderons à travers les fonctionnalités qui vous aideront à atteindre vos objectifs financiers.",
    tutorialAssessment: "Vérification de la Santé Financière",
    tutorialAssessmentDesc: "Commencez par notre évaluation complète pour comprendre votre position financière actuelle.",
    tutorialBudget: "Budgétisation Intelligente",
    tutorialBudgetDesc: "Créez des budgets qui fonctionnent pour votre style de vie et suivez vos dépenses sans effort.",
    tutorialAI: "Conseiller Financier IA",
    tutorialAIDesc: "Obtenez des conseils personnalisés et des réponses instantanées à vos questions financières.",
    tutorialAccessibility: "Expérience Personnalisée",
    tutorialAccessibilityDesc: "Personnalisez l'app pour qu'elle corresponde à vos préférences et besoins d'accessibilité.",
    tutorialReady: "Vous Êtes Prêt!",
    tutorialReadyDesc: "Prêt à prendre le contrôle de vos finances? Commençons par une évaluation rapide.",
    appTutorial: "Tutoriel de l'App",
    skipTutorial: "Ignorer le Tutoriel",
    exploreMyOwn: "Explorer par Moi-même",
    startAssessment: "Commencer l'Évaluation",
    
    // Financial facts
    didYouKnow: "Le Saviez-vous?",
    showAnotherFact: "Afficher un Autre Fait",
    
    // AI Chat
    aiChatTitle: "Conseiller Financier IA",
    aiChatSubtitle: "Obtenez des conseils financiers personnalisés",
    askAboutMoney: "Demandez à propos de l'argent...",
    quickQuestions: "Questions Rapides",
    popularTopics: "Sujets Populaires",
    sendMessage: "Envoyer le Message",
    
    // Budget Tools
    budgetToolsTitle: "Outils de Budget",
    budgetToolsSubtitle: "Gérez votre argent intelligemment",
    monthlyIncome: "Revenus Mensuels",
    monthlyExpenses: "Dépenses Mensuelles",
    housingRent: "Logement/Loyer",
    transportation: "Transport",
    groceries: "Épicerie",
    utilities: "Services Publics",
    entertainment: "Divertissement",
    other: "Autres",
    totalExpenses: "Dépenses Totales",
    remainingBudget: "Budget Restant",
    budgetStatus: "Statut du Budget",
    withinBudget: "Dans le Budget",
    overBudget: "Hors Budget",
    
    // Assessment
    assessmentTitle: "Évaluation de la Santé Financière",
    assessmentSubtitle: "Évaluez votre bien-être financier",
    monthlyIncomeQuestion: "Quels sont vos revenus mensuels?",
    monthlySavingsQuestion: "Combien épargnez-vous mensuellement?",
    debtAmountQuestion: "Quel est le montant total de votre dette?",
    emergencyFundQuestion: "Combien de mois de dépenses avez-vous épargnés?",
    calculateScore: "Calculer le Score",
    yourScore: "Votre Score",
    excellent: "Excellent",
    good: "Bon",
    fair: "Passable",
    poor: "Mauvais",
    
    // Accessibility
    accessibilityTitle: "Paramètres d'Accessibilité",
    accessibilitySubtitle: "Personnalisez votre expérience",
    fontSize: "Taille de Police",
    highContrast: "Contraste Élevé",
    screenReaderMode: "Mode Lecteur d'Écran",
    simpleLanguage: "Langage Simple",
    languageSelection: "Langue",
    
    // Auth
    signIn: "Se Connecter",
    signUp: "S'inscrire",
    signOut: "Se Déconnecter",
    guestMode: "Mode Invité",
    email: "Email",
    password: "Mot de Passe",
    firstName: "Prénom",
    lastName: "Nom de Famille",
    
    // Common
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    warning: "Avertissement",
    info: "Information"
  }
  // Add more languages as needed (de, it, pt, ru, ja, ko, zh, ar, hi)
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [language, setLanguage] = useState('en');
  const [simpleMode, setSimpleMode] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedPrefs = localStorage.getItem('accessibility-preferences');
    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      setFontSize(prefs.fontSize || 16);
      setHighContrast(prefs.highContrast || false);
      setScreenReader(prefs.screenReader || false);
      setLanguage(prefs.language || 'en');
      setSimpleMode(prefs.simpleMode || false);
    }
  }, []);

  useEffect(() => {
    // Save preferences
    const prefs = {
      fontSize,
      highContrast,
      screenReader,
      language,
      simpleMode
    };
    localStorage.setItem('accessibility-preferences', JSON.stringify(prefs));

    // Apply CSS variables
    document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
    document.documentElement.classList.toggle('high-contrast', highContrast);
  }, [fontSize, highContrast, screenReader, language, simpleMode]);

  const t = (key: string): string => {
    const currentTranslations = translations[language as keyof typeof translations] || translations.en;
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  const value = {
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    screenReader,
    setScreenReader,
    language,
    setLanguage,
    simpleMode,
    setSimpleMode,
    t,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
