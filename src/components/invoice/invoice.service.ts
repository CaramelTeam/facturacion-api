import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InvoiceRepository } from './repository/invoice.repository';
import { CancelParamOptions, CancellationMotives } from './types/invoice.types';
import { PaginationI } from 'src/helpers/interfaces/pagination.interface';

@Injectable()
export class InvoiceService {

  constructor(
    private readonly invoiceRepository: InvoiceRepository
  ) { }

  create(payload: CreateInvoiceDto) {
    return this.invoiceRepository.store(payload);
  }

  cancel(id: string, options: CancelParamOptions) {
    return this.invoiceRepository.cancelInvoice(id, options)
  }

  findAll(pagination: PaginationI) {
    return this.invoiceRepository.listInvoices(pagination);
  }

  findByCurrenMonth(pagination: PaginationI) {
    return this.invoiceRepository.listInvoiceByCurrentMonth(pagination);
  }

  findOne(id: string) {
    return this.invoiceRepository.findInvoiceById(id);
  }

}
