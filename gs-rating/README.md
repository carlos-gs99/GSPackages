# @carlos-gs99/gs-rating

Accessible star rating component with half-stars, hover effects and validation.

## Installation

```bash
npm install @carlos-gs99/gs-rating
```

## Usage

```tsx
import React, { useState } from 'react';
import { GSRating } from '@carlos-gs99/gs-rating';

function ProductReview() {
  const [rating, setRating] = useState(0);

  return (
    <GSRating
      value={rating}
      onChange={setRating}
      max={5}
      size="md"
      color="warning"
    />
  );
}
```

## Features

- **Controlled/Uncontrolled**: Supports both modes
- **Half-stars**: Precision control (1 = full, 0.5 = half)
- **Hover Effects**: Visual feedback
- **Custom Icons**: Replace default stars
- **Accessibility**: ARIA labels, keyboard navigation
- **i18n**: EN/PT translations
- **Debug Mode**: Built-in logging

