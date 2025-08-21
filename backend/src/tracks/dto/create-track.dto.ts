import { IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateTrackDto {
    @ApiProperty({
      description: 'The date the habit was tracked (ISO 8601 format)',
      example: '2025-08-20T00:00:00.000Z',
    })
    @IsDateString()
    date: string;
  }