import React from 'react';
import { useDropdown } from '@carlos-gs99/hooks';
import { GSList } from '@carlos-gs99/gs-list';

export interface GSDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
}

export const GSDropdown: React.FC<GSDropdownProps> = ({ trigger, children, align = 'start' }) => {
  const dropdown = useDropdown({ align });
  
  return (
    <div data-gs="GSDropdown">
      <div {...dropdown.triggerProps} ref={dropdown.triggerRef as any}>
        {trigger}
      </div>
      {dropdown.renderMenu(
        <GSList variant="plain">
          {children}
        </GSList>
      )}
    </div>
  );
};

GSDropdown.displayName = 'GSDropdown';
export default GSDropdown;

