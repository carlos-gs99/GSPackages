# GSTooltip Component

## 📋 Descrição

O `GSTooltip` é um componente de tooltip completamente independente e customizado, construído do zero sem dependências externas (exceto React). Oferece uma experiência completa de tooltips com posicionamento inteligente, múltiplos triggers, animações suaves e total personalização visual.

## ✨ Características

- ✅ **100% Independente**: Sem bibliotecas de tooltip externas
- 🎯 **12 Posicionamentos**: top, bottom, left, right + start/end variations
- 📏 **3 Tamanhos**: sm, md, lg
- 🎨 **7 Cores**: primary, secondary, success, warning, danger, info, neutral
- 🎭 **3 Variantes**: solid, outlined, soft
- ➡️ **Seta Opcional**: Mostrar/ocultar seta do tooltip
- 🖱️ **Múltiplos Triggers**: hover, click, focus, manual
- ⏱️ **Delays Customizáveis**: Enter/leave delays independentes
- 🎯 **Follow Cursor**: Opção de seguir o cursor do mouse
- 📱 **Viewport Aware**: Ajuste automático para não sair da viewport
- ♿ **Acessível**: ARIA attributes e keyboard navigation
- 🎭 **Animações Suaves**: Fade in/out com scale
- 🎯 **TypeScript**: Tipagem completa

## 📦 Importação

```tsx
import { GSTooltip } from 'components/ui';
// ou
import GSTooltip from 'components/ui/GSTooltip';
```

## 🎯 Props

### Interface Completa

```typescript
interface GSTooltipProps {
  // Content
  content: React.ReactNode;
  children: React.ReactElement;
  
  // Visual
  placement?: GSTooltipPlacement;    // 'top' | 'top-start' | 'top-end' | 'bottom' | ...
  color?: GSColor;                   // 'primary' | 'secondary' | 'success' | ...
  size?: GSSize;                     // 'sm' | 'md' | 'lg'
  variant?: GSTooltipVariant;        // 'solid' | 'outlined' | 'soft'
  arrow?: boolean;                   // Default: true
  
  // Behavior
  trigger?: GSTooltipTrigger | GSTooltipTrigger[];  // 'hover' | 'click' | 'focus' | 'manual'
  enterDelay?: number;               // Default: 200ms
  leaveDelay?: number;               // Default: 0ms
  disabled?: boolean;                // Default: false
  followCursor?: boolean;            // Default: false
  
  // Control
  open?: boolean;                    // Controlled mode
  defaultOpen?: boolean;             // Default: false
  onOpenChange?: (open: boolean) => void;
  
  // Styling
  offset?: number;                   // Default: 8px
  maxWidth?: string | number;        // Default: 300px
  zIndex?: number;                   // Default: 9999
  className?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
}
```

### Props Detalhadas

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `content` | `React.ReactNode` | **required** | Conteúdo do tooltip |
| `children` | `React.ReactElement` | **required** | Elemento que ativa o tooltip |
| `placement` | `GSTooltipPlacement` | `'top'` | Posicionamento do tooltip |
| `color` | `GSColor` | `'neutral'` | Tema de cor |
| `size` | `GSSize` | `'md'` | Tamanho do tooltip |
| `variant` | `GSTooltipVariant` | `'solid'` | Variante visual |
| `arrow` | `boolean` | `true` | Mostrar seta |
| `trigger` | `GSTooltipTrigger \| Array` | `'hover'` | Como ativar |
| `enterDelay` | `number` | `200` | Delay antes de mostrar (ms) |
| `leaveDelay` | `number` | `0` | Delay antes de esconder (ms) |
| `disabled` | `boolean` | `false` | Desabilitar tooltip |
| `open` | `boolean` | `undefined` | Estado controlado |
| `defaultOpen` | `boolean` | `false` | Estado inicial (não controlado) |
| `onOpenChange` | `Function` | `undefined` | Callback de mudança de estado |
| `offset` | `number` | `8` | Distância do elemento (px) |
| `maxWidth` | `string \| number` | `300` | Largura máxima |
| `zIndex` | `number` | `9999` | z-index do tooltip |
| `followCursor` | `boolean` | `false` | Seguir cursor do mouse |

