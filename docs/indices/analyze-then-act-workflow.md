# 🔍 Analyze-Then-Act Workflow - Metodologia Oficial

**Status:** OBRIGATÓRIO - Seguir em TODAS as ações  
**Última Atualização:** 2025-12-05  
**Versão:** 2.0

---

## 🎯 TL;DR - Resumo em 30 Segundos

**Workflow em 3 fases:**

1. **🔍 ANÁLISE** - Investigar SEM tocar no código
2. **💬 APRESENTAR** - Mostrar descobertas e propor soluções
3. **⚡ IMPLEMENTAR** - Aplicar após confirmação

**Benefícios:**
- ✅ Previne mudanças precipitadas
- ✅ Evita retrabalho
- ✅ Garante decisões informadas
- ✅ Colaboração efetiva

---

## 📊 Visão Geral do Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    PEDIDO DO UTILIZADOR                      │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  FASE 1: ANÁLISE (SEM tocar no código!)                     │
│  • Investigar problema completamente                         │
│  • Ler erros completos, stack traces                         │
│  • Comparar com código funcionando                           │
│  • Usar codebase_search, grep, read_file                     │
│  • Documentar TODAS as descobertas                           │
│  • Listar TODAS as soluções possíveis (mínimo 2)            │
│  • Avaliar prós/contras de cada solução                     │
│  • Identificar efeitos colaterais potenciais                 │
│  • Expor TODAS as dúvidas identificadas                      │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  FASE 2: APRESENTAR (Comunicar claramente!)                  │
│  • Mostrar análise estruturada ao utilizador                 │
│  • Usar tabelas de comparação                                │
│  • Exemplos ANTES/DEPOIS                                     │
│  • Expor dúvidas claramente                                  │
│  • Partilhar opinião técnica fundamentada                    │
│  • Propor soluções com prós/contras                          │
│  • Questionar se algo parece estranho                        │
│  • Aguardar confirmação do utilizador                        │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
              ┌───────────────┐
              │ Utilizador    │
              │ Confirmou?    │
              └───────┬───────┘
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼ Não                   ▼ Sim
  ┌───────────────┐       ┌─────────────────────────────────┐
  │ Ajustar       │       │  FASE 3: IMPLEMENTAR            │
  │ Proposta      │       │  • Aplicar solução completa     │
  │ (voltar fase 2)│      │  • Validar com linting          │
  └───────────────┘       │  • Atualizar índices            │
                          │  • Criar resumo executivo       │
                          │  • Confirmar sucesso            │
                          └─────────────────────────────────┘
```

---

## 🔴 FASE 1: ANÁLISE (SEM Tocar no Código!)

### Objetivo
Entender completamente o problema/pedido ANTES de fazer qualquer modificação.

### Ações Obrigatórias

#### 1. 📖 Ler Contexto Essencial
```bash
✅ SEMPRE ler primeiro:
- docs/context/essential-context.md
- docs/progress/PACKAGES-CHECKLIST.md
- README.md do componente (se aplicável)
```

#### 2. 🔍 Investigar Problema Completamente

**Se for um erro:**
```
✅ Ler mensagem de erro COMPLETA
✅ Ler stack trace completo
✅ Identificar linha exata do erro
✅ Entender o que o código estava tentando fazer
✅ Verificar valores de variáveis relevantes
```

**Se for uma feature:**
```
✅ Entender requisito completo
✅ Verificar se já existe similar
✅ Identificar componentes afetados
✅ Avaliar complexidade
✅ Listar dependências necessárias
```

#### 3. 🔎 Comparar com Código Funcionando

**Usar ferramentas:**
```typescript
// codebase_search para encontrar padrões
Query: "Como outros componentes implementam X?"
Target: ["gs-button", "gs-chip"]

// grep para busca exata
Pattern: "useDebug"
Path: "GSPackages/gs-*"

// read_file para entender implementação
File: "gs-button/src/GSButton.tsx"
```

**Comparar:**
- ✅ Payloads de API
- ✅ Estruturas de dados
- ✅ Implementações similares
- ✅ Props e tipos
- ✅ Estilos CSS

#### 4. 📝 Documentar TODAS as Descobertas

**Template de análise:**
```markdown
### 🔍 ANÁLISE COMPLETA

#### Problema Identificado:
[Descrição clara do problema]

#### Causa Raiz:
[Causa exata, não sintoma]

#### Código Atual (ANTES):
```typescript
// Mostrar código problemático
```

#### Comparação com Código Funcionando:
```typescript
// Mostrar código que funciona
```

#### Diferenças Identificadas:
1. [Diferença 1]
2. [Diferença 2]
3. [Diferença 3]

