import { ValidationError } from 'class-validator';

export const convertValidationErrors = (errors: ValidationError[]): string => {
  const message = errors
    .map(error => {
      const { constraints } = error;
      const errorMessages = Object.values(constraints)
        .map(val => `'${val}'`)
        .join(', ');

      return `{${error.property}: '${
        error.value
      }', constraints: [${errorMessages}]}`;
    })
    .join(', ');

  return `[${message}]`;
};
