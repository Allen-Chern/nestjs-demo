import { Inject, Injectable } from '@nestjs/common';
import { PASSWORD_REGEXP_TOKEN } from '../config';

@Injectable()
export class PasswordService {
  @Inject(PASSWORD_REGEXP_TOKEN)
  private passwordRegExp: RegExp;

  validate(password: string) {
    return this.passwordRegExp.test(password);
  }
}
