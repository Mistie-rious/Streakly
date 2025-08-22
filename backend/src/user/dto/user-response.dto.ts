import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'user-id-123', description: 'Unique ID of the user' })
  id: string;

  @ApiProperty({ example: 'user@example.com', description: 'Email of the user' })
  email: string;

  @ApiProperty({ example: 'username', description: 'Username of the user' })
  username: string;
}

export class GetUserResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'User retrieved successfully' })
  message: string;

  @ApiProperty({ type: UserResponseDto })
  data: UserResponseDto;
}

export class UpdateUserResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'User updated successfully' })
  message: string;

  @ApiProperty({ type: UserResponseDto })
  data: UserResponseDto;
}
