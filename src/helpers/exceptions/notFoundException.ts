import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
    constructor(
        message: string,
    ) {
        super(`Message: ${message}`, HttpStatus.NOT_FOUND)
    }

}