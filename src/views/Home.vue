
<template>
  <div
    class="page"
    style="transition:none !important"
  >
    <van-nav-bar
      title="首页"
      fixed
      border
    />
    <div class="page-content text-center ">
      <div class="index">
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
                          <span>￥</span>{{ classItem.sale_price }}
                        </div>
                      </div>
                      <div
                        v-for="(key) in classItemRes"
                        class="classItemRes"
                      ></div>
                    </div>
                  </van-list>
                </van-pull-refresh>
              </van-tab>
            </van-tabs>
          </div>
        </div>

        <div class="rightMenu">
          <div
            class="menu-block"
            @click="changeShowRecords"
          >
            <div>抽<br>奖<br>记<br>录</div>
          </div>
          <div
            class="menu-block"
            @click="changeShowProtocol"
          >
            <div>协<br>议</div>
          </div>
          <div
            class="menu-block"
            @click="changeShowPrize"
          >
            <div>奖<br>品</div>
          </div>
        </div>

        <div class="bottomMenu">
          <div @click="buyGoodRandom(1)">
            单买
          </div>
          <div @click="buyGoodRandom(5)">
            买5个
          </div>
          <div @click="buyGoodRandom(10)">
            买10个
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
                <span>价格</span> 
                <div>
                  合计: <span class="price">
                    <i>￥</i>{{ buyNum*classData[navArr[active].good_class_id][buyGoodIndex].sale_price }}
                  </span>
                </div> 
              </div>
            </div>
            <div class="buy">
              购买
            </div>
          </div>
        </van-popup>

        <div class="mySwipe">
          <van-popup
            v-model="showSwipe" 
            :close-on-click-overlay="false"
          >
            <div
              class="swipe" 
              :style="{left:swipeX+'px',width:(swipeShowLength+1)*300+'px',transition:transition+'s'}"
              @touchstart="swipeMouseDown" 
              @touchmove="swipeMouseMove" 
              @touchend="updateSwipePosition"
            >
              <div
                v-for="(item,index) in swipeList"
                v-if="index<=swipeShowLength"
                class="swipeItem"
                :class="{bigSwipeItem:index==swipeIndex}"
              >
                <div
                  v-if="index%2==1"
                  class="swipeItemHead"
                />
                <div class="swipeItemNum">
                  {{ index+1 }}
                </div>
                <div class="swipeItemImg">
                  <div
                    v-if="index%2==1"
                    class="swipeItemIcon"
                  >
                    赠品
                  </div>
                  <div>
                    <img
                      width="100%"
                      height="100%"
                      alt=""
                      v-lazy="item.img"

                    >
                  </div>
                </div> 
              </div>
            </div>
            <div
              v-if="swipeList[swipeIndex]"
              class="swipeItemName"
            >
              {{ swipeList[swipeIndex].name }}</br>{{ swipeList[swipeIndex].spec }}
            </div>
            <div
              v-if="swipeList.length>0"
              class="swipeItemBtn"
              @click="showNextSwipe()"
            >
              {{ swipeShowLength == swipeList.length-1?"ok": swipeShowLength%2==1?'领取赠品':'下一个' }}
            </div>
                
            </van-swipe>
          </van-popup>
        </div>

        <van-popup
          v-model="showRecords" 
          :close-on-click-overlay="false" 
        >
          <div class="myrecords">
            <i
              class="close"
              @click="changeShowRecords"
            />
            <Records />
          </div>
        </van-popup>

        <van-popup
          v-model="showProtocol" 
          :close-on-click-overlay="true" 
        >
          <div class="protocol">
            用户协议
          </div>
        </van-popup>

        <van-popup
          v-model="showPrize" 
          :close-on-click-overlay="true" 
        >
          <div class="myprize">
            <i
              class="close"
              @click="changeShowPrize"
            />
            <div class="title">
              奖品明细
            </div>
            <Prize />
          </div>
        </van-popup>
        <!-- <div class="recordInfo">
      <p>Copyright &copy; 2002-2019 广州微锦网络科技有限公司 版权所有 备案号：<a href="http://www.miitbeian.gov.cn">粤ICP备16057126号</a> </p>
        </div> -->

        <MyTabbar :active="0" />

      </div>
      
    </div>
  </div>
