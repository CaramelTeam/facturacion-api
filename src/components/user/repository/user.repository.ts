import { Inject, Injectable } from '@nestjs/common';
import { DataSource, UpdateResult } from 'typeorm';
import { UserE } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { FACTU_DATA_SOURCE } from 'src/constants';
import { RegisteredEmailException } from '../exceptions/registered.email.exception';
import { NotFoundException } from '../../../helpers/exceptions/notFound.exception';
import { UpdateUserDto } from '../dto/update-user.dto';


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

    async findAll():Promise<UserE[]> {
        return await this.userRepository.find();
    }
    
    async findById(id: number): Promise<UserE> {
        return await this.userRepository.findOne({where: {id}});
    }

    async findByEmail(email: string): Promise<UserE> {
        const data = await this.userRepository.findOne({where: {email}});
        if (!data) {
            throw new NotFoundException('User');
        }
        return data;
    }

    async updateById(id: number, updateUser: UpdateUserDto): Promise<UpdateResult> {
        const user = await this.userRepository.findOne({where: {id}});
        if (!user) {
            throw new NotFoundException('User');
        }
        return await this.userRepository.update(id, updateUser);
    }

    async deleteById(id: number): Promise<UpdateResult> {
        const user = await this.userRepository.findOne({where: {id}});
        if (!user) {
            throw new NotFoundException('User');
        }
        return await this.userRepository.softDelete(id);
    }
}