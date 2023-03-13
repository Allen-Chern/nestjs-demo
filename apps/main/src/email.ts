import { envs } from './envs';

export const mailConfig = {
  useFactory: async () => ({
    transport: {
      host: envs.SMTP_HOST,
      secure: false,
      auth: {
        user: envs.SMTP_KEY,
        pass: envs.SMTP_SECRET,
      },
    },
    defaults: {
      from: envs.SMTP_KEY,
    },
  }),
};
