import { QueryUserService } from '@@core/user/services/query-user';
import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { RegisterDto } from '../dto/register';
import { PasswordService } from '../services/password';
import { RegisterService } from '../services/register';
import { PASSWORD_TOO_WEAK_ERROR } from '../utils/password-too-weak-error';
import { PASSWORDS_NOT_MATCH_ERROR } from '../utils/passwords-not-match-error';
import { USER_ALREADY_EXIST_ERROR } from '../utils/user-already-exist-error';

@Controller('user')
export class UserController {
  @Inject(QueryUserService)
  private queryUserService: QueryUserService;

  @Inject(PasswordService)
  private passwordService: PasswordService;

  @Inject(RegisterService)
  private registerService: RegisterService;

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
}
