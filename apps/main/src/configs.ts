import { ACCESS_JWT_EXPIRES_IN_SECONDS_TOKEN, ACCESS_JWT_SECRET_TOKEN } from '@@common/config';
import {
  FACEBOOK_APP_ID_TOKEN,
  FACEBOOK_APP_SECRET_TOKEN,
  FACEBOOK_CALLBACK_URL_TOKEN,
  FRONTEND_DASHBOARD_URL_TOKEN,
  GOOGLE_APP_ID_TOKEN,
  GOOGLE_APP_SECRET_TOKEN,
  GOOGLE_CALLBACK_URL_TOKEN,
} from '@@core/auth/config';
import {
  FRONTEND_LOGIN_URL_TOKEN,
  FRONTEND_VERIFICATION_URL_TOKEN,
  SMTP_KEY_TOKEN,
  SMTP_MAIL_FROM_TOKEN,
  SMTP_SECRET_TOKEN,
  SMTP_SERVICE_TOKEN,
} from '@@core/misc/email/config';
import { USER_VERIFICATION_EXPIRES_IN_MINUTES_TOKEN } from '@@core/user-verification/config';
import { PASSWORD_REGEXP_TOKEN } from '@@core/user/config';
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
    provide: SMTP_SERVICE_TOKEN,
    useValue: envs.SMTP_SERVICE,
  },
  {
    provide: SMTP_KEY_TOKEN,
    useValue: envs.SMTP_KEY,
  },
  {
    provide: SMTP_SECRET_TOKEN,
    useValue: envs.SMTP_SECRET,
  },
  {
    provide: SMTP_MAIL_FROM_TOKEN,
    useValue: envs.SMTP_MAIL_FROM,
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
    useValue: `${envs.BACKEND_API_BASE_URL}/${envs.FACEBOOK_CALLBACK_PATH}`,
  },
  {
    provide: GOOGLE_APP_ID_TOKEN,
    useValue: envs.GOOGLE_APP_ID,
  },
  {
    provide: GOOGLE_APP_SECRET_TOKEN,
    useValue: envs.GOOGLE_APP_SECRET,
  },
  {
    provide: GOOGLE_CALLBACK_URL_TOKEN,
    useValue: `${envs.BACKEND_API_BASE_URL}/${envs.GOOGLE_CALLBACK_PATH}`,
  },
  {
    provide: FRONTEND_LOGIN_URL_TOKEN,
    useValue: `${envs.FRONTEND_BASE_URL}/${envs.FRONTEND_LOGIN_PATH}`,
  },
  {
    provide: FRONTEND_DASHBOARD_URL_TOKEN,
    useValue: `${envs.FRONTEND_BASE_URL}/${envs.FRONTEND_DASHBOARD_PATH}`,
  },
  {
    provide: FRONTEND_VERIFICATION_URL_TOKEN,
    useValue: `${envs.FRONTEND_BASE_URL}/${envs.FRONTEND_VERIFICATION_PATH}`,
  },
  {
    provide: PASSWORD_REGEXP_TOKEN,
    useValue: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  },
  {
    provide: USER_VERIFICATION_EXPIRES_IN_MINUTES_TOKEN,
    useValue: 10,
  },
];
