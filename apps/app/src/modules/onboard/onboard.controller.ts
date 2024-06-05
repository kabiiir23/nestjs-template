import { REQ_CTX_LOGGER } from '@app/core/logger/factories/requestContext.logger';
import {
  Body,
  Controller,
  Headers,
  Inject,
  Post,
  UsePipes,
} from '@nestjs/common';
import { Logger } from 'winston';
import { OnboardService } from './onboard.service';
import { OnboardUserDto, onboardUserSchema } from './dto/onboardUser.dto';
import { JoiValidatorPipe } from '@app/core/validationPipes/validation.pipe';

@Controller('onboard')
export class OnboardController {
  constructor(
    @Inject(REQ_CTX_LOGGER) private readonly logger: Logger,
    private readonly onboardService: OnboardService,
  ) {}

  @Post()
  @UsePipes(new JoiValidatorPipe(onboardUserSchema))
  onboard(
    @Body()
    OnboardUserDto: OnboardUserDto,
    @Headers() headers: any,
  ) {
    this.logger.debug(`Onboarding user: ${OnboardUserDto}`);
    return this.onboardService.onboardUser(OnboardUserDto);
  }
}
