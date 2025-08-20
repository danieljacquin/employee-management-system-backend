import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { DtoTypeEnum } from '../enums/dto-type.enum';

type ClassConstructor<T> = { new (): T };

export function validationMiddleware<T extends object>(
  type: ClassConstructor<T>,
  dtoType: DtoTypeEnum,
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req, res, next): Promise<void> => {
    const valueByType: Record<DtoTypeEnum, any> = {
      [DtoTypeEnum.BODY]: req.body,
      [DtoTypeEnum.PARAMS]: req.params,
      [DtoTypeEnum.QUERY]: req.query,
    };

    const payload = valueByType[dtoType];
    const dto = plainToInstance(type, payload);
    const errors: ValidationError[] = await validate(dto, { whitelist: true });

    if (errors.length > 0) {
      const messages = errors.map((error) => Object.values(error.constraints || {})).flat();
      res.status(400).json({ messages });
    } else {
      req[dtoType] = dto as any;
      next();
    }
  };
}
