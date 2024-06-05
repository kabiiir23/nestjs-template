import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import modelsForFeature from '../../mongo/models.forFeature';

@Module({
  imports: [MongooseModule.forFeature(modelsForFeature)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
