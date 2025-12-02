# @gs-style/primitives

> 🎨 Headless primitive components for building accessible UI - ButtonBase, Overlay, FocusTrap, Popper

## Visão Geral

O package `@gs-style/primitives` fornece componentes primitivos headless (sem estilos) que servem como base para construir componentes GS Style. Cada primitivo foca em **comportamento e acessibilidade**, deixando o visual totalmente por conta dos estilos CSS.

## 📦 Instalação

```bash
npm install @gs-style/primitives
# ou
yarn add @gs-style/primitives
# ou
pnpm add @gs-style/primitives
```

## 🚀 Quick Start

```typescript
import { ButtonBase, Overlay, FocusTrap, Popper } from '@gs-style/primitives';

// ButtonBase - Base para botões acessíveis
<ButtonBase onClick={handleClick}>
  Click me
</ButtonBase>

// Overlay - Backdrop para modais/dropdowns
<Overlay isOpen={isOpen} onClose={onClose} />

// FocusTrap - Trap focus dentro de elementos
<FocusTrap active={isOpen}>
  <div>Modal content</div>
</FocusTrap>

// Popper - Posicionamento inteligente
<Popper anchorEl={anchorRef.current} open={isOpen}>
  <div>Dropdown content</div>
</Popper>
```

---

## 🎨 Componentes Primitivos

### 1. ButtonBase

Base headless para botões com acessibilidade completa.

**Features:**
- ✅ Suporte polimórfico (`as` prop)
- ✅ ARIA attributes automáticos
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Disabled state handling

**Uso:**
```typescript
import { ButtonBase } from '@gs-style/primitives';

// Como botão
<ButtonBase onClick={handleClick} disabled={isDisabled}>
  Click me
</ButtonBase>

// Como link
<ButtonBase as="a" href="https://example.com">
  External link
</ButtonBase>

// Com componente customizado
<ButtonBase as={CustomComponent} customProp="value">
  Custom element
</ButtonBase>
```

**Props:**
- `as?: React.ElementType` - Elemento a renderizar (default: 'button')
- `disabled?: boolean` - Estado desabilitado
- `onClick?: (e: React.MouseEvent) => void` - Click handler
- Todas as props nativas do elemento subjacente

---

### 2. Overlay

Backdrop semi-transparente para modais, dropdowns e off-canvas.

**Features:**
- ✅ Click outside to close
- ✅ ESC key to close
- ✅ Animação de fade
- ✅ Z-index management
- ✅ Portal rendering

**Uso:**
```typescript
import { Overlay } from '@gs-style/primitives';

<Overlay 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)}
  zIndex={1000}
  className="custom-overlay"
/>
```

**Props:**
- `isOpen: boolean` - Estado do overlay
- `onClose: () => void` - Callback ao fechar
- `zIndex?: number` - Z-index customizado
- `className?: string` - Classes CSS adicionais
- `disableClickOutside?: boolean` - Desabilitar fechar ao clicar fora
- `disableEscKey?: boolean` - Desabilitar fechar com ESC

---

### 3. FocusTrap

Trap de foco para modais e menus (mantém foco dentro do elemento).

**Features:**
- ✅ Tab navigation trapped
- ✅ Auto focus primeiro elemento
- ✅ Restore focus ao fechar
- ✅ Skip hidden elements
- ✅ Accessibility compliant

**Uso:**
```typescript
import { FocusTrap } from '@gs-style/primitives';

const Modal = ({ isOpen }) => (
  <FocusTrap active={isOpen}>
    <div role="dialog">
      <button>First focusable</button>
      <input />
      <button>Last focusable</button>
    </div>
  </FocusTrap>
);
```

**Props:**
- `active: boolean` - Ativar/desativar trap
- `children: React.ReactNode` - Conteúdo a envolver
- `initialFocus?: HTMLElement` - Elemento para focar inicialmente
- `restoreFocus?: boolean` - Restaurar foco ao desativar

---

### 4. Popper

Posicionamento inteligente de elementos flutuantes (dropdowns, tooltips, etc).

**Features:**
- ✅ Auto positioning (evita overflow)
- ✅ Flip behavior
- ✅ Offset customizável
- ✅ Arrow positioning
- ✅ Boundary detection

**Uso:**
```typescript
import { Popper } from '@gs-style/primitives';

const Dropdown = () => {
  const anchorRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button ref={anchorRef} onClick={() => setIsOpen(!isOpen)}>
        Toggle
      </button>
      
      <Popper
        anchorEl={anchorRef.current}
        open={isOpen}
        placement="bottom-start"
        offset={8}
      >
        <div>Dropdown content</div>
      </Popper>
    </>
  );
};
```

**Props:**
- `anchorEl: HTMLElement | null` - Elemento âncora
- `open: boolean` - Estado aberto/fechado
- `placement?: Placement` - Posição preferida
- `offset?: number` - Distância do âncora
- `flip?: boolean` - Auto flip ao sair do viewport
- `children: React.ReactNode` - Conteúdo

**Placements:**
- `top`, `top-start`, `top-end`
- `bottom`, `bottom-start`, `bottom-end`
- `left`, `left-start`, `left-end`
- `right`, `right-start`, `right-end`

---

## 🎯 Filosofia Headless

Os primitivos **NÃO incluem estilos**. Eles fornecem apenas:
- ✅ Comportamento
- ✅ Acessibilidade
- ✅ Keyboard navigation
- ✅ ARIA attributes
- ✅ State management

**Você adiciona os estilos** via CSS Modules, Tailwind, ou qualquer solução CSS.

---

## 🏗️ Construindo Componentes com Primitivos

### Exemplo: Botão Customizado

```typescript
import { ButtonBase } from '@gs-style/primitives';
import styles from './MyButton.module.css';

export const MyButton = ({ variant, children, ...props }) => (
  <ButtonBase 
    className={`${styles.button} ${styles[variant]}`}
    {...props}
  >
    {children}
  </ButtonBase>
);
```

### Exemplo: Modal com Primitivos

```typescript
import { Overlay, FocusTrap } from '@gs-style/primitives';
import styles from './Modal.module.css';

export const Modal = ({ isOpen, onClose, children }) => (
  <>
    <Overlay isOpen={isOpen} onClose={onClose} />
    {isOpen && (
      <FocusTrap active={isOpen}>
        <div className={styles.modal} role="dialog">
          {children}
        </div>
      </FocusTrap>
    )}
  </>
);
```

---

## 📦 Exports

```typescript
// Import tudo
import * as Primitives from '@gs-style/primitives';

// Import seletivo
import { ButtonBase, Overlay } from '@gs-style/primitives';

// Import individual (tree-shaking)
import { ButtonBase } from '@gs-style/primitives/ButtonBase';
```

---

## 🎯 Quando Usar

**Use primitivos quando:**
- ✅ Construir novos componentes GS
- ✅ Precisar de comportamento sem estilos
- ✅ Criar variações de componentes existentes
- ✅ Garantir acessibilidade

**Não use primitivos quando:**
- ❌ Já existe componente GS completo
- ❌ Precisar de solução rápida com estilos
- ❌ Componente muito simples (ex: div)

---

## 📚 Dependências

**Peer Dependencies:**
- `react` ^18.0.0
- `react-dom` ^18.0.0

**Sem outras dependências** - código 100% nativo React.

---

## 🤝 Contribuir

Para adicionar novos primitivos:
1. Seguir padrão headless (zero estilos)
2. Focar em acessibilidade
3. TypeScript types completos
4. Documentar uso e props
5. Adicionar ao `index.ts`

---

*Package: @gs-style/primitives v1.0.0*

