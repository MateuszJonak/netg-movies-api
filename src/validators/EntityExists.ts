import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getRepository } from 'typeorm';

@ValidatorConstraint({ async: true })
export class EntityExistsConstraint implements ValidatorConstraintInterface {
  public async validate(
    entity: any,
    args: ValidationArguments,
  ): Promise<boolean> {
    const [idName] = args.constraints;
    const entityClass = entity.constructor;
    const entry = await getRepository(entityClass).findOne(entity[idName]);

    return entry as boolean;
  }

  public defaultMessage(args: ValidationArguments) {
    const [idName] = args.constraints;
    const id = args.value[idName];
    const entityName = args.value.constructor.name;

    return `The entity of class "${entityName}" with id "${id}" does not exists`;
  }
}

export function EntityExists(
  idName: string = 'id',
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      constraints: [idName],
      options: validationOptions,
      propertyName,
      target: object.constructor,
      validator: EntityExistsConstraint,
    });
  };
}
