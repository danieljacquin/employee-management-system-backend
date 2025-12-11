import { Router } from 'express';

import dataSource from '../config/data-source';
import { DtoTypeEnum } from '../enums/dto-type.enum';
import { validationMiddleware } from '../middlewares/validate-dto.middleware';
import { CreateEmployeeRequestDto } from '../modules/employee/dto/request/create-employee-request.dto';
import { EmployeeIdRequestDto } from '../modules/employee/dto/request/employee-id-request-dto';
import { PaginationOptionsRequestDto } from '../modules/employee/dto/request/pagination-options-request.dto';
import { UpdateEmployeeRequestDto } from '../modules/employee/dto/request/update-employee-request.dto';
import { EmailService } from '../modules/employee/email.services';
import { EmployeeController } from '../modules/employee/employee.controller';
import { EmployeeService } from '../modules/employee/employee.service';

export class EmployeeRoutes {
  static get router(): Router {
    const router = Router();

    const emailService = new EmailService(dataSource);
    const employeeService = new EmployeeService(dataSource, emailService);
    const employeeController = new EmployeeController(employeeService);

    router.post(
      '/',
      validationMiddleware(CreateEmployeeRequestDto, DtoTypeEnum.BODY),
      employeeController.create,
    );

    router.get(
      '/',
      validationMiddleware(PaginationOptionsRequestDto, DtoTypeEnum.QUERY),
      employeeController.getAll,
    );

    router.patch('/:id', [
      validationMiddleware(EmployeeIdRequestDto, DtoTypeEnum.PARAMS),
      validationMiddleware(UpdateEmployeeRequestDto, DtoTypeEnum.BODY),
      employeeController.update,
    ]);

    router.delete(
      '/:id',
      validationMiddleware(EmployeeIdRequestDto, DtoTypeEnum.PARAMS),
      employeeController.delete,
    );

    return router;
  }
}
