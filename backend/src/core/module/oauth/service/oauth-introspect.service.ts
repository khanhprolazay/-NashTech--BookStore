import { Inject, Injectable } from '@nestjs/common';
import { OAuthService } from './oauth.service';
import { OauthOptions } from '../oauth.types';
import { HttpClient } from 'src/core/util/http-client';

@Injectable()
export class OauthIntrospectService extends OAuthService {
  constructor(
    @Inject('OAUTH_OPTIONS') protected options: OauthOptions,
    protected httpClient: HttpClient,
  ) {
    super(options, httpClient);
  }

  override async onModuleInit(): Promise<void> {
    // Get configuration and check introspection endpoint
    await super.onModuleInit();
    if (!this.configuration.introspection_endpoint) {
      throw new Error('Introspection endpoint is not defined.');
    }
  }

  async verify(token: string): Promise<boolean> {
    // Verify token by calling introspection endpoint
    const response = await this.httpClient.post<{ active: boolean }>(
      this.configuration.introspection_endpoint,
      {
        token,
        client_id: this.options.clientId,
        client_secret: this.options.clientSecret,
      },
    );
    return response.data.active;
   
  }
}
