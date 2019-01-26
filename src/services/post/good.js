import { post } from '../api'
let { serverConfig, getData, postData } = window;
let { ip, httpAddress, socketAddress, imgAddress, getHrefNew, getQueryString } = serverConfig;

let { 
    add_good,
} = post;

export async function api_add_good(data){
    return await postData({url:`${httpAddress}${add_good}`,post:data})
}


