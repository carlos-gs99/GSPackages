import React, { forwardRef, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import styles from './styles.module.css';
import type { GSLabelProps, GSLabelRef } from './types';
import { GS_LABEL_SIZES } from './types';
import { registerGSLabelI18n, GS_LABEL_NAMESPACE } from './i18n';

const GSLabelInner = ({
  children,
  htmlFor,
  required = false,
  disabled = false,
  reserved = false,
  helperText,
  size = 'sm',
  color,
  className,
  style,
  debug = false,
  ariaLabel,
  ...rest
}: GSLabelProps, ref: React.Ref<GSLabelRef>) => {
  const { t, i18n } = useTranslation(GS_LABEL_NAMESPACE);

  useEffect(() => {
    registerGSLabelI18n(i18n);
  }, [i18n]);

  const debugTools = useDebug('GSLabel', debug);
  useEffect(() => {
    debugTools.log('render', { htmlFor, required, disabled, reserved, size });
  }, [debugTools, htmlFor, required, disabled, reserved, size]);

  const resolvedSize = useMemo(() => (
    GS_LABEL_SIZES.includes(size) ? size : 'sm'
  ), [size]);

  const labelStyles = useMemo(() => ({
    ...style,
    ...(color ? { '--gs-label-color': color } : {}),
  }), [style, color]);

  const resolvedChildren = reserved ? '\u00A0' : children;
  const helperId = helperText ? `${htmlFor || 'gslabel'}-helper` : undefined;

  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={clsx(styles.label, className)}
      style={labelStyles as React.CSSProperties}
      data-gs="GSLabel"
      data-size={resolvedSize}
      data-required={required ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
      data-reserved={reserved ? 'true' : undefined}
      data-has-helper={helperText ? 'true' : undefined}
      data-debug={debug ? 'true' : undefined}
      aria-hidden={reserved ? 'true' : undefined}
      aria-label={ariaLabel}
      aria-describedby={helperId}
      {...rest}
    >
      {resolvedChildren}
      {required && !reserved && (
        <span className={styles.required} aria-label={t('requiredLabel')}>
          *
        </span>
      )}
      {helperText && !reserved && (
        <span className={styles.helper} id={helperId} role="note">
          ⓘ {helperText}
        </span>
      )}
    </label>
  );
};

export const GSLabel = forwardRef(GSLabelInner);
GSLabel.displayName = 'GSLabel';

export default GSLabel;

