<template>
  <Spin v-show="show" fix class="iridium-loading">
    <Icon type="load-d" size=30 class="iridium-loading-icon"></Icon>
    <p>{{ text }}</p>
  </Spin>
</template>

<script>
import { Spin, Icon } from 'iview'
export default {
  name: 'CommonLoading',
  components: {
    Spin,
    Icon
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'Loading'
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/_loading.css';
</style>
