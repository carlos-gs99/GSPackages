# ⚠️ GSOffcanvas - Dependência Base UI

**Data:** 2025-12-03  
**Status:** Bloqueado para migração

---

## Problema

GSOffcanvas usa **@base-ui-components/react/dialog** que é uma **biblioteca UI externa**.

Isto **viola as regras GS Style** de zero dependências em frameworks UI externos.

---

## Código Atual

```typescript
import { Dialog } from '@base-ui-components/react/dialog';
```

O componente depende completamente de Base UI Dialog para funcionalidade.

---

## Solução Necessária

**Opção A:** Reescrever GSOffcanvas custom
- Usar Overlay do @carlos-gs99/primitives
- Implementar side panel manual
- Focus trap custom
- Estimativa: 1.5-2h

**Opção B:** Criar versão simplificada
- Portal + position fixed
- Transitions CSS
- Sem Base UI
- Estimativa: 1h

**Opção C:** Adiar para v2
- Publicar outros componentes primeiro
- Voltar quando tiver tempo

---

## Recomendação

**Opção C** - Adiar e focar em componentes sem deps externas.

GSOffcanvas pode ser recriado depois usando GSModal como base (já temos modal com overlay e portal).

---

## Para Rever

- [ ] Criar GSOffcanvas custom baseado em GSModal
- [ ] Ou adicionar Base UI Dialog como exceção aceitável
- [ ] Documentar decisão em docs/packaging/acceptable-exceptions.md

---

**Prioridade:** Média  
**Bloqueio:** Deps UI externa

