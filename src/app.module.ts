import { Module } from '@nestjs/common';
import { MailModule } from './modules/mail/mail.module';
import { EmailController } from './controllers/email/email.controller';
@Module({
  imports: [MailModule],
  controllers: [EmailController],
  providers: [],
})
export class AppModule {}
