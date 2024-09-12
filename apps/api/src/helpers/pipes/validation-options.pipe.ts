import { HttpException, HttpStatus, ValidationError, ValidationPipeOptions } from '@nestjs/common';

export const options: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[]) => {
    const fields = errors.reduce(
      (accumulator, value) => ({ ...accumulator, [value.property]: Object.values(value.constraints ?? {}).join(', ') }),
      {},
    );

    return new HttpException(
      {
        error: 'Validation Error',
        message: 'There are errors in your fields',
        fields,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  },
};
