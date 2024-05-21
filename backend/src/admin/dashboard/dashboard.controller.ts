import { Controller, Get, Render, UseFilters, UseGuards } from '@nestjs/common';
import { CookieTokenGuard } from 'src/core/guard/cookie-token.guard';
import { Client } from 'src/core/decorator/client.decorator';
import { HttpExceptionFilter } from '../filter/http-exception.filter';

@Controller('admin/dashboard')
@UseFilters(HttpExceptionFilter)
export class DashboardController {
  @Get()
  @Render('dashboard')
  @UseGuards(CookieTokenGuard)
  dashboard(@Client() client: any) {
    return { client, title: 'Dashboard' };
  }
}
