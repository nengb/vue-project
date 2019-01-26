import { get } from '../api'
import serverConfig from '../../configs/serverConfig/index';

import http from '../../configs/net/http.js'

let  { ip, httpAddress, socketAddress, imgAddress, getHrefNew, getQueryString } = serverConfig
async function getAPI(api,data){
 return await http.getData({url:`${httpAddress}${api}`,post:data})
}

const getApiList = {}
for(let api in get ){
  getApiList[api] = async (data)=>{
    return await getAPI(get[api],data)
  }
}
export default getApiList;