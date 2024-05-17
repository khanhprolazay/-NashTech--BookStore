import {
  OauthOptions,
  OauthUserInfor,
  OpenIdConfiguration,
} from '../oauth.types';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpClient } from 'src/core/util/http-client';

@Injectable()
export abstract class OAuthService implements OnModuleInit {
  protected configuration: OpenIdConfiguration = null;

  constructor(
    @Inject('OAUTH_OPTIONS') protected options: OauthOptions,
    protected readonly httpClient: HttpClient,
  ) {}

  abstract verify(token: string): Promise<boolean> | Observable<boolean>;

  async onModuleInit() {
    try {
      const response = await this.httpClient.get<OpenIdConfiguration>(
        this.options.openidConfigurationUrl,
      );
      this.configuration = response.data;
    } catch (error) {
      throw new Error('OpenID configuration URL is not valid.');
    }
  }

  async getInformation(token: string): Promise<any> {
    try {
      const response = await this.httpClient.get<OauthUserInfor>(
        this.configuration.userinfo_endpoint,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }
}
