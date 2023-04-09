import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { CustomValidateNested } from "../custom-validator/customValidateNested";

class AddressDto {
    @IsString()
    @MaxLength(5)
    zip: string;
}

export class CustomerDto {
    @IsString()
    legal_name: string;
    @IsString()
    tax_id: string;
    @IsString()
    tax_system: string;
    @IsEmail()
    @IsOptional()
    email?: string;

    @CustomValidateNested(AddressDto)
    address: AddressDto
}