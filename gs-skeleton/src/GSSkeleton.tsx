import React from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import { GS_SKELETON_NAMESPACE, registerGSSkeletonI18n } from './i18n';
import styles from './styles.module.css';
import type { GSSkeletonProps, GSSkeletonGroupProps } from './types';

export type { GSSkeletonProps, GSSkeletonGroupProps } from './types';

export const GSSkeleton: React.FC<GSSkeletonProps> & {
  Group: React.FC<GSSkeletonGroupProps>;
} = ({
  loading,
  children,
  variant = 'text',
  size = 'md',
  width,
  height,
  animation = 'wave',
  lines = 1,
  className,
  style,
  ...props
}) => {
  const debugTools = useDebug('GSSkeleton', false);
  const { t, i18n } = useTranslation(GS_SKELETON_NAMESPACE);
  
  React.useEffect(() => {
    registerGSSkeletonI18n(i18n);
  }, [i18n]);
  
  React.useEffect(() => {
    debugTools.log('render', { loading, variant, size, lines });
  }, [debugTools, loading, variant, size, lines]);
  
  if (!loading && children) {
    return <>{children}</>;
  }
  
  if (!loading && !children) {
    return null;
  }
  
  let inheritedClassName = '';
  let inheritedStyle: React.CSSProperties = {};
  let inheritedTag = 'div';
  
  if (children && React.isValidElement(children)) {
    inheritedClassName = (children.props as any).className || '';
    inheritedStyle = (children.props as any).style || {};
    inheritedTag = typeof children.type === 'string' ? children.type : 'div';
  }
  
  const skeletonClasses = clsx(
    styles.skeleton,
    styles[`skeleton--${variant}`],
    styles[`skeleton--${size}`],
    animation && styles[`skeleton--animation-${animation}`],
    inheritedClassName,
    className
  );
  
  const { width: _w, height: _h, ...safeInheritedStyle } = inheritedStyle;
  
  const skeletonStyle: React.CSSProperties = {
    ...safeInheritedStyle,
    ...style,
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
  };
  
  if (lines > 1) {
    const Component = inheritedTag as any;
    
    const getLineGap = () => {
      if (size === 'sm') return '0.35rem';
      if (size === 'lg') return '0.5rem';
      return '0.4rem';
    };
    
    const wrapperStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: getLineGap(),
      width: '100%',
      margin: safeInheritedStyle.margin,
      padding: safeInheritedStyle.padding,
    };
    
    return (
      <div style={wrapperStyle} className={inheritedClassName}>
        {Array.from({ length: lines }).map((_, index) => {
          const lineStyle = {
            width: index === lines - 1 ? '60%' : (width ? (typeof width === 'number' ? `${width}px` : width) : '100%'),
            ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
          };
          
          return (
            <Component
              key={index}
              className={clsx(skeletonClasses, styles.skeletonLine)}
              style={lineStyle}
              aria-label={t('aria.skeleton')}
              aria-busy="true"
              data-gs="GSSkeleton"
              data-variant={variant}
              data-size={size}
            />
          );
        })}
      </div>
    );
  }
  
  const Component = inheritedTag as any;
  
  return (
    <Component
      className={skeletonClasses}
      style={skeletonStyle}
      aria-label={t('aria.skeleton')}
      aria-busy="true"
      data-gs="GSSkeleton"
      data-variant={variant}
      data-size={size}
      {...props}
    />
  );
};

const GSSkeletonGroup: React.FC<GSSkeletonGroupProps> = ({
  children,
  direction = 'vertical',
  gap = 'md',
  className,
  ...props
}) => {
  const debugTools = useDebug('GSSkeletonGroup', false);
  const { t, i18n } = useTranslation(GS_SKELETON_NAMESPACE);
  
  React.useEffect(() => {
    registerGSSkeletonI18n(i18n);
  }, [i18n]);
  
  React.useEffect(() => {
    debugTools.log('render', { direction, gap });
  }, [debugTools, direction, gap]);
  
  const gapClass = ['sm', 'md', 'lg'].includes(gap as string)
    ? styles[`skeletonGroup--gap-${gap}`]
    : undefined;
  
  const groupClasses = clsx(
    styles.skeletonGroup,
    styles[`skeletonGroup--${direction}`],
    gapClass,
    className
  );
  
  const groupStyle: React.CSSProperties = {
    ...(!gapClass && gap && { gap }),
  };
  
  return (
    <div
      className={groupClasses}
      style={groupStyle}
      aria-label={t('aria.skeletonGroup')}
      data-gs="GSSkeletonGroup"
      {...props}
    >
      {children}
    </div>
  );
};

GSSkeletonGroup.displayName = 'GSSkeletonGroup';
GSSkeleton.Group = GSSkeletonGroup;

export { GSSkeletonGroup };
export default GSSkeleton;

