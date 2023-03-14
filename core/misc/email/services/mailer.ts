import { Inject, Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {
  SMTP_KEY_TOKEN,
  SMTP_MAIL_FROM_TOKEN,
  SMTP_SECRET_TOKEN,
  SMTP_SERVICE_TOKEN,
} from '../config';

export type SendOptions = {
  to: string | string[];
  subject: string;
  html?: string;
};

@Injectable()
export class Mailer {
  private logger = new Logger(Mailer.name);

  private transporter: nodemailer.Transporter;

  @Inject(SMTP_MAIL_FROM_TOKEN)
  smtpMailFrom: string;

  constructor(
    @Inject(SMTP_SERVICE_TOKEN) smtpService: string,
    @Inject(SMTP_KEY_TOKEN) smtpKey: string,
    @Inject(SMTP_SECRET_TOKEN) smtpSecret: string,
  ) {
    this.transporter = nodemailer.createTransport({
      service: smtpService,
      auth: {
        user: smtpKey,
        pass: smtpSecret,
      },
    });
  }

  async send(options: SendOptions) {
    await this.transporter.sendMail({
      from: this.smtpMailFrom,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    this.logger.log(`Email sent. subject: ${options.subject}`);
  }
}
