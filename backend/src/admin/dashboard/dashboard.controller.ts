import { Controller, Get, Render, UseFilters, UseGuards } from '@nestjs/common';
import { CookieTokenGuard } from 'src/core/guard/cookie-token.guard';
import { Client } from 'src/core/decorator/client.decorator';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { Role } from 'src/core/constant/user.constant';
import { Roles } from 'src/core/decorator/roles.decorator';
import { RolesGuard } from 'src/core/guard/roles.guard';

@Controller('admin/dashboard')
@UseFilters(HttpExceptionFilter)
@UseGuards(CookieTokenGuard, RolesGuard)
export class DashboardController {
  @Get()
  @Render('dashboard')
  @Roles([Role.Admin])
  dashboard(@Client() client: any) {
    return { client, title: 'Dashboard' };
  }
}
