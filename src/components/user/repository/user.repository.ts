import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserE } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { FACTU_DATA_SOURCE } from 'src/constants';
import { RegisteredEmailException } from '../exceptions/registered.email.exception';


@Injectable()
export class UserRepository {
    constructor(
        @Inject(FACTU_DATA_SOURCE)
        private readonly dataSource: DataSource
    ) { }
    private userRepository = this.dataSource.getRepository(UserE);

    async createUser(createUser: CreateUserDto) {
        const exist = await this.userRepository.findOne({ where: { email: createUser.email } })
        if (exist) {
            throw new RegisteredEmailException();
        }
        const newUser = this.userRepository.create(createUser);
        return await this.userRepository.save(newUser);
    }
}