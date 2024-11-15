import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import SummaryComponent from '../../../src/components/summarycomponent/SummaryComponent.vue'
import { useInstrumentStore } from '../../../src/stores/useInstrumentStore'

describe('SummaryComponent', () => {
  const mockSummaryData = {
    date: '2024-01-01',
    marketName: 'NYSE',
    openPrice: 100.50,
    closePrice: 101.75,
    maxDay: 102.50,
    minDay: 99.50,
    max52W: 110.00,
    min52W: 90.00,
    variations: {
      '1 MES': 5.5,
      '1 AÑO': -2.3,
      'AÑO A LA FECHA': 8.7
    }
  }

  let wrapper
  let store

  beforeEach(() => {
    const pinia = createTestingPinia({
      initialState: {
        instrument: {
          summaryData: mockSummaryData
        }
      }
    })

    wrapper = mount(SummaryComponent, {
      global: {
        plugins: [pinia],
        stubs: {
          'v-container': {
            template: '<div><slot /></div>'
          },
          'v-row': {
            template: '<div><slot /></div>'
          },
          'v-col': {
            template: '<div><slot /></div>'
          },
          'v-card': {
            template: '<div><slot /></div>'
          },
          'v-card-title': {
            template: '<div><slot /></div>'
          },
          'v-card-text': {
            template: '<div><slot /></div>'
          }
        }
      }
    })

    store = useInstrumentStore()
  })

  it('formats currency correctly', () => {
    expect(wrapper.vm.formatCurrency(100.50)).toBe('$100.50')
    expect(wrapper.vm.formatCurrency(null)).toBe('-')
  })

  it('formats percentage correctly', () => {
    expect(wrapper.vm.formatPercentage(5.5)).toBe('+5.50%')
    expect(wrapper.vm.formatPercentage(-2.3)).toBe('-2.30%')
    expect(wrapper.vm.formatPercentage(null)).toBe('-')
  })

  it('displays market details correctly', async () => {
    await wrapper.vm.$nextTick()
    const html = wrapper.html()
    expect(html).toContain('NYSE')
    expect(html).toContain('$100.50')
    expect(html).toContain('$101.75')
  })

  it('displays variations with correct formatting', async () => {
    await wrapper.vm.$nextTick()
    const html = wrapper.html()
    Object.entries(mockSummaryData.variations).forEach(([label, value]) => {
      expect(html).toContain(label)
      const formattedValue = value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`
      expect(html).toContain(formattedValue)
    })
  })

  it('applies correct CSS classes for variations', async () => {
    await wrapper.vm.$nextTick()
    store.summaryData = mockSummaryData
    await wrapper.vm.$nextTick()
    
    const variations = wrapper.find('.variation-section')
    expect(variations.exists()).toBe(true)
    
    const positiveValue = wrapper.find('.variation-item .positive')
    const negativeValue = wrapper.find('.variation-item .negative')
    expect(positiveValue.exists()).toBe(true)
    expect(negativeValue.exists()).toBe(true)
  })
})