//应用版本号
window.version = "1.0.0";


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
import wechat from './configs/wechat'
import { Lazyload } from 'vant';

import get from './services/get'
window.api = {
  get
}
Vue.use(Lazyload, {
  preLoad: 1,
  error: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABZCAYAAADSOmGpAAAA6klEQVR4nO3RQQ3AIADAwDH/VgkSwAFf+rhT0KRjzrU/sv7XAdwZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBz6bBHrAwg05AAAAAElFTkSuQmCC',
  loading: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABZCAYAAADSOmGpAAAA6klEQVR4nO3RQQ3AIADAwDH/VgkSwAFf+rhT0KRjzrU/sv7XAdwZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBsUZFGdQnEFxBz6bBHrAwg05AAAAAElFTkSuQmCC  ',
  attempt: 3
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

wechat.login();

router.beforeEach(async (to, from, next) => {
  try {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if(!user || !user.account){
      await wechat.login()
    }else{
        if( !( Date.now() - user.alterTime  < 2000 ) ){
          wechat.reloadUserData();
        }
    }
    next()
  } catch (error) {
    // sessionStorage.clear()
  }
   
  // ...
})