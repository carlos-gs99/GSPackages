# @carlos-gs99/gs-stepper

Stepper component for multi-step wizards with visual progress indicators.

## Installation

```bash
npm install @carlos-gs99/gs-stepper
```

## Basic Usage

```tsx
import { GSStepper } from '@carlos-gs99/gs-stepper';

function MyWizard() {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' },
  ];

  return (
    <GSStepper
      steps={steps}
      activeStep={activeStep}
    />
  );
}
```

## Features

- ✅ Visual progress indicators
- ✅ Completed step checkmarks (GSIcon)
- ✅ Active step highlighting
- ✅ Optional step labels
- ✅ GSIcon integration
- ✅ TypeScript types

## Examples

### With Optional Steps

```tsx
const steps = [
  { label: 'Required Step 1' },
  { label: 'Optional Step', optional: true },
  { label: 'Required Step 2' },
];

<GSStepper steps={steps} activeStep={1} />
```

### Multi-Step Wizard

```tsx
function Wizard() {
  const [step, setStep] = useState(0);
  const steps = [
    { label: 'Personal Info' },
    { label: 'Contact Details' },
    { label: 'Review' },
  ];

  return (
    <>
      <GSStepper steps={steps} activeStep={step} />
      {/* Wizard content based on step */}
      <button onClick={() => setStep(step + 1)}>Next</button>
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `Step[]` | - | Array of step definitions |
| `activeStep` | `number` | - | Current active step (0-indexed) |
| `className` | `string` | - | Additional CSS class |

### Step

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Step label text |
| `optional` | `boolean` | `false` | Mark step as optional |

## Dependencies

### Peer Dependencies
- `react ^18.0.0`
- `@carlos-gs99/gs-icon ^1.0.0`

## License

MIT © Carlos Braga