#### Hipóteses:
- [ ] Hipótese 1: [Explicação]
- [ ] Hipótese 2: [Explicação]
- [ ] Hipótese 3: [Explicação]
```

#### 5. 💡 Listar TODAS as Soluções Possíveis

**Mínimo 2 soluções, idealmente 3+**

**Template:**
```markdown
### 💡 SOLUÇÕES PROPOSTAS

#### Solução A: [Nome descritivo]
**Descrição:** [Como funciona]
**Prós:**
- ✅ [Vantagem 1]
- ✅ [Vantagem 2]
**Contras:**
- ❌ [Desvantagem 1]
- ❌ [Desvantagem 2]
**Complexidade:** Baixa/Média/Alta
**Tempo Estimado:** [Xmin]
**Efeitos Colaterais:** [Lista]

#### Solução B: [Nome descritivo]
[Mesmo formato]

#### Solução C: [Nome descritivo]
[Mesmo formato]

### 🎯 Recomendação:
Solução [A/B/C] porque [justificação fundamentada nas specs do projeto]
```

#### 6. ❓ Expor TODAS as Dúvidas

**Exemplos de dúvidas válidas:**
```
❓ "Não tenho certeza se devemos usar approach A ou B. 
   A é mais simples mas menos flexível. B é mais complexo mas mais robusto. 
   Qual preferes?"

❓ "Identifiquei que o componente X não tem prop Y. 
   Devo adicionar ou há outra forma de resolver?"

❓ "O código legacy faz Z de forma diferente. 
   Devemos manter compatibilidade ou podemos melhorar?"

❓ "Esta mudança pode afetar componentes A, B, C. 
   Devemos testar todos ou focar em casos críticos?"
```

---

## 🟡 FASE 2: APRESENTAR (Comunicar Claramente!)

### Objetivo
Partilhar descobertas de forma estruturada e obter confirmação antes de implementar.

### Ações Obrigatórias

#### 1. 📊 Mostrar Análise Estruturada

**Formato recomendado:**
```markdown
# 🔍 ANÁLISE - [Nome do Problema/Feature]

## 📋 Resumo Executivo
[2-3 linhas sobre o que foi descoberto]

## 🔎 Investigação Detalhada
[Tabela de comparação, exemplos ANTES/DEPOIS]

## 💡 Soluções Propostas
[Lista de soluções com prós/contras]

## ❓ Dúvidas Identificadas
[Lista de questões que precisam de clarificação]

## 🎯 Recomendação
[Opinião técnica fundamentada]

## ⏱️ Próximos Passos
[O que acontece após confirmação]
```

#### 2. 📈 Usar Tabelas de Comparação

**Exemplo - Comparação de Soluções:**
| Critério | Solução A | Solução B | Solução C |
|----------|-----------|-----------|-----------|
| **Complexidade** | Baixa | Média | Alta |
| **Tempo** | 10min | 30min | 1h |
| **Manutenção** | Fácil | Média | Difícil |
| **Performance** | OK | Ótima | Ótima |
| **Backward Compat** | ✅ | ✅ | ❌ |
| **Recomendação** | 🥉 | 🥇 | 🥈 |

**Exemplo - Comparação ANTES/DEPOIS:**
| Aspecto | ANTES (Problema) | DEPOIS (Solução B) |
|---------|------------------|-------------------|
| **Props** | 5 props | 7 props (+debug, +variant) |
| **Deps** | Base UI ❌ | @carlos-gs99/primitives ✅ |
| **CSS** | Inline styles | CSS Modules ✅ |
| **i18n** | Hardcoded ❌ | en.json + pt.json ✅ |
| **Testes** | 0 ❌ | 3 ficheiros ✅ |

#### 3. 💭 Partilhar Opinião Técnica

**Template:**
```markdown
### 🤔 Minha Opinião Técnica:

Recomendo **Solução B** porque:

1. **Alinhamento com specs:** 
   - Usa primitivos de @carlos-gs99/primitives (princípio agnóstico)
   - CSS Modules + tokens (sem inline)
   - i18n completo (EN + PT)

2. **Qualidade:**
   - Cobertura de testes 80%+
   - WCAG AA compliance
   - TypeScript strict

3. **Manutenção:**
   - Código mais limpo
   - Documentação completa
   - Padrão consistente com outros componentes

4. **Performance:**
   - Bundle size menor
   - Menos re-renders

**Trade-off:** 
Solução B leva 20min a mais que Solução A, mas garante qualidade superior 
e consistência com o resto do projeto.

**Mas** se o tempo for crítico, Solução A também funciona (com menos features).

