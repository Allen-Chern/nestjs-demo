import {
  ACCESS_JWT_EXPIRES_IN_SECONDS_TOKEN,
  ACCESS_JWT_SECRET_TOKEN,
  FACEBOOK_APP_ID_TOKEN,
  FACEBOOK_APP_SECRET_TOKEN,
  FACEBOOK_CALLBACK_URL_TOKEN,
  FRONTEND_URL_TOKEN,
} from '@@core/auth/config';
import { Provider } from '@nestjs/common';
import { envs } from './envs';

export const configs: Provider[] = [
  {
    provide: ACCESS_JWT_SECRET_TOKEN,
    useValue: envs.ACCESS_JWT_SECRET,
  },
  {
    provide: ACCESS_JWT_EXPIRES_IN_SECONDS_TOKEN,
    useValue: envs.NODE_ENV === 'development' ? 3600 * 24 : 3600,
  },
  {
    provide: FACEBOOK_APP_ID_TOKEN,
    useValue: envs.FACEBOOK_APP_ID,
  },
  {
    provide: FACEBOOK_APP_SECRET_TOKEN,
    useValue: envs.FACEBOOK_APP_SECRET,
  },
  {
    provide: FACEBOOK_CALLBACK_URL_TOKEN,
    useValue: envs.FACEBOOK_CALLBACK_URL,
  },
  {
    provide: FRONTEND_URL_TOKEN,
    useValue: envs.FRONTEND_URL,
  },
];
