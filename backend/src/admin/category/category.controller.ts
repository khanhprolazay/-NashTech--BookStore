import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Render,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Client } from 'src/core/decorator/client.decorator';
import { CookieTokenGuard } from 'src/core/guard/cookie-token.guard';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './category.dto';
import { RolesGuard } from 'src/core/guard/roles.guard';
import { Role } from 'src/core/constant/user.constant';
import { Roles } from 'src/core/decorator/roles.decorator';

@Controller('admin/category')
@UseFilters(HttpExceptionFilter)
@UseGuards(CookieTokenGuard, RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @Render('category')
  @Roles([Role.Admin])
  async genre(
    @Client() client: any,
    @Query('page', new DefaultValuePipe('1'), ParseIntPipe) page: number,
  ) {
    const categories = await this.categoryService.findByPage(page);
    return { title: 'Category', client, categories };
  }

  @Put(':id')
  @Roles([Role.Admin])
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(id, dto);
  }

  @Post()
  @Roles([Role.Admin])
  create(@Body() dto: UpdateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Delete(':id')
  @Roles([Role.Admin])
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }  
}
