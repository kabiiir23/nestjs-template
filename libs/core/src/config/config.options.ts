import * as Joi from 'joi';

const ConfigOptions = {
  isGlobal: true,
  envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'staging', 'local')
      .default('development'),
    PORT: Joi.number().default(3000),
    MONGO_URI: Joi.string().required(),
    MONGO_DB_NAME: Joi.string().required(),
    APP_NAME: Joi.string(),
    INJECT_CID: Joi.boolean().default(false),
    LOGGER_MIN_LEVEL: Joi.string().default('debug'),
    LOGGER_DISABLE: Joi.boolean().default(false),
  }),
};

export default ConfigOptions;
