import React from 'react';

/**
 * Utilitários de Acessibilidade para Componentes GS
 * 
 * Este módulo fornece funções utilitárias para melhorar a acessibilidade
 * dos componentes, incluindo ARIA attributes, keyboard navigation e focus management.
 */

// ==========================================
// ARIA ATTRIBUTES
// ==========================================

export interface AriaAttributes {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-selected'?: boolean;
  'aria-checked'?: boolean | 'mixed';
  'aria-disabled'?: boolean;
  'aria-hidden'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-atomic'?: boolean;
  'aria-busy'?: boolean;
  'aria-controls'?: string;
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  'aria-invalid'?: boolean | 'grammar' | 'spelling';
  'aria-required'?: boolean;
  'aria-pressed'?: boolean;
  'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other';
  'aria-valuemin'?: number;
  'aria-valuemax'?: number;
  'aria-valuenow'?: number;
  'aria-valuetext'?: string;
  'role'?: string;
}

/**
 * Gera atributos ARIA baseados no estado do componente
 */
export const generateAriaAttributes = (config: {
  label?: string;
  labelledBy?: string;
  describedBy?: string;
  expanded?: boolean;
  selected?: boolean;
  checked?: boolean | 'mixed';
  disabled?: boolean;
  hidden?: boolean;
  live?: 'off' | 'polite' | 'assertive';
  atomic?: boolean;
  busy?: boolean;
  controls?: string;
  current?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  hasPopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  invalid?: boolean | 'grammar' | 'spelling';
  required?: boolean;
  pressed?: boolean;
  sort?: 'none' | 'ascending' | 'descending' | 'other';
  valueMin?: number;
  valueMax?: number;
  valueNow?: number;
  valueText?: string;
  role?: string;
}): AriaAttributes => {
  const attributes: AriaAttributes = {};

  if (config.label) attributes['aria-label'] = config.label;
  if (config.labelledBy) attributes['aria-labelledby'] = config.labelledBy;
  if (config.describedBy) attributes['aria-describedby'] = config.describedBy;
  if (config.expanded !== undefined) attributes['aria-expanded'] = config.expanded;
  if (config.selected !== undefined) attributes['aria-selected'] = config.selected;
  if (config.checked !== undefined) attributes['aria-checked'] = config.checked;
  if (config.disabled !== undefined) attributes['aria-disabled'] = config.disabled;
  if (config.hidden !== undefined) attributes['aria-hidden'] = config.hidden;
  if (config.live) attributes['aria-live'] = config.live;
  if (config.atomic !== undefined) attributes['aria-atomic'] = config.atomic;
  if (config.busy !== undefined) attributes['aria-busy'] = config.busy;
  if (config.controls) attributes['aria-controls'] = config.controls;
  if (config.current !== undefined) attributes['aria-current'] = config.current;
  if (config.hasPopup !== undefined) attributes['aria-haspopup'] = config.hasPopup;
  if (config.invalid !== undefined) attributes['aria-invalid'] = config.invalid;
  if (config.required !== undefined) attributes['aria-required'] = config.required;
  if (config.pressed !== undefined) attributes['aria-pressed'] = config.pressed;
  if (config.sort) attributes['aria-sort'] = config.sort;
  if (config.valueMin !== undefined) attributes['aria-valuemin'] = config.valueMin;
  if (config.valueMax !== undefined) attributes['aria-valuemax'] = config.valueMax;
  if (config.valueNow !== undefined) attributes['aria-valuenow'] = config.valueNow;
  if (config.valueText) attributes['aria-valuetext'] = config.valueText;
  if (config.role) attributes.role = config.role;

  return attributes;
};

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================

export type KeyboardKey = 'Enter' | 'Space' | 'Escape' | 'Tab' | 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'Home' | 'End';

export interface KeyboardHandler {
  key: KeyboardKey | KeyboardKey[];
  handler: (event: React.KeyboardEvent) => void;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

/**
 * Cria um handler de teclado que executa a função quando a tecla especificada é pressionada
 */
export const createKeyboardHandler = (handlers: KeyboardHandler[]) => {
  return (event: React.KeyboardEvent) => {
    const handler = handlers.find(h => 
      Array.isArray(h.key) ? h.key.includes(event.key as KeyboardKey) : h.key === event.key
    );

    if (handler) {
      if (handler.preventDefault) {
        event.preventDefault();
      }
      if (handler.stopPropagation) {
        event.stopPropagation();
      }
      handler.handler(event);
    }
  };
};

/**
 * Handlers de teclado comuns para componentes interativos
 */
export const commonKeyboardHandlers = {
  // Enter ou Space para ativar
  activate: (onActivate: () => void): KeyboardHandler => ({
    key: ['Enter', 'Space'],
    handler: onActivate,
    preventDefault: true,
  }),

  // Escape para fechar/cancelar
  close: (onClose: () => void): KeyboardHandler => ({
    key: 'Escape',
    handler: onClose,
    preventDefault: true,
  }),

  // Tab para navegação
  tab: (onTab: () => void): KeyboardHandler => ({
    key: 'Tab',
    handler: onTab,
  }),

  // Arrow keys para navegação
  arrowUp: (onArrowUp: () => void): KeyboardHandler => ({
    key: 'ArrowUp',
    handler: onArrowUp,
    preventDefault: true,
  }),

  arrowDown: (onArrowDown: () => void): KeyboardHandler => ({
    key: 'ArrowDown',
    handler: onArrowDown,
    preventDefault: true,
  }),

  arrowLeft: (onArrowLeft: () => void): KeyboardHandler => ({
    key: 'ArrowLeft',
    handler: onArrowLeft,
    preventDefault: true,
  }),

  arrowRight: (onArrowRight: () => void): KeyboardHandler => ({
    key: 'ArrowRight',
    handler: onArrowRight,
    preventDefault: true,
  }),

  // Home/End para navegação
  home: (onHome: () => void): KeyboardHandler => ({
    key: 'Home',
    handler: onHome,
    preventDefault: true,
  }),

  end: (onEnd: () => void): KeyboardHandler => ({
    key: 'End',
    handler: onEnd,
    preventDefault: true,
  }),
};

// ==========================================
// FOCUS MANAGEMENT
// ==========================================

/**
 * Hook para gerenciar focus em componentes
 */
export const useFocusManagement = () => {
  const focusRef = React.useRef<HTMLElement>(null);

  const focus = () => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  };

