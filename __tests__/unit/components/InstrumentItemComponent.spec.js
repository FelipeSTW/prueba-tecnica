import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import InstrumentItemComponent from '../../../src/components/instrumentitemcomponent/InstrumentItemComponent.vue'
import { useInstrumentStore } from '../../../src/stores/useInstrumentStore'

describe('InstrumentItemComponent', () => {
  const mockInstrument = {
    id: 'TEST1',
    name: 'Test Instrument',
    last: 100.50,
    amount: 1000.75,
    varDay: 1.5,
    var30d: -2.3,
    varYear: 0,
    var12m: 5.4
  }

  let wrapper
  let store

  beforeEach(() => {
    // Crear un Pinia de prueba
    const pinia = createTestingPinia({
      createSpy: jest.fn,
    })
    
    wrapper = mount(InstrumentItemComponent, {
      props: {
        instrument: mockInstrument
      },
      global: {
        plugins: [pinia]
      }
    })

    store = useInstrumentStore()
  })

  it('renders instrument data correctly', () => {
    expect(wrapper.find('.instrument-name').text()).toBe('Test Instrument')
    expect(wrapper.find('.instrument-last').text()).toBe('$100.50')
    expect(wrapper.find('.instrument-amount').text()).toBe('$1000.75')
  })

  it('formats percentages correctly', () => {
    expect(wrapper.vm.formatPercentage(1.5)).toBe('+1.50%')
    expect(wrapper.vm.formatPercentage(-2.3)).toBe('-2.30%')
  })

  it('applies correct CSS classes for changes', () => {
    expect(wrapper.vm.getChangeClass(1.5)).toBe('positive')
    expect(wrapper.vm.getChangeClass(-2.3)).toBe('negative')
    expect(wrapper.vm.getChangeClass(0)).toBe('neutral')
  })

  it('calls setSelectedInstrument when clicking on instrument', async () => {
    await wrapper.find('.instrument-name').trigger('click')
    expect(store.setSelectedInstrument).toHaveBeenCalledWith(mockInstrument)
  })
})