import { ConfigService, ConfigType } from '@nestjs/config';
import loggerConfig, { LOGGER_CONFIG_KEY } from '../config/logger.config';
import * as winston from 'winston';
import { Logger, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';
import { green, cyan, yellow, magentaBright } from 'chalk';
import { formatAppLogMessage } from '../utils/messageFormatter';

export const APP_LOGGER = 'app-logger';

export const appLoggerFactory = {
  provide: APP_LOGGER,
  useFactory: (
    configService: ConfigService,
    // logger: Logger,
    parentClass?: object,
  ) => {
    const config =
      configService.get<ConfigType<typeof loggerConfig>>(LOGGER_CONFIG_KEY);
    // logger.log('app-logger-config', config);
    if (!config) {
      throw new Error('Logger configuration is not defined');
    }
    return winston.createLogger({
      ...config.winston,
      format: winston.format.combine(
        config.winston.format,
        formatAppLogMessage(),
      ),
      defaultMeta: {
        ...config.winston.defaultMeta,
        context: parentClass?.constructor?.name,
      },
    });
  },
  scope: Scope.TRANSIENT,
  inject: [ConfigService, INQUIRER],
};
