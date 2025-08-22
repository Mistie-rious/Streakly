import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto{
  @ApiProperty()  @IsOptional() @IsString() username?: string;
   @ApiProperty() @IsOptional() @IsEmail() email?: string;

}