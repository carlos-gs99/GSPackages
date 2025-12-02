# @gs-style/utils

> 🛠️ Utility functions for GS Style components - debugging, accessibility, dates, strings, validation and more

## Visão Geral

O package `@gs-style/utils` fornece funções helper reutilizáveis e bem documentadas para uso nos componentes GS Style. Todas as funções seguem princípios de código limpo, são type-safe (TypeScript) e incluem tratamento de edge cases.

## 📦 Instalação

```bash
npm install @gs-style/utils
# ou
yarn add @gs-style/utils
# ou
pnpm add @gs-style/utils
```

## 🚀 Quick Start

```typescript
import { debugUtils, accessibilityUtils, dateUtils } from '@gs-style/utils';

// Debug
const debug = useDebug('MyComponent', true);
debug.log('Component mounted');

// Accessibility
const ariaProps = generateAriaAttributes({ label: 'Close', role: 'button' });

// Dates
const formatted = formatApiDate('/Date(1609459200000)/', 'DD/MM/YYYY');
```

---

## 📚 Índice

1. [Organização](#organização)
2. [Categorias de Utilitários](#categorias-de-utilitários)
3. [Guia de Uso](#guia-de-uso)
4. [Exemplos Práticos](#exemplos-práticos)
5. [Criação de Novos Utilitários](#criação-de-novos-utilitários)
6. [Melhores Práticas](#melhores-práticas)

---

## 📁 Organização

### Estrutura de Ficheiros

```
src/utils/
├── index.ts                    # Exports centralizados
├── dateUtils.ts                # Funções de data/hora
├── stringUtils.ts              # Funções de string
├── arrayUtils.ts               # Funções de array
├── validationUtils.ts          # Funções de validação
├── classNameUtils.ts           # Builders de classes CSS
├── tableUtils.ts               # Funções para tabelas
├── accessibilityUtils.ts       # Acessibilidade (ARIA, focus, keyboard)
├── debugUtils.ts               # Sistema de debug
├── domUtils.ts                 # Manipulação do DOM
├── commonUtils.ts              # Utilitários gerais
├── renderUtils.tsx             # Renderização condicional
├── navigationUtils.tsx         # Navegação e scroll
├── windowUtils.ts              # Window/viewport
└── testUtils.ts                # Helpers para testes
```

### Princípios de Organização

1. **Um ficheiro por categoria** - Agrupa funções relacionadas
2. **Funções puras preferencialmente** - Sem side effects
3. **TypeScript strict** - Types completos e validados
4. **JSDoc obrigatório** - Documentação inline
5. **Exports centralizados** - Via `index.ts`

---

## 🎯 Categorias de Utilitários

### 📅 Date Utilities

Manipulação e formatação de datas, incluindo conversão de formatos da API.

**Uso comum**: Converter datas da API, formatar para UI, calcular tempo relativo.

#### 🔧 .NET Date Utilities (NOVO)

**Ficheiro**: `dotnetDateUtils.ts`

Utilitários para compatibilidade entre JavaScript Date e formatos de data .NET (DateTime, DateOnly, ISO 8601).

**Principais funções**:
- `parseDotNetDate()` - Converte string .NET → JavaScript Date (suporta todos os formatos)
- `formatToDotNetJsonNet()` - Date → JSON.NET (/Date(timestamp)/)
- `formatToDotNetDateTime()` - Date → .NET DateTime
- `formatToDotNetDateOnly()` - Date → .NET DateOnly
- `formatToDotNetISO8601()` - Date → ISO 8601
- `formatToDotNet()` - Conversão automática para qualquer formato .NET
- `isDotNetDateFormat()` - Valida formato .NET
- `detectDotNetFormat()` - Detecta tipo de formato .NET (inclui JsonNet)
- `useDotNetDate()` - Hook React para gestão de datas .NET

**Exemplo completo**:
```typescript
import { 
  parseDotNetDate, 
  formatToDotNetDateOnly,
  useDotNetDate 
} from '@/utils/dotnetDateUtils';

// Receber do backend .NET (qualquer formato)
const jsDate1 = parseDotNetDate('/Date(1757405123217)/');  // JSON.NET
const jsDate2 = parseDotNetDate('2024-12-31T23:59:59Z');   // DateTime
const jsDate3 = parseDotNetDate('2024-12-31');             // DateOnly

// Enviar ao backend .NET
const jsonNet = formatToDotNetJsonNet(new Date());
// → "/Date(1735689599000)/"
const dateOnly = formatToDotNetDateOnly(new Date());
// → "2024-12-31"

// Hook para gestão completa
const { dateValue, setDotNetDate, getDotNetValue } = useDotNetDate();
setDotNetDate('2024-12-31'); // Receber
const toSend = getDotNetValue('DateOnly'); // Enviar
```

```typescript
import { convertApiDateToInputFormat, formatApiDate } from '@/utils';

// Converter data da API para input
const inputDate = convertApiDateToInputFormat('/Date(1609459200000)/');
// "2021-01-01"

// Formatar para display
const displayDate = formatApiDate('/Date(1609459200000)/', 'DD/MM/YYYY');
// "01/01/2021"
```

**Documentação completa**: [`docs/indices/utils-index.md#date-utilities`](../../docs/indices/utils-index.md#date-utilities)

---

### 🔤 String Utilities

Transformação e parsing de strings, incluindo slugs, iniciais e parsing de observações.

**Uso comum**: Criar slugs, extrair iniciais, formatar nomes.

```typescript
import { convertToSlug, getInitials, toSentenceCase } from '@/utils';

// Criar slug
const slug = convertToSlug('Olá Mundo!'); // "ola-mundo"

// Extrair iniciais
const initials = getInitials('João', 'Silva'); // "JS"

// Sentence case
const sentence = toSentenceCase('hello world'); // "Hello world"
```

**Documentação completa**: [`docs/indices/utils-index.md#string-utilities`](../../docs/indices/utils-index.md#string-utilities)

---

### 📊 Array Utilities

Manipulação de arrays, agrupamento e chunking.

**Uso comum**: Agrupar dados, dividir arrays grandes.

```typescript
import { groupByFields, splitArray } from '@/utils';

// Dividir array em chunks
const chunks = splitArray([1, 2, 3, 4, 5], 2);
// [[1, 2], [3, 4], [5]]

// Agrupar por campos
const grouped = groupByFields(data, (item) => [item.category, item.type]);
```

**Documentação completa**: [`docs/indices/utils-index.md#array-utilities`](../../docs/indices/utils-index.md#array-utilities)

---

### ✅ Validation Utilities

Validação de dados, especialmente para senhas e formulários.

**Uso comum**: Validar força de senhas, validar inputs.

```typescript
import { checkPasswordStrength } from '@/utils';

const result = checkPasswordStrength('MinhaSenh@123', {
  checkFor: ['length', 'lowerCase', 'upperCase', 'number', 'specialCharacter']
});
// { strength: 100, passedFor: ['length', 'lowerCase', 'upperCase', 'number', 'specialCharacter'] }
```

**Documentação completa**: [`docs/indices/utils-index.md#validation-utilities`](../../docs/indices/utils-index.md#validation-utilities)

---

### 🎨 Class Name Utilities

Construção consistente de classes CSS para componentes GS.

**Uso comum**: Criar classes CSS para componentes, manter consistência.

```typescript
import { buildGSClassName } from '@/utils';

const className = buildGSClassName('card', {
  variant: 'outlined',
  color: 'primary',
  size: 'md',
  loading: false,
  disabled: false
});
// "gs-card gs-card--outlined gs-card--primary gs-card--md"
```

**Documentação completa**: [`docs/indices/utils-index.md#class-name-utilities`](../../docs/indices/utils-index.md#class-name-utilities)

---

### 📋 Table Utilities

Funções para gerenciamento de tabelas, conversão de parâmetros para servidor.

**Uso comum**: Converter parâmetros TanStack Table para formato do servidor.

```typescript
import { convertToGSTableParams } from '@/utils';

const params = convertToGSTableParams(
  pagination,
  sorting,
  globalFilter,
  columns,
  draw
);
```

**Documentação completa**: [`docs/indices/utils-index.md#table-utilities`](../../docs/indices/utils-index.md#table-utilities)

---

### ♿ Accessibility Utilities

Funções e hooks para acessibilidade (ARIA, keyboard navigation, focus management).

**Uso comum**: Tornar componentes acessíveis, gerenciar focus, keyboard navigation.

```typescript
import { generateAriaAttributes, useFocusTrap } from '@/utils';

// Gerar ARIA attributes
const ariaProps = generateAriaAttributes({
  label: 'Fechar modal',
  expanded: true,
  controls: 'menu-1'
});

// Focus trap em modal
const containerRef = useFocusTrap(isOpen);
```

**Documentação completa**: [`docs/indices/utils-index.md#accessibility-utilities`](../../docs/indices/utils-index.md#accessibility-utilities)

---

### 🐛 Debug Utilities

Sistema de debug condicional para componentes.

**Uso comum**: Debug de props, estado, performance.

```typescript
import { useDebug } from '@/utils';

const MyComponent = (props) => {
  const { log, warn, group } = useDebug('MyComponent', props.debug);
  
  log('Component mounted');
  group('Props', () => {
    log('variant:', props.variant);
    log('color:', props.color);
  });
};
```

**Documentação completa**: [`docs/indices/utils-index.md#debug-utilities`](../../docs/indices/utils-index.md#debug-utilities)

---

### 🌐 DOM & Common Utilities

Funções para manipulação do DOM e utilitários gerais.

**Uso comum**: Alterar atributos DOM, converter para Base64, delays.

```typescript
import { changeBodyAttribute, getBase64, sleep } from '@/utils';

// Alterar tema
changeBodyAttribute('data-theme', 'dark');

// Converter para Base64
const base64 = await getBase64(file);

// Delay
await sleep(1000);
```

**Documentação completa**: [`docs/indices/utils-index.md#dom-utilities`](../../docs/indices/utils-index.md#dom-utilities)

---

## 📖 Guia de Uso

### Import de Utilitários

**Método Recomendado** (via index centralizado):
```typescript
import { 
  convertApiDateToInputFormat,
  toSentenceCase,
  buildGSClassName 
} from '@/utils';
```

**Import Direto** (quando necessário):
```typescript
import { convertApiDateToInputFormat } from '@/utils/dateUtils';
```

---

### TypeScript Support

Todos os utilitários têm types completos:

```typescript
// Types inferidos automaticamente
const date = convertApiDateToInputFormat('/Date(...)'); // string
const result = checkPasswordStrength('pass', options); // CheckPasswordResult

// Types explícitos quando necessário
const chunks: number[][] = splitArray([1, 2, 3], 2);
```

---

## 💡 Exemplos Práticos

### Exemplo 1: Formatação de Data para Display

```typescript
import { formatApiDate } from '@/utils';

// Em um componente
const DataDisplay = ({ dataApi }) => {
  const dataFormatada = formatApiDate(dataApi, 'DD/MM/YYYY');
  
  return <span>{dataFormatada}</span>;
};
```

---

### Exemplo 2: Criar Classes CSS para Botão

```typescript
import { clsx } from 'clsx';

const GSButton = ({ variant, color, size, loading, disabled, className, children, ...props }) => {
  return (
    <button
      data-gs="GSButton"
      data-variant={variant}
      data-color={color}
      data-size={size}
      data-loading={loading ? 'true' : undefined}
      disabled={disabled}
      className={clsx(className)}
      {...props}
    >
      {children}
    </button>
  );
};
```

---

### Exemplo 3: Validação de Senha em Formulário

```typescript
import { checkPasswordStrength } from '@/utils';

const PasswordInput = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  
  const handleChange = (value) => {
    setPassword(value);
    
    const result = checkPasswordStrength(value, {
      checkFor: ['length', 'lowerCase', 'upperCase', 'number', 'specialCharacter']
    });
    
    setStrength(result.strength);
  };
  
  return (
    <div>
      <input type="password" value={password} onChange={(e) => handleChange(e.target.value)} />
      <StrengthMeter strength={strength} />
    </div>
  );
};
```

---

### Exemplo 4: Acessibilidade em Modal

```typescript
import { useFocusTrap, generateAriaAttributes } from '@/utils';

const Modal = ({ isOpen, onClose, title, children }) => {
  const containerRef = useFocusTrap(isOpen);
  
  const ariaProps = generateAriaAttributes({
    label: title,
    role: 'dialog',
    hidden: !isOpen
  });
  
  return (
    <div ref={containerRef} {...ariaProps}>
      {children}
    </div>
  );
};
```

---

### Exemplo 5: Debug Condicional

```typescript
import { useDebug } from '@/utils';

const ComplexComponent = ({ debug, ...props }) => {
  const { log, warn, time, timeEnd } = useDebug('ComplexComponent', debug);
  
  useEffect(() => {
    time('Data fetch');
    fetchData().then(data => {
      timeEnd('Data fetch');
      log('Data loaded:', data);
    });
  }, []);
  
  return <div>...</div>;
};
```

---

## 🆕 Criação de Novos Utilitários

### Checklist para Novo Utilitário

1. **Definir categoria** - Escolher ficheiro apropriado (ou criar novo)
2. **Escrever função pura** - Sem side effects quando possível
3. **Adicionar TypeScript types** - Types completos para parâmetros e retorno
4. **Documentar com JSDoc** - Descrição, params, returns, exemplos
5. **Tratar edge cases** - Null, undefined, valores inválidos
6. **Adicionar ao index.ts** - Export centralizado
7. **Atualizar documentação** - `docs/indices/utils-index.md`
8. **Criar exemplos** - Adicionar a este README

---

### Template de Função

```typescript
/**
 * Breve descrição do que a função faz
 * @param param1 - Descrição do parâmetro 1
 * @param param2 - Descrição do parâmetro 2
 * @returns Descrição do retorno
 * 
 * @example
 * const resultado = minhaFuncao('valor1', 'valor2');
 * // resultado esperado
 */
export const minhaFuncao = (
  param1: string,
  param2: number
): ReturnType => {
  // Validação de entrada
  if (!param1) return defaultValue;
  
  // Lógica principal
  const resultado = doSomething(param1, param2);
  
  // Retorno
  return resultado;
};
```

---

### Guidelines para Bons Utilitários

**DOs**:
- ✅ Funções pequenas e focadas (uma responsabilidade)
- ✅ Nomes descritivos e claros
- ✅ Tratamento de edge cases
- ✅ TypeScript types completos
- ✅ JSDoc com exemplos
- ✅ Funções puras quando possível

**DON'Ts**:
- ❌ Funções muito grandes (> 50 linhas)
- ❌ Múltiplas responsabilidades
- ❌ Side effects não documentados
- ❌ Tipos `any` sem necessidade
- ❌ Código duplicado
- ❌ Falta de validação de entrada

---

## 🎯 Melhores Práticas

### 1. Preferir Funções Puras

```typescript
// ✅ BOM - Função pura
const calcularTotal = (valores: number[]): number => {
  return valores.reduce((acc, val) => acc + val, 0);
};

// ❌ EVITAR - Side effects
let total = 0;
const calcularTotal = (valores: number[]): void => {
  total = valores.reduce((acc, val) => acc + val, 0);
};
```

---

### 2. Validar Entrada

```typescript
// ✅ BOM - Validação completa
const dividir = (a: number, b: number): number | null => {
  if (b === 0) {
    console.warn('Divisão por zero');
    return null;
  }
  return a / b;
};

// ❌ EVITAR - Sem validação
const dividir = (a: number, b: number): number => {
  return a / b; // Pode retornar Infinity!
};
```

---

### 3. Documentar com Exemplos

```typescript
/**
 * Formata número como moeda
 * @param valor - Valor numérico
 * @param moeda - Código da moeda (default: 'EUR')
 * @returns String formatada
 * 
 * @example
 * formatarMoeda(1234.56); // "1.234,56 €"
 * formatarMoeda(1234.56, 'USD'); // "$1,234.56"
 */
export const formatarMoeda = (valor: number, moeda: string = 'EUR'): string => {
  // implementação
};
```

---

### 4. Usar TypeScript Adequadamente

```typescript
// ✅ BOM - Types específicos e genéricos
function filtrar<T>(
  array: T[],
  predicate: (item: T) => boolean
): T[] {
  return array.filter(predicate);
}

// ❌ EVITAR - Types vagos
function filtrar<T>(array: T[], fn: (item: T) => boolean): T[] {
  return array.filter(fn);
}
```

---

### 5. Considerar Performance

```typescript
// ✅ BOM - Memoização para cálculos pesados
const calcularComplexo = memoize((dados: Data[]) => {
  // cálculo pesado
});

// ℹ️ NOTA - Apenas para operações realmente pesadas
```

---

## 📊 Índice Completo

Para ver todas as funções disponíveis com suas assinaturas e exemplos:

**[📖 Ver Índice Completo de Utilitários](../../docs/indices/utils-index.md)**

---

## 📚 Documentação Relacionada

- **Índice de Utilitários**: [`docs/indices/utils-index.md`](../../docs/indices/utils-index.md)
- **Contexto de Utilitários**: [`docs/context/utils-context.md`](../../docs/context/utils-context.md)
- **Guia de Desenvolvimento**: [`docs/indices/development-guide.md`](../../docs/indices/development-guide.md)
- **Padrões de Componentes**: [`docs/indices/component-patterns.md`](../../docs/indices/component-patterns.md)

---

## 🤝 Contribuir

Ao adicionar novos utilitários:

1. Seguir template e guidelines acima
2. Adicionar tests (quando aplicável)
3. Atualizar `index.ts`
4. Atualizar `docs/indices/utils-index.md`
5. Adicionar exemplos neste README
6. Solicitar code review

---

*Última atualização: 2025-01-09*

