import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ID_TOKEN_COOKIE_KEY, TOKEN_COOKIE_KEY } from 'src/core/constant/auth.constant';
import { OAuthService } from 'src/core/module/oauth/service/oauth.service';

@Controller('admin/auth')
export class AuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @Get()
  auth(@Res() res: Response) {
    const loginUrl = this.oauthService.createLoginUrl();
    return res.redirect(loginUrl);
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    const idToken = req.cookies[ID_TOKEN_COOKIE_KEY];
    const logoutUrl = this.oauthService.createLogoutUrl(idToken);
    res.clearCookie(TOKEN_COOKIE_KEY);
    res.clearCookie(ID_TOKEN_COOKIE_KEY);
    return res.redirect(logoutUrl);
  }

  @Get('callback')
  async callback(@Res() res: Response, @Query('code') code: string) {
    try {
      const response = await this.oauthService.exchange(code);
      res.cookie(TOKEN_COOKIE_KEY, response.access_token, { httpOnly: true });
      res.cookie(ID_TOKEN_COOKIE_KEY, response.id_token, { httpOnly: true });
      return res.redirect('/admin/dashboard');
    } catch (error) {
      return res.redirect('/admin');
    }
  }
}
