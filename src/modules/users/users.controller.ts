import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Request,
  Put
} from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { User } from './schemas';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getCurrent(@Request() req): Promise<User> {
    return this.usersService.getUser();
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.createUser(body);
  }

  @Put('/')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(body);
  }
}
