
<template>
  <div class="page has-navbar"   style='transition:none !important'>
    <van-nav-bar
      title="消息"
      fixed
      border
      left-arrow
       @click-left="onClickLeft"
    />
    <div class="page-content text-center " >
      <div class='scoreshop'>
     

      </div>
    </div>
  </div>
</template>
<script>

  import get from '../services/get';
import { NavBar  } from 'vant';
  

  export default {
    components: {
      [NavBar.name]:NavBar,
    },
    data () {
      
      return {
        navArr:[],
        goodList:[],

      }
    },
    async created(){

    
    },

    methods:{
      onClickLeft(){
        this.$router.back();
      }
    }
  }
</script>


<style lang='less' scope>
.van-nav-bar .van-icon{
  color: #fff
}
 

 
</style>


