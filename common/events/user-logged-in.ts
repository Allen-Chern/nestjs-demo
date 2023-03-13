export class UserLoggedInEvent {
  static token = 'USER_LOGGED_IN';

  constructor(public id: string) {}
}
