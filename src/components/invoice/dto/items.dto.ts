import { IsBoolean, IsBooleanString, IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CustomValidateNested } from "../custom-validator/customValidateNested";
import { TaxesFactor, TaxesTypes } from "../types/invoice.types";

class TaxesDto {
    @IsNumber()
    @IsNotEmpty()
    rate: number;

    @IsEnum(TaxesTypes)
    @IsNotEmpty()
    type: TaxesTypes;

    @IsEnum(TaxesFactor)
    @IsNotEmpty()
    factor: TaxesFactor;

    @IsBoolean()
    @IsOptional()
    withholding: boolean;
}

class ProductDto {

    @IsNumber()
    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    product_key: string;

    // @IsDecimal({ decimal_digits: '10,2'})
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    price: number;

    @CustomValidateNested(TaxesDto)
    @IsOptional()
    taxes?: TaxesDto[];

    @IsString()
    unit_key: string;

    @IsBoolean()
    tax_included: boolean;

}

export class ItemDto {

    @IsNumber()
    quantity: number;

    @CustomValidateNested(ProductDto)
    product: ProductDto;

    @IsNumber()
    @IsOptional()
    discount?: number;
}