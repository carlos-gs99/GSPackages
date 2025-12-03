# GSAvatar

Avatar component with image, initials fallback and states.

## Features

- 4 sizes: `sm`, `md`, `lg`, `xl`
- Image loading with fallback to initials
- 7 colors
- Multiple rounded options
- States (default, disabled, loading, error)
- WCAG AA compliant
- i18n support (EN/PT)

## Installation

```bash
npm install @carlos-gs99/gs-avatar
```

## Basic Usage

```tsx
import { GSAvatar } from '@carlos-gs99/gs-avatar';
import '@carlos-gs99/gs-avatar/styles.css';

<GSAvatar text="John Doe" src="/avatar.jpg" />
```

## Examples

### With Initials

```tsx
<GSAvatar text="John Doe" />
// Shows "JD"
```

### With Image

```tsx
<GSAvatar src="/avatar.jpg" alt="User avatar" />
```

### Different Sizes

```tsx
<GSAvatar text="JD" size="sm" />
<GSAvatar text="JD" size="lg" />
```

### Colors

```tsx
<GSAvatar text="JD" color="primary" />
<GSAvatar text="JD" color="success" />
```

### Shapes

```tsx
<GSAvatar text="JD" rounded="circle" />
<GSAvatar text="JD" rounded="md" />
```

## License

MIT - Carlos Braga

