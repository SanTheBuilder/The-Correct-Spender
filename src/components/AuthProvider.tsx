
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { cleanupAuthState } from '@/utils/authCleanup';

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
    // Check for guest mode first
    const guestMode = localStorage.getItem('guest-mode');
    if (guestMode === 'true') {
      setIsGuest(true);
      setLoading(false);
      return;
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setIsGuest(false);
        setLoading(false);

        // Handle different auth events
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('User signed in successfully');
          // Clear guest mode if user signs in
          localStorage.removeItem('guest-mode');
        }
        
        if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed successfully');
        }

        if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          setUser(null);
          setSession(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
      }
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Attempting to sign in with email:', email);
      
      // Clean up any existing auth state first
      cleanupAuthState();
      
      // Attempt global sign out first
      try {
        await supabase.auth.signOut({ scope: 'global' });
        console.log('Global sign out completed');
      } catch (signOutError) {
        console.log('Global sign out failed, continuing...', signOutError);
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      
      console.log('Sign in response:', { data, error });
      
      if (error) {
        console.error('Sign in error:', error);
        return { error };
      }
      
      if (data.user && !data.user.email_confirmed_at) {
        return { 
          error: { 
            message: 'Please check your email and click the verification link before signing in.' 
          } 
        };
      }
      
      // Force page reload on successful sign in
      if (data.user && data.user.email_confirmed_at) {
        setTimeout(() => {
          window.location.href = '/';
        }, 100);
      }
      
      return { error: null };
    } catch (error) {
      console.error('Sign in catch error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      setLoading(true);
      console.log('Attempting to sign up with email:', email);
      
      // Clean up any existing auth state first
      cleanupAuthState();
      
      // Use the current application URL for redirect - make sure it's the auth page
      const currentUrl = window.location.origin;
      const redirectUrl = `${currentUrl}/auth?verified=true`;
      
      console.log('Using redirect URL:', redirectUrl);
      
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
      
      console.log('Sign up response:', { data, error });
      
      if (error) {
        console.error('Sign up error:', error);
        return { error };
      }
      
      // Check if user needs email confirmation
      if (data.user && !data.user.email_confirmed_at) {
        console.log('Email confirmation required for user:', data.user.email);
      }
      
      return { error: null };
    } catch (error) {
      console.error('Sign up catch error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signInAsGuest = async () => {
    try {
      setLoading(true);
      console.log('Signing in as guest');
      
      // Clean up any existing auth state first
      cleanupAuthState();
      
      localStorage.setItem('guest-mode', 'true');
      setIsGuest(true);
      setUser(null);
      setSession(null);
      return { error: null };
    } catch (error) {
      console.error('Guest sign in error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out...');
      
      // Clean up auth state first
      cleanupAuthState();
      
      if (isGuest) {
        setIsGuest(false);
      } else {
        const { error } = await supabase.auth.signOut({ scope: 'global' });
        if (error) {
          console.error('Sign out error:', error);
        }
      }
      
      setUser(null);
      setSession(null);
      
      // Force page reload to ensure clean state
      setTimeout(() => {
        window.location.href = '/auth';
      }, 100);
    } catch (error) {
      console.error('Sign out catch error:', error);
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
