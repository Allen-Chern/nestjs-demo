import { Argon2 } from '@@common/helpers/argon2';
import { CreateUserService } from '@@core/user/services/create-user';
import { QueryUserService } from '@@core/user/services/query-user';
import { Inject, Injectable } from '@nestjs/common';
import { FacebookPayload, GooglePayload } from '../utils/payload';

@Injectable()
export class AuthService {
  @Inject(QueryUserService)
  private queryUserService: QueryUserService;

  @Inject(CreateUserService)
  private createUserService: CreateUserService;

  @Inject(Argon2)
  private argon2: Argon2;

  async queryOrCreateUserByFacebookProfile(input: FacebookPayload) {
    let user = await this.queryUserService.queryByFacebookId(input.openId);
    if (!user) {
      user = await this.createUserService.createFacebookUser({
        email: input.email,
        name: input.name,
        openId: input.openId,
      });
    }

    return user;
  }

  async queryOrCreateUserByGoogleProfile(input: GooglePayload) {
    let user = await this.queryUserService.queryByGoogleId(input.openId);
    if (!user) {
      user = await this.createUserService.createGoogleUser({
        email: input.email,
        name: input.name,
        openId: input.openId,
      });
    }

    return user;
  }

  async validateBasicUser(email: string, password: string) {
    const user = await this.queryUserService.queryByBasicEmail(email);
    if (user && user.hashedPassword) {
      const isPasswordCorrect = await this.argon2.verify(user.hashedPassword, password);
      if (isPasswordCorrect) {
        return user;
      }
    }

    return null;
  }
}
