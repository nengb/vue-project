
import wechatAut from'./wechatAut'
import jssdk from'./wechatConf'
import wechatBuy from'./wechatBuy'

window.wxTool = { jssdk,wechatBuy,...wechatAut }
export default { jssdk,wechatBuy,...wechatAut }
