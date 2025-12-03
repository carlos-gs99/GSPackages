# GSAvatar

Avatar agnóstico inspirado no Joy UI, com suporte a imagem, iniciais automáticas e estados visuais.

## Props

| Prop | Tipo | Default | Descrição |
| --- | --- | --- | --- |
| `text` | `string` | `undefined` | Texto usado para gerar iniciais quando não existe imagem ou esta falha |
| `src` | `string` | `undefined` | URL da imagem do avatar |
| `size` | `GSAvatarSize` | `'md'` | Escala do avatar (`sm`, `md`, `lg`, `xl`) |
| `color` | `GSAvatarColor` | `'neutral'` | Paleta aplicada ao fallback de texto |
| `rounded` | `GSAvatarRounded` | `'circle'` | Grau de arredondamento (`none`, `sm`, `md`, `lg`, `xl`, `circle`) |
| `width` | `string` | `undefined` | Largura customizada (1:1 com altura); ex.: `48px` |
| `height` | `string` | `undefined` | Altura customizada quando necessário |
| `imgProps` | `ImgHTMLAttributes<HTMLImageElement>` | `undefined` | Atributos extra para `<img>` |
| `textClassName` | `string` | `undefined` | Classe adicional aplicada ao container das iniciais |
| `state` | `GSAvatarState` | `'default'` | Estado visual (`default`, `disabled`, `loading`, `error`) |
| `debug` | `boolean` | `false` | Ativa o `useComponentDebug` |
| `ariaLabel` | `string` | `undefined` | Sobreposição da etiqueta acessível |
| `ariaDescribedBy` | `string` | `undefined` | ID(s) que descrevem o avatar |
| `alt` | `string` | `undefined` | Texto alternativo explícito da imagem |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | — | Props adicionais para o container |

### Tipagens Exportadas

```ts
export const GS_AVATAR_SIZES: readonly ['sm', 'md', 'lg', 'xl'];
export const GS_AVATAR_COLORS: readonly ['neutral', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'];
export const GS_AVATAR_ROUNDED: readonly ['none', 'sm', 'md', 'lg', 'xl', 'circle'];
export const GS_AVATAR_STATES: readonly ['default', 'disabled', 'loading', 'error'];

export interface GSAvatarRef {
  focus: () => void;
  reload: () => void;
}
```

## Data Attributes

| Atributo | Valores | Descrição |
| --- | --- | --- |
| `data-gs="GSAvatar"` | — | Identificador principal do componente |
| `data-size` | `sm  | md  | lg  | xl` | Escala aplicada |
| `data-color` | Tokens Joy | Paleta do fallback de texto |
| `data-rounded` | `none`…`circle` | Arredondamento |
| `data-state` | `default`, `disabled`, `loading`, `error` | Estado visual atual |
| `data-has-image` | `true` | Indicador de que o avatar possui imagem válida |
| `data-debug` | `true` | Modo debug ativo |

## Exemplo Básico

```tsx
import { GSAvatar } from 'components/ui';

<GSAvatar text="João Silva" />
<GSAvatar src="/avatars/joao.png" text="João Silva" size="lg" />
```

## Estados e Variantes

### Tamanhos
```tsx
<GSAvatar text="SM" size="sm" />
<GSAvatar text="MD" size="md" />
<GSAvatar text="LG" size="lg" />
<GSAvatar text="XL" size="xl" />
```

### Cores
```tsx
<GSAvatar text="PR" color="primary" />
<GSAvatar text="SC" color="success" />
<GSAvatar text="DG" color="danger" />
```

### Arredondamento
```tsx
<GSAvatar text="SQ" rounded="none" />
<GSAvatar text="LG" rounded="lg" />
<GSAvatar text="CR" rounded="circle" />
```

### Estados
```tsx
<GSAvatar text="LD" src="/avatar.png" state="loading" />
<GSAvatar text="ER" src="/erro.png" state="error" />
<GSAvatar text="DS" state="disabled" />
```

### Conteúdo personalizado
```tsx
<GSAvatar>
  <GSIcon name="account" size="md" />
</GSAvatar>
```
Quando `children` são fornecidos, eles substituem o fallback de iniciais.

## Acessibilidade
- `role="img"` com `aria-label` sempre presente.
- Alt da imagem deriva de `alt`, `text` ou tradução padrão.
- Estados `loading`/`error` disponibilizam mensagens traduzidas via i18n.
- `GSAvatarRef` permite integrar comportamentos acessíveis (`focus`, `reload`).

## Debug
- `debug` ativa `useComponentDebug` com logs de props/estado.
- `data-debug="true"` é acrescentado ao container para inspeção.

## Testes
- Ver `docs/TESTING.md` para a estratégia completa (unit, a11y, i18n).

## Migração
- CSS global removido (`assets/gsstyle/components/avatar.css`).
- Utilizar apenas as classes e data attributes expostos pelo packlet.
