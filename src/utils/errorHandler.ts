
import { logger } from './logger';

export interface UserFriendlyError {
  message: string;
  code?: string;
}

class ErrorHandler {
  private getErrorCode(error: any): string {
    if (error?.code) return error.code;
    if (error?.message?.includes('auth')) return 'AUTH_ERROR';
    if (error?.message?.includes('network')) return 'NETWORK_ERROR';
    if (error?.message?.includes('permission')) return 'PERMISSION_ERROR';
    return 'UNKNOWN_ERROR';
  }

  private getUserFriendlyMessage(error: any): string {
    const code = this.getErrorCode(error);
    
    switch (code) {
      case 'AUTH_ERROR':
      case 'invalid_credentials':
        return 'Invalid email or password. Please try again.';
      case 'email_not_confirmed':
        return 'Please check your email and click the confirmation link.';
      case 'weak_password':
        return 'Password must be at least 6 characters long.';
      case 'email_address_invalid':
        return 'Please enter a valid email address.';
      case 'signup_disabled':
        return 'Account registration is temporarily unavailable.';
      case 'NETWORK_ERROR':
        return 'Network connection error. Please check your internet connection.';
      case 'PERMISSION_ERROR':
        return 'You do not have permission to perform this action.';
      case 'too_many_requests':
        return 'Too many requests. Please wait a moment before trying again.';
      default:
        return 'Something went wrong. Please try again later.';
    }
  }

  handleError(error: any, context?: string): UserFriendlyError {
    // Log the full error for debugging (only in development)
    logger.error(`Error in ${context || 'unknown context'}`, error);

    return {
      message: this.getUserFriendlyMessage(error),
      code: this.getErrorCode(error)
    };
  }

  handleAuthError(error: any): UserFriendlyError {
    return this.handleError(error, 'authentication');
  }

  handleDatabaseError(error: any): UserFriendlyError {
    return this.handleError(error, 'database operation');
  }

  handleNetworkError(error: any): UserFriendlyError {
    return this.handleError(error, 'network request');
  }
}

export const errorHandler = new ErrorHandler();
