import { Controller, Get, Render, Res, UseFilters, UseGuards } from '@nestjs/common';
import { CookieTokenGuard } from 'src/core/guard/cookie-token.guard';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  @Get()
  @UseGuards(CookieTokenGuard)
  root(@Res() res: Response) {
    return res.redirect('/admin/dashboard');
  }

  @Get('forbidden')
  @Render('forbidden')
  forbidden() {
    return null;
  }

  @Get('not-found')
  @Render('not-found')
  notFound() {
    return null;
  }
}
