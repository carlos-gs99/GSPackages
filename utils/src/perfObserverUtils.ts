const PERF_MONITORING_STORAGE_KEY = 'gs-perf-monitoring-enabled';

let lcpObserver: PerformanceObserver | null = null;

export const getPerfMonitoringEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    const value = window.localStorage.getItem(PERF_MONITORING_STORAGE_KEY);
    return value === 'true';
  } catch {
    return false;
  }
};

export const setPerfMonitoringEnabledFlag = (enabled: boolean): void => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(PERF_MONITORING_STORAGE_KEY, enabled ? 'true' : 'false');
  } catch {
    // Ignorar falhas de localStorage em modo debug
  }
};

export const startPerfMonitoring = (): void => {
  if (typeof window === 'undefined' || typeof performance === 'undefined') return;
  if (import.meta.env && import.meta.env.MODE !== 'development') return;

  // Se já estiver a correr, reiniciar
  if (lcpObserver) {
    lcpObserver.disconnect();
    lcpObserver = null;
  }

  try {
    const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navigationEntries.length > 0) {
      const nav = navigationEntries[0];
      if (nav) {
        // eslint-disable-next-line no-console
        console.log('[Perf] Navigation timing:', {
          type: nav.type,
          domContentLoaded: `${nav.domContentLoadedEventEnd.toFixed(2)}ms`,
          load: `${nav.loadEventEnd.toFixed(2)}ms`,
        });
      }
    }

    if ('PerformanceObserver' in window) {
      lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const last = entries[entries.length - 1] as any;
        if (!last) return;

        const lcpTime = (last.renderTime || last.loadTime || last.startTime) as number;
        const element = last.element as Element | null;
        // eslint-disable-next-line no-console
        console.log('[Perf] LCP candidate:', {
          time: `${lcpTime.toFixed(2)}ms`,
          size: last.size,
          tag: element?.tagName,
          id: element?.id,
          className: element?.className,
        });
      });

      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    }
  } catch {
    // Não falhar o arranque da app por causa de métricas
  }
};

export const stopPerfMonitoring = (): void => {
  if (lcpObserver) {
    lcpObserver.disconnect();
    lcpObserver = null;
  }
};


