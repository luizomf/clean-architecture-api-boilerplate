module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/infrastructure/knex',
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/migrations/*.ts',
    '!src/**/knex/*.ts',
    '!src/**/console-application/*.ts',
    '!src/**/middlewares/example.ts',
  ],
};
