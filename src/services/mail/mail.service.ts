import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly LOGGER = new Logger(MailService.name, { timestamp: true });
  constructor(private readonly _mailerService: MailerService) {}

  async sendEmail(
    email: string,
    subject: string,
    template: string,
    context: any,
  ) {
    this.LOGGER.log(`» sendEmail() [${email}]`);
    return this._mailerService.sendMail({
      to: email,
      subject,
      template,
      context,
    });
  }
}
