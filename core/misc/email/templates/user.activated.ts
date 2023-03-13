export const createUserActivatedMail = (name: string, link: string) => {
  return {
    subject: '【NestJS Demo】Your account has been activated',
    html: `<p> Dear ${name},</p><p>Please click the link below to login.</p><a target='_blank' href='${link}'>Click here.</a>`,
  };
};
