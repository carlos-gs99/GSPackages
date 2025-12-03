import React, { useCallback, useEffect, useState } from 'react';

export interface MenuPosition {
  top: number;
  left: number;
  maxHeight: number;
  side: 'right' | 'left';
  alignment: 'start' | 'center' | 'end';
}

export interface UseMenuPositioningProps {
  triggerRef: React.RefObject<HTMLElement>;
  popupRef: React.RefObject<HTMLElement>;
  isOpen: boolean;
  level: number;
  preferredSide?: 'right' | 'left';
  preferredAlignment?: 'start' | 'center' | 'end';
  offset?: number;
  parentPopupRef?: React.RefObject<HTMLElement>;
}

export const useMenuPositioning = ({
  triggerRef,
  popupRef,
  isOpen,
  level,
  preferredSide = 'right',
  preferredAlignment = 'start',
  offset = 0,
  parentPopupRef,
}: UseMenuPositioningProps) => {
  const [position, setPosition] = useState<MenuPosition>({
    top: 0,
    left: 0,
    maxHeight: 0,
    side: preferredSide,
    alignment: preferredAlignment,
  });

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !isOpen) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    
    // Usar viewport real para detectar se popup vai sair da janela
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    
    // Zona de segurança para posicionamento final
    const safetyMargin = 2;

    // Verificar se o trigger está visível
    if (triggerRect.width === 0 || triggerRect.height === 0) {
      return;
    }

    // Usar dimensões do popup (reais se disponível, estimadas se não)
    const popupRect = popupRef.current?.getBoundingClientRect();
    const popupWidth = popupRect?.width || 250;
    const popupHeight = popupRect?.height || 300;
    const itemHeight = 40; // 2.5rem = 40px

    let side = preferredSide;
    let left: number;
    let top: number;

    // Para níveis mais profundos, usar posicionamento relativo ao popup pai
    if (level > 0 && parentPopupRef?.current) {
      const parentRect = parentPopupRef.current.getBoundingClientRect();
      
      // Verificar se o popup pai está visível
      if (parentRect.width === 0 || parentRect.height === 0) {
        // Fallback para posicionamento normal
        left = triggerRect.right + offset;
        top = triggerRect.top;
      } else {
      
      // Para níveis profundos, sempre usar a posição absoluta do trigger
      // A posição relativa pode estar incorreta devido a scroll ou outros fatores
      top = triggerRect.top;
      
      
      // Posicionar à direita do popup pai
      left = parentRect.right + offset;
      
      
        // Verificar se cabe à direita (usando viewport real)
        if (left + popupWidth > viewport.width) {
          side = 'left';
          left = parentRect.left - popupWidth - offset;
        }
      }
    } else {
      // Para o primeiro nível, usar posicionamento normal
      left = triggerRect.right + offset;
      top = triggerRect.top;
      
      // Verificar se cabe à direita (usando viewport real)
      if (left + popupWidth > viewport.width) {
        side = 'left';
        left = triggerRect.left - popupWidth - offset;
      }
    }

    // Verificar se cabe à esquerda (se tentou direita primeiro)
    if (side === 'left' && left < 0) {
      side = 'right';
      left = triggerRect.right + offset;
      // Se não cabe em nenhum lado, centralizar (usando viewport real)
      if (left + popupWidth > viewport.width) {
        left = Math.max(0, viewport.width - popupWidth);
      }
    }

    // Ajustar posição vertical para não sair do ecrã (apenas para níveis 0 e 1)
    if (level <= 1) {
      const maxTop = viewport.height - popupHeight;
      if (top > maxTop) {
        top = Math.max(0, maxTop);
      }
    }

    // Calcular altura máxima disponível (considerando altura uniforme dos itens)
    const availableHeight = viewport.height - top;
    const maxItemsVisible = Math.floor(availableHeight / itemHeight);
    const maxHeight = Math.min(popupHeight, Math.max(120, maxItemsVisible * itemHeight + 8)); // Mínimo 120px, 8px padding

    const finalPosition = {
      top: top + safetyMargin, // Adicionar margem de segurança ao topo
      left: left + safetyMargin, // Adicionar margem de segurança à esquerda
      maxHeight,
      side,
      alignment: preferredAlignment,
    };
    
    
    setPosition(finalPosition);
  }, [triggerRef, popupRef, isOpen, level, preferredSide, preferredAlignment, offset, parentPopupRef]);

  // Recalcular posição quando necessário
  useEffect(() => {
    if (isOpen) {
      // Calcular posição após render para ter dimensões corretas
      const immediateTimeout = setTimeout(() => calculatePosition(), 0);
      
      // Recalcular com dimensões reais após renderização
      const timeoutId = setTimeout(() => {
        calculatePosition();
      }, 50);
      
      // Recalcular em resize e scroll
      const handleResize = () => {
        clearTimeout(timeoutId);
        calculatePosition();
      };
      const handleScroll = () => {
        clearTimeout(timeoutId);
        calculatePosition();
      };
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true);
      
      return () => {
        clearTimeout(immediateTimeout);
        clearTimeout(timeoutId);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [isOpen, calculatePosition]);

  return {
    position,
    recalculate: calculatePosition,
  };
};
