/**
 * GSDebug - Sistema de Debug Centralizado
 * 
 * Utilitários para debug condicional baseado em props
 * Permite ligar/desligar debug facilmente em qualquer componente
 */

export interface DebugConfig {
  enabled?: boolean;
  prefix?: string;
  level?: 'log' | 'warn' | 'error' | 'info';
  showTimestamp?: boolean;
  showComponentName?: boolean;
}

/**
 * Opções avançadas de debug utilizadas pelos componentes GS.
 * Mantém compatibilidade com DebugConfig e adiciona controlos específicos.
 */
export interface DebugOptions extends DebugConfig {
  logProps?: boolean;
  logState?: boolean;
  logRender?: boolean;
  logPerformance?: boolean;
}

export interface DebugContext {
  componentName: string;
  debug: boolean;
  config?: DebugConfig;
}

/**
 * Chave de armazenamento para o auto-monitoring avançado
 * (loops infinitos, performance, etc.)
 */
const DEBUG_MONITORING_STORAGE_KEY = 'gs-debug-monitoring-enabled';

/**
 * Hook para debug condicional
 * @param componentName - Nome do componente
 * @param debug - Prop debug do componente (boolean ou config)
 * @param config - Configuração opcional de debug (mantida para retrocompatibilidade)
 */
export const useDebug = (
  componentName: string, 
  debug: boolean | DebugConfig = false, 
  config?: DebugConfig
): {
  log: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  group: (label: string, fn: () => void) => void;
  time: (label: string) => void;
  timeEnd: (label: string) => void;
} => {
  const isProd = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production';
  const inputConfig: DebugConfig = typeof debug === 'object' ? debug : { enabled: Boolean(debug) };
  const defaultConfig: DebugConfig = {
    enabled: !isProd && Boolean(inputConfig.enabled),
    prefix: `[${componentName}]`,
    level: 'log',
    showTimestamp: true,
    showComponentName: true,
    ...config,
    ...inputConfig
  };

  const formatMessage = (level: string, ...args: unknown[]): unknown[] => {
    const parts: unknown[] = [];
    if (defaultConfig.showTimestamp) {
      parts.push(`[${new Date().toLocaleTimeString()}]`);
    }
    if (defaultConfig.showComponentName && defaultConfig.prefix) {
      parts.push(defaultConfig.prefix);
    }
    parts.push(`[${level.toUpperCase()}]`);
    parts.push(...args);
    return parts;
  };

  const log = (...args: unknown[]) => {
    if (defaultConfig.enabled) {
      console.log(...formatMessage('log', ...args));
    }
  };

  const warn = (...args: unknown[]) => {
    if (defaultConfig.enabled) {
      console.warn(...formatMessage('warn', ...args));
    }
  };

  const error = (...args: unknown[]) => {
    if (defaultConfig.enabled) {
      console.error(...formatMessage('error', ...args));
    }
  };

  const info = (...args: unknown[]) => {
    if (defaultConfig.enabled) {
      console.info(...formatMessage('info', ...args));
    }
  };

  const group = (label: string, fn: () => void) => {
    if (defaultConfig.enabled) {
      console.group(...formatMessage('group', label));
      fn();
      console.groupEnd();
    }
  };

  const time = (label: string) => {
    if (defaultConfig.enabled) {
      const formatted = formatMessage('time', label);
      // console.time só aceita string, então pegamos o primeiro elemento formatado
      const timeLabel = formatted.length > 0 ? String(formatted[0] || label) : label;
      console.time(timeLabel);
    }
  };

  const timeEnd = (label: string) => {
    if (defaultConfig.enabled) {
      const formatted = formatMessage('time', label);
      // console.timeEnd só aceita string, então pegamos o primeiro elemento formatado
      const timeLabel = formatted.length > 0 ? String(formatted[0] || label) : label;
      console.timeEnd(timeLabel);
    }
  };

  return { log, warn, error, info, group, time, timeEnd };
};

/**
 * Função utilitária para debug de props
 * @param componentName - Nome do componente
 * @param debug - Prop debug
 * @param props - Props do componente
 * @param label - Label opcional
 */
export const debugProps = (
  componentName: string,
  debug: boolean,
  props: Record<string, unknown>,
  label: string = 'Props'
) => {
  if (debug) {
    console.group(`[${componentName}] ${label}`);
    Object.entries(props).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
    console.groupEnd();
  }
};

/**
 * Função utilitária para debug de estado
 * @param componentName - Nome do componente
 * @param debug - Prop debug
 * @param state - Estado do componente
 * @param label - Label opcional
 */
export const debugState = (
  componentName: string,
  debug: boolean,
  state: Record<string, unknown>,
  label: string = 'State'
) => {
  if (debug) {
    console.group(`[${componentName}] ${label}`);
    Object.entries(state).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
    console.groupEnd();
  }
};

/**
 * Função utilitária para debug de performance
 * @param componentName - Nome do componente
 * @param debug - Prop debug
 * @param operation - Nome da operação
 * @param fn - Função a executar
 */
