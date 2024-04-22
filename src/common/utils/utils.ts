// src/common/utils/utils.ts
import * as moment from "moment";
import * as crypto from "crypto";
// 获取当前时间|格式化时间
export const getTime = (time:number|Date = new Date().getTime(), rule : string = "YYYY-MM-DD HH:mm:ss") : string => {
	return moment(time).format(rule);
}
 
// 普通不可逆加密
export const hashEncode = (data: string, type: 'md5' | 'sha1') => {
  let hash = crypto.createHash(type);
  hash.update(data);
  return hash.digest('hex');
}
 
// 不可逆加密 需要key
export const hmacEncode = (data: string, key: string, type: 'md5' | 'sha1' | 'sha256') => {
  let hmac = crypto.createHmac(type, key);
  hmac.update(data);
  return hmac.digest('hex');
}
 
// 可逆加密 需要key和iv
export const encode = (data: string, key: string, iv: string) => {
  let cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  return cipher.update(data, 'binary', 'hex') + cipher.final('hex');
}
 
// 可逆加密的解密 需要key和iv
export const decode = (data: string, key: string, iv: string) => {
  let encipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  data = Buffer.from(data, 'hex').toString('binary');
  return encipher.update(data, 'binary', 'utf-8') + encipher.final('utf8');
}
 
// 生成指定长度的随机串
export const generateRandomString = (length: number) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') // 将随机字节转换为十六进制字符串
    .slice(0, length); // 保证字符串长度为指定的长度
}