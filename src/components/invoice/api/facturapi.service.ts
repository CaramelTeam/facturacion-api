import Facturapi from 'facturapi';
import envsConfig from 'src/config/envs.config';
import { InvoiceI } from '../types/invoice.types';

const facturapi = new Facturapi(envsConfig().app.TEST_SECRET_KEY);

export class FacturapiService { 

    async createInvoice(invoice: InvoiceI) {
        await facturapi.invoices.create({
            customer: {
                ...invoice.customer                
            },
            items:[
                {
                    ...invoice.items[0]
                }
            ],
            type: invoice.type,
            payment_method: invoice.paymenth_method,
            use: invoice.use,
            date: invoice.date,
            series: invoice.series,
            pdf_custom_section: invoice.pdf_custom_section
        })
    }
    
} 