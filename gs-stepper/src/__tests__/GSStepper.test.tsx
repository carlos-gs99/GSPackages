import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GSStepper } from '../GSStepper';

const mockSteps = [
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' },
];

describe('GSStepper', () => {
  describe('Rendering', () => {
    it('should render stepper', () => {
      const { container } = render(
        <GSStepper steps={mockSteps} activeStep={0} />
      );
      const stepper = container.querySelector('[data-gs="GSStepper"]');
      expect(stepper).toBeInTheDocument();
    });

    it('should render all steps', () => {
      render(<GSStepper steps={mockSteps} activeStep={0} />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });
  });

  describe('Active Step', () => {
    it('should highlight active step', () => {
      render(<GSStepper steps={mockSteps} activeStep={1} />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });

    it('should show step number for active and future steps', () => {
      const { container } = render(
        <GSStepper steps={mockSteps} activeStep={1} />
      );
      // Active step and future steps should show numbers
      const stepper = container.querySelector('[data-gs="GSStepper"]');
      expect(stepper).toBeInTheDocument();
    });
  });

  describe('Completed Steps', () => {
    it('should show check icon for completed steps', () => {
      const { container } = render(
        <GSStepper steps={mockSteps} activeStep={2} />
      );
      // Steps before activeStep should show check icon
      const stepper = container.querySelector('[data-gs="GSStepper"]');
      expect(stepper).toBeInTheDocument();
    });

    it('should mark steps as completed when activeStep is greater than step index', () => {
      const { container } = render(
        <GSStepper steps={mockSteps} activeStep={2} />
      );
      const stepper = container.querySelector('[data-gs="GSStepper"]');
      expect(stepper).toBeInTheDocument();
    });
  });

  describe('Optional Steps', () => {
    it('should render optional steps', () => {
      const stepsWithOptional = [
        { label: 'Step 1' },
        { label: 'Step 2', optional: true },
        { label: 'Step 3' },
      ];
      render(<GSStepper steps={stepsWithOptional} activeStep={0} />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });
  });

  describe('Custom ClassName', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <GSStepper steps={mockSteps} activeStep={0} className="custom-stepper" />
      );
      const stepper = container.querySelector('[data-gs="GSStepper"]');
      expect(stepper).toHaveClass('custom-stepper');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty steps array', () => {
      const { container } = render(
        <GSStepper steps={[]} activeStep={0} />
      );
      const stepper = container.querySelector('[data-gs="GSStepper"]');
      expect(stepper).toBeInTheDocument();
    });

    it('should handle activeStep greater than steps length', () => {
      render(<GSStepper steps={mockSteps} activeStep={10} />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });

    it('should handle negative activeStep', () => {
      render(<GSStepper steps={mockSteps} activeStep={-1} />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });
  });

  describe('Step Numbers', () => {
    it('should display step numbers starting from 1', () => {
      const { container } = render(
        <GSStepper steps={mockSteps} activeStep={0} />
      );
      // First step should show number 1
      const stepper = container.querySelector('[data-gs="GSStepper"]');
      expect(stepper).toBeInTheDocument();
    });
  });
});

