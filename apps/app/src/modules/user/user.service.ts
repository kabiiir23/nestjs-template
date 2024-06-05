import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModel } from './entities/user.entity';
import { Logger } from 'winston';
import { REQ_CTX_LOGGER } from '@app/core/logger/factories/requestContext.logger';

@Injectable()
export class UserService {
  constructor(
    @Inject(REQ_CTX_LOGGER) private readonly logger: Logger,
    @InjectModel(User.name) private readonly userModel: UserModel,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userModel.create(createUserDto);
      this.logger.info(`User created: ${user}`);
      return user;
    } catch (error) {
      this.logger.error(`Error creating user: ${error}`);
      return error;
    }
  }

  async findAll() {
    const users = await this.userModel.find().lean();
    this.logger.info(`Users found: ${users}`);
    return users;
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
