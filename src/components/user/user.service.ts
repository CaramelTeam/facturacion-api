import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { encryptPass } from '../../helpers/bcrypt';
import { UserRepository } from './repository/user.repository';
@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository
  ) { }

  create(createUserDto: CreateUserDto) {
    createUserDto.password = encryptPass(createUserDto.password);
    createUserDto.prefixPhone = `+${createUserDto.prefixPhone}`
    return this.userRepository.createUser(createUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
