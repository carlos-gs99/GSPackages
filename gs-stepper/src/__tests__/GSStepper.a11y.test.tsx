import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { GSStepper } from '../GSStepper';

expect.extend(toHaveNoViolations);

const mockSteps = [
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' },
];

describe('GSStepper - Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should be accessible', () => {
      const { container } = render(
        <GSStepper steps={mockSteps} activeStep={0} />
      );
      const stepper = container.querySelector('[data-gs="GSStepper"]');
      expect(stepper).toBeInTheDocument();
    });
  });

  describe('Screen Reader Support', () => {
    it('should be readable by screen readers', () => {
      render(<GSStepper steps={mockSteps} activeStep={0} />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });

    it('should show step labels clearly', () => {
      render(<GSStepper steps={mockSteps} activeStep={1} />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with basic stepper', async () => {
      const { container } = render(
        <GSStepper steps={mockSteps} activeStep={0} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with active step', async () => {
      const { container } = render(
        <GSStepper steps={mockSteps} activeStep={1} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with completed steps', async () => {
      const { container } = render(
        <GSStepper steps={mockSteps} activeStep={2} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with optional steps', async () => {
      const stepsWithOptional = [
        { label: 'Step 1' },
        { label: 'Step 2', optional: true },
        { label: 'Step 3' },
      ];
      const { container } = render(
        <GSStepper steps={stepsWithOptional} activeStep={1} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with custom className', async () => {
      const { container } = render(
        <GSStepper steps={mockSteps} activeStep={0} className="custom-stepper" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

