
<template>
  <div
    class="page has-navbar"
    style="transition:none !important"
  >
    <van-nav-bar
      :title="addressAdd?'添加收货地址':'修改收货地址'"
      fixed
      border
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
    <!-- <span class="add-address-btn" slot="right">保存</span> -->
    </van-nav-bar>
    <div class="page-content text-center ">
      <div class="myaddressadd">
        <van-address-edit
          :area-list="areaList"
          :show-delete="!addressAdd"
          :address-info="addressInfo"
          show-set-default
          show-search-result
          :is-saving="isSaving"
          :is-deleting="isDeleting"
          :search-result="searchResult"
          @save="onSave"
          @delete="onDelete"
        />
      </div>
    </div>
  </div>
</template>
<script>

  import HttpGet from '../services/get';
  import { NavBar,AddressEdit,Toast  } from 'vant';
  import areaList from '../configs/area';
  import serverConfig from '../configs/serverConfig';
  let { genQueryString,getQueryStringArgsAes } = serverConfig;

  export default {
    components: {
      [NavBar.name]:NavBar,
      [AddressEdit.name]:AddressEdit,
      [Toast.name]:Toast,
    },
    data () {
      
      return {
        areaList,
        searchResult: [],
        isSaving:false,
        isDeleting:false,
        addrid:-1,
        addressAdd:false,
        addressInfo:{},

      }
    },
    beforeMount(){
      // console.log("beforeMount")

    },
    async created(){
      // console.log("created")

      // this.areaList = areaList;
      let { addressInfo } = getQueryStringArgsAes()
      if(addressInfo){
        let b = addressInfo.address.split('/');
        let areaCode;
        if(b.length == 2){
          areaCode = b[1];
        }
        
        let a = b[0].split('_');
        let addressDetail = a[a.length-1];
        a = a[a.length-2];
        let county ;
        let city ;
        let province ;
        if(typeof a == 'string'){
          a = a.split(' ');
          county = a[a.length-1];
          city = a[a.length-2];
          province = a[a.length-3];
        }
          this.addressInfo = {
            ...addressInfo,
            addressDetail,
            isDefault:addressInfo.state == 1?true:false,
            areaCode
            }
            this.addressAdd = false
        // },1000)
      }else{
          this.addressAdd = true
      }
     
    },
    // async created(){

    
    // },

    methods:{
      onClickLeft(){
        this.$router.back();
      },
      onClickRight(){
        this.$router.push();
      },
      async onSave(e) {
        // console.log(e)
        let { name, tel, addr_id, address, addressDetail, city, county, province,isDefault,areaCode } = e;
        this.isSaving = true;
        let addressDe = addressDetail.split('_');
        addressDe = addressDe[addressDe.length-1];
        
        let operateName = addr_id?'update_address':'add_address';
        let update_address = await HttpGet[operateName]({
          name,
          tel,
          addrid:addr_id,
          addr:`${province} ${city} ${county}_${addressDe}/${areaCode}`
        })
        if(isDefault){
          await HttpGet.set_addr_default({
            addrid:addr_id,
          })
        }
        this.isSaving = false;
        Toast('保存成功!');
        this.$router.back();

      },
      async onDelete(e) {
        // console.log(e)
        let { name, tel, addr_id, address, addressDetail, city, county, province } = e;

        this.isDeleting = true;

        let delete_address = await HttpGet.delete_address({
          addrid:addr_id,
        })
        this.isDeleting = false;
        Toast('删除成功！');
        this.$router.back();
      },
      onChangeDetail(val) {
        if (val) {
          this.searchResult = [{
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }];
        } else {
          this.searchResult = [];
        }
      }
    }
  }
</script>


<style lang='less' scope>
.van-nav-bar .van-icon,.add-address-btn{
  color: #fff
}
.myaddressadd{
  margin-top: 14px;

}
 

 
</style>


