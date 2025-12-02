// ==========================================
// STRING UTILITIES
// ==========================================

/**
 * Converte texto para slug URL-friendly
 * @param text - Texto a ser convertido
 * @returns Slug formatado
 */
const convertToSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

/**
 * Converte primeira letra para maiúscula
 * @param string - String a ser convertida
 * @returns String com primeira letra maiúscula
 */
const toSentenceCase = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Extrai iniciais de nome completo
 * @param firstName - Primeiro nome
 * @param lastName - Último nome
 * @returns Iniciais concatenadas
 */
const getInitials = (firstName: string, lastName: string) => {
  const firstInitial = firstName?.[0] || '';
  const lastInitial = lastName?.[0] || '';
  return firstInitial + lastInitial;
};

/**
 * Divide nome completo em primeiro e último nome
 * @param nomeCompleto - Nome completo a ser dividido
 * @returns Objeto com firstName e lastName
 */
const dividirNomeCompleto = (nomeCompleto: string): { firstName: string; lastName: string } => {
  if (!nomeCompleto || typeof nomeCompleto !== 'string') {
    return { firstName: '', lastName: '' };
  }

  const partes = nomeCompleto.trim().split(/\s+/);
  
  if (partes.length === 1) {
    return { firstName: partes[0] || '', lastName: '' };
  }
  
  if (partes.length === 2) {
    return { firstName: partes[0] || '', lastName: partes[1] || '' };
  }
  
  // Se tiver mais de 2 partes, primeiro nome é a primeira parte, resto é sobrenome
  return {
    firstName: partes[0] || '',
    lastName: partes.slice(1).join(' ')
  };
};

// ==========================================
// OBSERVATIONS PARSING UTILITIES
// ==========================================

// Tipos para as observações de sessão
export interface ObservacaoSessao {
  id: number;
  raw: string;
  utilizador?: string;
  data?: string;
  hora?: string;
  codigoTratamento?: string;
  totalSessoes?: number;
  dataInicioTratamento?: string;
  dataFimTratamento?: string;
  numeroSessao?: number;
  fisioterapeuta?: {
    codigo: string;
    nome: string;
  };
  observacoesLivres?: string[];
}

export interface ObservacoesParseadas {
  total: number;
  observacoes: ObservacaoSessao[];
  raw: string;
}

export interface ObservacoesInfo {
  total: number;
  ultimaObservacao?: ObservacaoSessao;
  primeiraObservacao?: ObservacaoSessao;
  fisioterapeutas: string[];
  utilizadores: string[];
  sessoes: number[];
}

// Configuração para diferentes tipos de serviços
interface ParsingConfig {
  separadorBlocos: string;
  separadorLinhas: string;
  patterns: {
    utilizador: RegExp;
    codigoTratamento: string;
    totalSessoes: string;
    dataInicioTratamento: string;
    dataFimTratamento: string;
    numeroSessao: string;
    fisioterapeuta: RegExp;
  };
}

// Configurações padrão para observações de sessão
const defaultConfig: ParsingConfig = {
  separadorBlocos: '\r\n\r\n',
  separadorLinhas: '\r\n',
  patterns: {
    utilizador: /Utilizador:\s*(.+?)\s*-\s*(\d{2}-\d{2}-\d{4})\s*\((\d{2}:\d{2})\)/,
    codigoTratamento: 'Cód. Tratamento:',
    totalSessoes: 'Total de sessões:',
    dataInicioTratamento: 'Data Início Trat.:',
    dataFimTratamento: 'Data Fim Trat.:',
    numeroSessao: 'Sessão Nrº:',
    fisioterapeuta: /Fisioterapeuta:\s*(\d+)\s*-\s*(.+)/
  }
};

/**
 * Função genérica para fazer parsing de strings de observações
 * @param observacoesString - String a ser parseada
 * @param config - Configuração opcional para diferentes formatos
 * @returns Objeto parseado ou null se inválido
 */
