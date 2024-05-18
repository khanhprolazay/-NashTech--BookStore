import { Controller, Get, Render, Request, UseFilters, UseGuards } from '@nestjs/common';
import { CookieTokenGuard } from 'src/core/guard/cookie-token.guard';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { Client } from 'src/core/decorator/client.decorator';

@Controller('admin')
@UseFilters(HttpExceptionFilter)
export class AdminController {

  @Get()
  @Render('index')
  root() {
    return null;
  }

  @Get('dashboard')
  @Render('dashboard')
  @UseGuards(CookieTokenGuard)
  dashboard(@Client() client: any) {
    return { client };
  }
}
