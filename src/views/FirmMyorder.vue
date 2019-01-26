
<template>
  <div class="page has-navbar"   style='transition:none !important'>
    <van-nav-bar
      title="确认订单"
      fixed
      border
      left-arrow
       @click-left="onClickLeft"
    />
    <div class="page-content text-center " >
      <div class='firmMyorder'>
        <div class="head-info">
          <div class="addr-info">
              <div class="addr-name">{{defaultAddr.name}}</div>
              <div class="addr-detail">{{defaultAddr.addr}}</div>
            </div>
          <div class="addr-tel">{{defaultAddr.tel}}</div>
        </div>

        <div class="goodList">
          <div class="goodListItem" v-for="(item,index) in goodList">
              <div class="goodImg"><img :src="item.img" alt="" width="100%" height="100%"></div>
              <div class="goodInfo">{{item.name}}</div>
              <div class="goodNum"><van-stepper v-model="item.changeTotal" :min="1" :max="item.total-item.change_num"/></div>
          </div>
        </div>

        <div class="mybag-btn" v-on:click="sendGood()">确认发货</div>


      </div>
    </div>
  </div>
</template>
<script>

  import get from '../services/get';
  import { NavBar,Stepper,Toast,Dialog    } from 'vant';
  import serverConfig from '../configs/serverConfig';
  let { genQueryString,getQueryStringArgsAes } = serverConfig;

  export default {
    components: {
      [NavBar.name]:NavBar,
      [Stepper.name]:Stepper,
      [Toast.name]:Toast,
      [Dialog.name]:Dialog,
    },
    data () {
      
      return {
        defaultAddr:{},
        goodList:[],

      }
    },
    async created(){
      let { sendGoodList } = getQueryStringArgsAes();
      if(!sendGoodList){
        this.$router.push('/');
        return;
      }
      sendGoodList.map(e=>{
        e.changeTotal = e.total;
        return e
      })

      this.goodList = sendGoodList;
      
      let get_default_addr = await get.get_default_addr();
      if(get_default_addr && get_default_addr.data){
        get_default_addr.data.addr = get_default_addr.data.addr.replace(/\/[0-9]*$/,'');
        this.defaultAddr = get_default_addr.data;
      }
      console.log(sendGoodList)

    },

    methods:{
      onClickLeft(){
        this.$router.back();
      },
      async sendGood(){
        let good_arr= [];
        let addrid = this.defaultAddr.addr_id;
        this.goodList.forEach(e => {
            good_arr.push({
              goodid:e.good_id,
              num:e.changeTotal,
            });
        });
        console.log(good_arr)
        Dialog.confirm({
          title: '',
          message: '确定发货吗？'
        }).then(async () => {
          // on confirm
          let wawa_to_user = await get.wawa_to_user({good_arr:JSON.stringify(good_arr),addrid,game_type:14})
          if(wawa_to_user && wawa_to_user.errcode == 0){
            Toast.success(`发货成功`);
          }else{
            Toast.fail(`发货失败`);
          }
          this.$router.back();
        }).catch(() => {
          Toast(`取消发货`);
          // on cancel
        });

        
      }
    }
  }
</script>


<style lang='less' scope>
.van-nav-bar .van-icon{
  color: #fff
}

.firmMyorder{
  .head-info{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 14px;
    background: #fff;
    position: fixed;
    top: 46px;
    z-index: 999;
    box-sizing: border-box;
    box-shadow: 0px 1px 2px #e4e0df;

    .addr-info{
      text-align: left;
      .addr-name{

      }
      .addr-detail{
        margin-top:4px;
        color: #7d7d7d;
        font-size: 12px;
      }
    }
    .addr-tel{

    }
  }

  .goodList{
    margin-top: 70px;
    margin-bottom: 60px;

    .goodListItem{
      display: flex;
      background: #fff;
      padding:14px ;
      justify-content: space-between;
      align-items: center;
      margin-top:4px;
      .goodImg{
        width: 44px;
        height: 44px;
        margin: 0 7px 0 0;
      }
      .goodInfo{
        max-width: 170px;
        text-align: left;
      }
      .goodNum{

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


