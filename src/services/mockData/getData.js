
// let data = Mock.mock({
//     data:{
//         'data|10':[{
//             'good_id|+1':1,
//             'name':'@cname',
//             'change_coins|20-1000':20,
//             'state':'1',
//             'sale_price|200-500':200,
            
//         }],
//         errcode:0,
//         errmsg:"ok"
//     }
// })
// console.log(data)

export const templateData = {
    login:{"data":{"account":"wx_o5_aPwQGiw67_1C-UAfBjvjLtL3g","userid":519207,"name":"🇳 🇪 🇳 🇬","headimg":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL7qTkic32MtOY1QF0TrmxzbDicyM4wMMru5bZRaYsRRhAhdXxAaZgDzicupysV5llJBtZ4NZaTGN1pQ/132","lv":1,"shared":0,"first_login":"0","score":2066,"coins":58940,"ticket":1134,"luckybag":0,"money":364,"mask":949,"alipay_account":null,"token":null,"all_money":364,"sex":5,"invitor_coins":"10","invitor":"244971","version_time":"0","qd_day":0,"certification":0,"real_name":null,"id_no":null,"qd_state":0,"qd_word":"连续签到，奖励越多哦！","show_notice":"0","show_score_notice":"0","first_time_login":"0","first_time_login_word":"注册赠送0娃娃币","has_invitor":"1","has_shared":"1","invitor_state":"1","regiser_coins":"0","share_coins":"10","share_word":"分享越多越幸运!","invitor_cnt":4,"invitor_all_cnt":10,"first_pay":1,"first_pay_day":0,"attention":"1","new_gift_wawa":0,"stamp":0,"agent":"941018","music_list":[],"packet_state":1,"packet_display_state":1,"mobile":null,"ad_times":1,"ad_all_times":1,"stamp_state":0,"agent_share_url":"","wechat_review":"0","wechat_mini_iosPay":"0","show_luckybag_pro":"0","show_egg_pro":"0","show_mask_pro":"1","checkAgent":0,"agent_fans_img":"http://www.wjwlzwawa.com/H5GameImg/1550020890503.jpeg","orange":40,"wechatpay_display":0,"alipay_reward":"0"},"errcode":0,"errmsg":"ok"},                
    index:{
        'data':
        {
            'notice|2':[{
                'notice_id|+1':1,
                'type':'1',
                'msg':'活动',
                'img_url':'@image',
                'title':'口红粉活动',
                'targetUrl':'@image',
                'targetState':0
            }],
            'mac_list':[],
            'navArr|10':[{
                'good_class_id|+1':1,
                'name':'@clast',
                'level':1,
                'class_img':'@image',
                'state':1,
                'game_type':11
            }]
        },
        'errcode':0,
        'errmsg':"ok"
    },                 
    
    get_lipstick_gift:'/get_lipstick_gift',                  
    get_classroom_data_h5:{
        'data|10':[{
            'good_id|+1':1,
            'name':'@ctitle',
            'img':'@image',
            'change_coins|20-1000':20,
            'state':'1',
            'sale_price|200-500':200,
        }],
        'errcode':0,
        'errmsg':"ok"
    },                 
    get_score_index:{
        'data':
        {
            'navList|10':[{
                'score_class_id|+1':1,
                'name':'@cword',
                'level':1,
                'class_img':'@image',
                'state':1,
                'game_type':11
            }]
        },
        'errcode':0,
        'errmsg':"ok"
    },                  
    get_score_store:{
        'data|10':[{
            'good_id|+1':1,
            'name':'@cword',
            'img':'@image',
            'change_coins|200-10000':20,
            'state':'1',
            'sale_price|200-500':200,
        }],
        'errcode':0,
        'errmsg':"ok"
    },                  
    get_score_classroom:{
        'data|10':[{
            'good_id|+1':1,
            'name':'@cword',
            'img':'@image',
            'change_coins|200-10000':20,
            'state':'1',
            'sale_price|200-500':200,
        }],
        'errcode':0,
        'errmsg':"ok"
    },  
       
    /**
     * 抽奖
     * @param type Number   抽奖类型（0：试玩，1：真实抽奖）
     * @param luckybag_id Number   盒子类型（默认1）
     * @param play_times Number   次数（数量）
     * @param sign Number   游戏类型
     */
    get_luckybag:'/get_luckybag',  
    /**
     * 获取奖品库数据
     */
    get_lucky_bag_data_new:{
        'data':{
            'luckybag_id':1,
            'luckybag_data|10':[
                {
                    'egg_good_type|1-2':1,
                    'type_name':'@ctitle',
                    'good_list|10':[{
                        'good_id|1-125':1,
                        'name':'@ctitle',
                        'img':'@image',
                        'price|1-999':1,
                        'change_coins|200-10000':20,
                        'spec':'@cword',
                    }]

                }
            ]
           

        },
        'errcode':0,
        'errmsg':"ok"
    },  
    /**
     * 获取抽奖记录
     * @param records_type Number   游戏类型
     */
    get_luckybag_records:{
        'data|10':[{
            'time':'@date',
            'result|1-10':1,
            'good_name':'@cword',
            'good_img':'@image',
            'name':'@cname',
            'headimg':'@image',

        }],
        'errcode':0,
        'errmsg':"ok"
    },  
    /**
     * 获取我的娃娃 
     */ 
    get_my_wawa:{
        'data|10':[{
            'id|+1':44986,
            'total|7-10':7,
            'change_num|0-7':0,
            'type':14,
            'name':'@cname',
            'img':'@image',
            'change_coins|10-52':10,
            'change_score|10-522':10,

        }],
        'errcode':0,
        'errmsg':"ok"
    },  

    /**
     * 地址管理 
     */           
    get_address:{
        'data|1-3':[{
            'addr_id|1-565':1,
            'addr':'@region',
            'tel':'12548467751',
            'name':'@cname',
            'state|0-1':0,
        }],
        'errcode':0,
        'errmsg':"ok"
    },                  
    add_address:'/add_address',                  
    delete_address:'/delete_address',                  
    update_address:'/update_address',                  
    set_addr_default:'/set_addr_default',  
    
    /**
     * 获取我的娃娃 
     */ 
    get_default_addr:{
        'data':{
            'addr_id|1-565':1,
            'addr':'@area',

        },
        'errcode':0,
        'errmsg':"ok"
    },  
    /**
     * 发货
     * @param good_arr: [{"goodid":2691,"num":1}]
     * @param addrid: 8624
     * @param game_type: 14
     */
    wawa_to_user:'/wawa_to_user',

    /**
     * 获取订单列表 
     */
    get_order_list:{
        'data|20':[{
            'id|+1':1,
            'ord_id':'ND38211550908255149519207',
            'time':'@date',
            'state':0,
            'name':'@cname',
            'tel':'15468745541',
            'addr':'@region',
        }],
        'errcode':0,
        'errmsg':"ok"
    },
    /**
     * 获取订单详情
     * @param orderid: LKOT1548318250326941018
     */
    get_order_by_id:'/get_order_by_id',
    /**
     * 获取物流信息
     * @param orderid: LKOT1548318250326941018
     */
    get_post_info:'/get_post_info',

    /**
     * 获取积分获取账单 
     */ 
    get_score_bills:{
        'data|20':[{
            'id|+1':1,
            'ord_id':'BK1550661145979519207',
            'time':'@date',
            'state':0,
            'name':'@word',
            'img':'@image',
        }],
        'errcode':0,
        'errmsg':"ok"
    },
    /**
     * 获取积分支出账单 
     */ 
    get_score_pay_bills:{
        'data|20':[{
            'id|+1':1,
            'ord_id':'BK1550661145979519207',
            'time':'@date',
            'state':0,
            'name':'@word',
            'img':'@image',
        }],
        'errcode':0,
        'errmsg':"ok"
    },

    /**
     * 提交反馈
     * @param mac_no       //手机信息
     * @param msg          //反馈建议内容
     * @param version      //应用版本号
     * @param op           //系统 1：ios,0:android
     */     
    add_suggest:'/add_suggest',
    /**
     * 积分商城兑换
     * @param gift_id       //商品id
     * @param addrid        //地址id
     * @param num           //数量
     */ 
    score_to_gift:'/score_to_gift',
    /**
     * 获取玩家信息 
     */ 
    get_user_info:{"data":{"account":"wx_o5_aPwQGiw67_1C-UAfBjvjLtL3g","userid":519207,"name":"🇳 🇪 🇳 🇬","headimg":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL7qTkic32MtOY1QF0TrmxzbDicyM4wMMru5bZRaYsRRhAhdXxAaZgDzicupysV5llJBtZ4NZaTGN1pQ/132","lv":1,"shared":0,"first_login":"0","score":2066,"coins":58940,"ticket":1134,"luckybag":0,"money":364,"mask":949,"alipay_account":null,"token":null,"all_money":364,"sex":5,"invitor_coins":"10","invitor":"244971","version_time":"0","qd_day":0,"certification":0,"real_name":null,"id_no":null,"qd_state":0,"qd_word":"连续签到，奖励越多哦！","show_notice":"0","show_score_notice":"0","first_time_login":"0","first_time_login_word":"注册赠送0娃娃币","has_invitor":"1","has_shared":"1","invitor_state":"1","regiser_coins":"0","share_coins":"10","share_word":"分享越多越幸运!","invitor_cnt":4,"invitor_all_cnt":10,"first_pay":1,"first_pay_day":0,"attention":"1","new_gift_wawa":0,"stamp":0,"agent":"941018","music_list":[],"packet_state":1,"packet_display_state":1,"mobile":null,"ad_times":1,"ad_all_times":1,"stamp_state":0,"agent_share_url":"","wechat_review":"0","wechat_mini_iosPay":"0","show_luckybag_pro":"0","show_egg_pro":"0","show_mask_pro":"1","checkAgent":0,"agent_fans_img":"http://www.wjwlzwawa.com/H5GameImg/1550020890503.jpeg","orange":40,"wechatpay_display":0,"alipay_reward":"0"},"errcode":0,"errmsg":"ok"},
     /**
     * 积分兑奖商品记录 
     */ 
    get_change_gift_records:'/get_change_gift_records',




   
};