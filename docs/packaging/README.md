# 📦 Packaging - Regras e Templates

**Diretório de regras de packaging, templates e exceções para criar componentes publicáveis.**

---

## 📄 Documentos Disponíveis

### ⚠️ CRÍTICO - Regras Obrigatórias

1. **[Authoring Rules](./authoring-rules.md)** 📝  
   **Status:** ✅ Completo  
   **Última Atualização:** 2025-12-05
   
   Regras OBRIGATÓRIAS para criar/modificar componentes:
   - Regra #1: Zero dependências externas de UI
   - Regra #2: Estrutura packlet obrigatória
   - Regra #3: CSS Modules + Tokens obrigatórios
   - Regra #4: i18n obrigatório (EN + PT)
   - Regra #5: Acessibilidade WCAG AA
   - Regra #6: Debug mode integrado
   - Regra #7: Testes obrigatórios (unit + a11y + i18n)
   - Regra #8: README completo
   - Checklist final de aprovação (20+ items)
   
   **Quando consultar:**
   - ⚠️ Antes de criar novo componente
   - ⚠️ Antes de modificar componente existente
   - ⚠️ Durante code review
   - ⚠️ Para validar se componente está completo

---

### 📄 IMPORTANTE - Templates

2. **[Component Template](./component-template.md)** 📋  
   **Status:** ✅ Completo  
   **Última Atualização:** 2025-12-05
   
   Template copy-paste para criar novos componentes:
   - Estrutura completa de pastas
   - 14 templates prontos para copiar:
     - package.json
     - tsup.config.ts
     - types.ts
     - Component.tsx
     - styles.module.css
     - i18n/en.json + pt.json
     - i18n.ts
     - index.ts
     - css-modules.d.ts
     - 3 ficheiros de testes
     - README.md
   - Checklist pós-criação
   
   **Quando usar:**
   - ✅ Criar novo componente do zero
   - ✅ Atualizar estrutura de componente antigo
   - ✅ Referência de boa estrutura

---

### ⚠️ IMPORTANTE - Exceções

3. **[Acceptable Exceptions](./acceptable-exceptions.md)** ⚠️  
   **Status:** ✅ Completo  
   **Última Atualização:** 2025-12-05
   
   Lista de dependências headless permitidas:
   - Princípio geral (zero deps externas)
   - Exceções aprovadas:
     - ✅ @tanstack/react-table (headless table utility)
   - Exceções rejeitadas:
     - ❌ @mui/base
     - ❌ react-bootstrap / Bootstrap
     - ❌ Chakra UI
     - ❌ Ant Design
   - Processo de aprovação (7 critérios)
   - Checklist de validação
   
   **Quando consultar:**
   - ⚠️ Antes de adicionar qualquer dependência externa
   - ⚠️ Durante análise de library nova
   - ⚠️ Para entender por que certa library é rejeitada

---

## 🎯 Como Usar Este Diretório

### Para Criar Novo Componente:

```markdown
1. **LER:** authoring-rules.md (entender regras)
2. **COPIAR:** component-template.md (todos os templates)
3. **ADAPTAR:** Substituir GSNewComponent pelo nome real
4. **IMPLEMENTAR:** Lógica específica do componente
5. **VALIDAR:** Checklist de authoring-rules.md
6. **BUILD & TEST:** Garantir que tudo passa
```

### Para Adicionar Dependência:

```markdown
1. **VERIFICAR:** acceptable-exceptions.md
2. **ANALISAR:** 7 critérios de aprovação
3. **DOCUMENTAR:** Se aprovada, adicionar ao ficheiro
4. **REJEITAR:** Se não cumpre critérios, buscar alternativa
```

### Para Code Review:

```markdown
1. **CHECKLIST:** authoring-rules.md (regra #1-8)
2. **ESTRUTURA:** component-template.md (ficheiros obrigatórios)
3. **DEPS:** acceptable-exceptions.md (deps permitidas)
4. **VALIDAR:** Build, test, lint passam
```

---

## 📊 Estado Atual

| Documento | Status | Completude |
|-----------|--------|------------|
| **authoring-rules.md** | ✅ Completo | 100% |
| **component-template.md** | ✅ Completo | 100% |
| **acceptable-exceptions.md** | ✅ Completo | 100% |

**Progresso:** 3/3 (100%)  
**Última atualização:** 2025-12-05

---

## 🔗 Documentos Relacionados

### Regras e Princípios:
- **[AI Memory Rules](../indices/ai-memory-rules.md)** - Regras para IA
- **[Best Practices](../indices/best-practices.md)** - Melhores práticas
- **[Component Patterns](../indices/component-patterns.md)** - Padrões arquiteturais

### Contexto:
- **[Essential Context](../context/essential-context.md)** - Estado do projeto
- **[Quick Reference](../context/quick-reference.md)** - Cheat sheet

### Workflows:
- **[Analyze-Then-Act](../indices/analyze-then-act-workflow.md)** - Workflow oficial
- **[Communication Guidelines](../indices/communication-guidelines.md)** - Como comunicar

---

## 🆘 FAQ Rápido

**Q: Posso usar MUI / Bootstrap / Chakra UI?**  
A: ❌ NÃO! Ver `acceptable-exceptions.md` (rejeitados)

**Q: Como criar componente novo?**  
A: Seguir `component-template.md` (copiar e adaptar)

**Q: Quais regras são obrigatórias?**  
A: TODAS as 8 regras em `authoring-rules.md`

**Q: Posso pular testes?**  
A: ❌ NÃO! 3 ficheiros obrigatórios (unit, a11y, i18n)

**Q: Posso usar estilos inline?**  
A: ❌ NÃO! Apenas CSS Modules + tokens

**Q: i18n é obrigatório?**  
A: ✅ SIM! EN + PT obrigatórios

**Q: Headless utilities são permitidas?**  
A: ⚠️ DEPENDE - Ver critérios em `acceptable-exceptions.md`

---

## 📝 Manutenção

### Quando Atualizar:

**authoring-rules.md:**
- Nova regra obrigatória adicionada
- Mudança em checklist de aprovação
- Atualização de padrões tecnológicos

**component-template.md:**
- Mudança na estrutura padrão
- Novos ficheiros obrigatórios
- Update de dependências base

**acceptable-exceptions.md:**
- Nova library proposta
- Library aprovada/rejeitada
- Mudança em critérios de aprovação

### Responsabilidade:
- **IA:** Propor atualizações quando identificar necessidade
- **Humano:** Aprovar mudanças em PR

---

**Estes documentos são a fundação do sistema de packaging!** 📦✨

