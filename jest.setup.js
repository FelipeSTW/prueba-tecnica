const { config } = require('@vue/test-utils')

// Mock echarts modules
jest.mock('echarts/core', () => ({
  use: jest.fn(),
  init: jest.fn()
}))

jest.mock('echarts/renderers', () => ({
  CanvasRenderer: jest.fn()
}))

jest.mock('echarts/charts', () => ({
  LineChart: jest.fn()
}))

jest.mock('echarts/components', () => ({
  TitleComponent: jest.fn(),
  TooltipComponent: jest.fn(),
  GridComponent: jest.fn(),
  LegendComponent: jest.fn(),
  DataZoomComponent: jest.fn()
}))

jest.mock('vue-echarts', () => ({
  __esModule: true,
  default: {
    name: 'v-chart',
    template: '<div class="v-chart"></div>'
  }
}))

// Configure Vue Test Utils
config.global.components = {
  'v-chart': {
    template: '<div class="v-chart"></div>'
  }
}

// Mock console methods
console.error = jest.fn()