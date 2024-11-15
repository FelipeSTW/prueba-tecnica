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
        },
        stubs: {
          InstrumentItemComponent: {
            name: 'InstrumentItemComponent',
            template: `
              <div class="instrument-item" @click="$emit('click')">
                <div class="instrument-name">{{ instrument.name }}</div>
                <div class="instrument-last">{{ instrument.last }}</div>
                <div class="instrument-amount">{{ instrument.amount }}</div>
                <div class="instrument-change">{{ instrument.varDay }}</div>
                <div class="instrument-change">{{ instrument.var30d }}</div>
                <div class="instrument-change">{{ instrument.varYear }}</div>
                <div class="instrument-change">{{ instrument.var12m }}</div>
              </div>
            `,
            props: ['instrument']
          }
        }
      }
    })
  })

  it('renders list header correctly', () => {
    const headers = wrapper.find('.instrument-header').findAll('div')
    expect(headers.length).toBe(7)
    expect(headers[0].text()).toBe('Nombre')
    expect(headers[1].text()).toBe('Último')
    expect(headers[2].text()).toBe('Monto (MM)')
    expect(headers[3].text()).toBe('Var día')
    expect(headers[4].text()).toBe('Var 30d')
    expect(headers[5].text()).toBe('Año Actual')
    expect(headers[6].text()).toBe('12 Meses')
  })

  it('renders correct number of instrument items', () => {
    const items = wrapper.findAllComponents({ name: 'InstrumentItemComponent' })
    expect(items.length).toBe(mockInstruments.length)
  })

  it('displays all instrument data correctly', () => {
    const firstInstrument = mockInstruments[0]
    const instrumentElement = wrapper.find('.instrument-item')
    
    expect(instrumentElement.find('.instrument-name').text()).toBe(firstInstrument.name)
    expect(instrumentElement.find('.instrument-last').text()).toBe(firstInstrument.last.toString())
    expect(instrumentElement.find('.instrument-amount').text()).toBe(firstInstrument.amount.toString())
  })

  it('passes correct props to instrument items', () => {
    const firstItem = wrapper.findComponent({ name: 'InstrumentItemComponent' })
    expect(firstItem.props('instrument')).toEqual(mockInstruments[0])
  })

  it('emits instrument-selected event when instrument is selected', async () => {
    await wrapper.findComponent({ name: 'InstrumentItemComponent' }).trigger('click')
    expect(wrapper.emitted('instrument-selected')).toBeTruthy()
    expect(wrapper.emitted('instrument-selected')[0][0]).toEqual(mockInstruments[0])
  })

  it('handles empty instruments array', () => {
    const emptyWrapper = mount(InstrumentListComponent, {
      props: {
        instruments: []
      },
      global: {
        components: {
          InstrumentItemComponent
        }
      }
    })
    const items = emptyWrapper.findAllComponents(InstrumentItemComponent)
    expect(items.length).toBe(0)
  })

  it('maintains header structure with empty data', () => {
    const emptyWrapper = mount(InstrumentListComponent, {
      props: {
        instruments: []
      },
      global: {
        components: {
          InstrumentItemComponent
        }
      }
    })
    const headers = emptyWrapper.find('.instrument-header').findAll('div')
    expect(headers.length).toBe(7)
  })

  it('updates when instruments prop changes', async () => {
    const newInstruments = [mockInstruments[0]]
    await wrapper.setProps({ instruments: newInstruments })
    const items = wrapper.findAllComponents({ name: 'InstrumentItemComponent' })
    expect(items.length).toBe(1)
  })
})