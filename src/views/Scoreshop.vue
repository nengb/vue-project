
<template>
  <div
    class="page has-navbar"
    style="transition:none !important"
  >
    <van-nav-bar
      title="积分商城"
      fixed
      border
    />
    <div class="page-content text-center ">
      <div class="scoreshop">
        <div class="head-info">
          <div
            class="head-info-block"
            @click="toMyScore()"
          >
            <i class="score-s" />
            <span class="text">
              积分
            </span>
            <span class="num">
              {{ user.score }}
            </span>
          </div>
          <div
            class="head-info-block"
            @click="toMyScoreToGood()"
          >
            <i class="record-s" />
            <span class="text">
              兑换记录
            </span>
          </div>
        </div>

        <div class="myMenu">
          <div class="content">
            <van-tabs 
              v-model="active" 
              swipeable
              animated
              sticky
                  
              @change="vTabsChange"
            >
              <van-tab
                v-for="(item, index) in navArr"
                :key="index"
                :title="item.name"
              >
                <van-pull-refresh
                  v-model="isLoading"
                  @refresh="onRefresh(index)"
                >
                  <van-list
                    v-show="index == active"
                    v-model="loading"
                    :finished="finished"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                    finished-text="没有更多了"
                    @load="loadMoreData"
                  >
                    <div class="classItemList">
                      <div
                        v-for="(classItem, classIndex) in classData[item.good_class_id]"
                        :key="classIndex"
                        class="classItem"
                        :style="animationObj(classIndex)"
                        @click="changeBuyGoodIndex(classIndex)"
                      >
                        <div class="classItem-img">
                          <img
                            width="100%"
                            height="100%"
                            alt=""
                            v-lazy="classItem.img"
                            
                          >
                        </div>
                        <div class="name">
                          {{ classItem.name }}
                        </div>
                        <div class="price">
                          {{ classItem.score }}<span>积分</span>
                        </div>
                      </div>
                      <div
                        v-for="key in classItemRes"
                        class="classItemRes"
                      />
                    </div>
                  </van-list>
                </van-pull-refresh>
              </van-tab>
            </van-tabs>
          </div>
        </div>

        <van-popup
          v-model="showBuyGood" 
          :close-on-click-overlay="true" 
        >
          <div
            v-if="showBuyGood"
            class="buyGood"
          >
            <i
              class="close"
              @click="changeShowBuyGood"
            />
            <div class="buyGood-img">
              <div>
                <img
                  alt=""
                  height="100%"
                  v-lazy="classData[navArr[active].good_class_id][buyGoodIndex].img"
                  
                >
              </div>
            </div>
            <div class="buyGood-name">
              {{ classData[navArr[active].good_class_id][buyGoodIndex].name }}
            </div>
            <div class="con">
              <div
                class="con-bolck"
                @click="toMyAddr"
              >
                <span>地址</span> 
                <div style="color:#929292;max-width:220px;">
                  {{ defaultAddr.addr }}
                </div>
              </div>
              <div class="con-bolck">
                <span>购买数量</span> 
                <van-stepper
                  v-model="buyNum"
                  integer
                  :min="1"
                  :max="100"
                /> 
              </div>
              <div class="con-bolck">
                <span>型号</span> 
                <div>{{ classData[navArr[active].good_class_id][buyGoodIndex].spec }}</div>
              </div>
              <div class="con-bolck">
                <span>兑换所需积分</span> 
                <div>
                  <span class="price">
                    {{ buyNum*classData[navArr[active].good_class_id][buyGoodIndex].score }}
                  </span>积分
                </div> 
              </div>
            </div>
            <div
              class="buy"
              @click="buyGood(classData[navArr[active].good_class_id][buyGoodIndex])"
            >
              立即兑换
            </div>
          </div>
        </van-popup>


     

        <MyTabbar :active="1" />
      </div>
    </div>
  </div>
