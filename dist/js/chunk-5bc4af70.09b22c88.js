(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5bc4af70"],{1146:function(t,e,i){},"2f32":function(t,e,i){},4848:function(t,e,i){"use strict";i.r(e);var n,s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page has-navbar",staticStyle:{transition:"none !important"}},[i("van-nav-bar",{attrs:{title:"联系客服",fixed:"",border:"","left-arrow":""},on:{"click-left":t.onClickLeft}}),i("div",{staticClass:"page-content text-center "},[i("div",{staticClass:"customer"},[i("div",{staticClass:"content"},[i("van-field",{attrs:{type:"textarea",placeholder:"请将你遇到的问题产品建议反馈给我们，建议你描述清楚，时间，哪个房间，尽可能详细的问题描述便于运营的童鞋帮你解决（200字以内）",rows:"1",autosize:t.autosize,maxlength:"200"},model:{value:t.message,callback:function(e){t.message=e},expression:"message"}})],1),i("div",{staticClass:"sendBtn",on:{click:t.sendCustomerMsg}},[t._v("\n        发送\n      ")])])])],1)},r=[],a=i("0a0d"),o=i.n(a),c=(i("96cf"),i("3b8d")),l=i("bd86"),u=(i("e7e5"),i("d399")),h=(i("68ef"),i("1146"),i("565f")),f=(i("7f7f"),i("5246"),i("6b41")),d=i("c621"),b={components:(n={},Object(l["a"])(n,f["a"].name,f["a"]),Object(l["a"])(n,h["a"].name,h["a"]),Object(l["a"])(n,u["a"].name,u["a"]),n),data:function(){return{navArr:[],goodList:[],autosize:{minHeight:146},message:"",lastSendMsgTime:0}},created:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),methods:{onClickLeft:function(){this.$router.back()},checkMsg:function(){return 0!=this.lastSendMsgTime&&o()()-this.lastSendMsgTime<=5e3?(Object(u["a"])("发送频率过快"),!1):0!=this.message.length||(Object(u["a"])("请输入要反馈的内容！"),!1)},sendCustomerMsg:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){var e,i,n,s,r,a,c;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!this.checkMsg()){t.next=12;break}return navigator,e=navigator.userAgent,i=e.indexOf("Android")>-1||e.indexOf("Adr")>-1,n=i?0:1,s=navigator.appVersion,r=this.message,a=window.version,t.next=10,d["a"].add_suggest({op:n,mac_no:s,msg:r,version:a});case 10:c=t.sent,c&&0==c.errcode?(Object(u["a"])("发送成功"),this.message="",this.lastSendMsgTime=o()()):Object(u["a"])("发送失败");case 12:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()}},g=b,p=(i("edfc"),i("2877")),m=Object(p["a"])(g,s,r,!1,null,null,null);m.options.__file="Customer.vue";e["default"]=m.exports},"565f":function(t,e,i){"use strict";var n=i("2638"),s=i.n(n),r=i("c31d"),a=i("a142"),o=i("ad06"),c=i("7744"),l=i("dfaf"),u=Object(a["i"])("field"),h=u[0],f=u[1];e["a"]=h({inheritAttrs:!1,props:Object(r["a"])({},l["a"],{error:Boolean,leftIcon:String,rightIcon:String,readonly:Boolean,clearable:Boolean,labelAlign:String,inputAlign:String,onIconClick:Function,autosize:[Boolean,Object],errorMessage:String,type:{type:String,default:"text"}}),data:function(){return{focused:!1}},watch:{value:function(){this.$nextTick(this.adjustSize)}},mounted:function(){this.format(),this.$nextTick(this.adjustSize)},computed:{showClear:function(){return this.clearable&&this.focused&&""!==this.value&&Object(a["d"])(this.value)&&!this.readonly},listeners:function(){return Object(r["a"])({},this.$listeners,{input:this.onInput,keypress:this.onKeypress,focus:this.onFocus,blur:this.onBlur})}},methods:{focus:function(){this.$refs.input&&this.$refs.input.focus()},blur:function(){this.$refs.input&&this.$refs.input.blur()},format:function(t){void 0===t&&(t=this.$refs.input);var e=t,i=e.value,n=this.$attrs.maxlength;return"number"===this.type&&Object(a["d"])(n)&&i.length>n&&(i=i.slice(0,n),t.value=i),i},onInput:function(t){this.$emit("input",this.format(t.target))},onFocus:function(t){this.focused=!0,this.$emit("focus",t),this.readonly&&this.blur()},onBlur:function(t){this.focused=!1,this.$emit("blur",t)},onClickLeftIcon:function(){this.$emit("click-left-icon")},onClickRightIcon:function(){this.$emit("click-icon"),this.$emit("click-right-icon"),this.onIconClick&&this.onIconClick()},onClear:function(t){t.preventDefault(),this.$emit("input",""),this.$emit("clear")},onKeypress:function(t){if("number"===this.type){var e=t.keyCode,i=-1===String(this.value).indexOf("."),n=e>=48&&e<=57||46===e&&i||45===e;n||t.preventDefault()}"search"===this.type&&13===t.keyCode&&this.blur(),this.$emit("keypress",t)},adjustSize:function(){var t=this.$refs.input;if("textarea"===this.type&&this.autosize&&t){t.style.height="auto";var e=t.scrollHeight;if(Object(a["e"])(this.autosize)){var i=this.autosize,n=i.maxHeight,s=i.minHeight;n&&(e=Math.min(e,n)),s&&(e=Math.max(e,s))}e&&(t.style.height=e+"px")}},renderInput:function(){var t=this.$createElement,e={ref:"input",class:f("control",this.inputAlign),domProps:{value:this.value},attrs:Object(r["a"])({},this.$attrs,{readonly:this.readonly}),on:this.listeners};return"textarea"===this.type?t("textarea",s()([{},e])):t("input",s()([{attrs:{type:this.type}},e]))},renderLeftIcon:function(){var t=this.$createElement,e=this.slots("left-icon")||this.leftIcon;if(e)return t("div",{class:f("left-icon"),on:{click:this.onClickLeftIcon}},[this.slots("left-icon")||t(o["a"],{attrs:{name:this.leftIcon}})])},renderRightIcon:function(){var t=this.$createElement,e=this.slots,i=e("right-icon")||e("icon")||this.rightIcon||this.icon;if(i)return t("div",{class:f("right-icon"),on:{click:this.onClickRightIcon}},[e("right-icon")||e("icon")||t(o["a"],{attrs:{name:this.rightIcon||this.icon}})])}},render:function(t){var e,i=this.slots,n=this.labelAlign,s={icon:this.renderLeftIcon};return i("label")&&(s.label=function(){return i("title")}),t(c["a"],{attrs:{icon:this.leftIcon,title:this.label,center:this.center,border:this.border,isLink:this.isLink,required:this.required,titleClass:f("label",n)},class:f((e={error:this.error,disabled:this.$attrs.disabled},e["label-"+n]=n,e["min-height"]="textarea"===this.type&&!this.autosize,e)),scopedSlots:s},[t("div",{class:f("body")},[this.renderInput(),this.showClear&&t(o["a"],{attrs:{name:"clear"},class:f("clear"),on:{touchstart:this.onClear}}),this.renderRightIcon(),i("button")&&t("div",{class:f("button")},[i("button")])]),this.errorMessage&&t("div",{class:f("error-message")},[this.errorMessage])])}})},7744:function(t,e,i){"use strict";var n=i("c31d"),s=i("2638"),r=i.n(s),a=i("a142"),o=i("dfaf"),c=i("ba31"),l=i("48f4"),u=i("ad06"),h=Object(a["i"])("cell"),f=h[0],d=h[1];function b(t,e,i,n){var s=e.icon,o=e.size,h=e.title,f=e.label,b=e.value,g=e.isLink,p=e.arrowDirection,m=i.title||Object(a["d"])(h),v=i.default||Object(a["d"])(b),k=m&&t("div",{class:[d("title"),e.titleClass]},[i.title?i.title():t("span",[h]),f&&t("div",{class:[d("label"),e.labelClass]},[f])]),C=v&&t("div",{class:[d("value",{alone:!i.title&&!h}),e.valueClass]},[i.default?i.default():t("span",[b])]),y=i.icon?i.icon():s&&t(u["a"],{class:d("left-icon"),attrs:{name:s}}),j=i["right-icon"],O=j?j():g&&t(u["a"],{class:d("right-icon"),attrs:{name:p?"arrow-"+p:"arrow"}}),x=function(t){Object(c["a"])(n,"click",t),Object(l["a"])(n)},$={center:e.center,required:e.required,borderless:!e.border,clickable:g||e.clickable};return o&&($[o]=o),t("div",r()([{class:d($),on:{click:x}},Object(c["b"])(n)]),[y,k,C,O,i.extra&&i.extra()])}b.props=Object(n["a"])({},o["a"],l["c"],{size:String,clickable:Boolean,arrowDirection:String}),e["a"]=f(b)},dfaf:function(t,e,i){"use strict";i.d(e,"a",function(){return n});var n={icon:String,center:Boolean,isLink:Boolean,required:Boolean,titleClass:null,valueClass:null,labelClass:null,title:[String,Number],value:[String,Number],label:[String,Number],border:{type:Boolean,default:!0}}},edfc:function(t,e,i){"use strict";var n=i("2f32"),s=i.n(n);s.a}}]);
//# sourceMappingURL=chunk-5bc4af70.09b22c88.js.map