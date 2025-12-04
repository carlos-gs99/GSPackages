# @carlos-gs99/gs-datepicker

Simple date picker component (wrapper for GSInput with type="date").

NOTE: This is a simplified version. For advanced calendar features, use `GSDatePickerNative` from the legacy codebase.

## Installation

```bash
npm install @carlos-gs99/gs-datepicker
```

## Usage

```tsx
import React, { useState } from 'react';
import { GSDatePicker } from '@carlos-gs99/gs-datepicker';

function EventForm() {
  const [date, setDate] = useState('2025-12-04');

  return (
    <GSDatePicker
      value={date}
      onChange={setDate}
      label="Event Date"
      required
    />
  );
}
```

