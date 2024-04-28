import request from "./request";
enum API {
    ACCESS_TOKEN = 'https://api.weixin.qq.com/cgi-bin/stable_token',
    TICKET = 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=',
    MENU = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token='
}

interface AccessTokenParams {
    grant_type: 'client_credential',
    appid: string
    secret: string
}
interface AccessTokenResponse {
    access_token: string;
    expires_in: number;
}

interface TicketParams {
    action_name: 'QR_STR_SCENE',
    expire_seconds: number,
    scene_str: string
}

interface MenuParams {
    button: {
        name: string,
        sub_button:any[],
        // [index: string]: any
    }[]
}

const menu:MenuParams = {
    button: [{
      name: '测试',
      sub_button: [
        {
          type: "view",
          name: "慕旋博客",
          url: "https://www.lax8.com"
        },
      ]
    }]
  }


// 获取access_token 
export const getAccessToken = (data: AccessTokenParams): Promise<AccessTokenResponse> => request.post(API.ACCESS_TOKEN, data)

// 生成二维码
export const createTicket = (data: TicketParams, access_token: string) => request.post(API.TICKET + access_token, data)

// 生成自定义菜单
export const createMenu = async (data: MenuParams=menu, access_token?: string) => {
    if (!access_token) {
        const res = await getAccessToken({
            appid: process.env.WX_APPID || '',
            secret: process.env.WX_APPSECRET || '',
            grant_type: 'client_credential'
        })
        access_token = res.access_token
    }
    return request.post(API.MENU + access_token, data)
}