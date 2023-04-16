import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FACTU_DATA_SOURCE } from "src/constants";
import { DataSource, FindOptionsSelect } from 'typeorm';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { InvoiceE } from '../entities/invoice.entity';
import { FacturapiService } from '../api/facturapi.service';
import { CancelParamOptions, CancellationMotives } from '../types/invoice.types';
import { NotFound } from '../exceptions/notFound.exception';
import { PaginationI } from '../../../helpers/interfaces/pagination.interface';
@Injectable()
export class InvoiceRepository {
    constructor(
        @Inject(FACTU_DATA_SOURCE)
        private readonly dataSource: DataSource,
        private readonly facturapi: FacturapiService
    ) { }

    private readonly invoiceRepository = this.dataSource.getRepository(InvoiceE)

    private readonly selectOptions = (pag: boolean, one?: boolean): FindOptionsSelect<InvoiceE> => {
        return {
            id: true,
            customerId: pag,
            cancellation_status: pag,
            cancellation_receipt: !!one,
            cancellation_uuid: !!one,
            expidition_date: pag,
            fiscal_folio: pag,
            payment_status: pag,
            expiration_date: pag,
            related_documents: pag,
            series: pag,
            type: pag,
            total: pag,
            createdBy: pag,
            folio_number: pag,
            verification_url: pag,
            createdAt: !!one,
            updatedAt: !!one,
        }
    }

    async store(payload: CreateInvoiceDto): Promise<InvoiceE[]>{
        const { customerId, createdBy, ...apiInvoice } = payload;
        const data = await this.facturapi.createInvoice(apiInvoice);
        const invoice = this.invoiceRepository.create({
            customerId,
            createdBy,
            fiscal_folio: data.uuid,
            ...data
        });
        return this.invoiceRepository.save(invoice);
    }

    async listInvoices(pagination: PaginationI) {
        //TODO: Pagination
        return await this.facturapi.listInvoices(pagination);
        // if (!data) {
        //     throw new NotFound()
        // }
    }


    async cancelInvoice(id: string, options: CancelParamOptions) {
        //TODO: Hacer cambios en la base de datos
        const invoice = await this.invoiceRepository.findOne({where: {id}})
        if (!invoice) {
            throw new NotFound()
        }
        const data = await this.facturapi.cancelInvoice(id, options);
        return data;
        
    }

    async findInvoiceById(id: string) {
        const data = await this.facturapi.findInvoiceById(id);
        if (!data) {
            throw new NotFound()
        }
        const options: any = {
            where: {id},
            select: this.selectOptions(true)
        }
        return await this.invoiceRepository.findOne(options)
    }

}