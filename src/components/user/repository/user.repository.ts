import { Inject, Injectable } from '@nestjs/common';
import { DataSource, FindOptionsSelect, UpdateResult } from 'typeorm';
import { UserE } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { FACTU_DATA_SOURCE } from 'src/constants';
import { RegisteredEmailException } from '../exceptions/registered.email.exception';
import { NotFoundException } from '../../../helpers/exceptions/notFoundException';
import { UpdateUserDto } from '../dto/update-user.dto';


@Injectable()
export class UserRepository {
    constructor(
        @Inject(FACTU_DATA_SOURCE)
        private readonly dataSource: DataSource
    ) { }
    private userRepository = this.dataSource.getRepository(UserE);

    private readonly select = (pag: boolean, one?: boolean): FindOptionsSelect<UserE> => {
        return {
            id: true,
            name: pag,
            lastname: pag,
            password: pag,
            email: pag,
            phone: pag,
            prefixPhone: pag,
            createdAt: !!one,
            updatedAt: !!one,
            deletedAt: !!one,
        }
    }

    async createUser(createUser: CreateUserDto): Promise<UserE> {
        const exist = await this.userRepository.findOne({ where: { email: createUser.email } })
        if (exist) {
            throw new RegisteredEmailException();
        }
        const newUser = this.userRepository.create(createUser);
        return await this.userRepository.save(newUser);
    }

    async findUserByEmail(email: string): Promise<UserE> {
        const options: any = {
            where: { email },
            select: this.select(true)
        }
        const data = await this.userRepository.findOne(options);
        if(!data) {
            throw new NotFoundException('User not found');
        }
        return data;
    }

    async findUserById(id: number): Promise<UserE> {
        const options: any = {
            where: { id },
            select: this.select(true, true)
        }
        const data = await this.userRepository.findOne(options);
        if(!data) {
            throw new NotFoundException('User not found');
        }
        return data;
    }

    async updateUser(id:number, updateDto: UpdateUserDto ): Promise<UpdateResult>{
        const options: any = {
            where: { id }
        }
        const data = await this.userRepository.findOne(options);
        if(!data) {
            throw new NotFoundException('User not found');
        }
        return await this.userRepository.update(id, updateDto);
        
    }


    async deleteUser(id: number): Promise<UpdateResult> {
        const options: any = {
            where: { id }
        }
        const data = await this.userRepository.findOne(options);
        if(!data) {
            throw new NotFoundException('User not found');
        }
        return await this.userRepository.softDelete(id);
    }


}