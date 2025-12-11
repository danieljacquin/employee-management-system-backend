import { DataSource, Like } from 'typeorm';

import { EmployeeCountry } from '../../enums';

import { Employee } from './employee.entity';

export class EmailService {
  private employeeRepository;
  constructor(private dataSource: DataSource) {
    this.employeeRepository = dataSource.getRepository(Employee);
  }

  async generateUniqueEmail(
    firstName: string,
    lastName: string,
    employeeCountry: EmployeeCountry,
  ): Promise<string> {
    let baseEmail = `${firstName.toLowerCase()}.${lastName.replace(/\s+/g, '')}`.toLowerCase();
    const domain = `@cidenet.com.${employeeCountry === EmployeeCountry.COL ? 'co' : 'us'}`;

    const existingEmails = await this.employeeRepository.find({
      select: ['email'],
      where: {
        firstName,
        lastName,
      },
    });

    if (existingEmails.length > 0) {
      const usedNumbers = existingEmails.map((emp) => {
        const match = emp.email.match(/\.([0-9]+)@/);
        return match ? parseInt(match[1]) : 0;
      });
      baseEmail += `.${Math.max(...usedNumbers) + 1}${domain}`;
    } else {
      baseEmail += `${domain}`;
    }

    return baseEmail;
  }
}
