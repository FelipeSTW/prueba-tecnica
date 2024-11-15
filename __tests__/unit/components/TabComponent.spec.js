import { mount } from '@vue/test-utils'
import TabComponent from '../../../src/components/tabcomponent/TabComponent.vue'

describe('TabComponent', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(TabComponent)
  })

  it('renders all tabs correctly', () => {
    const buttons = wrapper.findAll('.tab-button')
    expect(buttons).toHaveLength(5)
    expect(buttons[0].text()).toBe('IPSA')
    expect(buttons[1].text()).toBe('IGPA')
  })

  it('sets initial tab correctly', () => {
    const wrapper = mount(TabComponent, {
      props: {
        initialTab: 'NASDAQ'
      }
    })
    expect(wrapper.find('.active').text()).toBe('NASDAQ')
  })

  it('updates selected tab on click', async () => {
    const button = wrapper.findAll('.tab-button')[2]
    await button.trigger('click')
    expect(wrapper.vm.selectedTab).toBe('NASDAQ')
    expect(button.classes()).toContain('active')
  })

  it('emits tab-selected event when tab is clicked', async () => {
    const button = wrapper.findAll('.tab-button')[1]
    await button.trigger('click')
    expect(wrapper.emitted('tab-selected')).toBeTruthy()
    expect(wrapper.emitted('tab-selected')[0]).toEqual(['IGPA'])
  })
})