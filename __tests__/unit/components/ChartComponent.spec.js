import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import ChartComponent from '../../../src/components/chartcomponent/ChartComponent.vue'
import { useInstrumentStore } from '../../../src/stores/useInstrumentStore'

describe('ChartComponent', () => {
  let wrapper
  let store

  const mockChartData = [
    { date: '2024-01-01', value: 100 },
    { date: '2024-01-02', value: 102 },
    { date: '2024-01-03', value: 101 }
  ]

  beforeEach(() => {
    const pinia = createTestingPinia({
      createSpy: jest.fn,
      initialState: {
        instrument: {
          instruments: mockChartData,
          chartData: mockChartData
        }
      },
      stubActions: false
    })

    wrapper = mount(ChartComponent, {
      global: {
        plugins: [pinia],
        stubs: {
          'v-chart': {
            template: '<div class="v-chart"></div>',
            props: ['option']
          }
        }
      }
    })

    store = useInstrumentStore()
    store.fetchInstruments = jest.fn().mockResolvedValue()
  })

  it('renders period buttons correctly', () => {
    const buttons = wrapper.findAll('.period-buttons button')
    expect(buttons).toHaveLength(7)
    expect(buttons[0].text()).toBe('1D')
    expect(buttons[6].text()).toBe('5A')
  })

  it('updates selected period on button click', async () => {
    const buttons = wrapper.findAll('.period-buttons button')
    await buttons[1].trigger('click')
    expect(wrapper.vm.selectedPeriod).toBe('1S')
  })

  it('applies active class to selected period button', async () => {
    const button = wrapper.findAll('.period-buttons button')[2]
    await button.trigger('click')
    expect(button.classes()).toContain('active')
  })

  it('filters chart data correctly for different periods', async () => {
    const data = Array.from({ length: 400 }, (_, i) => ({
      date: `2024-01-${i + 1}`,
      value: 100 + i
    }))
    store.chartData = data

    await wrapper.vm.changePeriod('1D')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.chartOptions.series[0].data.length).toBe(1)

    await wrapper.vm.changePeriod('1M')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.chartOptions.series[0].data.length).toBe(30)
  })

  it('initializes chart with correct options', () => {
    const options = wrapper.vm.chartOptions
    expect(options.title.text).toBe('Evolución del Índice')
    expect(options.series[0].type).toBe('line')
    expect(options.series[0].smooth).toBe(true)
  })
})