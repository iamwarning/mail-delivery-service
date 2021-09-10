import { ContextDto } from './context-dto.interface';

export interface EmailDto {
  email: string;
  subject: string;
  template: string;
  context: ContextDto;
}
