
<template>
  <div class="page"  style='transition:none !important'>
    <van-nav-bar
      title="首页"
      fixed
      border
    />
    <div class="page-content text-center " >
      <div class='index'>
          <div class="myMenu">
            <div class="content">
                <van-tabs 
                  v-model="active" 
                  swipeable
                  animated
                  sticky
                  
                  v-on:change="vTabsChange"
                >
                  <van-tab v-for="(item, index) in navArr" :title="item.name">

                    <van-pull-refresh v-model="isLoading" @refresh="onRefresh(index)" >
                        <van-list
                          v-show="index == active"
                          v-model="loading"
                          :finished=" (classData[item.good_class_id] && classData[item.good_class_id][0] && classData[item.good_class_id][0].finished )?true:false"
                          :error.sync="error"
                          error-text="请求失败，点击重新加载"
                          finished-text="没有更多了"
                          @load="loadMoreData(item.good_class_id)"
                        >
                        <div class="classItemList" >
                            <div  class="classItem" v-for="(classItem, classIndex) in classData[item.good_class_id]" v-bind:style="animationObj(classIndex)" v-on:click="changeBuyGoodIndex(classIndex)">
                                <div class="classItem-img"><img :src="classItem.img" width="100%" height="100%" alt=""></div>
                                <div class="name">{{classItem.name}}</div>
                                <div class="price"><span>￥</span>{{classItem.sale_price}}</div>
                            </div>
                            <div class="classItemRes" v-for="key in classItemRes" ></div>

                          </div>


                        </van-list>
                    </van-pull-refresh>
                      
                  </van-tab>

                </van-tabs>

            </div>
          </div>

          <div class="rightMenu">
            <div class="menu-block" v-on:click="changeShowRecords"><div>抽<br>奖<br>记<br>录</div></div>
            <div class="menu-block" v-on:click="changeShowProtocol"><div>协<br>议</div></div>
            <div class="menu-block" v-on:click="changeShowPrize"><div>奖<br>品</div></div>
          </div>

          <div class="bottomMenu">
            <div>单买</div>
            <div>买5个</div>
            <div>买10个</div>
          </div>

          <van-popup v-model="showBuyGood" 
            v-bind:close-on-click-overlay=true 
            >
             <div class="buyGood" v-if="showBuyGood">
               <i class="close" v-on:click="changeShowBuyGood"></i>
                <div class="buyGood-img"><div><img :src="classData[navArr[active].good_class_id][buyGoodIndex].img" alt="" height="100%"></div></div>
                <div class="buyGood-name">{{classData[navArr[active].good_class_id][buyGoodIndex].name}}</div>
                <div class="con">
                  <div class="con-bolck">
                    <span>购买数量</span> 
                    <van-stepper integer :min="1" :max="100" v-model="buyNum" /> 
                  </div>
                  <div class="con-bolck">
                    <span>价格</span> 
                    <div>合计: <span class="price"><i>￥</i>{{buyNum*classData[navArr[active].good_class_id][buyGoodIndex].sale_price}}</span></div> 
                  </div>
                </div>
                <div class="buy">购买</div>

            </div>
          </van-popup>

         

          <van-popup v-model="showRecords" 
            v-bind:close-on-click-overlay=true 
            >
             <div class="records">
               抽奖记录
            </div>
          </van-popup>

          <van-popup v-model="showProtocol" 
            v-bind:close-on-click-overlay=true 
            >
             <div class="protocol">
               用户协议
            </div>
          </van-popup>

          <van-popup v-model="showPrize" 
            v-bind:close-on-click-overlay=true 
            >
             <div class="prize">
               奖品
            </div>
          </van-popup>

        <MyTabbar v-bind:active=0 ></MyTabbar>
      </div>
    </div>
  </div>
