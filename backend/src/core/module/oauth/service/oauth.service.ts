import {
  OauthOptions,
  OauthTokenResponse,
  OauthUserInfor,
  OpenIdConfiguration,
} from '../oauth.types';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpClient } from 'src/core/util/http-client';
import { OAUTH_OPTIONS } from '../oauth.constant';

@Injectable()
export abstract class OAuthService implements OnModuleInit {
  public configuration: OpenIdConfiguration = null;

  constructor(
    @Inject(OAUTH_OPTIONS) protected options: OauthOptions,
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

  createLoginUrl() {
    return `${this.configuration.authorization_endpoint}?response_type=code&client_id=${this.options.clientId}&redirect_uri=${encodeURIComponent(this.options.redirectUri)}&scope=openid`;
  }

  createLogoutUrl(idToken: string) {
    return `${this.configuration.end_session_endpoint}?post_logout_redirect_uri=${encodeURIComponent(this.options.postLogoutRedirectUri)}&id_token_hint=${idToken}&client_id=${this.options.clientId}`;
  }

  async exchange(code: string) {
    try {
      const response = await this.httpClient.post<OauthTokenResponse>(
        this.configuration.token_endpoint,
        {
          code,
          grant_type: 'authorization_code',
          client_id: this.options.clientId,
          client_secret: this.options.clientSecret,
          redirect_uri: this.options.redirectUri,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to exchange token.');
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
