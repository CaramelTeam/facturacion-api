import Facturapi from 'facturapi';
import envsConfig from 'src/config/envs.config';

const facturapi = new Facturapi(envsConfig().app.TEST_SECRET_KEY);

export class FacturapiService { 

    async createInvoice(invoice) {
        await facturapi.invoices.create({
            
        })
    }
    
} 