// ==========================================
// WINDOW UTILITIES
// ==========================================

import { WindowDefinition } from '../components/os-windowing/WindowManagerContext';

/**
 * Estado da janela
 */
export type WindowState = 'active' | 'inactive' | 'minimized' | 'maximized';

/**
 * Gera classes CSS para o estado da janela
 * @param window - Definição da janela
 * @param activeWindowId - ID da janela ativa
 * @returns String com classes CSS
 */
export const getWindowStateClasses = (window: WindowDefinition, activeWindowId: string | null): string => {
  const classes: string[] = [];
  
  // Base class
  classes.push('window-state');
  
  // State classes
  if (window.isMinimized) {
    classes.push('window-minimized');
  } else if (activeWindowId === window.id) {
    classes.push('window-active');
  } else {
    classes.push('window-inactive');
  }
  
  // Additional state classes
  if (window.isMaximized) {
    classes.push('window-maximized');
  }
  
  return classes.join(' ');
};

/**
 * Gera classes CSS para o botão da taskbar
 * @param window - Definição da janela
 * @param activeWindowId - ID da janela ativa
 * @returns String com classes CSS
 */
export const getTaskbarButtonClasses = (window: WindowDefinition, activeWindowId: string | null): string => {
  const classes: string[] = [];
  
  // Base class
  classes.push('taskbar-button');
  
  // State classes
  if (window.isMinimized) {
    classes.push('taskbar-button-minimized');
  } else if (activeWindowId === window.id) {
    classes.push('taskbar-button-active');
  } else {
    classes.push('taskbar-button-inactive');
  }
  
  // Additional state classes
  if (window.isMaximized) {
    classes.push('taskbar-button-maximized');
  }
  
  return classes.join(' ');
};

/**
 * Gera classes CSS para a barra de título da janela
 * @param window - Definição da janela
 * @param activeWindowId - ID da janela ativa
 * @returns String com classes CSS
 */
export const getWindowTitleBarClasses = (window: WindowDefinition, activeWindowId: string | null): string => {
  const classes: string[] = [];
  
  // Base class
  classes.push('window-titlebar');
  
  // State classes
  if (window.isMinimized) {
    classes.push('window-titlebar-minimized');
  } else if (activeWindowId === window.id) {
    classes.push('window-titlebar-active');
  } else {
    classes.push('window-titlebar-inactive');
  }
  
  // Additional state classes
  if (window.isMaximized) {
    classes.push('window-titlebar-maximized');
  }
  
  return classes.join(' ');
};
