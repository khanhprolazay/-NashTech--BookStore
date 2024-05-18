import { ExecutionContext, Injectable } from '@nestjs/common';
import { BaseAuthGuard } from './base-auth.guard';
import { COOKIE_TOKEN_KEY } from '../constant/auth.constant';

@Injectable()
export class CookieTokenGuard extends BaseAuthGuard {
  getToken(context: ExecutionContext): string {
    const request = this.getRequest(context);
    const token = request.cookies[COOKIE_TOKEN_KEY];
    return token;
  }
}
