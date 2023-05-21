import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { JwtAuthGuard } from '../auth/guards';
import { CancelParamOptions } from './types/invoice.types';
import { GetUser } from '../auth/decorators';
import { GetUserI } from '../auth/interfaces/getUser.interface';
import { PaginationI } from '../../helpers/interfaces/pagination.interface';

@UseGuards(JwtAuthGuard)
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @Post()
  create(@Body(new ValidationPipe({ whitelist: true })) createInvoiceDto: CreateInvoiceDto, @GetUser() user: GetUserI) {
    createInvoiceDto.createdBy = user.id;
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationI) {
    return this.invoiceService.findAll(pagination);
  }

  @Get('current-month')
  findByCurrenMonth(@Query() pagination: PaginationI) {
    return this.invoiceService.findByCurrenMonth(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Query() options: CancelParamOptions) {
    return this.invoiceService.cancel(id, options)
  }
}
