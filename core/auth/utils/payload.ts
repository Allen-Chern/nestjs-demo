export type UserPayload = {
  id: string;
  type: 'JWT';
};

export type FacebookPayload = {
  openId: string;
  email: string;
  name: string;
  type: 'FACEBOOK';
};

export type Payload = UserPayload | FacebookPayload;
