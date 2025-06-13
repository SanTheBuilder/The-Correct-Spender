
import { useEffect } from 'react';
import { AccessibilityPreferences } from '@/types/accessibility';

export const useAccessibilityStorage = (
  preferences: AccessibilityPreferences,
  setFontSize: (size: string) => void,
  setHighContrast: (enabled: boolean) => void,
  setScreenReaderMode: (enabled: boolean) => void,
  setLanguage: (lang: string) => void,
  setSimpleMode: (enabled: boolean) => void
) => {
  // Load saved preferences on mount
  useEffect(() => {
    const savedPrefs = localStorage.getItem('accessibility-preferences');
    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      setFontSize(prefs.fontSize || 'medium');
      setHighContrast(prefs.highContrast || false);
      setScreenReaderMode(prefs.screenReaderMode || false);
      setLanguage(prefs.language || 'en');
      setSimpleMode(prefs.simpleMode || false);
    }
  }, [setFontSize, setHighContrast, setScreenReaderMode, setLanguage, setSimpleMode]);

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem('accessibility-preferences', JSON.stringify(preferences));
  }, [preferences]);
};
