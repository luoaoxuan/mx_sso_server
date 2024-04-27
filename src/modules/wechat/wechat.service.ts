import { Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { CreateWechatDto } from './dto/create-wechat.dto';
import { UpdateWechatDto } from './dto/update-wechat.dto';
import { hashEncode } from 'src/common/utils/utils';
import { ConfigService } from '@nestjs/config';
import { createTicket, getAccessToken } from 'src/common/api/wechat';

@Injectable()
export class WechatService {
  constructor(private readonly configServer: ConfigService) { }

  // 验证微信请求
  checkSignature(query: WechatParams) {
    const { echostr, nonce, signature, timestamp } = query
    const token = this.configServer.get('WX_TOKEN', '')
    // 1.微信签名的三个参数（timestamp，nonce，token）按照字典中数据组合成一个数组
    // 2.将数组里的属性拼接成一个字符串，进行sha1加密
    const sha1Str = hashEncode([timestamp, nonce, token].sort().join(''), 'sha1');
    if (sha1Str === signature) {
      // 证明是来自微信服务器      
      return echostr;
    } else {
      throw new Error('验证失败')
    }
  }

  // 获取access_token
  async getAccessToken() {
    const {access_token} = await getAccessToken({
      grant_type: 'client_credential',
      appid: this.configServer.get('WX_APPID', ''),
      secret: this.configServer.get('WX_APPSECRET', '')
    })
    const res=await createTicket({
      action_name:'QR_STR_SCENE',
      expire_seconds:300,
      scene_str:new Date().getTime() + '-' + Math.floor(Math.random() * 1000000)
    },access_token)
    console.log(res);
    
  }

  create(createWechatDto: CreateWechatDto) {
    return 'This action adds a new wechat';
  }

  findAll() {
    return `This action returns all wechat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wechat`;
  }

  update(id: number, updateWechatDto: UpdateWechatDto) {
    return `This action updates a #${id} wechat`;
  }

  remove(id: number) {
    return `This action removes a #${id} wechat`;
  }
}
