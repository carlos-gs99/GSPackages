# GSPackages

Component library monorepo for internal use.

## Quick Start

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm test

# Run linting
npm run lint
```

## Packages

### Core Packages

- `@carlos-gs99/utils` - Utility functions
- `@carlos-gs99/hooks` - React hooks
- `@carlos-gs99/primitives` - Headless components
- `@carlos-gs99/theme` - Design tokens and CSS variables

### Component Packages

All components are prefixed with `gs-` and follow the same structure:

- `@carlos-gs99/gs-button` - Button component
- `@carlos-gs99/gs-input` - Input component
- `@carlos-gs99/gs-select` - Select component
- `@carlos-gs99/gs-table` - Table component
- And 34+ more components

See [Packages Checklist](docs/progress/PACKAGES-CHECKLIST.md) for complete list and status.

## Installation

```bash
# Install core packages
npm install @carlos-gs99/utils @carlos-gs99/hooks @carlos-gs99/theme

# Install specific components
npm install @carlos-gs99/gs-button @carlos-gs99/gs-input
```

## Usage

```tsx
import { GSButton } from '@carlos-gs99/gs-button';
import { GSInput } from '@carlos-gs99/gs-input';
import '@carlos-gs99/theme/tokens.css';

function App() {
  return (
    <div>
      <GSInput label="Name" />
      <GSButton>Submit</GSButton>
    </div>
  );
}
```

## Development

### Setup

```bash
# Install dependencies
npm install

# Build all packages
npm run build
```

### Available Scripts

```bash
npm run build              # Build all packages
npm run test               # Run all tests
npm run lint               # Lint code
npm run type-check         # TypeScript type checking
```

### CI Simulation

```bash
# Simulate CI workflows locally
.\simulate-ci.ps1

# Simulate publish workflow
.\simulate-publish.ps1
```

## Documentation

- [Packages Checklist](docs/progress/PACKAGES-CHECKLIST.md) - Status of all packages
- [Documentation Index](docs/README.md) - Complete documentation index
- [Development Guide](docs/DEVELOPMENT-GUIDE.md) - Development guidelines
- [Publishing Plan](docs/PUBLISHING-PLAN.md) - Publishing workflow

### Component Documentation

Each component has its own README.md with:
- Installation instructions
- Usage examples
- Props documentation
- Dependencies

## Project Structure

```
GSPackages/
├── gs-button/          # Component package
├── gs-input/           # Component package
├── utils/              # Core utilities package
├── hooks/              # Core hooks package
├── primitives/         # Core primitives package
├── theme/              # Design tokens package
├── docs/               # Documentation
└── tests/              # Shared test utilities
```

## Status

- **Total Packages:** 42 (4 base + 38 components)
- **Components Status:** 38/38 FULL (100%)
- **Test Coverage:** 38/38 components (100%)
- **CI/CD:** All workflows passing

See [Packages Checklist](docs/progress/PACKAGES-CHECKLIST.md) for detailed status.
