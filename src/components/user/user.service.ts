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

  findOne(id: number) {
    return this.userRepository.findUserById(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUser(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.deleteUser(id);
  }
}
