import React, { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import { GSIcon } from '@carlos-gs99/gs-icon';
import { GSLoading } from '@carlos-gs99/gs-loading';
import { GS_CARD_NAMESPACE, registerGSCardI18n } from './i18n';
import type { GSCardProps, GSCardImageProps } from './types';
import styles from './styles.module.css';

const GSCard: React.FC<GSCardProps> = ({
  children,
  variant = 'default',
  color,
  size = 'md',
  className = '',
  onClick,
  collapsible = false,
  defaultCollapsed = false,
  collapsed: controlledCollapsed,
  onCollapseChange,
  loading = false,
  loadingText,
  interactive = false,
  image,
  imageAlt,
  imagePosition = 'top',
  debug = false,
  ...props
}) => {
  const { t, i18n } = useTranslation(GS_CARD_NAMESPACE);
  registerGSCardI18n(i18n);

  const debugTools = useDebug('GSCard', debug);
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  
  const isControlled = controlledCollapsed !== undefined;
  const isCollapsed = isControlled ? controlledCollapsed : internalCollapsed;

  useEffect(() => {
    debugTools.log('render', { variant, color, size, collapsible, loading, interactive });
  }, [debugTools, variant, color, size, collapsible, loading, interactive]);

  const handleToggleCollapse = useCallback(() => {
    if (!collapsible) return;
    
    const newState = !isCollapsed;
    if (!isControlled) {
      setInternalCollapsed(newState);
    }
    onCollapseChange?.(newState);
  }, [collapsible, isCollapsed, isControlled, onCollapseChange]);

  const cardContent = (
    <>
      {image && <GSCardImage src={image} alt={imageAlt} position={imagePosition} />}
      {children}
    </>
  );

  return (
    <div
      className={clsx(
        styles.card,
        interactive && styles.interactive,
        collapsible && styles.collapsible,
        isCollapsed && styles.collapsed,
        image && styles[`withImage-${imagePosition}`],
        className
      )}
      data-gs="GSCard"
      data-variant={variant}
      data-color={color}
      data-size={size}
      data-interactive={interactive ? 'true' : undefined}
      data-collapsible={collapsible ? 'true' : undefined}
      data-collapsed={isCollapsed ? 'true' : undefined}
      data-loading={loading ? 'true' : undefined}
      onClick={onClick}
      {...props}
    >
      {collapsible && (
        <button
          className={styles.collapseButton}
          onClick={handleToggleCollapse}
          aria-label={isCollapsed ? t('aria.expand') : t('aria.collapse')}
          aria-expanded={!isCollapsed}
          data-gs-el="collapse-toggle"
          type="button"
        >
          <GSIcon 
            name={isCollapsed ? 'chevron-down' : 'chevron-up'} 
            size="sm"
            decorative
          />
        </button>
      )}
      
      {loading ? (
        <GSLoading mode="section" message={loadingText || t('loading')} />
      ) : (
        cardContent
      )}
    </div>
  );
};

export const GSCardImage: React.FC<GSCardImageProps> = ({ 
  src, 
  alt = '', 
  position = 'top',
  className 
}) => (
  <div 
    className={clsx(styles.imageContainer, className)} 
    data-gs-el="image"
    data-position={position}
  >
    <img 
      src={src} 
      alt={alt} 
      className={styles.image}
      loading="lazy"
    />
  </div>
);

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
  Image: GSCardImage,
});

export { GSCardWithSubComponents as GSCard };
export default GSCardWithSubComponents;
