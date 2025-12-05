# 📚 Índices e Documentação Fundamental

**Bem-vindo à documentação central do projeto GSPackages!**

Este diretório contém os **documentos mais críticos** do projeto. Leitura obrigatória para qualquer colaborador (humano ou IA).

---

## 🔴 CRÍTICO - Leitura Obrigatória

### Para IA/LLM (Ler SEMPRE no início de cada sessão):

1. **[AI Memory Rules](./ai-memory-rules.md)** ⚠️  
   Regras fundamentais que a IA DEVE SEMPRE seguir  
   Checklist obrigatório, ferramentas, proibições, metas de qualidade

2. **[Essential Context](../context/essential-context.md)** 📋  
   Contexto essencial do projeto (estado atual, stack, princípios)  
   42 packages, status de testes, estrutura, comandos úteis

3. **[Analyze-Then-Act Workflow](./analyze-then-act-workflow.md)** 🔍  
   Workflow oficial em 3 fases (Análise → Apresentar → Implementar)  
   Exemplos práticos, quando seguir, checklist

4. **[Communication Guidelines](./communication-guidelines.md)** 💬  
   Como comunicar efetivamente (NUNCA ASSUMIR - SEMPRE PERGUNTAR)  
   Tom colaborativo, expor dúvidas, partilhar opinião técnica

---

## 🟡 IMPORTANTE - Consultar Frequentemente

### Progress Trackers:

5. **[Packages Checklist](../progress/PACKAGES-CHECKLIST.md)** ✅  
   Status de todos os 42 packages (100% migrados)  
   Estado de testes por componente

6. **[Test Plan](../progress/TEST-PLAN.md)** 🧪  
   Plano completo de testes em 7 bursts  
   Template de testes, metas de qualidade

7. **[Session Notes](../progress/)** 📅  
   Resumos de sessões de desenvolvimento  
   Conquistas, aprendizagens, próximos passos

### Guides:

8. **[GitHub Actions](../guides/github-actions.md)** 🔄  
   CI/CD setup e troubleshooting

9. **[Publishing Guide](../guides/publishing-guide.md)** 📦  
   Como publicar packages no npm

10. **[Token Setup](../guides/token-setup.md)** 🔑  
    Configurar GitHub PAT

---

## 🟢 ÚTIL - Referências e Templates

### Best Practices (A CRIAR):

11. **[Best Practices](./best-practices.md)** 🎯  
    Melhores práticas consolidadas  
    Do's and Don'ts, exemplos de código

12. **[Component Patterns](./component-patterns.md)** 🏗️  
    Padrões arquiteturais (compound components, polymorphism)  
    Estrutura de pastas obrigatória

### Packaging (A CRIAR):

13. **[Authoring Rules](../packaging/authoring-rules.md)** 📝  
    Regras detalhadas de criação de componentes  
    Checklist de validação, dependências permitidas

14. **[Component Template](../packaging/component-template.md)** 📄  
    Template completo de estrutura de componente

15. **[Acceptable Exceptions](../packaging/acceptable-exceptions.md)** ⚠️  
    Libraries headless permitidas (@tanstack/react-table)

---

## 📖 Como Usar Esta Documentação

### Para IA/LLM:

```markdown
🚀 INÍCIO DE SESSÃO:
1. LER: ai-memory-rules.md (2min)
2. LER: essential-context.md (3min)
3. VERIFICAR: PACKAGES-CHECKLIST.md (status atual)

💻 DURANTE DESENVOLVIMENTO:
- SEGUIR: analyze-then-act-workflow.md (sempre!)
- APLICAR: communication-guidelines.md (sempre!)
- CONSULTAR: test-plan.md (se trabalhar em testes)

✅ ANTES DE COMMIT:
- ATUALIZAR: PACKAGES-CHECKLIST.md (se necessário)
- ATUALIZAR: Session notes (resumo do que foi feito)
```

### Para Humanos:

```markdown
📚 ONBOARDING:
1. README.md (raiz do projeto) - Overview
2. START-HERE.md - Setup em 3 passos
3. essential-context.md - Estado atual
4. PACKAGES-CHECKLIST.md - O que está feito

🛠️ DESENVOLVIMENTO:
- Consultar README de componente específico
- Seguir best-practices.md
- Usar component-template.md para novos componentes

🔄 CI/CD:
- Ver guides/github-actions.md
- Simular localmente: ./simulate-ci.ps1

📦 PUBLICAÇÃO:
- Ver guides/publishing-guide.md
- Setup token: guides/token-setup.md
```

---

## 🗂️ Estrutura Completa de Documentação

