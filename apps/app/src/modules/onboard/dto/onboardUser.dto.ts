import * as Joi from 'joi';

export class OnboardUserDto {
  public email: string;
  public firstName: string;
  public lastName: string;
  public company: string;
}

export const onboardUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  company: Joi.string().required(),
})
  .unknown(false)
  .options({ abortEarly: false });
