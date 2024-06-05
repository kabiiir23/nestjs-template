import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
  Scope,
} from '@nestjs/common';
import { Schema } from 'joi';
import { Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class JoiValidatorPipe implements PipeTransform {
  constructor(private readonly schema: Schema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const logger = new Logger(JoiValidatorPipe.name);
    logger.log(
      `Validating ${JSON.stringify(metadata)} with values: ${JSON.stringify(value)}`,
    );
    const { error } = this.schema.validate(value);
    if (error) {
      const errorMessage = error.details.map((err) => err.message).join(', ');
      throw new BadRequestException(errorMessage);
    }
    return value;
  }
}
