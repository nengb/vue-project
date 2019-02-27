
<template>
  <div
    class="page has-navbar"
    style="transition:none !important"
  >
    <van-nav-bar
      title="我的订单"
      fixed
      border
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="page-content text-center ">
      <div class="myorderdetail">
        <div
          class="postInfo"
          @click="toMypost()"
        >
          <div class="left">
            <i class="location-icon" />
            <div class="postBlock">
              <div
                class="postState"
                :style="postState"
              >
                {{ post.state?post.state:'未发货' }} <span v-show="post.state">
                  [点击查看物流]
                </span>
              </div>  
              <div class="time">
                {{ post.data && post.data[0]?post.data[0].ftime:'' }}
              </div>  
            </div>
          </div>
          <i class="arrow-right-icon" />
        </div>
        <div class="addrInfo">
          <i class="location-icon" />
          <div class="addr-info">
            <div class="name">
              收件人：{{ addrInfo.name }} <span>{{ addrInfo.tel }}</span>
            </div>
            <div class="address">
              收货地址{{ addrInfo.addr }}
            </div>
          </div>
        </div>

        <div class="goodList">
          <div
            v-for="(item,index) in orderInfo"
            :key="index"
            class="goodListItem"
          >
            <div class="left">
              <div class="goodImg">
                <img
                  :src="item.img"
                  alt=""
                  width="100%"
                  height="100%"
                >
              </div>
              <div class="goodName">
                {{ item.name }}
              </div>
            </div>
            <div class="goodNum">
              {{ item.num }}个
            </div>
          </div>
        </div>

        <div class="orderInfo">
          <div>订单编号：{{ addrInfo.ord_id }}</div>
          <div>订单时间：{{ addrInfo.formatOrderTime }}</div>
          <div>发货时间：{{ addrInfo.formatTime }}</div>
        </div>

        <div class="postExplain" />
      </div>
    </div>
  </div>
</template>
<script>

  import HttpGet from '../services/get';
  import { NavBar, Toast  } from 'vant';
  import serverConfig from '../configs/serverConfig';
  let { genQueryString, getQueryStringArgsAes,formatTime } = serverConfig;

  export default {
    components: {
      [NavBar.name]:NavBar,
      [Toast.name]:Toast,
    },
    data () {
      
      return {
        addrInfo:{},
        orderInfo:{},
        postInfo:{},
        post:{},
        postState:{
          color:'#f78256',
        }


      }
    },
    async created(){

      let { orderid,formatOrderTime } = getQueryStringArgsAes()
      if(orderid){
        let get_order_by_id =  await HttpGet.get_order_by_id({orderid});
        if(get_order_by_id && get_order_by_id.data){
          this.orderInfo = get_order_by_id.data.goods;
          get_order_by_id.data.info.formatTime = get_order_by_id.data.info.time?formatTime(new Date(get_order_by_id.data.info.time)):'暂无发货时间';
          get_order_by_id.data.info.formatOrderTime = formatOrderTime;
          get_order_by_id.data.info.addr = get_order_by_id.data.info.addr.replace(/\/[0-9]*$/,'');

          this.addrInfo = get_order_by_id.data.info;
          this.postInfo = get_order_by_id.data.post;
          if(this.postInfo && this.postInfo.ord_id){
            let get_post_info = await HttpGet.get_post_info({orderid:this.postInfo.ord_id})
            if(get_post_info && get_post_info.data){
              this.post = get_post_info;
              if(get_post_info.state == '已签收'){
                this.$set(this.postState,'color','#87b869');
              }
            }
          }
          return;
        }
      }

      this.$router.push('/');
    
    },

    methods:{
      onClickLeft(){
        this.$router.back();
      },
      toMypost(){
        if(this.post && this.postInfo && this.postInfo.ord_id && this.post.state){
          let url = genQueryString('/mine/mypost',{orderid:this.postInfo.ord_id,post:this.post,addr:this.addrInfo.addr})
          this.$router.push(url);
        }else{
          Toast('暂时物流信息');
        }
      }
    }
  }
</script>


<style lang='less' scope>
.van-nav-bar .van-icon{
  color: #fff
}
 
 .myorderdetail{
  
   .postInfo{
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:14px;
            position: relative;

      .left{
        display: flex;
        align-items: center;
        .postBlock{
          text-align: left;
          .postState{
            span{
              position: absolute;
              top: 20px;
              right: 30px;
              color:#f78256;
            }
          } 
          .time{
            font-size: 12px;
            color: #929292;
            margin-top: 5px;
          }
        }

      }
      .location-icon{
          display: block;
          width:23.5px;
          height:17px;
          background:url('../../static/image/web/express.png') center no-repeat ;
          background-size:contain;
      }
      div{
        margin-left: 8px;
        color: #87b869;
      }
      .arrow-right-icon{
        display: block;
        width:9px;
        height:14.5px;
        background:url('../../static/image/web/ordertail-arrow-right.png') center no-repeat ;
        background-size:contain;

      }
   }
   .addrInfo{
      margin: 1px 0;
      background: #fff;
      display: flex;
      align-items: center;
      padding:14px;
      color: #929292;
     .location-icon{
        display: block;
        width:15.5px;
        height:20px;
        background:url('../../static/image/web/address.png') center no-repeat ;
        background-size:contain;
     }
     .addr-info{
        text-align: left;
        margin-left: 10px;
        width: 310px;
       .name{
         display: flex;
         justify-content: space-between;
         margin-bottom: 5px;
         span{

         }
       }
       .address{

       }
     }
   }
   .goodList{
     margin-top:10px;
     .goodListItem{
        display: flex;
        background: #fff;
        padding:14px ;
        justify-content: space-between;
        align-items: center;
        margin-top:4px;
        .left{
          display: flex;
          align-items: center;
        }
       .goodImg{
        width: 44px;
        height: 44px;
        margin: 0 7px 0 0;
       }
       .goodName{

       }
       .goodNum{
         color: #b6b6b6;
       }
     }
   }
   .orderInfo{
      background: #fff;
      color: #7f7f7f;
      text-align: left;
      padding: 14px;
      margin-top: 14px;
      line-height: 24px;
      div{

      }
   }

   .postExplain{

   }
   
 }


 
</style>


