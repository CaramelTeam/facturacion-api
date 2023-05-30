import { HttpException, HttpStatus } from '@nestjs/common';

export class registered extends HttpException{
    constructor(){
        super('El rfc o nombre de la empresa  ya se encuentra registrada ',HttpStatus.BAD_REQUEST)
    }
}

