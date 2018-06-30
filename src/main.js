// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Api from './api'
// iview全局组件设置
import Iview from './iview'
import Axios from 'axios'
import * as util from './util'

Vue.config.productionTip = false

Vue.use(Api)
Vue.use(Iview)
Vue.prototype.$axios = Axios
Vue.prototype.$utils = util

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
