import Vue from 'vue'
import BaseHeader from '@/components/BaseHeader'

describe('BaseHeader.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(BaseHeader)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.iridium-header h1').textContent)
      .toEqual('头部')
  })
})
