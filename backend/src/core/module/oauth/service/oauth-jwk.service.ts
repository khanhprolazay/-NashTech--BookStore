import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { OAuthService } from './oauth.service';
import { OauthJwkOptions } from '../oauth.types';
import { SchedulerRegistry } from '@nestjs/schedule';
import { JwtUtil } from '../util/jwt.util';
import { Algorithm, JwtHeader } from 'jsonwebtoken';
import { HttpClient } from 'src/core/util/http-client';

@Injectable()
export class OauthJwkService extends OAuthService {
  private keys: JwtHeader[] = [];
  private pems: Record<string, string> = {};

  constructor(
    @Inject('OAUTH_OPTIONS') protected options: OauthJwkOptions,
    protected jwtUtil: JwtUtil,
    protected httpClient: HttpClient,
    protected schedulerRegistry: SchedulerRegistry,
  ) {
    super(options, httpClient);
  }

  override async onModuleInit() {
    try {
      // Get configurationa and refresh keys
      await super.onModuleInit();
      await this.refresh();

      // Schedule refresh keys
      if (this.options.ttl) {
        const interval = setInterval(this.refresh.bind(this), this.options.ttl);
        this.schedulerRegistry.addInterval('oauth-jwk-service', interval);
      }
    } catch (error) {
      throw new Error('JWKS URI is not valid.');
    }
  }

  async verify(token: string): Promise<boolean> {
    try {
      // Decode token and get kid and alg
      const decode = this.jwtUtil.decodeComplete(token);
      const { kid, alg } = decode.header;

      // Get pem from cache or convert key to pem
      let pem = this.pems[kid];
      if (!pem) {
        const key = this.keys.find((k) => k.kid === kid);
        pem = this.jwtUtil.toPem(key);
        this.pems[kid] = pem;
      }

      // Verify token
      return this.jwtUtil.verify(token, pem, alg as Algorithm);
    } catch (error) {
      return false;
    }
  }

  private async refresh() {
    // Get keys from JWKS URI and cache it
    const response = await this.httpClient.get<{ keys: JwtHeader[] }>(
      this.configuration.jwks_uri,
    );
    this.pems = {};
    this.keys = response.data.keys;
  }
}
