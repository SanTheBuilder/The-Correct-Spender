
export interface AccessibilityContextType {
  fontSize: string;
  setFontSize: (size: string) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  screenReaderMode: boolean;
  setScreenReaderMode: (enabled: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;
  simpleMode: boolean;
  setSimpleMode: (enabled: boolean) => void;
  t: (key: string) => string;
}

export interface AccessibilityPreferences {
  fontSize: string;
  highContrast: boolean;
  screenReaderMode: boolean;
  language: string;
  simpleMode: boolean;
}

export interface Translation {
  [key: string]: string;
}

export interface Translations {
  [languageCode: string]: Translation;
}