## 📝 Exemplos de Uso

### 1. Básico

```tsx
import { GSTooltip, GSButton } from 'components/ui';

function BasicExample() {
  return (
    <GSTooltip content="Hello World!">
      <GSButton>Hover me</GSButton>
    </GSTooltip>
  );
}
```

### 2. Todos os Posicionamentos

```tsx
function PlacementsExample() {
  return (
    <div className="grid gap-4">
      {/* Top */}
      <GSTooltip content="Top" placement="top">
        <GSButton>Top</GSButton>
      </GSTooltip>
      
      <GSTooltip content="Top Start" placement="top-start">
        <GSButton>Top Start</GSButton>
      </GSTooltip>
      
      <GSTooltip content="Top End" placement="top-end">
        <GSButton>Top End</GSButton>
      </GSTooltip>
      
      {/* Bottom */}
      <GSTooltip content="Bottom" placement="bottom">
        <GSButton>Bottom</GSButton>
      </GSTooltip>
      
      {/* Left */}
      <GSTooltip content="Left" placement="left">
        <GSButton>Left</GSButton>
      </GSTooltip>
      
      {/* Right */}
      <GSTooltip content="Right" placement="right">
        <GSButton>Right</GSButton>
      </GSTooltip>
    </div>
  );
}
```

### 3. Cores e Variantes

```tsx
function ColorsExample() {
  return (
    <div className="flex gap-2">
      {/* Solid (default) */}
      <GSTooltip content="Primary" color="primary" variant="solid">
        <GSButton>Primary</GSButton>
      </GSTooltip>
      
      <GSTooltip content="Success" color="success" variant="solid">
        <GSButton color="success">Success</GSButton>
      </GSTooltip>
      
      <GSTooltip content="Danger" color="danger" variant="solid">
        <GSButton color="danger">Danger</GSButton>
      </GSTooltip>
      
      {/* Outlined */}
      <GSTooltip content="Outlined" color="primary" variant="outlined">
        <GSButton>Outlined</GSButton>
      </GSTooltip>
      
      {/* Soft */}
      <GSTooltip content="Soft" color="info" variant="soft">
        <GSButton color="info">Soft</GSButton>
      </GSTooltip>
    </div>
  );
}
```

### 4. Tamanhos

```tsx
function SizesExample() {
  return (
    <>
      <GSTooltip content="Small tooltip" size="sm">
        <GSButton size="sm">Small</GSButton>
      </GSTooltip>
      
      <GSTooltip content="Medium tooltip (default)" size="md">
        <GSButton>Medium</GSButton>
      </GSTooltip>
      
      <GSTooltip content="Large tooltip with more text" size="lg">
        <GSButton size="lg">Large</GSButton>
      </GSTooltip>
    </>
  );
}
```

### 5. Com e Sem Seta

```tsx
function ArrowExample() {
  return (
    <>
      <GSTooltip content="With arrow (default)" arrow={true}>
        <GSButton>With Arrow</GSButton>
      </GSTooltip>
      
      <GSTooltip content="Without arrow" arrow={false}>
        <GSButton>No Arrow</GSButton>
      </GSTooltip>
    </>
  );
}
```

### 6. Triggers Diferentes

```tsx
function TriggersExample() {
  return (
    <>
      {/* Hover (default) */}
      <GSTooltip content="Shown on hover" trigger="hover">
        <GSButton>Hover</GSButton>
      </GSTooltip>
      
      {/* Click */}
      <GSTooltip content="Shown on click" trigger="click">
        <GSButton>Click</GSButton>
      </GSTooltip>
      
      {/* Focus */}
      <GSTooltip content="Shown on focus" trigger="focus">
        <GSButton>Focus</GSButton>
      </GSTooltip>
      
      {/* Multiple triggers */}
      <GSTooltip content="Hover or click" trigger={['hover', 'click']}>
        <GSButton>Hover or Click</GSButton>
      </GSTooltip>
    </>
  );
}
```

