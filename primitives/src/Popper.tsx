import React from 'react';
import { createPortal } from 'react-dom';

export type PopperPlacement = 
  | 'top' | 'bottom' | 'left' | 'right'
  | 'top-start' | 'top-end'
  | 'bottom-start' | 'bottom-end'
  | 'left-start' | 'left-end'
  | 'right-start' | 'right-end';

export interface PopperProps {
  anchorRef: React.RefObject<HTMLElement>;
  open: boolean;
  placement?: PopperPlacement;
  offset?: number;
  children: React.ReactNode;
  /** Enable collision detection and auto-flip */
  flip?: boolean;
  /** Padding from viewport edges */
  collisionPadding?: number;
}

export const Popper: React.FC<PopperProps> = ({ 
  anchorRef, 
  open, 
  placement = 'bottom', 
  offset = 8, 
  children,
  flip = true,
  collisionPadding = 8,
}) => {
  const [style, setStyle] = React.useState<React.CSSProperties>({ position: 'absolute', top: -9999, left: -9999 });
  const [actualPlacement, setActualPlacement] = React.useState<PopperPlacement>(placement);
  const popperRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (!open || !anchorRef.current || !popperRef.current) return;
    
    const anchorRect = anchorRef.current.getBoundingClientRect();
    const popperRect = popperRef.current.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const calculatePosition = (p: PopperPlacement) => {
      let top = 0;
      let left = 0;
      let transform = '';

      const [side, align] = p.split('-') as [string, string?];

      switch (side) {
        case 'top':
          top = anchorRect.top + scrollY - popperRect.height - offset;
          if (align === 'start') {
            left = anchorRect.left + scrollX;
          } else if (align === 'end') {
            left = anchorRect.right + scrollX - popperRect.width;
          } else {
            left = anchorRect.left + scrollX + anchorRect.width / 2;
            transform = 'translateX(-50%)';
          }
          break;
        case 'bottom':
          top = anchorRect.bottom + scrollY + offset;
          if (align === 'start') {
            left = anchorRect.left + scrollX;
          } else if (align === 'end') {
            left = anchorRect.right + scrollX - popperRect.width;
          } else {
            left = anchorRect.left + scrollX + anchorRect.width / 2;
            transform = 'translateX(-50%)';
          }
          break;
        case 'left':
          left = anchorRect.left + scrollX - popperRect.width - offset;
          if (align === 'start') {
            top = anchorRect.top + scrollY;
          } else if (align === 'end') {
            top = anchorRect.bottom + scrollY - popperRect.height;
          } else {
            top = anchorRect.top + scrollY + anchorRect.height / 2;
            transform = 'translateY(-50%)';
          }
          break;
        case 'right':
          left = anchorRect.right + scrollX + offset;
          if (align === 'start') {
            top = anchorRect.top + scrollY;
          } else if (align === 'end') {
            top = anchorRect.bottom + scrollY - popperRect.height;
          } else {
            top = anchorRect.top + scrollY + anchorRect.height / 2;
            transform = 'translateY(-50%)';
          }
          break;
      }

      return { top, left, transform };
    };

    const checkCollision = (pos: ReturnType<typeof calculatePosition>) => {
      const finalTop = pos.top;
      const finalLeft = pos.left;
      
      return {
        top: finalTop < collisionPadding,
        bottom: finalTop + popperRect.height > viewport.height - collisionPadding,
        left: finalLeft < collisionPadding,
        right: finalLeft + popperRect.width > viewport.width - collisionPadding,
      };
    };

    let finalPlacement = placement;
    let position = calculatePosition(placement);

    if (flip) {
      const collision = checkCollision(position);
      const [side] = placement.split('-');

      // Auto-flip if collision detected
      if ((side === 'top' && collision.top) || (side === 'bottom' && collision.bottom)) {
        const flipped = side === 'top' ? placement.replace('top', 'bottom') : placement.replace('bottom', 'top');
        const flippedPos = calculatePosition(flipped as PopperPlacement);
        const flippedCollision = checkCollision(flippedPos);
        
        if (!flippedCollision[side === 'top' ? 'bottom' : 'top']) {
          finalPlacement = flipped as PopperPlacement;
          position = flippedPos;
        }
      }

      if ((side === 'left' && collision.left) || (side === 'right' && collision.right)) {
        const flipped = side === 'left' ? placement.replace('left', 'right') : placement.replace('right', 'left');
        const flippedPos = calculatePosition(flipped as PopperPlacement);
        const flippedCollision = checkCollision(flippedPos);
        
        if (!flippedCollision[side === 'left' ? 'right' : 'left']) {
          finalPlacement = flipped as PopperPlacement;
          position = flippedPos;
        }
      }
    }

    setActualPlacement(finalPlacement);
    setStyle({ 
      position: 'absolute', 
      top: position.top, 
      left: position.left, 
      transform: position.transform || 'none',
    });
  }, [open, anchorRef, placement, offset, flip, collisionPadding]);

  if (!open) return null;
  
  return createPortal(
    <div 
      ref={popperRef}
      style={style} 
      data-gs="Popper"
      data-placement={actualPlacement}
    >
      {children}
    </div>,
    document.body
  );
};

export default Popper;
