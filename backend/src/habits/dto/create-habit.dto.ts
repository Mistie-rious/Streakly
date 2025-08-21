import { IsEnum, IsInt, IsString, IsOptional, Min } from "@nestjs/class-validator";
import { Frequency } from "../types";
import { ApiProperty } from "@nestjs/swagger";
export class CreateHabitDto {
  @ApiProperty({ example: 'Read for 30 minutes' }) @IsString() name: string;
  @ApiProperty({ example: 'Daily reading' }) @IsOptional() @IsString() description?: string;
  @ApiProperty({ example: 'DAILY' }) @IsEnum(Frequency) frequency: Frequency; 
  @ApiProperty({ example: 3 })  @IsOptional() @IsInt() @Min(1) goal?: number;
  }