### 7. Delays Customizados

```tsx
function DelaysExample() {
  return (
    <>
      {/* Fast (no delay) */}
      <GSTooltip content="Instant!" enterDelay={0} leaveDelay={0}>
        <GSButton>Instant</GSButton>
      </GSTooltip>
      
      {/* Default */}
      <GSTooltip content="200ms delay" enterDelay={200}>
        <GSButton>Default</GSButton>
      </GSTooltip>
      
      {/* Slow */}
      <GSTooltip content="Slow appear" enterDelay={800} leaveDelay={300}>
        <GSButton>Slow</GSButton>
      </GSTooltip>
    </>
  );
}
```

### 8. Controlado (Manual)

```tsx
function ControlledExample() {
  const [open, setOpen] = useState(false);
  
  return (
    <div>
      <GSTooltip 
        content="Controlled tooltip" 
        trigger="manual"
        open={open}
        onOpenChange={setOpen}
      >
        <GSButton>Controlled</GSButton>
      </GSTooltip>
      
      <GSButton onClick={() => setOpen(!open)}>
        Toggle Tooltip
      </GSButton>
    </div>
  );
}
```

### 9. Follow Cursor

```tsx
function FollowCursorExample() {
  return (
    <GSTooltip 
      content="I follow your cursor!" 
      followCursor
      placement="top"
    >
      <div className="p-8 bg-gray-100 rounded">
        Move your mouse here
      </div>
    </GSTooltip>
  );
}
```

### 10. Conteúdo Rico

```tsx
function RichContentExample() {
  return (
    <GSTooltip 
      content={
        <div>
          <strong>User Information</strong>
          <p className="mt-1">John Doe</p>
          <p className="text-sm">john@example.com</p>
        </div>
      }
      size="lg"
      maxWidth={250}
    >
      <GSButton>User Info</GSButton>
    </GSTooltip>
  );
}
```

### 11. Tooltip em Ícones

```tsx
function IconTooltipExample() {
  return (
    <div className="flex gap-2">
      <GSTooltip content="Delete" color="danger" size="sm">
        <button className="icon-button">
          <i className="bi bi-trash"></i>
        </button>
      </GSTooltip>
      
      <GSTooltip content="Edit" color="primary" size="sm">
        <button className="icon-button">
          <i className="bi bi-pencil"></i>
        </button>
      </GSTooltip>
      
      <GSTooltip content="Download" color="success" size="sm">
        <button className="icon-button">
          <i className="bi bi-download"></i>
        </button>
      </GSTooltip>
    </div>
  );
}
```

### 12. Tooltip em Input Disabled

```tsx
function DisabledInputExample() {
  return (
    <GSTooltip content="This field is currently disabled">
      <span> {/* Wrapper needed for disabled elements */}
        <GSInput disabled placeholder="Disabled input" />
      </span>
    </GSTooltip>
  );
}
```

### 13. Tooltip com Validação de Form

```tsx
function FormValidationExample() {
  const [email, setEmail] = useState('');
  const isValid = email.includes('@');
  
  return (
    <GSTooltip 
      content="Please enter a valid email address"
      color="danger"
      variant="solid"
      open={!isValid && email.length > 0}
      trigger="manual"
      placement="right"
    >
      <GSInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        error={!isValid && email.length > 0}
      />
    </GSTooltip>
  );
}
```

### 14. Tooltip em Tabela

```tsx
function TableTooltipExample() {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <GSTooltip content="Click to copy" size="sm">
              <code className="cursor-pointer">abc123def456</code>
            </GSTooltip>
          </td>
          <td>
            <GSTooltip 
              content="Last updated: 2 hours ago" 
              placement="left"
              size="sm"
            >
              <span className="text-muted">Active</span>
            </GSTooltip>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
```

### 15. Tooltip Complexo - Ajuda Contextual

