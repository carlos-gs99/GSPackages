import { defineConfig } from 'tsup';

/**
 * Base tsup configuration for Globalsoft Components packages
 * 
 * Usage: Copy this file to your package root and customize if needed
 * 
 * For packages WITH CSS Modules (components):
 *   - Keep loader config
 *   - Add onSuccess to copy CSS files
 * 
 * For packages WITHOUT CSS (utils, hooks):
 *   - Remove loader config
 *   - Remove onSuccess
 */
export default defineConfig({
  // Entry points
  entry: ['src/index.ts'],
  
  // Output formats
  format: ['esm', 'cjs'],
  
  // TypeScript declarations
  dts: true,
  
  // Clean dist folder before build
  clean: true,
  
  // Source maps for debugging
  sourcemap: true,
  
  // Don't minify (better for debugging)
  minify: false,
  
  // Don't split chunks (simpler output)
  splitting: false,
  
  // Tree shaking
  treeshake: true,
  
  // External dependencies (don't bundle these)
  external: [
    'react',
    'react-dom',
    'react-i18next',
    'i18next',
    'react-router-dom',
    'clsx',
    /^@globalsoft\//  // Don't bundle other @globalsoft packages
  ],
  
  // Loaders for non-TS files
  loader: {
    '.css': 'local-css',  // CSS Modules support
    '.json': 'copy'        // Copy JSON files (i18n)
  },
  
  // Banner for React Server Components compatibility
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";'
    };
  },
  
  // Success hook (copy additional files)
  onSuccess: async () => {
    console.log('✅ Build completed successfully');
  }
});

