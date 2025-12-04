// ==========================================
// HOOKS INDEX
// ==========================================

// Basic Hooks
export { default as useToggle } from './useToggle';
export { default as useViewPort } from './useViewPort';

// Favorites (tem deps externas)
// export { default as useFavorites } from './useFavorites';
// export type { FavoriteItem } from './useFavorites';

// Autocompleter (tem deps de componentes)
// export { default as useAutocompleter } from './useAutocompleter';

// Translation
export { useTranslation } from './useTranslation';

// Page Size (tem deps de stores/constants)
// export { usePageSize, useCurrentPageSize } from './usePageSize';

// Dropdown
export { useDropdown } from './useDropdown';

// Performance
export { default as usePerformance } from './usePerformance';

// Outline Toggle
export { default as useOutlineToggle } from './useOutlineToggle';

// Auto Save
export { useAutoSave } from './useAutoSave';
export type { AutoSaveState } from './useAutoSave';

// Error Handler
export { useErrorHandler } from './useErrorHandler';

// Menu Hooks
export { useMenuHover } from './useMenuHover';
export { useMenuPositioning } from './useMenuPositioning';
export { useMenuViewportDetection } from './useMenuViewportDetection';
export { useSubmenuPosition } from './useSubmenuPosition';

// Debounce
export { useDebounce } from './useDebounce';
