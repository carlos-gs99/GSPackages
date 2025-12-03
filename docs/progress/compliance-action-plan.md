# Plano de Ação para Conformidade Total
## GSPackages Monorepo

**Objetivo:** Alcançar 100% de conformidade com regras GS Style  
**Status Atual:** 82%  
**Meta:** 100%  
**Prazo Sugerido:** 1-2 dias

---

## Fase 1: Correções Críticas (OBRIGATÓRIO)

### 1.1 Implementar Testes em gs-icon

**Tempo Estimado:** 2-3 horas

#### Criar Estrutura de Testes:
```bash
cd gs-icon
mkdir -p __tests__
```

#### Arquivos a Criar:

**`__tests__/GSIcon.test.tsx`** (Testes Unitários)
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GSIcon } from '../GSIcon';

describe('GSIcon', () => {
  describe('Basic Rendering', () => {
    it('renders icon with correct name', () => {
      render(<GSIcon name="home" />);
      const icon = screen.getByTestId('gs-icon');
      expect(icon).toBeInTheDocument();
    });

    it('applies size correctly', () => {
      render(<GSIcon name="home" size="lg" />);
      const icon = screen.getByTestId('gs-icon');
      expect(icon).toHaveAttribute('data-size', 'lg');
    });

    it('applies color correctly', () => {
      render(<GSIcon name="home" color="primary" />);
      const icon = screen.getByTestId('gs-icon');
      expect(icon).toHaveAttribute('data-color', 'primary');
    });
  });

  describe('Fallback Behavior', () => {
    it('shows fallback for missing icon', () => {
      render(<GSIcon name="nonexistent-icon" />);
      const fallback = screen.getByLabelText(/missing icon/i);
      expect(fallback).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has aria-hidden when decorative', () => {
      render(<GSIcon name="home" decorative />);
      const icon = screen.getByTestId('gs-icon');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('has aria-label when provided', () => {
      render(<GSIcon name="home" ariaLabel="Home icon" />);
      const icon = screen.getByLabelText('Home icon');
      expect(icon).toBeInTheDocument();
    });
  });
});
```

**`__tests__/GSIcon.a11y.test.tsx`** (Testes A11y)
```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { GSIcon } from '../GSIcon';

expect.extend(toHaveNoViolations);

describe('GSIcon A11y', () => {
  it('has no accessibility violations (decorative)', async () => {
    const { container } = render(<GSIcon name="home" decorative />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations (with label)', async () => {
    const { container } = render(
      <GSIcon name="home" ariaLabel="Home icon" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('meets WCAG AA contrast requirements', () => {
    // Test color contrast for various color tokens
    // Implementation depends on testing library
  });
});
```

**`__tests__/GSIcon.i18n.test.tsx`** (Testes i18n)
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { GSIcon } from '../GSIcon';
import enTranslations from '../i18n/en.json';
import ptTranslations from '../i18n/pt.json';

describe('GSIcon i18n', () => {
  beforeEach(() => {
    i18n.init({
      lng: 'en',
      resources: {
        en: { gsicon: enTranslations },
        pt: { gsicon: ptTranslations },
      },
    });
  });

  it('uses English translations', () => {
    i18n.changeLanguage('en');
    render(
      <I18nextProvider i18n={i18n}>
        <GSIcon name="nonexistent" />
      </I18nextProvider>
    );
    expect(screen.getByLabelText(/missing icon/i)).toBeInTheDocument();
  });

  it('uses Portuguese translations', () => {
    i18n.changeLanguage('pt');
    render(
      <I18nextProvider i18n={i18n}>
        <GSIcon name="nonexistent" />
      </I18nextProvider>
    );
    expect(screen.getByLabelText(/ícone em falta/i)).toBeInTheDocument();
  });

  it('falls back to default when translation missing', () => {
    i18n.changeLanguage('fr'); // Unsupported language
    render(
      <I18nextProvider i18n={i18n}>
        <GSIcon name="nonexistent" />
      </I18nextProvider>
    );
    // Should show English fallback
    expect(screen.getByLabelText(/missing icon/i)).toBeInTheDocument();
  });
});
```

---

### 1.2 Implementar Testes em gs-badge

**Tempo Estimado:** 2-3 horas

Seguir mesma estrutura de gs-icon adaptada para GSBadge:
- [ ] `__tests__/GSBadge.test.tsx`
- [ ] `__tests__/GSBadge.a11y.test.tsx`
- [ ] `__tests__/GSBadge.i18n.test.tsx`

**Casos Específicos GSBadge:**
- Contador com max
- showZero behavior
- anchorOrigin positions
- badgeInset custom
- variant="dot"
- invisible prop

---

### 1.3 Setup de Testes E2E (Playwright)

**Tempo Estimado:** 1 hora

#### Instalar Playwright:
```bash
cd GSPackages
npm install -D @playwright/test
npx playwright install
```

#### Criar Configuração:
**`playwright.config.ts`**
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000', // Adjust as needed
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

#### Criar Testes E2E:
**`tests/e2e/components/gsicon.spec.ts`**
```typescript
import { test, expect } from '@playwright/test';

test.describe('GSIcon E2E', () => {
  test('renders icon correctly', async ({ page }) => {
    await page.goto('/gs-dev/icon'); // Adjust URL
    
    const icon = page.locator('[data-gs="GSIcon"]').first();
    await expect(icon).toBeVisible();
  });

  test('changes size on interaction', async ({ page }) => {
    await page.goto('/gs-dev/icon');
    
    const largeIcon = page.locator('[data-size="lg"]').first();
    await expect(largeIcon).toBeVisible();
    
    // Visual regression test
    await expect(page).toHaveScreenshot('icon-large.png');
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/gs-dev/icon');
    
    await page.keyboard.press('Tab');
    // Test focus management
  });
});
```

---

### 1.4 Configurar Vitest

**Tempo Estimado:** 30 minutos

#### Atualizar `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.config.ts',
        '**/*.d.ts',
        '**/css-modules.d.ts',
      ],
    },
    passWithNoTests: true,
  },
});
```

#### Criar Setup File:
**`tests/setup.ts`**
```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});
```

#### Instalar Dependências:
```bash
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest-axe jest-axe
```

---

## Fase 2: Correções Importantes (RECOMENDADO)

### 2.1 Corrigir Emojis no README

**Tempo Estimado:** 5 minutos

**`README.md` (linha 133):**
```diff
- **Made with ❤️ by Globalsoft**
+ **Made by Globalsoft**
```

### 2.2 Atualizar Scope no README

**Tempo Estimado:** 10 minutos

**`README.md` (linhas 31-45):**
```diff
- [`@globalsoft/utils`](./utils)
+ [`@carlos-gs99/utils`](./utils)

