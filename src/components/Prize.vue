
<template>
  <div class="prize">
    <div class="prizeConScroll">
      <div
        v-for="(listItem,index) in list"
        :key="index"
        class="prizeCon"
      >
        <van-pull-refresh
          v-model="isLoading"
          pulling-text=" "
          loosing-text=" "
          loading-text=" "
          @refresh="onRefresh"
          v-if="listItem"
        >
          <div class="prizeListTitle" >
            ---------- {{ listItem.type_name }} ----------
          </div>
          <div
            v-if="listItem.good_list"
            class="prizeList"
          >
            <div
              v-for="item in listItem.good_list"
              :key="item.egg_good_type"
              class="prizeListItem"
            >
              <div class="prizeListItemImg">
                <div
                  v-if="user.show_luckybag_pro == 1 && (item.prizePro*100).toFixed(4) >0"
                  class="prizePro"
                >
                  {{ (item.prizePro*100).toFixed(4) }}%
                </div>
                <img
                  alt=""
                  width="100%"
                  height="100%"
                  v-lazy="item.img"
                >
              </div>
              <div class="prizeListItemName">
                {{ item.name }}
              </div>
            </div>
            <div
              v-if="listItem.good_list.length%2 !=0"
              class="prizeListItemRes"
            />
          </div>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>
<script>

  import HttpGet from '../services/get';
  import { NavBar, List, Tab, Tabs, PullRefresh,Toast,Loading     } from 'vant';
  import serverConfig from '../configs/serverConfig';
  let { genQueryString, getQueryStringArgsAes,formatTime } = serverConfig;
  import wechat from '../configs/wechat' 

  export default {
    components: {
      [NavBar.name]:NavBar,
      [List.name]:List,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs,
      [PullRefresh.name]:PullRefresh,
      [Toast.name]:Toast,
      [Loading.name]:Loading,
    },
    data () {
      
      return {
        list:[{}],
        isLoading:false,
        user:{},

      }
    },
    async created(){
      this.user = wechat.getUserData();

      let getData = await HttpGet.get_lucky_bag_data_new();
      if(getData && getData.data && getData.data.luckybag_data.length>0){
         this.list = getData.data.luckybag_data;
      }

    
    },

    methods:{
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

 
.prize{
  width: 100%;
  height: 96%;
  position: relative;
  overflow: hidden;
  .prizeConScroll{
    height: 94%;
    overflow-y: scroll;
    margin-top: 20px;

  }
  .prizeCon{
    .prizeListTitle{
      margin: 10px 0;
      font-size: 16px;
      font-weight: bold;
    }
    .prizeList{
        display: flex;
        align-items: center;
        flex-wrap:wrap;
        justify-content: space-around;
        color: #fff;
      .prizeListItem{
        padding: 8px;
        width: 42%;
        height:165px;
        margin: 5px;
        background: #ff901a;
        border-radius: 8px;
        overflow: hidden;
        box-sizing:border-box;
        position: relative;
        
      }
      .prizeListItemRes{
        width: 42%;
        margin: 5px;
        box-sizing:border-box;


      }
      .prizeListItemImg{
        background: #fff;
        height: 80%;
        position: relative;

        .prizePro{
          background: #f0007f ;
          position: absolute;
          top: 0;
          right: 0;
          padding: 2px 4px;
          font-size: 12px;
        }
      }
      .prizeListItemName{
        font-size: 12px;
        padding:2px 8px 0;
        height: 30px;
        overflow:hidden;
        text-overflow:ellipsis;
        // white-space:nowrap;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-align: left;
  
      }
    }

  }
}
 
</style>


