import { InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import envsConfig from 'src/config/envs.config';
import { CustomerI } from '../../invoice/types/invoice.types';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

const FACTURAPI_BASE_URL = envsConfig().app.FACTURAPI_URL;
export class FacturaCustomersApiServices {
    constructor() { }

    async ValidationRFC(rfc: string) {
        const data = await axios({
            url: `${FACTURAPI_BASE_URL}/tools/tax_id_validation?tax_id=${rfc}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${envsConfig().app.TEST_SECRET_KEY}`
            }
        })
        return data.data.efos.is_valid;
    }

    async deleteCustomerById(id: string) {
        const data = await axios({
            url: `${FACTURAPI_BASE_URL}/customers/${id}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${envsConfig().app.TEST_SECRET_KEY}`
            }
        })
        return data.data;
    }


    async createCustomer(createCustomer: CustomerI): Promise<any> {
        try {
            const data = await axios({
                url: `${FACTURAPI_BASE_URL}/customers`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${envsConfig().app.TEST_SECRET_KEY}`
                },
                data: createCustomer
            })
            return data.data;
        } catch (error) {
            console.log(error.response)
            throw new InternalServerErrorException({
                status: +error.response.status,
                message: 'No se pudo crear el cliente'
            })
        }
    }

    async updateCustomer(customerId: string, updateCustomerDto: UpdateCustomerDto): Promise<any> {
        try {
            const updateCustomerStructur = {
                legal_name: updateCustomerDto.legal_name,
                tax_id: updateCustomerDto.tax_id,
                tax_system:updateCustomerDto.tax_system,
                email: updateCustomerDto.email,
                phone: updateCustomerDto.phone,
                address:
                {
                    street: updateCustomerDto.street,
                    exterior:updateCustomerDto.exterior,
                    interior: updateCustomerDto.interior,
                    neighborhood: updateCustomerDto.neighborhood,
                    city:updateCustomerDto.city,
                    municipality: updateCustomerDto.municipality,
                    zip: updateCustomerDto.zip,
                    state: updateCustomerDto.state,
                    country: updateCustomerDto.country
                }
            }
            const response = await axios.put(`${FACTURAPI_BASE_URL}/customers/${customerId}`, updateCustomerStructur, {
                headers: {
                    Authorization: `Bearer ${envsConfig().app.TEST_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            throw new InternalServerErrorException({
                status: +error.response.status,
                message: 'No se pudo actualizar el cliente',
            });
        }
    }

}