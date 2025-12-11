import { plainToInstance } from 'class-transformer';
import { DataSource, FindManyOptions, FindOptionsWhere, ILike } from 'typeorm';

import AppError from '../../errors/app-error';

import { CreateEmployeeRequestDto } from './dto/request/create-employee-request.dto';
import { EmployeeIdRequestDto } from './dto/request/employee-id-request-dto';
import { PaginationOptionsRequestDto } from './dto/request/pagination-options-request.dto';
import { UpdateEmployeeRequestDto } from './dto/request/update-employee-request.dto';
import { EmployeeResponse } from './dto/response/employee-response.dto';
import { PaginatedEmployeeResponseDto } from './dto/response/paginated-employee-response.dto';
import { EmailService } from './email.services';
import { Employee } from './employee.entity';

export class EmployeeService {
  private employeeRepository;
  constructor(
    private dataSource: DataSource,
    private readonly emailService: EmailService,
  ) {
    this.employeeRepository = dataSource.getRepository(Employee);
  }

  async create(createEmployeeRequestDto: CreateEmployeeRequestDto): Promise<EmployeeResponse> {
    const { firstName, lastName, employeeCountry } = createEmployeeRequestDto;

    //if (exists) throw AppError.badRequest('email already exists');

    const created = this.employeeRepository.create({
      ...createEmployeeRequestDto,
      email: await this.emailService.generateUniqueEmail(firstName, lastName, employeeCountry),
    });
    const saved = await this.employeeRepository.save(created);

    return plainToInstance(EmployeeResponse, saved, {
      excludeExtraneousValues: true,
    });
  }

  async findOneByEmail(email: string): Promise<Employee | null> {
    const employee = await this.employeeRepository.findOneBy({ email });
    return employee;
  }

  async getAll(
    paginationOptionsRequestDto: PaginationOptionsRequestDto,
  ): Promise<PaginatedEmployeeResponseDto> {
    const {
      page = 1,
      limit = 5,
      employeeCountry,
      firstName,
      lastName,
      email,
    } = paginationOptionsRequestDto;

    let where: FindOptionsWhere<Employee> = {};

    if (employeeCountry) {
      where.employeeCountry = employeeCountry;
    }
    if (firstName) {
      where.firstName = ILike(`%${firstName}%`);
    }

    if (lastName) {
      where.lastName = ILike(`%${lastName}%`);
    }

    if (email) {
      where.email = ILike(`%${email}%`);
    }

    let findOptions: FindManyOptions = {
      skip: Math.max(0, (page - 1) * limit),
      take: limit,
      where,
    };

    const [items, total] = await this.employeeRepository.findAndCount(findOptions);
    return plainToInstance(
      PaginatedEmployeeResponseDto,
      { items, meta: { page, total, limit } },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findOneById(id: number): Promise<Employee | null> {
    const employee = await this.employeeRepository.findOneBy({ id });
    return employee;
  }

  async update(
    employeeIdRequestDto: EmployeeIdRequestDto,
    updateEmployeeRequestDto: UpdateEmployeeRequestDto,
  ): Promise<EmployeeResponse> {
    const { id } = employeeIdRequestDto;
    const { firstName, lastName, employeeCountry } = updateEmployeeRequestDto;
    const employee = await this.findOneById(id);
    if (!employee) throw AppError.badRequest(`employee with id ${id} does not exist`);

    const firstNameChanged = firstName && firstName !== employee.firstName;
    const lastNameChanged = lastName && lastName !== employee.lastName;
    const employeeCountryChanged = employeeCountry && employeeCountry !== employee.employeeCountry;

    const shouldUpdatedEmail = firstNameChanged || lastNameChanged || employeeCountryChanged;

    this.employeeRepository.merge(employee, {
      ...updateEmployeeRequestDto,
      email: shouldUpdatedEmail
        ? await this.emailService.generateUniqueEmail(firstName, lastName, employeeCountry)
        : employee.email,
    });
    const updated = await this.employeeRepository.save(employee);
    return plainToInstance(EmployeeResponse, updated, {
      excludeExtraneousValues: true,
    });
  }

  async delele(employeeIdRequestDto: EmployeeIdRequestDto): Promise<EmployeeResponse> {
    const { id } = employeeIdRequestDto;
    const employee = await this.findOneById(id);
    if (!employee) throw AppError.badRequest(`employee with ${id} does not exist`);
    const deleted = await this.employeeRepository.delete(employee);
    return plainToInstance(EmployeeResponse, deleted, {
      excludeExtraneousValues: true,
    });
  }
}