O que preferes? 🤔
```

#### 4. ❓ Questionar Quando Necessário

**Exemplos:**
```
⚠️ "Reparei que o componente legacy usa approach X, mas não faz muito sentido 
   porque Y. Devo manter compatibilidade ou podemos melhorar?"

⚠️ "Esta mudança vai afetar 5 componentes. Devemos fazer tudo agora ou 
   implementar gradualmente?"

⚠️ "O requisito menciona feature Z, mas isso conflita com princípio agnóstico. 
   Como devemos proceder?"
```

#### 5. ⏸️ Aguardar Confirmação

**CRÍTICO:** 
- ❌ **NÃO** implementar sem confirmação
- ❌ **NÃO** assumir resposta
- ❌ **NÃO** "adivinhar" o que utilizador quer
- ✅ **SIM** aguardar resposta explícita
- ✅ **SIM** clarificar se resposta ambígua

---

## 🟢 FASE 3: IMPLEMENTAR (Após Confirmação!)

### Objetivo
Aplicar solução completa e validada com qualidade máxima.

### Ações Obrigatórias

#### 1. ⚡ Aplicar Solução Completa

**NÃO fazer implementação incremental parcial!**

```
❌ MAU - Implementação parcial:
1. Adicionar prop X
2. (Esquecer de atualizar types.ts)
3. (Esquecer de documentar)
4. (Esquecer de testar)

✅ BOM - Implementação completa:
1. Adicionar prop X ao componente
2. Atualizar types.ts com TSDoc
3. Atualizar README.md
4. Adicionar testes
5. Validar linting
6. Confirmar build passa
7. Executar testes
```

#### 2. ✅ Validar com Linting

**Após cada mudança:**
```bash
# Build para verificar TypeScript
npm run build --workspace gs-component

# Linting
npm run lint

# Se houver erros, corrigir ANTES de continuar
```

#### 3. 📝 Atualizar Documentação

**Checklist:**
- [ ] README.md do componente atualizado?
- [ ] types.ts com TSDoc atualizado?
- [ ] PACKAGES-CHECKLIST.md atualizado (se necessário)?
- [ ] TEST-PLAN.md atualizado (se testes)?
- [ ] Session notes atualizadas?

#### 4. 📊 Criar Resumo Executivo

**Template:**
```markdown
## ✅ IMPLEMENTAÇÃO COMPLETA

### 🎯 O Que Foi Feito:
- [x] [Mudança 1]
- [x] [Mudança 2]
- [x] [Mudança 3]

### 📦 Ficheiros Modificados:
- `gs-component/src/Component.tsx` - [Descrição]
- `gs-component/src/types.ts` - [Descrição]
- `gs-component/README.md` - [Descrição]

### ✅ Validações:
- [x] Build passou (0 erros TypeScript)
- [x] Linting passou (0 warnings)
- [x] Testes passaram (se existirem)
- [x] Documentação atualizada

### 📊 Impacto:
- **Componentes afetados:** [Lista]
- **Breaking changes:** Nenhum/[Lista]
- **Tempo total:** [Xmin]

### 🚀 Próximo Passo:
[O que vem a seguir, se aplicável]
```

#### 5. ✅ Confirmar Sucesso

**Validação final:**
```bash
# Build completo
cd GSPackages
npm run build

# Verificar que package específico buildou
ls gs-component/dist/

# Se testes existirem, executar
npm test -- gs-component
```

---

## 📋 Exemplos Práticos

### Exemplo 1: Corrigir Erro de Build

#### ❌ ERRADO (Sem Workflow):
```
Usuário: "gs-toast tem erro de build"
IA: [aplica fix imediatamente sem investigar]
Resultado: Fix incorreto, cria mais problemas
```

#### ✅ CORRETO (Com Workflow):

**FASE 1 - ANÁLISE:**
```markdown
🔍 Investigação:
- Erro: "Module '@carlos-gs99/gs-icon' has no exported member 'GSIcon'"
- Causa: gs-icon não está em external[] do tsup.config.ts
- Comparação: gs-modal faz corretamente (tem gs-icon em external)

💡 Solução A: Adicionar gs-icon a external[]
- Prós: Fix rápido, consistente com outros
- Contras: Nenhum
- Tempo: 2min

💡 Solução B: Remover dependência de gs-icon
- Prós: Menos deps
- Contras: Perde funcionalidade, retrabalho grande
- Tempo: 30min

🎯 Recomendação: Solução A (standard no projeto)
```

**FASE 2 - APRESENTAR:**
```markdown
📊 Descobri o problema do gs-toast:

| Ficheiro | Problema | Solução |
|----------|----------|---------|
| tsup.config.ts | Falta gs-icon em external[] | Adicionar |

ANTES:
```ts
external: ['react', 'react-dom']
```

