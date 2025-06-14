
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogMessage {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
}

class SecureLogger {
  private isDevelopment = import.meta.env.DEV;

  private formatMessage(level: LogLevel, message: string, data?: any): LogMessage {
    return {
      level,
      message,
      data: this.sanitizeData(data),
      timestamp: new Date().toISOString()
    };
  }

  private sanitizeData(data: any): any {
    if (!data) return data;
    
    // Remove sensitive information from data before logging
    const sensitiveKeys = ['password', 'token', 'key', 'secret', 'auth', 'email'];
    
    if (typeof data === 'object') {
      const sanitized = { ...data };
      sensitiveKeys.forEach(key => {
        if (key in sanitized) {
          sanitized[key] = '[REDACTED]';
        }
      });
      return sanitized;
    }
    
    return data;
  }

  debug(message: string, data?: any): void {
    if (this.isDevelopment) {
      const logMessage = this.formatMessage('debug', message, data);
      console.log(`[DEBUG] ${logMessage.message}`, logMessage.data);
    }
  }

  info(message: string, data?: any): void {
    if (this.isDevelopment) {
      const logMessage = this.formatMessage('info', message, data);
      console.info(`[INFO] ${logMessage.message}`, logMessage.data);
    }
  }

  warn(message: string, data?: any): void {
    if (this.isDevelopment) {
      const logMessage = this.formatMessage('warn', message, data);
      console.warn(`[WARN] ${logMessage.message}`, logMessage.data);
    }
  }

  error(message: string, error?: any): void {
    if (this.isDevelopment) {
      const logMessage = this.formatMessage('error', message, error);
      console.error(`[ERROR] ${logMessage.message}`, logMessage.data);
    }
  }
}

export const logger = new SecureLogger();
