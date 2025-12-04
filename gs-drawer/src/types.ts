export type GSDrawerPlacement = 'start' | 'end' | 'top' | 'bottom';
export type GSDrawerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface GSDrawerProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title?: string;
  placement?: GSDrawerPlacement;
  size?: GSDrawerSize;
  backdrop?: boolean;
  keyboard?: boolean;
  closeOnEscape?: boolean;
  restoreFocus?: boolean;
  className?: string;
  ariaLabel?: string;
  debug?: boolean;
}

