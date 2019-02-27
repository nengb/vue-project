
class ServerConfig{
    constructor(){
        //连接服务器的请求地址
  

        this.loca_key = '!@$%&S&@'
        
        // this.httpAddress=`http://${this.ip}:9001`

        //使用mock模拟数据
        this.httpAddress = 'mock'


        //socket
        this.socketAddress = `${this.ip}:10000`
        this.imgAddress = `http://${this.ip}/web_h5/dist/img_aiqu_pink`
    }
    getUrlAesData(type,attr){
        var url = document.location.href;
        let a = decodeURIComponent(url.split('data=')[1])
        return a
    }
    getHashSearch(){
        let a = window.location.hash.split('?');
        return a[1]?'?'+a[1]:''
    }
    //解析地址栏参数
    getQueryStringArgs(urlSearch) {

        let qs = "";
        if(urlSearch.length > 0){
            let n = urlSearch.split('?')
            qs = n.length==2 ? n[1]:n[0]
        }
        let args = {};
        let items = qs.length ? qs.split("&") : [];
        let item = null;
        let name = null;
        let value = null;
        let i = 0;
        let len = items.length;
    
        for (i = 0; i < len; i++) {
            item = items[i].split("=");
            
            // decodeURIComponent解码
            // name = decodeURIComponent(item[0]);
            // value = decodeURIComponent(item[1]);
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            
            
            if (name.length) {
                args[name] = value;
            }
        }
    
        return args;
    }
    //解析加密地址栏参数
    getQueryStringArgsAes(){
        let data = this.getUrlAesData();
        let urlSearch = AesDecrypt(data, this.loca_key, 128);
        try {
            data = JSON.parse(urlSearch)
        } catch (error) {
            data = {}
        }
        return data;
    }
    //地址栏参数加密传输
    genQueryString(path,query){
        try {
            query = JSON.stringify(query)
        } catch (error) {
            
        }
        // let str = ''
        // for(let key in query){
        //     str += `${key}=${query[key]}&`
        // }
        // str = str.slice(0,str.length-1);
    
        let urlSearch = AesEncrypt(query, this.loca_key, 128);
        let urlSearchAes = AesDecrypt(urlSearch, this.loca_key, 128);
 
        urlSearch = encodeURIComponent(urlSearch)
        let url = path+'?data='+urlSearch;
        return url;
    }
    //获取token
    getToken(){
        return sessionStorage.token
    }
    formatTime (date){
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        return [year, month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
     }
     formatNumber(n){
        n = n.toString()
        return n[1] ? n : '0' + n
      }
    getTime(dateTimeStamp){
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = Date.parse(new Date());
        var diffValue = now - dateTimeStamp;
      
        if (diffValue < 0) { return '时间格式错误'; }
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
      
        var result = ''
        if (monthC >= 1) {
          result = "" + parseInt(monthC) + "月前";
        }
      
        else if (weekC >= 1) {
          result = "" + parseInt(weekC) + "周前";
        }
        else if (dayC >= 1) {
          result = "" + parseInt(dayC) + "天前";
        }
        else if (hourC >= 1) {
          result = "" + parseInt(hourC) + "小时前";
        }
        else if (minC >= 1) {
          result = "" + parseInt(minC) + "分钟前";
        } else {
          result = "刚刚";
        }
          
        return result;
    }
    
 
}

//绑定this
function selfish(target) {
    const cache = new WeakMap();
    const handler = {
        get(target, key) {
            const value = Reflect.get(target, key);
            if (typeof value !== 'function') {
                return value;
            }
            if (!cache.has(value)) {
                cache.set(value, value.bind(target));
            }
            return cache.get(value);
        }
    };
    const proxy = new Proxy(target, handler);
    return proxy;
}



window.serverConfig = selfish(new ServerConfig());

export default window.serverConfig;