- [`@globalsoft/hooks`](./hooks)
+ [`@carlos-gs99/hooks`](./hooks)

- npm install @globalsoft/utils @globalsoft/hooks @globalsoft/theme
+ npm install @carlos-gs99/utils @carlos-gs99/hooks @carlos-gs99/theme

- import { GSButton } from '@globalsoft/gs-button';
+ import { GSButton } from '@carlos-gs99/gs-button';
```

### 2.3 Adicionar TSDoc Completo

**Tempo Estimado:** 1 hora por componente

**Exemplo `gs-icon/types.ts`:**
```typescript
/**
 * GSIcon component for rendering Material Design Icons with Joy UI sizing
 * 
 * @example
 * Basic usage
 * ```tsx
 * <GSIcon name="home" size="md" color="primary" />
 * ```
 * 
 * @example
 * Decorative icon (hidden from screen readers)
 * ```tsx
 * <GSIcon name="check" decorative />
 * ```
 * 
 * @see {@link https://materialdesignicons.com} for available icon names
 */
export interface GSIconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * MDI icon name (with or without 'mdi-' prefix)
   * 
   * @example "home", "mdi-home"
   */
  name: string;

  /**
   * Icon size using Joy scale or custom CSS value
   * 
   * @default 'md'
   * @example 'lg', '32px', '2rem', 48
   */
  size?: GSIconSize;

  /**
   * Icon color using GS tokens or custom CSS value
   * 
   * @default 'currentColor'
   * @example 'primary', '#ff0000', 'rgb(255, 0, 0)'
   */
  color?: GSIconColor;

  /**
   * Marks icon as decorative (aria-hidden="true")
   * Use when icon is purely visual and has no semantic meaning
   * 
   * @default undefined
   */
  decorative?: boolean;

  /**
   * Accessible label for screen readers
   * Required when icon is not decorative
   * 
   * @example "Home icon", "Navigate to home page"
   */
  ariaLabel?: string;

  /**
   * Manual override for aria-hidden attribute
   * 
   * @default undefined
   */
  ariaHidden?: boolean;

  /**
   * Enable debug mode with console logs and data attributes
   * 
   * @default false
   */
  debug?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;
}
```

---

## Fase 3: Melhorias Opcionais (RECOMENDADO)

### 3.1 Adicionar Pasta docs/

**Tempo Estimado:** 2 horas por componente

**`gs-icon/docs/TESTING.md`**
```markdown
# GSIcon Testing Guide

## Unit Tests

Run with:
```bash
npm run test:unit -- gs-icon
```

Coverage target: 80%+

## A11y Tests

All tests use vitest-axe for WCAG AA compliance.

Key checks:
- ARIA labels present when not decorative
- Color contrast ratios meet standards
- Keyboard navigation support

## i18n Tests

Tests cover:
- EN/PT translations
- Fallback behavior
- Dynamic language switching

## E2E Tests

Playwright tests in `tests/e2e/components/gsicon.spec.ts`.

Run with:
```bash
npm run test:e2e
```
```

**`gs-icon/docs/PERFORMANCE.md`**
```markdown
# GSIcon Performance

## Bundle Size

