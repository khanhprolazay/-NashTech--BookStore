import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ID_TOKEN_COOKIE_KEY,
  TOKEN_COOKIE_KEY,
} from 'src/core/constant/auth.constant';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    switch (status) {
      case 401:
        response.clearCookie(TOKEN_COOKIE_KEY);
        response.clearCookie(ID_TOKEN_COOKIE_KEY);
        response.redirect('/admin/auth');
        break;
      case 404:
        response.redirect('/not-found');
        break;
      case 403:
        response.redirect('/forbidden');
        break;
      default:
        response.status(status).send(exception.message);
        break;
    }
  }
}
