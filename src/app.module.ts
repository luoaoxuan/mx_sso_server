// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RedisModule } from '@nestjs-modules/ioredis';
import { UserModule } from './modules/user/user.module';

// 环境变量
const envFilePath = ['production.env'];
if (process.env.NODE_ENV === 'development') {  // 开发环境使用development.env变量
  envFilePath.unshift('development.env')
}

@Module({
  imports: [
    // .env 模块配置
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath
    }),
    // 数据库模块配置
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST', '127.0.0.1'),
        port: +configService.get<string>('DATABASE_PORT','3306'),
        username: configService.get<string>('DATABASE_USERNAME', 'root'),
        password: configService.get<string>('DATABASE_PASSWORD', '123456'),
        database: configService.get<string>('DATABASE_NAME', 'root'),
        // synchronize: true,   // 生产环境下不要打开 否则会造成数据的丢失
        autoLoadEntities: true,
      }),
      inject: [ConfigService]
    }),
    // Redis 模块配置
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'single', // 单例
        options:{
          host: configService.get<string>('REDIS_HOST','127.0.0.1'),
          port: +configService.get<string>('REDIS_PORT','6379'),
          db:+configService.get<string>('REDIS_DB','0')
        }
      }),
      inject:[ConfigService]
    }),
    // jwt 模块配置 
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'luoaoxuan'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '2h'),
        },
      }),
      inject: [ConfigService]
    }),
    UserModule,
    // 其他模块
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule]
})

export class AppModule { }
