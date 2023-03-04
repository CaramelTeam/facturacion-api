import { IsNumber, IsString, MaxLength } from "class-validator";

export class CreateProductDto {
    @IsString({message: 'El nombre del producto no puede ser un número'})
    name: string

    @IsString()
    description: string

    @IsNumber()
    price: number

    @IsNumber()
    productKey: number

    @MaxLength(6, {message: 'La clave de la unidad no puede ser mayor a 6 caracteres'})
    @IsString()
    unitKey: string

    @IsString()
    unitName: string
}
