import { Inject, Injectable } from '@nestjs/common';
import { FACTU_DATA_SOURCE } from "src/constants";
import { DataSource } from 'typeorm';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { InvoiceE } from '../entities/invoice.entity';
import { FacturapiService } from '../api/facturapi.service';
@Injectable()
export class InvoiceRepository {
    constructor(
        @Inject(FACTU_DATA_SOURCE)
        private readonly dataSource: DataSource,
        private readonly facturapi: FacturapiService
    ) { }

    private readonly invoiceRepository = this.dataSource.getRepository(InvoiceE)

    async store(payload: CreateInvoiceDto) {
        const { customerId, ...apiInvoice } = payload;
        const data = await this.facturapi.createInvoice(apiInvoice);
        delete data.id
        const invoice = this.invoiceRepository.create({
            customerId,
            fiscal_folio: data.uuid,
            ...data
        });
        return this.invoiceRepository.save(invoice);
    }
}