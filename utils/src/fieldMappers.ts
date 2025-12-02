/**
 * Field Mappers - Mapeamento de campos entre formatos
 * 
 * Lida com inconsistências de naming entre List/Load/Save
 */

/**
 * Aplica mapeamento de campos a um objeto
 * 
 * @param data - Objeto original
 * @param mapping - Mapa de campos (oldKey → newKey)
 * @returns Novo objeto com campos mapeados
 * 
 * @example
 * applyFieldMap(
 *   { C_medico: 'AS', Nome: 'João' },
 *   { C_medico: 'c_medico', Nome: 'nome' }
 * )
 * // → { c_medico: 'AS', nome: 'João' }
 */
export function applyFieldMap<T = any>(
  data: Record<string, any>,
  mapping?: Record<string, string>
): T {
  if (!mapping || Object.keys(mapping).length === 0) {
    return data as T;
  }
  
  const mapped: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(data)) {
    // Se existe mapeamento, usa key mapeado; senão mantém original
    const newKey = mapping[key] || key;
    mapped[newKey] = value;
  }
  
  return mapped as T;
}

/**
 * Aplica mapeamento reverso (para enviar ao backend)
 * 
 * @param data - Objeto com campos internos
 * @param mapping - Mapa de campos (internalKey → backendKey)
 * @returns Objeto com campos do backend
 */
export function reverseFieldMap<T = any>(
  data: Record<string, any>,
  mapping?: Record<string, string>
): T {
  if (!mapping || Object.keys(mapping).length === 0) {
    return data as T;
  }
  
  // Inverter mapeamento (valor → chave)
  const reversedMapping: Record<string, string> = {};
  for (const [key, value] of Object.entries(mapping)) {
    reversedMapping[value] = key;
  }
  
  return applyFieldMap(data, reversedMapping);
}

/**
 * Normaliza case de campos (para consistência)
 * 
 * @param data - Objeto original
 * @param mode - 'lower' | 'upper' | 'camel' | 'snake'
 * @returns Objeto com campos normalizados
 */
export function normalizeCase<T = any>(
  data: Record<string, any>,
  mode: 'lower' | 'upper' | 'camel' | 'snake' = 'lower'
): T {
  const normalized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(data)) {
    let newKey: string;
    
    switch (mode) {
      case 'lower':
        newKey = key.toLowerCase();
        break;
      case 'upper':
        newKey = key.toUpperCase();
        break;
      case 'camel':
        newKey = toCamelCase(key);
        break;
      case 'snake':
        newKey = toSnakeCase(key);
        break;
      default:
        newKey = key;
    }
    
    normalized[newKey] = value;
  }
  
  return normalized as T;
}

/**
 * Converte string para camelCase
 */
function toCamelCase(str: string): string {
  return str
    .replace(/[-_\s](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (char) => char.toLowerCase());
}

/**
 * Converte string para snake_case
 */
function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
}

/**
 * Deep merge de objetos (útil para nested objects)
 * 
 * @param target - Objeto alvo
 * @param source - Objeto fonte
 * @returns Objeto merged
 */
export function deepMerge<T = any>(
  target: Record<string, any>,
  source: Record<string, any>
): T {
  const output = { ...target };
  
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      output[key] = deepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }
  
  return output as T;
}