```
docs/
├── indices/                    # 📚 Documentação fundamental (ESTE DIRETÓRIO)
│   ├── README.md              # Índice mestre (ESTE FICHEIRO)
│   ├── ai-memory-rules.md     # ⚠️ CRÍTICO - Regras para IA
│   ├── analyze-then-act-workflow.md  # 🔍 CRÍTICO - Workflow oficial
│   ├── communication-guidelines.md   # 💬 CRÍTICO - Como comunicar
│   ├── best-practices.md      # 🎯 A CRIAR - Melhores práticas
│   └── component-patterns.md  # 🏗️ A CRIAR - Padrões arquiteturais
│
├── context/                    # 📋 Contexto e referências
│   ├── essential-context.md   # ⚠️ CRÍTICO - Contexto essencial
│   ├── quick-reference.md     # 🚀 A CRIAR - Cheat sheet
│   └── working-memory.md      # 💾 A CRIAR - Estado atual da sessão
│
├── packaging/                  # 📦 Regras de packaging
│   ├── authoring-rules.md     # 📝 A CRIAR - Regras de criação
│   ├── component-template.md  # 📄 A CRIAR - Template de componente
│   └── acceptable-exceptions.md # ⚠️ A CRIAR - Exceções permitidas
│
├── progress/                   # 📊 Progress trackers
│   ├── PACKAGES-CHECKLIST.md  # ✅ Status de packages
│   ├── TEST-PLAN.md           # 🧪 Plano de testes
│   └── SESSION-*.md           # 📅 Notas de sessões
│
├── guides/                     # 📖 Guias práticos
│   ├── github-actions.md      # CI/CD
│   ├── publishing-guide.md    # Publicação npm
│   ├── token-setup.md         # GitHub PAT
│   └── ...
│
├── historical/                 # 🗄️ Histórico de fixes
│   └── ...
│
└── notes/                      # 📝 Notas técnicas
    └── ...
```

---

## 🎯 Estado Atual (2025-12-05)

| Categoria | Status | Ficheiros |
|-----------|--------|-----------|
| **CRÍTICO** | ✅ 100% | 4/4 completos |
| **Progress** | ✅ 100% | Atualizados |
| **Guides** | ✅ 100% | 5/5 completos |
| **Best Practices** | 🟡 0% | 0/3 (FASE 2) |
| **Packaging** | 🟡 0% | 0/3 (FASE 2) |
| **Context** | 🟡 33% | 1/3 (FASE 2) |

**Total:** 10/16 documentos (62.5%)  
**FASE 1 (Crítica):** ✅ 100% COMPLETA!  
**FASE 2 (Importante):** ⏳ Pendente

---

## 📚 Documentação por Tipo

### 🤖 Para IA/LLM
- ai-memory-rules.md ⚠️
- essential-context.md ⚠️
- analyze-then-act-workflow.md ⚠️
- communication-guidelines.md ⚠️

### 👨‍💻 Para Desenvolvedor
- START-HERE.md (raiz)
- best-practices.md
- component-patterns.md
- authoring-rules.md

### 📊 Para Project Manager
- PACKAGES-CHECKLIST.md
- TEST-PLAN.md
- SESSION-*.md
- MASTER-MIGRATION-PLAN.md

### 🚀 Para DevOps
- github-actions.md
- publishing-guide.md
- token-setup.md

---

## 🔄 Manutenção

**Atualizar quando:**
- ✅ Criar novo componente → PACKAGES-CHECKLIST.md
- ✅ Completar testes → TEST-PLAN.md
- ✅ Fim de sessão → SESSION-*.md
- ✅ Mudar princípios → essential-context.md
- ✅ Novos padrões → best-practices.md

**Responsabilidade:**
- IA: Atualizar automaticamente durante desenvolvimento
- Humano: Validar em code reviews

---

## 🆘 FAQ Rápido

**Q: Onde começar?**  
A: Ler **ai-memory-rules.md** e **essential-context.md** (5min total)

**Q: Como criar novo componente?**  
A: Ver **component-template.md** (quando criado) ou copiar gs-button/

**Q: Como adicionar testes?**  
A: Ver **TEST-PLAN.md** e copiar template de gs-spinner/__tests__/

**Q: Posso usar MUI/Base UI?**  
A: ❌ NÃO! Ver **essential-context.md** (Princípio agnóstico)

**Q: Workflow de desenvolvimento?**  
A: **analyze-then-act-workflow.md** (3 fases obrigatórias)

**Q: Como comunicar dúvidas?**  
A: **communication-guidelines.md** (NUNCA ASSUMIR - SEMPRE PERGUNTAR)

---

## 📬 Feedback

Encontraste erro ou tens sugestão? 
- Criar issue no GitHub
- Ou contactar: carlos.braga@grupoglobalsoft.pt

---

**Esta documentação é viva! Atualiza sempre que necessário.** 📚✨

