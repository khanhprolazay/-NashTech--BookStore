import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Render,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { CookieTokenGuard } from 'src/core/guard/cookie-token.guard';
import { RolesGuard } from 'src/core/guard/roles.guard';
import { Roles } from 'src/core/decorator/roles.decorator';
import { Role } from 'src/core/constant/user.constant';
import { Client } from 'src/core/decorator/client.decorator';
import { AuthorService } from './author.service';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { APP_CONTEXT } from 'src/core/constant/app.constant';
import { AppContext } from 'src/core/type/app-context.type';

@Controller('admin/author')
@UseFilters(HttpExceptionFilter)
@UseGuards(CookieTokenGuard, RolesGuard)
export class AuthorController {
  constructor(
    @Inject(APP_CONTEXT) protected readonly appContext: AppContext,
    private readonly authorService: AuthorService,
  ) {}

  @Get()
  @Render('author')
  @Roles([Role.Admin])
  async author(
    @Client() client: any,
    @Query('page', new DefaultValuePipe('1'), ParseIntPipe) page: number,
  ) {
    const [count, authors] = await Promise.all([
      this.authorService.count(),
      this.authorService.findByPage(page),
    ]);

    let pages = [];
    const totalPage = Math.ceil(count / 10);
    for (let i = 1; i <= totalPage; i++) {
      let isActive = false;
      if (i === page) {
        isActive = true;
      }
      pages.push({
        page: i,
        isActive,
      });
    }

    return {
      title: 'Author',
      client,
      authors,
      pages,
    };
  }

  @Put(':id')
  @Roles([Role.Admin])
  update(@Param('id') id: string, @Body() dto: UpdateAuthorDto) {
    return this.authorService.update(id, dto);
  }

  @Post()
  @Roles([Role.Admin])
  create(@Body() dto: UpdateAuthorDto) {
    return this.authorService.create(dto);
  }

  @Delete(':id')
  @Roles([Role.Admin])
  delete(@Param('id') id: string) {
    return this.authorService.delete(id);
  }
}
