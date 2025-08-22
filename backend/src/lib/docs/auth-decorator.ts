import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { LoginResponseDto, RegisterResponseDto } from '../../auth/dto/auth-response';
import { ErrorResponseDto } from '../../common/dto';

export function RegisterSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Register', description: 'Register a new user.' }),
    ApiCreatedResponse({ description: 'User registered successfully', type: RegisterResponseDto }),
    ApiBadRequestResponse({ description: 'Email already in use', type: ErrorResponseDto }),
    ApiInternalServerErrorResponse({ description: 'Server error', type: ErrorResponseDto }),
  );
}

export function LoginSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Login', description: 'Authenticate user and return JWT token.' }),
    ApiOkResponse({ description: 'Login successful', type: LoginResponseDto }),
    ApiUnauthorizedResponse({ description: 'Invalid credentials', type: ErrorResponseDto }),
    ApiInternalServerErrorResponse({ description: 'Server error', type: ErrorResponseDto }),
  );
}
