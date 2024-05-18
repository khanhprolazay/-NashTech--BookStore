import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { BaseAuthGuard } from './base-auth.guard';

@Injectable()
export class HeaderTokenGuard extends BaseAuthGuard {
  getToken(context: ExecutionContext): string {
    const request = this.getRequest(context);
    const { authorization } = request.headers;
    const token = authorization?.split(' ')[1];
    if (!token) throw new HttpException('Unauthorized', 401);
    return token;
  }
}
