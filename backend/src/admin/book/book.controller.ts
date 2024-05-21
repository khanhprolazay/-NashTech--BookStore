import { Controller, Get, Query, Render, UseFilters, UseGuards } from '@nestjs/common';
import { Client } from 'src/core/decorator/client.decorator';
import { CookieTokenGuard } from 'src/core/guard/cookie-token.guard';
import { BookService } from './book.service';
import { HttpExceptionFilter } from '../filter/http-exception.filter';

@Controller('admin/book')
@UseFilters(HttpExceptionFilter)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @Render('book')
  @UseGuards(CookieTokenGuard)
  async book(@Client() client: any, @Query('page') page: number = 1) {
    const books = await this.bookService.findAll();
    return { title: 'Book', books, client };
  }
}
