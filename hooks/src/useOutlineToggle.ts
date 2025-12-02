import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'gs:outline-enabled';

export default function useOutlineToggle(
  initialState: boolean = true
): [boolean, () => void, () => void, () => void] {
  const [isEnabled, setIsEnabled] = useState(() => {
    // Verificar localStorage primeiro
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        return stored === 'true';
      }
    }

    // Fallback para o valor inicial se não houver localStorage
    return initialState;
  });

  // Atualizar variável CSS quando o estado muda
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--outline-enabled', isEnabled ? '1' : '0');
    }

    // Salvar no localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, isEnabled.toString());
      } catch (error) {
        console.warn('Failed to save outline preference to localStorage:', error);
      }
    }
  }, [isEnabled]);

  const enable = useCallback(() => setIsEnabled(true), []);
  const disable = useCallback(() => setIsEnabled(false), []);
  const toggle = useCallback(() => setIsEnabled(!isEnabled), [isEnabled]);

  return [isEnabled, toggle, enable, disable];
}
