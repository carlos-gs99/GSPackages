import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import { GS_CARD_NAMESPACE, registerGSCardI18n } from './i18n';
import type { GSCardProps } from './types';
import styles from './styles.module.css';

const GSCard: React.FC<GSCardProps> = ({
  children,
  variant = 'default',
  color,
  size = 'md',
  className = '',
  onClick,
  debug = false,
  ...props
}) => {
  const { i18n } = useTranslation(GS_CARD_NAMESPACE);
  registerGSCardI18n(i18n);

  const debugTools = useDebug('GSCard', debug);

  useEffect(() => {
    debugTools.log('render', { variant, color, size });
  }, [debugTools, variant, color, size]);

  return (
    <div
      className={clsx(styles.card, className)}
      data-gs="GSCard"
      data-variant={variant}
      data-color={color}
      data-size={size}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export const GSCardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={clsx(styles.header, className)} data-gs-el="header">
    {children}
  </div>
);

export const GSCardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={clsx(styles.body, className)} data-gs-el="body">
    {children}
  </div>
);

export const GSCardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={clsx(styles.footer, className)} data-gs-el="footer">
    {children}
  </div>
);

const GSCardWithSubComponents = Object.assign(GSCard, {
  Header: GSCardHeader,
  Body: GSCardBody,
  Footer: GSCardFooter,
});

export { GSCardWithSubComponents as GSCard };
export default GSCardWithSubComponents;
