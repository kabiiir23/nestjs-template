import { registerAs } from '@nestjs/config';

export const REDIS_CONFIG_KEY = 'redis';

export default registerAs(REDIS_CONFIG_KEY, () => {
  const port = Number(process.env.REDIS_PORT) || 6379;

  let tls;
  if (port === 6380) {
    tls = {};
  }
  return {
    host: process.env.REDIS_HOST || 'localhost',
    port,
    username: process.env.REDIS_USERNAME || '',
    password: process.env.REDIS_PASSWORD || '',
    db: Number(process.env.REDIS_DB) || 0,
    tls,
  };
});
