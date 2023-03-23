import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './components/user/user.module';
import { DatabaseModule } from './config/database/database.module';
import { ProductsModule } from './components/products/products.module';
import { AuthModule } from './components/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    ProductsModule,
    AuthModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
