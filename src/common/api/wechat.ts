import request from "./request";
enum API{
    ACCESS_TOKEN='https://api.weixin.qq.com/cgi-bin/stable_token',
    TICKET='https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token='
}

interface AccessTokenParams{
    grant_type:'client_credential',
    appid:string
	secret:string
}
interface AccessTokenResponse{
    access_token: string;
  expires_in: number;
}

interface TicketParams{
    action_name:'QR_STR_SCENE',
    expire_seconds:number,
    scene_str:string
}


// 获取access_token 
export const getAccessToken=(data:AccessTokenParams):Promise<AccessTokenResponse>=>request.post(API.ACCESS_TOKEN,data)

// 生成二维码
export const createTicket=(data:TicketParams,access_token:string)=>request.post(API.TICKET+access_token,data)