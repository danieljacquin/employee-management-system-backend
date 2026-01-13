import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

import { Department, EmployeeCountry, DocumentType } from '../../../../enums';

export class UpdateEmployeeRequestDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  readonly lastName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  readonly secondLastName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly middleName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(EmployeeCountry)
  readonly employeeCountry?: EmployeeCountry;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(DocumentType)
  readonly documentType?: DocumentType;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  readonly documentNumber?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  readonly hireDate?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Department)
  readonly department?: Department;
}
