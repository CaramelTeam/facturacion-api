import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { JWTI } from './interfaces/jwt.interface';
import { decrypt } from '../../helpers/bcrypt/index';
import envsConfig from 'src/config/envs.config';

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

  async validateJwt(jwt: string) {
    // const resp = await this.jwtService.verify(jwt, { secret: envsConfig().JWT.JWT_SECRET })
    try {
      return await this.jwtService.verifyAsync(jwt, { secret: envsConfig().JWT.JWT_SECRET })
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }

}
