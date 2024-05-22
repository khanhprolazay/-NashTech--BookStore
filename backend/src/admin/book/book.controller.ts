import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Render,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Client } from 'src/core/decorator/client.decorator';
import { CookieTokenGuard } from 'src/core/guard/cookie-token.guard';
import { BookService } from './service/book.service';
import { HttpExceptionFilter } from '../filter/http-exception.filter';

@Controller('admin/book')
@UseFilters(HttpExceptionFilter)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @Render('book')
  @UseGuards(CookieTokenGuard)
  async book(
    @Client() client: any,
    @Query('page', new DefaultValuePipe('1'), ParseIntPipe) page: number,
  ) {
    const books = await this.bookService.findByPage(page);
    return { title: 'Book', books, client };
  }
}
