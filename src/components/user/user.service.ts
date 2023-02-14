import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { encryptPass } from '../../helpers/bcrypt';
import { UserRepository } from './repository/user.repository';
import { UserE } from './entities/user.entity';
@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository
  ) { }

  create(createUserDto: CreateUserDto): Promise<UserE> {
    createUserDto.password = encryptPass(createUserDto.password);
    createUserDto.prefixPhone = `+${createUserDto.prefixPhone}`
    return this.userRepository.createUser(createUserDto);
  }

  findAll(): Promise<UserE[]> {
    return this.userRepository.findAll();
  }

  findOne(id: number): Promise<UserE> {
    return this.userRepository.findById(id);
  }

  findByEmail(email: string): Promise<UserE> {
    console.log('Email service', email);
    
    return this.userRepository.findByEmail(email);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateById(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.deleteById(id);
  }
}
