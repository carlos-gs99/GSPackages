import React from 'react';
import { GSInput, GSInputProps } from '@carlos-gs99/gs-input';

export interface GSDatePickerProps extends Omit<GSInputProps, 'type'> {}

export const GSDatePicker: React.FC<GSDatePickerProps> = (props) => {
  return <GSInput type="date" {...props} />;
};

export default GSDatePicker;

