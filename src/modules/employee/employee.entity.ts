import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { Department } from '../../enums/department.enum';
import { DocumentType } from '../../enums/document_type.enum';
import { EmployeeCountry } from '../../enums/employee-country.enum';
import { EmployeeStatus } from '../../enums/employee-status.enum';

@Entity()
@Unique(['email'])
export class Employee {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'last_name' })
  lastName!: string;

  @Column({ name: 'second_last_name' })
  secondLastName!: string;

  @Column({ name: 'first_name' })
  firstName!: string;

  @Column({ name: 'middle_name', nullable: true })
  middleName!: string;

  @Column({ name: 'employee_country', type: 'enum', enum: EmployeeCountry })
  employeeCountry!: EmployeeCountry;

  @Column({ name: 'document_type', type: 'enum', enum: DocumentType })
  documentType!: DocumentType;

  @Column({ name: 'document_number' })
  documentNumber!: string;

  @Column({ name: 'email' })
  email!: string;

  @Column({ name: 'hire_date' })
  hireDate!: Date;

  @Column({ name: 'department', type: 'enum', enum: Department })
  department!: Department;

  @Column({ name: 'status', type: 'enum', enum: EmployeeStatus, default: EmployeeStatus.ACTIVE })
  status!: EmployeeStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
