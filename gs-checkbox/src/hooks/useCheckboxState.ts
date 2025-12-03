import { useCallback, useMemo, useState } from 'react';

interface UseCheckboxStateOptions {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const useCheckboxState = ({
  checked,
  defaultChecked = false,
  onChange,
}: UseCheckboxStateOptions) => {
  const isControlled = typeof checked === 'boolean';
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked);

  const resolvedChecked = useMemo(
    () => (isControlled ? (checked as boolean) : internalChecked),
    [isControlled, checked, internalChecked],
  );

  const setChecked = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalChecked(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return {
    isControlled,
    checked: resolvedChecked,
    setChecked,
  };
};

