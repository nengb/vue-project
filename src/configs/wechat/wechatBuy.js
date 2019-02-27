import wechatAut from "./wechatAut";
let { isWeiXin } = wechatAut;

let { serverConfig, getData } = window;
// eslint-disable-next-line
let { ip, httpAddress, socketAddress, imgAddress, getHrefNew, getQueryString } = serverConfig;
window.paying = false;
class wechatBuy{
    constructor(){
    }
    //向服务端请求微信支付 公众号支付
    async get_wechatPay_h5(data) {
        if(window.paying){
            return;
        }
        // console.log('微信充值发送请求', data)
        // console.log(isWeiXin())
        if (!isWeiXin()) {
            // alert("不是微信登陆或不是微信浏览器~不支持微信充值哟!")
            // $toast.show('不是微信登陆或不是微信浏览器~不支持微信充值哟!', 1000)
            return false;
        }
        window.paying  = true;
        // $loading.show('正在支付..')
        let ret = await getData({url:`${httpAddress}/get_wechatPay_h5`,post:data})
        // console.log("微信充值测试哟!!", ret);
        
        if (ret && ret.errcode == 0) {
        // eslint-disable-next-line
             if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){

                    document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
                }else if (document.attachEvent){

                    document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady); 
                    document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
                }
             }else{
                return await this.onBridgeReady(ret.data);
             }

         
        } else {
            // alert('微信充值失败:' + JSON.stringify(ret))
            // $toast.show('微信充值失败'+JSON.stringify(ret), 1000)
        }

        // $loading.hide()
        window.paying = false;
        return false;


    }
    onBridgeReady(saveData) {
        // $loading.hide()
        // eslint-disable-next-line
        return new Promise((resolve,reject)=>{
        // eslint-disable-next-line
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', saveData,
                function (res) {
                    window.paying = false;

                    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        // $toast.show('支付成功', 1000)
                        resolve(true)
                    } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                        // $toast.show('取消支付', 1000)
                    }
                    else {
                        // $toast.show(res.err_msg, 1000)
                    }
                    resolve(false);

                }
            );

        })
    }
}

export default new wechatBuy()
