import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import SearchBarComponent from '../../../src/components/searchcomponent/SearchBarComponent.vue'

describe('SearchBarComponent', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(SearchBarComponent, {
      global: {
        plugins: [createTestingPinia({
          createSpy: jest.fn
        })]
      }
    })
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
    const store = useInstrumentStore()
    store.instruments = [
      { id: 1, name: 'TEST1', last: 100 },
      { id: 2, name: 'TEST2', last: 200 }
    ]

    await wrapper.find('input').setValue('TEST')
    expect(wrapper.vm.filteredInstruments.length).toBe(2)
  })
})