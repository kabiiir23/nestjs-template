import { Inject } from '@nestjs/common';
import { Logger } from 'winston';
import { REQ_CTX_LOGGER } from '@app/core/logger/factories/requestContext.logger';

import { UserService } from '@app/app/modules/user/user.service';
import { CompanyService } from '@app/app/modules/company/company.service';
import { OnboardUserDto } from './dto/onboardUser.dto';

export class OnboardService {
  constructor(
    @Inject(REQ_CTX_LOGGER) private readonly logger: Logger,
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
  ) {}

  async onboardUser(onboardUserDto: OnboardUserDto) {
    try {
      const company = await this.companyService.create({
        name: onboardUserDto.company,
      });

      const user = await this.userService.create({
        email: onboardUserDto.email,
        firstName: onboardUserDto.firstName,
        lastName: onboardUserDto.lastName,
        companyId: company.companyId,
      });

      if (user && company) {
        this.logger.info(`User onboarded: ${user}`);
        return user;
      }
    } catch (error) {
      this.logger.error(`Error onboarding user: ${error}`);
      return error;
    }
  }
}
