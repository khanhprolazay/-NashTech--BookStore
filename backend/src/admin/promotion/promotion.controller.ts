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
  UseGuards,
} from "@nestjs/common";
import { PromotionService } from "./promotion.service";
import { Client } from "src/core/decorator/client.decorator";
import { CookieTokenGuard } from "src/core/guard/cookie-token.guard";
import { RolesGuard } from "src/core/guard/roles.guard";
import { Roles } from "src/core/decorator/roles.decorator";
import { Role } from "src/core/constant/user.constant";
import { CreatePromotionDto } from "./dto/create-promotion.dto";
import { AddBookDto, UpdateDiscountDto } from "./dto/add-book.dto";

@Controller("admin/promotion")
@UseGuards(CookieTokenGuard, RolesGuard)
export class PromotionController {
  constructor(private promotionService: PromotionService) {}

  @Get()
  @Render("promotions")
  @Roles([Role.Admin])
  async promotions(
    @Client() client: any,
    @Query("page", new DefaultValuePipe("1"), ParseIntPipe) page: number = 1,
  ) {
    const promotions = await this.promotionService.findByPage(page);
    return { client, promotions, title: "Promotion" };
  }

  @Get(":slug")
  @Render("promotion")
  @Roles([Role.Admin])
  async promotion(@Client() client: any, @Param("slug") slug: string) {
    const [promotion, books] = await Promise.all([
      this.promotionService.findBySlug(slug),
      this.promotionService.getBooks(),
    ]);
    return { client, promotion, books, title: "Promotion" };
  }

  @Post()
  @Roles([Role.Admin])
  createPromotion(@Client() client: any, @Body() body: CreatePromotionDto) {
    return this.promotionService.create(body, client.sub);
  }

  @Post(":id/book")
  @Roles([Role.Admin])
  addBook(@Param("id") id: string, @Body() dto: AddBookDto) {
    return this.promotionService.addBook(id, dto.book, dto.discount);
  }

  @Patch(":id")
  @Roles([Role.Admin])
  updatePromotion(@Param("id") id: string, @Body() body: CreatePromotionDto) {
    return this.promotionService.update(id, body);
  }

  @Patch(":id/book/:bookId")
  @Roles([Role.Admin])
  updateBookDiscount(
    @Param("id") id: string,
    @Param("bookId") bookId: string,
    @Body() dto: UpdateDiscountDto,
  ) {
    return this.promotionService.updateBookDiscount(id, bookId, dto.discount);
  }

  @Delete(":id")
  @Roles([Role.Admin])
  deletePromotion(@Param("id") id: string) {
    return this.promotionService.delete(id);
  }

  @Delete(":id/book/:bookId")
  @Roles([Role.Admin])
  removeBook(@Param("id") id: string, @Param("bookId") bookId: string) {
    return this.promotionService.removeBook(id, bookId);
  }
}
