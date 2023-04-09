import axios from 'axios';

import envsConfig from 'src/config/envs.config';
import { InvoiceI } from '../types/invoice.types';




// @Injectable()
const FACTURAPI_BASE_URL = envsConfig().app.FACTURAPI_URL;
export class FacturapiService {
    constructor(
        // @Inject(FACTU_DATA_SOURCE)
        // private readonly dataSource: DataSource
    ) { }


    async createInvoice(invoice: InvoiceI) {
        const data = await axios({
            url: `${FACTURAPI_BASE_URL}/invoices`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${envsConfig().app.TEST_SECRET_KEY}`
            },
            data: invoice
        })
        return data.data;
    }

} 