export const debugPerformance = async <T>(
  componentName: string,
  debug: boolean,
  operation: string,
  fn: () => T | Promise<T>
): Promise<T> => {
  if (debug) {
    console.time(`[${componentName}] ${operation}`);
  }
  const result = await fn();
  if (debug) {
    console.timeEnd(`[${componentName}] ${operation}`);
  }
  return result;
};

/**
 * Função utilitária para debug de render
 * @param componentName - Nome do componente
 * @param debug - Prop debug
 * @param reason - Razão do render
 */
export const debugRender = (
  componentName: string,
  debug: boolean,
  reason: string = 'Render'
) => {
  if (debug) {
    console.log(`[${componentName}] ${reason} - ${new Date().toLocaleTimeString()}`);
  }
};

export default {
  useDebug,
  debugProps,
  debugState,
  debugPerformance,
  debugRender
};

/**
 * Helpers públicos para gerir o estado do auto-monitoring avançado
 * (utilizado pelo toggle no menu de utilizador).
 */
export const getDebugMonitoringEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    const value = window.localStorage.getItem(DEBUG_MONITORING_STORAGE_KEY);
    return value === 'true';
  } catch {
    return false;
  }
};

export const setDebugMonitoringEnabledFlag = (enabled: boolean): void => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(DEBUG_MONITORING_STORAGE_KEY, enabled ? 'true' : 'false');
  } catch {
    // Ignorar falhas de localStorage em modo debug
  }
};

/**
 * Debug utilities for identifying infinite loops and performance issues
 */
export const infiniteLoopDebugger = {
  /**
   * Monitor component re-renders
   */
  startRenderMonitoring: (componentName: string) => {
    let renderCount = 0;
    const originalRender = console.log;

    // Monkey patch console.log to track renders
    console.log = (...args: unknown[]) => {
      const firstArg = args[0];
      if (typeof firstArg === 'string' && firstArg.includes(`${componentName} re-rendered`)) {
        renderCount++;
        if (renderCount > 10) {
          console.warn(`🚨 ${componentName} has re-rendered ${renderCount} times!`);
        }
      }
      originalRender(...args);
    };

    return () => {
      console.log = originalRender;
    };
  },

  /**
   * Monitor store changes
   */
  monitorStoreChanges: () => {
    const originalWarn = console.warn;
    let changeCount = 0;

    console.warn = (...args: unknown[]) => {
      const firstArg = args[0];
      if (typeof firstArg === 'string' && firstArg.includes('StoreMonitor')) {
        changeCount++;
        if (changeCount > 5) {
          console.error(`🚨 Too many store changes detected (${changeCount})!`);
        }
      }
      originalWarn(...args);
    };

    return () => {
      console.warn = originalWarn;
    };
  },

  /**
   * Check for infinite loops in useEffect
   */
  detectInfiniteLoops: () => {
    const originalError = console.error;
    const loopPatterns = [
      'Maximum update depth exceeded',
      'Cannot update during an existing state transition',
      'Too many re-renders'
    ];

    console.error = (...args: unknown[]) => {
      const message = args.map(String).join(' ');
      if (loopPatterns.some(pattern => message.includes(pattern))) {
        console.error('🚨 Infinite loop detected! Check useEffect dependencies.');
        // eslint-disable-next-line no-debugger
        debugger; // Pause execution
      }
      originalError(...args);
    };

    return () => {
      console.error = originalError;
    };
  },

  /**
   * Performance monitoring
   */
  monitorPerformance: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 100) {
            console.warn(`🐌 Slow operation detected: ${entry.name} took ${entry.duration}ms`);
          }
        }
      });

      observer.observe({ entryTypes: ['measure', 'navigation'] });

      return () => {
        observer.disconnect();
      };
    }
  },

  /**
   * Start all debug monitoring
   */
  startDebugMonitoring: () => {
    const cleanupFunctions = [
      infiniteLoopDebugger.monitorStoreChanges(),
      infiniteLoopDebugger.detectInfiniteLoops(),
      infiniteLoopDebugger.monitorPerformance()
    ].filter(Boolean);

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup?.());
      console.log('🔧 Debug monitoring stopped');
    };
  }
};

/**
 * Controladores de ciclo de vida do auto-monitoring avançado
 * (permitem ligar/desligar em runtime a partir da UI).
 */
let debugMonitoringCleanup: (() => void) | null = null;

export const startDebugMonitoring = (): void => {
  // Apenas em desenvolvimento
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;

  // Garantir que não há múltiplas instâncias ativas
  if (debugMonitoringCleanup) {
    debugMonitoringCleanup();
    debugMonitoringCleanup = null;
  }

  const cleanup = infiniteLoopDebugger.startDebugMonitoring();
  if (typeof cleanup === 'function') {
    debugMonitoringCleanup = cleanup;
  }
};

export const stopDebugMonitoring = (): void => {
  if (debugMonitoringCleanup) {
    debugMonitoringCleanup();
    debugMonitoringCleanup = null;
  }
};

// Auto-start debug monitoring em desenvolvimento apenas quando flag estiver ativa
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  if (getDebugMonitoringEnabled()) {
    // Delay para evitar interferir com o load inicial
    setTimeout(() => {
      startDebugMonitoring();
    }, 1000);
  }
}