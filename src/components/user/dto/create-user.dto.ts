import { IsEmail, IsPhoneNumber, IsString, MaxLength } from "class-validator"



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

    @IsPhoneNumber('MX')
    @MaxLength(25)
    phone: string;

    
}
