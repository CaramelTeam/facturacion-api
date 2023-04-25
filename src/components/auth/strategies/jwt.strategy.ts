import { UnauthorizedException, Injectable } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import envsConfig from "src/config/envs.config";
import { JWTI } from "../interfaces/jwt.interface";
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private userService: UserService
    ) {

        super({
            secretOrKey: envsConfig().JWT.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    // async validate(payload: JWTI): Promise<UserE> {
    async validate(payload: JWTI) {
        const { email } = payload;
        const user = await this.userService.findByEmail(email);
        delete user.password;
        if (!user) {
            throw new UnauthorizedException('Unauthorized');
        }

        return user;
    }

}