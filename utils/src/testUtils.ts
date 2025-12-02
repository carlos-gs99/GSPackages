// ==========================================
// TEST UTILITIES
// ==========================================

import { PaginationState, SortingState } from '@tanstack/react-table';
import { convertToUtentesLstParams } from './tableUtils';

/**
 * Testa a geração do payload de utentes
 * @returns Objeto com parâmetros e string URL-encoded
 * 
 * @example
 * const resultado = testUtentesPayload();
 * console.log('Parâmetros:', resultado.params);
 * console.log('URL-encoded:', resultado.urlEncoded);
 */
export function testUtentesPayload() {
  const pagination: PaginationState = {
    pageIndex: 0,
    pageSize: 10,
  };
  
  const sorting: SortingState = [
    { id: 'c_utente', desc: false }
  ];
  
  const globalFilter = '';
  
  const params = convertToUtentesLstParams(
    pagination,
    sorting,
    globalFilter,
    1
  );
  
  // console.log('Parâmetros gerados:', params);
  
  // Converter para URL-encoded para verificar o formato
  const formData = new URLSearchParams();
  
  function addToFormData(key: string, value: unknown) {
    if (value === null || value === undefined) {
      return;
    }
    
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'object' && item !== null) {
          Object.keys(item).forEach(subKey => {
            addToFormData(`${key}[${index}][${subKey}]`, item[subKey]);
          });
        } else {
          formData.append(`${key}[${index}]`, item);
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      const valueObj = value as Record<string, unknown>;
      Object.keys(valueObj).forEach(subKey => {
        addToFormData(`${key}[${subKey}]`, valueObj[subKey]);
      });
    } else {
      formData.append(key, value.toString());
    }
  }
  
  Object.keys(params).forEach(key => {
    const paramsRecord = params as unknown as Record<string, unknown>;
    addToFormData(key, paramsRecord[key]);
  });
  
  const urlEncoded = formData.toString();
  // console.log('URL-encoded:', urlEncoded);
  
  return { params, urlEncoded };
}

// Executar teste se este arquivo for importado diretamente
if (typeof window !== 'undefined') {
  testUtentesPayload();
}
