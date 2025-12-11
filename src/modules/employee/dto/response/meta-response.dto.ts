import { Expose } from 'class-transformer';

export class MetaResponseDto {
  @Expose()
  page!: number;
  @Expose()
  total!: number;
  @Expose()
  limit!: number;
}
