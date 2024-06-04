import { ConfigService, registerAs } from '@nestjs/config';
import { transports, format } from 'winston';

export const LOGGER_CONFIG_KEY = 'logger-config';

export default registerAs(LOGGER_CONFIG_KEY, () => {
  let logFormat: any = format.combine(format.timestamp(), format.json());
  const defaultMeta = {
    layer: 'App',
    app: process.env.APP_NAME, // this is an optional meta field
    context: 'unspecified', // is overridden by the logger factory and the NestJSLoggerService
    type: 'LOG',
  };
  switch (process.env.NODE_ENV) {
    case 'production':
      logFormat = format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint(),
      );
      break;
    default:
      logFormat = format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint(),
      );
      break;
  }

  return {
    winston: {
      level: process.env.LOGGER_MIN_LEVEL || 'debug',
      silent: process.env.LOGGER_DISABLE === 'true',
      transports: [new transports.Console()],
      format: logFormat,
      defaultMeta,
    },
  };
});
