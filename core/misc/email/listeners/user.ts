import { UserActivatedEvent } from '@@common/events/user-activated';
import { UserVerificationCreatedEvent } from '@@common/events/user-verification-created';
import { assert } from '@@common/misc/assert';
import { USER_VERIFICATION_EXPIRES_IN_MINUTES_TOKEN } from '@@core/user-verification/config';
import { QueryUserVerificationService } from '@@core/user-verification/services/query-user-verification';
import { QueryUserService } from '@@core/user/services/query-user';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FRONTEND_LOGIN_URL_TOKEN, FRONTEND_VERIFICATION_URL_TOKEN } from '../config';
import { Mailer } from '../services/mailer';
import { createUserVerificationCreatedMail } from '../templates/user-verification.created';
import { createUserActivatedMail } from '../templates/user.activated';

@Injectable()
export class UserEmailService {
  @Inject(FRONTEND_LOGIN_URL_TOKEN)
  private frontendLoginUrl: string;

  @Inject(FRONTEND_VERIFICATION_URL_TOKEN)
  private frontendVerificationUrl: string;

  @Inject(USER_VERIFICATION_EXPIRES_IN_MINUTES_TOKEN)
  private verificationExpiresInMinutes: number;

  @Inject(Mailer)
  private mailer: Mailer;

  @Inject(QueryUserService)
  private queryUserService: QueryUserService;

  @Inject(QueryUserVerificationService)
  private queryUserVerificationService: QueryUserVerificationService;

  private async sendUserVerificationEmail(id: string) {
    const verification = await this.queryUserVerificationService.queryById(id);
    assert(verification);

    const user = await this.queryUserService.queryById(verification.userId);
    assert(user);

    const link = `${this.frontendVerificationUrl}/${verification.id}`;

    const { subject, html } = createUserVerificationCreatedMail(
      user.name,
      this.verificationExpiresInMinutes,
      link,
      verification.id,
    );

    await this.mailer.send({ subject, html, to: user.email });

    return;
  }

  private async sendUserActivatedEmail(id: string) {
    const user = await this.queryUserService.queryById(id);
    assert(user);

    const { subject, html } = createUserActivatedMail(user.name, this.frontendLoginUrl);

    await this.mailer.send({ subject, html, to: user.email });

    return;
  }

  @OnEvent(UserVerificationCreatedEvent.token)
  async onUserVerificationCreated(payload: UserVerificationCreatedEvent) {
    await this.sendUserVerificationEmail(payload.id);
  }

  @OnEvent(UserActivatedEvent.token)
  async onUserActivated(payload: UserActivatedEvent) {
    await this.sendUserActivatedEmail(payload.id);
  }
}
