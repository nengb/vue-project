import { post } from '../api'
let { serverConfig, getData, postData } = window;
let { ip, httpAddress, socketAddress, imgAddress, getHrefNew, getQueryString } = serverConfig;

let { 
    report_pipe_data,
} = post;

export async function api_report_pipe_data(data){
    return await postData({url:`${httpAddress}${report_pipe_data}`,post:data})
}


