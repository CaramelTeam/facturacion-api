import { HttpStatus, Injectable } from '@nestjs/common';
@Injectable()
export class HealthService {

  getHealth() {
    return 'OK';
  }

}
