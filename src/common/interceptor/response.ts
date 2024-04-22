import {NestInterceptor, CallHandler, ExecutionContext, Injectable } from '@nestjs/common'
import { map } from 'rxjs/operators'
import {Observable} from 'rxjs'
 
interface Response<T> {
    data: T
}
 
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>):Observable<Response<T>> {
        return next.handle().pipe(map(data=> {
            return {
                data,
                code:200, 
                message:"success",
                ok:true
             }
        }))
    }
}