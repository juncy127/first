import { Row, Col, Message, Modal, Notice, Spin } from 'iview'
import 'iview/dist/styles/iview.css'

// 全局注册iview组件
export default {
  install (Vue) {
    Vue.component('Row', Row)
    Vue.component('Col', Col)
    Vue.component('Message', Message)
    Vue.component('Modal', Modal)
    Vue.component('Notice', Notice)
    Vue.component('Spin', Spin)
    Vue.prototype.$message = Message
    Vue.prototype.$modal = Modal
    Vue.prototype.$notice = Notice
    Vue.prototype.$spin = Spin

    Vue.prototype.$message.config({
      top: 200,
      duration: 5
    })
    Vue.prototype.$notice.config({
      top: 200
    })
  }
}
