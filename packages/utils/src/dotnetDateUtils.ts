/**
 * 🔧 .NET Date Utilities
 * 
 * Utilitários para compatibilidade entre JavaScript Date e formatos de data .NET
 * - DateTime: yyyy-MM-ddTHH:mm:ss ou yyyy-MM-ddTHH:mm:ssZ
 * - DateOnly: yyyy-MM-dd
 * - ISO 8601: yyyy-MM-ddTHH:mm:ss.fffZ
 * 
 * @module dotnetDateUtils
 */

// ============================================================================
// TIPOS
// ============================================================================

/** Formatos de data suportados pelo .NET */
export type DotNetDateFormat = 'DateTime' | 'DateOnly' | 'ISO8601' | 'JsonNet';

/** Opções de conversão para .NET */
export interface DotNetDateOptions {
  /** Formato de saída (.NET) */
  format?: DotNetDateFormat;
  /** Incluir informação de timezone (apenas para DateTime e ISO8601) */
  includeTimezone?: boolean;
  /** Usar UTC em vez de local time */
  useUtc?: boolean;
}

// ============================================================================
// PARSING: .NET → JavaScript Date
// ============================================================================

/**
 * Converte uma string de data .NET para JavaScript Date
 * 
 * @param dotnetDate - String de data no formato .NET
 * @returns Date object ou null se inválido
 * 
 * @example
 * // DateTime com timezone
 * parseDotNetDate('2024-12-31T23:59:59Z') // → Date
 * 
 * // DateOnly
 * parseDotNetDate('2024-12-31') // → Date
 * 
 * // ISO 8601
 * parseDotNetDate('2024-12-31T23:59:59.999Z') // → Date
 * 
 * // JSON.NET (Microsoft) format
 * parseDotNetDate('/Date(1757405123217)/') // → Date
 */
export function parseDotNetDate(dotnetDate: string | null | undefined): Date | null {
  if (!dotnetDate) return null;
  
  try {
    // Check for JSON.NET format: /Date(timestamp)/
    const jsonNetMatch = dotnetDate.match(/^\/Date\((\d+)\)\/$/);
    if (jsonNetMatch) {
      const timestamp = parseInt(jsonNetMatch[1], 10);
      return new Date(timestamp);
    }
    
    // Check for JSON.NET format with timezone: /Date(timestamp+0000)/
    const jsonNetTzMatch = dotnetDate.match(/^\/Date\((\d+)([+-]\d{4})\)\/$/);
    if (jsonNetTzMatch) {
      const timestamp = parseInt(jsonNetTzMatch[1], 10);
      // Note: timezone offset is ignored as JavaScript Date uses local timezone
      return new Date(timestamp);
    }
    
    // Standard ISO formats
    // JavaScript Date.parse() suporta ISO 8601
    const timestamp = Date.parse(dotnetDate);
    
    if (isNaN(timestamp)) {
      console.warn(`[dotnetDateUtils] Failed to parse date: ${dotnetDate}`);
      return null;
    }
    
    return new Date(timestamp);
  } catch (error) {
    console.error(`[dotnetDateUtils] Error parsing date: ${dotnetDate}`, error);
    return null;
  }
}

/**
 * Converte múltiplas strings de data .NET para JavaScript Date
 * 
 * @param dotnetDates - Array de strings de data
 * @returns Array de Date objects (null para datas inválidas)
 */
export function parseDotNetDates(dotnetDates: (string | null | undefined)[]): (Date | null)[] {
  return dotnetDates.map(parseDotNetDate);
}

// ============================================================================
// FORMATTING: JavaScript Date → .NET
// ============================================================================

/**
 * Converte JavaScript Date para formato .NET DateTime
 * Formato: yyyy-MM-ddTHH:mm:ss ou yyyy-MM-ddTHH:mm:ssZ
 * 
 * @param date - Date object
 * @param options - Opções de formatação
 * @returns String no formato .NET DateTime
 * 
 * @example
 * formatToDotNetDateTime(new Date('2024-12-31T23:59:59'))
 * // → '2024-12-31T23:59:59' (local) ou '2024-12-31T23:59:59Z' (UTC)
 */
export function formatToDotNetDateTime(
  date: Date | null | undefined,
  options: DotNetDateOptions = {}
): string | null {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return null;
  }
  
  const { includeTimezone = true, useUtc = false } = options;
  
  if (useUtc) {
    // UTC format: yyyy-MM-ddTHH:mm:ssZ
    const isoString = date.toISOString();
    return includeTimezone ? isoString.split('.')[0] + 'Z' : isoString.split('.')[0];
  } else {
    // Local format: yyyy-MM-ddTHH:mm:ss
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
}

/**
 * Converte JavaScript Date para formato .NET DateOnly
 * Formato: yyyy-MM-dd
 * 
 * @param date - Date object
 * @returns String no formato .NET DateOnly
 * 
 * @example
 * formatToDotNetDateOnly(new Date('2024-12-31'))
 * // → '2024-12-31'
 */
export function formatToDotNetDateOnly(date: Date | null | undefined): string | null {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return null;
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

/**
 * Converte JavaScript Date para formato ISO 8601 completo
 * Formato: yyyy-MM-ddTHH:mm:ss.fffZ
 * 
 * @param date - Date object
 * @returns String no formato ISO 8601
 * 
 * @example
 * formatToDotNetISO8601(new Date('2024-12-31T23:59:59.999'))
 * // → '2024-12-31T23:59:59.999Z'
 */
export function formatToDotNetISO8601(date: Date | null | undefined): string | null {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return null;
  }
  
  return date.toISOString();
}

