import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';

import envsConfig from 'src/config/envs.config';
import { CFDI, InvoiceI, InvoiceType, PaymentForm, PaymentMethod } from '../types/invoice.types';
import { FACTU_DATA_SOURCE } from 'src/constants';
import { DataSource } from 'typeorm';



// @Injectable()
export class FacturapiService {
    private readonly FACTURAPI_BASE_URL = envsConfig().app.FACTURAPI_URL;
    constructor(
        // @Inject(FACTU_DATA_SOURCE)
        // private readonly dataSource: DataSource
    ) { }


    async createInvoice(invoice: InvoiceI) {
        const data = await axios({
            url: 'https://www.facturapi.io/v2/invoices',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${envsConfig().app.TEST_SECRET_KEY}`
            },
            data: invoice
        })
        return data;
    }

} 