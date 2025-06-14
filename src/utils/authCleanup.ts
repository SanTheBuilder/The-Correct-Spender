
export const cleanupAuthState = () => {
  console.log('Cleaning up auth state thoroughly...');
  
  try {
    // Remove guest mode
    localStorage.removeItem('guest-mode');
    
    // Get all localStorage keys
    const localStorageKeys = Object.keys(localStorage);
    
    // Remove all Supabase auth related keys
    localStorageKeys.forEach((key) => {
      if (key.startsWith('supabase.auth.') || 
          key.includes('sb-') || 
          key.startsWith('supabase-auth-token') ||
          key.includes('auth-token')) {
        console.log('Removing localStorage key:', key);
        localStorage.removeItem(key);
      }
    });
    
    // Clean sessionStorage if available
    if (typeof sessionStorage !== 'undefined') {
      const sessionStorageKeys = Object.keys(sessionStorage);
      sessionStorageKeys.forEach((key) => {
        if (key.startsWith('supabase.auth.') || 
            key.includes('sb-') || 
            key.startsWith('supabase-auth-token') ||
            key.includes('auth-token')) {
          console.log('Removing sessionStorage key:', key);
          sessionStorage.removeItem(key);
        }
      });
    }
    
    console.log('Auth state cleanup completed');
  } catch (error) {
    console.error('Error during auth cleanup:', error);
  }
};
