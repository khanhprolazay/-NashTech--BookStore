import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CategoryModule } from './category/category.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [
    AuthModule,
    DashboardModule,
    CategoryModule,
    BookModule,
    AuthorModule,
  ],
  controllers: [AdminController],
})
export class AdminModule {}