/**
 * Converte JavaScript Date para formato JSON.NET (Microsoft)
 * Formato: /Date(timestamp)/
 * 
 * @param date - Date object
 * @returns String no formato JSON.NET
 * 
 * @example
 * formatToDotNetJsonNet(new Date('2024-12-31T23:59:59'))
 * // → '/Date(1735689599000)/'
 */
export function formatToDotNetJsonNet(date: Date | null | undefined): string | null {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return null;
  }
  
  const timestamp = date.getTime();
  return `/Date(${timestamp})/`;
}

/**
 * Converte JavaScript Date para formato .NET (auto-detecta melhor formato)
 * 
 * @param date - Date object
 * @param options - Opções de formatação
 * @returns String no formato .NET apropriado
 * 
 * @example
 * formatToDotNet(new Date(), { format: 'DateOnly' })
 * // → '2024-12-31'
 * 
 * formatToDotNet(new Date(), { format: 'DateTime', includeTimezone: true })
 * // → '2024-12-31T23:59:59Z'
 * 
 * formatToDotNet(new Date(), { format: 'JsonNet' })
 * // → '/Date(1735689599000)/'
 */
export function formatToDotNet(
  date: Date | null | undefined,
  options: DotNetDateOptions = {}
): string | null {
  const { format = 'DateTime' } = options;
  
  switch (format) {
    case 'DateOnly':
      return formatToDotNetDateOnly(date);
    case 'ISO8601':
      return formatToDotNetISO8601(date);
    case 'JsonNet':
      return formatToDotNetJsonNet(date);
    case 'DateTime':
    default:
      return formatToDotNetDateTime(date, options);
  }
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Verifica se uma string é um formato de data .NET válido
 * 
 * @param value - String a validar
 * @returns true se for um formato válido
 * 
 * @example
 * isDotNetDateFormat('2024-12-31') // → true
 * isDotNetDateFormat('2024-12-31T23:59:59Z') // → true
 * isDotNetDateFormat('/Date(1757405123217)/') // → true
 * isDotNetDateFormat('31/12/2024') // → false
 */
export function isDotNetDateFormat(value: string): boolean {
  if (!value) return false;
  
  // JSON.NET: /Date(timestamp)/
  const jsonNetRegex = /^\/Date\(\d+([+-]\d{4})?\)\/$/;
  if (jsonNetRegex.test(value)) return true;
  
  // DateOnly: yyyy-MM-dd
  const dateOnlyRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateOnlyRegex.test(value)) return true;
  
  // DateTime: yyyy-MM-ddTHH:mm:ss[Z]
  const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z)?$/;
  if (dateTimeRegex.test(value)) return true;
  
  // ISO 8601: yyyy-MM-ddTHH:mm:ss.fff[Z]
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(Z)?$/;
  if (iso8601Regex.test(value)) return true;
  
  return false;
}

/**
 * Detecta o formato .NET de uma string de data
 * 
 * @param value - String de data
 * @returns Formato detectado ou null
 */
export function detectDotNetFormat(value: string): DotNetDateFormat | null {
  if (!value) return null;
  
  // JSON.NET: /Date(timestamp)/
  if (/^\/Date\(\d+([+-]\d{4})?\)\/$/.test(value)) return 'JsonNet';
  
  // DateOnly: yyyy-MM-dd
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'DateOnly';
  
  // ISO 8601: yyyy-MM-ddTHH:mm:ss.fff[Z]
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(Z)?$/.test(value)) return 'ISO8601';
  
  // DateTime: yyyy-MM-ddTHH:mm:ss[Z]
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z)?$/.test(value)) return 'DateTime';
  
  return null;
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Converte Date para objeto compatível com API .NET
 * 
 * @param date - Date object
 * @param format - Formato desejado
 * @returns Objeto pronto para enviar ao backend .NET
 * 
 * @example
 * toDotNetApiFormat(new Date(), 'DateOnly')
 * // → { date: '2024-12-31' }
 */
export function toDotNetApiFormat(
  date: Date | null | undefined,
  format: DotNetDateFormat = 'DateTime'
): { date: string | null } {
  return {
    date: formatToDotNet(date, { format })
  };
}

/**
 * Converte range de datas para formato API .NET
 * 
 * @param startDate - Data inicial
 * @param endDate - Data final
 * @param format - Formato desejado
 * @returns Objeto com start e end no formato .NET
 */
export function toDotNetApiRangeFormat(
  startDate: Date | null | undefined,
  endDate: Date | null | undefined,
  format: DotNetDateFormat = 'DateTime'
): { startDate: string | null; endDate: string | null } {
  return {
    startDate: formatToDotNet(startDate, { format }),
    endDate: formatToDotNet(endDate, { format })
  };
}

/**
 * Hook helper para usar com GSDatePicker + .NET backend
 * 
 * @example
 * const { dateValue, setDotNetDate, getDotNetValue } = useDotNetDate();
 * 
 * // Receber do backend
 * useEffect(() => {
 *   const data = await api.get('/date');
 *   setDotNetDate(data.dateField);
 * }, []);
 * 
 * // Enviar ao backend
 * const handleSubmit = () => {
 *   await api.post('/date', { dateField: getDotNetValue('DateOnly') });
 * };
 */
export function useDotNetDate() {
  const [dateValue, setDateValue] = React.useState<Date | null>(null);
  
  const setDotNetDate = React.useCallback((dotnetDate: string | null | undefined) => {
    setDateValue(parseDotNetDate(dotnetDate));
  }, []);
  
  const getDotNetValue = React.useCallback((format: DotNetDateFormat = 'DateTime') => {
    return formatToDotNet(dateValue, { format });
  }, [dateValue]);
  
  return {
    dateValue,
    setDateValue,
    setDotNetDate,
    getDotNetValue
  };
}

// Re-export React for hook
import React from 'react';

