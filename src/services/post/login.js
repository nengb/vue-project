import { post } from '../api'

let { serverConfig, getData, postData } = window;
let { ip, httpAddress, socketAddress, imgAddress, getHrefNew, getQueryString } = serverConfig;

let { 
    agent_login,
} = post;


export async function api_agentLogin(data){
    return await postData({url:`${httpAddress}${agent_login}`,post:data})
}


