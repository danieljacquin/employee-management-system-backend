import { Expose } from 'class-transformer';

import { Department, DocumentType, EmployeeCountry, EmployeeStatus } from '../../../../enums';

export class EmployeeResponse {
  @Expose()
  readonly id!: number;

  @Expose()
  readonly lastName!: string;

  @Expose()
  readonly secondLastName!: string;

  @Expose()
  readonly firstName!: string;

  @Expose()
  readonly middleName?: string;

  @Expose()
  readonly employeeCountry!: EmployeeCountry;

  @Expose()
  readonly documentType!: DocumentType;

  @Expose()
  readonly documentNumber!: string;

  @Expose()
  readonly email!: string;

  @Expose()
  readonly hireDate!: string;

  @Expose()
  readonly department!: Department;

  @Expose()
  readonly status!: EmployeeStatus;

  @Expose()
  readonly createdAt!: string;

  @Expose()
  readonly updatedAt!: string;
}
