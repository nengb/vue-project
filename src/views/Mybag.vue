
<template>
  <div class="page has-navbar"   style='transition:none !important'>
    <van-nav-bar
      title="我的背包"
      fixed
      border
      left-arrow
       @click-left="onClickLeft"
    >
    <span class="add-address-btn" slot="right" v-on:click="switchAll()">{{allSwitch?'全不选':'全选'}}</span>
    </van-nav-bar>
    <div class="page-content text-center " >
      <div class='mybag'>
        <div class="head-info">
          <div class="user-info">
            <div class="user-img"> <img src="http://h5.wjwlddz.com:9001/image?url=http%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FQ0j4TwGTfTIowbz5xxVOJdbK5QqOHQ9ia4VCro19twhPiby3mECL0ib23iaVP8cicKOz2EEYuf34sss4ZYHjzg0J6ibA%2F132.jpg" alt="" width="100%" height="100%"> </div>
            <div class="user-name"> 能 </div>
          </div>
          <div class="user-score">
            我的积分:0
          </div>
        </div>

         <van-pull-refresh v-model="isLoading" @refresh="onRefresh" pulling-text=" " loosing-text = ' ' loading-text=' '>
          <div class="shopList">
            <div class="shopListItem" v-for="(item,index) in shopList"  v-on:click="changeSwitch(item)">
              <div class="switch-icon"><img :src="item.switchState?require('../../static/image/web/switch1-active.png'):require('../../static/image/web/switch1.png')" alt=""  width="100%" height="100%"></div>
              <div class="shopImg"><img :src="item.img" alt="" width="100%" height="100%"></div>
              <div class="shopInfo">
                  <div class="shopName">{{item.name}}</div>
                  <div class="shopChangeScore">{{item.change_score}}积分x1</div>
              </div>
              <div class="shopNum">
                <div class="num">x{{item.total-item.change_num}}</div>
                <div class="allScore">总：{{(item.total-item.change_num)*item.change_score}}分</div>
              </div>
            </div>
          </div>
          </van-pull-refresh>

        <div class="mybag-btn" v-on:click="sendGood()">发货</div>

      </div>
    </div>
  </div>
</template>
<script>

  import get from '../services/get';
  import { NavBar, Toast, PullRefresh  } from 'vant';
  import serverConfig from '../configs/serverConfig';
  let { genQueryString, getQueryStringArgsAes } = serverConfig;

  export default {
    components: {
      [NavBar.name]:NavBar,
      [Toast.name]:Toast,
      [PullRefresh.name]:PullRefresh,
    },
    data () {
      
      return {
        shopList:[],
        allSwitch:false,
        isLoading:false,
      }
    },
    async created(){
      let get_my_wawa = await get.get_my_wawa({game_type:14});
      if(get_my_wawa && get_my_wawa.data){
        this.shopList = get_my_wawa.data;
      }
    
    },

    methods:{
      onClickLeft(){
        this.$router.back();
      },
      changeSwitch(item){
        this.$set(item, "switchState", !item.switchState )
      },
      switchAll(){
        this.allSwitch = !this.allSwitch;
        this.shopList.forEach(e=>{
          this.$set(e, "switchState", this.allSwitch )
        })
      },
      sendGood(){
        let sendGoodList = [];
        this.shopList.forEach(e=>{
          if(e.switchState){
            sendGoodList.push(e)
          }
        })
        if(sendGoodList.length ==0){
          Toast('请选择要发货的商品');
          return;
        }

        let url = genQueryString('/mine/firmmyorder',{sendGoodList})
        this.$router.push(url);
      },
      onRefresh(){
        setTimeout(()=>{
          this.isLoading = false;

        },10)
      }
    }
  }
</script>


<style lang='less' scope>
.van-nav-bar .van-icon{
  color: #fff
}
 
.mybag{
  margin-top: 46px;
  .head-info{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px;
    background: #fff;
    position: fixed;
    top: 46px;
    z-index: 999;
    box-sizing: border-box;
    box-shadow: 0px 1px 2px #e4e0df;

    .user-info{
      display: flex;
      align-items: center;
      .user-img{
        width:33px;
        height:33px;
        border-radius: 50%;
        overflow: hidden;
      }
      .user-name{
        margin-left: 13px;
      }
    }
    .user-score{
      color: #c51601;
    }
  }

  .shopList{
    margin-top: 20px;
    margin-bottom: 60px;
    .shopListItem{
      background: #fff;
      display: flex;
      align-items: center;
      padding: 14px;
      margin-top: 4px;
      position: relative;

      .switch-icon{
        width: 15.5px;
        height: 15.5px;
        margin-left: 7px;
      }
      .shopImg{
        width: 44px;
        height: 44px;
        margin: 0 7px 0 11px;
      }
      .shopInfo{
        text-align: left;
        max-width: 162px;
        font-size: 12px;
        .shopName{
        }
        .shopChangeScore{
          color: #929292;

        }
      }
      .shopNum{
        text-align: right;
        position: absolute;
        top: 14px;
        right: 14px;
        color: #929292;
        .num{
        }
        .allScore{
          margin-top:18px;
          
        }
      }
    }
  }

  .mybag-btn{
    background:url('../../static/image/web/mybag-btn.png') center no-repeat;
    background-size: cover;
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    color: #fff;
    font-size: 16px;
  }


}
 
</style>


