import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, Logger } from '@nestjs/common';

export type SendOptions = {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
};

@Injectable()
export class Mailer {
  private logger = new Logger(Mailer.name);

  @Inject(MailerService)
  private mailerService: MailerService;

  async send(options: SendOptions) {
    await this.mailerService.sendMail({
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    this.logger.log(`Email sent. subject: ${options.subject}`);
  }
}
