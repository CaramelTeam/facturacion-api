import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './components/user/user.module';
import { DatabaseModule } from './config/database/database.module';
import { ProductsModule } from './components/products/products.module';
import { AuthModule } from './components/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    ProductsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
