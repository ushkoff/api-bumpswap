import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from "./dto";

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getCurrentUser(): Promise<User> {
    try {
      const users = await this.userModel.find().lean().exec();
      return users[0];
    } catch (error) {
      throw new Error('Failed to fetch user.');
    }
  }

  async create(user: CreateUserDto): Promise<User> {
    try {
      const newUser = new this.userModel(user);
      newUser.LP_tokens = "[]";
      const savedUser = await newUser.save();
      return savedUser.toObject();
    } catch (error) {
      throw new Error('Failed to create user.');
    }
  }

  async update(data: UpdateUserDto): Promise<User> {
    try {
      const users = await this.userModel.find();
      const user = users[0];
      console.log(user)

      if (!user) {
        throw new Error('User not found');
      }

      Object.assign(user, data);
      // @ts-ignore
      const updatedUser = await user.save();
      return updatedUser.toObject();
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }
}
