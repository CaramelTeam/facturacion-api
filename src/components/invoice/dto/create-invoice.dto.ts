import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from "class-validator";
import { CFDI, InvoiceType, PaymentForm, PaymentMethod } from "../types/invoice.types";
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

    @IsString()
    @IsNotEmpty()
    customerId: string;

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

    @IsNumber()
    @IsOptional()
    createdBy?: number;

}