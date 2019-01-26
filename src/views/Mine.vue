
<template>
  <div class="page has-navbar"   style='transition:none !important'>
    <div class=" text-center " >
      <div class='mine'>

            <div class="use-headimg"><img src="http://h5.wjwlddz.com:9001/image?url=http%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FQ0j4TwGTfTIowbz5xxVOJdbK5QqOHQ9ia4VCro19twhPiby3mECL0ib23iaVP8cicKOz2EEYuf34sss4ZYHjzg0J6ibA%2F132.jpg" width="100%" height="100%" alt=""></div>
            <div class="use-name">能</div>
            <div class="mineItems">
              <ul>

                <li v-for="item in mineItems" v-on:click="goItem(item)">
                  <div class="mineItems-left">
                    <div class="mineItems-icon"><img  :src="item.icon" width="100%" alt=""></div>
                    <span class="mineItems-text">{{item.text}}</span>
                    <span v-if="item.id === 'score'" class="mineItems-num">31312</span>
                  </div>
                  <i></i>
                </li>
                
              </ul>
            </div>

     

        <my-tabbar v-bind:active=2 ></my-tabbar>


      </div>
    </div>
  </div>
</template>
<script>

  import get from '../services/get';
  import MyTabbar from '@/components/Tabbar.vue'
import { NavBar  } from 'vant';


  export default {
    components: {
      MyTabbar,
      [NavBar.name]:NavBar,

    },
    data () {
      
      return {
        mineItems:[
          {
            url:'/mybag',
            icon:require('../../static/image/web/icon-bag.png'),
            text:'我的背包',
            id:'bag'
          },
          {
            url:'/mine/myaddress',
            icon:require('../../static/image/web/icon-address.png'),
            text:'地址管理',
            id:'address'
          },
          {
            url:'/mine/myorder',
            icon:require('../../static/image/web/icon-order.png'),
            text:'我的订单',
            id:'order'
          },
          {
            url:'/mine/myscore',
            icon:require('../../static/image/web/icon-score.png'),
            text:'我的积分',
            id:'score'
          },
          {
            url:'/customer',
            icon:require('../../static/image/web/icon-customer.png'),
            text:'联系客服',
            id:'customer'
          },
          {
            url:'/message',
            icon:require('../../static/image/web/icon-message.png'),
            text:'消息',
            id:'message'
          },
          {
            url:'/logout',
            icon:require('../../static/image/web/icon-logout.png'),
            text:'退出登录',
            id:'logout'
          },
        ]

      }
    },
    async created(){

    
    },

    methods:{
      
      goItem(obj){
        console.log(obj)
        this.$router.push(obj.url)
      }

    
   
    }
  }
</script>


<style lang='less' scope>

a{
      text-decoration: none;
    background-color: transparent;
}
 

 .navbar{
   background: #b6271d ;
 }
 .navbar h1{
   color: #fff;
 }
.mine{
   background: #b6271d ;
   height: 100%;
    position: absolute;
    left: 0;
    right: 0;
   .use-headimg{
     width: 50px;
     height: 50px;
     border-radius: 50%;
     overflow: hidden;
     margin: 36px auto 0;

   }

   .use-name{
     color: #fff;
     font-size: 20px;
     margin-top:20px;

   }

   .mineItems{
     margin-top:26px;
     ul{  

       li{
         width: 90%;
         margin: 0 auto;
         display: flex;
         justify-content:space-between;
         background: #fff;
         overflow: hidden;
         border-radius:6px;
         padding:  15px 20px;
         margin-bottom: 15px;
         color: #616161;
         box-sizing: border-box;
         .mineItems-left{
           display: flex;
         }
         .mineItems-icon{
           width:20px;
           height:10px;
         }
         .mineItems-text{
           margin-left: 10px;
         }
         .mineItems-num{
           margin-left: 20px;
           color:#fc4700;
           font-size: 14px;
         }
         i{
          width:11px;
          height:19px;
          display: block;
          background:url('../../static/image/web/arrow-right.png') center no-repeat;
          background-size:contain; 

         }
       }
     }
   }

}
 
</style>


