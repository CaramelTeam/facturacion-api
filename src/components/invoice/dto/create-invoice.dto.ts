import { IsDateString, IsEmail, IsJSON, IsNumber, IsObject, IsOptional, IsString, MaxDate, MaxLength, Validate, ValidateNested, length } from "class-validator";
import { CancellationStatus, CustomerI, InvoiceType, PaymentForm } from "../types/invoice.types";
import { ValidateCustomer } from "./ValidateCustomer";

export class CreateInvoiceDto {

    @Validate(ValidateCustomer, {
        message: 'Customer is not valid',
    })
    customer: CustomerI

    @IsNumber()
    customerId: number;

    // @IsString()
    // legal_name: string;

    // @IsString()
    // tax_id: string;

    // @IsString()
    // @MaxLength(3)
    // tax_system: string;

    // @IsEmail()
    // @IsOptional()
    // email: string

    // @IsNumber()
    // @MaxLength(6)
    // zip: string

    // @IsJSON()
    // items: [
    //     {
    //         quantity: number
    //         product: {
    //             description: string,
    //             product_key: string,
    //             price: number
    //         }
    //         discount?: number
    //     }
    // ]    

    // @IsString()
    // cancellation_status: CancellationStatus

    // @IsString()
    // type: InvoiceType

    // @IsString()
    // payment_form: PaymentForm

    // @IsDateString()
    // expiration_date: Date 

    // @IsString()
    // @IsOptional()
    // related_documents: string

}
