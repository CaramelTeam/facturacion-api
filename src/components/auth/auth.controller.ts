import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { GetUser, RawHeaders } from './decorators';
import { PermsGuard } from './guards/perms.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


// @UseGuards(JwtAuthGuard, PermsGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  create(@Body() login: LoginDto) {
    return this.authService.login(login);
  }

  @Post('validate')
  validateJwt(@Body('jwt') jwt: string) {
    return this.authService.validateJwt(jwt);
  }

  // @Get('private')
  // testingPrivateRoute(
  //   @GetUser() user,
  //   @GetUser('email') userEmail: string,
  //   @RawHeaders() rawHeaders: string[]
  // ) {
  //   return {
  //     "message": "Private route",
  //     user,
  //     userEmail,
  //     rawHeaders
  //   }
  // }

}
