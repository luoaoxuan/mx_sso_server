import { ExecutionContext, createParamDecorator } from "@nestjs/common"
 
export const UserInfo = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return data?request.userInfo[data]:request.userInfo // 如果没有传参则返回整个对象，如果传参则返回对应的字段值
    }
)