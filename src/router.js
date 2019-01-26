import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    
    {
      path: '/scoreshop',
      name: 'scoreshop',
      component: () => import('./views/Scoreshop.vue')
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('./views/Mine.vue')
    },
    {
      path: '/mine/myaddress',
      name: 'myaddress',
      component: () => import('./views/Myaddress.vue')
    },
    {
      path: '/mine/myaddressadd',
      name: 'myaddress',
      component: () => import('./views/MyaddressAdd.vue')
    },
    {
      path: '/mine/myorder',
      name: 'myorder',
      component: () => import('./views/Myorder.vue')
    },
    {
      path: '/mine/myorderdetail',
      name: 'myorderdetail',
      component: () => import('./views/MyorderDetail.vue')
    },
    {
      path: '/mine/mypost',
      name: 'mypost',
      component: () => import('./views/Mypost.vue')
    },
    {
      path: '/mine/firmmyorder',
      name: 'firmmyorder',
      component: () => import('./views/FirmMyorder.vue')
    },
    {
      path: '/mine/myscore',
      name: 'myscore',
      component: () => import('./views/Myscore.vue')
    },
    
    {
      path: '/customer',
      name: 'customer',
      component: () => import('./views/Customer.vue')
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('./views/Message.vue')
    },
    {
      path: '/mybag',
      name: 'mybag',
      component: () => import('./views/Mybag.vue')
    },

    
    
    
  ]
})
