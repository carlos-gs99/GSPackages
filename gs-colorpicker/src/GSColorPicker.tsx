import React from 'react';
import { GSInput, GSInputProps } from '@carlos-gs99/gs-input';

export interface GSColorPickerProps extends Omit<GSInputProps, 'type'> {}

export const GSColorPicker: React.FC<GSColorPickerProps> = (props) => {
  return <GSInput type="color" {...props} />;
};

export default GSColorPicker;

