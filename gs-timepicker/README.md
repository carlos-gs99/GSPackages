# @carlos-gs99/gs-timepicker

Simple time picker component (wrapper for GSInput with type="time").

## Installation

```bash
npm install @carlos-gs99/gs-timepicker
```

## Usage

```tsx
import React, { useState } from 'react';
import { GSTimePicker } from '@carlos-gs99/gs-timepicker';

function AppointmentForm() {
  const [time, setTime] = useState('09:00');

  return (
    <GSTimePicker
      value={time}
      onChange={setTime}
      label="Appointment Time"
      required
    />
  );
}
```

