import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  target: 'es2020',
  external: ['react', 'react-i18next', '@carlos-gs99/hooks', '@carlos-gs99/utils'],
});

