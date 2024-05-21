import { Global, Module } from '@nestjs/common';
import { PrismaService } from './service/prisma.service';
import { ExcelModule } from './module/excel/excel.module';
import { HttpClient } from './util/http-client';
import { OauthModule } from './module/oauth/oauth.module';
import { OauthJwkOptions } from './module/oauth/oauth.types';
import { AppContextModule } from './module/app/app-context.module';
import { UserModule } from './module/user/user.module';

@Global()
@Module({
  imports: [
    ExcelModule,
    UserModule,
    OauthModule.forRoot<OauthJwkOptions>({
      ttl: 3600,
      type: 'jwk',
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      redirectUri: process.env.OAUTH_REDIRECT_URI,
      openidConfigurationUrl: process.env.OPENID_CONFIGURATION_URL,
      postLogoutRedirectUri: process.env.OAUTH_POST_LOGOUT_REDIRECT_URI,
    }),
    AppContextModule.forRoot({
      pagination: {
        limit: 10,
      },
    }),
  ],
  providers: [PrismaService, HttpClient],
  exports: [PrismaService, HttpClient],
})
export class GlobalModule {}
