import { mount } from '@vue/test-utils'
import InstrumentListComponent from '../../../src/components/instrumentlistcomponent/InstrumentListComponent.vue'
import InstrumentItemComponent from '../../../src/components/instrumentitemcomponent/InstrumentItemComponent.vue'

describe('InstrumentListComponent', () => {
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

  let wrapper

  beforeEach(() => {
    wrapper = mount(InstrumentListComponent, {
      props: {
        instruments: mockInstruments
      },
      global: {
        components: {
          InstrumentItemComponent
        }
      }
    })
  })

  it('renders list header correctly', () => {
    const headers = wrapper.findAll('.instrument-header div')
    expect(headers.length).toBe(7)
    expect(headers[0].text()).toBe('Nombre')
    expect(headers[1].text()).toBe('Último')
    expect(headers[2].text()).toBe('Monto (MM)')
  })

  it('renders correct number of instrument items', () => {
    const items = wrapper.findAllComponents(InstrumentItemComponent)
    expect(items.length).toBe(mockInstruments.length)
  })

  it('passes correct props to instrument items', () => {
    const firstItem = wrapper.findComponent(InstrumentItemComponent)
    expect(firstItem.props('instrument')).toEqual(mockInstruments[0])
  })

  it('emits instrument-selected event when instrument is selected', async () => {
    await wrapper.findComponent(InstrumentItemComponent).trigger('click')
    expect(wrapper.emitted('instrument-selected')).toBeTruthy()
    expect(wrapper.emitted('instrument-selected')[0][0]).toEqual(mockInstruments[0])
  })
})