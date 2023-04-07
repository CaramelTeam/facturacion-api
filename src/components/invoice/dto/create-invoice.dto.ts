import { IsDateString, IsEmail, IsJSON, IsNumber, IsOptional, IsString, MaxDate, MaxLength, length } from "class-validator";
import { CancellationStatus, InvoiceType, PaymentForm } from "../types/invoice.types";

export class CreateInvoiceDto {
    // @IsNumber()
    // customerId: number;

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
