import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { InvoiceRepository } from './repository/invoice.repository';
import { FacturapiService } from './api/facturapi.service';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceRepository, FacturapiService],
})
export class InvoiceModule {}
