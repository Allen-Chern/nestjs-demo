export const createUserVerificationCreatedMail = (
  name: string,
  expiresInMinutes: number,
  link: string,
) => {
  return {
    subject: '【NestJS Demo】E-mail Verification',
    html: `<p> Dear ${name},</p><p>Please click the link below to verified your email. *It will be expired in ${expiresInMinutes} minutes.</p><a target='_blank' href='${link}'>Click here.</a>`,
  };
};
