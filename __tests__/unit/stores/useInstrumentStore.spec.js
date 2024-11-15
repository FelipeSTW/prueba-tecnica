import { setActivePinia, createPinia } from 'pinia'
import { useInstrumentStore } from '../../../src/stores/useInstrumentStore'
import axios from 'axios'

jest.mock('axios')

describe('useInstrumentStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    jest.clearAllMocks()
  })

  it('updates selected instrument correctly', () => {
    const store = useInstrumentStore()
    const mockInstrument = {
      id: 'TEST1',
      name: 'Test Instrument'
    }
    
    store.setSelectedInstrument(mockInstrument)
    expect(store.selectedInstrument).toEqual(mockInstrument)
  })

  it('fetches instruments successfully', async () => {
    const mockData = {
      data: {
        success: true,
        data: {
          constituents: [
            {
              codeInstrument: 'TEST1',
              shortName: 'Test',
              lastPrice: 100,
              volumeMoney: 1000000,
              pctDay: 1.5,
              pct30D: 2.3,
              pctCY: 3.4,
              pct1Y: 4.5
            }
          ]
        }
      }
    }

    axios.get.mockResolvedValueOnce(mockData)

    const store = useInstrumentStore()
    await store.fetchInstruments()

    expect(store.instruments.length).toBe(1)
    expect(store.instruments[0].name).toBe('Test')
  })

  it('updates period correctly', () => {
    const store = useInstrumentStore()
    store.setPeriod('1W')
    expect(store.period).toBe('1W')
  })

  it('updates selected index correctly', () => {
    const store = useInstrumentStore()
    store.setSelectedIndex('NASDAQ')
    expect(store.selectedIndex).toBe('NASDAQ')
  })
})