- ESM: ~2.5 KB (gzipped)
- CJS: ~2.8 KB (gzipped)
- CSS: ~1.2 KB (gzipped)

Total: ~4-5 KB

## Optimizations

- Tree-shakeable exports
- Zero runtime dependencies
- Memoized icon lookups
- Lazy-loaded icon paths

## Benchmarks

Render performance (1000 icons):
- Initial: ~15ms
- Re-render: ~3ms
```

### 3.2 Adicionar Storybook

**Tempo Estimado:** 3 horas (setup inicial + stories)

#### Instalar Storybook:
```bash
npx storybook@latest init
```

#### Criar Stories:
**`gs-icon/__stories__/GSIcon.stories.tsx`**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { GSIcon } from '../GSIcon';

const meta: Meta<typeof GSIcon> = {
  title: 'Components/GSIcon',
  component: GSIcon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof GSIcon>;

export const Default: Story = {
  args: {
    name: 'home',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <GSIcon name="home" size="xs" />
      <GSIcon name="home" size="sm" />
      <GSIcon name="home" size="md" />
      <GSIcon name="home" size="lg" />
      <GSIcon name="home" size="xl" />
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <GSIcon name="heart" color="primary" />
      <GSIcon name="heart" color="secondary" />
      <GSIcon name="heart" color="success" />
      <GSIcon name="heart" color="warning" />
      <GSIcon name="heart" color="danger" />
    </div>
  ),
};
```

---

## Fase 4: Atualização de Scripts

### 4.1 Adicionar Scripts de Teste

**`package.json` (raiz):**
```json
{
  "scripts": {
    "test:unit": "vitest run",
    "test:unit:watch": "vitest",
    "test:unit:coverage": "vitest run --coverage",
    "test:a11y": "vitest run --grep=\"a11y\"",
    "test:i18n": "vitest run --grep=\"i18n\"",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:all": "npm run test:unit && npm run test:e2e"
  }
}
```

### 4.2 Atualizar CI/CD

**`.github/workflows/ci.yml`:**
```yaml
test:
  name: Test
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build packages
      run: npm run build
    
    - name: Run unit tests
      run: npm run test:unit
    
    - name: Run A11y tests
      run: npm run test:a11y
    
    - name: Run i18n tests
      run: npm run test:i18n
    
    - name: Generate coverage
      run: npm run test:unit:coverage
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        files: ./coverage/coverage-final.json
```

---

## Checklist de Execução

### Fase 1 (CRÍTICO):
- [ ] Instalar dependências de teste
- [ ] Configurar Vitest + Happy DOM
- [ ] Criar `tests/setup.ts`
- [ ] Implementar testes unitários gs-icon
- [ ] Implementar testes A11y gs-icon
- [ ] Implementar testes i18n gs-icon
- [ ] Implementar testes unitários gs-badge
- [ ] Implementar testes A11y gs-badge
- [ ] Implementar testes i18n gs-badge
- [ ] Configurar Playwright
- [ ] Criar testes E2E básicos
- [ ] Validar cobertura 80%+
- [ ] CI/CD passando 100%

### Fase 2 (IMPORTANTE):
- [ ] Remover emoji do README.md
- [ ] Atualizar scope @carlos-gs99
- [ ] Adicionar TSDoc completo em types.ts

### Fase 3 (OPCIONAL):
- [ ] Criar pasta docs/
- [ ] Adicionar TESTING.md
- [ ] Adicionar PERFORMANCE.md (se aplicável)
- [ ] Configurar Storybook
- [ ] Criar stories básicas

### Fase 4:
- [ ] Adicionar scripts de teste
- [ ] Atualizar CI/CD com novos jobs
- [ ] Configurar code coverage

---

## Tempo Total Estimado

| Fase | Tempo | Prioridade |
|------|-------|------------|
| Fase 1 | 6-8h | CRÍTICO |
| Fase 2 | 1-2h | IMPORTANTE |
| Fase 3 | 5-6h | OPCIONAL |
| Fase 4 | 1h | IMPORTANTE |

**Total:** 13-17 horas (1-2 dias de trabalho)

---

## Template Reutilizável

Após completar Fase 1, teremos um **template reutilizável** para todos os próximos componentes:

1. Copiar estrutura de testes de gs-icon
2. Adaptar casos específicos do componente
3. Executar `npm run test:unit`
4. Validar cobertura 80%+
5. Commit e CI/CD

**Benefício:** Próximos componentes levam ~1h para testes completos!

---

## Próximo Passo Imediato

**Escolher uma das opções:**

**A) Implementar testes primeiro (RECOMENDADO)**
- Cria template reutilizável
- Garante qualidade desde o início
- Próximos componentes serão mais rápidos

**B) Continuar migração e testar depois**
- Mais componentes rapidamente
- Maior risco de bugs não detectados
- Trabalho acumulado no final

**Recomendação:** Opção A - Investir tempo agora para economizar depois

---

**Última atualização:** 2025-12-03

