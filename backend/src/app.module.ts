import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './core/global.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [GlobalModule, BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
