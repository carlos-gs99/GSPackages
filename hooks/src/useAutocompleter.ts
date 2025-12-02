import { useState, useCallback, useEffect } from 'react';
import { TypeaheadOption } from 'components/form/Autocompleter';

export interface UseAutocompleterOptions {
  // Para busca automática
  searchService?: (query: string) => Promise<TypeaheadOption[]>;
  searchEndpoint?: string;
  minSearchLength?: number;
  searchOnFocus?: boolean;
  
  // Para tabela
  tableService?: (params: any) => Promise<any>;
  dataKey?: string;
  labelKey?: string;
  valueKey?: string;
  pageSize?: number;
  
  // Para inicialização
  initialValue?: any;
  initialLabelKey?: string;
  initialValueKey?: string;
  
  // Callbacks
  onSelect?: (item: any) => void;
  onChange?: (selected: TypeaheadOption[]) => void;
}

export default function useAutocompleter({
  // Busca automática
  searchService,
  searchEndpoint,
  minSearchLength = 2,
  searchOnFocus = true,
  
  // Tabela
  tableService,
  dataKey = 'data',
  labelKey = 'label',
  valueKey = 'value',
  pageSize = 10,
  
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
        [labelKey]: initialValue[initialLabelKey] || initialValue.name || initialValue.nome || initialValue.title || '',
        [valueKey]: initialValue[initialValueKey]?.toString() || initialValue.id?.toString() || initialValue[initialLabelKey] || '',
        ...initialValue
      };
      setSelected([option]);
    }
  }, [initialValue, labelKey, valueKey, initialLabelKey, initialValueKey]); // Removido selected.length da dependência

  // Função para carregar dados da tabela
  const loadData = useCallback(async (params: any) => {
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
  const handleTableRowSelect = useCallback((row: any) => {
    const option: TypeaheadOption = {
      id: row.id,
      [valueKey]: row[valueKey] || row.id,
      [labelKey]: row[labelKey] || row.name || row.nome || row.title,
      ...row
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
