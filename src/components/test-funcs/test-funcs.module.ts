import { Module } from '@nestjs/common';
import { TestFuncsService } from './test-funcs.service';
import { TestFuncsController } from './test-funcs.controller';
import { EmailModule } from 'src/helpers/email/email.module';

@Module({
  controllers: [TestFuncsController],
  providers: [TestFuncsService],
  imports: [EmailModule],
})
export class TestFuncsModule {}
