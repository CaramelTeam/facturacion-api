import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { JWTI } from './interfaces/jwt.interface';
import { decrypt } from '../../helpers/bcrypt/index';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) { }

  async login(login: LoginDto) {
    const user = await this.usersService.findByEmail(login.email);
    const comparePass = decrypt(login.password, user.password);
    if (!comparePass) {
      throw new UnauthorizedException('Unauthorized');
    }
    delete user.password;

    //TODO: Generate token
    const token = this.getJWTToken({ ...user });
    return {
      ...user,
      token
    }
  }

  private getJWTToken(payload: JWTI) {
    return this.jwtService.sign(payload);
  }

}
