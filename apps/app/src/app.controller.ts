import { Controller, Get, Inject, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { REQ_CTX_LOGGER } from '@app/core/logger/factories/requestContext.logger';
import { Logger } from 'winston';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(REQ_CTX_LOGGER) private readonly logger: Logger,
  ) {}

  @Get()
  getHello(): string {
    this.logger.info('Getting Hello from AppController');
    return this.appService.getHello();
  }
}
