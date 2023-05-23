import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FACTU_DATA_SOURCE } from "src/constants";
import { DataSource, FindOptionsSelect, Like } from 'typeorm';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { InvoiceE } from '../entities/invoice.entity';
import { FacturapiService } from '../api/facturapi.service';
import {
    CancelParamOptions,
    CancellationMotives,
    CancellationStatus,
    FilterInvoice,
    InvoiceType,
    PaymentForm,
    PaymentMethod,
    PaymentStatus
} from '../types/invoice.types';
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
            items: {
                product: {
                    id: pag,
                    name: pag,
                    price: pag,
                    unitKey: pag,
                    description: pag,
                }
            }
        }
    }

    async store(payload: CreateInvoiceDto): Promise<InvoiceE[]> {
        //buold data to save in database
        const dbItem = payload.items.map(item => {
            let productId = item.product.id;
            let quantity = item.quantity;
            let price = item.product.price;
            return { productId, quantity, price }
        })
        //deleting product id from payload
        const items = payload.items.map(item => {
            delete item.product.id
            return item
        })
        //create invoice in facturapi
        const { customerId, createdBy, ...apiInvoice } = payload;
        const data = await this.facturapi.createInvoice({ ...apiInvoice, items });
        const { url } = await this.facturapi.downloadInvoice(data.id)
        //delete items from data
        delete data.items;
        //save invoice in database
        const invoice = this.invoiceRepository.create({
            customerId,
            createdBy,
            fiscal_folio: data.uuid,
            items: dbItem,
            url_files: url,
            ...data
        });
        return await this.invoiceRepository.save(invoice);
    }

    async listInvoices(pagination: FilterInvoice) {
        if (!pagination.page) pagination.page = 1;
        if (!pagination.perPage) pagination.perPage = 10;
        const offset = +pagination.page! === 1 ? 0 : (pagination.page! - 1) * pagination.perPage!
        let fields: any = {}
        if (pagination.search) {
            fields = [
                {
                    fiscal_folio: pagination.search
                },
                {
                    folio_number: pagination.search
                }
            ]
        }
        if (pagination.customerId) {
            fields['customerId'] = pagination.customerId
        }
        // return await this.facturapi.listInvoices(pagination);
        const data = await this.invoiceRepository.findAndCount({
            select: this.selectOptions(true),
            relations: {
                items: {
                    product: true
                }
            },
            where: fields,
            skip: offset,
            take: pagination.perPage!
        })

        if (data[1] === 0) {
            throw new NotFound()
        }
        return data;
    }


    async cancelInvoice(id: string, options: CancelParamOptions) {
        const invoice = await this.invoiceRepository.findOne({ where: { id } })
        if (!invoice) {
            throw new NotFound()
        }
        try {
            const data = await this.facturapi.cancelInvoice(id, options);
            if (data.cancellation_status === CancellationStatus.ACCEPTED) {
                invoice.cancellation_status = data.cancellation_status;
                invoice.cancellation_receipt = data.cancellation_receipt;
                invoice.cancellation_uuid = data.cancellation_uuid;
                await this.invoiceRepository.update(id, invoice);
            }
            return data;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }

    }

    async findInvoiceById(id: string) {
        const data = await this.facturapi.findInvoiceById(id);
        if (!data) {
            throw new NotFound()
        }
        const options: any = {
            where: { id },
            select: this.selectOptions(true),
            relations: {
                items: {
                    product: true
                }
            }
        }
        return await this.invoiceRepository.findOne(options)
    }

    async listInvoiceByCurrentMonth(pagination: PaginationI) {
        if (!pagination.page) pagination.page = 1;
        if (!pagination.perPage) pagination.perPage = 10;
        const offset = +pagination.page! === 1 ? 0 : (pagination.page! - 1) * pagination.perPage!


        //getting current month and year
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        //getting invoices from database
        const data = await this.invoiceRepository.createQueryBuilder('invoice')
            .where(`MONTH(invoice.createdAt) = ${currentMonth}`)
            .andWhere(`YEAR(invoice.createdAt) = ${currentYear}`)
            .innerJoinAndSelect('invoice.items', 'items')
            .innerJoinAndSelect('items.product', 'product')
            .skip(offset)
            .take(pagination.perPage)
            .getManyAndCount()

        if (data[0].length === 0) {
            throw new NotFound()
        }
        return data;
    }

}