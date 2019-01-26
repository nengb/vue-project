
<template>
  <div class="page has-navbar"   style='transition:none !important'>
    <van-nav-bar
      title="查看物流"
      fixed
      border
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="page-content text-center " >
        <div class="mypost">
            <div class="orderInfo">
                <div class="info">
                    <div>订单号：{{orderid}}</div>
                    <div>{{post.com}}：{{post.num}}</div>
                </div>
                <div class="state">{{post.state}}</div>
            </div>

            <div class="postInfo">
              <div class="addr">
                <i></i>
                <span>[收货地址]{{addr}}</span>
              </div>

              <div class="postList">
                  <div class="postListItem" v-for="(item,index) in  post.data">
                      <div class="time" :style="{color:post.state == '已签收' && index== 0 && '#eb8e3e'}">
                        <div class="y-M-D">{{item.ftime.split(' ')[0]}}</div>
                        <div class="H-M-S">{{item.ftime.split(' ')[1]}}</div>
                      </div>
                      <div class="info" :style="{color:post.state == '已签收' && index== 0 && '#eb8e3e'}"><i :class="{signIcon:(post.state == '已签收' && index== 0)}"></i>{{item.context}}</div>
                  </div>

              </div>

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
        orderid:'',
        post:{},
        addr:'',
        signImgIcon:'../../static/image/web/signState.png',

      }
    },
    async created(){

      let { orderid, post,addr } = getQueryStringArgsAes()
      if( orderid && post){

        this.orderid = orderid;
     
        this.post = post;
        this.addr = addr;

      }else{
        this.$router.push('/');
      }

    
    },

    methods:{
      onClickLeft(){
        this.$router.back();
      },
      toOrderDetail(){
        
      }
    }
  }
</script>


<style lang='less' scope>
.van-nav-bar .van-icon{
  color: #fff
}
 
.mypost{
  .orderInfo{
    margin: 19px 0 11px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:  15px;
    .info{
      text-align: left;
      color: #676767;
      line-height: 26px;
    }
    .state{
      color:#fd9058;
    }
  }

  .postInfo{
    background: #fff;
    padding: 35px 12px;
    .addr{
      display: flex;
      align-items: center;
      justify-content:center;
      i{
        display: block;
        width: 12px;
        height: 14px;
        background:url('../../static/image/web/post-address.png') center no-repeat ;
        background-size:contain;
      }
      span{
        margin-left: 14px;
        color: #eb8e3e;
      }
    }
    .postList{
      margin-top: 30px;
      .postListItem{
        color: #989898;
        display: flex;
        .time{
          width: 90px;
          text-align: right;
          box-sizing: border-box;
          padding-right: 20px;
          .y-M-D{
            font-size: 12px;
          }
          .H-M-S{
            font-size: 10px;
          }
        }
       
        .info{
          width: 272px;
          border-left: 1px solid #efefef;
          padding-bottom: 50px;
          position: relative;  
          font-size: 12px;  
          padding-left:22px;
          text-align: left;
          box-sizing: border-box;  
          i{
            position: absolute;
            top: 3px;
            left: -6.5px;
            display: block;
            width: 13px;
            height: 13px;
            background:url('../../static/image/web/postState.png') center no-repeat ;
            background-size:contain;
          }

          .signIcon{
            background:url('../../static/image/web/signState.png') center no-repeat ;
            background-size:contain;
            width: 15px;
            height: 15px;
            left: -7.5px;


          }



        }
      }
    }
  }

}

 
</style>


