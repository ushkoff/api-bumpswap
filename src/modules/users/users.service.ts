import { Injectable } from '@nestjs/common';
import { User } from './schemas';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {
  }

  async getUser(): Promise<User> {
    return this.usersRepository.getCurrentUser();
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return this.usersRepository.create(data);
  }

  async updateUser(data: UpdateUserDto): Promise<User> {
    return this.usersRepository.update(data);
  }
}
