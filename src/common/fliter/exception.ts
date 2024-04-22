import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, } from '@nestjs/common';
import { Response } from 'express';
 
@Catch() // 捕获所有类型的异常
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        // 如果是http异常，则返回对应状态和错误提示。其它错误则返回500服务器错误
        const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        res.status(httpStatus).json({ // 统一响应结果
            data: exception.message || '服务器错误',
            code: httpStatus,
            message: "error",
            ok: false
        });
    }
}