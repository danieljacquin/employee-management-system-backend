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

import { Department, DocumentType, EmployeeCountry, EmployeeStatus } from '../../../../enums';

export class CreateEmployeeRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @Matches(/^[A-Z ]+$/, {
    message: 'lastName should only cotain letter from A to Z without accents or ñ',
  })
  readonly lastName!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @Matches(/^[A-Z ]+$/, {
    message: 'secondLastName should only cotain letter from a to z without accents or ñ',
  })
  readonly secondLastName!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @Matches(/^[A-Z]+$/, {
    message: 'firstName should only cotain letter from a to z without accents or ñ',
  })
  readonly firstName!: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Matches(/^[A-Z ]+$/, {
    message: 'middleName should only cotain letter from a to z without accents or ñ',
  })
  readonly middleName?: string;

  @IsNotEmpty()
  @IsEnum(EmployeeCountry)
  readonly employeeCountry!: EmployeeCountry;

  @IsNotEmpty()
  @IsEnum(DocumentType)
  readonly documentType!: DocumentType;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  readonly documentNumber!: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsNotEmpty()
  @IsDateString()
  readonly hireDate!: string;

  @IsNotEmpty()
  @IsEnum(Department)
  readonly department!: Department;
}
