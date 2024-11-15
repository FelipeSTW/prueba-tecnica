import { config } from '@vue/test-utils'

// Mock global objects
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock console.error
console.error = jest.fn()

// Configure Vue Test Utils
config.global.mocks = {
  $t: (msg) => msg,
  $route: {
    params: {}
  }
}

// Mock Vuetify components
config.global.stubs = {
  'v-app': true,
  'v-main': true,
  'v-container': true,
  'v-input': true
}

