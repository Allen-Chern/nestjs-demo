import { assert } from '@@common/misc/assert';
import { FailResponse } from '@@common/misc/fail-response';
import { SuccessResponse } from '@@common/misc/success-response';
import { QueryUserService } from '@@core/user/services/query-user';
import { Body, Controller, Get, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { FRONTEND_DASHBOARD_URL_TOKEN } from '../config';
import { LoginDto } from '../dto/login';
import { AuthService } from '../services/auth';
import { TokenManager } from '../services/token-manager';
import { Auth } from '../utils/auth-guard';
import { Request } from '../utils/context';
import { LOGIN_BAD_INPUT_ERROR } from '../utils/login-bad-input-error';
import { FacebookPayload, GooglePayload } from '../utils/payload';

@Controller('auth')
export class AuthController {
  @Inject(QueryUserService)
  private queryUserService: QueryUserService;

  @Inject(AuthService)
  private authService: AuthService;

  @Inject(TokenManager)
  private tokenManager: TokenManager;

  @Inject(FRONTEND_DASHBOARD_URL_TOKEN)
  private frontendDashboardUrl: string;

  @Post('login')
  async login(@Res() res: Response, @Body() input: LoginDto) {
    const user = await this.authService.validateBasicUser(input.email, input.password);
    if (!user) {
      throw LOGIN_BAD_INPUT_ERROR;
    }

    const token = await this.tokenManager.setToken(res, user);

    res.status(200).send(token);
  }

  @UseGuards(AuthGuard('facebook'))
  @Get('facebook')
  async facebookLogin() {
    return SuccessResponse;
  }

  @UseGuards(AuthGuard('facebook'))
  @Get('facebook/callback')
  async facebookLoginCallback(@Req() req: Request, @Res() res: Response) {
    const user = await this.authService.queryOrCreateUserByFacebookProfile(
      req.user as FacebookPayload,
    );

    await this.tokenManager.setToken(res, user);

    res.redirect(this.frontendDashboardUrl);
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleLogin() {
    return SuccessResponse;
  }

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleLoginCallback(@Req() req: Request, @Res() res: Response) {
    const user = await this.authService.queryOrCreateUserByGoogleProfile(req.user as GooglePayload);

    await this.tokenManager.setToken(res, user);

    res.redirect(this.frontendDashboardUrl);
  }

  @Get('me')
  async me(@Req() req: Request) {
    if (req.user && req.user.type === 'JWT') {
      return this.queryUserService.queryById(req.user.id);
    }

    return FailResponse;
  }

  @Auth()
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    assert(req.user && req.user.type === 'JWT', 'user should not be undefined.');

    await this.tokenManager.clearToken(res);

    res.status(200).send(SuccessResponse);
  }
}
