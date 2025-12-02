import { useCallback, useState } from 'react';

export interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  errorId: string;
  timestamp: string;
  userAgent: string;
  url: string;
}

export interface UseErrorHandlerOptions {
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  logToConsole?: boolean;
  logToService?: boolean;
}

/**
 * Hook para gerenciar erros em componentes funcionais
 * 
 * Features:
 * - Captura e trata erros de forma consistente
 * - Logging automático de erros
 * - Integração com serviços de monitoramento
 * - Estado de erro local
 */
export const useErrorHandler = (options: UseErrorHandlerOptions = {}) => {
  const { onError, logToConsole = true, logToService = true } = options;
  const [error, setError] = useState<Error | null>(null);
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | null>(null);

  const handleError = useCallback((error: Error, additionalInfo?: Partial<ErrorInfo>) => {
    const errorId = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const fullErrorInfo: ErrorInfo = {
      message: error.message,
      stack: error.stack,
      errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      ...additionalInfo,
    };

    // Update state
    setError(error);
    setErrorInfo(fullErrorInfo);

    // Log to console
    if (logToConsole) {
      console.error('Error caught by useErrorHandler:', error, fullErrorInfo);
    }

    // Log to service
    if (logToService) {
      // In a real application, you would send this to an error reporting service
      console.log('Error logged to service:', fullErrorInfo);
    }

    // Call custom error handler
    if (onError) {
      onError(error, fullErrorInfo);
    }
  }, [onError, logToConsole, logToService]);

  const clearError = useCallback(() => {
    setError(null);
    setErrorInfo(null);
  }, []);

  const reset = useCallback(() => {
    clearError();
  }, [clearError]);

  return {
    error,
    errorInfo,
    hasError: !!error,
    handleError,
    clearError,
    reset,
  };
};

export default useErrorHandler;
