import { Request as Req } from 'express';
import { Payload } from './payload';

export interface Request extends Req {
  user: Payload | undefined;
}
