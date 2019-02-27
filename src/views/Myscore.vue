
<template>
  <div
    class="page has-navbar"
    style="transition:none !important"
  >
    <van-nav-bar
      title="我的积分"
      fixed
      border
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="page-content text-center ">
      <div class="myscore">
        <div class="score">
          <div class="num">
            {{ user.score }}
          </div>
          <div class="cn">
            积分
          </div>
        </div>

        <van-tabs 
          v-model="active"
          swipeable
          animated
          sticky
          :offset-top="46"
          @change="vTabsChange"
        >
          <van-tab
            v-for="(items,index) in list"
            :key="index"
            :title="index == 0?'积分获取':'积分支出'"
          >
            <van-pull-refresh
              v-model="isLoading"
              pulling-text=" "
              loosing-text=" "
              loading-text=" "
              @refresh="onRefresh"
            >
              <van-list
                v-show="index == active"
                v-model="loading"
                :finished=" (list[active] && list[active][0] && list[active][0].finished )?true:false"
                finished-text="没有更多了"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                @load="onLoad"
              >
                <div class="con">
                  <div
                    v-for="item in items"
                    v-show="item.ord_id"
                    class="conItem"
                  >
                    <div class="left">
                      <div class="img">
                        <img
                          alt=""
                          width="100%"
                          height="100%"
                          v-lazy="item.img"
                        >
                      </div>
                      <div class="info">
                        <div class="name">
                          {{ item.name }}
                        </div>
                        <div class="time">
                          {{ item.formatTime }}
                        </div>
                      </div>
                    </div>
                    <div class="right">
                      <div class="msg" />
                      <div class="score">
                        {{ index == 0?'+':'-' }}{{ item.num }}
                      </div>
                    </div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>

  import HttpGet from '../services/get';
  import { NavBar, List, Tab, Tabs, PullRefresh,Toast, Lazyload     } from 'vant';
  import serverConfig from '../configs/serverConfig';
  let { genQueryString, getQueryStringArgsAes,formatTime } = serverConfig;
  import wechat from '../configs/wechat';

  export default {
    components: {
      [NavBar.name]:NavBar,
      [List.name]:List,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs,
      [PullRefresh.name]:PullRefresh,
      [Toast.name]:Toast,
      [Lazyload.name]:Lazyload,
    },
    data () {
      
      return {
        list:{0:[{}],1:[{}]
        },
        active:0,
        loading:false,
        finished:false,
        error:false,
        isLoading:false,
        user:{},
        classLoading:[0,0],


      }
    },
    async created(){
      this.user = wechat.getUserData();
        // console.log("wechat.getUserData()")
        // console.log(wechat.getUserData())
        this.loadMoreData(0,true);
        this.loadMoreData(1,true);


    
    },

    methods:{
      onClickLeft(){
        this.$router.back();
      },
      vTabsChange(){
        if(this.list[this.active] &&this.list[this.active][0] && this.list[this.active][0].finished){
        }
      },
      //加载更多数据
      async loadMoreData(class_id,initPage){
        let page = initPage?1:this.list[class_id][0].page+1;
        // console.log("page")
        // console.log(page)
        let api = class_id == 1?'get_score_pay_bills':'get_score_bills';
        if( this.classLoading[class_id] == 1){
          return;
        }
        this.classLoading[class_id] = 1;
        if(isNaN(page) || (this.list[class_id] && this.list[class_id].finished)){
          return;
        }


        let getData = await HttpGet[api]({page});
        if(getData && getData.data && getData.data.length>0){
          getData.data.map(e=>{
            e.formatTime = formatTime(new Date(e.time));
            return e;
          })
          
          if(initPage){
            //初始化页面数据
            getData.data[0].page = page;
            getData.data[0].pageSize = getData.data.length;
            this.$set(this.list,class_id,getData.data);
          }else{
            // console.log("++++++")
            this.list[class_id][0].page++;
            this.list[class_id] = this.list[class_id].slice(0,(page-1)*this.list[class_id][0].pageSize).concat(getData.data);
          }
      
            this.loading=false;
        }else if(getData && getData.errcode == 1){
            if(!this.list[class_id]){
              this.list[class_id] = [{}];
            }
            this.$set(this.list[class_id][0],'finished',true)
            this.loading=false;
            if(this.list[class_id].page >2){
              Toast('我是有底线的~')
            }
        }else{
            this.error = true;
        }

        this.classLoading[class_id] = 0;

      },
      onLoad(){
        // console.log("this.active")
        // console.log(this.active)
        this.loadMoreData(this.active);
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
 
.myscore{
  
  .van-tabs--line .van-tabs__wrap{
    height: 46px;
    box-shadow: 0px 1px 2px #e4e0df;

  }
  .score{
    .num{
      padding: 14px 0 5px;
      color: #b92517;
      font-size: 30px;
    }
    .cn{
      color: #8f8f8f;
    }
    margin-bottom: 10px;
  }
  .con{
    margin:10px 0;
    .conItem{
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      margin-top: 2px;
      .left{
        display: flex;
        text-align: left;
        .img{
        width: 44px;
        height: 44px;
        margin: 0 7px 0 11px;
        }
        .info{
          .name{

          }
          .time{

          }
        }
      }
      .right{

      }
    }
  }
}
 
</style>


