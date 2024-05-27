import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { BaseGuard } from './base.guard';
import { Reflector } from '@nestjs/core';
import { OAuthService } from '../module/oauth/service/oauth.service';
import { JwtUtil } from '../module/oauth/util/jwt.util';
import { UserService } from '../module/user/user.service';

@Injectable()
export abstract class BaseAuthGuard extends BaseGuard {
  constructor(
    protected refrector: Reflector,
    protected userService: UserService,
    protected oauthService: OAuthService,
    protected jwtUtil: JwtUtil,
  ) {
    super(refrector);
  }

  abstract getToken(context: ExecutionContext): string;

  async verify(token: string) {
    try {
      const valid = await this.oauthService.verify(token);
      if (!valid) throw new HttpException('Unauthorized', 401);

      /*
        There are 2 types of token
          1. Token from Standard Flow
          2. Token from Service Account Flow
        The token from Standard Flow has a subject (sub) and email (email) in the payload
        The token from Service Account Flow doesn't represent for a user, so we don't need to check the user
      */

      const decode = this.jwtUtil.decode(token);
      if (decode.email) {
        let user = await this.userService.findById(decode.sub);
        if (!user) await this.userService.create({ 
          id: decode.sub,
          email: decode.email,
          picture: decode.picture,
          name: decode.name, 
        });
      }
      return decode;
    } catch (error) {
      throw new HttpException('Unauthorized', 401);
    }
  }

  async canActivate(context: ExecutionContext){
    const token = this.getToken(context);
    const request = this.getRequest(context);
    const client = await this.verify(token);
    request.client = client;
    return true;
  }
}
