<template>
  <header class="iridium-header">
    <nav class="iridium-header-nav flex">
      <button class="iridium-btn iconfont icon-menu" @click="toggleNavbar"></button>
      <!--<header-icons :labels="iconLabels"/>-->
      <user-info/>
    </nav>
    <tree-tags/>
  </header>
</template>

<script>
// import HeaderIcons from './BaseHeaderIcons'
import UserInfo from './BaseHeaderUserInfo'
import treeTags from './BaseTreeTags'
export default {
  name: 'BaseHeader',
  components: {
    // HeaderIcons,
    UserInfo,
    treeTags
  },
  data () {
    return {
      title: '头部'
      // iconLabels: [
      //   { modifier: 'state', text: '状态' },
      //   { modifier: 'facility', text: '设备' },
      //   { modifier: 'offwork', text: '脱岗' }
      // ]
    }
  },
  methods: {
    toggleNavbar () {
      this.$store.dispatch('UPDATE_TOGGLENAV', !this.$store.state.toggleNav)
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/_variables.css'
@component header {
  & h1 {
    color: red;
  }
  @descendent nav {
    height: 60px;
  }
}
.iridium-header-nav {
  background: #fff;
}
.iridium-btn {
  margin: 15px 20px;
  color: var(--navBgColor);
  position: relative;
  z-index: 2;
}
</style>
