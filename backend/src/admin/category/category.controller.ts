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
} from "@nestjs/common";
import { Client } from "src/core/decorator/client.decorator";
import { CookieTokenGuard } from "src/core/guard/cookie-token.guard";
import { HttpExceptionFilter } from "../../core/filter/http-exception.filter";
import { CategoryService } from "./category.service";
import { UpdateCategoryDto } from "./category.dto";
import { RolesGuard } from "src/core/guard/roles.guard";
import { Role } from "src/core/constant/user.constant";
import { Roles } from "src/core/decorator/roles.decorator";
import { AppContext } from "src/core/type/app-context.type";
import { APP_CONTEXT } from "src/core/constant/app.constant";

@Controller("admin/category")
@UseFilters(HttpExceptionFilter)
@UseGuards(CookieTokenGuard, RolesGuard)
export class CategoryController {
  constructor(
    @Inject(APP_CONTEXT) private readonly appContext: AppContext,
    private readonly categoryService: CategoryService,
  ) {}

  @Get()
  @Render("categories")
  @Roles([Role.Admin])
  async genre(
    @Client() client: any,
    @Query("page", new DefaultValuePipe("1"), ParseIntPipe) page: number,
  ) {
    const [count, categories] = await Promise.all([
      this.categoryService.count(),
      this.categoryService.findByPage(page),
    ]);

    const totalPage = Math.ceil(count / this.appContext.pagination.limit);

    return {
      title: "Category",
      client,
      categories,
      totalPage,
      currentPage: page,
    };
  }

  @Put(":id")
  @Roles([Role.Admin])
  update(@Param("id") id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(id, dto);
  }

  @Post()
  @Roles([Role.Admin])
  create(@Body() dto: UpdateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Delete(":id")
  @Roles([Role.Admin])
  delete(@Param("id") id: string) {
    return this.categoryService.delete(id);
  }
}
