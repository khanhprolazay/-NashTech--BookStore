import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CategoryModule } from './category/category.module';
import { AuthorModule } from './author/author.module';
import { PromotionModule } from './promotion/promotion.module';

@Module({
  imports: [
    AuthModule,
    PromotionModule,
    DashboardModule,
    CategoryModule,
    BookModule,
    AuthorModule,
  ],
  controllers: [AdminController],
})
export class AdminModule {}
