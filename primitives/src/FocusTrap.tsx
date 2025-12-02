import React from 'react';

export interface FocusTrapProps {
  active?: boolean;
  children: React.ReactNode;
}

export const FocusTrap: React.FC<FocusTrapProps> = ({ active = true, children }) => {
  const startRef = React.useRef<HTMLSpanElement>(null);
  const endRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (!active) return;
    const first = startRef.current;
    const last = endRef.current;
    if (!first || !last) return;

    const onFocus = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target === first) {
        const previous = last.previousElementSibling as HTMLElement | null;
        previous?.focus();
      } else if (target === last) {
        const next = first.nextElementSibling as HTMLElement | null;
        next?.focus();
      }
    };

    first.addEventListener('focus', onFocus);
    last.addEventListener('focus', onFocus);
    return () => {
      first.removeEventListener('focus', onFocus);
      last.removeEventListener('focus', onFocus);
    };
  }, [active]);

  return (
    <>
      <span tabIndex={0} ref={startRef} style={{ position: 'fixed', opacity: 0 }} />
      {children}
      <span tabIndex={0} ref={endRef} style={{ position: 'fixed', opacity: 0 }} />
    </>
  );
};

export default FocusTrap;
