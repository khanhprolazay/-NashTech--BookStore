import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AuthModule, DashboardModule, CategoryModule, BookModule],
  controllers: [AdminController],
})
export class AdminModule {}
