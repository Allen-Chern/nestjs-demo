export class UserVerificationCreatedEvent {
  static token = 'USER_VERIFICATION_CREATED';

  constructor(public id: string) {}
}
