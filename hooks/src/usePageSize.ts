import { useState, useEffect } from 'react';
import { useStore } from '../stores/store';
import { PAGE_SIZE_KEY } from '../constants';

/**
 * Hook personalizado para gerir o tamanho de página baseado nas preferências do utilizador
 * @param defaultPageSize - Tamanho de página por omissão se não houver preferência
 * @returns [pageSize, setPageSize] - Estado e função para atualizar o tamanho de página
 */
export const usePageSize = (defaultPageSize: number = 10) => {
  const { layoutStore } = useStore();
  const [pageSize, setPageSizeState] = useState<number>(defaultPageSize);

  useEffect(() => {
    // Usar o pageSize do layoutStore se disponível, senão usar o localStorage diretamente
    const storedPageSize = layoutStore.pageSize || 
      parseInt(localStorage.getItem(PAGE_SIZE_KEY) || defaultPageSize.toString());
    
    // Use timeout to avoid setState during render
    const timer = setTimeout(() => setPageSizeState(storedPageSize), 0);
    return () => clearTimeout(timer);
  }, [layoutStore.pageSize, defaultPageSize]);

  const setPageSize = (newPageSize: number) => {
    setPageSizeState(newPageSize);
    layoutStore.changePageSize(newPageSize);
  };

  return [pageSize, setPageSize] as const;
};

/**
 * Hook para obter apenas o tamanho de página atual (read-only)
 * @param defaultPageSize - Tamanho de página por omissão se não houver preferência
 * @returns pageSize - Tamanho de página atual
 */
export const useCurrentPageSize = (defaultPageSize: number = 10) => {
  const { layoutStore } = useStore();
  
  // Inicializar diretamente com o valor correto do localStorage ou layoutStore
  const getInitialPageSize = () => {
    return layoutStore.pageSize || 
      parseInt(localStorage.getItem(PAGE_SIZE_KEY) || defaultPageSize.toString());
  };
  
  const [pageSize, setPageSizeState] = useState<number>(getInitialPageSize);

  useEffect(() => {
    const storedPageSize = layoutStore.pageSize || 
      parseInt(localStorage.getItem(PAGE_SIZE_KEY) || defaultPageSize.toString());
    
    if (storedPageSize !== pageSize) {
      // Use timeout to avoid setState during render
      const timer = setTimeout(() => setPageSizeState(storedPageSize), 0);
      return () => clearTimeout(timer);
    }
  }, [layoutStore.pageSize, defaultPageSize, pageSize]);

  return pageSize;
};
