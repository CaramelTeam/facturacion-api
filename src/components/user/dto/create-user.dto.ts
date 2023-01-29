import { IsString } from "class-validator";
import { IsEmail, MaxLength } from "class-validator/types/decorator/decorators";


export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    name: string;

    @IsString()
    lastname: string;

    @IsString()
    @MaxLength(5)
    prefixPhone: string;

    @IsString()
    @MaxLength(25)
    phone: string;

    
}
