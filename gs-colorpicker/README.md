# @carlos-gs99/gs-colorpicker

Simple color picker component (wrapper for GSInput with type="color").

## Installation

```bash
npm install @carlos-gs99/gs-colorpicker
```

## Usage

```tsx
import React, { useState } from 'react';
import { GSColorPicker } from '@carlos-gs99/gs-colorpicker';

function ThemeCustomizer() {
  const [color, setColor] = useState('#3b82f6');

  return (
    <GSColorPicker
      value={color}
      onChange={setColor}
      label="Primary Color"
    />
  );
}
```

