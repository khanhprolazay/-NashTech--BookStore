import { DynamicModule, Global, Module } from '@nestjs/common';
import { OauthOptions } from './oauth.types';
import { OauthJwkService } from './service/oauth-jwk.service';
import { OauthIntrospectService } from './service/oauth-introspect.service';
import { JwtUtil } from './util/jwt.util';
import { ScheduleModule } from '@nestjs/schedule';
import { OAuthService } from './service/oauth.service';
import { HttpClient } from 'src/core/util/http-client';

@Global()
@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [JwtUtil, HttpClient],
  exports: [JwtUtil],
})
export class OauthModule {
  static forRoot<T extends OauthOptions>(options: T): DynamicModule {
    const providers = [];
    const exports = [];

    providers.push({
      provide: 'OAUTH_OPTIONS',
      useValue: options,
    });

    let service = null;
    switch (options.type) {
      case 'jwk':
        service = {
          provide: OAuthService,
          useClass: OauthJwkService,
        };
        break;
      case 'introspect':
        service = {
          provide: OAuthService,
          useClass: OauthIntrospectService,
        };
        break;
      default:
        break;
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
