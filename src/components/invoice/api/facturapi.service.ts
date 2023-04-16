import { InternalServerErrorException } from '@nestjs/common';

import axios from 'axios';

import envsConfig from 'src/config/envs.config';
import { CancelParamOptions, InvoiceI } from '../types/invoice.types';
import { PaginationI } from '../../../helpers/interfaces/pagination.interface';


const FACTURAPI_BASE_URL = envsConfig().app.FACTURAPI_URL;
export class FacturapiService {
    constructor() { }

    async createInvoice(invoice: InvoiceI): Promise<any> {
        try {
            const data = await axios({
                url: `${FACTURAPI_BASE_URL}/invoices`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${envsConfig().app.TEST_SECRET_KEY}`
                },
                data: invoice
            })
            return data.data;
        } catch (error) {
            console.log(error.response)
            throw new InternalServerErrorException({
                status: +error.response.status,
                message: 'No se pudo crear la factura'
            })
        }
    }

    async cancelInvoice(id: string, options: CancelParamOptions): Promise<any> {
        try {
            const data = await axios({
                url: `${FACTURAPI_BASE_URL}/invoices/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${envsConfig().app.TEST_SECRET_KEY}`
                },
                params: { ...options }
            })
            return data.data
        } catch (error) {
            console.log(error.response);
            throw new InternalServerErrorException({
                status: +error.response.status,
                message: 'No se pudo cancelar la factura'
            })
        }
    }

    async findInvoiceById(id: string): Promise<any> {
        try {
            const data = await axios({
                url: `${FACTURAPI_BASE_URL}/invoices/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${envsConfig().app.TEST_SECRET_KEY}`
                }
            })
            return data.data
        } catch (error) {
            console.log(error.response)
            throw new InternalServerErrorException({
                status: +error.response.status,
                message: 'No se pudo encontrar la factura'
            })
        }
    }

    async listInvoices(pagination: PaginationI): Promise<any> {
        try {
            const data = await axios({
                url: `${FACTURAPI_BASE_URL}/invoices`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${envsConfig().app.TEST_SECRET_KEY}`
                },
                params: { page: pagination.page, limit: pagination.perPage }
            })
            return data.data
        } catch (error) {
            console.log(error.response);
            throw new InternalServerErrorException({
                status: +error.response.status,
                message: 'No se pudo listar las facturas'
            })

        }
    }

} 