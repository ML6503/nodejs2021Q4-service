import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  ValidationError,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exception/validation.exemption';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: object, metadata: ArgumentMetadata) {
    const itemToValidate = plainToInstance(metadata.metatype, value);
    const errors: Array<ValidationError> = await validate(itemToValidate);

    if (errors.length) {
      const messages = errors.map(
        (err) => `${Object.values(err.constraints).join(', ')}`,
        // `${err.property} - ${Object.values(err.constraints).join(', ')}`,
      );
      throw new ValidationException(messages);
    }
    return value;
  }
}
