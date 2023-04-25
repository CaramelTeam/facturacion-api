import { IsNumber, IsString, MaxLength } from "class-validator";

export class CreateProductDto {
    @IsString({message: 'Product name cannot be a number'})
    name: string

    @IsString({message :'Product description is a string '})
    description: string

    @IsNumber()
    price: number

    @IsNumber()
    productKey: number

    @MaxLength(6, {message: 'The drive key cannot be longer than 6 characters.'})
    @IsString()
    unitKey: string

    @IsString({message: 'La clave de la unidad no puede ser mayor a 6 caracteres'})
    unitName: string
}