</template>
<script>

  import HttpGet from '../services/get';
  import { setInterval } from 'timers';
  import MyTabbar from '@/components/Tabbar.vue'
  import { Tab, Tabs, NavBar, Loading,List, PullRefresh, Popup, Stepper, Toast   } from 'vant';
  
  import wechat from '../configs/wechat';



  export default {
    components: {
      MyTabbar,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs,
      [NavBar.name]:NavBar,
      [Loading.name]:Loading,
      [List.name]:List,
      [PullRefresh.name]:PullRefresh,
      [Popup.name]:Popup,
      [Stepper.name]:Stepper,
      [Toast.name]:Toast,
    },
    data () {
      
      return {

        user:{},

        classItemRes:[0,0],
        navArr:[],
        classData:{},
        active:0,
        loading: false,
        finished: false,
        isLoading:false,
        buyGoodIndex:0,    
        buyNum:1,       
        showBuyGood:false,
        showRecords:false,
        showProtocol:false,
        showPrize:false,
        error:false,
        animationObj:(index)=>{
          return {
            animation:`show 0.5s ${index%9/10}s forwards`
          }
        },

        defaultAddr:{},



      }
    },
    async created(){
      
      this.user = wechat.getUserData();
      
      

      let getScoreIndex = await HttpGet.get_score_index();

      if(
        getScoreIndex && 
        getScoreIndex.data && 
        getScoreIndex.data.navList && 
        getScoreIndex.data.navList.length>0
      ){
        this.navArr = getScoreIndex.data.navList;
        let getScoreStore = await HttpGet.get_score_store();
        this.goodList = getScoreStore.data;
      }


      let getIndexData = await HttpGet.get_score_index();
      if( 
        getIndexData && 
        getIndexData.data && 
        getIndexData.data.navList && 
        getIndexData.data.navList.length>0){

        this.navArr = getIndexData.data.navList;
        //请求所有分类数据
        this.navArr.forEach( (e,i) => {
            let  { score_class_id } = e;
            this.navArr[i].good_class_id = score_class_id;
            this.initData(score_class_id,i);
            this.$set(this.navArr[i],'reflushLoading',false);
        });

      }

      let get_default_addr = await HttpGet.get_default_addr();
      if(get_default_addr && get_default_addr.data){
        get_default_addr.data.addr = get_default_addr.data.addr.replace(/\/[0-9]*$/,'');
        this.defaultAddr = get_default_addr.data;
      }




    
    },

    methods:{
      menuClicked(menuIndex) {
      },
      

      async getClassGoodsList(score_class_id){
        
        let goodList = score_class_id == -1? await HttpGet.get_score_store():await HttpGet.get_score_classroom({score_class_id})
        if(goodList && goodList.data ){
          this.goodList = goodList.data;
        }
      },
      toMyScore(){
        this.$router.push('/mine/myscore')
      },
      toMyScoreToGood(){
        this.$router.push('/mine/score_to_good')
      },

      vTabsChange(index,title){
           let { good_class_id } = this.navArr[this.active];
         if(this.classData[good_class_id] && this.classData[good_class_id][0].finished){
             this.finished = true;
           }else{
             this.finished = false;
           }
       },
       async initData(good_class_id,navArrId,state){
          if(!state && (this.classData[good_class_id] && this.classData[good_class_id][0].page > 1 )){
            return;
          }
            //初始化页面数据
            let page = 1;
            let classData = await HttpGet.get_score_classroom({score_class_id:good_class_id,page})
            if (classData && classData.data && classData.data.length>0){
              classData.data[0].page = page;
              classData.data[0].pageSize = classData.data.length;
              this.$set(this.classData,good_class_id,classData.data)
            }
            else if(classData &&classData.data &&classData.data.length == 0){
              //  this.$set(this.classData,good_class_id,[{
              //   page,
              //   finished:true,
              // }])
              this.finished = true;
           }else{

             this.error = true;
           }
            
       },
        //加载更多数据
       async loadMoreData(e){
          
           let { score_class_id:good_class_id } = this.navArr[this.active];
           await this.initData(good_class_id,this.active);
           if(!this.classData[good_class_id]){
              this.loading = false;
             return;
           }
           if(this.classData[good_class_id][0].finished){
             this.finished = true;
             return;
           }else{
             this.finished = false;
           }
      
           let page = this.classData[good_class_id][0].page;
           page++;
         
           let classData = await HttpGet.get_score_classroom({score_class_id:good_class_id,page})
           if (classData && classData.data && classData.data.length>0){
            this.classData[good_class_id][0].page++;
            this.classData[good_class_id] = this.classData[good_class_id].slice(0,(page-1)*this.classData[good_class_id][0].pageSize).concat(classData.data)
           }else if(classData &&classData.data &&classData.data.length == 0){
             this.$set(this.classData[good_class_id][0],'finished',true)
             if(this.classData[good_class_id] && this.classData[good_class_id][0] &&this.classData[good_class_id][0].page >2){
               Toast('我是有底线的~')
             }
             this.finished = true;
           }else{
             this.error = true;
           }
       
           this.loading = false;

       },
       async onRefresh(index){
         setTimeout(async () => {
          let { good_class_id } = this.navArr[index];
          this.classData[good_class_id] = null;
          // this.$set(this.classData,good_class_id,null);
          this.finished = false;
          await this.initData(good_class_id,index,true);
          this.$set(this.navArr[index],"reflushLoading",false);
          this.isLoading = false;
         },500)
          // this.reloadList();
       },
       changeShowBuyGood(){
         this.showBuyGood = !this.showBuyGood;
         this.buyNum = 1;

       },
       changeBuyGoodIndex(classIndex){
          this.buyGoodIndex = classIndex;
          this.showBuyGood = true;
       },
       async buyGood(obj){
         let score_to_gift = await HttpGet.score_to_gift({
           gift_id:obj.good_id,
           addrid:this.defaultAddr.addr_id,
           num:this.buyNum
         })

         if(score_to_gift && score_to_gift.errcode == 0){
           this.showBuyGood = !this.showBuyGood;
           Toast('兑换成功,订单已生成，礼品很快送到你手中哟！')
           await wechat.reloadUserData();
           this.user = wechat.getUserData();
         }else{
           Toast('兑换失败')
         }


       },
       toMyAddr(){
         this.$router.push('/mine/myaddress')
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
.scoreshop{
  // margin-top:44px; 

  

  .head-info{
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding: 10px 0;
    position: fixed;
    width: 100%;
    top: 46px;
    z-index: 999;
    border-bottom: 1px solid #f2f2f2; 
    .head-info-block:last-child{
      border-right: 0;
    }
    .head-info-block{

      width: 50%;
       display: flex;
      justify-content: center;
      align-items: center;
      border-right: 2.5px solid #d7d7d7;
      .score-s{
        background: url('../../static/image/web/score-s.png') center no-repeat;
        background-size: contain;

      }
      .record-s{
        background: url('../../static/image/web/record-s.png') center no-repeat;
        background-size: contain;

      }
      i{
        width:13.5px;
        height:15.5px;
        display: block;
      }
      .text{
        margin: 0 15px 0 8px;
      }
      .num{
        color: #ff460d;
      }
    }
  }

  .myMenu{
    margin: 90px auto;
    width: 100%;
    .content{
        .van-tab{
          color:#4b4b4b;
        }
        .van-tab--active{
          color: #ff5200;
        }
        .van-tab span{
          display: block;
          border-right: 1px solid #b1b1b1;
          height: 16px;
          line-height: 16px;
          margin-top: 15px;
        }
        .van-tabs--line{
          padding-top: 0;
        }
        .van-tabs__wrap{
          z-index: 1;
          position: fixed;
          top: 86px !important;
        }
        // .van-tabs__content--animated{
        //   overflow-x: hidden;
        //   overflow-y: scroll;
        // }

        .van-tab:last-child span{
          border-right: 0;
        }
        .classItemList{
            display: flex;
            // justify-content:center ;
            flex-wrap:wrap;
            justify-content: space-around;
            .classItem{
              transform: scale(0);
              width: 30%;

              height:165px;
              margin: 5px;
              background: #fff;
              border-radius: 8px;
              overflow: hidden;
              position: relative;
              box-shadow: 0px 1px 2px #e4e0df;
              .classItem-img{
                width: 100%;
                height: 100px;
                div{

                }
              }
              .name{

                font-size: 12px;
                padding:0 8px;
                height: 30px;
                overflow:hidden;
                text-overflow:ellipsis;
                // white-space:nowrap;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                text-align: left;

              }
              .price{
                position: absolute;
                bottom:6px;
                left: 8px;
                font-size:14px;
                color: #fa7100;
                span{
                  margin-left: 10px;
                  color:#000;
                  font-size: 10px;
                } 
              }
            }
            img{
              // height:163px;
            }
            .classItemRes{
              width: 30%;
              margin: 5px;

            }

        }

    }
   
  }
  .van-popup{
    border-radius: 10px;
    overflow: hidden;
  }

  .close{
      width: 18px;
      height: 18px;
      background:url('../../static/image/web/close.png') center no-repeat;
      background-size:contain;
      position: absolute;
      top:10px;
      right:10px;
      display: block;
      z-index: 999;


  }
  .buyGood{
    position: relative;
    
    background: #fff;
    position: relative;
    width: 260px;
    padding: 8px 18px;
    color: #363636;
    text-align: left;

    .buyGood-img{
      width: 100%;
      display: flex;
      justify-content: center;
      div{
        height: 161px;
        margin: 0 auto;
      }
    }
    .buyGood-name{
      border-top:1px solid #dedede;
      border-bottom:1px solid #dedede;
      font-size: 12px;
      padding:5px 0;
      min-height: 46px;
    }
    .con{
      .con-bolck{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        .price{
          color: #ff4a00;
          font-size: 18px;
          margin-right: 10px;
          i{
            font-size: 12px;
          }
        }
      }
    }
    .buy{
      margin: 80px auto 10px;
      background:url('../../static/image/web/buy-btn.png') center no-repeat ;
      background-size:contain;
      width: 235px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      color: #fff;
    }
  }

 

}
 
</style>


