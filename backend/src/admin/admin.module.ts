import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [AuthModule, DashboardModule, GenreModule, BookModule],
  controllers: [AdminController],
})
export class AdminModule {}
