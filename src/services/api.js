

// //所有api请求路径
//get请求
export const get = {

    index:'/index',                 
    
    get_lipstick_gift:'/get_lipstick_gift',                  
    get_classroom_data_h5:'/get_classroom_data_h5',                 
    get_score_index:'/get_score_index',                  
    get_score_store:'/get_score_store',                  
    get_score_classroom:'/get_score_classroom',  
       
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
    get_lucky_bag_data_new:'/get_lucky_bag_data_new',  
    /**
     * 获取抽奖记录
     * @param records_type Number   游戏类型
     */
    get_luckybag_records:'/get_luckybag_records',  
    /**
     * 获取我的娃娃 
     */ 
    get_my_wawa:'/get_my_wawa',  

    /**
     * 地址管理 
     */           
    get_address:'/get_address',                  
    add_address:'/add_address',                  
    delete_address:'/delete_address',                  
    update_address:'/update_address',                  
    set_addr_default:'/set_addr_default',  
    
    /**
     * 获取我的娃娃 
     */ 
    get_default_addr:'/get_default_addr',  
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
    get_order_list:'/get_order_list',
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
    get_score_bills:'/get_score_bills',
    /**
     * 获取积分支出账单 
     */ 
    get_score_pay_bills:'/get_score_pay_bills',

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
    get_user_info:'/get_user_info',
     /**
     * 积分兑奖商品记录 
     */ 
    get_change_gift_records:'/get_change_gift_records',




   
};


//post请求
export const post = {
    // agent_login:'/agentLogin',                      //登录获取凭证
    // report_pipe_data:'/report_pipe_data',           //上报机器货道信息
    // add_good:'/add_good',                           //添加商品
}