</template>
<script>
  let { ip, httpAddress, socketAddress, imgAddress, getHrefNew,location,href,getHashSearch,loca_key,getQueryStringArgsAes,genQueryString } = serverConfig;

  import MyTabbar from '@/components/Tabbar.vue'
  import get from '../services/get';
  import { setInterval } from 'timers';
  import { Tab, Tabs, NavBar, Loading,List, PullRefresh, Popup, Stepper, Toast       } from 'vant';
  import { isWeiXin,jssdk,wechatBuy } from '../configs/wechat' 

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
      
      }
    },
    async created(){
      let getIndexData = await get.index();
      if( getIndexData && getIndexData.data ){
        this.navArr = getIndexData.data.navArr;
        //请求所有分类数据

        this.navArr.forEach((e,i) => {
            let  { good_class_id } = e;
            // this.initData(good_class_id,i);
            
            this.loadMoreData(good_class_id,true);
            this.$set(this.navArr[i],'reflushLoading',false);
        });

      }
    },

    methods:{
       vTabsChange(index,title){
        //    let { good_class_id } = this.navArr[this.active];
        //  if(this.classData[good_class_id] && this.classData[good_class_id][0].finished){
        //      this.finished = true;
        //    }else{
        //      this.finished = false;
        //    }
       },
       async initData(good_class_id,navArrId,state){
          if(!state && (this.classData[good_class_id] && this.classData[good_class_id][0].page > 1 )){
            return;
          }
            //初始化页面数据
            let page = 1;
            let classData = await get.get_classroom_data_h5({classid:good_class_id,page})
            if (classData && classData.data && classData.data.length>0){
              classData.data[0].page = page;
              classData.data[0].pageSize = classData.data.length;
              this.$set(this.classData,good_class_id,classData.data)
            }
            else if(classData && classData.errcode == 1){
               this.$set(this.classData,good_class_id,[{
                page,
                finished:true,
              }])
              this.finished = true;
           }else{
             this.error = true;
           }
       },
        //加载更多数据
       async loadMoreData(class_id,initPage){
         console.log(`加载更多 class_id ${class_id} ${initPage} ${this.loading}`)
        if(!initPage && !this.classData[class_id]){
          return;
        }



        let page = initPage?1:(this.classData[class_id][0].page+1);
        console.log("page")
        console.log(page)
        if(page>1){
            this.$set(this.classData[class_id][0],'page',this.classData[class_id][0].page+1)

        }
        let getData = await get.get_classroom_data_h5({classid:class_id,page})
        if (getData && getData.data && getData.data.length>0){
          if(initPage){
            //初始化页面数据
            console.log(`初始化页面数据 page${page} class_id ${class_id} intitpage${initPage}`)
            getData.data[0].page = page;
            getData.data[0].pageSize = getData.data.length;
            this.$set(this.classData,class_id,getData.data)
            console.log(`初始化完成页面数据 page${page} class_id ${class_id} intitpage${initPage}`)

          }else{

            console.log(`加载更多数据`)
            console.log("this.classData[class_id][0].page")
            console.log(this.classData[class_id][0].page)

            this.classData[class_id] = this.classData[class_id].slice(0,(page-1)*this.classData[class_id][0].pageSize).concat(getData.data);
            
            this.classData[class_id].loading = true;
            

          }

          this.loading=false;

        }else if(getData && getData.errcode == 1){
            if(!this.classData[class_id]){
              this.classData[class_id] = [{}];
            }
            this.$set(this.classData[class_id][0],'finished',true)
            this.loading=false;
            Toast('我是有底线的~')
        }else{
            this.error = true;
        }
          




       },
       async onRefresh(index){
         setTimeout(async () => {
          let { good_class_id } = this.navArr[index];
          this.classData[good_class_id] = null;
          // this.$set(this.classData,good_class_id,null);
          this.finished = false;
          // await this.initData(good_class_id,index,true);
          this.loadMoreData(good_class_id,true)
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
       },
       changeBuyGoodIndex(classIndex){
          this.buyGoodIndex = classIndex;
          this.showBuyGood = true;
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

  .buyGood{
    position: relative;
    .close{
      width: 18px;
      height: 18px;
      background:url('../../static/image/web/close.png') center no-repeat;
      background-size:contain;
      position: absolute;
      top:10px;
      right:10px;
      display: block;


    }
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
}
 
</style>


