
<template>
  <div
    class="page has-navbar"
    style="transition:none !important"
  >
    <van-nav-bar
      title="联系客服"
      fixed
      border
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="page-content text-center ">
      <div class="customer">
        <div class="content">
          <van-field
            v-model="message"
            type="textarea"
            placeholder="请将你遇到的问题产品建议反馈给我们，建议你描述清楚，时间，哪个房间，尽可能详细的问题描述便于运营的童鞋帮你解决（200字以内）"
            rows="1"
            :autosize="autosize"
            maxlength="200"
          />
        </div>
        <div
          class="sendBtn"
          @click="sendCustomerMsg"
        >
          发送
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import HttpGet from '../services/get';
  import { NavBar, Field, Toast   } from 'vant';
  

  export default {
    components: {
      [NavBar.name]:NavBar,
      [Field.name]:Field,
      [Toast.name]:Toast,
      
    },
    data () {
      
      return {
        navArr:[],
        goodList:[],
        autosize : {
          minHeight:146
        },
        message:'',
        lastSendMsgTime:0,

      }
    },
    async created(){

    
    },

    methods:{
      onClickLeft(){
        this.$router.back();
      },
      checkMsg(){
        if (this.lastSendMsgTime != 0 && Date.now() - this.lastSendMsgTime <= 5000 ){
          Toast('发送频率过快');
          return false;
        }

        if(this.message.length == 0){
          Toast('请输入要反馈的内容！');
          return false;
        }

        return true;
    
      },
      async sendCustomerMsg(){
        // console.log(this.message)
        if(this.checkMsg()){
          let sysInfo = navigator;
          let u = navigator.userAgent;  
          let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
          // console.log(sysInfo)
          
          let op = isAndroid? 0 : 1;
          let mac_no = navigator.appVersion;
          let msg = this.message;
          let version = window.version;
          // console.log(version)


          let add_suggest = await HttpGet.add_suggest({ op,mac_no,msg,version })
          if(add_suggest && add_suggest.errcode == 0){
            Toast('发送成功');
            this.message = '';  
            this.lastSendMsgTime = Date.now();
          }else{
            Toast('发送失败');
          }

        }
      }
      

    }
  }
</script>


<style lang='less' scope>
.van-nav-bar .van-icon{
  color: #fff
}

.customer{
  .content{
    margin: 13px 12px;
    overflow: hidden;
    border-radius: 10px;
  }
  .sendBtn{
    background:url('../../static/image/web/mybag-btn.png') center no-repeat;
    background-size: cover;
    width: 96%;
    height: 40px;
    line-height: 40px;
    position: fixed;
    left: 50%;
    margin-left: -48%;
    border-radius: 40px;
    bottom: 14px;
    color: #fff;
    font-size: 16px;
  }
}

 
</style>


