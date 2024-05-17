import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  @Get()
  @Render('index')
  root() {
    return null;
  }

  @Get('dashboard')
  @Render('dashboard')
  dashboard() {
    return null;
  }
}
