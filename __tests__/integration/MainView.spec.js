import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import App from '../../src/App.vue'
import { useInstrumentStore } from '../../src/stores/useInstrumentStore'
import SearchBarComponent from '../../src/components/searchcomponent/SearchBarComponent.vue'
import InstrumentItemComponent from '../../src/components/instrumentitemcomponent/InstrumentItemComponent.vue'

// Mock de los componentes que no necesitamos probar en detalle
jest.mock('../../src/components/chartcomponent/ChartComponent.vue', () => ({
  name: 'ChartComponent',
  template: '<div class="mock-chart">Mock Chart</div>'
}))

jest.mock('../../src/components/summarycomponent/SummaryComponent.vue', () => ({
  name: 'SummaryComponent',
  template: '<div class="mock-summary">Mock Summary</div>'
}))

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

  beforeEach(() => {
    // Crear un Pinia de prueba con datos mock
    const pinia = createTestingPinia({
      createSpy: jest.fn,
      initialState: {
        instrument: {
          instruments: mockInstruments,
          selectedInstrument: null,
          period: '1D',
          selectedIndex: 'IPSA'
        }
      }
    })

    // Montar el componente App con todas sus dependencias
    wrapper = mount(App, {
      global: {
        plugins: [pinia],
        stubs: {
          'v-app': true,
          'v-container': true,
          'v-main': true,
          'TabComponent': true,
          'HeaderComponent': true
        }
      }
    })

    store = useInstrumentStore()
  })

  it('loads and displays instruments correctly', async () => {
    // Verificar que se llama a fetchInstruments al montar
    expect(store.fetchInstruments).toHaveBeenCalled()
    
    // Verificar que los instrumentos se muestran en la lista
    const instrumentItems = wrapper.findAllComponents(InstrumentItemComponent)
    expect(instrumentItems.length).toBe(mockInstruments.length)
  })

  it('searches and filters instruments correctly', async () => {
    // Obtener el componente de búsqueda
    const searchBar = wrapper.findComponent(SearchBarComponent)
    
    // Simular una búsqueda
    await searchBar.find('input').setValue('Apple')
    
    // Verificar que se muestran los resultados filtrados
    const filteredResults = wrapper.find('.list-result')
    expect(filteredResults.text()).toContain('Apple')
  })

  it('selects instrument and updates store', async () => {
    // Encontrar el primer instrumento en la lista
    const firstInstrument = wrapper.findComponent(InstrumentItemComponent)
    
    // Simular click en el instrumento
    await firstInstrument.find('.instrument-name').trigger('click')
    
    // Verificar que se actualizó el store
    expect(store.setSelectedInstrument).toHaveBeenCalledWith(mockInstruments[0])
    
    // Verificar que se llamaron a los métodos para cargar datos adicionales
    expect(store.fetchSummary).toHaveBeenCalledWith(mockInstruments[0].id)
    expect(store.fetchHistory).toHaveBeenCalledWith(mockInstruments[0].id)
  })

  it('updates period and refreshes chart data', async () => {
    // Simular cambio de período
    await wrapper.vm.handlePeriodChanged('1W')
    
    // Verificar que se actualizó el store
    expect(store.setPeriod).toHaveBeenCalledWith('1W')
    expect(store.period).toBe('1W')
  })

  it('updates selected index and refreshes data', async () => {
    // Simular cambio de índice
    await wrapper.vm.handleTabSelected('NASDAQ')
    
    // Verificar que se actualizó el store
    expect(store.setSelectedIndex).toHaveBeenCalledWith('NASDAQ')
    expect(store.selectedIndex).toBe('NASDAQ')
  })

  it('integrates search with instrument selection', async () => {
    // Simular búsqueda
    const searchBar = wrapper.findComponent(SearchBarComponent)
    await searchBar.find('input').setValue('Apple')
    
    // Simular selección desde resultados de búsqueda
    const searchResults = wrapper.find('.list-result li')
    await searchResults.trigger('click')
    
    // Verificar que se actualizó el store y se limpia la búsqueda
    expect(store.setSelectedInstrument).toHaveBeenCalled()
    expect(searchBar.vm.searchQuery).toBe('')
  })

  it('updates UI components when store changes', async () => {
    // Simular cambio en el store
    const newInstrument = mockInstruments[0]
    await store.setSelectedInstrument(newInstrument)
    
    // Verificar que los componentes se actualizaron
    expect(wrapper.find('.mock-summary').exists()).toBe(true)
    expect(wrapper.find('.mock-chart').exists()).toBe(true)
  })

  // Test de error handling
  it('handles API errors gracefully', async () => {
    // Forzar un error en la carga de datos
    store.fetchInstruments.mockRejectedValue(new Error('API Error'))
    
    // Verificar que la aplicación no falla
    await wrapper.vm.handleInstrumentSelected(mockInstruments[0])
    expect(wrapper.find('.v-app').exists()).toBe(true)
  })
})