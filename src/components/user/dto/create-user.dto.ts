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
    @MaxLength(5, {message: 'El prefijo del número de teléfono no puede ser mayor a 5 caracteres'})
    prefixPhone: string;

    @IsPhoneNumber('MX')
    @MaxLength(20, {message: 'El número de teléfono no puede ser mayor a 20 caracteres'})
    phone: string;

    
}
