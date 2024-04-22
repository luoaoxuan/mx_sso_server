import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from 'src/common/interceptor/response';
import { HttpExceptionFilter } from 'src/common/fliter/exception';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter()); // 注册异常过滤器
  await app.listen(3000);
}
bootstrap();
