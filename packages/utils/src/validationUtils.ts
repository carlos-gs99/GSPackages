// ==========================================
// VALIDATION UTILITIES
// ==========================================

/**
 * Tipos de validação de senha disponíveis
 */
export type CheckPasswordValidationOptionsType = 'length' | 'lowerCase' | 'upperCase' | 'number' | 'specialCharacter';

/**
 * Opções de configuração para verificação de senha
 */
export type CheckPasswordOptionsType = {
  checkFor: CheckPasswordValidationOptionsType[],
}

/**
 * Resultado da verificação de força da senha
 */
export interface CheckPasswordResult {
    strength: number;
    passedFor: CheckPasswordValidationOptionsType[];
}

/**
 * Configurações de validação para cada tipo de verificação
 */
const validationOptions = {
  length:  new RegExp('(?=.{6,})'),
  lowerCase: new RegExp('(?=.*[a-z])'),
  upperCase: new RegExp('(?=.*[A-Z])'),
  number:  new RegExp('(?=.*[0-9])'),
  specialCharacter: new RegExp('(?=.*[^A-Za-z0-9])')
}

/**
 * Verifica a força de uma senha baseada em critérios específicos
 * @param password - Senha a ser verificada
 * @param options - Opções de verificação
 * @returns Resultado com força calculada e critérios aprovados
 * 
 * @example
 * const resultado = checkPasswordStrength('MinhaSenh@123', {
 *   checkFor: ['length', 'lowerCase', 'upperCase', 'number', 'specialCharacter']
 * });
 * // Resultado: { strength: 100, passedFor: ['length', 'lowerCase', 'upperCase', 'number', 'specialCharacter'] }
 */
const checkPasswordStrength = (password: string, options: CheckPasswordOptionsType): CheckPasswordResult => {
    let calculatedStrength = 0;
    const passedFor: CheckPasswordValidationOptionsType[] = [];
    const raiseStrengthBy = (100 / options.checkFor.length).toFixed(2);
    options.checkFor.forEach(option => {
        if (validationOptions[option]?.test(password)) {
            passedFor.push(option)
            calculatedStrength += parseFloat(raiseStrengthBy);
        }
    })
    return {strength: calculatedStrength, passedFor};
};

// ==========================================
// EXPORTS
// ==========================================

export { checkPasswordStrength };
export default checkPasswordStrength;
