import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from 'src/common/interceptor/response';
import { HttpExceptionFilter } from 'src/common/fliter/exception';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    // bodyParser:false
  });
  
  app.enableCors() // 配置跨域
  app.setGlobalPrefix('/api')  // 设置统一前缀
  app.useStaticAssets('public',{prefix:'/public'}) // 静态资源
  app.useGlobalInterceptors(new ResponseInterceptor()) // 注册响应拦截器
  app.useGlobalFilters(new HttpExceptionFilter()); // 注册异常过滤器
  
  await app.listen(3000);
}
bootstrap();
