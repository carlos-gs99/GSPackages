import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Global state storage to preserve dropdown states during hot reload - 1761054334729
const dropdownStates = new Map<string, boolean>();

// Hot module reload cleanup (removed for build compatibility)
// Note: import.meta.hot is not available in all build environments

export interface DropdownPosition {
  top: number;
  left: number;
  bottom?: number;
  right?: number;
  side: 'bottom' | 'top' | 'left' | 'right';
  align: 'start' | 'center' | 'end';
}

export interface UseDropdownOptions {
  show?: boolean;
  onToggle?: (show: boolean) => void;
  align?: 'start' | 'end' | 'center';
  side?: 'bottom' | 'top' | 'left' | 'right';
  sideOffset?: number;
  collisionPadding?: number;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
}

export interface UseDropdownReturn {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  menuRef: React.RefObject<HTMLDivElement>;
  menuId: string;
  triggerProps: React.ButtonHTMLAttributes<HTMLElement>;
  menuProps: React.HTMLAttributes<HTMLDivElement> & { style: React.CSSProperties };
  renderMenu: (children: React.ReactNode) => React.ReactNode;
}

/**
 * Hook personalizado para dropdown com positioning inteligente
 * Calcula automaticamente a melhor posição baseada no viewport
 */
export const useDropdown = (options: UseDropdownOptions = {}): UseDropdownReturn => {
  const {
    show: controlledShow,
    onToggle,
    align = 'start',
    side = 'bottom',
    sideOffset = 4,
    collisionPadding = 16, // Aumentado de 8 para 16 para incluir margem de segurança (barra de scroll)
    closeOnEscape = true,
    closeOnClickOutside = true
  } = options;

  // Create a unique key for this dropdown instance to preserve state during hot reload
  const [dropdownKey] = useState(() => `dropdown-${Math.random().toString(36).substr(2, 9)}`);

  // Use global state storage for uncontrolled dropdowns to survive hot reload
  const [internalShow, setInternalShowState] = useState(() => {
    return dropdownStates.get(dropdownKey) ?? false;
  });

  // Wrapper function to update both local state and global storage
  const setInternalShow = useCallback((value: boolean | ((prev: boolean) => boolean)) => {
    setInternalShowState(prevValue => {
      const newValue = typeof value === 'function' ? value(prevValue) : value;
      // Store in global state for hot reload persistence
      if (typeof window !== 'undefined') {
        dropdownStates.set(dropdownKey, newValue);
      }
      return newValue;
    });
  }, [dropdownKey]);
  const [position, setPosition] = useState<DropdownPosition>({
    top: 0,
    left: 0,
    side: 'bottom',
    align: 'start'
  });
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isPositioned, setIsPositioned] = useState(false);

  const triggerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  // Use useState for menuId to avoid impure function during render
  const [menuId] = useState(() => `dropdown-menu-${Math.random().toString(36).substr(2, 9)}`);

  const isControlled = controlledShow !== undefined;
  const isOpen = isControlled ? controlledShow : internalShow;

  /**
   * Calcula a largura da barra de scroll vertical (se visível)
   * MOVED BEFORE calculatePosition to avoid access before declaration
   */
  const scrollbarWidthRef = useRef<number | null>(null);
  
  const getScrollbarWidth = (): number => {
    if (scrollbarWidthRef.current !== null) {
      return scrollbarWidthRef.current;
    }
    
    if (typeof document === 'undefined') return 0;
    
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    (outer.style as unknown as Record<string, string>).msOverflowStyle = 'scrollbar';
    outer.style.position = 'absolute';
    outer.style.width = '100px';
    outer.style.height = '100px';
    document.body.appendChild(outer);
    
    const inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '100%';
    outer.appendChild(inner);
    
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    
    outer.parentNode?.removeChild(outer);
    
    scrollbarWidthRef.current = scrollbarWidth || 0;
    
    return scrollbarWidthRef.current;
  };

  /**
   * Ajusta posição para evitar sair do viewport
   * MOVED BEFORE calculatePosition to avoid access before declaration
   */
  const adjustForViewport = (
    pos: DropdownPosition,
    menuRect: DOMRect,
    viewport: { width: number; height: number },
    padding: number
  ): DropdownPosition => {
    let { top, left, side: posSide, align: posAlign } = pos;

    const scrollbarWidth = getScrollbarWidth();
    const rightMargin = Math.max(padding, scrollbarWidth + padding);
    const safePadding = {
      top: padding,
      right: rightMargin,
      bottom: padding,
      left: padding,
    };

    if (left < safePadding.left) {
      left = safePadding.left;
    } else if (left + menuRect.width > viewport.width - safePadding.right) {
      left = viewport.width - menuRect.width - safePadding.right;
    }

    if (top < safePadding.top) {
      if (posSide === 'top') {
        const actualTrigger = triggerRef.current?.querySelector('button') || triggerRef.current;
        const triggerRect = actualTrigger?.getBoundingClientRect();
        if (triggerRect) {
          top = triggerRect.bottom + sideOffset;
        }
        posSide = 'bottom';
      } else {
        top = safePadding.top;
      }
    } else if (top + menuRect.height > viewport.height - safePadding.bottom) {
      if (posSide === 'bottom') {
        const actualTrigger = triggerRef.current?.querySelector('button') || triggerRef.current;
        const triggerRect = actualTrigger?.getBoundingClientRect();
        if (triggerRect) {
          top = triggerRect.top - menuRect.height - sideOffset;
        }
        posSide = 'top';
      } else {
        top = viewport.height - menuRect.height - safePadding.bottom;
      }
    }

    if (top < safePadding.top) {
      top = safePadding.top;
    } else if (top + menuRect.height > viewport.height - safePadding.bottom) {
      top = viewport.height - menuRect.height - safePadding.bottom;
    }

    return { top, left, side: posSide, align: posAlign };
  };

  /**
   * Calcula a posição ideal do dropdown baseada no viewport
   */
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !menuRef.current) return;

    const trigger = triggerRef.current;
    const menu = menuRef.current;
    
    // Se o trigger é um wrapper div, pegar o botão dentro dele
    const actualTrigger = trigger.querySelector('button') || trigger;
    const triggerRect = actualTrigger.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    // Use local variables to avoid closure issues with react-hooks/purity
    const currentSide = side;
    const currentAlign = align;

    let newPosition: DropdownPosition = {
      top: 0,
      left: 0,
      side: currentSide,
      align: currentAlign
    };

    // Calcular posição baseada no side
    switch (currentSide) {
      case 'bottom':
        newPosition.top = triggerRect.bottom + sideOffset;
        break;
      case 'top':
        newPosition.top = triggerRect.top - menuRect.height - sideOffset;
        break;
      case 'left':
        newPosition.left = triggerRect.left - menuRect.width - sideOffset;
        newPosition.top = triggerRect.top;
        break;
      case 'right':
        newPosition.left = triggerRect.right + sideOffset;
        newPosition.top = triggerRect.top;
        break;
    }

    // Calcular alinhamento horizontal para side 'top' e 'bottom'
    if (newPosition.side === 'bottom' || newPosition.side === 'top') {
      switch (currentAlign) {
        case 'start':
          newPosition.left = triggerRect.left;
          break;
        case 'center':
          newPosition.left = triggerRect.left + (triggerRect.width / 2) - (menuRect.width / 2);
          break;
        case 'end':
          newPosition.left = triggerRect.right - menuRect.width;
          break;
      }
    }

    // Calcular alinhamento vertical para side 'left' e 'right'
    if (currentSide === 'left' || currentSide === 'right') {
      switch (currentAlign) {
        case 'start':
          newPosition.top = triggerRect.top;
          break;
        case 'center':
          newPosition.top = triggerRect.top + (triggerRect.height / 2) - (menuRect.height / 2);
          break;
        case 'end':
          newPosition.top = triggerRect.bottom - menuRect.height;
          break;
      }
    }

    // Verificar colisões com viewport e ajustar
    const adjustedPosition = adjustForViewport(newPosition, menuRect, viewport, collisionPadding);
    
    setPosition(adjustedPosition);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [side, align, sideOffset, collisionPadding]);

  /**
   * Obtém todos os itens focusáveis do menu
   */
  const getFocusableItems = useCallback(() => {
    if (!menuRef.current) return [];
    const items = menuRef.current.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])');
    return Array.from(items) as HTMLElement[];
  }, []);

  /**
   * Navega para um item específico
   */
  const focusItem = useCallback((index: number) => {
    const items = getFocusableItems();
    if (items[index]) {
      items[index].focus();
      setFocusedIndex(index);
    }
  }, [getFocusableItems]);

  const toggle = useCallback(() => {
    const newValue = !isOpen;
    if (!isControlled) {
      setInternalShow(newValue);
    }
    onToggle?.(newValue);
  }, [isOpen, isControlled, onToggle, setInternalShow]);

  const open = useCallback(() => {
    if (!isControlled) {
      setInternalShow(true);
    }
    onToggle?.(true);
  }, [isControlled, onToggle, setInternalShow]);

  const close = useCallback(() => {
    if (!isControlled) {
      setInternalShow(false);
    }
    onToggle?.(false);
  }, [isControlled, onToggle, setInternalShow]);

  /**
   * Navegação por teclado
   */
  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    const items = getFocusableItems();
    if (items.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (focusedIndex < items.length - 1) {
          focusItem(focusedIndex + 1);
        } else {
          focusItem(0); // Volta para o primeiro
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (focusedIndex > 0) {
          focusItem(focusedIndex - 1);
        } else {
          focusItem(items.length - 1); // Vai para o último
        }
        break;

      case 'Home':
        e.preventDefault();
        focusItem(0);
        break;

      case 'End':
        e.preventDefault();
        focusItem(items.length - 1);
        break;

      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && items[focusedIndex]) {
          items[focusedIndex].click();
        }
        break;

      case 'Escape':
        e.preventDefault();
        close();
        break;

      case 'Tab':
        // Permite navegação normal com Tab, fecha o menu
        close();
        break;
    }
  }, [focusedIndex, getFocusableItems, focusItem, close]);

  // Calcular posição quando o menu abre - usar requestAnimationFrame para suavidade
  useEffect(() => {
    if (!isOpen) {
      setIsPositioned(false);
      return;
    }

    if (!menuRef.current) return;

    // Reset positioning state quando menu abre (removed to avoid setState during render)

    // Calcular posição o mais rápido possível usando requestAnimationFrame múltiplo
    // Primeiro frame: aguardar DOM estar pronto
    // Segundo frame: calcular posição inicial
    // Terceiro frame: recalcular com dimensões reais (importante para side 'top')
    let frameId1: number;
    let frameId2: number;
    let frameId3: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    frameId1 = requestAnimationFrame(() => {
      // Segundo frame: menu já deve ter dimensões básicas
      frameId2 = requestAnimationFrame(() => {
        if (!menuRef.current) return;
        
        // Calcular posição inicial
        calculatePosition();
        
        // Terceiro frame: recalcular com dimensões reais do menu renderizado
        // Isso garante posição precisa especialmente para side 'top'
        frameId3 = requestAnimationFrame(() => {
          if (!menuRef.current) return;
          
          // Recalcular para garantir posição precisa
          calculatePosition();
          
          // Aguardar um frame adicional para garantir que a posição foi aplicada
          // antes de mostrar o menu (evita salto visual, especialmente para side 'top')
          timeoutId = setTimeout(() => {
            setIsPositioned(true);
          }, 16); // ~1 frame a 60fps
        });
      });
    });

    return () => {
      if (frameId1) cancelAnimationFrame(frameId1);
      if (frameId2) cancelAnimationFrame(frameId2);
      if (frameId3) cancelAnimationFrame(frameId3);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isOpen, calculatePosition]);

  // Event listeners com melhor cleanup
  useEffect(() => {
    if (!isOpen) return;

    const escapeHandler = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        close();
      }
    };

    const clickOutsideHandler = (e: MouseEvent) => {
      if (!closeOnClickOutside) return;

      const target = e.target as Node;

      if (
        triggerRef.current &&
        menuRef.current &&
        !triggerRef.current.contains(target) &&
        !menuRef.current.contains(target)
      ) {
        close();
      }
    };

    document.addEventListener('keydown', escapeHandler);
    document.addEventListener('mousedown', clickOutsideHandler);

    return () => {
      document.removeEventListener('keydown', escapeHandler);
      document.removeEventListener('mousedown', clickOutsideHandler);
    };
  }, [isOpen, closeOnEscape, closeOnClickOutside, close]);

  useEffect(() => {
    if (!isOpen || !isPositioned) return;

    // Throttle para evitar recálculos excessivos durante scroll/resize
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleReposition = () => {
      // Clear previous timeout
      if (timeoutId) clearTimeout(timeoutId);
      
      // Throttle: recalcular após 16ms (aproximadamente 60fps)
      timeoutId = setTimeout(() => {
        calculatePosition();
      }, 16);
    };

    window.addEventListener('resize', handleReposition, { passive: true });
    window.addEventListener('scroll', handleReposition, { passive: true, capture: true });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [isOpen, isPositioned, calculatePosition]);

  // Focar primeiro item quando menu abre (após estar posicionado)
  useEffect(() => {
    if (isOpen && isPositioned) {
      // Delay pequeno para garantir que o menu foi renderizado e está visível
      const timer = setTimeout(() => {
        const items = getFocusableItems();
        if (items.length > 0) {
          items[0].focus();
          setFocusedIndex(0);
        }
      }, 50);
      return () => clearTimeout(timer);
    } else if (focusedIndex !== -1) {
      // Reset focused index quando menu fecha (using timeout to avoid setState during render)
      const resetFocusTimeout = setTimeout(() => setFocusedIndex(-1), 0);
      return () => clearTimeout(resetFocusTimeout);
    }
  }, [isOpen, isPositioned, getFocusableItems]);

  // Trigger props (ref omitted - consumer uses triggerRef directly)
  const triggerProps: React.ButtonHTMLAttributes<HTMLElement> = {
    'aria-haspopup': 'menu',
    'aria-expanded': isOpen,
    'aria-controls': menuId,
    onClick: toggle,
    onKeyDown: handleMenuKeyDown,
  };

  const menuProps: UseDropdownReturn['menuProps'] = {
    id: menuId,
    role: 'menu',
    'aria-labelledby': '', // Will be set by consumer if needed
    onKeyDown: handleMenuKeyDown,
    style: {
      position: 'fixed',
      top: `${position.top}px`,
      left: `${position.left}px`,
      zIndex: 'var(--z-popover)',
      transform: 'translateY(0)', // Sem transform para evitar salto visual especialmente quando abre para cima
      // Transição suave para mudanças de posição após o cálculo inicial
      transition: isPositioned 
        ? 'top 0.2s ease-out, left 0.2s ease-out, opacity 0.15s ease-out'
        : 'none',
      // Renderizar invisível até calcular a posição para evitar salto visual
      opacity: isPositioned ? 1 : 0,
      // Usar will-change para otimizar animações
      willChange: isPositioned ? 'auto' : 'transform, opacity',
      // Garantir que o elemento não seja interativo antes de estar posicionado
      pointerEvents: isPositioned ? 'auto' : 'none',
    },
  };

  const renderMenu = (children: React.ReactNode) => {
    if (!isOpen) return null;

    if (typeof document === 'undefined' || !document.body) {
      return null;
    }

    if (!React.isValidElement(children)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[useDropdown] Menu element is not valid:', children);
      }
      return null;
    }

    const { className: childClassName, style: childStyle, ref: childRef } = children.props;
    const mergedClassName = ['gs-dropdown-simple__menu', childClassName].filter(Boolean).join(' ');
    const mergedStyle = {
      ...(childStyle ?? {}),
      ...(menuProps.style ?? {}),
    };

    // Refs assignment function - moved outside to avoid hook call in render function
    const setRefs = (node: HTMLDivElement | null) => {
      (menuRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof childRef === 'function') {
        childRef(node);
      } else if (childRef && typeof childRef === 'object') {
        (childRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    // Extract style and className from menuProps (not used, already merged into mergedStyle/mergedClassName)
    const { style: _unusedMenuStyle, className: _unusedMenuClassName, ...restMenuProps } = menuProps;
    void _unusedMenuStyle; // Mark as intentionally unused
    void _unusedMenuClassName; // Mark as intentionally unused

    return createPortal(
      React.cloneElement(children, {
        ...restMenuProps,
        className: mergedClassName,
        style: mergedStyle,
        ref: setRefs,
      }),
      document.body,
    );
  };

  return {
    isOpen,
    toggle,
    open,
    close,
    triggerRef,
    menuRef,
    menuId: menuId,
    triggerProps,
    menuProps,
    renderMenu,
  };
};
