import {
  Company,
  CompanySchema,
} from '../modules/company/entities/company.entity';
import { User, UserSchema } from '../modules/user/entities/user.entity';

export default [
  { name: User.name, schema: UserSchema },
  { name: Company.name, schema: CompanySchema },
];
