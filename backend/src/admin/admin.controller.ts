import {
  Controller,
  Get,
  Query,
  Render,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CookieTokenGuard } from 'src/core/guard/cookie-token.guard';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { Client } from 'src/core/decorator/client.decorator';
import { Response, Request } from 'express';
import { OAuthService } from 'src/core/module/oauth/service/oauth.service';
import { ID_TOKEN_COOKIE_KEY, TOKEN_COOKIE_KEY } from 'src/core/constant/auth.constant';

@Controller('admin')
@UseFilters(HttpExceptionFilter)
export class AdminController {
  constructor(private readonly oauthService: OAuthService) {}

  @Get()
  @UseGuards(CookieTokenGuard)
  root(@Res() res: Response) {
    return res.redirect('/admin/dashboard');
  }

  @Get('auth')
  auth(@Res() res: Response) {
    const loginUrl = this.oauthService.createLoginUrl();
    return res.redirect(loginUrl);
  }

  @Get('auth/logout') 
  logout(@Req() req: Request, @Res() res: Response) {
    const idToken = req.cookies[ID_TOKEN_COOKIE_KEY];
    const logoutUrl = this.oauthService.createLogoutUrl(idToken);
    res.clearCookie(TOKEN_COOKIE_KEY);
    res.clearCookie(ID_TOKEN_COOKIE_KEY);
    return res.redirect(logoutUrl);
  }

  @Get('auth/callback')
  async callback(@Res() res: Response, @Query('code') code: string) {
    try {
      const response = await this.oauthService.exchange(code);
      res.cookie(TOKEN_COOKIE_KEY, response.access_token, { httpOnly: true });
      res.cookie(ID_TOKEN_COOKIE_KEY, response.id_token, { httpOnly: true })
      return res.redirect('/admin/dashboard');
    } catch (error) {
      return res.redirect('/admin');
    }
  }

  @Get('dashboard')
  @Render('dashboard')
  @UseGuards(CookieTokenGuard)
  dashboard(@Client() client: any) {
    return { client };
  }
}
