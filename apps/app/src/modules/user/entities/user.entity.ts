import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Type } from 'class-transformer';
import {
  COMPANY_REF,
  Company,
} from '@app/app/modules/company/entities/company.entity';

export type UserDocument = User & Document;
export type UserModel = Model<UserDocument>;
export const USER_REF = 'User';

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
    default: () => uuid(),
  })
  userId: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ required: false })
  companyId?: string;

  @Type(() => Company)
  Company: Company;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('Company', {
  ref: COMPANY_REF,
  localField: 'companyId',
  foreignField: 'companyId',
  justOne: true,
});
