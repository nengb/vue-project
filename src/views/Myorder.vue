
<template>
  <div class="page has-navbar"   style='transition:none !important'>
    <van-nav-bar
      title="我的订单"
      fixed
      border
      left-arrow
       @click-left="onClickLeft"
    />
    <div class="page-content text-center " >
      <div class='myorder'>
        <div class="orderList">
          <div class="orderListItem" v-for="item in orderList" v-on:click="toOrderDetail(item)">
            <div class="orderInfo">
              <div class="orderid">订单编号：{{item.ord_id}}</div>
              <div class="time">下单时间：{{item.formatTime}}</div>
            </div>
            <div class="information">查看详情</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>

  import get from '../services/get';
  import { NavBar  } from 'vant';
  import serverConfig from '../configs/serverConfig';
  let { genQueryString, getQueryStringArgsAes,formatTime } = serverConfig;

  export default {
    components: {
      [NavBar.name]:NavBar,
    },
    data () {
      
      return {
        orderList:[],

      }
    },
    async created(){

      let get_order_list = await get.get_order_list();
      if(get_order_list && get_order_list.data){
        get_order_list.data.map(e=>{
          e.formatTime = formatTime(new Date(e.time));
          return e;
        })
        this.orderList = get_order_list.data;

      }
    
    },

    methods:{
      onClickLeft(){
        this.$router.back();
      },
      toOrderDetail(item){
        let { ord_id,formatTime } = item;
        console.log(item)
        let url = genQueryString('/mine/myorderdetail',{orderid:ord_id,formatOrderTime:formatTime})
        this.$router.push(url);

      }
    }
  }
</script>


<style lang='less' scope>
.van-nav-bar .van-icon{
  color: #fff
}
 
 .myorder{
   .orderList{
     margin-top:10px;
     margin-bottom:20px;
     .orderListItem{
        display: flex;
        background: #fff;
        padding:14px ;
        justify-content: space-between;
        align-items: center;
        margin-top:4px;
        color: #393939;
       .orderInfo{
         text-align: left;
          .orderid{
            font-size: 12px;
            font-weight: bold;
          }
          .time{
            font-size: 12px;
            color: #929292;
            margin-top: 5px;
          }
       }
       .information{
         color: #b6271d;
       }
     }
   }
 }

 
</style>


