import { useState, useRef, useCallback, useEffect } from 'react';

export interface SubmenuPosition {
  top: number;
  left: number;
  side: 'right' | 'left' | 'top' | 'bottom';
  align: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

export interface UseSubmenuPositionOptions {
  side?: 'right' | 'left' | 'top' | 'bottom';
  align?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  sideOffset?: number;
  collisionPadding?: number;
  orientation?: 'vertical' | 'horizontal';
}

export interface UseSubmenuPositionReturn {
  position: SubmenuPosition;
  triggerRef: React.RefObject<HTMLElement>;
  submenuRef: React.RefObject<HTMLDivElement>;
  calculatePosition: () => void;
}

/**
 * Hook para posicionamento inteligente de submenus
 * Ajusta automaticamente a posição baseada no viewport
 */
export const useSubmenuPosition = (options: UseSubmenuPositionOptions = {}): UseSubmenuPositionReturn => {
  const {
    side = 'right',
    align = 'top',
    sideOffset = 0, // Reduzir distância para 0
    collisionPadding = 8,
    orientation = 'vertical'
  } = options;

  const [position, setPosition] = useState<SubmenuPosition>({
    top: 0,
    left: 0,
    side: 'right',
    align: 'top'
  });

  const triggerRef = useRef<HTMLElement>(null);
  const submenuRef = useRef<HTMLDivElement>(null);

  /**
   * Calcula a posição ideal do submenu baseada no viewport
   */
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !submenuRef.current) return;

    const trigger = triggerRef.current;
    const submenu = submenuRef.current;
    
    const triggerRect = trigger.getBoundingClientRect();
    const submenuRect = submenu.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let newPosition: SubmenuPosition = {
      top: 0,
      left: 0,
      side: side,
      align: align
    };

    // Calcular posição baseada na orientação
    if (orientation === 'horizontal') {
      // Modo horizontal: submenu abre para baixo
      newPosition.top = triggerRect.bottom + sideOffset;
      newPosition.left = triggerRect.left;
      
      // Ajustar alinhamento horizontal
      if (align === 'left') {
        newPosition.left = triggerRect.left;
      } else if (align === 'right') {
        newPosition.left = triggerRect.right - submenuRect.width;
      } else {
        // center
        newPosition.left = triggerRect.left + (triggerRect.width / 2) - (submenuRect.width / 2);
      }
    } else {
      // Modo vertical: submenu abre para a direita
      if (side === 'right') {
        newPosition.left = triggerRect.right + sideOffset;
      } else {
        newPosition.left = triggerRect.left - submenuRect.width - sideOffset;
      }

      // Calcular alinhamento vertical
      if (align === 'top') {
        newPosition.top = triggerRect.top;
      } else {
        newPosition.top = triggerRect.bottom - submenuRect.height;
      }
    }

    // Ajustar para viewport
    const adjustedPosition = adjustForViewport(newPosition, submenuRect, viewport, collisionPadding);
    
    setPosition(adjustedPosition);
  }, [side, align, sideOffset, collisionPadding]);

  /**
   * Ajusta posição para evitar sair do viewport
   */
  const adjustForViewport = (
    pos: SubmenuPosition,
    submenuRect: DOMRect,
    viewport: { width: number; height: number },
    padding: number
  ): SubmenuPosition => {
    let { top, left, side, align } = pos;

    if (orientation === 'horizontal') {
      // Modo horizontal: ajustar posição vertical e horizontal
      
      // Verificar limites verticais
      if (top + submenuRect.height > viewport.height - padding) {
        // Vai sair pelo fundo - mudar para cima
        top = triggerRef.current!.getBoundingClientRect().top - submenuRect.height - sideOffset;
      }

      // Verificar limites horizontais
      if (left < padding) {
        left = padding;
      } else if (left + submenuRect.width > viewport.width - padding) {
        left = viewport.width - submenuRect.width - padding;
      }

      // Verificar novamente após mudanças
      if (top < padding) {
        top = padding;
      } else if (top + submenuRect.height > viewport.height - padding) {
        top = viewport.height - submenuRect.height - padding;
      }
    } else {
      // Modo vertical: lógica original
      
      // Verificar limites horizontais
      if (side === 'right') {
        // Se vai sair pela direita, mudar para esquerda
        if (left + submenuRect.width > viewport.width - padding) {
          side = 'left';
          left = triggerRef.current!.getBoundingClientRect().left - submenuRect.width - sideOffset;
        }
      } else {
        // Se vai sair pela esquerda, mudar para direita
        if (left < padding) {
          side = 'right';
          left = triggerRef.current!.getBoundingClientRect().right + sideOffset;
        }
      }

      // Verificar limites verticais
      if (top < padding) {
        // Vai sair pelo topo - mudar para bottom
        align = 'bottom';
        top = triggerRef.current!.getBoundingClientRect().bottom - submenuRect.height;
      } else if (top + submenuRect.height > viewport.height - padding) {
        // Vai sair pelo fundo - mudar para top
        align = 'top';
        top = triggerRef.current!.getBoundingClientRect().top;
      }

      // Verificar novamente após mudanças
      if (top < padding) {
        top = padding;
      } else if (top + submenuRect.height > viewport.height - padding) {
        top = viewport.height - submenuRect.height - padding;
      }

      if (left < padding) {
        left = padding;
      } else if (left + submenuRect.width > viewport.width - padding) {
        left = viewport.width - submenuRect.width - padding;
      }
    }

    return { top, left, side, align };
  };

  // Calcular posição quando o submenu é mostrado
  useEffect(() => {
    if (submenuRef.current) {
      const timer = setTimeout(() => {
        calculatePosition();
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [calculatePosition]);

  return {
    position,
    triggerRef,
    submenuRef,
    calculatePosition
  };
};
