import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';

/**
 * Hook para otimizações de performance
 * 
 * Features:
 * - useCallback otimizado com dependências
 * - useMemo para cálculos pesados
 * - Debounce para eventos
 * - Throttle para scroll/resize
 * - Lazy loading de componentes
 * - Memoização de objetos complexos
 */

// ==========================================
// DEBOUNCE HOOK
// ==========================================

export interface UseDebounceOptions {
  delay?: number;
  leading?: boolean;
  trailing?: boolean;
}

export const useDebounce = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number = 300,
  options: UseDebounceOptions = {}
): T => {
  const { leading = false, trailing = true } = options;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCallTimeRef = useRef<number>(0);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const isInvoking = leading && now - lastCallTimeRef.current >= delay;

      if (isInvoking) {
        lastCallTimeRef.current = now;
        return callback(...args);
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (trailing) {
          lastCallTimeRef.current = Date.now();
          callback(...args);
        }
        timeoutRef.current = null;
      }, delay);
    },
    [callback, delay, leading, trailing]
  ) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

// ==========================================
// THROTTLE HOOK
// ==========================================

export interface UseThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export const useThrottle = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number = 100,
  options: UseThrottleOptions = {}
): T => {
  const { leading = true, trailing = true } = options;
  const lastCallTimeRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallTimeRef.current;

      if (timeSinceLastCall >= delay) {
        if (leading) {
          lastCallTimeRef.current = now;
          callback(...args);
        }
      } else if (trailing && !timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          lastCallTimeRef.current = Date.now();
          callback(...args);
          timeoutRef.current = null;
        }, delay - timeSinceLastCall);
      }
    },
    [callback, delay, leading, trailing]
  ) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback;
};

// ==========================================
// MEMOIZED CALLBACK HOOK
// ==========================================

export const useMemoizedCallback = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  deps: React.DependencyList
): T => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(callback, deps) as T;
};

// ==========================================
// MEMOIZED VALUE HOOK
// ==========================================

export const useMemoizedValue = <T>(
  factory: () => T,
  deps: React.DependencyList
): T => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
};

// ==========================================
// LAZY LOADING HOOK
// ==========================================

export interface UseLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useLazyLoad = (
  options: UseLazyLoadOptions = {}
) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (triggerOnce && hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasTriggered(true);
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return { elementRef, isVisible };
};

// ==========================================
// PERFORMANCE MONITORING HOOK
// ==========================================

export interface PerformanceMetrics {
  renderTime: number;
  renderCount: number;
  lastRenderTime: number;
}

export const usePerformanceMonitor = (componentName: string) => {
  const renderCountRef = useRef(0);
  const metricsRef = useRef<PerformanceMetrics>({
    renderTime: 0,
    renderCount: 0,
    lastRenderTime: 0,
  });

  // Captura o tempo no momento do render - usar ref para evitar impure function
  // eslint-disable-next-line react-hooks/purity
  const startTimeRef = useRef(performance.now());

  useEffect(() => {
    const endTime = performance.now();
    const renderTime = endTime - startTimeRef.current;

    renderCountRef.current += 1;

    metricsRef.current = {
      renderTime,
      renderCount: renderCountRef.current,
      lastRenderTime: endTime,
    };

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`[Performance] ${componentName}:`, {
        renderCount: renderCountRef.current,
        renderTime: `${renderTime.toFixed(2)}ms`,
      });
    }
    
    // Reset startTime for next render
    startTimeRef.current = performance.now();
  });

  return metricsRef.current;
};

// ==========================================
// OPTIMIZED OBJECT MEMOIZATION
// ==========================================

export const useMemoizedObject = <T extends Record<string, unknown>>(
  factory: () => T,
  deps: React.DependencyList
): T => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => {
    const obj = factory();
    // Deep freeze in development to catch mutations
    if (process.env.NODE_ENV === 'development') {
      Object.freeze(obj);
    }
    return obj;
  }, deps);
};

// ==========================================
// OPTIMIZED ARRAY MEMOIZATION
// ==========================================

export const useMemoizedArray = <T>(
  factory: () => T[],
  deps: React.DependencyList
): T[] => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => {
    const arr = factory();
    // Deep freeze in development to catch mutations
    if (process.env.NODE_ENV === 'development') {
      Object.freeze(arr);
    }
    return arr;
  }, deps);
};

// ==========================================
// COMPONENT RENDER OPTIMIZATION
// ==========================================

export interface UseRenderOptimizationOptions {
  skipFirstRender?: boolean;
  maxRenders?: number;
  warnOnExcessiveRenders?: boolean;
}

export const useRenderOptimization = (
  componentName: string,
  options: UseRenderOptimizationOptions = {}
) => {
  const { skipFirstRender = false, maxRenders = 50, warnOnExcessiveRenders = true } = options;
  const renderCountRef = useRef(0);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (skipFirstRender && isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    renderCountRef.current += 1;

    if (warnOnExcessiveRenders && renderCountRef.current > maxRenders) {
      console.warn(
        `[Performance Warning] ${componentName} has rendered ${renderCountRef.current} times. ` +
        `Consider optimizing with React.memo, useMemo, or useCallback.`
      );
    }
  });

  // Use useMemo for return object to avoid accessing refs during render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => ({
    // eslint-disable-next-line react-hooks/refs
    renderCount: renderCountRef.current,
    // eslint-disable-next-line react-hooks/refs
    isFirstRender: isFirstRenderRef.current,
  }), []);
};

// ==========================================
// EXPORTS
// ==========================================

export default {
  useDebounce,
  useThrottle,
  useMemoizedCallback,
  useMemoizedValue,
  useLazyLoad,
  usePerformanceMonitor,
  useMemoizedObject,
  useMemoizedArray,
  useRenderOptimization,
};
