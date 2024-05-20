import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { TOKEN_COOKIE_KEY } from 'src/core/constant/auth.constant';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    if (status === 401) {
      response.clearCookie(TOKEN_COOKIE_KEY);
      response.redirect('/admin/auth');
    }
  }
}
