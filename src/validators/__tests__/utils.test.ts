import { ValidationError } from 'class-validator';
import { convertValidationErrors } from '../utils';

describe('utils', () => {
  describe('convertValidationErrors', () => {
    const errors = [
      {
        property: 'title',
        value: 'Hello',
        constraints: {
          length: '$property must be longer than or equal to 10 characters',
        },
      },
      {
        property: 'text',
        value: 'this is a great post about hell world',
        constraints: {
          contains: 'text must contain a hello string',
          length: 'text must be longer than or equal to 10 characters',
        },
      },
    ];
    it('should convert errors object to string', () => {
      expect(convertValidationErrors(errors as any)).toMatchInlineSnapshot(
        `"[{title: 'Hello', constraints: ['$property must be longer than or equal to 10 characters']}, {text: 'this is a great post about hell world', constraints: ['text must contain a hello string', 'text must be longer than or equal to 10 characters']}]"`,
      );
    });
  });
});
