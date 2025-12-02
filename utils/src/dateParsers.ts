/**
 * Date Parsers - .NET ↔ JavaScript
 * 
 * Conversores para formato de data .NET: /Date(timestamp)/
 */

/**
 * Converte data .NET para JavaScript Date
 * 
 * @param dotNetDate - String no formato /Date(timestamp)/ ou /Date(timestamp+offset)/
 * @returns Date object ou null se inválido
 * 
 * @example
 * dotNetToJs('/Date(1234567890000)/') // → new Date(1234567890000)
 * dotNetToJs('/Date(1234567890000+0100)/') // → new Date com offset
 * dotNetToJs(null) // → null
 */
export function dotNetToJs(dotNetDate: string | null | undefined): Date | null {
  if (!dotNetDate) return null;
  
  // Regex para extrair timestamp: /Date(1234567890000)/ ou /Date(1234567890000+0100)/
  const match = dotNetDate.match(/\/Date\((-?\d+)([+-]\d{4})?\)\//);
  
  if (!match) return null;
  
  const timestamp = parseInt(match[1], 10);
  
  // Offset é ignorado por enquanto (sempre usar UTC)
  // const offset = match[2]; // ex: '+0100'
  
  return new Date(timestamp);
}

/**
 * Converte JavaScript Date para formato .NET
 * 
 * @param jsDate - Date object
 * @returns String no formato /Date(timestamp)/ ou null se inválido
 * 
 * @example
 * jsToDotNet(new Date('2023-01-01')) // → '/Date(1672531200000)/'
 * jsToDotNet(null) // → null
 */
export function jsToDotNet(jsDate: Date | null | undefined): string | null {
  if (!jsDate || !(jsDate instanceof Date)) return null;
  
  const timestamp = jsDate.getTime();
  
  if (isNaN(timestamp)) return null;
  
  return `/Date(${timestamp})/`;
}

/**
 * Converte data .NET para string formatada (DD-MM-YYYY)
 * 
 * @param dotNetDate - String no formato /Date(timestamp)/
 * @returns String formatada ou empty string se inválido
 * 
 * @example
 * dotNetToFormatted('/Date(1672531200000)/') // → '01-01-2023'
 */
export function dotNetToFormatted(dotNetDate: string | null | undefined): string {
  const date = dotNetToJs(dotNetDate);
  
  if (!date) return '';
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}-${month}-${year}`;
}

/**
 * Converte string formatada (DD-MM-YYYY) para formato .NET
 * 
 * @param formatted - String no formato DD-MM-YYYY
 * @returns String no formato /Date(timestamp)/ ou null se inválido
 * 
 * @example
 * formattedToDotNet('01-01-2023') // → '/Date(1672531200000)/'
 */
export function formattedToDotNet(formatted: string | null | undefined): string | null {
  if (!formatted) return null;
  
  // Parse DD-MM-YYYY
  const match = formatted.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  
  if (!match) return null;
  
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1; // 0-based
  const year = parseInt(match[3], 10);
  
  const date = new Date(year, month, day);
  
  return jsToDotNet(date);
}

/**
 * Verifica se string é uma data .NET válida
 * 
 * @param value - String a verificar
 * @returns true se é data .NET válida
 */
export function isDotNetDate(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  
  return /^\/Date\(-?\d+([+-]\d{4})?\)\/$/.test(value);
}

