import React from 'react';
import { createPortal } from 'react-dom';

export type PopperPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopperProps {
  anchorRef: React.RefObject<HTMLElement>;
  open: boolean;
  placement?: PopperPlacement;
  offset?: number;
  children: React.ReactNode;
}

export const Popper: React.FC<PopperProps> = ({ anchorRef, open, placement = 'bottom', offset = 8, children }) => {
  const [style, setStyle] = React.useState<React.CSSProperties>({ position: 'absolute', top: -9999, left: -9999 });

  React.useLayoutEffect(() => {
    if (!open || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = rect.top + scrollY - offset;
        left = rect.left + scrollX + rect.width / 2;
        break;
      case 'left':
        top = rect.top + scrollY + rect.height / 2;
        left = rect.left + scrollX - offset;
        break;
      case 'right':
        top = rect.top + scrollY + rect.height / 2;
        left = rect.right + scrollX + offset;
        break;
      case 'bottom':
      default:
        top = rect.bottom + scrollY + offset;
        left = rect.left + scrollX + rect.width / 2;
        break;
    }

    setStyle({ position: 'absolute', top, left, transform: 'translate(-50%, 0)' });
  }, [open, anchorRef, placement, offset]);

  if (!open) return null;
  return createPortal(
    <div style={style} data-gs="Popper">
      {children}
    </div>,
    document.body
  );
};

export default Popper;
