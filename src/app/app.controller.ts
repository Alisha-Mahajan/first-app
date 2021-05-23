import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

import { AppService } from './app.service';
import { Public, CookieData, Role } from './auth/decorator';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { RoleGuard } from './auth/guards/role.guard';
import { AuthService } from './auth/services/auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request, @Res() response: Response) {
    const { access_token, refresh_token } = await this.authService.login(
      req.user,
    );
    this.setCookie(response, refresh_token);
    response.send({ access_token });
  }

  @Public()
  @Post('auth/refresh')
  async refreshToken(
    @CookieData({ key: 'token', isSigned: true }) token: string,
    @Res() response: Response,
  ) {
    const { access_token, refresh_token } = await this.authService.refresh(
      token,
    );
    this.setCookie(response, refresh_token);
    response.send({ access_token });
  }

  @Role('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('profile')
  getUserProfile(@Req() req: Request) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  async setCookie(response: Response, refreshToken: any) {
    // millis * sec * min * hours * 10 days
    const expTime = 1000 * 60 * 60 * 24 * 10;
    // use "our 10 days time" when "COOKIE_EXP_TIME" is not defined
    const cookieExpTimeStr = this.configService.get<string>(
      'COOKIE_EXP_TIME',
      `${expTime}`,
    );
    const expiryTime = new Date(Date.now() + parseInt(cookieExpTimeStr));
    response.cookie('token', refreshToken, {
      path: '/auth/refresh',
      signed: true,
      sameSite: true,
      httpOnly: true,
      expires: expiryTime,
    });
  }
}