</template>
<script>
  let { ip, httpAddress, socketAddress, imgAddress, getHrefNew,location,href,getHashSearch,loca_key,getQueryStringArgsAes,genQueryString } = serverConfig;

  import MyTabbar from '@/components/Tabbar.vue'
  import Records from '@/components/Records.vue'
  import Prize from '@/components/Prize.vue'
  import HttpGet from '../services/get';
  import { Tab, Tabs, NavBar, Loading,List, PullRefresh, Popup, Stepper, Toast ,Swipe, SwipeItem, NoticeBar   } from 'vant';
  import wechat from '../configs/wechat' 
  import md5 from 'crypto-js/md5';

  export default {
    components: {
      MyTabbar,
      Records,
      Prize,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs,
      [NavBar.name]:NavBar,
      [Loading.name]:Loading,
      [List.name]:List,
      [PullRefresh.name]:PullRefresh,
      [Popup.name]:Popup,
      [Stepper.name]:Stepper,
      [Toast.name]:Toast,
      [Swipe.name]:Swipe,
      [SwipeItem.name]:SwipeItem,
      [NoticeBar.name]:NoticeBar,
    },
    
    data () {
      
      return {
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
        showSwipe:false,
        swipeIndex:0,
        swipeList:[],
        swipeShowLength:0,
        error:false,

        
        animationObj:(index)=>{
          return {
            animation:`show 0.5s ${index%9/10}s forwards`
          }
        },
        defaultAddr:{},
        moveStartX:0,
        swipeX:(375-200)/2,
        transition:0,
        user:{},
        checkUser:null,
      
      }
    },
    async mounted(){


      let user = wechat.getUserData();
      if(!user){
        this.checkUser = setInterval(() => {
          let user = wechat.getUserData();
          if(user){
            this.initHomeData();
            clearInterval(this.checkUser);
          }
        }, 100);
      }
      
      this.updateSwipePosition();
      this.initHomeData();
      

    },

    methods:{
        async initHomeData(){
          console.log(21222)
          let getIndexData = await HttpGet.index({account:this.user.account});
          console.log(getIndexData)

          if( getIndexData && getIndexData.data ){
          console.log(123123)

            this.navArr = getIndexData.data.navArr;
            //请求所有分类数据
            this.navArr.forEach( (e,i) => {
                let  { good_class_id } = e;
                this.initData(good_class_id,i);
                this.$set(this.navArr[i],'reflushLoading',false);
            });

            let get_default_addr = await HttpGet.get_default_addr();
            if(get_default_addr && get_default_addr.data){
              get_default_addr.data.addr = get_default_addr.data.addr.replace(/\/[0-9]*$/,'');
              this.defaultAddr = get_default_addr.data;
            }
          }
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
            let classData = await HttpGet.get_classroom_data_h5({classid:good_class_id,page})
            if (classData && classData.data && classData.data.length>0){
              classData.data[0].page = page;
              classData.data[0].pageSize = classData.data.length;
              this.$set(this.classData,good_class_id,classData.data)
            }
            else if(classData && classData.errcode == 1){
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
          
            let { good_class_id } = this.navArr[this.active];
          //  console.log(`加载更多`)
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
          
            let classData = await HttpGet.get_classroom_data_h5({classid:good_class_id,page})
            if (classData && classData.data && classData.data.length>0){
            this.classData[good_class_id][0].page++;
            this.classData[good_class_id] = this.classData[good_class_id].slice(0,(page-1)*this.classData[good_class_id][0].pageSize).concat(classData.data)
            }else if(classData && classData.errcode == 1){
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

        changeShowRecords(){
          this.showRecords = !this.showRecords;
        },
        changeShowProtocol(){
          this.showProtocol = !this.showProtocol;
        },
        changeShowPrize(){
          this.showPrize = !this.showPrize;
        },
        changeShowBuyGood(){
          this.showBuyGood = !this.showBuyGood;
          this.buyNum = 1;
        },
        changeBuyGoodIndex(classIndex){
          this.buyGoodIndex = classIndex;
          this.showBuyGood = true;
        },
        toMyAddr(){
          this.$router.push('/mine/myaddress')
        },
        async buyGoodRandom(play_times){
        let key = 'egg%$Lottery!';
        let luckybag_id = 1;
        let sign = md5(`${luckybag_id}${play_times}${this.user.account}${key}`).toString()
        // let get_luckybag = await HttpGet.get_luckybag({
        //   apiService:'lottery',
        //   type:1,
        //   luckybag_id,
        //   play_times,
        //   sign
        // });
        // let get_luckybag = {"data":[{"name":"懒人手机支架","img":"http://www.wjwlzwawa.com/goodImg/1546686996132.jpeg","goodid":3129,"display_price":23,"spec":"玫瑰金"}],"giftData":[{"name":"50积分","img":"http://www.wjwlzwawa.com/goodImg/1546155604120.png","goodid":2663,"display_price":1,"spec":"50"}],"account":"wx_o5_aPwQGiw67_1C-UAfBjvjLtL3g","startTime":1549959912105,"endTime":1549959912130,"subTime":25,"errcode":0,"errmsg":"ok"}

        let get_luckybag = {"data":[{"name":"针扣皮带","img":"http://www.wjwlzwawa.com/goodImg/1548322283006.jpeg","goodid":4007,"display_price":22,"spec":"棕色 长度(CM):95-115CM"},{"name":"韩版油皮纯色时尚潮流双肩包","img":"http://www.wjwlzwawa.com/goodImg/1546604934612.jpeg","goodid":3040,"display_price":25,"spec":"黑色"},{"name":"可爱小熊入油亮片小熊钥匙扣","img":"http://www.wjwlzwawa.com/goodImg/1547053808184.jpeg","goodid":3395,"display_price":22,"spec":"一个款式颜色随机"},{"name":"桌面懒人支架","img":"http://www.wjwlzwawa.com/goodImg/1547906936070.jpeg","goodid":3865,"display_price":36,"spec":"金色"},{"name":"三合一数据线三头多功能同步充电线","img":"http://www.wjwlzwawa.com/goodImg/1546873821999.jpeg","goodid":3301,"display_price":23,"spec":"中国红 一拖三(Apple+micro+Type-C)1.2米"}],"giftData":[{"name":"50积分","img":"http://www.wjwlzwawa.com/goodImg/1546155604120.png","goodid":2663,"display_price":1,"spec":"50"},{"name":"100积分","img":"http://www.wjwlzwawa.com/goodImg/1546164922237.png","goodid":2799,"display_price":1,"spec":"100积分"},{"name":"50积分","img":"http://www.wjwlzwawa.com/goodImg/1546155604120.png","goodid":2663,"display_price":1,"spec":"50"},{"name":"10积分","img":"http://www.wjwlzwawa.com/goodImg/1546163997407.png","goodid":2795,"display_price":0,"spec":"10"},{"name":"10积分","img":"http://www.wjwlzwawa.com/goodImg/1546163997407.png","goodid":2795,"display_price":0,"spec":"10"}],"account":"wx_o5_aPwQGiw67_1C-UAfBjvjLtL3g","startTime":1549960434536,"endTime":1549960434591,"subTime":55,"errcode":0,"errmsg":"ok"}
        if( get_luckybag && get_luckybag.errcode === 0 ){
          this.resetSwipe();

          get_luckybag.data.forEach((e,i)=>{
            this.swipeList.push(e);
            if(get_luckybag.giftData && get_luckybag.giftData[i]){
              this.swipeList.push(get_luckybag.giftData[i]);
            }
          })

          
          this.showSwipe = !this.showSwipe;
        }
        },
        swipeChange(index){
        this.swipeIndex = index
        },
        getSwipNode(e){
          for(let i=0;i<e.path.length;i++){
            let node = e.path[i];
            if(node.className === 'swipe'){
                return node;
            }
          }
          return null;
        },
        swipeMouseDown(e){
          //设置成无过渡
          this.transition = 0;
          //获取鼠标点击的位置
          let target = e.changedTouches[0];

          //获取移动的父节点
          let parentX = this.getSwipNode(e).style.left.split('px')[0];

          this.moveStartX = target.pageX-Number(parentX);
        },
        swipeMouseMove(e){
          // let bigSize = 1.4;
          let boxWidth = 150+20;
          let windowWidth = document.body.clientWidth;

          //设置成无过渡
          this.transition = 0;
          //获取鼠标点击的位置
          let target = e.changedTouches[0];
          //获取移动的父节点
          let node = this.getSwipNode(e);
          // let parentX = node.style.left.split('px')[0];
          this.swipeX = target.pageX - this.moveStartX;

          // let x =  parseInt( ((this.swipeX-(375-250)/2) / (-250/2) ) + 1 ) -1 ;
          let x =  parseInt(((this.swipeX - (windowWidth-boxWidth)/2 )/ (boxWidth/2)) -2) /2;
          if(x>0){
            x = 0;
          }else{
            x = Math.abs(Math.floor(x)) - 1;
            x = x < 0? 0:x;
            x = x > this.swipeShowLength ? this.swipeShowLength:x;
          }
          this.swipeIndex = x;
        },
        updateSwipePosition(){
          let bigSize = 1.4;
          let boxWidth = 150+20;
          let windowWidth = document.body.clientWidth;
          //过渡归位
          this.transition = 0.3;
          //归位的位置
          // this.swipeX = (375-250)/2 - ( ( (375-250)/2+(200/2) ) * this.swipeIndex );
          this.swipeX = (windowWidth-boxWidth)/2 - ( boxWidth * this.swipeIndex )  -  boxWidth*(bigSize-1)/2
        },
        showNextSwipe(){
          if(this.swipeShowLength<this.swipeList.length - 1){
            this.swipeShowLength = this.swipeShowLength+1;
            this.swipeIndex = this.swipeShowLength;
            this.updateSwipePosition();
          }else{
            this.showSwipe = !this.showSwipe;
            this.resetSwipe();
          }
        },
        resetSwipe(){
          this.transition = 0.3;
          this.swipeIndex = 0;
          this.swipeShowLength = 0;
          this.swipeList = [];
          this.updateSwipePosition();
        }

     


   
    }
  }
</script>


<style lang='less' scope>
.ion-ios-arrow-back{
  color:#fff
}
a{
      text-decoration: none;
    background-color: transparent;
}
 
 .navbar{
   background: #b6271d ;
   transition: all 0ms !important;
 }
 .navbar h1{
   color: #fff;
 }
 .recordInfo{
   background: #fff;
   position: fixed;
   bottom: 44px;
 }
.index{
  .page{
      overflow-y: scroll;

  }
  .myMenu{
    margin: 54px auto;
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
          top: 44px !important;
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
                font-size:16px;
                color: #fa7100;
                span{
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

  .rightMenu{
    font-size: 14px;
    color: #fff;
    position: fixed;
    right: 0;
    top: 178px;

    .menu-block{
      background:url('../../static/image/web/right-menu.png') center no-repeat;
      width: 33px;
      height:92px;
      background-size:contain;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      margin:5px 0;
    }
    
  }

  .bottomMenu{
    font-size: 14px;
    width: 100%;
    color: #fff;
    position: fixed;
    bottom: 50px;
    display: flex;
    justify-content: space-around;
    div{
      background:url('../../static/image/web/bottom-menu.png') center no-repeat;
      background-size:contain;
      width: 97px;
      height:32px;
      line-height: 32px;
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

  .myrecords{
    width:317px;
    height:455px;
    padding: 10px;
  }
  .myprize{
    width:317px;
    height:455px;
    padding: 10px;

  }

  .mySwipe{
    width: 100%;
    overflow: hidden;
    color: #fff;

    .van-popup{
      background: transparent;
      width: 100%;
      border-radius: 0;
    }
    .swipe{
      // background: #ff4a00;
      padding: 50px 0 ;
      // width: 200%;
      display: flex;
      align-items: center;
      position: relative;
      align-items: center;

    }

      .swipeItem{
        // float: left;
        background:url('../../static/image/web/icon-gift-bg.png') center no-repeat;
        background-size:contain; 

        margin:0 10px;
        width: 150px;
        height: 150px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .swipeItemHead{
          background:url('../../static/image/web/icon-gift-head.png') center no-repeat;
          width: 171px;
          height: 97px;
          position: absolute;
          top: -42px;
          left: -11px;
          background-size:contain;
        }
        
        .swipeItemNum{
          background: #fe5d3d;
          position: absolute;
          top: 50%;
          right: -6px;
          width: 25px;
          height: 18px;
          line-height: 18px;
          font-size: 12px;
          margin-top: -9px;
          border-radius: 0 20px 20px 0;
          border: 1px solid #fff;

        }        

        .swipeItemImg{
          background: #fff;
          width: 80%;
          height: 80%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 10px;
          position: relative;
          div{
           width: 90%;
            height: 90%;
          } 
          .swipeItemIcon{
            background: #ff4a00;
            position: absolute;
            top: 8px;
            right: -35px;
            transform: rotate(45deg);
            font-size: 14px;
            width: 100px;
            height: 20px;
          }
        }

       


      }

       .swipeItemName{
         font-size:16px;
        }

        .swipeItemBtn{
          background:url('../../static/image/web/bottom-menu.png') center no-repeat;
          background-size:contain;
          width: 97px;
          height:32px;
          line-height: 32px;
          margin: 20px auto 0;
          font-size: 16px;

        }
      .bigSwipeItem{
        // border:2px solid red;
        // width: 220px;
        // height: 220px;
        // transform: scale(1.3)
        zoom:1.4;

      }

  }


}
 
</style>


