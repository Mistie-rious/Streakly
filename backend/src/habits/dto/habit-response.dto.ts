import { ApiProperty } from '@nestjs/swagger';
import { Frequency } from '@prisma/client';
import { TrackResponseSubDto } from '../../tracks/dto/habit-reponse.dto';


  export class HabitResponseSubDto{
    @ApiProperty() id: string;
    @ApiProperty() name: string;
    @ApiProperty() createdAt: Date;
    @ApiProperty() updatedAt: Date;
    @ApiProperty({ nullable: true }) description: string | null;
    @ApiProperty({ enum: Frequency }) frequency: Frequency;
    @ApiProperty() userId: string;
  
    @ApiProperty({ type: [TrackResponseSubDto] })
    tracks: TrackResponseSubDto[];
  }
  
  
  export class HabitResponseDto {
    @ApiProperty({ example: 200 })
    statusCode: number;
  
    @ApiProperty({ example: '2025-08-22T09:15:00.276Z' })
    timestamp: string;
  
    @ApiProperty({ example: 'Request successful' })
    message: string;
  
    @ApiProperty({ type: HabitResponseSubDto })
    data: HabitResponseSubDto;
  }
  



