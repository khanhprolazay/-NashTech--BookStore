import { Global, Module } from '@nestjs/common';
import { PrismaService } from './service/prisma.service';
import { ExcelModule } from './module/excel/excel.module';
import { HttpClient } from './util/http-client';

@Global()
@Module({
  imports: [ExcelModule],
  providers: [PrismaService, HttpClient],
  exports: [PrismaService, HttpClient],
})
export class GlobalModule {}
