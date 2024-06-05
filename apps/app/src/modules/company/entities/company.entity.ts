import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { USER_REF } from '../../user/entities/user.entity';

export type CompanyDocument = Company & Document;
export type CompanyModel = Model<CompanyDocument>;
export const COMPANY_REF = 'Company';

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Company {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    default: () => uuid(),
  })
  companyId: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);

CompanySchema.virtual('Users', {
  ref: USER_REF,
  localField: 'companyId',
  foreignField: 'companyId',
  count: true,
  justOne: false,
});
