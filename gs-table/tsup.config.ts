import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'es2020',
  external: [
    'react',
    'react-dom',
    'react-i18next',
    '@carlos-gs99/hooks',
    '@carlos-gs99/utils',
    '@carlos-gs99/gs-button',
    '@carlos-gs99/gs-icon',
    '@carlos-gs99/gs-input',
    '@carlos-gs99/gs-select',
    '@carlos-gs99/gs-loading',
    '@carlos-gs99/gs-modal',
    '@tanstack/react-table',
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});

