
<template>
  <div class="page has-navbar" style="transition:none !important">
    <van-nav-bar title="我的口红" fixed border left-arrow @click-left="onClickLeft">
      <!-- <span slot="right" class="add-address-btn" @click="switchAll()">{{ allSwitch?'全不选':'全选' }}</span> -->
    </van-nav-bar>
    <div class="page-content text-center">
      <div class="myredpacket">
        <div class="myMoney">
          <div class="title">红包可提现金额（元）</div>
          <div class="num">{{user.money}}</div>
        </div>
        <div class="myAllMoney">
          <div class="title">红包总收益（元）</div>
          <div class="num">{{user.all_money}}</div>
        </div>

        <div class="redpacketbills">
          <div class="redpacketbills-l">
            <i class="icon"/>
            <span>红包账单</span>
          </div>
          <i class="redpacketbills-r"></i>
        </div>

        <div class="tx_method">
          <div class="alipay">
            <div class="alipay-l">
              <i class="icon-alipay"></i>
              <div class="alipay-con">
                <span class="alipay-title">提现到支付宝（推荐）</span>
                <span class="alipay-tips">每笔提现最低1元</span>
              </div>
            </div>
            <div class="alipay-r">点击领取 ></div>
          </div>
        </div>

        <div class="term">
          <i class="icon-term"></i>
          <span class="term-con">我已阅读并同意
            <span class="term-con-span">服务条款</span>
          </span>
        </div>

        <div class="activity-tips">红包提现截止期限为活动截止后7天，请中奖者在前述期限内完成红包金额提现，逾期红包将自动清零，无法再进行提现。</div>

        <div class="questions">常见问题</div>
      </div>
    </div>
  </div>
</template>
<script>
import HttpGet from "../services/get";
import { NavBar, Toast, PullRefresh, Loading } from "vant";
import serverConfig from "../configs/serverConfig";
let { genQueryString, getQueryStringArgsAes } = serverConfig;
import wechat from "../configs/wechat";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [PullRefresh.name]: PullRefresh,
    [Loading.name]: Loading
  },
  data() {
    return {
      user:{}
    };
  },
  async created() {
    this.user = wechat.getUserData();
  },

  methods: {
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>


<style lang='less' scope>
.myredpacket{
  .myMoney{
    color: #ad291a;
    padding: 19px 0 ;

    .title{
      padding-bottom: 19px;
    }
    .num{
      font-size: 36px;
    }
  }
  .myAllMoney{
    background:#e9e9e9;
    font-size: 12px;
    padding: 12px 0 ;

    color: #ad291a;
    .title{
      padding-bottom: 10px;
    }
    .num{
      font-size: 22px;

    }    
  }
  .redpacketbills{
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    padding: 12px 18px ;
    .redpacketbills-l{
      display: flex;
      flex-direction: row;
      .icon{
          background:url('../../static/image/web/redpacketbills-icon.png') center no-repeat;
          background-size:contain;
          width:20px;
          height:20px;
          display: block;
      }
      span{
        margin-left: 43px;
        color: #8f8f8f;
        font-size: 16px;
      }
    }
    .redpacketbills-r{
          width:11px;
          height:19px;
          display: block;
          background:url('../../static/image/web/arrow-right.png') center no-repeat;
          background-size:contain; 
    }
  }
  .tx_method{
    margin-top:6px;
    background: #fff;

    .alipay{
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .alipay-l{
        display:flex;
        flex-direction: row;
        align-items: center;

        .icon-alipay{
          width:24px;
          height:24px;
          display: block;
          background:url('../../static/image/web/alipay.png') center no-repeat;
          background-size:contain; 
          margin-right: 11px;
        }
        .alipay-con{
            display:flex;
            flex-direction: column;
            text-align: left;
            .alipay-title{
              font-size: 16px;
            }
            .alipay-tips{
              font-size: 12px;
              color:#6d6d6d;
            }

          }
      }
      .alipay-r{

      }
    }
  }
  .term{
    .icon-term{

    }
    .term-con{
      .term-con-span{

      }
    }
  }
  .activity-tips{

  }
  .questions{

  }
}
</style>


