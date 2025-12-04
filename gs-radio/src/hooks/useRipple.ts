import { useCallback, useRef, useState } from 'react';

export interface RippleEffect {
  key: number;
  x: number;
  y: number;
  size: number;
}

export const useRipple = (enabled: boolean) => {
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const rippleCounter = useRef(0);
  const timeouts = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const clearRipple = useCallback((key: number) => {
    setRipples(prev => prev.filter(ripple => ripple.key !== key));
    const timer = timeouts.current[key];
    if (timer) {
      clearTimeout(timer);
      delete timeouts.current[key];
    }
  }, []);

  const createRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (!enabled) return;

    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const key = rippleCounter.current++;
    const ripple: RippleEffect = { key, x, y, size };

    setRipples(prev => [...prev, ripple]);
    timeouts.current[key] = setTimeout(() => clearRipple(key), 600);
  }, [enabled, clearRipple]);

  const resetRipples = useCallback(() => {
    Object.values(timeouts.current).forEach(clearTimeout);
    timeouts.current = {};
    setRipples([]);
  }, []);

  return { ripples, createRipple, resetRipples };
};

