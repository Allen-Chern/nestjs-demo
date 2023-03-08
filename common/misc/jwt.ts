import * as jwt from 'jsonwebtoken';

export class Jwt<Payload extends Record<string, any>> {
  constructor(private secret: string, private expiresIn: number | undefined) {}

  sign(payload: Payload) {
    const options = this.expiresIn ? { expiresIn: this.expiresIn } : undefined;

    return jwt.sign(payload, this.secret, options);
  }

  verify(token: string): (jwt.JwtPayload & Payload) | undefined {
    try {
      return jwt.verify(token, this.secret) as jwt.JwtPayload & Payload;
    } catch {
      // pass
    }
  }
}
