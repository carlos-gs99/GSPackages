# Globalsoft Components

> 🎨 Modern, accessible, and fully-typed React component library built with TypeScript and CSS Modules

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg)](https://pnpm.io/)
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
- 🧪 **Fully Tested** - Unit, integration, and E2E tests
- 📚 **Extensive Documentation** - Interactive playground and examples

---

## 📦 Packages

Globalsoft Components is organized as a monorepo with independent packages:

### Core Packages

| Package | Version | Description |
|---------|---------|-------------|
| [`@globalsoft/utils`](./packages/utils) | ![npm](https://img.shields.io/npm/v/@globalsoft/utils) | Utility functions (debug, accessibility, dates, strings) |
| [`@globalsoft/hooks`](./packages/hooks) | ![npm](https://img.shields.io/npm/v/@globalsoft/hooks) | React hooks (translation, dropdown, autocomplete) |
| [`@globalsoft/primitives`](./packages/primitives) | ![npm](https://img.shields.io/npm/v/@globalsoft/primitives) | Headless components (ButtonBase, Overlay, FocusTrap) |
| [`@globalsoft/theme`](./packages/theme) | ![npm](https://img.shields.io/npm/v/@globalsoft/theme) | Design tokens and CSS variables |

### UI Components

| Package | Version | Description |
|---------|---------|-------------|
| [`@globalsoft/gs-button`](./packages/gs-button) | ![npm](https://img.shields.io/npm/v/@globalsoft/gs-button) | Button with variants, loading, ripple |
| [`@globalsoft/gs-input`](./packages/gs-input) | ![npm](https://img.shields.io/npm/v/@globalsoft/gs-input) | Input with validation, decorators |
| [`@globalsoft/gs-select`](./packages/gs-select) | ![npm](https://img.shields.io/npm/v/@globalsoft/gs-select) | Advanced select with search, multi-select |
| [`@globalsoft/gs-list`](./packages/gs-list) | ![npm](https://img.shields.io/npm/v/@globalsoft/gs-list) | Versatile list component |
| [`@globalsoft/gs-table`](./packages/gs-table) | ![npm](https://img.shields.io/npm/v/@globalsoft/gs-table) | Advanced data table with filters |
| [`@globalsoft/gs-chart`](./packages/gs-chart) | ![npm](https://img.shields.io/npm/v/@globalsoft/gs-chart) | Native SVG charts (no dependencies) |

[**See all 40+ components →**](./docs/COMPONENTS.md)

---

## 🚀 Quick Start

### Installation

```bash
# Install core dependencies
npm install @globalsoft/utils @globalsoft/hooks @globalsoft/theme

# Install components you need
npm install @globalsoft/gs-button @globalsoft/gs-input @globalsoft/gs-select

# Or install everything (not recommended)
npm install @globalsoft/components
```

### Basic Usage

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
        validationState="success"
      />
      <GSButton 
        variant="solid" 
        color="primary" 
        loading={false}
        ripple
        gradient
      >
        Submit
      </GSButton>
    </div>
  );
}
```

---

## 📚 Documentation

- **[Component Showcase](https://carlos-gs99.github.io/GSPackages)** - Interactive playground
- **[Getting Started Guide](./docs/GETTING_STARTED.md)** - Installation and setup
- **[Component API](./docs/API.md)** - All props and types
- **[Theming Guide](./docs/THEMING.md)** - Customization and tokens
- **[Accessibility](./docs/ACCESSIBILITY.md)** - A11y features and compliance
- **[Migration Guide](./docs/MIGRATION.md)** - Upgrading between versions

---

## 🏗️ Architecture

### Design Principles

1. **Agnostic & Composable** - Zero framework dependencies
2. **Props-Only Configuration** - No render props or complex patterns
3. **CSS Modules + Tokens** - Scoped styles with design system
4. **i18n Per Component** - Isolated translations
5. **Accessibility Mandatory** - WCAG AA minimum
6. **Package-Ready** - Each component is self-contained

### Tech Stack

- **React 18+** - UI library
- **TypeScript 5+** - Type safety
- **CSS Modules** - Scoped styling
- **Vitest + Happy DOM** - Unit tests (90% coverage)
- **Playwright** - E2E tests
- **react-i18next** - Internationalization
- **pnpm** - Package manager
- **tsup** - Build tool
- **Changesets** - Release management

---

## 🎯 Philosophy

### Zero External UI Dependencies

Globalsoft Components has **zero dependencies** on external UI frameworks:
- ❌ No Base UI
- ❌ No MUI
- ❌ No Bootstrap
- ❌ No Chakra UI

Everything is built from scratch using:
- ✅ `@globalsoft/primitives` - Headless components
- ✅ CSS Modules - Scoped styles
- ✅ Design tokens - Consistent theming

### Package-Ready Architecture

Every component is designed to be:
- 📦 **Independently installable** - Install only what you need
- 🔗 **Properly isolated** - No circular dependencies
- 📝 **Well documented** - README + API docs
- 🧪 **Fully tested** - Unit + E2E tests
- ♿ **Accessible** - WCAG AA compliant

---

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup

```bash
# Clone repository
git clone https://github.com/carlos-gs99/GSPackages.git
cd GSPackages

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run docs site
pnpm docs:dev
```

### Commands

```bash
# Development
pnpm dev                    # Watch mode for all packages
pnpm docs:dev              # Run docs site

# Building
pnpm build                 # Build all packages
pnpm build:clean           # Clean + build

# Testing
pnpm test                  # Run all tests
pnpm test:coverage         # Coverage report
pnpm test:e2e             # E2E tests

# Linting
pnpm lint                  # Lint all packages
pnpm format               # Format code

# Release
pnpm changeset            # Create changeset
pnpm changeset:version    # Version packages
pnpm changeset:publish    # Publish to registry
```

---

## 📖 Package Structure

Each component package follows this structure:

```
@globalsoft/gs-button/
├── src/
│   ├── GSButton.tsx           # Main component
│   ├── GSButtonGroup.tsx      # Compound components
│   ├── types.ts               # TypeScript types
│   ├── styles.module.css      # CSS Modules
│   ├── i18n/                  # Translations
│   │   ├── en.json
│   │   └── pt.json
│   ├── __tests__/             # Tests
│   └── index.ts               # Public exports
├── package.json
├── tsup.config.ts
└── README.md
```

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](./CONTRIBUTING.md) before submitting PRs.

### Workflow

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Make changes
4. Run tests (`pnpm test`)
5. Create changeset (`pnpm changeset`)
6. Commit changes (`git commit -m 'feat: add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open Pull Request

---

## 📄 License

MIT © [Carlos Braga](mailto:carlos.braga@grupoglobalsoft.pt)

See [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

Built with ❤️ by the Globalsoft team.

- **Design System**: Inspired by Material Design and Joy UI
- **Testing**: Vitest, Playwright, Testing Library
- **Icons**: Material Design Icons (MDI)
- **Tooling**: pnpm, tsup, changesets

---

## 📬 Contact

- **Author:** Carlos Braga
- **Email:** carlos.braga@grupoglobalsoft.pt
- **GitHub:** [@carlos-gs99](https://github.com/carlos-gs99)
- **Issues:** [Report a bug](https://github.com/carlos-gs99/GSPackages/issues)

---

## 🗺️ Roadmap

- [x] Core packages (utils, hooks, primitives, theme)
- [x] 40+ UI components
- [x] Full accessibility (WCAG AA)
- [x] Comprehensive testing
- [ ] Storybook integration
- [ ] VS Code extension
- [ ] Figma design kit
- [ ] CLI for scaffolding

---

**Star ⭐ the repo if you find it useful!**


