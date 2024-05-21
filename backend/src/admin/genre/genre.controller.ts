import { Controller, Get, Render, UseFilters, UseGuards } from '@nestjs/common';
import { Client } from 'src/core/decorator/client.decorator';
import { CookieTokenGuard } from 'src/core/guard/cookie-token.guard';
import { HttpExceptionFilter } from '../filter/http-exception.filter';

@Controller('admin/genre')
@UseFilters(HttpExceptionFilter)
export class GenreController {
  @Get()
  @Render('genre')
  @UseGuards(CookieTokenGuard)
  genre(@Client() client: any) {
    return { title: 'Genre', client };
  }
}
