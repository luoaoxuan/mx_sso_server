// src/guard/AuthGuard.ts
import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
 
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }
 
    getToken(req: Request) { // 获取token的方法 这里不唯一
        return req.headers.authorization
    }
 
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.getToken(request);
        if (!token) {
            throw new HttpException('token无效', 401);
        }
        try {
            const payload = await this.jwtService.verifyAsync(token)
            request.userInfo = payload; // 将token中解析出来的用户信息存入request对象中
        } catch {
            throw new HttpException('token无效', 401);
        }
        return true;
    }
}