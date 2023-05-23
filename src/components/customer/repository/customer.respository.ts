import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DataSource, UpdateResult } from 'typeorm';
import { CustomerE } from '../entities/customer.entity';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { FACTU_DATA_SOURCE } from 'src/constants';
import { registered } from '../exceptions/registered.customers.exeptions'
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { NotFoundException } from '../../../helpers/exceptions/notFound.exception'
import { FacturaCustomersApiServices } from '../api/facturapi.customers.services';
import { CustomerI } from '../../invoice/types/invoice.types';
@Injectable()
export default class CustomerRepository {
    constructor(
        @Inject(FACTU_DATA_SOURCE)
        private readonly dataSource: DataSource,
       private readonly api :FacturaCustomersApiServices
    ) { }

    private customerRepository = this.dataSource.getRepository(CustomerE)

    async findAll(): Promise<CustomerE[]> {
        return await this.customerRepository.find();
    }

    async findById(id: string): Promise<CustomerE> {
        return await this.customerRepository.findOne({ where: { id } });
    }

    async createCustomer(createCustomer: CreateCustomerDto) {
        const newCustomer : CustomerI = {
            legal_name: createCustomer.legal_name,
            tax_id: createCustomer.tax_id,
            tax_system: createCustomer.tax_system,
            address: {
                zip: createCustomer.zip
            }
        }
        const validation =
            await this.customerRepository.findOne(
                {
                    where: [
                        { tax_id: createCustomer.tax_id },
                        { legal_name: createCustomer.legal_name }
                    ]
                })

         const RFCValidation = await this.api.ValidationRFC(createCustomer.tax_id);
         if (!RFCValidation)  throw new BadRequestException('Favor de validar su rfc posible efos')
         if (validation ) throw new (registered);
        const res = await this.api.createCustomer(newCustomer);
        const newUser = this.customerRepository.create({
           id : res.id ,
           ...createCustomer
        });


        return await this.customerRepository.save(newUser)
    }

    async updateById(id: string, updateCustomer: UpdateCustomerDto): Promise<UpdateResult> {
        const customer = await this.customerRepository.findOne({ where: { id } });
        const updateCustomerApi = await this.api.updateCustomer(id,updateCustomer);
        if (!customer) {
            throw new NotFoundException('Customer')
        }
        return await this.customerRepository.update(id, updateCustomer);
    }

    async deleteById(id: string): Promise<UpdateResult> {
        const deleteApi = await this.api.deleteCustomerById(id);
        const customer = await this.customerRepository.findOne({ where: { id } })
        if (!customer) {    
            throw new NotFoundException('Customer');
        }
        return await this.customerRepository.softDelete(id);
    }


}