```tsx
function ContextualHelpExample() {
  return (
    <div className="form-group">
      <label className="flex items-center gap-2">
        API Key
        <GSTooltip
          content={
            <div>
              <p className="font-semibold mb-2">How to get your API key:</p>
              <ol className="list-decimal ml-4 space-y-1 text-sm">
                <li>Go to Settings</li>
                <li>Click on API Keys</li>
                <li>Generate new key</li>
              </ol>
            </div>
          }
          placement="right"
          size="lg"
          maxWidth={300}
          color="info"
          variant="soft"
        >
          <i className="bi bi-question-circle cursor-help"></i>
        </GSTooltip>
      </label>
      <GSInput placeholder="Enter your API key" />
    </div>
  );
}
```

## 🎨 Customização

### CSS Classes

```css
.gs-tooltip { }
.gs-tooltip-content { }
.gs-tooltip-arrow { }

/* Modifiers */
.gs-tooltip--sm { }
.gs-tooltip--md { }
.gs-tooltip--lg { }

.gs-tooltip--variant-solid { }
.gs-tooltip--variant-outlined { }
.gs-tooltip--variant-soft { }

.gs-tooltip--color-primary { }
.gs-tooltip--color-success { }
/* ... etc */

.gs-tooltip--placement-top { }
.gs-tooltip--placement-bottom { }
/* ... etc */
```

### Custom Styles

```tsx
<GSTooltip 
  content="Custom styled"
  className="my-custom-tooltip"
  contentClassName="custom-content"
  style={{ 
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    borderRadius: '12px'
  }}
>
  <GSButton>Custom</GSButton>
</GSTooltip>
```

```css
.my-custom-tooltip {
  font-family: 'Comic Sans MS';
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%) !important;
}
```

## ♿ Acessibilidade

### ARIA Attributes

- `role="tooltip"` no elemento do tooltip
- `aria-hidden` para controlar visibilidade
- Keyboard navigation support

### Keyboard Support

- **Tab**: Navega para o elemento trigger
- **Enter/Space**: Ativa tooltip (se trigger="click")
- **Escape**: Fecha tooltip (recomendado adicionar)
- **Focus**: Mostra tooltip (se trigger="focus")

### Boas Práticas

```tsx
// ✅ Bom - Conteúdo acessível
<GSTooltip content="Delete this item">
  <button aria-label="Delete">
    <i className="bi bi-trash"></i>
  </button>
</GSTooltip>

// ✅ Bom - Informação adicional
<GSTooltip content="More information about this field">
  <label>
    Email
    <i className="bi bi-info-circle" aria-label="Help"></i>
  </label>
</GSTooltip>

// ❌ Evitar - Informação essencial
// Não use tooltip para informação crítica que deve estar sempre visível
```

## 🔧 Casos de Uso

### 1. Ajuda Contextual

```tsx
<GSTooltip content="Your password must be at least 8 characters" placement="right">
  <GSInput type="password" />
</GSTooltip>
```

### 2. Informação Adicional

```tsx
<GSTooltip content="Last updated: 2 hours ago">
  <span className="badge">Active</span>
</GSTooltip>
```

### 3. Ações de Botão

```tsx
<GSTooltip content="Copy to clipboard" size="sm">
  <button onClick={handleCopy}>
    <i className="bi bi-clipboard"></i>
  </button>
</GSTooltip>
```

### 4. Valores Truncados

```tsx
<GSTooltip content={fullText}>
  <div className="truncate max-w-xs">
    {fullText}
  </div>
</GSTooltip>
```

## 🐛 Edge Cases e Tratamento

### 1. Elemento Disabled

```tsx
{/* ✅ Correto - Usar wrapper */}
<GSTooltip content="Button is disabled">
  <span>
    <GSButton disabled>Disabled</GSButton>
  </span>
</GSTooltip>

{/* ❌ Errado - Eventos não funcionam em elementos disabled */}
<GSTooltip content="Button is disabled">
  <GSButton disabled>Disabled</GSButton>
</GSTooltip>
```

### 2. Viewport Boundaries

