import React from 'react';

export type ButtonBaseProps<T extends React.ElementType = 'button'> = {
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as'>;

type ButtonBaseComponent = (<T extends React.ElementType = 'button'>(
  props: ButtonBaseProps<T> & { ref?: React.Ref<React.ElementRef<T>> },
) => React.ReactElement | null) & { displayName?: string };

const ButtonBaseInner = <T extends React.ElementType = 'button'>(
  { as: asComponent, children, ...props }: ButtonBaseProps<T>,
  ref: React.Ref<React.ElementRef<T>>,
) => {
  const Component = (asComponent ?? 'button') as React.ElementType;
  return (
    <Component ref={ref} {...(props as React.ComponentPropsWithoutRef<typeof Component>)}>
      {children}
    </Component>
  );
};

export const ButtonBase = React.forwardRef(ButtonBaseInner) as ButtonBaseComponent;

ButtonBase.displayName = 'ButtonBase';

export default ButtonBase;