  const blur = () => {
    if (focusRef.current) {
      focusRef.current.blur();
    }
  };

  const isFocused = () => {
    return document.activeElement === focusRef.current;
  };

  return {
    focusRef,
    focus,
    blur,
    isFocused,
  };
};

/**
 * Hook para gerenciar focus trap em modais e dropdowns
 */
export const useFocusTrap = (isActive: boolean) => {
  const containerRef = React.useRef<HTMLElement>(null);
  const previousActiveElement = React.useRef<HTMLElement | null>(null);
  const hasInitialFocusSet = React.useRef(false);

  React.useEffect(() => {
    if (!isActive || !containerRef.current) {
      hasInitialFocusSet.current = false;
      return;
    }

    // Salvar elemento ativo anterior APENAS na primeira vez
    if (!hasInitialFocusSet.current) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }

    // Usar requestAnimationFrame para garantir que o DOM está renderizado
    const rafId = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      
      // Focar no primeiro elemento focável APENAS na primeira vez que o modal abre
      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const activeElement = document.activeElement as HTMLElement;
      const isActiveElementInsideContainer = containerRef.current.contains(activeElement);
      
      // Se já há um elemento focado dentro (incluindo inputs), não fazer nada
      if (isActiveElementInsideContainer) {
        hasInitialFocusSet.current = true;
        return;
      }
      
      // Só forçar foco na primeira vez que o modal abre E se não houver elemento já focado dentro do container
      if (!hasInitialFocusSet.current && focusableElements.length > 0) {
        // Preferir focar no primeiro input em vez do botão de fechar
        const firstInput = Array.from(focusableElements).find(
          el => (el as HTMLElement).tagName === 'INPUT' || (el as HTMLElement).tagName === 'TEXTAREA'
        ) as HTMLElement;
        
        const elementToFocus = firstInput || (focusableElements[0] as HTMLElement);
        elementToFocus.focus();
        hasInitialFocusSet.current = true;
      }
    });

    return () => cancelAnimationFrame(rafId);

    // Handler para capturar Tab (apenas para focus trap, não interfere com digitação)
    const handleKeyDown = (event: KeyboardEvent) => {
      // Não interferir se o utilizador está a digitar (não é Tab)
      if (event.key !== 'Tab') return;
      
      // Não interferir se o elemento ativo é um input/textarea e o utilizador está a digitar
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        // Se o utilizador está a fazer Tab dentro de um input, deixar o comportamento padrão
        // Apenas interceptar quando está a sair do container
        return;
      }

      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      hasInitialFocusSet.current = false;
      
      // Restaurar focus anterior
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isActive]);

  return containerRef;
};

// ==========================================
// SCREEN READER UTILITIES
// ==========================================

/**
 * Hook para anunciar mudanças para screen readers
 */
export const useScreenReaderAnnouncement = () => {
  const [announcement, setAnnouncement] = React.useState<string>('');

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncement(message);
    
    // Limpar após um tempo para permitir novos anúncios
    setTimeout(() => setAnnouncement(''), 1000);
  };

  const AnnouncementRegion = () => {
    return React.createElement('div', {
      'aria-live': announcement ? 'polite' : 'off',
      'aria-atomic': 'true',
      className: 'gs-sr-only'
    }, announcement);
  };

  return { announce, AnnouncementRegion };
};

// ==========================================
// VALIDATION UTILITIES
// ==========================================

/**
 * Gera mensagens de erro acessíveis
 */
export const generateAccessibleError = (error: string | undefined, fieldName: string) => {
  if (!error) return undefined;
  
  return {
    'aria-invalid': true,
    'aria-describedby': `${fieldName}-error`,
    'aria-errormessage': error,
  };
};

/**
 * Gera ID único para elementos
 */
export const generateId = (prefix: string = 'gs') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// ==========================================
// EXPORTS
// ==========================================

export default {
  generateAriaAttributes,
  createKeyboardHandler,
  commonKeyboardHandlers,
  useFocusManagement,
  useFocusTrap,
  useScreenReaderAnnouncement,
  generateAccessibleError,
  generateId,
};
