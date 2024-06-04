import { Global, Module } from '@nestjs/common';
import loggerConfig from './config/logger.config';
import { ConfigModule } from '@nestjs/config';
import { APP_LOGGER, appLoggerFactory } from './factories/app.logger';
import {
  REQ_CTX_LOGGER,
  reqCtxLoggerFactory,
} from './factories/requestContext.logger';

@Global()
@Module({
  imports: [ConfigModule.forFeature(loggerConfig)],
  providers: [appLoggerFactory, reqCtxLoggerFactory],
  exports: [APP_LOGGER, REQ_CTX_LOGGER],
})
export class LoggerModule {}