const parseObservacoesString = (
  observacoesString: string, 
  config: Partial<ParsingConfig> = {}
): ObservacoesParseadas | null => {
  if (!observacoesString || typeof observacoesString !== 'string') {
    return null;
  }

  // Merge da configuração padrão com a configuração fornecida
  const finalConfig = { ...defaultConfig, ...config };

  // Dividir por blocos de observações
  const blocos = observacoesString
    .split(finalConfig.separadorBlocos)
    .filter(bloco => bloco.trim() !== '');
  
  const observacoes: ObservacaoSessao[] = blocos.map((bloco, index) => {
    const linhas = bloco
      .split(finalConfig.separadorLinhas)
      .filter(linha => linha.trim() !== '');
    
    const observacao: ObservacaoSessao = {
      id: index + 1,
      raw: bloco.trim()
    };

    // Extrair informações específicas de cada linha
    linhas.forEach(linha => {
      const linhaLimpa = linha.trim();
      
      // Utilizador com data e hora
      if (linhaLimpa.startsWith('Utilizador:')) {
        const match = linhaLimpa.match(finalConfig.patterns.utilizador);
        if (match) {
          observacao.utilizador = match[1];
          observacao.data = match[2];
          observacao.hora = match[3];
        }
      } 
      // Código de tratamento
      else if (linhaLimpa.startsWith(finalConfig.patterns.codigoTratamento)) {
        observacao.codigoTratamento = linhaLimpa
          .replace(finalConfig.patterns.codigoTratamento, '')
          .trim();
      } 
      // Total de sessões
      else if (linhaLimpa.startsWith(finalConfig.patterns.totalSessoes)) {
        observacao.totalSessoes = parseInt(
          linhaLimpa.replace(finalConfig.patterns.totalSessoes, '').trim()
        );
      } 
      // Data início tratamento
      else if (linhaLimpa.startsWith(finalConfig.patterns.dataInicioTratamento)) {
        observacao.dataInicioTratamento = linhaLimpa
          .replace(finalConfig.patterns.dataInicioTratamento, '')
          .trim();
      } 
      // Data fim tratamento
      else if (linhaLimpa.startsWith(finalConfig.patterns.dataFimTratamento)) {
        observacao.dataFimTratamento = linhaLimpa
          .replace(finalConfig.patterns.dataFimTratamento, '')
          .trim();
      } 
      // Número da sessão
      else if (linhaLimpa.startsWith(finalConfig.patterns.numeroSessao)) {
        observacao.numeroSessao = parseInt(
          linhaLimpa.replace(finalConfig.patterns.numeroSessao, '').trim()
        );
      } 
      // Fisioterapeuta
      else if (linhaLimpa.startsWith('Fisioterapeuta:')) {
        const match = linhaLimpa.match(finalConfig.patterns.fisioterapeuta);
        if (match && match[1] && match[2]) {
          observacao.fisioterapeuta = {
            codigo: match[1],
            nome: match[2]
          };
        }
      } 
      // Observações livres (linhas que não seguem padrão conhecido)
      else if (linhaLimpa && !linhaLimpa.includes(':')) {
        if (!observacao.observacoesLivres) {
          observacao.observacoesLivres = [];
        }
        observacao.observacoesLivres.push(linhaLimpa);
      }
    });

    return observacao;
  });

  return {
    total: observacoes.length,
    observacoes: observacoes,
    raw: observacoesString
  };
};

/**
 * Função para obter informações resumidas das observações
 * @param data - Dados parseados das observações
 * @returns Informações resumidas ou null
 */
const getObservacoesInfo = (data: ObservacoesParseadas | null): ObservacoesInfo | null => {
  if (!data || !data.observacoes) return null;

  return {
    total: data.total,
    ultimaObservacao: data.observacoes[data.observacoes.length - 1],
    primeiraObservacao: data.observacoes[0],
    fisioterapeutas: [...new Set(
      data.observacoes
        .map((obs: ObservacaoSessao) => obs.fisioterapeuta?.nome)
        .filter((nome): nome is string => Boolean(nome))
    )],
    utilizadores: [...new Set(
      data.observacoes
        .map((obs: ObservacaoSessao) => obs.utilizador)
        .filter((utilizador): utilizador is string => Boolean(utilizador))
    )],
    sessoes: data.observacoes
      .map((obs: ObservacaoSessao) => obs.numeroSessao)
      .filter((sessao): sessao is number => Boolean(sessao))
  };
};

/**
 * Função para extrair nome do utilizador das observações
 * @param data - Dados parseados das observações
 * @returns Nome do utilizador ou null
 */
const extrairNomeUtilizador = (data: ObservacoesParseadas | null): string | null => {
  if (!data || !data.observacoes || data.observacoes.length === 0) {
    return null;
  }

  // Retorna o nome do utilizador da primeira observação
  return data.observacoes[0]?.utilizador || null;
};

/**
 * Função para extrair string de observações de diferentes formatos de resposta
 * @param response - Resposta do serviço (pode ser string ou objeto)
 * @param campoObservacoes - Nome do campo que contém as observações (padrão: 'observSessao')
 * @returns String das observações ou null
 */
const extrairStringObservacoes = (
  response: unknown, 
  campoObservacoes: string = 'observSessao'
): string | null => {
  if (!response) return null;
  
  // Se for string direta
  if (typeof response === 'string') {
    return response;
  }
  
  // Se for objeto, procurar pelo campo especificado
  if (typeof response === 'object' && response !== null && campoObservacoes in response) {
    const value = (response as Record<string, unknown>)[campoObservacoes];
    return typeof value === 'string' ? value : null;
  }
  
  // Se for objeto, procurar por outros campos comuns
  if (typeof response === 'object' && response !== null) {
    const responseObj = response as Record<string, unknown>;
    const camposComuns = ['observacoes', 'observSessao', 'data', 'result', 'content'];
    for (const campo of camposComuns) {
      if (responseObj[campo] && typeof responseObj[campo] === 'string') {
        return responseObj[campo] as string;
      }
    }
  }
  
  return null;
};

// ==========================================
// EXPORTS
// ==========================================

export default convertToSlug;
export {
  toSentenceCase,
  getInitials,
  dividirNomeCompleto,
  parseObservacoesString,
  getObservacoesInfo,
  extrairNomeUtilizador,
  extrairStringObservacoes
};
