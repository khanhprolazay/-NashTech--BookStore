import { Controller, Get, Res, UseFilters, UseGuards } from '@nestjs/common';
import { CookieTokenGuard } from 'src/core/guard/cookie-token.guard';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { Response } from 'express';

@Controller('admin')
@UseFilters(HttpExceptionFilter)
export class AdminController {
  @Get()
  @UseGuards(CookieTokenGuard)
  root(@Res() res: Response) {
    return res.redirect('/admin/dashboard');
  }
}
