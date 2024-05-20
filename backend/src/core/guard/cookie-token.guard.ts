import { ExecutionContext, Injectable } from '@nestjs/common';
import { BaseAuthGuard } from './base-auth.guard';
import { TOKEN_COOKIE_KEY } from '../constant/auth.constant';

@Injectable()
export class CookieTokenGuard extends BaseAuthGuard {
  getToken(context: ExecutionContext): string {
    const request = this.getRequest(context);
    const token = request.cookies[TOKEN_COOKIE_KEY];
    return token;
  }
}
