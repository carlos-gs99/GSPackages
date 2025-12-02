// ==========================================
// ARRAY UTILITIES
// ==========================================

/**
 * Agrupa array por campos específicos usando função de campo
 * @param array - Array de dados para agrupar
 * @param f - Função que retorna array de campos para agrupamento
 * @returns Array de grupos
 * 
 * @example
 * const dados = [
 *   { categoria: 'A', tipo: 'X', valor: 1 },
 *   { categoria: 'A', tipo: 'Y', valor: 2 },
 *   { categoria: 'B', tipo: 'X', valor: 3 }
 * ];
 * 
 * const grupos = groupByFields(dados, (item) => [item.categoria, item.tipo]);
 * // Resultado: grupos separados por categoria e tipo
 */
const groupByFields = <T>(array: Array<T>, f: (item: T) => unknown[]): Array<T[]> => {
  /*
    params description :
        f : function which returnf the array of fields
        e.g. :  (item) => {
            return [itemField1, itemField2];
        }
        array : array of data to group e.g. : [{...}, {...}]
    */
  const groups: { [key: string]: T[] } = {};
  array.forEach((o) => {
    let group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });

  return Object.keys(groups).map((group) => {
    return groups[group];
  });
};

/**
 * Divide array em chunks de tamanho especificado
 * @param array - Array para dividir
 * @param chunkSize - Tamanho de cada chunk
 * @returns Array de chunks
 * 
 * @example
 * const dados = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const chunks = splitArray(dados, 3);
 * // Resultado: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
 */
const splitArray = <T>(array: Array<T>, chunkSize: number) => {
  const chunks = Array(Math.ceil(array.length / chunkSize))
    .fill(1)
    .map((_, index) => index * chunkSize)
    .map((begin) => array.slice(begin, begin + chunkSize));
  return chunks;
};

// ==========================================
// EXPORTS
// ==========================================

export { groupByFields, splitArray };
