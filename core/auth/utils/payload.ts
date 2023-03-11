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

export type GooglePayload = {
  openId: string;
  email: string;
  name: string;
  type: 'GOOGLE';
};

export type Payload = UserPayload | FacebookPayload | GooglePayload;
