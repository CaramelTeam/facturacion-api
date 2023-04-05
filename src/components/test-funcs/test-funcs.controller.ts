import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TestFuncsService } from './test-funcs.service';
import { TestEmailDto } from './dto/create-test-func.dto';
import { JwtAuthGuard } from '../auth/guards';
import { GetUser } from '../auth/decorators';

@UseGuards(JwtAuthGuard)
@Controller('test-funcs')
export class TestFuncsController {
  constructor(private readonly testFuncsService: TestFuncsService) {}

  @Post('test-email')
  create(@Body() Email: TestEmailDto, @GetUser() user ) {
    const username = `${user.name} ${user.lastname}`
    return this.testFuncsService.testEmail(Email, username);
  }

}
