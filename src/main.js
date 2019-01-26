import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//加密模块
import './configs/crypto/crypto'
/* 全局自定义组件 */
import './configs/serverConfig'

//网络模块
import './configs/net'
//微信网页授权
import './configs/wechat'


import get from './services/get'
window.api = {
  get
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
