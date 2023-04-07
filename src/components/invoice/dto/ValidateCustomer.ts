import { ValidatorConstraint, ValidatorConstraintInterface, length } from 'class-validator';
import { CustomerI } from "../types/invoice.types";

@ValidatorConstraint({ name: "ValidateCustomer" })
export class ValidateCustomer implements ValidatorConstraintInterface {
    validate(customer: CustomerI){
        return typeof customer.legal_name === 'string' && typeof customer.tax_id === 'string' && typeof customer.tax_system === 'string' && customer?.tax_system.length === 3 && typeof customer?.email === 'string' && typeof customer?.addres?.zip === 'string' && customer?.addres?.zip.length === 5;
    }

    
}