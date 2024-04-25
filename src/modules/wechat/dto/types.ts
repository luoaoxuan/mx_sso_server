// 微信服务器发来的消息
interface WechatParams{
    signature: string
    echostr: string,
    timestamp: string,
    nonce: string
  }