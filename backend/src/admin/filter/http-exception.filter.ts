import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { COOKIE_TOKEN_KEY } from 'src/core/constant/auth.constant';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    if (status === 401) {
      response.clearCookie(COOKIE_TOKEN_KEY);
      response.cookie('redirect', request.url.toString());
      response.redirect('/admin');
    }
  }
}
