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
| [`@carlos-gs99/utils`](./utils) | Utility functions (debug, accessibility, dates, strings) |
| [`@carlos-gs99/hooks`](./hooks) | React hooks (translation, dropdown, autocomplete) |
| [`@carlos-gs99/primitives`](./primitives) | Headless components (ButtonBase, Overlay, FocusTrap) |
| [`@carlos-gs99/theme`](./theme) | Design tokens and CSS variables |

### UI Components

| Package | Description |
|---------|-------------|
| [`@carlos-gs99/gs-icon`](./gs-icon) | Material Design Icons wrapper |
| [`@carlos-gs99/gs-badge`](./gs-badge) | Badge with counter and variants |
| [`@carlos-gs99/gs-button`](./gs-button) | Button with variants, loading, ripple (coming soon) |
| [`@carlos-gs99/gs-input`](./gs-input) | Input with validation, decorators (coming soon) |
| [`@carlos-gs99/gs-select`](./gs-select) | Advanced select with search, multi-select (coming soon) |
| [`@carlos-gs99/gs-table`](./gs-table) | Advanced data table with filters (coming soon) |

[**See all 40+ components →**](./docs/COMPONENTS.md)

---

## 🚀 Installation

```bash
# Install core packages
npm install @carlos-gs99/utils @carlos-gs99/hooks @carlos-gs99/theme

# Install components you need
npm install @carlos-gs99/gs-icon @carlos-gs99/gs-badge
```

---

## 💻 Quick Start

```tsx
import { GSIcon } from '@carlos-gs99/gs-icon';
import { GSBadge } from '@carlos-gs99/gs-badge';
import '@carlos-gs99/theme/tokens.css';

function App() {
  return (
    <div>
      <GSBadge badgeContent={5} color="danger">
        <GSIcon name="bell" size="lg" color="primary" />
      </GSBadge>
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

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs) folder:

- **[Guides](./docs/guides/)** - Setup, publishing, and configuration guides
- **[Progress](./docs/progress/)** - Migration progress and audit reports
- **[Historical](./docs/historical/)** - Past fixes and corrections

See [`docs/README.md`](./docs/README.md) for the complete index.

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

**Made by Globalsoft**

