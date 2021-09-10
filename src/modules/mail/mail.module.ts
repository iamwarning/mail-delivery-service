import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from '../../services/mail/mail.service';

import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'host',
        secure: true,
        requireTLS: true,
        port: 465,
        auth: {
          user: 'support@mail.io',
          pass: 'cust0m-p@ssw0rd',
        },
      },
      defaults: {
        from: 'Hello <support@mail.io>',
      },
      template: {
        dir: join(__dirname, '../../templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
