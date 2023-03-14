import { HttpStatus, HttpException } from '@nestjs/common';
export class NotFoundException extends HttpException {
    constructor(service: string) {
        super(` ${service} not found `, HttpStatus.NOT_FOUND);
    }
}