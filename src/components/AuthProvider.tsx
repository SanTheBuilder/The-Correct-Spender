import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/utils/logger';
import { errorHandler } from '@/utils/errorHandler';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isGuest: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: any }>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ success: boolean; data?: any; error?: any }>;
  signOut: () => Promise<{ success: boolean; error?: any }>;
  continueAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          const userError = errorHandler.handleAuthError(error);
          toast({
            title: "Authentication Error",
            description: userError.message,
            variant: "destructive",
          });
        } else {
          setUser(session?.user ?? null);
          logger.debug('Initial session retrieved', { hasUser: !!session?.user });
        }
      } catch (error) {
        const userError = errorHandler.handleAuthError(error);
        toast({
          title: "Connection Error",
          description: userError.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      logger.debug('Auth state changed', { event, hasSession: !!session });
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const userError = errorHandler.handleAuthError(error);
        toast({
          title: "Sign In Failed",
          description: userError.message,
          variant: "destructive",
        });
        return { success: false, error: userError };
      }

      logger.info('User signed in successfully');
      toast({
        title: "Welcome back!",
        description: "You have been signed in successfully.",
      });

      return { success: true, data };
    } catch (error) {
      const userError = errorHandler.handleAuthError(error);
      toast({
        title: "Sign In Error",
        description: userError.message,
        variant: "destructive",
      });
      return { success: false, error: userError };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        const userError = errorHandler.handleAuthError(error);
        toast({
          title: "Sign Up Failed",
          description: userError.message,
          variant: "destructive",
        });
        return { success: false, error: userError };
      }

      logger.info('User signed up successfully');
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });

      return { success: true, data };
    } catch (error) {
      const userError = errorHandler.handleAuthError(error);
      toast({
        title: "Sign Up Error",
        description: userError.message,
        variant: "destructive",
      });
      return { success: false, error: userError };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        const userError = errorHandler.handleAuthError(error);
        toast({
          title: "Sign Out Failed",
          description: userError.message,
          variant: "destructive",
        });
        return { success: false, error: userError };
      }

      setIsGuest(false);
      logger.info('User signed out successfully');
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });

      return { success: true };
    } catch (error) {
      const userError = errorHandler.handleAuthError(error);
      toast({
        title: "Sign Out Error",
        description: userError.message,
        variant: "destructive",
      });
      return { success: false, error: userError };
    } finally {
      setLoading(false);
    }
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    logger.debug('User continued as guest');
    toast({
      title: "Guest Mode",
      description: "You're now using the app as a guest. Your data won't be saved.",
    });
  };

  const value: AuthContextType = {
    user,
    loading,
    isGuest,
    signIn,
    signUp,
    signOut,
    continueAsGuest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
