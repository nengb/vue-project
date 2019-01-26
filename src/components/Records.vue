
<template>
    
    <div class='records'>
        <div class="conData">
            <div class="conDataScroll"> 

                <van-tabs 
                    v-model="active"
                    swipeable
                    animated
                    v-on:change="vTabsChange"
                >
                    <van-tab v-for="(items,index) in list" :title="index == 0?'抽奖记录':'礼盒记录'" >
                            <van-pull-refresh v-model="isLoading" @refresh="onRefresh" pulling-text=" " loosing-text = ' ' loading-text=' '>
                                
                                <div class="con" >
                                    <div class="conItem" v-for="item in showList">
                                        <div class="img"><img :src="item.headimg" alt="" width="100%" height="100%"></div>
                                        <div class="right">
                                            <div class="info">
                                                <div class="name">{{item.name}}</div>
                                                <div class="time">{{item.formatTime}}</div>
                                            </div>
                                            <div class="msg">
                                                <div class="img"><img :src="item.good_img" alt="" width="100%" height="100%"></div>
                                                <div class="name">{{item.good_name}}</div>

                                            </div>

                                        </div>
                                    </div>
                                </div>


                            </van-pull-refresh>


                    </van-tab>
                </van-tabs>

            </div>

        </div>

        <div class="pageInfo">
            <div class="pageNum">
                <span>第{{listPage[active]}}页/</span>
                <span>{{list[active]?list[active][0].pageSize:1}}行记录</span>
            </div>
            <div class="pageBtn">
                <div v-on:click="pagePrev">上一页</div>
                <div v-on:click="pageFirst">首页</div>
                <div v-on:click="pageNext">下一页</div>
            </div>

        </div>




    </div>
</template>
<script>

  import get from '../services/get';
  import { NavBar, List, Tab, Tabs, PullRefresh,Toast    } from 'vant';
  import serverConfig from '../configs/serverConfig';
  let { genQueryString, getQueryStringArgsAes,formatTime } = serverConfig;

  export default {
    components: {
      [NavBar.name]:NavBar,
      [List.name]:List,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs,
      [PullRefresh.name]:PullRefresh,
      [Toast.name]:Toast,
    },
    data () {
      
      return {
        list:{
        },
        active:0,
        loading:false,
        finished:false,
        error:false,
        isLoading:false,
        listPage:[1,1],
        showList:[],

      }
    },
    async created(){

      
        await this.loadMoreData(0,true);
        await this.loadMoreData(1,true);

        this.reloadShowData()
    
    },

    methods:{
      onClickLeft(){
        this.$router.back();
      },
      vTabsChange(){
        this.reloadShowData()
      },
      //加载更多数据
      async loadMoreData(class_id,initPage){
        let page = initPage?1:this.list[class_id][0].page+1;
        let records_type = class_id == 1?0:1;
       
        if(this.list[class_id] && this.list[class_id].finished){
          return;
        }
        if(page>1){
            this.list[class_id][0].page++;
        }
        let getData = await get.get_luckybag_records({apiService:'lottery',records_type,page});
        if(getData && getData.data && getData.data.length>0){
          getData.data.map(e=>{
            e.formatTime = formatTime(new Date(e.time));
            return e;
          })
          
          if(page == 1){
            //初始化页面数据
            getData.data[0].page = page;
            getData.data[0].pageSize = getData.data.length;
            this.$set(this.list,class_id,getData.data);
          }else{
            this.list[class_id] = this.list[class_id].slice(0,(page-1)*this.list[class_id][0].pageSize).concat(getData.data);
          }
      
            this.loading=false;
        }else if(getData && getData.errcode == 1){
            if(!this.list[class_id]){
              this.list[class_id] = [{}];
            }
            this.$set(this.list[class_id][0],'finished',true)
            this.loading=false;
            Toast('我是有底线的~')
        }else{
            this.error = true;
        }
        this.reloadShowData()



      },
      reloadShowData(){
          let classData = this.list[this.active];
          let page = this.listPage[this.active];
          let pageSize = classData[0].pageSize;
          this.showList = classData.slice( (page-1)*pageSize,page*pageSize );

      },
      onLoad(){
        console.log("this.active")
        console.log(this.active)
        this.loadMoreData(this.active);
      },
      onRefresh(){
        setTimeout(()=>{
          this.isLoading = false;

        },10)
      },
      pagePrev(){
          console.log(this.listPage[this.active] >1)
          if( this.listPage[this.active] >1){
            this.$set(this.listPage,this.active,this.listPage[this.active]-1);
          }
        this.reloadShowData()


      },
      pageFirst(){
        this.$set(this.listPage,this.active,1);
        this.reloadShowData()

      },
      async pageNext(){
        let newPage = this.listPage[this.active]+1;
         this.loadMoreData(this.active);

        this.$set(this.listPage,this.active,this.listPage[this.active]+1);
        
        this.reloadShowData()
        console.log(this.listPage)
      }

    }
  }
</script>


<style lang='less' scope>
.van-nav-bar .van-icon{
  color: #fff
}
 
.records{

    position: relative;
    background: #fff;
    height: 100%;
  .van-tabs--line{
      padding: 0;
  }
  .van-tabs--line .van-tabs__wrap{
      top: 10px;
      bottom: auto !important;
    height: 46px;
    position: fixed;
  }
  [class*=van-hairline]::after{
    border: 0;
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
   .conData{
      height: 80%;
      overflow: hidden;
  }
  .conDataScroll{
      height: 100%;

      overflow-y: scroll;

  }
  .con{
    margin:50px 0 0;
    .conItem{
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2px;
     
        .img{
        width: 33px;
        height: 33px;
        margin: 0 7px 0 5px;
        border-radius: 50%;
        overflow: hidden;
        }
        
      .right{
            display: flex;
            text-align: left;
            justify-content: space-between;
            width: 82%;
            border-bottom: 1px solid #e2e2e2;
            padding: 7px;
            align-items: center;
            .info{
                .name{
                    font-size: 12px;
                }
                .time{
                    margin-top:4px;
                    color: #c1c1c1;
                    font-size: 12px;
                }
            }
            .msg{
                display: flex;
                align-items: center;
                width: 54%;

                .img{
                    width: 30px;
                    height: 30px;
                    border-radius: 0;
                }
                .name{
                    max-width: 110px;
                    font-size: 12px;
                    color: #ea7375;
                }
            }

      }
    }
  }

  .pageInfo{

      padding-top: 10px;
      .pageNum{
          span:first-child{
              color:#f86055;
          }
      }
      .pageBtn{
        font-size: 14px;
        width: 94%;
        color: #fff;
        position: fixed;
        bottom: 18px;
        display: flex;
        justify-content: space-around;
        div{
        background:url('../../static/image/web/bottom-menu.png') center no-repeat;
        background-size:contain;
        width: 90px;
        height:32px;
        line-height: 32px;
        }
      }
  }
}
 
</style>


