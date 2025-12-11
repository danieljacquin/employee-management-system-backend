import { Request, Response } from 'express';

import { EmployeeService } from './employee.service';

export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  create = async (req: Request, res: Response) => {
    const employee = await this.employeeService.create(req.validatedBody);
    res.status(200).json(employee);
  };

  getAll = async (req: Request, res: Response) => {
    const employees = await this.employeeService.getAll(req.validatedQuery);
    res.status(200).json(employees);
  };

  update = async (req: Request, res: Response) => {
    const employee = await this.employeeService.update(req.validatedParams, req.validatedBody);
    res.status(200).json(employee);
  };

  delete = async (req: Request, res: Response) => {
    const employee = await this.employeeService.delele(req.validatedParams);
    res.status(200).json(employee);
  };
}
