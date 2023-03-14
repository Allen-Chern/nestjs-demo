import { AccessJwt } from '@@common/helpers/access-jwt';
import { Argon2 } from '@@common/helpers/argon2';
import { Provider } from '@nestjs/common';

export const helpers: Provider[] = [Argon2, AccessJwt];
