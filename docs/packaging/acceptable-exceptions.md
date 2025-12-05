# ⚠️ Acceptable Exceptions - Exceções Aceitáveis

**Status:** Dependências headless permitidas (exceções à regra de zero deps externas)  
**Última Atualização:** 2025-12-05  
**Aprovação:** Requer análise e documentação neste ficheiro

---

## 🎯 Princípio Geral

**Regra padrão:** Zero dependências em frameworks de UI externos.

**Exceção permitida:** Libraries **headless** (apenas lógica, zero UI) que:
- ✅ São headless (não renderizam UI, não forçam estilos)
- ✅ São agnósticas (funcionam com qualquer framework)
- ✅ Economizam >1 mês de trabalho
- ✅ Mantêm controle visual 100% (apenas lógica/state)
- ✅ São bem mantidas e battle-tested
- ✅ Têm documentação clara e ativa comunidade

---

## ✅ Exceções Aprovadas

### 1. @tanstack/react-table

**Status:** ✅ APROVADO  
**Usada em:** `@carlos-gs99/gs-table`  
**Versão:** ^8.0.0

#### Justificação

| Critério | Avaliação |
|----------|-----------|
| **Headless?** | ✅ SIM - Zero UI, apenas lógica de tabelas |
| **Agnóstico?** | ✅ SIM - Funciona com qualquer framework |
| **Tempo economizado** | ✅ ~2-3 meses (complexidade de sorting, filtering, pagination) |
| **Controle visual** | ✅ 100% - Não força estilos, apenas state management |
| **Manutenção** | ✅ Active - TanStack é bem mantido |
| **Documentação** | ✅ Excelente - Docs completos, exemplos claros |
| **Community** | ✅ Grande - Usado em milhares de projetos |

#### O Que Faz

- **State management** de tabelas complexas
- **Sorting** (cliente e servidor)
- **Filtering** (cliente e servidor)
- **Pagination** (cliente e servidor)
- **Row selection** (single/multi)
- **Column visibility** e ordenação
- **Virtualization** (performance)

#### O Que NÃO Faz (controlo nosso)

- ❌ Não renderiza UI (controlo 100% nosso)
- ❌ Não aplica estilos (CSS Modules nossos)
- ❌ Não força estrutura HTML (escolhemos elementos)

#### Uso no Projeto

```tsx
// gs-table/src/GSTable.tsx
import { useReactTable } from '@tanstack/react-table';

// ✅ Usamos apenas para lógica/state
const table = useReactTable({
  data,
  columns,
  // TanStack gere estado
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
});

// ✅ Controlamos 100% do visual
return (
  <table className={styles.table}>  {/* Nosso CSS */}
    <thead className={styles.thead}>  {/* Nosso HTML */}
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <th className={styles.th}>  {/* Nosso estilo */}
              {/* Nosso componente */}
              <GSButton onClick={header.column.getToggleSortingHandler()}>
                {header.column.columnDef.header}
              </GSButton>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  </table>
);
```

#### Alternativa Sem Esta Library

Teríamos que implementar manualmente:
- ❌ **2-3 semanas** - Sorting (multi-column, direction, persist state)
- ❌ **2-3 semanas** - Filtering (types, operators, combined filters)
- ❌ **1-2 semanas** - Pagination (client/server, page size, jump to page)
- ❌ **1 semana** - Row selection (single/multi, select all, persist)
- ❌ **1 semana** - Column visibility/ordering
- ❌ **2 semanas** - Virtualization (performance com 10k+ rows)
- ❌ **1-2 semanas** - Testes para toda esta lógica

**Total:** ~2-3 meses de trabalho complexo

#### Conclusão

✅ **Aprovado** - Economia de tempo justifica exceção, mantém controlo 100% do visual.

---

## ❌ Exceções REJEITADAS

### 1. @mui/base

**Status:** ❌ REJEITADO

#### Razões

| Critério | Avaliação |
|----------|-----------|
| **Headless?** | ⚠️ PARCIAL - Tenta ser, mas força estrutura |
| **Agnóstico?** | ❌ NÃO - Acoplado ao ecossistema MUI |
| **Controle visual** | ❌ 60% - Força muita estrutura HTML |
| **Package-ready** | ❌ NÃO - Dependência de @mui/system, contextos |

#### Alternativa

✅ Usar `@carlos-gs99/primitives` (nossos próprios headless components)

---

### 2. react-bootstrap / Bootstrap

**Status:** ❌ REJEITADO

#### Razões

- ❌ Framework completo de UI (não headless)
- ❌ Força estilos e estrutura
- ❌ Quebraria princípio package-ready
- ❌ Acoplamento a Bootstrap CSS

---

### 3. Chakra UI

**Status:** ❌ REJEITADO

#### Razões

- ❌ Framework completo de UI
- ❌ Dependência de providers/contextos
- ❌ Não é package-ready (precisa de ChakraProvider)

---

### 4. Ant Design

**Status:** ❌ REJEITADO

#### Razões

- ❌ Framework completo de UI
- ❌ Força estilos own
- ❌ Não é modular o suficiente
- ❌ Quebra princípio agnóstico

---

