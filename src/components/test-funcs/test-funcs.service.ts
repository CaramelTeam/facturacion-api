import { Injectable } from '@nestjs/common';
import { TestEmailDto } from './dto/create-test-func.dto';
import { UpdateTestFuncDto } from './dto/update-test-func.dto';
import { EmailI } from '../../helpers/email/types/email.types';
import { EmailService } from 'src/helpers/email/email.service';

@Injectable()
export class TestFuncsService {

  constructor(
    private readonly emailService: EmailService
  ) { }
  
  async testEmail(email: TestEmailDto, username: string) {
    const content = `
      <p>Test de email</p>
      <p>El usuario ${username} a creado una nueva notificacion dinamica </p>
      `
    const emailConfig: EmailI = {
      to: email.to,
      subject: email.subject, 
      template: email.template,
      html: content,
      preview: 'Esta es la vista previa del correo',
      title: 'Titulo dinamico',  
      options: {
        button: {
          text: 'Texto dinamico',
          url: 'https://www.google.com'
        }
      }
    }

    return await this.emailService.sendEmail(emailConfig)
  }
}
