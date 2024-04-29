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
        sub_button: any[],
        // [index: string]: any
    }[]
}

const defaultMenu: MenuParams = {
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
// const defaultAppData:AccessTokenParams = {
//     appid: process.env.WX_APPID || '',
//     secret: process.env.WX_APPSECRET || '',
//     grant_type: 'client_credential'
// }

const defaultTicket:TicketParams={
    action_name:'QR_STR_SCENE',
    expire_seconds:60*2,
    scene_str:Date.now()+'-'+Math.floor(Math.random()*1000000)
}


// 获取access_token 
export const getAccessToken = (data: AccessTokenParams = {
    appid: process.env.WX_APPID || '',
    secret: process.env.WX_APPSECRET || '',
    grant_type: 'client_credential'
}): Promise<AccessTokenResponse> => request.post(API.ACCESS_TOKEN, data)

// 生成二维码
export const createTicket = async (data: TicketParams=defaultTicket, access_token?: string) => {
    !access_token && (access_token = (await getAccessToken()).access_token)
    return request.post(API.TICKET + access_token, data)
}

// 生成自定义菜单
export const createMenu = async (data: MenuParams = defaultMenu, access_token?: string) => {
    !access_token && (access_token = (await getAccessToken()).access_token)
    return request.post(API.MENU + access_token, data)
} 