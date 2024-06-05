import { Module } from '@nestjs/common';
import { CompanyModule } from '../company/company.module';
import { UserModule } from '../user/user.module';
import { OnboardController } from './onboard.controller';
import { OnboardService } from './onboard.service';

@Module({
  imports: [CompanyModule, UserModule],
  controllers: [OnboardController],
  providers: [OnboardService],
  exports: [OnboardService],
})
export class OnboardModule {}
