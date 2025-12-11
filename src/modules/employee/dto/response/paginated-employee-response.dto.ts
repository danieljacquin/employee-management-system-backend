import { Expose, Type } from 'class-transformer';

import { EmployeeResponse } from './employee-response.dto';
import { MetaResponseDto } from './meta-response.dto';

export class PaginatedEmployeeResponseDto {
  @Expose()
  @Type(() => EmployeeResponse)
  items!: EmployeeResponse[];

  @Expose()
  @Type(() => MetaResponseDto)
  meta!: MetaResponseDto;
}
