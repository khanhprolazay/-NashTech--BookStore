import { DynamicModule, Global, Module } from '@nestjs/common';
import { OauthJwkOptions, OauthIntrospectOptions } from './oauth.types';
import { OauthJwkService } from './services/oauth-jwk.service';
import { OauthIntrospectService } from './services/oauth-introspect.service';
import { JwtUtil } from './utils/jwt.util';
import { ScheduleModule } from '@nestjs/schedule';
import { OAuthService } from './services/oauth.service';
import { HttpClient } from 'src/core/util/http-client';

@Global()
@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [JwtUtil, HttpClient],
})
export class OauthModule {
  static forRoot<T>(options: T): DynamicModule {
    const providers = [];
    const exports = [];

    providers.push({
      provide: 'OAUTH_OPTIONS',
      useValue: options,
    });

    let service = null;
    if ((options as OauthJwkOptions).ttl) {
      service = {
        provide: OAuthService,
        useClass: OauthJwkService,
      };
    }

    if ((options as OauthIntrospectOptions).clientId) {
      service = {
        provide: OAuthService,
        useClass: OauthIntrospectService,
      };
    }

    if (service) {
      providers.push(service);
      exports.push(OAuthService);
    }

    return {
      module: OauthModule,
      providers,
      exports,
    };
  }
}
