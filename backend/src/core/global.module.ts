import { Global, Module } from '@nestjs/common';
import { PrismaService } from './service/prisma.service';
import { ExcelModule } from './module/excel/excel.module';
import { HttpClient } from './util/http-client';
import { OauthModule } from './module/oauth/oauth.module';
import { OauthJwkOptions } from './module/oauth/oauth.types';

@Global()
@Module({
  imports: [
    ExcelModule,
    OauthModule.forRoot<OauthJwkOptions>({
      ttl: 3600,
      openidConfigurationUrl: process.env.OPENID_CONFIGURATION_URL,
    }),
  ],
  providers: [PrismaService, HttpClient],
  exports: [PrismaService, HttpClient],
})
export class GlobalModule {}
