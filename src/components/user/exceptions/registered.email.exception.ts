import { HttpException, HttpStatus } from '@nestjs/common';

export class RegisteredEmailException extends HttpException {
    constructor() {
        super('El correo electrónico ya se encuentra registrado', HttpStatus.BAD_REQUEST);
    }
}