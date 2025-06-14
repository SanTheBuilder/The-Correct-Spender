
import { supabase } from '@/integrations/supabase/client';

export const getRedirectUrl = () => {
  // Always use the current origin for redirects
  const origin = window.location.origin;
  return `${origin}/auth`;
};

export const handleEmailVerification = async () => {
  console.log('Starting email verification process...');
  
  // Check for verification tokens in URL
  const urlParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  
  // Check for access token and type
  const accessToken = hashParams.get('access_token') || urlParams.get('access_token');
  const refreshToken = hashParams.get('refresh_token') || urlParams.get('refresh_token');
  const type = hashParams.get('type') || urlParams.get('type');
  const error = hashParams.get('error') || urlParams.get('error');
  const errorDescription = hashParams.get('error_description') || urlParams.get('error_description');
  
  console.log('Verification params:', { 
    hasAccessToken: !!accessToken, 
    hasRefreshToken: !!refreshToken, 
    type, 
    error,
    fullHash: window.location.hash,
    fullSearch: window.location.search
  });
  
  // Handle errors first
  if (error) {
    console.error('Email verification error:', error, errorDescription);
    return { 
      success: false, 
      error: errorDescription || 'Email verification failed' 
    };
  }
  
  // Handle successful verification
  if (type === 'signup' && accessToken && refreshToken) {
    try {
      console.log('Setting session with verification tokens...');
      
      const { data, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      
      if (error) {
        console.error('Error setting session:', error);
        return { 
          success: false, 
          error: 'Failed to complete email verification' 
        };
      }
      
      console.log('Email verification successful:', data.user?.email);
      return { 
        success: true, 
        user: data.user 
      };
    } catch (error) {
      console.error('Session setting error:', error);
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
