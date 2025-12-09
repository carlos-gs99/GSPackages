module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  
  // Module name mapper for CSS modules and aliases
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@carlos-gs99/hooks$': '<rootDir>/tests/__mocks__/@carlos-gs99-hooks.ts',
    '^@carlos-gs99/utils$': '<rootDir>/tests/__mocks__/@carlos-gs99-utils.ts',
    '^@carlos-gs99/gs-icon$': '<rootDir>/tests/__mocks__/@carlos-gs99-gs-icon.tsx',
    '^@carlos-gs99/gs-loading$': '<rootDir>/tests/__mocks__/@carlos-gs99-gs-loading.tsx',
    '^@carlos-gs99/gs-button$': '<rootDir>/tests/__mocks__/@carlos-gs99-gs-button.tsx',
    '^@carlos-gs99/primitives$': '<rootDir>/primitives/src/index.ts',
    '^@carlos-gs99/theme$': '<rootDir>/theme/src/index.ts',
  },
  
  // Transform files
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
    }],
  },
  
  // Coverage
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/__tests__/**',
    '!**/tests/**',
    '!**/*.config.{js,ts}',
  ],
  
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // Ignore patterns
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  modulePathIgnorePatterns: ['<rootDir>/../node_modules'],
  
  // Module directories - use only local node_modules
  modulePaths: ['<rootDir>/node_modules'],
  
  // Verbose output
  verbose: true,
};

