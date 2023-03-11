import { assert } from '@@common/misc/assert';
import { QueryUserService } from '@@core/user/services/query-user';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { FRONTEND_URL_TOKEN } from '../config';
import { AuthService } from '../services/auth';
import { TokenManager } from '../services/token-manager';
import { Auth } from '../utils/auth-guard';
import { Request } from '../utils/context';
import { FacebookPayload, GooglePayload } from '../utils/payload';

class LoginInput {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  @Inject(QueryUserService)
  private queryUserService: QueryUserService;

  @Inject(AuthService)
  private authService: AuthService;

  @Inject(TokenManager)
  private tokenManager: TokenManager;

  @Inject(FRONTEND_URL_TOKEN)
  private frontendUrl: string;

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response, @Body() input: LoginInput) {
    const user = await this.authService.validateBasicUser(input.email, input.password);
    if (!user) {
      throw new UnauthorizedException();
    }

    await this.tokenManager.setToken(res, user);

    res.redirect(this.frontendUrl);
  }

  @UseGuards(AuthGuard('facebook'))
  @Get('facebook')
  async facebookLogin() {
    return HttpStatus.OK;
  }

  @UseGuards(AuthGuard('facebook'))
  @Get('facebook/callback')
  async facebookLoginCallback(@Req() req: Request, @Res() res: Response) {
    const user = await this.authService.queryOrCreateUserByFacebookProfile(
      req.user as FacebookPayload,
    );

    await this.tokenManager.setToken(res, user);

    res.redirect(this.frontendUrl);
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleLogin() {
    return HttpStatus.OK;
  }

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleLoginCallback(@Req() req: Request, @Res() res: Response) {
    const user = await this.authService.queryOrCreateUserByGoogleProfile(req.user as GooglePayload);

    await this.tokenManager.setToken(res, user);

    res.redirect(this.frontendUrl);
  }

  @Auth()
  @Get('me')
  async me(@Req() req: Request) {
    assert(req.user && req.user.type === 'JWT', 'user should not be undefined.');
    return this.queryUserService.queryById(req.user.id);
  }

  @Auth()
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    assert(req.user && req.user.type === 'JWT', 'user should not be undefined.');

    await this.tokenManager.clearToken(res);

    return HttpStatus.OK;
  }
}
