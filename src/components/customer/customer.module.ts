import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import CustomerRepository from './repository/customer.respository';
import { FacturaCustomersApiServices } from './api/facturapi.customers.services';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService,CustomerRepository,FacturaCustomersApiServices]
})
export class CustomerModule {}
