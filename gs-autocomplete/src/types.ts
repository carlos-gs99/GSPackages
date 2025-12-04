import type { GSSelectProps } from '@carlos-gs99/gs-select';

// GSAutocomplete is essentially GSSelect with search/autocomplete focus
export type GSAutocompleteProps<T = any> = Omit<GSSelectProps, 'multiple'> & {
  /** Minimum characters before triggering search */
  minSearchLength?: number;
  
  /** Debounce delay for search in ms */
  searchDebounce?: number;
  
  /** Custom filter function */
  filterFunction?: (option: T, searchTerm: string) => boolean;
  
  /** Show "No results" message */
  showNoResults?: boolean;
};

