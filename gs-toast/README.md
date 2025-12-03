# GSToast

Toast notification component with auto-hide and positioning.

## Installation

```bash
npm install @carlos-gs99/gs-toast
```

## Usage

```tsx
import { GSToast } from '@carlos-gs99/gs-toast';

const [open, setOpen] = useState(false);

<GSToast open={open} onClose={() => setOpen(false)}>
  Operation successful!
</GSToast>
```

## License

MIT - Carlos Braga

