import { Inject, Injectable } from '@nestjs/common';
import { FACTU_DATA_SOURCE } from "src/constants";
import { DataSource } from 'typeorm';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { InvoiceE } from '../entities/invoice.entity';
import { FacturapiService } from '../api/facturapi.service';
import { CFDI, InvoiceI, InvoiceType, PaymentForm, PaymentMethod } from '../types/invoice.types';

@Injectable()
export class InvoiceRepository {
    constructor(
        @Inject(FACTU_DATA_SOURCE)
        private readonly dataSource: DataSource,
        private readonly facturapi: FacturapiService
    ) { }

    private readonly invoiceRepository = this.dataSource.getRepository(InvoiceE)

    async store(payload: CreateInvoiceDto) {
        // const invoiceData: any = {
        //     customer: {
        //         legal_name: "Jim Antonio Loza Orozco",
        //         email: "email@example.com",
        //         tax_id: "LOOJ990525K25",
        //         tax_system: "626",
        //         address: {
        //             zip: "45606"
        //         }
        //     },
        //     items: [{
        //         quantity: 36,
        //         product: {
        //             description: "Cinta",
        //             product_key: "31201500",
        //             price: 345.60
        //         }
        //     }],
        //     payment_form: "03",
        //     folio_number: 914,
        //     series: "F"
        // }

        return await this.facturapi.createInvoice(payload)
    }
}