import { useEffect, useRef } from 'react';

export interface UseMenuViewportDetectionProps {
  popupRef: React.RefObject<HTMLElement>;
  isOpen: boolean;
  level: number;
  onPositionAdjust?: (adjustments: { top?: number; left?: number; side?: 'left' | 'right' }) => void;
}

export const useMenuViewportDetection = ({
  popupRef,
  isOpen,
  level,
  onPositionAdjust,
}: UseMenuViewportDetectionProps) => {
  const detectionTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isOpen || !popupRef.current || !onPositionAdjust) return;

    const detectAndAdjust = () => {
      if (!popupRef.current) return;

      const popupRect = popupRef.current.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      const adjustments: { top?: number; left?: number; side?: 'left' | 'right' } = {};

      // Detectar se saiu do lado direito
      if (popupRect.right > viewport.width - 8) {
        // Tentar abrir à esquerda
        const newLeft = popupRect.left - popupRect.width - 16; // 16px de gap
        if (newLeft >= 8) {
          adjustments.left = newLeft;
          adjustments.side = 'left';
        } else {
          // Se não cabe à esquerda, ajustar para o limite direito
          adjustments.left = viewport.width - popupRect.width - 8;
        }
      }

      // Detectar se saiu do lado esquerdo
      if (popupRect.left < 8) {
        // Tentar abrir à direita
        const newLeft = popupRect.right + 16; // 16px de gap
        if (newLeft + popupRect.width <= viewport.width - 8) {
          adjustments.left = newLeft;
          adjustments.side = 'right';
        } else {
          // Se não cabe à direita, ajustar para o limite esquerdo
          adjustments.left = 8;
        }
      }

      // Detectar se saiu do fundo
      if (popupRect.bottom > viewport.height - 8) {
        const newTop = viewport.height - popupRect.height - 8;
        adjustments.top = Math.max(8, newTop);
      }

      // Detectar se saiu do topo
      if (popupRect.top < 8) {
        adjustments.top = 8;
      }

      // Para níveis profundos, verificar se o popup está muito deslocado verticalmente
      if (level > 0) {
        const expectedTop = popupRect.top; // Posição atual
        const viewportCenter = viewport.height / 2;
        const distanceFromCenter = Math.abs(expectedTop - viewportCenter);
        
        // Se está muito longe do centro, tentar centralizar melhor
        if (distanceFromCenter > viewport.height * 0.4) {
          const newTop = Math.max(8, Math.min(viewport.height - popupRect.height - 8, viewportCenter - popupRect.height / 2));
          adjustments.top = newTop;
        }
      }

      // Aplicar ajustes se necessário
      if (Object.keys(adjustments).length > 0) {
        onPositionAdjust(adjustments);
      }
    };

    // Detectar após um pequeno delay para permitir que o popup seja renderizado
    detectionTimeoutRef.current = setTimeout(detectAndAdjust, 50);

    // Também detectar em resize e scroll
    const handleResize = () => {
      if (detectionTimeoutRef.current) {
        clearTimeout(detectionTimeoutRef.current);
      }
      detectionTimeoutRef.current = setTimeout(detectAndAdjust, 100);
    };

    const handleScroll = () => {
      if (detectionTimeoutRef.current) {
        clearTimeout(detectionTimeoutRef.current);
      }
      detectionTimeoutRef.current = setTimeout(detectAndAdjust, 50);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      if (detectionTimeoutRef.current) {
        clearTimeout(detectionTimeoutRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen, level, popupRef, onPositionAdjust]);
};
