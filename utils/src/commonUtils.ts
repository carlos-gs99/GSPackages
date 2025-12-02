// ==========================================
// COMMON UTILITIES
// ==========================================

/**
 * Converte arquivo para Base64
 * @param file - Arquivo a ser convertido
 * @returns Promise com resultado Base64
 * 
 * @example
 * const file = document.getElementById('fileInput').files[0];
 * const base64 = await getBase64(file);
 * console.log(base64); // data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
 */
const getBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e?.target?.result || null);
        reader.onerror = e => reject(e);
        reader.readAsDataURL(file);
    });
};

/**
 * Cria delay artificial para desenvolvimento
 * @param delay - Tempo de delay em milissegundos
 * @returns Promise que resolve após o delay
 * 
 * @example
 * // Aguarda 1 segundo
 * await sleep(1000);
 * console.log('Passou 1 segundo');
 */
const sleep = (delay: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

// ==========================================
// EXPORTS
// ==========================================

export { getBase64, sleep };
