
import { isWeiXin } from'./wechatAut'
import jssdk from'./wechatConf'
import wechatBuy from'./wechatBuy'

window.wxTool = { isWeiXin,jssdk,wechatBuy }
export default { isWeiXin,jssdk,wechatBuy }
