import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import App from '../../src/App.vue'
import { useInstrumentStore } from '../../src/stores/useInstrumentStore'
import SearchBarComponent from '../../src/components/searchcomponent/SearchBarComponent.vue'
import InstrumentListComponent from '../../src/components/instrumentlistcomponent/InstrumentListComponent.vue'

// Define los componentes mockeados como componentes simples
const MockChart = {
  name: 'ChartComponent',
  template: '<div class="mock-chart">Mock Chart</div>'
}

const MockSummary = {
  name: 'SummaryComponent',
  template: '<div class="mock-summary">Mock Summary</div>'
}
// Mocks para los componentes
jest.mock('../../src/components/chartcomponent/ChartComponent.vue', () => ({
    name: 'ChartComponent'
  }), { virtual: true })
  
  jest.mock('../../src/components/summarycomponent/SummaryComponent.vue', () => ({
    name: 'SummaryComponent'
  }), { virtual: true })

describe('App Integration', () => {
  let wrapper
  let store

  const mockInstruments = [
    {
      id: 'AAPL',
      name: 'Apple Inc',
      last: 150.50,
      amount: 1000000,
      varDay: 1.5,
      var30d: 2.3,
      varYear: 10.5,
      var12m: 15.2
    },
    {
      id: 'GOOGL',
      name: 'Google',
      last: 2500.75,
      amount: 2000000,
      varDay: -0.8,
      var30d: 1.2,
      varYear: 8.5,
      var12m: 12.3
    }
  ]

  beforeEach(async () => {
    const pinia = createTestingPinia({
      createSpy: jest.fn,
      stubActions: false,
      initialState: {
        instrument: {
          instruments: mockInstruments,
          selectedInstrument: null,
          period: '1D',
          selectedIndex: 'IPSA'
        }
      }
    })

    wrapper = mount(App, {
      global: {
        plugins: [pinia],
        stubs: {
          'v-app': {
            template: '<div class="v-app"><slot /></div>'
          },
          'v-container': {
            template: '<div class="v-container"><slot /></div>'
          },
          'v-main': {
            template: '<div class="v-main"><slot /></div>'
          },
          'TabComponent': true,
          'HeaderComponent': true,
          'ChartComponent': MockChart,
          'SummaryComponent': MockSummary
        }
      }
    })

    store = useInstrumentStore()
    await store.fetchInstruments()
  })

  it('loads and displays instruments correctly', async () => {
    expect(store.fetchInstruments).toHaveBeenCalled()
    store.instruments = mockInstruments
    await wrapper.vm.$nextTick()
    const instrumentList = wrapper.findComponent(InstrumentListComponent)
    expect(instrumentList.exists()).toBe(true)
  })

  it('searches and filters instruments correctly', async () => {
    const searchBar = wrapper.findComponent(SearchBarComponent)
    expect(searchBar.exists()).toBe(true)
    store.instruments = mockInstruments
    await wrapper.vm.$nextTick()
    await searchBar.get('input').setValue('Apple')
    await wrapper.vm.$nextTick()
    const filteredResults = wrapper.find('.list-result')
    expect(filteredResults.exists()).toBe(true)
    expect(filteredResults.text()).toContain('Apple')
  })

  it('updates period and refreshes chart data', async () => {
    await wrapper.vm.handlePeriodChanged('1W')
    await wrapper.vm.$nextTick()
    expect(store.setPeriod).toHaveBeenCalledWith('1W')
  })

  it('updates selected index and refreshes data', async () => {
    await wrapper.vm.handleTabSelected('NASDAQ')
    await wrapper.vm.$nextTick()
    expect(store.setSelectedIndex).toHaveBeenCalledWith('NASDAQ')
  })

  it('handles store interactions correctly', async () => {
    const mockInstrument = mockInstruments[0]
    await store.setSelectedInstrument(mockInstrument)
    await wrapper.vm.$nextTick()
    
    expect(store.fetchSummary).toHaveBeenCalledWith(mockInstrument.id)
    expect(store.fetchHistory).toHaveBeenCalledWith(mockInstrument.id)
  })

  it('handles API errors gracefully', async () => {
    const mockConsoleError = jest.fn()
    const originalConsoleError = console.error
    console.error = mockConsoleError

    try {
      await store.fetchInstruments().catch(() => {})
      expect(mockConsoleError).toHaveBeenCalled()
    } finally {
      console.error = originalConsoleError
    }
  })

  it('searches and selects instruments', async () => {
    const searchBar = wrapper.findComponent(SearchBarComponent)
    store.instruments = mockInstruments
    await wrapper.vm.$nextTick()
    await searchBar.get('input').setValue('Apple')
    await wrapper.vm.$nextTick()
    
    const firstResult = wrapper.find('.list-result li')
    expect(firstResult.exists()).toBe(true)
    await firstResult.trigger('click')
    
    expect(store.setSelectedInstrument).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Apple Inc' })
    )
  })

  it('displays chart and summary when instrument is selected', async () => {
    store.chartData = [{ date: '2024-01-01', value: 100 }]
    store.summaryData = { date: '2024-01-01', marketName: 'TEST' }
    await store.setSelectedInstrument(mockInstruments[0])
    await wrapper.vm.$nextTick()
    
    const chart = wrapper.find('.chart-summary-container')
    expect(chart.exists()).toBe(true)
  })
})