import { IsArray, IsDateString, IsDefined, IsEmail, IsEnum, IsJSON, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, MaxDate, MaxLength, Validate, length } from "class-validator";
import { CFDI, CancellationStatus, CustomerI, InvoiceType, PaymentForm, PaymentMethod } from "../types/invoice.types";
import { Type } from "class-transformer";
import { CustomValidateNested } from "../custom-validator/customValidateNested";
import { CustomerDto } from "./customer.dto";
import { ItemDto } from "./items.dto";

export class CreateInvoiceDto {

    @CustomValidateNested(CustomerDto)
    customer: CustomerDto;

    @CustomValidateNested(ItemDto)
    @IsArray()
    @IsNotEmpty()
    items: ItemDto[];  

    @IsNumber()
    @IsNotEmpty()
    customerId: number;

    @IsEnum(CFDI)
    @IsNotEmpty()
    use: CFDI;

    @IsEnum(InvoiceType)
    @IsNotEmpty()
    type: InvoiceType;

    @IsEnum(PaymentForm)
    @IsNotEmpty()
    payment_form: PaymentForm;

    @IsEnum(PaymentMethod)
    @IsNotEmpty()
    payment_method: PaymentMethod;

    @IsString()
    @IsOptional()
    conditions?: string;

    @IsString()
    @IsOptional()
    series?: string;

}