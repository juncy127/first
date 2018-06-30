import Vue from 'vue'
import Router from 'vue-router'
import IridiumHome from '@/components/IridiumHome'
// demostration
import DemoList from '@/components/demo/DemoList'

import baseInfo from './baseInfo'
import alarmInfo from './alarmInfo'
import statisticalReport from './statisticalReport'
import qualityControl from './qualityControl'
import checkInfo from './checkInfo'
// import systemConfig from './systemConfig'

Vue.use(Router)

let routers = []

const PageRouters = [
  { path: '/', name: 'IridiumHome', component: IridiumHome },
  ...baseInfo,
  ...alarmInfo,
  ...statisticalReport,
  ...qualityControl,
  ...checkInfo
  // ...systemConfig
]
const DemoRouters = [
  {
    path: '/demo',
    name: 'DemoList',
    component: DemoList
  }
]
routers = process.env.NODE_ENV !== 'production'
  ? PageRouters.concat(DemoRouters)
  : PageRouters

export default new Router({
  routes: routers
})
