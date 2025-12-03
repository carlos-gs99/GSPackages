import { useState, useCallback, useEffect } from 'react';
import { TypeaheadOption } from 'components/form/Autocompleter';

export interface UseAutocompleterOptions {
  // Para busca automática
  searchService?: (query: string) => Promise<TypeaheadOption[]>;
  searchEndpoint?: string;
  minSearchLength?: number;
  searchOnFocus?: boolean;
  
  // Para tabela
  tableService?: (params: Record<string, unknown>) => Promise<Record<string, unknown>>;
  dataKey?: string;
  labelKey?: string;
  valueKey?: string;
  pageSize?: number;
  
  // Para inicialização
  initialValue?: Record<string, unknown>;
  initialLabelKey?: string;
  initialValueKey?: string;
  
  // Callbacks
  onSelect?: (item: Record<string, unknown>) => void;
  onChange?: (selected: TypeaheadOption[]) => void;
}

export default function useAutocompleter({
  // Busca automática
  searchService: _searchService,
  searchEndpoint: _searchEndpoint,
  minSearchLength: _minSearchLength = 2,
  searchOnFocus: _searchOnFocus = true,
  
  // Tabela
  tableService,
  dataKey: _dataKey = 'data',
  labelKey = 'label',
  valueKey = 'value',
  pageSize: _pageSize = 10,
  
  // Inicialização
  initialValue,
  initialLabelKey = 'Nome',
  initialValueKey = 'C_estado_c',
  
  // Callbacks
  onSelect,
  onChange
}: UseAutocompleterOptions) {
  const [selected, setSelected] = useState<TypeaheadOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inicializar com valor existente se fornecido (apenas uma vez)
  useEffect(() => {
    if (initialValue && !selected.length) {
      const option: TypeaheadOption = {
        label: (initialValue as Record<string, unknown>)[initialLabelKey] as string || 'Unknown',
        value: ((initialValue as Record<string, unknown>)[initialValueKey] as string | number) || '',
        data: initialValue as Record<string, unknown>
      };
      setSelected([option]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue, labelKey, valueKey, initialLabelKey, initialValueKey]);

  // Função para carregar dados da tabela
  const loadData = useCallback(async (params: Record<string, unknown>) => {
    if (!tableService) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await tableService(params);
      return response;
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro ao carregar dados. Tente novamente.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [tableService]);

  // Handler para mudanças na seleção
  const handleSelectionChange = useCallback((selectedItems: TypeaheadOption[]) => {
    setSelected(selectedItems);
    if (onChange) {
      onChange(selectedItems);
    }
  }, [onChange]);

  // Handler para seleção de linha da tabela
  const handleTableRowSelect = useCallback((row: Record<string, unknown>) => {
    const option: TypeaheadOption = {
      label: (row[labelKey] as string) || (row.name as string) || (row.nome as string) || (row.title as string) || '',
      value: (row[valueKey] as string | number) || (row.id as string | number) || '',
      data: row
    };
    
    setSelected([option]);
    
    if (onChange) {
      onChange([option]);
    }
    
    if (onSelect) {
      onSelect(row);
    }
  }, [valueKey, labelKey, onSelect, onChange]);

  // Limpar seleção
  const clearSelection = useCallback(() => {
    setSelected([]);
    if (onChange) {
      onChange([]);
    }
  }, [onChange]);

  // Definir seleção manualmente
  const setSelection = useCallback((items: TypeaheadOption[]) => {
    setSelected(items);
    if (onChange) {
      onChange(items);
    }
  }, [onChange]);

  return {
    selected,
    loading,
    error,
    loadData,
    handleSelectionChange,
    handleTableRowSelect,
    clearSelection,
    setSelection
  };
}
