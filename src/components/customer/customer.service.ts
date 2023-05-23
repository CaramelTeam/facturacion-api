import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import CustomerRepository from './repository/customer.respository';
import { CustomerE } from './entities/customer.entity';

@Injectable()
export class CustomerService {


  constructor(
    private readonly customerRepository: CustomerRepository
  ) { }

 create(createCustomerDto: CreateCustomerDto) : Promise<CustomerE> {
    return this.customerRepository.createCustomer(createCustomerDto);
  }

  findAll() {
    return this.customerRepository.findAll();
  }

  findOne(id: string) {
    return this.customerRepository.findById(id);
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerRepository.updateById(id,updateCustomerDto);
  }

  remove(id: string) {
    return this.customerRepository.deleteById(id);
  }
}
