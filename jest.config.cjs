module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  transformIgnorePatterns: [
    'node_modules/(?!@vue|vue|vuetify|@mdi/)'
  ],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js'
  ]
}