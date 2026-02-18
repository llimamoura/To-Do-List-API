import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export type RequestUser = { userId: string; name: string };

export interface RequestWithUser extends Request {
  user: RequestUser;
}

export const CurrentUser = createParamDecorator(
  (key: 'userId' | 'name' | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user: RequestUser = req.user;

    return key ? user?.[key] : user;
  },
);
