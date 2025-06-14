
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { cleanupAuthState } from '@/utils/authCleanup';
import { getRedirectUrl } from '@/utils/emailVerification';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isGuest: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signInAsGuest: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    console.log('AuthProvider: Initializing authentication...');
    
    // Check for guest mode first
    const guestMode = localStorage.getItem('guest-mode');
    if (guestMode === 'true') {
      console.log('AuthProvider: Guest mode detected');
      setIsGuest(true);
      setLoading(false);
      return;
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('AuthProvider: Auth state changed:', event, session?.user?.email || 'No user');
        
        setSession(session);
        setUser(session?.user ?? null);
        setIsGuest(false);
        setLoading(false);

        if (event === 'SIGNED_IN' && session?.user) {
          console.log('AuthProvider: User signed in successfully');
          localStorage.removeItem('guest-mode');
          
          // Only redirect if we're on the auth page
          if (window.location.pathname === '/auth') {
            setTimeout(() => {
              window.location.href = '/';
            }, 500);
          }
        }
        
        if (event === 'TOKEN_REFRESHED') {
          console.log('AuthProvider: Token refreshed successfully');
        }

        if (event === 'SIGNED_OUT') {
          console.log('AuthProvider: User signed out');
        }
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      try {
        console.log('AuthProvider: Checking for existing session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthProvider: Session check error:', error);
        }
        
        console.log('AuthProvider: Session check result:', session?.user?.email || 'No session');
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('AuthProvider: Session initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      console.log('AuthProvider: Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('AuthProvider: Starting sign in for:', email);
      
      // Clean up existing state
      cleanupAuthState();
      
      // Sign out any existing session
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.log('AuthProvider: Sign out before sign in failed (expected)');
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      
      console.log('AuthProvider: Sign in result:', { 
        user: data.user?.email, 
        error: error?.message 
      });
      
      if (error) {
        return { error };
      }
      
      if (data.user && !data.user.email_confirmed_at) {
        return { 
          error: { 
            message: 'Please verify your email address before signing in. Check your email for a verification link.' 
          } 
        };
      }
      
      return { error: null };
    } catch (error) {
      console.error('AuthProvider: Sign in error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      setLoading(true);
      console.log('AuthProvider: Starting sign up for:', email);
      
      // Clean up existing state
      cleanupAuthState();
      
      const redirectUrl = getRedirectUrl();
      console.log('AuthProvider: Using redirect URL:', redirectUrl);
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName || '',
            last_name: lastName || '',
          }
        }
      });
      
      console.log('AuthProvider: Sign up result:', { 
        user: data.user?.email, 
        needsConfirmation: !data.user?.email_confirmed_at,
        error: error?.message 
      });
      
      if (error) {
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      console.error('AuthProvider: Sign up error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signInAsGuest = async () => {
    try {
      setLoading(true);
      console.log('AuthProvider: Signing in as guest');
      
      cleanupAuthState();
      localStorage.setItem('guest-mode', 'true');
      setIsGuest(true);
      setUser(null);
      setSession(null);
      return { error: null };
    } catch (error) {
      console.error('AuthProvider: Guest sign in error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log('AuthProvider: Starting sign out');
      
      cleanupAuthState();
      
      if (isGuest) {
        setIsGuest(false);
      } else {
        const { error } = await supabase.auth.signOut({ scope: 'global' });
        if (error) {
          console.error('AuthProvider: Sign out error:', error);
        }
      }
      
      setUser(null);
      setSession(null);
      
      setTimeout(() => {
        window.location.href = '/auth';
      }, 100);
    } catch (error) {
      console.error('AuthProvider: Sign out error:', error);
    }
  };

  const value = {
    user,
    session,
    loading,
    isGuest,
    signIn,
    signUp,
    signInAsGuest,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