## 🔄 Processo de Aprovação

Para adicionar nova exceção:

### 1. Análise Inicial

Responder estas questões:

```markdown
# Proposta de Exceção: [Nome da Library]

## 1. É headless?
- [ ] SIM - Zero UI, apenas lógica
- [ ] PARCIAL - Tem UI mas customizável
- [ ] NÃO - Força UI/estilos

## 2. É agnóstica?
- [ ] SIM - Funciona com qualquer framework
- [ ] PARCIAL - Prefere certo framework mas funciona com outros
- [ ] NÃO - Acoplada a framework específico

## 3. Tempo economizado?
- [ ] >3 meses
- [ ] 1-3 meses
- [ ] <1 mês

## 4. Controle visual?
- [ ] 100% - Zero estilos forçados
- [ ] 80-99% - Alguns estilos mas override fácil
- [ ] <80% - Força muitos estilos

## 5. Manutenção?
- [ ] Active - Updates frequentes, comunidade ativa
- [ ] Stable - Poucos updates mas estável
- [ ] Inactive - Sem updates há >6 meses

## 6. Documentação?
- [ ] Excelente - Docs completos, exemplos claros
- [ ] Boa - Docs OK, alguns exemplos
- [ ] Pobre - Docs incompletos ou confusos

## 7. Alternativa viável?
- [ ] NÃO - Impossível/impraticável fazer in-house
- [ ] DIFÍCIL - Possível mas levaria >1 mês
- [ ] FÁCIL - Podemos fazer in-house em <1 mês
```

### 2. Aprovação

**Critérios para aprovação:**
- ✅ Headless (pergunta 1 = SIM)
- ✅ Agnóstica (pergunta 2 = SIM ou PARCIAL)
- ✅ Economiza >1 mês (pergunta 3 = 1-3 meses ou >3 meses)
- ✅ Controle 80%+ (pergunta 4 = 100% ou 80-99%)
- ✅ Active/Stable (pergunta 5 = Active ou Stable)
- ✅ Boa docs (pergunta 6 = Excelente ou Boa)

**Se 5+ critérios ✅:** Aprovação provável  
**Se 3-4 critérios ✅:** Análise caso a caso  
**Se <3 critérios ✅:** Rejeição provável

### 3. Documentação

Se aprovada, documentar neste ficheiro:

```markdown
### X. [Nome da Library]

**Status:** ✅ APROVADO  
**Usada em:** `@carlos-gs99/gs-component`  
**Versão:** ^X.Y.Z

#### Justificação
[Preencher tabela de critérios]

#### O Que Faz
[Lista de funcionalidades]

#### O Que NÃO Faz (controlo nosso)
[Lista do que não controla]

#### Uso no Projeto
```tsx
// Exemplo de uso
```

#### Alternativa Sem Esta Library
[Estimativa de tempo/complexidade]

#### Conclusão
[Justificação final]
```

---

## 📋 Checklist de Validação

Antes de adicionar dependência:

- [ ] Li este documento completo?
- [ ] Library é headless (zero UI forçada)?
- [ ] Library economiza >1 mês de trabalho?
- [ ] Mantemos controle 80%+ do visual?
- [ ] Library é bem mantida?
- [ ] Documentação é adequada?
- [ ] Alternativa in-house é impraticável/muito custosa?
- [ ] Documentei proposta neste ficheiro?
- [ ] Obtive aprovação de code review?

**Se TODOS ✅:** Pode adicionar  
**Se QUALQUER ❌:** Não adicionar, buscar alternativa

---

## 🚨 Regras Críticas

### ❌ NUNCA Adicionar

Estas categorias são **proibidas absolutamente**:

1. **Frameworks de UI completos**
   - MUI, Bootstrap, Chakra UI, Ant Design, Semantic UI, etc.

2. **Libraries que forçam estilos**
   - Qualquer library com CSS próprio obrigatório

3. **Libraries que dependem de providers/contextos externos**
   - Quebra princípio package-ready

4. **Libraries específicas de framework**
   - Acopladas a Next.js, Gatsby, etc (exceto se opcional)

5. **Libraries que duplicam funcionalidade existente**
   - Se já temos in-house, não adicionar externa

### ✅ Sempre Preferir

1. **Implementação in-house** quando possível
2. **`@carlos-gs99/primitives`** para headless components
3. **`@carlos-gs99/utils`** para utilidades
4. **`@carlos-gs99/hooks`** para hooks compartilhados

---

## 📊 Status Atual

| Category | Aprovadas | Rejeitadas | Em Análise |
|----------|-----------|------------|------------|
| **Headless Utilities** | 1 | 0 | 0 |
| **UI Frameworks** | 0 | 4 | 0 |
| **Totais** | **1** | **4** | **0** |

**Taxa de aprovação:** 20% (1/5)  
**Última atualização:** 2025-12-05

---

## 🔗 Referências

- **TanStack Table:** https://tanstack.com/table/latest
- **Princípio Agnóstico:** `docs/packaging/authoring-rules.md`
- **Package-Ready:** `docs/context/essential-context.md`

---

**Exceções são raras! Default é sempre zero deps externas.** ⚠️

