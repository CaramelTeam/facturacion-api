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

    async store() {
        const invoiceData: any = {
            customer: {
                legal_name: 'Dunder Mifflin',
                email: 'email@example.com',
                tax_id: 'ABC101010111',
                tax_system: '601',
                address: {
                    zip: '85900'
                }
            },
            items: [{
                quantity: 2,
                product: {
                    description: 'Ukelele',
                    product_key: '60131324',
                    price: 345.60
                }
            }],
            payment_form: PaymentForm.DINERO_ELECTRONICO,
            folio_number: 914,
            series: 'F'
        }
        const newInvoice = await this.facturapi.createInvoice(invoiceData)
        return newInvoice;

    }
}