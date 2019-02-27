//微信登录
import serverConfig from '../serverConfig';
// eslint-disable-next-line
let { ip, httpAddress, socketAddress, imgAddress, getHrefNew, getQueryString,location,href,getHashSearch,getQueryStringArgs } = serverConfig;
import http from '../net/http';
import get from '../../services/get';

function isWeiXin() {
  let ua = window.navigator.userAgent.toLowerCase();
  // console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}
// eslint-disable-next-line
function getCodeParamUri({appid,redirect_uri,response_type,scope,state}){
  return `appid=`+appid+`&redirect_uri=`+encodeURIComponent(redirect_uri)+`&response_type=`+response_type+`&scope=`+scope+`&state=`+state+`#wechat_redirect`;
}

async function login(){
  if(sessionStorage.user){
    return;
  }

    var u = navigator.userAgent;  
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端  
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
    if(isAndroid){
      sessionStorage.os="Android";
    }
    else if(isiOS){
      sessionStorage.os="IOS";
    }
    var brower= isWeiXin()?0:1;
    let loginHttp;
    let account;
    account = 'wx_o5_aPwQGiw67_1C-UAfBjvjLtL3g';
  
    // if(process.env.NODE_ENV == 'production'){
    //   if(sessionStorage.code){
    //     var wechat_auth= await http.getData({url:`${httpAddress}/wechat_auth?code=${sessionStorage.code}&os=${sessionStorage.os}&brower=${brower}`})
    //     // var wechat_auth= await getData({url:`http://118.190.32.2:9000/wechat_auth?code=${sessionStorage.code}&os=${sessionStorage.os}&brower=${brower}`})
    //     if(wechat_auth && wechat_auth.errcode == 0){
    //       account = wechat_auth.account;
    //       sessionStorage.openid = wechat_auth.openid;
    //       sessionStorage.unionid = wechat_auth.unionid;
    //       sessionStorage.account = wechat_auth.account;

    //     }
    //   } else{
    //     // if(!sessionStorage.reloadTime){
    //     //   sessionStorage.reloadTime = 0;
    //     // }
    //     // sessionStorage.reloadTime = Number(sessionStorage.reloadTime)+1
    //     // if(sessionStorage.reloadTime-10<=0){
    //     //   window.location.reload();
    //     // }

    //   } 
    // }else{

    //   //开发模式-测试号
    //   account = 'wx_o5_aPwQGiw67_1C-UAfBjvjLtL3g';
    // }
    
    if(account){
      sessionStorage.account = account;
      loginHttp = await http.getData({url:`${httpAddress}/login`,post:{account}})
      if(loginHttp && loginHttp.constructor === Object){
        //最后更新时间
        loginHttp.data.alterTime = Date.now();
        sessionStorage.setItem(`user`,JSON.stringify(loginHttp.data))
        // window.location.reload();
      }
    }else{
      // sessionStorage.clear()
      // window.location.reload();
    }

}

function getUserData(){
try {
  let user = JSON.parse(sessionStorage.getItem('user'));
  if(user){
    return user;
  }
} catch (error) {

  // sessionStorage.clear();
  // window.location.reload();
}

}

async function reloadUserData(){
    let user = await get.get_user_info()
    if(user && user.data){
      let oldUser = getUserData();
      //最后更新时间
      user.data.alterTime = Date.now();
      let newUser = Object.assign(oldUser,user.data);
      sessionStorage.setItem(`user`,JSON.stringify(newUser))
    }
}

// if(process.env.NODE_ENV == 'production'){
//     if(!sessionStorage.user && !sessionStorage.code){
//       // console.log(`缓存中没有code，跳转授权`)
//       let getCodeParam = {
//         appid : 'wx80d89540f633913a',
//         redirect_uri : 'http://mmz.csxtech.com.cn/buy_test/c.html',
//         response_type : 'code',
//         scope : 'snsapi_userinfo',
//         state : 'STATE',
//       }
    
//       sessionStorage.lastUrl = window.location.href;
//       if(isWeiXin()){
//         // console.log(`微信浏览器`)
//         document.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?`+getCodeParamUri(getCodeParam);
//       }else{
//         // console.log(`非微信浏览器`)
//         // getCodeParam.appid = 'wx91ab75c357dae833'
//         getCodeParam.scope = 'snsapi_login'
      
//         document.location.href=`https://open.weixin.qq.com/connect/qrconnect?`+getCodeParamUri(getCodeParam);
//       }
//     }

// }
// export default {isWeiXin}
export default { isWeiXin,login,getUserData,reloadUserData }