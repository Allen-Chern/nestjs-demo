import { assert } from '@@common/misc/assert';
import { QueryUserVerificationService } from '@@core/user-verification/services/query-user-verification';
import { QueryUserService } from '@@core/user/services/query-user';
import { Body, Controller, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common';
import { RegisterDto } from '../dto/register';
import { PasswordService } from '../services/password';
import { RegisterService } from '../services/register';
import { UpdateUserService } from '../services/update-user';
import { PASSWORD_TOO_WEAK_ERROR } from '../utils/password-too-weak-error';
import { PASSWORDS_NOT_MATCH_ERROR } from '../utils/passwords-not-match-error';
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

    return HttpStatus.CREATED;
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

    return HttpStatus.OK;
  }
}
