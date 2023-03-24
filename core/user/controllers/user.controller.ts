import { Argon2 } from '@@common/helpers/argon2';
import { assert } from '@@common/misc/assert';
import { SuccessResponse } from '@@common/misc/success-response';
import { AccountBasicAuth, Auth } from '@@core/auth/utils/auth-guard';
import { UserId } from '@@core/auth/utils/user-id';
import { QueryUserVerificationService } from '@@core/user-verification/services/query-user-verification';
import { QueryUserService } from '@@core/user/services/query-user';
import { Body, Controller, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ChangePasswordDto } from '../dto/change-password';
import { RegisterDto } from '../dto/register';
import { UpdateInfoDto } from '../dto/update-info';
import { ProviderType } from '../models/provider-type';
import { DashboardService } from '../services/dashboard';
import { PasswordService } from '../services/password';
import { RegisterService } from '../services/register';
import { StatisticsService } from '../services/statistics';
import { UpdateUserService } from '../services/update-user';
import { PASSWORD_INCORRECT_ERROR } from '../utils/password-incorrect-error';
import { PASSWORD_TOO_WEAK_ERROR } from '../utils/password-too-weak-error';
import { PASSWORDS_NOT_MATCH_ERROR } from '../utils/passwords-not-match-error';
import { USER_ALREADY_ACTIVATED_ERROR } from '../utils/user-already-activated-error';
import { USER_ALREADY_EXIST_ERROR } from '../utils/user-already-exist-error';
import { VERIFICATION_TOKEN_EXPIRED_ERROR } from '../utils/verification-token-expired';
import { VERIFICATION_TOKEN_INVALID_ERROR } from '../utils/verification-token-invalid';

@Controller('user')
export class UserController {
  @Inject(QueryUserService)
  private queryUserService: QueryUserService;

  @Inject(QueryUserVerificationService)
  private queryUserVerificationService: QueryUserVerificationService;

  @Inject(PasswordService)
  private passwordService: PasswordService;

  @Inject(RegisterService)
  private registerService: RegisterService;

  @Inject(UpdateUserService)
  private updateUserService: UpdateUserService;

  @Inject(DashboardService)
  private dashboardService: DashboardService;

  @Inject(StatisticsService)
  private statisticsService: StatisticsService;

  @Inject(Argon2)
  private argon2: Argon2;

  @Post('register')
  async register(@Body() input: RegisterDto) {
    const user = await this.queryUserService.queryByBasicEmail(input.email);
    if (user) {
      throw USER_ALREADY_EXIST_ERROR;
    }

    if (input.password !== input.confirmPassword) {
      throw PASSWORDS_NOT_MATCH_ERROR;
    }

    const validatePassword = this.passwordService.validate(input.password);
    if (!validatePassword) {
      throw PASSWORD_TOO_WEAK_ERROR;
    }

    await this.registerService.create({
      email: input.email,
      name: input.name,
      password: input.password,
    });

    return SuccessResponse;
  }

  @Put('verify/:token')
  async verify(@Param('token') token: string) {
    const verification = await this.queryUserVerificationService.queryById(token);
    if (!verification) {
      throw VERIFICATION_TOKEN_INVALID_ERROR;
    }

    const user = await this.queryUserService.queryById(verification.userId);
    assert(user, `user not found: ${verification.userId}`);

    if (!user.isActivate) {
      const currentTime = new Date();
      if (currentTime > verification.invalidatedAt) {
        throw VERIFICATION_TOKEN_EXPIRED_ERROR;
      }

      await this.updateUserService.activateUser(user);
    }

    return SuccessResponse;
  }

  @AccountBasicAuth()
  @Post('resendVerification')
  async resendVerification(@UserId() userId: string) {
    const user = await this.queryUserService.queryById(userId);
    assert(user, `user not found: ${userId}`);

    if (user.isActivate) {
      throw USER_ALREADY_ACTIVATED_ERROR;
    }

    await this.registerService.resendVerification(user.id);

    return SuccessResponse;
  }

  @Auth()
  @Put('changePassword')
  async changePassword(@UserId() userId: string, @Body() input: ChangePasswordDto) {
    const user = await this.queryUserService.queryById(userId);
    assert(user, `user not found: ${userId}`);
    assert(user.providerType === ProviderType.BASIC, 'invalid provider type.');
    assert(user.hashedPassword, 'hashedPassword should not be null.');

    const isPasswordCorrect = await this.argon2.verify(user.hashedPassword, input.oldPassword);
    if (!isPasswordCorrect) {
      throw PASSWORD_INCORRECT_ERROR;
    }

    if (input.newPassword !== input.confirmPassword) {
      throw PASSWORDS_NOT_MATCH_ERROR;
    }

    const validatePassword = this.passwordService.validate(input.newPassword);
    if (!validatePassword) {
      throw PASSWORD_TOO_WEAK_ERROR;
    }

    await this.updateUserService.updatePassword(user, input.newPassword);

    return SuccessResponse;
  }

  @Auth()
  @Put('updateInfo')
  async updateInfo(@UserId() userId: string, @Body() input: UpdateInfoDto) {
    const user = await this.queryUserService.queryById(userId);
    assert(user, `user not found: ${userId}`);

    const result = await this.updateUserService.updateInfo(user, input.name);

    return result;
  }

  @Auth()
  @Get('dashboard')
  async dashboard(@UserId() userId: string) {
    const loginInfo = await this.dashboardService.query(userId);

    return loginInfo;
  }

  @Auth()
  @Get('statistics')
  async statistics() {
    const statisticsInfo = await this.statisticsService.query();

    return statisticsInfo;
  }
}
