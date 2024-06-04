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
  }),
};

export default ConfigOptions;
