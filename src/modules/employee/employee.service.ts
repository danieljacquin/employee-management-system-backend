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
    const { firstName, lastName, employeeCountry, documentNumber } = createEmployeeRequestDto;

    const exists = await this.findOneByDocumentNumber(documentNumber);

    if (exists) throw AppError.badRequest('document number alredy exist');

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

  async findOneByDocumentNumber(documentNumber: string): Promise<Employee | null> {
    if (!documentNumber) return null;
    const employee = await this.employeeRepository.findOneBy({
      documentNumber,
    });
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
      order: { id: 'desc' },
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
    const { firstName, lastName, employeeCountry, documentNumber } = updateEmployeeRequestDto;
    const employee = await this.findOneById(id);
    if (!employee) throw AppError.badRequest(`employee with id ${id} does not exist`);

    if (documentNumber) {
      const documentNumberExists = await this.findOneByDocumentNumber(documentNumber);
      if (documentNumberExists) throw AppError.badRequest('Document number is already in use');
    }

    //if any of these properties change,the email is regnererated
    const firstNameChanged = firstName && firstName !== employee.firstName;
    const lastNameChanged = lastName && lastName !== employee.lastName;
    const employeeCountryChanged = employeeCountry && employeeCountry !== employee.employeeCountry;

    const shouldUpdatedEmail = firstNameChanged || lastNameChanged || employeeCountryChanged;

    if (shouldUpdatedEmail) {
      updateEmployeeRequestDto.email = await this.emailService.generateUniqueEmail(
        firstName || employee.firstName,
        lastName || employee.lastName,
        employeeCountry || employee.employeeCountry,
      );
    }

    const updated = await this.employeeRepository.update(id, updateEmployeeRequestDto);
    return plainToInstance(EmployeeResponse, updated, {
      excludeExtraneousValues: true,
    });
  }

  async delele(employeeIdRequestDto: EmployeeIdRequestDto): Promise<EmployeeResponse> {
    const { id } = employeeIdRequestDto;
    const employee = await this.findOneById(id);
    if (!employee) throw AppError.badRequest(`employee with ${id} does not exist`);
    const deleted = await this.employeeRepository.remove(employee);
    return plainToInstance(EmployeeResponse, deleted, {
      excludeExtraneousValues: true,
    });
  }
}
