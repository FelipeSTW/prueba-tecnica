import { mount } from '@vue/test-utils'
import HeaderComponent from '../../../src/components/headercomponent/HeaderComponent.vue'

describe('HeaderComponent', () => {
  const defaultProps = {
    indexName: 'TEST INDEX',
    currentValue: 1000,
    variationPercent: 2.5,
    variationPoints: 25
  }

  let wrapper

  beforeEach(() => {
    wrapper = mount(HeaderComponent, {
      props: defaultProps
    })
  })

  it('renders with default props', () => {
    expect(wrapper.find('h1').text()).toBe('TEST INDEX')
    expect(wrapper.find('.current-value').text()).toBe('1000')
  })

  it('displays variations correctly', () => {
    const variations = wrapper.findAll('.variation')
    expect(variations[0].text()).toContain('2.5%')
    expect(variations[1].text()).toContain('25')
  })

  it('applies correct variation classes for positive values', () => {
    const positiveWrapper = mount(HeaderComponent, {
      props: {
        ...defaultProps,
        variationPercent: 1.5,
        variationPoints: 15
      }
    })
    expect(positiveWrapper.find('.positive').exists()).toBe(true)
    expect(positiveWrapper.find('.negative').exists()).toBe(false)
  })

  it('applies correct variation classes for negative values', () => {
    const negativeWrapper = mount(HeaderComponent, {
      props: {
        ...defaultProps,
        variationPercent: -1.5,
        variationPoints: -15
      }
    })
    expect(negativeWrapper.find('.negative').exists()).toBe(true)
    expect(negativeWrapper.find('.positive').exists()).toBe(false)
  })

  it('uses correct method for variation class', () => {
    expect(wrapper.vm.getVariationClass(1)).toBe('positive')
    expect(wrapper.vm.getVariationClass(-1)).toBe('negative')
    expect(wrapper.vm.getVariationClass(0)).toBe('')
  })
})