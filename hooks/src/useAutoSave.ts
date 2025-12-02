import { useCallback, useEffect, useRef, useState } from 'react';

export type AutoSaveState = 'idle' | 'saving' | 'saved' | 'error';

/**
 * Hook para implementar salvamento automático com debounce
 *
 * @param saveCallback - Função que executa o salvamento
 * @param delay - Delay em ms para o debounce (padrão: 2000ms)
 * @param enabled - Se o auto-save está habilitado (padrão: true)
 *
 * @returns Objeto com estado e funções de controle
 */
export const useAutoSave = <T = any>(
  saveCallback: (data: T) => Promise<void>,
  delay: number = 2000,
  enabled: boolean = true
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [state, setState] = useState<AutoSaveState>('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // Memoizar o saveCallback para evitar re-criação desnecessária
  const memoizedSaveCallback = useCallback(saveCallback, []);

  // Função debounced de salvar
  const debouncedSave = useCallback(
    (data: T) => {
      if (!enabled) return;

      // Limpar timeout anterior
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Iniciar novo timeout
      timeoutRef.current = setTimeout(async () => {
        try {
          setState('saving');
          setError(null);

          await memoizedSaveCallback(data);

          setState('saved');
          setLastSaved(new Date());

          // Voltar para idle após 3 segundos
          setTimeout(() => setState('idle'), 3000);
        } catch (err) {
          setState('error');
          setError(err as Error);

          // Voltar para idle após 5 segundos em caso de erro
          setTimeout(() => setState('idle'), 5000);
        }
      }, delay);
    },
    [memoizedSaveCallback, delay, enabled]
  );

  // Função para salvar imediatamente (ignorando debounce)
  const saveNow = useCallback(
    async (data: T) => {
      if (!enabled) return;

      // Limpar timeout pendente
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      try {
        setState('saving');
        setError(null);

        await saveCallback(data);

        setState('saved');
        setLastSaved(new Date());

        // Voltar para idle após 3 segundos
        setTimeout(() => setState('idle'), 3000);
      } catch (err) {
        setState('error');
        setError(err as Error);

        // Voltar para idle após 5 segundos em caso de erro
        setTimeout(() => setState('idle'), 5000);
      }
    },
    [saveCallback, enabled]
  );

  // Cancelar salvamento pendente
  const cancelPending = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setState('idle');
    }
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    // Estado
    state,
    lastSaved,
    error,
    isIdle: state === 'idle',
    isSaving: state === 'saving',
    isSaved: state === 'saved',
    isError: state === 'error',

    // Funções
    debouncedSave,
    saveNow,
    cancelPending,

    // Utilitários
    timeSinceLastSave: lastSaved ? Date.now() - lastSaved.getTime() : null,
    lastSavedFormatted: lastSaved?.toLocaleTimeString() || null
  };
};
