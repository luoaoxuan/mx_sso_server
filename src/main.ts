import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from 'src/common/interceptor/response';
import { HttpExceptionFilter } from 'src/common/fliter/exception';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from "body-parser";
import * as bodyParserXml from "body-parser-xml";
import { createMenu } from './common/api/wechat';
bodyParserXml(bodyParser)  // 解析xml

// 公众号自定义菜单
createMenu().then(res => {
  console.log(res);
})

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors() // 配置跨域
  app.setGlobalPrefix('/api')  // 设置统一前缀
  app.useStaticAssets('public', { prefix: '/public' }) // 静态资源
  app.useGlobalInterceptors(new ResponseInterceptor()) // 注册响应拦截器
  app.useGlobalFilters(new HttpExceptionFilter()); // 注册异常过滤器
  app.use(bodyParser.xml({
    xmlParseOptions: {
      explicitArray: false // 始终返回数组。默认情况下只有数组元素数量大于 1 是才返回数组。
    }
  }))

  await app.listen(3000);
}
bootstrap();
