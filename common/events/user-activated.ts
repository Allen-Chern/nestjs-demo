export class UserActivatedEvent {
  static token = 'USER_ACTIVATED';

  constructor(public id: string) {}
}
