import { ApiProperty } from "@nestjs/swagger";

export class TrackResponseSubDto {
    @ApiProperty() id: string;
    @ApiProperty() createdAt: Date;
    @ApiProperty() habitId: string;
    @ApiProperty() date: Date;
  }

  export class TrackResponseDto {
    @ApiProperty({ example: 200 })
    statusCode: number;
  
    @ApiProperty({ example: '2025-08-22T09:15:00.276Z' })
    timestamp: string;

    @ApiProperty({ example: 'Request successful' })
    message: string;
  
    @ApiProperty({ type: TrackResponseSubDto })
    data: TrackResponseSubDto;
  }
  
  