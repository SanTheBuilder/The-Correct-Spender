
import { useEffect } from 'react';

export const useAccessibilityStyles = (fontSize: string, highContrast: boolean) => {
  useEffect(() => {
    // Apply CSS variables for font size
    const fontSizeMap = {
      'small': '14px',
      'medium': '16px',
      'large': '18px',
      'extra-large': '20px'
    };
    
    const fontSizeValue = fontSizeMap[fontSize as keyof typeof fontSizeMap] || '16px';
    document.documentElement.style.setProperty('--font-size', fontSizeValue);
    
    // Apply high contrast mode
    document.documentElement.classList.toggle('high-contrast', highContrast);
  }, [fontSize, highContrast]);
};
