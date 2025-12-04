import React from 'react';
import { GSInput, GSInputProps } from '@carlos-gs99/gs-input';

export interface GSTimePickerProps extends Omit<GSInputProps, 'type'> {}

export const GSTimePicker: React.FC<GSTimePickerProps> = (props) => {
  return <GSInput type="time" {...props} />;
};

export default GSTimePicker;

