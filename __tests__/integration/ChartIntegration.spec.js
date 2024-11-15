import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import App from '../../src/App.vue'
import { useInstrumentStore } from '../../src/stores/useInstrumentStore'
import ChartComponent from '../../src/components/chartcomponent/ChartComponent.vue'
import SummaryComponent from '../../src/components/summarycomponent/SummaryComponent.vue'
import vuetifyMock from '../../__mocks__/vuetify'

describe('Chart Integration Tests', () => {
  let wrapper
  let store

  const mockInstruments = [
    {
      id: 'TEST1',
      name: 'Test Instrument',
      last: 100.50,
      amount: 1000.75,
      varDay: 1.5,
      var30d: -2.3,
      varYear: 0,
      var12m: 5.4
    }
  ]

  const mockChartData = Array.from({ length: 400 }, (_, i) => ({
    date: `2024-01-${String(i + 1).padStart(2, '0')}`,
    value: 100 + Math.random() * 10
  }))

  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: jest.fn,
            stubActions: false,
            initialState: {
              instrument: {
                instruments: mockInstruments,
                chartData: mockChartData,
                period: '1D',
                summaryData: {
                  date: '2024-01-01',
                  marketName: 'TEST',
                  variations: { 
                    "1 MES": 5.5,
                    "1 AÑO": -2.3
                  }
                }
              }
            }
          })
        ],
        mocks: {
          ...vuetifyMock
        },
        stubs: {
          'v-chart': {
            template: '<div class="v-chart"></div>',
            props: ['option']
          }
        }
      }
    })

    store = useInstrumentStore()
    store.fetchInstruments = jest.fn().mockResolvedValue(mockInstruments)
    store.fetchHistory = jest.fn().mockResolvedValue(mockChartData)
    store.fetchSummary = jest.fn().mockResolvedValue()
  })

  it('initializes with correct components', () => {
    const chart = wrapper.findComponent(ChartComponent)
    const summary = wrapper.findComponent(SummaryComponent)
    expect(chart.exists()).toBe(true)
    expect(summary.exists()).toBe(true)
  })

  it('updates chart when instrument is selected', async () => {
    await store.setSelectedInstrument(mockInstruments[0])
    await wrapper.vm.$nextTick()
    expect(store.fetchHistory).toHaveBeenCalledWith(mockInstruments[0].id)
  })

  it('synchronizes chart period', async () => {
    const chart = wrapper.findComponent(ChartComponent)
    await chart.vm.changePeriod('1M')
    await wrapper.vm.$nextTick()
    expect(chart.vm.selectedPeriod).toBe('1M')
  })

  it('filters data by period', async () => {
    const chart = wrapper.findComponent(ChartComponent)
    await chart.vm.changePeriod('1D')
    await wrapper.vm.$nextTick()
    expect(chart.vm.chartOptions.series[0].data.length).toBe(1)
  })

  it('renders period buttons', () => {
    const chart = wrapper.findComponent(ChartComponent)
    const buttons = chart.findAll('.period-buttons button')
    expect(buttons.length).toBe(7)
  })

  it('shows chart configurations', () => {
    const chart = wrapper.findComponent(ChartComponent)
    expect(chart.vm.chartOptions.title.text).toBe('Evolución del Índice')
  })

  it('updates on store changes', async () => {
    const newData = mockChartData.slice(0, 10)
    store.chartData = newData
    await wrapper.vm.$nextTick()
    const chart = wrapper.findComponent(ChartComponent)
    expect(chart.vm.chartOptions.series[0].data).toHaveLength(newData.length)
  })

  it('synchronizes with summary', async () => {
    await store.setSelectedInstrument(mockInstruments[0])
    await wrapper.vm.$nextTick()
    expect(store.fetchSummary).toHaveBeenCalled()
    expect(store.fetchHistory).toHaveBeenCalled()
  })
})