import { useCallback, useState } from 'react';

export interface UseRadioStateOptions<TValue> {
  checked?: boolean;
  defaultChecked?: boolean;
  value: TValue;
  onChange?: (value: TValue, checked: boolean) => void;
}

export const useRadioState = <TValue,>({
  checked,
  defaultChecked = false,
  value,
  onChange,
}: UseRadioStateOptions<TValue>) => {
  const isControlled = typeof checked === 'boolean';
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked);

  const resolvedChecked = isControlled ? (checked as boolean) : internalChecked;

  const setChecked = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalChecked(next);
      }
      onChange?.(value, next);
    },
    [isControlled, onChange, value],
  );

  return {
    isControlled,
    checked: resolvedChecked,
    setChecked,
  };
};

