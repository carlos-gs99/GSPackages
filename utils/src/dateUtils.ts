/**
 * Converte uma data no formato "/Date(timestamp)/" para uma string no formato YYYY-MM-DD
 * @param dateString - String no formato "/Date(timestamp)/" ou string de data válida
 * @returns String no formato YYYY-MM-DD ou string vazia se inválida
 */
export const convertApiDateToInputFormat = (dateString: string | null | undefined): string => {
  if (!dateString) return '';
  
  // Verifica se é o formato "/Date(timestamp)/" (incluindo valores negativos)
  const dateMatch = dateString.match(/\/Date\((-?\d+)\)\//);
  if (dateMatch) {
    const timestamp = parseInt(dateMatch[1]);
    const date = new Date(timestamp);
    
    // Verifica se a data é válida (incluindo datas antes de 1970)
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0]; // Retorna YYYY-MM-DD
    }
  }
  
  // Se não for o formato esperado, tenta converter diretamente
  try {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
  } catch (error) {
    console.warn('Erro ao converter data:', dateString, error);
  }
  
  return '';
};

/**
 * Converte uma data no formato "/Date(timestamp)/" para um objeto Date
 * @param dateString - String no formato "/Date(timestamp)/" ou string de data válida
 * @returns Objeto Date ou null se inválida
 */
export const convertApiDateToDate = (dateString: string | null | undefined): Date | null => {
  if (!dateString) return null;
  
  // Verifica se é o formato "/Date(timestamp)/" (incluindo valores negativos)
  const dateMatch = dateString.match(/\/Date\((-?\d+)\)\//);
  if (dateMatch) {
    const timestamp = parseInt(dateMatch[1]);
    const date = new Date(timestamp);
    
    // Verifica se a data é válida (incluindo datas antes de 1970)
    if (!isNaN(date.getTime())) {
      return date;
    }
  }
  
  // Se não for o formato esperado, tenta converter diretamente
  try {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date;
    }
  } catch (error) {
    console.warn('Erro ao converter data:', dateString, error);
  }
  
  return null;
};

/**
 * Converte uma data no formato "/Date(timestamp)/" para uma string formatada
 * @param dateString - String no formato "/Date(timestamp)/" ou string de data válida
 * @param format - Formato desejado (padrão: 'DD/MM/YYYY')
 * @returns String formatada ou string vazia se inválida
 */
export const formatApiDate = (dateString: string | null | undefined, format: string = 'DD/MM/YYYY'): string => {
  const date = convertApiDateToDate(dateString);
  if (!date) return '';
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  switch (format) {
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    default:
      return `${day}/${month}/${year}`;
  }
};

/**
 * Converte uma data no formato DD/MM/YYYY para um objeto Date
 * @param dateString - String no formato DD/MM/YYYY
 * @returns Objeto Date ou null se inválida
 */
export const parseDateString = (dateString: string | null | undefined): Date | null => {
  if (!dateString) return null;
  
  try {
    // Divide a string DD/MM/YYYY
    const parts = dateString.split('/');
    if (parts.length !== 3) return null;
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Mês é 0-indexado no JavaScript
    const year = parseInt(parts[2], 10);
    
    const date = new Date(year, month, day);
    
    // Verifica se a data é válida
    if (isNaN(date.getTime())) return null;
    
    return date;
  } catch (error) {
    console.warn('Erro ao fazer parse da data:', dateString, error);
    return null;
  }
};

/**
 * Calcula o tempo relativo entre uma data e agora
 * @param dateString - String no formato DD/MM/YYYY
 * @returns String com o tempo relativo (ex: "há 3 dias") ou a data formatada se for mais de um mês
 */
export const getRelativeTime = (dateString: string | null | undefined): string => {
  if (!dateString) return '';
  
  const date = parseDateString(dateString);
  if (!date) return dateString; // Retorna a string original se não conseguir fazer parse
  
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30);
  
  // Se for mais de um mês, retorna a data formatada
  if (diffInMonths >= 1) {
    return dateString; // Retorna a string original já que está no formato correto
  }
  
  // Se for hoje
  if (diffInDays === 0) {
    return 'hoje';
  }
  
  // Se for ontem
  if (diffInDays === 1) {
    return 'ontem';
  }
  
  // Se for há alguns dias
  if (diffInDays < 7) {
    return `há ${diffInDays} dias`;
  }
  
  // Se for há algumas semanas
  const weeks = Math.floor(diffInDays / 7);
  if (weeks === 1) {
    return 'há 1 semana';
  } else if (weeks < 4) {
    return `há ${weeks} semanas`;
  }
  
  // Fallback para a data formatada
  return dateString; // Retorna a string original já que está no formato correto
};

/**
 * Verifica se uma string está no formato DD/MM/YYYY
 * @param value - String para verificar
 * @returns true se estiver no formato DD/MM/YYYY
 */
export const isDDMMYYYYFormat = (value: string): boolean => {
  return /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value);
};

/**
 * Converte uma string no formato DD/MM/YYYY para objeto Date
 * @param value - String no formato DD/MM/YYYY
 * @returns Objeto Date ou null se inválido
 */
export const parseDDMMYYYY = (value: string): Date | null => {
  if (!isDDMMYYYYFormat(value)) return null;
  
  const [day, month, year] = value.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  
  // Verifica se a data é válida
  return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year ? date : null;
};

/**
 * Analisa um array de categorias e determina se há múltiplos anos
 * @param categories - Array de categorias (podem ser datas .NET ou strings)
 * @returns true se há múltiplos anos únicos
 */
export const hasMultipleYears = (categories: string[]): boolean => {
  const allDates = categories.map((cat: string) => {
    // Se for formato .NET, converte
    if (cat && (cat.includes('/Date(') || cat.includes('-'))) {
      return convertApiDateToDate(cat);
    }
    // Se for formato DD/MM/YYYY, converte
    if (isDDMMYYYYFormat(cat)) {
      return parseDDMMYYYY(cat);
    }
    // Tenta conversão direta
    return convertApiDateToDate(cat);
  }).filter((d: Date | null): d is Date => d !== null);
  
  const years = allDates.map((d: Date) => d.getFullYear());
  const uniqueYears = [...new Set(years)];
  
  return uniqueYears.length > 1;
};

/**
 * Formata uma data para exibição em gráficos
 * @param value - String de data (formato .NET ou DD/MM/YYYY)
 * @param categories - Array de categorias para análise de anos
 * @returns String formatada (DD/M ou DD/MM/YYYY)
 */
export const formatChartDate = (value: string, categories: string[]): string => {
  // Se for formato DD/MM/YYYY
  if (isDDMMYYYYFormat(value)) {
    const date = parseDDMMYYYY(value);
    if (date) {
      const hasMultiple = hasMultipleYears(categories);
      if (hasMultiple) {
        return value; // Já está no formato completo
      } else {
        return `${date.getDate()}/${date.getMonth() + 1}`; // Formato compacto
      }
    }
  }
  
  // Se for formato .NET
  if (value && (value.includes('/Date(') || value.includes('-'))) {
    const date = convertApiDateToDate(value);
    if (date) {
      const hasMultiple = hasMultipleYears(categories);
      if (hasMultiple) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      } else {
        return `${date.getDate()}/${date.getMonth() + 1}`;
      }
    }
  }
  
  return value; // Retorna original se não for data
};