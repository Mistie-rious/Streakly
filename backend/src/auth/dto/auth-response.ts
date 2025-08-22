import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseSubDto {
  @ApiProperty({ example: 'user-id-123' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'username', nullable: true })
  username?: string;
}

export class RegisterResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'User registered successfully' })
  message: string;

  @ApiProperty({ example: '2025-08-22T10:00:00.000Z' })
  timestamp: string;

  @ApiProperty({ type: RegisterResponseSubDto })
  data: RegisterResponseSubDto;
}

export class LoginResponseSubDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token: string;
}

export class LoginResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Login successful' })
  message: string;

  @ApiProperty({ example: '2025-08-22T10:00:00.000Z' })
  timestamp: string;

  @ApiProperty({ type: LoginResponseSubDto })
  data: LoginResponseSubDto;
}
