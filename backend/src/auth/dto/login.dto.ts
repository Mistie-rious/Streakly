import { IsEmail, IsString, MinLength, IsOptional, isEmail, isString } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto{
    @ApiProperty() @IsEmail() email: string;
    @ApiProperty() @IsString() @MinLength(6) password: string;
}