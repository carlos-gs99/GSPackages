import React from 'react';
import { GSIcon } from '@carlos-gs99/gs-icon';

export interface Step {
  label: string;
  optional?: boolean;
}

export interface GSStepperProps {
  steps: Step[];
  activeStep: number;
  className?: string;
}

export const GSStepper: React.FC<GSStepperProps> = ({ steps, activeStep, className }) => {
  return (
    <div className={className} data-gs="GSStepper">
      {steps.map((step, index) => (
        <div key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            background: index <= activeStep ? '#3b82f6' : '#e5e7eb',
            color: index <= activeStep ? '#fff' : '#6b7280',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.875rem',
            fontWeight: 500
          }}>
            {index < activeStep ? <GSIcon name="check" size="sm" /> : index + 1}
          </span>
          <span style={{ fontSize: '0.875rem', color: index === activeStep ? '#111' : '#6b7280' }}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default GSStepper;