DEPOIS:
```ts
external: ['react', 'react-dom', 'gs-icon']
```

Isto é o padrão usado em gs-modal, gs-alert, etc.

Posso aplicar? ✅
```

**FASE 3 - IMPLEMENTAR:**
```markdown
✅ Aplicado fix:
- Atualizado tsup.config.ts
- Build passou ✅
- Sem erros TypeScript ✅

Ficheiros modificados:
- gs-toast/tsup.config.ts

Tempo: 2min
```

---

### Exemplo 2: Adicionar Nova Feature

#### ❌ ERRADO (Sem Workflow):
```
Usuário: "Adicionar ripple effect ao GSButton"
IA: [copia código de outro projeto sem verificar consistência]
Resultado: Código inconsistente, quebra padrões do projeto
```

#### ✅ CORRETO (Com Workflow):

**FASE 1 - ANÁLISE:**
```markdown
🔍 Investigação:
- Ripple já existe em: gs-checkbox, gs-radio, gs-switch
- Implementação: Hook useRipple em partials/
- Deps: Nenhuma externa, apenas CSS

💡 Solução A: Copiar useRipple de gs-checkbox
- Prós: Padrão estabelecido, código testado
- Contras: Duplicação (não crítico)
- Tempo: 15min

💡 Solução B: Criar package @carlos-gs99/use-ripple compartilhado
- Prós: DRY, reutilizável
- Contras: Overhead de package, não urgente
- Tempo: 1h

💡 Solução C: Implementar do zero
- Prós: Customizado
- Contras: Reinventar roda, potenciais bugs
- Tempo: 45min

🎯 Recomendação: Solução A agora, considerar B no futuro
```

**FASE 2 - APRESENTAR:**
```markdown
📊 Análise completa do ripple effect:

Encontrei que 3 componentes já têm ripple:
- gs-checkbox → src/hooks/useRipple.ts
- gs-radio → src/hooks/useRipple.ts
- gs-switch → (inline, não hook)

Comparação de implementações:
| Componente | Approach | Qualidade |
|------------|----------|-----------|
| gs-checkbox | Hook useRipple | ✅ Melhor |
| gs-radio | Hook useRipple | ✅ Melhor |
| gs-switch | Inline | ⚠️ OK |

Proposta: Copiar hook de gs-checkbox para gs-button

ANTES (gs-button):
- Sem ripple effect

DEPOIS (gs-button):
- useRipple hook
- Ripple CSS em styles.module.css
- Nova prop: disableRipple?: boolean

Tempo: ~15min
Risco: Baixo (código já testado)

❓ Dúvida: Devemos também adicionar a gs-chip já que estamos nisso?

O que achas? 🤔
```

**FASE 3 - IMPLEMENTAR:**
```markdown
✅ Ripple effect adicionado ao GSButton:

Mudanças:
1. ✅ Copiado useRipple de gs-checkbox
2. ✅ Integrado no GSButton.tsx
3. ✅ Adicionado CSS para ripple
4. ✅ Adicionado prop disableRipple
5. ✅ Atualizado types.ts com TSDoc
6. ✅ Atualizado README.md
7. ✅ Testado manualmente

Ficheiros modificados:
- gs-button/src/hooks/useRipple.ts (novo)
- gs-button/src/GSButton.tsx
- gs-button/src/styles.module.css
- gs-button/src/types.ts
- gs-button/README.md

Validações:
- Build: ✅ Passou
- Linting: ✅ Passou
- TypeScript: ✅ Sem erros

Tempo real: 18min (vs 15min estimado)

🎯 Próximo: Criar testes para ripple effect?
```

---

## 🚨 Quando NÃO Seguir Este Workflow?

**Exceções raríssimas (< 5% dos casos):**

1. **Typo óbvio** - Correção de "colro" → "color"
2. **Ajuste trivial** - Adicionar vírgula, fechar parêntesis
3. **Comando direto trivial** - "Execute npm test"

**Para TODO o resto: SEGUIR WORKFLOW!**

---

## ✅ Checklist Rápido

Antes de cada ação, perguntar:

- [ ] Li contexto essencial?
- [ ] Investiguei completamente (FASE 1)?
- [ ] Documentei descobertas?
- [ ] Listei soluções (mínimo 2)?
- [ ] Expus dúvidas?
- [ ] Partilhei opinião fundamentada (FASE 2)?
- [ ] Mostrei comparações/exemplos?
- [ ] Aguardei confirmação?
- [ ] Apliquei solução completa (FASE 3)?
- [ ] Validei com linting?
- [ ] Atualizei documentação?
- [ ] Criei resumo executivo?

---

**Este workflow garante qualidade máxima e previne erros! Segue sempre!** 🎯

