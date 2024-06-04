import { REQ_CTX_LOGGER } from '@app/core/logger/factories/requestContext.logger';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'winston';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(REQ_CTX_LOGGER) private readonly logger: Logger,
  ) {}
  getHello(): string {
    this.logger.debug('Hello from AppService');
    return 'Hello World!';
  }
}
