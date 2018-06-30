<template>
  <div id="app" class="iridium">
    <base-navigator/>
    <main class="iridium-main">
      <base-header/>
      <article>
        <keep-alive>
          <router-view/>
        </keep-alive>
      </article>
    </main>
  </div>
</template>

<script>
import BaseHeader from '@/components/universal/BaseHeader'
import BaseNavigator from '@/components/universal/BaseNavigator'
export default {
  name: 'App',
  components: {
    BaseHeader,
    BaseNavigator
  }
}
</script>

<style>
@import './assets/css/iridium.css';
.iridium {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.iridium-main {
  flex: 1;
}
</style>
