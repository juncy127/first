<template>
  <div class="iridium-header-user">
    <!--<header-icons :router="true"/>-->
    <div class="iridium-header-user-info">
      <a class="iridium-header-user-avatar">
        <img :src="'http://baojie.owl1024.com/assets/img/profile_small.jpg'" alt="" width="40px" height="40px" />
        啦啦啦
      </a>
    </div>
    <i class="iconfont icon-back"></i>
  </div>
</template>

<script>
// import HeaderIcons from './BaseHeaderIcons'
export default {
  name: 'BaseUserInfo',
  components: {
    // HeaderIcons
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/_variables.css';
@component header-user {
  position: absolute;
  right: 30px;
  left:0;
  text-align:right;
  color: var(--treeColor);
  @descendent info {
    display: inline-block;
    margin-right: 20px;
    line-height: 60px;
  }
  @descendent avatar {
    font-weight: bold;
    font-size: var(--fontSmaller);
    &:hover{
      color: var(--fontColorDark);
    };
    & img {
      width: 40px !important;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
}
</style>
