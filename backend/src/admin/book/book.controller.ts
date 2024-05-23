import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Render,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Client } from 'src/core/decorator/client.decorator';
import { CookieTokenGuard } from 'src/core/guard/cookie-token.guard';
import { BookService } from './book.service';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { UpdateInformationDto } from './upate-information.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('admin/book')
@UseFilters(HttpExceptionFilter)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @Render('books')
  @UseGuards(CookieTokenGuard)
  async books(
    @Client() client: any,
    @Query('page', new DefaultValuePipe('1'), ParseIntPipe) page: number,
  ) {
    const books = await this.bookService.findByPage(page);
    return { title: 'Book', books, client };
  }

  @Get(':slug')
  @Render('book')
  @UseGuards(CookieTokenGuard)
  async book(@Client() client: any, @Param('slug') slug: string) {
    const book = await this.bookService.findBySlug(slug);
    return { title: 'Book', client, book };
  }

  @Patch(':id/information')
  @UseGuards(CookieTokenGuard)
  async updateInformation(
    @Param('id') id: string,
    @Body() dto: UpdateInformationDto,
  ) {
    return this.bookService.updateInformation(id, dto);
  }

  @Patch(':id/image')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(CookieTokenGuard)
  async updateFile(@Param('id') id: string, @UploadedFile() image: Express.Multer.File) {
    return this.bookService.updateImage(id, image);
  }
}
