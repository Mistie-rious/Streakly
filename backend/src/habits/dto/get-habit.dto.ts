import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min , IsEnum} from 'class-validator';
import { Type } from 'class-transformer';
import { Frequency } from '../types';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Maximum number of records to return',
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Number of records to skip',
    example: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number;

  @ApiPropertyOptional({
    description: 'Filter habits by frequency',
    enum: Frequency,
  })
  @IsOptional()
  @IsEnum(Frequency)
  frequency?: Frequency;
}