import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { EmailDto } from '../../models/dto/email-dto.interface';
import { MailService } from '../../services/mail/mail.service';

@Controller('email')
export class EmailController {
  private readonly LOGGER = new Logger(EmailController.name, {
    timestamp: true,
  });

  constructor(private readonly _mailService: MailService) {}

  @Post('/send')
  async email(@Res() res: Response, @Body() emailDto: EmailDto) {
    const { email, subject, template, context } = emailDto;
    this.LOGGER.log(`» email() [${email}]: ${subject}`);
    const { messageId } = await this._mailService.sendEmail(
      email,
      subject,
      template,
      context,
    );
    this.LOGGER.log(`» email() [${email}]: Email sent successfully.`);
    res.status(HttpStatus.OK).json({
      timestamp: new Date().toISOString(),
      statusCode: HttpStatus.OK,
      message: 'Email sent successfully.',
      messageId,
    });
  }
}
