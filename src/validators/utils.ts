import { ValidationError } from 'class-validator';

export const convertValidationErrors = (errors: ValidationError[]): string => {
  const message = errors
    .map(error => {
      const { constraints, value, property } = error;
      const errorMessages = Object.values(constraints)
        .map(val => `'${val}'`)
        .join(', ');

      return `{${property}: '${value}', constraints: [${errorMessages}]}`;
    })
    .join(', ');

  return `[${message}]`;
};
