
<template>
  <div class="page has-navbar"   style='transition:none !important'>
    <van-nav-bar
      title="积分商城"
      fixed
      border
    />
    <div class="page-content text-center " >
      <div class='scoreshop'>
        <div class="head-info">
          <div class="head-info-block">
             <i class="score-s"></i>
             <span class="text" v-on:click="toMyScore()">积分</span>
             <span class="num">151</span>
          </div>
          <div class="head-info-block">
             <i class="record-s"></i>
             <span class="text">兑换记录</span>
          </div>
        </div>

        <div class="navArr">
            <div class="navArrList" v-on:click="getClassGoodsList(-1)">
              <div><img :src="require('../../static/image/web/scoreshop-all.png')" width="100%" alt=""></div>
              <div class="navArrList-name">全部</div>
            </div>
            <div class="navArrList" v-for="item in navArr" v-on:click="getClassGoodsList(item.score_class_id)">
              <div><img :src="item.class_img" width="100%" alt=""></div>
              <div class="navArrList-name">{{item.name}}</div>
            </div>
        </div>

        <div class="classItemList">
          <div class="classItem" v-for="(classItem, classIndex) in goodList">
              <div class="classItem-img"><img :src="classItem.img" width="100%" height="100%"  alt=""></div>
              <div class="name">{{classItem.name}}</div>
              <div class="price">{{classItem.score}}<span>积分</span></div>
          </div>
         
          <div class="classItemRes" v-for="key in classItemRes" ></div>
        </div>


     

        <MyTabbar v-bind:active=1 ></MyTabbar>
      </div>
    </div>
  </div>
</template>
<script>

  import get from '../services/get';
import { setInterval } from 'timers';
import MyTabbar from '@/components/Tabbar.vue'
import { NavBar  } from 'vant';
  

  export default {
    components: {
      MyTabbar,
      [NavBar.name]:NavBar,
    },
    data () {
      
      return {
        navArr:[],
        goodList:[],
        classItemRes:[0,0],


      }
    },
    async created(){
      console.log("get")
      console.log(get.get_score_index())
      let getScoreIndex = await get.get_score_index();
      if(
        getScoreIndex && 
        getScoreIndex.data && 
        getScoreIndex.data.navList && 
        getScoreIndex.data.navList.length>0
      ){
        console.log("getScoreIndex");
        console.log(getScoreIndex);
        this.navArr = getScoreIndex.data.navList;
        console.log(this.navArr);

        let getScoreStore = await get.get_score_store();
        this.goodList = getScoreStore.data;

      }

    
    },

    methods:{
      menuClicked(menuIndex) {
          console.log(menuIndex);
      },
      

      async getClassGoodsList(score_class_id){
        
        let goodList = score_class_id == -1? await get.get_score_store():await get.get_score_classroom({score_class_id})
        if(goodList && goodList.data ){
          this.goodList = goodList.data;
        }
      },
      toMyScore(){
        this.$router.push('/mine/myscore')
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
  .navArr{
    margin: 7px 16px;
    overflow-x: scroll;
    white-space: nowrap;
    .navArrList{
      display: inline-block;
      margin: 0 10px;
      width: 40px;
      .navArrList-name{
      }
    }
  }

  .classItemList{
      display: flex;
      flex-wrap:wrap;
      justify-content: space-around;
      padding: 1%;
      .classItem{
        // width: 46%;
        height:236px;
        margin: 6px;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        box-shadow: 0px 1px 2px #e4e0df;
              // width: 30%;

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
 
</style>


