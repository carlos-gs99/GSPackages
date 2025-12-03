import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import type { GSButtonGroupProps, GSButtonProps } from './types';

type GroupPosition = 'single' | 'first' | 'middle' | 'last';

const resolvePosition = (index: number, total: number): GroupPosition => {
  if (total <= 1) return 'single';
  if (index === 0) return 'first';
  if (index === total - 1) return 'last';
  return 'middle';
};

export const GSButtonGroup: React.FC<GSButtonGroupProps> = ({
  children,
  variant,
  color,
  size,
  orientation = 'horizontal',
  spacing = 'none',
  fullWidth = false,
  className,
  ...rest
}) => {
  const validChildren = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<GSButtonProps>[];
  const total = validChildren.length;

  let currentIndex = -1;
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement<GSButtonProps>(child)) {
      return child;
    }

    currentIndex += 1;
    const position = resolvePosition(currentIndex, total);

    const baseProps: Record<string, unknown> = {
      className: clsx(styles.groupItem, child.props.className),
      'data-group-orientation': orientation,
    };

    if (position !== 'single') {
      baseProps['data-group-position'] = position;
    }

    if (spacing === 'none') {
      baseProps['data-group-spacing'] = 'none';
    }

    if (variant && child.props.variant === undefined) {
      baseProps.variant = variant;
    }

    if (color && child.props.color === undefined) {
      baseProps.color = color;
    }

    if (size && child.props.size === undefined) {
      baseProps.size = size;
    }

    if (fullWidth && orientation === 'vertical' && child.props.fullWidth === undefined) {
      baseProps.fullWidth = true;
    }

    return React.cloneElement(child, baseProps);
  });

  const groupClassName = clsx(
    styles.group,
    orientation === 'vertical' && styles.groupVertical,
    spacing === 'sm' && styles.groupSpacingSm,
    spacing === 'md' && styles.groupSpacingMd,
    spacing === 'none' && styles.groupNoSpacing,
    fullWidth && styles.groupFullWidth,
    className
  );

  return (
    <div
      role="group"
      className={groupClassName}
      data-orientation={orientation}
      data-spacing={spacing}
      {...rest}
    >
      {enhancedChildren}
    </div>
  );
};

export default GSButtonGroup;

