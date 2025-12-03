import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'es2020',
  external: ['react', 'react-dom', 'react-i18next', 'react-router-dom', '@carlos-gs99/hooks', '@carlos-gs99/utils'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});

