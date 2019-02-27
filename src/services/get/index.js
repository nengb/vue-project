import { get } from '../api'
import serverConfig from '../../configs/serverConfig/index';
import { templateData } from '../mockData/getData'
import Mock from 'mockjs'

import http from '../../configs/net/http.js'

let  { ip, httpAddress, socketAddress, imgAddress, getHrefNew, getQueryString } = serverConfig
async function getAPI(api,data){
 return await http.getData({url:`${httpAddress}${api}`,post:data})
}
async function getMockData(api){
  let data = Mock.mock(templateData[api]);
  console.log(data)
  return data;
}

const getApiList = {}
for(let api in get ){
  getApiList[api] = async (data)=>{
    if(httpAddress == 'mock'){
      return await getMockData(api)
    }else{
      return await getAPI(get[api],data)
    }
  }
}
export default getApiList;