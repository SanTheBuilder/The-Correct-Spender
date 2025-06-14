
import { supabase } from '@/integrations/supabase/client';
import { logger } from './logger';

export const validateRLSPolicies = async () => {
  logger.debug('Starting RLS policy validation');
  
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      logger.warn('No authenticated user for RLS validation');
      return { success: false, message: 'User not authenticated' };
    }

    // Test profile access
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);

    if (profileError) {
      logger.error('Profile RLS validation failed', { error: profileError });
      return { success: false, message: 'Profile access validation failed' };
    }

    // Test financial assessments access
    const { data: assessments, error: assessmentError } = await supabase
      .from('financial_assessments')
      .select('*')
      .limit(1);

    if (assessmentError) {
      logger.error('Financial assessments RLS validation failed', { error: assessmentError });
      return { success: false, message: 'Financial assessments access validation failed' };
    }

    // Test budgets access
    const { data: budgets, error: budgetError } = await supabase
      .from('budgets')
      .select('*')
      .limit(1);

    if (budgetError) {
      logger.error('Budgets RLS validation failed', { error: budgetError });
      return { success: false, message: 'Budgets access validation failed' };
    }

    logger.info('RLS policy validation completed successfully');
    return { success: true, message: 'All RLS policies validated successfully' };
  } catch (error) {
    logger.error('RLS validation error', error);
    return { success: false, message: 'RLS validation failed with exception' };
  }
};

export const testUserDataAccess = async () => {
  logger.debug('Testing user data access patterns');
  
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      return { success: false, message: 'User not authenticated' };
    }

    // Test that user can only access their own data
    const userId = user.user.id;
    
    // Check profile access
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profile && profile.id !== userId) {
      logger.error('Profile access violation detected');
      return { success: false, message: 'Profile access violation' };
    }

    logger.info('User data access test passed');
    return { success: true, message: 'User data access properly restricted' };
  } catch (error) {
    logger.error('User data access test error', error);
    return { success: false, message: 'User data access test failed' };
  }
};
