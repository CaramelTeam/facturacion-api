import { IsEmail, IsPhoneNumber, IsString, MaxLength } from "class-validator";

export class CreateCustomerDto {  

 @IsString({message:'legal_name cannot be a number'})
 legal_name:string

 @IsString({message:'tax_id cannot be a number'})
 tax_id:string;

 @MaxLength(3, {message: 'The tax_id  cannot be longer than 3 characters.'})
 @IsString()
 tax_system:string;

 @MaxLength(6, {message: 'The zip  cannot be longer than 6 characters.'})
 @IsString()
 zip:string;

 @IsString({message:'street cannot be number'})
 street:string;

 @IsString({message:'exterior cannot be number'})
 exterior:string;

 @IsString({message:'interior cannot be number'})
 interior:string;

 @IsString({message:'neighborhood cannot be number'})
 neighborhood:string;

 @IsString({message:'city cannot be number'})
 city:string;

 @IsString({message:'municipality cannot be number'})
 municipality:string;

 @IsString({message:'state cannot be number'})
 state:string;

 @IsString({message:'country cannot be number'})
 country:string;

 @IsEmail()
 email:string;
 
@IsPhoneNumber('MX')
 phone:string;



}
