import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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
import { RolesGuard } from 'src/core/guard/roles.guard';
import { Roles } from 'src/core/decorator/roles.decorator';
import { Role } from 'src/core/constant/user.constant';

@Controller('admin/book')
@UseFilters(HttpExceptionFilter)
@UseGuards(CookieTokenGuard, RolesGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @Render('books')
  @Roles([Role.Admin])
  async getBooks(
    @Client() client: any,
    @Query('page', new DefaultValuePipe('1'), ParseIntPipe) page: number,
  ) {
    const books = await this.bookService.findByPage(page);
    return { title: 'Book', books, client };
  }

  @Get(':slug')
  @Render('book')
  @Roles([Role.Admin])
  async getBook(@Client() client: any, @Param('slug') slug: string) {
    let book = await this.bookService.findBySlug(slug);
    const [authors, categories] = await Promise.all([
      this.bookService.getAuthors(),
      this.bookService.getCategories(),
    ]);
    return {
      title: 'Book',
      client,
      authors,
      categories,
      book
    };
  }

  @Patch(':id/information')
  @Roles([Role.Admin])
  updateInformation(
    @Param('id') id: string,
    @Body() dto: UpdateInformationDto,
  ) {
    return this.bookService.updateInformation(id, dto);
  }

  @Patch(':id/image')
  @UseInterceptors(FileInterceptor('image'))
  @Roles([Role.Admin])
  updateFile(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.bookService.updateImage(id, image);
  }

  @Post(':id/category')
  @Roles([Role.Admin])
  addCategory(
    @Param('id') id: string,
    @Body('category') categoryId: string,
  ) {
    return this.bookService.addCategory(id, categoryId);
  }

  @Post(':id/author')
  @Roles([Role.Admin])
  addAuthor(@Param('id') id: string, @Body('author') authorId: string) {
    return this.bookService.addAuthor(id, authorId);
  }

  @Delete(':id/category/:categoryId')
  @Roles([Role.Admin])
  removeCategory(
    @Param('id') id: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.bookService.removeCategory(id, categoryId);
  }

  @Delete(':id/author/:authorId')
  @Roles([Role.Admin])
  removeAuthor(
    @Param('id') id: string,
    @Param('authorId') authorId: string,
  ) {
    return this.bookService.removeAuthor(id, authorId);
  }
}
