// ==========================================
// DOM UTILITIES
// ==========================================

/**
 * Altera atributo do elemento body do documento
 * @param attribute - Nome do atributo
 * @param value - Valor do atributo
 */
const changeBodyAttribute = (attribute: string, value: string): void => {
  if (document.body) document.body.setAttribute(attribute, value);
};

/**
 * Altera atributo do elemento html do documento
 * @param attribute - Nome do atributo
 * @param value - Valor do atributo
 */
const changeHtmlAttribute = (attribute: string, value: string): void => {
  const htmlElement = document.querySelector('html');
  if (htmlElement) htmlElement.setAttribute(attribute, value);
};

// ==========================================
// EXPORTS
// ==========================================

export { changeBodyAttribute, changeHtmlAttribute };
