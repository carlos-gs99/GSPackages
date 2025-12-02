# Globalsoft Components

> 🎨 Modern, accessible, and fully-typed React component library

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)

---

## ✨ Features

- 🎯 **40+ Production-Ready Components** - Buttons, inputs, selects, tables, charts, and more
- ♿ **Accessibility First** - WCAG AA compliant with full keyboard navigation
- 🌐 **i18n Built-in** - Multi-language support with react-i18next
- 🎨 **Fully Themeable** - CSS variables and design tokens
- 📦 **Tree-Shakeable** - Import only what you need
- 🔧 **TypeScript Native** - 100% type coverage
- 🎭 **Zero Runtime Dependencies** - Lightweight and fast
- 📱 **Responsive** - Mobile-first design

---

## 📦 Packages

### Core Packages

| Package | Description |
|---------|-------------|
| [`@globalsoft/utils`](./utils) | Utility functions (debug, accessibility, dates, strings) |
| [`@globalsoft/hooks`](./hooks) | React hooks (translation, dropdown, autocomplete) |
| [`@globalsoft/primitives`](./primitives) | Headless components (ButtonBase, Overlay, FocusTrap) |
| [`@globalsoft/theme`](./theme) | Design tokens and CSS variables |

### UI Components

| Package | Description |
|---------|-------------|
| [`@globalsoft/gs-button`](./gs-button) | Button with variants, loading, ripple |
| [`@globalsoft/gs-input`](./gs-input) | Input with validation, decorators |
| [`@globalsoft/gs-select`](./gs-select) | Advanced select with search, multi-select |
| [`@globalsoft/gs-list`](./gs-list) | Versatile list component |
| [`@globalsoft/gs-table`](./gs-table) | Advanced data table with filters |
| [`@globalsoft/gs-chart`](./gs-chart) | Native SVG charts |

[**See all 40+ components →**](./docs/COMPONENTS.md)

---

## 🚀 Installation

```bash
# Install core packages
npm install @globalsoft/utils @globalsoft/hooks @globalsoft/theme

# Install components you need
npm install @globalsoft/gs-button @globalsoft/gs-input @globalsoft/gs-select
```

---

## 💻 Quick Start

```tsx
import { GSButton } from '@globalsoft/gs-button';
import { GSInput } from '@globalsoft/gs-input';
import '@globalsoft/theme/tokens.css';

function App() {
  return (
    <div>
      <GSInput 
        label="Email" 
        type="email" 
        clearable 
      />
      <GSButton 
        variant="solid" 
        color="primary" 
        ripple
      >
        Submit
      </GSButton>
    </div>
  );
}
```

---

## 🛠️ Development

### Setup

```bash
# Clone repository
git clone https://github.com/carlos-gs99/GSPackages.git
cd GSPackages

# Install dependencies
npm install

# Build all packages
npm run build
```

### Commands

```bash
npm run build              # Build all packages
npm run dev                # Watch mode
npm run test               # Run tests
npm run lint               # Lint code
```

---

## 📄 License

MIT © [Carlos Braga](mailto:carlos.braga@grupoglobalsoft.pt)

---

## 📬 Contact

- **Author:** Carlos Braga
- **Email:** carlos.braga@grupoglobalsoft.pt
- **GitHub:** [@carlos-gs99](https://github.com/carlos-gs99)
- **Issues:** [Report a bug](https://github.com/carlos-gs99/GSPackages/issues)

---

**Made with ❤️ by Globalsoft**

