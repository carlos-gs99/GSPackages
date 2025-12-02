// ==========================================
// UTILS INDEX - REORGANIZED
// ==========================================

// Class Name Utilities
// export * from './classNameUtils';  // ⚠️ DESABILITADO: Tem dependência em '../lib/types/design'

// Debug Utilities
export * from './debugUtils';
// export * from './perfObserverUtils';  // ⚠️ DESABILITADO: Tem problema com import.meta.env em builds

// Accessibility Utilities
export * from './accessibilityUtils';
export * from './a11yDev';

// Array Utilities
export * from './arrayUtils';

// Date Utilities
export * from './dateUtils';
export * from './dotnetDateUtils';
export * from './dateParsers';

// String Utilities
export * from './stringUtils';

// Validation Utilities
export * from './validationUtils';

// Render Utilities
// export * from './renderUtils';  // ⚠️ DESABILITADO: Tem dependência em componentes (GSChip, GSIcon)

// DOM Utilities
export * from './domUtils';

// Table Utilities
export * from './tableUtils';
export * from './fieldMappers';

// Navigation Utilities
// export * from './navigationUtils';  // ⚠️ DESABILITADO: Tem dependência em 'layout/nav/types' e react-router-dom
// export { default as ScrollToTop } from './navigationUtils';

// Window Utilities
// export * from './windowUtils';  // ⚠️ DESABILITADO: Tem dependência em '../components/os-windowing/WindowManagerContext'

// Common Utilities
export * from './commonUtils';

// Chart Utilities
export * from './chartExport';

// Test Utilities
export * from './testUtils';