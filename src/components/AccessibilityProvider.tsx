
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AccessibilityContextType {
  fontSize: string;
  highContrast: boolean;
  screenReaderMode: boolean;
  language: string;
  announceToScreenReader: (message: string) => void;
}

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
    // Apply accessibility preferences on load
    const savedPrefs = localStorage.getItem("accessibility-preferences");
    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      setFontSize(prefs.fontSize || "medium");
      setHighContrast(prefs.highContrast || false);
      setScreenReaderMode(prefs.screenReaderMode || false);
      setLanguage(prefs.language || "en");
    }
  }, []);

  useEffect(() => {
    // Save preferences to localStorage
    const prefs = {
      fontSize,
      highContrast,
      screenReaderMode,
      language
    };
    localStorage.setItem("accessibility-preferences", JSON.stringify(prefs));
  }, [fontSize, highContrast, screenReaderMode, language]);

  const value = {
    fontSize,
    highContrast,
    screenReaderMode,
    language,
    announceToScreenReader
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
