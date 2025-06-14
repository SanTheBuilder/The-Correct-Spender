
import { supabase } from '@/integrations/supabase/client';
import { logger } from './logger';

export const getRedirectUrl = () => {
  // Always use the current origin for redirects
  const origin = window.location.origin;
  return `${origin}/auth`;
};

export const handleEmailVerification = async () => {
  logger.debug('Starting email verification process');
  
  // Check for verification tokens in URL
  const urlParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  
  // Check for access token and type
  const accessToken = hashParams.get('access_token') || urlParams.get('access_token');
  const refreshToken = hashParams.get('refresh_token') || urlParams.get('refresh_token');
  const type = hashParams.get('type') || urlParams.get('type');
  const error = hashParams.get('error') || urlParams.get('error');
  const errorDescription = hashParams.get('error_description') || urlParams.get('error_description');
  
  logger.debug('Verification params', { 
    hasAccessToken: !!accessToken, 
    hasRefreshToken: !!refreshToken, 
    type, 
    error
  });
  
  // Handle errors first
  if (error) {
    logger.error('Email verification error', { error, errorDescription });
    return { 
      success: false, 
      error: errorDescription || 'Email verification failed' 
    };
  }
  
  // Handle successful verification
  if (type === 'signup' && accessToken && refreshToken) {
    try {
      logger.debug('Setting session with verification tokens');
      
      const { data, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      
      if (error) {
        logger.error('Error setting session', error);
        return { 
          success: false, 
          error: 'Failed to complete email verification' 
        };
      }
      
      logger.info('Email verification successful', { email: data.user?.email });
      return { 
        success: true, 
        user: data.user 
      };
    } catch (error) {
      logger.error('Session setting error', error);
      return { 
        success: false, 
        error: 'Verification process failed' 
      };
    }
  }
  
  return { success: false };
};

export const cleanUpVerificationUrl = () => {
  // Clean up the URL after processing verification
  if (window.location.hash || window.location.search.includes('access_token')) {
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  }
};