```tsx
{/* O tooltip ajusta automaticamente a posição para não sair da viewport */}
<GSTooltip content="I stay in viewport!" placement="right">
  <button style={{ position: 'absolute', right: 0 }}>
    Edge Button
  </button>
</GSTooltip>
```

### 3. Scroll Container

```tsx
{/* O tooltip reposiciona automaticamente no scroll */}
<div className="overflow-auto">
  <GSTooltip content="I follow you on scroll">
    <div>Scrollable content</div>
  </GSTooltip>
</div>
```

### 4. Múltiplos Tooltips

```tsx
{/* Apenas um tooltip visível por vez (por padrão) */}
<div>
  <GSTooltip content="First">
    <GSButton>Button 1</GSButton>
  </GSTooltip>
  <GSTooltip content="Second">
    <GSButton>Button 2</GSButton>
  </GSTooltip>
</div>
```

## 📊 Performance

### Otimizações

- Portal rendering para evitar z-index issues
- Event listener cleanup automático
- Debounced resize/scroll listeners
- Lazy positioning (só calcula quando visível)
- Memoização de classes e estilos

### Boas Práticas

```tsx
// ✅ Bom - Conteúdo simples
<GSTooltip content="Simple text">
  <GSButton>Button</GSButton>
</GSTooltip>

// ✅ Bom - Componente leve memoizado
const TooltipContent = React.memo(() => <div>Content</div>);
<GSTooltip content={<TooltipContent />}>
  <GSButton>Button</GSButton>
</GSTooltip>

// ⚠️ Cuidado - Evitar componentes pesados
<GSTooltip content={<HeavyChartComponent data={bigData} />}>
  <GSButton>Button</GSButton>
</GSTooltip>
```

## 🔗 Componentes Relacionados

- **GSPopover** - Para conteúdo mais rico e interativo
- **GSToast** - Para notificações temporárias
- **GSAlert** - Para mensagens persistentes
- **GSModal** - Para diálogos completos

## 📚 Referências

- [WAI-ARIA Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
- [MDN: ARIA Tooltip](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role)
- [MUI Tooltip](https://mui.com/material-ui/react-tooltip/) (inspiração visual)

## 🚀 Versão

- **Versão**: 1.0.0
- **Data**: Outubro 2025
- **Autor**: GS Style Team
- **Status**: ✅ Estável

## 📝 Changelog

### v1.0.0 (Outubro 2025)
- ✨ Versão inicial do componente
- ✅ 12 posicionamentos (top, bottom, left, right + start/end)
- ✅ 3 tamanhos (sm, md, lg)
- ✅ 7 cores (primary, secondary, success, warning, danger, info, neutral)
- ✅ 3 variantes (solid, outlined, soft)
- ✅ Seta opcional customizável
- ✅ 4 triggers (hover, click, focus, manual)
- ✅ Delays customizáveis (enter/leave)
- ✅ Follow cursor mode
- ✅ Viewport boundary detection
- ✅ Auto-reposition on scroll/resize
- ✅ Portal rendering (document.body)
- ✅ Acessibilidade completa (ARIA)
- ✅ TypeScript support completo
- ✅ Animações suaves
- ✅ 100% independente (sem deps externas)

## 💡 Dicas

1. **Performance**: Use `trigger="manual"` para controle fino de quando mostrar
2. **Mobile**: Considere `trigger="click"` para dispositivos touch
3. **Acessibilidade**: Sempre forneça conteúdo significativo, não apenas "..."
4. **UX**: Use delays razoáveis (200-500ms) para evitar tooltips "nervosos"
5. **Viewport**: Confie no ajuste automático, mas teste em telas pequenas
6. **Conteúdo**: Mantenha tooltips concisos (máx 2-3 linhas idealmente)
7. **Disabled Elements**: Sempre use wrapper `<span>` para elementos disabled
8. **Z-index**: Ajuste `zIndex` se necessário para contexts com stacking contexts complexos

---

*Para mais exemplos e demonstrações ao vivo, veja a página GS-Dev!*

