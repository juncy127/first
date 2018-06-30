<template>
  <div class="iridium-dropdown" :class="classList">
    <span class="iridium-dropdown-title" @click="toggleSlide">{{ title }} <i :class="icon"></i></span>
    <ul v-show="showList" class="iridium-dropdown-list">
      <li v-for="(item, index) in datalist" :key="index" class="iridium-dropdown-option" :class="{'iridium-dropdown-option--division': item.division}" @click="select($event, item)">{{ item.text }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CommonDropdown',
  props: {
    classList: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'fa fa-angle-down'
    },
    title: {
      type: String,
      default: '下拉菜单'
    },
    datalist: {
      type: Array,
      default () {
        return [
          {
            text: '下拉选项1',
            value: '下拉选项1'
          }
        ]
      }
    }
  },
  data () {
    return {
      showList: false
    }
  },
  methods: {
    toggleSlide () {
      this.showList = !this.showList
    },
    select (event, item) {
      this.$emit('select', { $event: event, option: item })
      this.showList = false
    }
  }
}
</script>
