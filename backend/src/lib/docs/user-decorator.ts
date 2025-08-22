import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { GetUserResponseDto, UpdateUserResponseDto } from '../../user/dto/user-response.dto';
import { ErrorResponseDto } from '../../common/dto';
export function GetLoggedUser() {
    return applyDecorators(
      ApiOperation({ summary: 'Get User', description: 'Retrieve the currently logged-in user.' }),
      ApiOkResponse({ description: 'User retrieved successfully', type: GetUserResponseDto }),
      ApiNotFoundResponse({ description: 'User not found', type: ErrorResponseDto }),
      ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorResponseDto }),
      ApiForbiddenResponse({ description: 'Forbidden', type: ErrorResponseDto }),
      ApiInternalServerErrorResponse({ description: 'Server error', type: ErrorResponseDto }),
    );
  }
  
  export function UpdateUser() {
    return applyDecorators(
      ApiOperation({ summary: 'Update User', description: 'Update the currently logged-in user.' }),
      ApiOkResponse({ description: 'User updated successfully', type: UpdateUserResponseDto }),
      ApiNotFoundResponse({ description: 'User not found', type: ErrorResponseDto }),
      ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorResponseDto }),
      ApiForbiddenResponse({ description: 'Forbidden', type: ErrorResponseDto }),
      ApiInternalServerErrorResponse({ description: 'Server error', type: ErrorResponseDto }),
    );
  }