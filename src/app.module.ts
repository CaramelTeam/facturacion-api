import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './components/user/user.module';
import { DatabaseModule } from './config/database/database.module';
import { CustomerModule } from './components/customer/customer.module';

import { ProductsModule } from './components/products/products.module';
import { AuthModule } from './components/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import envsConfig from './config/envs.config';
import { join } from 'path';
import { TestFuncsModule } from './components/test-funcs/test-funcs.module';
import { EmailModule } from './helpers/email/email.module';

import { InvoiceModule } from './components/invoice/invoice.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { HealthModule } from './components/health/health.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    CustomerModule,
    ProductsModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: `${envsConfig().NODEMAILER.NODEMAILER_HOST}`,
        port: parseInt(`${envsConfig().NODEMAILER.NODEMAILER_PORT}`),
        secure: true,
        auth: {
          user: `${envsConfig().NODEMAILER.NODEMAILER_EMAIL}`,
          pass: `${envsConfig().NODEMAILER.NODEMAILER_PASSWORD}`,
        }
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
      }
    }),
    TestFuncsModule,
    EmailModule,
    InvoiceModule,
    HealthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
