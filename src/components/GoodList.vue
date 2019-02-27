
<template>
  <van-tabbar
    :value="active"
    active-color="#ff4600"
    change="change"
  >
    <van-tabbar-item
      v-for="(item,index) in myTabbar"
      :key="index"
      :to="item.router"
      change="change"
    > 
      <span>{{ item.text }}</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? item.icon.active : item.icon.normal"
      >
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant';
  export default {
    components:{
        [Tabbar.name]:Tabbar,
        [TabbarItem.name]:TabbarItem,
    },
    props:{
        active:Number,
    },
    data () {
      return {
          myTabbar:[
            {
                icon:{ active:require('../../static/image/web/home-active.png'), normal:require('../../static/image/web/home.png') },
                text:'首页',
                router:'/',
            },
            {
                icon:{ active:require('../../static/image/web/scoreshop-active.png'), normal:require('../../static/image/web/scoreshop.png') },
                text:'积分商城',
                router:'/scoreshop',
            },
            {
                icon:{ active:require('../../static/image/web/mine-active.png'), normal:require('../../static/image/web/mine.png') },
                text:'我的',
                router:'/mine',
            },
              
          ],

      }
    },
    
    async created(){
      
    
    },

    methods:{
        change(){
        }
    
   
    }


  }
</script>


<style lang='less' scope>

 
</style>


