import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'es2020',
  external: ['react', 'react-dom', 'react-i18next', '@carlos-gs99/hooks', '@carlos-gs99/utils', '@carlos-gs99/primitives'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});

