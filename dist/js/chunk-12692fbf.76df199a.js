(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-12692fbf"],{"3f54":function(t,e,a){"use strict";var n=a("cc23"),s=a.n(n);s.a},4230:function(t,e,a){"use strict";a.r(e);var n,s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page has-navbar",staticStyle:{transition:"none !important"}},[a("van-nav-bar",{attrs:{title:"积分商城",fixed:"",border:""}}),a("div",{staticClass:"page-content text-center "},[a("div",{staticClass:"scoreshop"},[a("div",{staticClass:"head-info"},[a("div",{staticClass:"head-info-block",on:{click:function(e){return t.toMyScore()}}},[a("i",{staticClass:"score-s"}),a("span",{staticClass:"text"},[t._v("\n            积分\n          ")]),a("span",{staticClass:"num"},[t._v("\n            "+t._s(t.user.score)+"\n          ")])]),a("div",{staticClass:"head-info-block",on:{click:function(e){return t.toMyScoreToGood()}}},[a("i",{staticClass:"record-s"}),a("span",{staticClass:"text"},[t._v("\n            兑换记录\n          ")])])]),a("div",{staticClass:"myMenu"},[a("div",{staticClass:"content"},[a("van-tabs",{attrs:{swipeable:"",animated:"",sticky:""},on:{change:t.vTabsChange},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},t._l(t.navArr,function(e,n){return a("van-tab",{key:n,attrs:{title:e.name}},[a("van-pull-refresh",{on:{refresh:function(e){return t.onRefresh(n)}},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[a("van-list",{directives:[{name:"show",rawName:"v-show",value:n==t.active,expression:"index == active"}],attrs:{finished:t.finished,error:t.error,"error-text":"请求失败，点击重新加载","finished-text":"没有更多了"},on:{"update:error":function(e){t.error=e},load:t.loadMoreData},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[a("div",{staticClass:"classItemList"},[t._l(t.classData[e.good_class_id],function(e,n){return a("div",{key:n,staticClass:"classItem",style:t.animationObj(n),on:{click:function(e){return t.changeBuyGoodIndex(n)}}},[a("div",{staticClass:"classItem-img"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.img,expression:"classItem.img"}],attrs:{width:"100%",height:"100%",alt:""}})]),a("div",{staticClass:"name"},[t._v("\n                        "+t._s(e.name)+"\n                      ")]),a("div",{staticClass:"price"},[t._v("\n                        "+t._s(e.score)),a("span",[t._v("积分")])])])}),t._l(t.classItemRes,function(t){return a("div",{staticClass:"classItemRes"})})],2)])],1)],1)}),1)],1)]),a("van-popup",{attrs:{"close-on-click-overlay":!0},model:{value:t.showBuyGood,callback:function(e){t.showBuyGood=e},expression:"showBuyGood"}},[t.showBuyGood?a("div",{staticClass:"buyGood"},[a("i",{staticClass:"close",on:{click:t.changeShowBuyGood}}),a("div",{staticClass:"buyGood-img"},[a("div",[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.classData[t.navArr[t.active].good_class_id][t.buyGoodIndex].img,expression:"classData[navArr[active].good_class_id][buyGoodIndex].img"}],attrs:{alt:"",height:"100%"}})])]),a("div",{staticClass:"buyGood-name"},[t._v("\n            "+t._s(t.classData[t.navArr[t.active].good_class_id][t.buyGoodIndex].name)+"\n          ")]),a("div",{staticClass:"con"},[a("div",{staticClass:"con-bolck",on:{click:t.toMyAddr}},[a("span",[t._v("地址")]),a("div",{staticStyle:{color:"#929292","max-width":"220px"}},[t._v("\n                "+t._s(t.defaultAddr.addr)+"\n              ")])]),a("div",{staticClass:"con-bolck"},[a("span",[t._v("购买数量")]),a("van-stepper",{attrs:{integer:"",min:1,max:100},model:{value:t.buyNum,callback:function(e){t.buyNum=e},expression:"buyNum"}})],1),a("div",{staticClass:"con-bolck"},[a("span",[t._v("型号")]),a("div",[t._v(t._s(t.classData[t.navArr[t.active].good_class_id][t.buyGoodIndex].spec))])]),a("div",{staticClass:"con-bolck"},[a("span",[t._v("兑换所需积分")]),a("div",[a("span",{staticClass:"price"},[t._v("\n                  "+t._s(t.buyNum*t.classData[t.navArr[t.active].good_class_id][t.buyGoodIndex].score)+"\n                ")]),t._v("积分\n              ")])])]),a("div",{staticClass:"buy",on:{click:function(e){return t.buyGood(t.classData[t.navArr[t.active].good_class_id][t.buyGoodIndex])}}},[t._v("\n            立即兑换\n          ")])]):t._e()]),a("MyTabbar",{attrs:{active:1}})],1)])],1)},i=[],r=(a("a481"),a("ac6a"),a("96cf"),a("3b8d")),o=a("bd86"),c=(a("e7e5"),a("d399")),u=(a("f06a"),a("20fb")),l=(a("8a58"),a("e41f")),d=(a("ab71"),a("58e6")),f=(a("2994"),a("2bdd")),h=(a("ac1e"),a("543e")),v=(a("5246"),a("6b41")),m=(a("bda7"),a("5e46")),p=(a("7f7f"),a("da3c"),a("0b33")),g=a("c621"),b=(a("5118"),a("3d39")),_=a("fb21"),y={components:(n={MyTabbar:b["a"]},Object(o["a"])(n,p["a"].name,p["a"]),Object(o["a"])(n,m["a"].name,m["a"]),Object(o["a"])(n,v["a"].name,v["a"]),Object(o["a"])(n,h["a"].name,h["a"]),Object(o["a"])(n,f["a"].name,f["a"]),Object(o["a"])(n,d["a"].name,d["a"]),Object(o["a"])(n,l["a"].name,l["a"]),Object(o["a"])(n,u["a"].name,u["a"]),Object(o["a"])(n,c["a"].name,c["a"]),n),data:function(){return{user:{},classItemRes:[0,0],navArr:[],classData:{},active:0,loading:!1,finished:!1,isLoading:!1,buyGoodIndex:0,buyNum:1,showBuyGood:!1,showRecords:!1,showProtocol:!1,showPrize:!1,error:!1,animationObj:function(t){return{animation:"show 0.5s ".concat(t%9/10,"s forwards")}},defaultAddr:{}}},created:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(){var e,a,n,s,i=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.user=_["a"].getUserData(),t.next=3,g["a"].get_score_index();case 3:if(e=t.sent,!(e&&e.data&&e.data.navList&&e.data.navList.length>0)){t.next=10;break}return this.navArr=e.data.navList,t.next=8,g["a"].get_score_store();case 8:a=t.sent,this.goodList=a.data;case 10:return t.next=12,g["a"].get_score_index();case 12:return n=t.sent,n&&n.data&&n.data.navList&&n.data.navList.length>0&&(this.navArr=n.data.navList,this.navArr.forEach(function(t,e){var a=t.score_class_id;i.navArr[e].good_class_id=a,i.initData(a,e),i.$set(i.navArr[e],"reflushLoading",!1)})),t.next=16,g["a"].get_default_addr();case 16:s=t.sent,s&&s.data&&(s.data.addr=s.data.addr.replace(/\/[0-9]*$/,""),this.defaultAddr=s.data);case 18:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),methods:{menuClicked:function(t){},getClassGoodsList:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(-1!=e){t.next=6;break}return t.next=3,g["a"].get_score_store();case 3:t.t0=t.sent,t.next=9;break;case 6:return t.next=8,g["a"].get_score_classroom({score_class_id:e});case 8:t.t0=t.sent;case 9:a=t.t0,a&&a.data&&(this.goodList=a.data);case 11:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),toMyScore:function(){this.$router.push("/mine/myscore")},toMyScoreToGood:function(){this.$router.push("/mine/score_to_good")},vTabsChange:function(t,e){var a=this.navArr[this.active].good_class_id;this.classData[a]&&this.classData[a][0].finished?this.finished=!0:this.finished=!1},initData:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e,a,n){var s,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!(!n&&this.classData[e]&&this.classData[e][0].page>1)){t.next=2;break}return t.abrupt("return");case 2:return s=1,t.next=5,g["a"].get_score_classroom({score_class_id:e,page:s});case 5:i=t.sent,i&&i.data&&i.data.length>0?(i.data[0].page=s,i.data[0].pageSize=i.data.length,this.$set(this.classData,e,i.data)):i&&i.data&&0==i.data.length?this.finished=!0:this.error=!0;case 7:case"end":return t.stop()}},t,this)}));function e(e,a,n){return t.apply(this,arguments)}return e}(),loadMoreData:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var a,n,s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return a=this.navArr[this.active].score_class_id,t.next=3,this.initData(a,this.active);case 3:if(this.classData[a]){t.next=6;break}return this.loading=!1,t.abrupt("return");case 6:if(!this.classData[a][0].finished){t.next=11;break}return this.finished=!0,t.abrupt("return");case 11:this.finished=!1;case 12:return n=this.classData[a][0].page,n++,t.next=16,g["a"].get_score_classroom({score_class_id:a,page:n});case 16:s=t.sent,s&&s.data&&s.data.length>0?(this.classData[a][0].page++,this.classData[a]=this.classData[a].slice(0,(n-1)*this.classData[a][0].pageSize).concat(s.data)):s&&s.data&&0==s.data.length?(this.$set(this.classData[a][0],"finished",!0),this.classData[a]&&this.classData[a][0]&&this.classData[a][0].page>2&&Object(c["a"])("我是有底线的~"),this.finished=!0):this.error=!0,this.loading=!1;case 19:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),onRefresh:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var a=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:setTimeout(Object(r["a"])(regeneratorRuntime.mark(function t(){var n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=a.navArr[e].good_class_id,a.classData[n]=null,a.finished=!1,t.next=5,a.initData(n,e,!0);case 5:a.$set(a.navArr[e],"reflushLoading",!1),a.isLoading=!1;case 7:case"end":return t.stop()}},t,this)})),500);case 1:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),changeShowBuyGood:function(){this.showBuyGood=!this.showBuyGood,this.buyNum=1},changeBuyGoodIndex:function(t){this.buyGoodIndex=t,this.showBuyGood=!0},buyGood:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,g["a"].score_to_gift({gift_id:e.good_id,addrid:this.defaultAddr.addr_id,num:this.buyNum});case 2:if(a=t.sent,!a||0!=a.errcode){t.next=11;break}return this.showBuyGood=!this.showBuyGood,Object(c["a"])("兑换成功,订单已生成，礼品很快送到你手中哟！"),t.next=8,_["a"].reloadUserData();case 8:this.user=_["a"].getUserData(),t.next=12;break;case 11:Object(c["a"])("兑换失败");case 12:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),toMyAddr:function(){this.$router.push("/mine/myaddress")}}},w=y,x=(a("3f54"),a("2877")),k=Object(x["a"])(w,s,i,!1,null,null,null);k.options.__file="Scoreshop.vue";e["default"]=k.exports},4362:function(t,e,a){e.nextTick=function(t){setTimeout(t,0)},e.platform=e.arch=e.execPath=e.title="browser",e.pid=1,e.browser=!0,e.env={},e.argv=[],e.binding=function(t){throw new Error("No such module. (Possibly not yet loaded)")},function(){var t,n="/";e.cwd=function(){return n},e.chdir=function(e){t||(t=a("df7c")),n=t.resolve(e,n)}}(),e.exit=e.kill=e.umask=e.dlopen=e.uptime=e.memoryUsage=e.uvCounters=function(){},e.features={}},5118:function(t,e,a){(function(t){var n="undefined"!==typeof t&&t||"undefined"!==typeof self&&self||window,s=Function.prototype.apply;function i(t,e){this._id=t,this._clearFn=e}e.setTimeout=function(){return new i(s.call(setTimeout,n,arguments),clearTimeout)},e.setInterval=function(){return new i(s.call(setInterval,n,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(n,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},a("6017"),e.setImmediate="undefined"!==typeof self&&self.setImmediate||"undefined"!==typeof t&&t.setImmediate||this&&this.setImmediate,e.clearImmediate="undefined"!==typeof self&&self.clearImmediate||"undefined"!==typeof t&&t.clearImmediate||this&&this.clearImmediate}).call(this,a("c8ba"))},6017:function(t,e,a){(function(t,e){(function(t,a){"use strict";if(!t.setImmediate){var n,s=1,i={},r=!1,o=t.document,c=Object.getPrototypeOf&&Object.getPrototypeOf(t);c=c&&c.setTimeout?c:t,"[object process]"==={}.toString.call(t.process)?h():v()?m():t.MessageChannel?p():o&&"onreadystatechange"in o.createElement("script")?g():b(),c.setImmediate=u,c.clearImmediate=l}function u(t){"function"!==typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),a=0;a<e.length;a++)e[a]=arguments[a+1];var r={callback:t,args:e};return i[s]=r,n(s),s++}function l(t){delete i[t]}function d(t){var e=t.callback,n=t.args;switch(n.length){case 0:e();break;case 1:e(n[0]);break;case 2:e(n[0],n[1]);break;case 3:e(n[0],n[1],n[2]);break;default:e.apply(a,n);break}}function f(t){if(r)setTimeout(f,0,t);else{var e=i[t];if(e){r=!0;try{d(e)}finally{l(t),r=!1}}}}function h(){n=function(t){e.nextTick(function(){f(t)})}}function v(){if(t.postMessage&&!t.importScripts){var e=!0,a=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=a,e}}function m(){var e="setImmediate$"+Math.random()+"$",a=function(a){a.source===t&&"string"===typeof a.data&&0===a.data.indexOf(e)&&f(+a.data.slice(e.length))};t.addEventListener?t.addEventListener("message",a,!1):t.attachEvent("onmessage",a),n=function(a){t.postMessage(e+a,"*")}}function p(){var t=new MessageChannel;t.port1.onmessage=function(t){var e=t.data;f(e)},n=function(e){t.port2.postMessage(e)}}function g(){var t=o.documentElement;n=function(e){var a=o.createElement("script");a.onreadystatechange=function(){f(e),a.onreadystatechange=null,t.removeChild(a),a=null},t.appendChild(a)}}function b(){n=function(t){setTimeout(f,0,t)}}})("undefined"===typeof self?"undefined"===typeof t?this:t:self)}).call(this,a("c8ba"),a("4362"))},cc23:function(t,e,a){},df7c:function(t,e,a){(function(t){function a(t,e){for(var a=0,n=t.length-1;n>=0;n--){var s=t[n];"."===s?t.splice(n,1):".."===s?(t.splice(n,1),a++):a&&(t.splice(n,1),a--)}if(e)for(;a--;a)t.unshift("..");return t}var n=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,s=function(t){return n.exec(t).slice(1)};function i(t,e){if(t.filter)return t.filter(e);for(var a=[],n=0;n<t.length;n++)e(t[n],n,t)&&a.push(t[n]);return a}e.resolve=function(){for(var e="",n=!1,s=arguments.length-1;s>=-1&&!n;s--){var r=s>=0?arguments[s]:t.cwd();if("string"!==typeof r)throw new TypeError("Arguments to path.resolve must be strings");r&&(e=r+"/"+e,n="/"===r.charAt(0))}return e=a(i(e.split("/"),function(t){return!!t}),!n).join("/"),(n?"/":"")+e||"."},e.normalize=function(t){var n=e.isAbsolute(t),s="/"===r(t,-1);return t=a(i(t.split("/"),function(t){return!!t}),!n).join("/"),t||n||(t="."),t&&s&&(t+="/"),(n?"/":"")+t},e.isAbsolute=function(t){return"/"===t.charAt(0)},e.join=function(){var t=Array.prototype.slice.call(arguments,0);return e.normalize(i(t,function(t,e){if("string"!==typeof t)throw new TypeError("Arguments to path.join must be strings");return t}).join("/"))},e.relative=function(t,a){function n(t){for(var e=0;e<t.length;e++)if(""!==t[e])break;for(var a=t.length-1;a>=0;a--)if(""!==t[a])break;return e>a?[]:t.slice(e,a-e+1)}t=e.resolve(t).substr(1),a=e.resolve(a).substr(1);for(var s=n(t.split("/")),i=n(a.split("/")),r=Math.min(s.length,i.length),o=r,c=0;c<r;c++)if(s[c]!==i[c]){o=c;break}var u=[];for(c=o;c<s.length;c++)u.push("..");return u=u.concat(i.slice(o)),u.join("/")},e.sep="/",e.delimiter=":",e.dirname=function(t){var e=s(t),a=e[0],n=e[1];return a||n?(n&&(n=n.substr(0,n.length-1)),a+n):"."},e.basename=function(t,e){var a=s(t)[2];return e&&a.substr(-1*e.length)===e&&(a=a.substr(0,a.length-e.length)),a},e.extname=function(t){return s(t)[3]};var r="b"==="ab".substr(-1)?function(t,e,a){return t.substr(e,a)}:function(t,e,a){return e<0&&(e=t.length+e),t.substr(e,a)}}).call(this,a("4362"))}}]);
//# sourceMappingURL=chunk-12692fbf.76df199a.js.map