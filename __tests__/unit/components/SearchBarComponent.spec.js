import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import SearchBarComponent from '../../../src/components/searchcomponent/SearchBarComponent.vue'
import { useInstrumentStore } from '../../../src/stores/useInstrumentStore'

describe('SearchBarComponent', () => {
  let wrapper
  let store

  beforeEach(() => {
    const pinia = createTestingPinia({
      createSpy: jest.fn
    })
    
    wrapper = mount(SearchBarComponent, {
      global: {
        plugins: [pinia]
      }
    })
    
    store = useInstrumentStore()
  })

  it('renders input correctly', () => {
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('updates searchQuery on input', async () => {
    const input = wrapper.find('input')
    await input.setValue('test')
    expect(wrapper.vm.searchQuery).toBe('test')
  })

  it('filters instruments based on search query', async () => {
    store.instruments = [
      { id: 1, name: 'TEST1', last: 100 },
      { id: 2, name: 'TEST2', last: 200 }
    ]

    const input = wrapper.find('input')
    await input.setValue('TEST')
    
    // Esperoa que se actualice el computed
    await wrapper.vm.$nextTick()
    
    expect(wrapper.findAll('.list-result li')).toHaveLength(2)
  })
})