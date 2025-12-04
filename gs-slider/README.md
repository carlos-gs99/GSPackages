# @carlos-gs99/gs-slider

Accessible range slider component with marks, tooltips and keyboard navigation.

## Installation

```bash
npm install @carlos-gs99/gs-slider
```

## Usage

```tsx
import React, { useState } from 'react';
import { GSSlider } from '@carlos-gs99/gs-slider';

function VolumeControl() {
  const [volume, setVolume] = useState(50);

  return (
    <GSSlider
      value={volume}
      onChange={setVolume}
      min={0}
      max={100}
      step={5}
      marks
      showValue
      color="primary"
      size="md"
    />
  );
}
```

## Features

- **Controlled/Uncontrolled**: Supports both modes
- **Marks**: Show step indicators
- **Keyboard Navigation**: Arrow keys, Home, End
- **Touch Support**: Works on mobile devices
- **Accessibility**: ARIA attributes, screen reader support
- **i18n**: EN/PT translations
- **Debug Mode**: Built-in logging

