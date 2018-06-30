<template>
  <span class="iridium-header-icons">
    <router-link tag="a" v-for="item in labels" :key="item.modifier" :to="isRouter(item)" :class="generateClass(item)">
      <i class="fa fa-bell"></i>
      {{ item.text }}
      <i v-show="router" class="iridium-badge iridium-badge--primary iridium-badge--icon">{{ '1' }}</i>
    </router-link>
  </span>
</template>

<script>
export default {
  name: 'BaseHeaderIcons',
  props: {
    labels: {
      type: Array,
      default () {
        return [
          { modifier: 'state', text: '' },
          { modifier: 'facility', text: '' },
          { modifier: 'offwork', text: '' }
        ]
      }
    },
    router: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    generateClass (item) {
      let classString = `iridium-header-icons-item iridium-header-icons--${item.modifier}`
      if (this.router) {
        classString += ' iridium-header-icons--router'
      }
      return classString
    },
    isRouter (item) {
      if (!this.router) return ''
      return { name: item.href }
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/_variables.css';
@component header-icons {
  margin: 15px auto;
  @descendent item {
    color: var(--fontColorNormal);
    font-size: var(--fontBase);
    font-weight: bold;
    line-height: 30px;
    margin-left: 50px;
    text-decoration: none;
    cursor: default;
    & .fa {
      margin-right: 5px;
    }
  }

  @modifier state {
    & .fa {
      color: #F70CDA;
    }
  }

  @modifier facility {
    & .fa {
      color: #0D3FF4;
    }
  }

  @modifier offwork {
    & .fa {
      color: #E3B20F;
    }
  }
  @modifier router {
    position: relative;
    margin-left: 0;
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>
