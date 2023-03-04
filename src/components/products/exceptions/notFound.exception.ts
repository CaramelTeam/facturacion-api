import { HttpException, HttpStatus } from '@nestjs/common';
export class ProductNotFoundException extends HttpException {
    constructor() {
        super('No existe un producto con ese id', HttpStatus.BAD_REQUEST);
    }
}