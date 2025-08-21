import { IsOptional, IsDateString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class QueryTracksDto {
  @ApiPropertyOptional({
    description: 'Filter tracks from this start date (ISO 8601)',
    example: '2025-08-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  start?: string;

  @ApiPropertyOptional({
    description: 'Filter tracks until this end date (ISO 8601)',
    example: '2025-08-20T23:59:59.000Z',
  })
  @IsOptional()
  @IsDateString()
  end?: string;

  @ApiPropertyOptional({
    description: 'Number of records to skip (for pagination)',
    example: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number;

  @ApiPropertyOptional({
    description: 'Maximum number of records to return (for pagination)',
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}