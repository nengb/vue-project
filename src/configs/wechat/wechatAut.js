//微信登录


function isWeiXin() {
  let ua = window.navigator.userAgent.toLowerCase();
  console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}
    
function getCodeParamUri({appid,redirect_uri,response_type,scope,state}){
  return `appid=`+appid+`&redirect_uri=`+encodeURIComponent(redirect_uri)+`&response_type=`+response_type+`&scope=`+scope+`&state=`+state+`#wechat_redirect`;
}

// if(process.env.NODE_ENV == 'production'){
//     if(!sessionStorage.code){
//       console.log(`缓存中没有code，跳转授权`)
//       let getCodeParam = {
//         appid : 'wxc3a926ef664432bf',
//         redirect_uri : 'http://www.wjwltech.com/buy/c.html',
//         response_type : 'code',
//         scope : 'snsapi_userinfo',
//         state : 'STATE',
//       }
    
//       sessionStorage.lastUrl = window.location.href;
//       if(isWeiXin()){
//         console.log(`微信浏览器`)
//         document.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?`+getCodeParamUri(getCodeParam);
//       }else{
//         console.log(`非微信浏览器`)
//         getCodeParam.appid = 'wx91ab75c357dae833'
//         getCodeParam.scope = 'snsapi_login'
      
//         document.location.href=`https://open.weixin.qq.com/connect/qrconnect?`+getCodeParamUri(getCodeParam);
//       }
//     }

// }
// export default {isWeiXin}
export { isWeiXin }