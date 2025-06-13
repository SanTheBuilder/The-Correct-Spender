
import React, { createContext, useContext, useState } from 'react';
import { AccessibilityContextType, AccessibilityPreferences } from '@/types/accessibility';
import { translations } from '@/data/translations';
import { useAccessibilityStorage } from '@/hooks/useAccessibilityStorage';
import { useAccessibilityStyles } from '@/hooks/useAccessibilityStyles';

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [screenReaderMode, setScreenReaderMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [simpleMode, setSimpleMode] = useState(false);

  const preferences: AccessibilityPreferences = {
    fontSize,
    highContrast,
    screenReaderMode,
    language,
    simpleMode
  };

  // Use custom hooks for storage and styles
  useAccessibilityStorage(
    preferences,
    setFontSize,
    setHighContrast,
    setScreenReaderMode,
    setLanguage,
    setSimpleMode
  );

  useAccessibilityStyles(fontSize, highContrast);

  const t = (key: string): string => {
    const currentTranslations = translations[language as keyof typeof translations] || translations.en;
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  const value: AccessibilityContextType = {
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    screenReaderMode,
    setScreenReaderMode,
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
