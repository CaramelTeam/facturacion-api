import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserE} from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { DATA_SOURCE } from 'src/constants';


@Injectable()
export class UserRepository {
    constructor(
        @Inject(DATA_SOURCE)
        private readonly dataSource: DataSource
    ){}
    private userRepository = this.dataSource.getRepository(UserE);

    async createUser( createUser: CreateUserDto ): Promise<UserE>{
        const newUser = this.userRepository.create(createUser);
        return await this.userRepository.save(newUser);
    }
}