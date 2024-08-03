import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength } from "class-validator";

export class CreateCustomerDto {

    @IsNotEmpty()
    @IsString({ message: 'legal_name cannot be a number' })
    legal_name: string

    @IsNotEmpty()
    @IsString({ message: 'tax_id cannot be a number' })
    tax_id: string;

    @IsNotEmpty()
    @MaxLength(3, { message: 'The tax_id  cannot be longer than 3 characters.' })
    @IsString()
    tax_system: string;


    @IsNotEmpty()
    @MaxLength(3, { message: 'The preferred_cfdi  cannot be longer than 3 characters.' })
    @IsString()
    preferred_cfdi: string;

    @IsNotEmpty()
    @MaxLength(6, { message: 'The zip  cannot be longer than 6 characters.' })
    @IsString()
    zip: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsPhoneNumber('MX')
    phone: string;

    @IsOptional()
    @IsString({ message: 'street cannot be number' })
    street: string;

    @IsOptional()
    @IsString({ message: 'exterior cannot be number' })
    exterior: string;

    @IsOptional()
    @IsString({ message: 'interior cannot be number' })
    interior: string;

    @IsOptional()
    @IsString({ message: 'neighborhood cannot be number' })
    neighborhood: string;

    @IsOptional()
    @IsString({ message: 'city cannot be number' })
    city: string;

    @IsOptional()
    @IsString({ message: 'municipality cannot be number' })
    municipality: string;

    @IsOptional()
    @IsString({ message: 'state cannot be number' })
    state: string;

    @IsOptional()
    @IsString({ message: 'country cannot be number' })
    country: string;

}
