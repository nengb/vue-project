
<template>
  <div class="page has-navbar"   style='transition:none !important'>
    <van-nav-bar
      title="地址管理"
      fixed
      border
      left-arrow
       @click-left="onClickLeft"
       @click-right="onClickRight"
    >
    <span class="add-address-btn" slot="right">添加</span>
    </van-nav-bar>

    <div class="page-content text-center " >
      <div class='myaddress'>
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          @add="onAdd"
          @edit="onEdit"
        >
        <!-- <span class="default_address" spot="top" v-bind:style="defaultIndex">默认</span> -->
        </van-address-list>

      </div>
    </div>
  </div>
</template>
<script>

  import get from '../services/get';
  import { NavBar,AddressList   } from 'vant';
  import serverConfig from '../configs/serverConfig';
  let { genQueryString, getQueryStringArgsAes } = serverConfig;
  

  export default {
    components: {
      [NavBar.name]:NavBar,
      [AddressList.name]:AddressList,
    },
    data () {
      
      return {
        chosenAddressId: '1',
        list: [
          // {
          //   id: '1',
          //   name: '张三',
          //   tel: '13000000000',
          //   address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
          // },
          // {
          //   id: '2',
          //   name: '李四',
          //   tel: '1310000000',
          //   address: '浙江省杭州市拱墅区莫干山路 50 号'
          // }
        ],
        defaultIndex:{
          marginTop:"0px",
        }
     

      }
    },

    async beforeMount(){
        let getAddress = await get.get_address();
        console.log(getAddress)
        if(getAddress && getAddress.data){
           getAddress.data.forEach((e,i) => {
              let { addr_id,addr,name,tel,user_id,state } = e;
              if(state == 1){
                this.defaultIndex.marginTop = 70*(i)+'px'
                this.chosenAddressId = i;
              }
              this.list.push({
                id:i,
                addr_id:addr_id,
                address:addr,
                name,
                tel,
                state,
              })
           });
        }
    },
    async created(){

    
    },
    mounted(){
   
    },
    

    methods:{
      onClickLeft(){
        this.$router.back();
      },
      onClickRight(){
        this.$router.push('/mine/myaddressadd');
      },
      onAdd() {
        this.$router.push('/mine/myaddressadd');
      },
      onEdit(item, index) {
        let url = genQueryString('/mine/myaddressadd',{addressInfo:item})
        this.$router.push(url);

      }

    }
  }
</script>


<style lang='less' scope>
.van-nav-bar .van-icon,.add-address-btn{
  color: #fff
}

.myaddress{
  margin-top: 14px;
  .van-address-item{
    position: relative;
  }
 .default_address{
   color: #fff ;
   position: absolute;
   top: 60px;
   right: 10px;
   padding:2px;
   font-size:14px; 
   border-radius:0 0 8px 8px;
   background: #b6271d;
 }
}


 

 
</style>


