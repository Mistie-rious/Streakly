import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HabitResponseDto } from '../../habits/dto/habit-response.dto';
import { ErrorResponseDto } from '../../common/dto';
export function ListHabits() {
  return applyDecorators(
    ApiOperation({ summary: 'List Habits', description: 'Retrieve all habits for the authenticated user with optional pagination.' }),
    ApiOkResponse({ description: 'List of habits', type: [HabitResponseDto] }),
    ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorResponseDto }),
    ApiForbiddenResponse({ description: 'Forbidden', type: ErrorResponseDto }),
    ApiInternalServerErrorResponse({ description: 'Server error', type: ErrorResponseDto }),
  );
}

export function GetHabit() {
  return applyDecorators(
    ApiOperation({ summary: 'Get Habit', description: 'Retrieve a single habit by its ID, including associated tracks.' }),
    ApiOkResponse({ description: 'Habit retrieved successfully', type: HabitResponseDto }),
    ApiNotFoundResponse({ description: 'Habit not found', type: ErrorResponseDto }),
    ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorResponseDto }),
    ApiForbiddenResponse({ description: 'Forbidden', type: ErrorResponseDto }),
    ApiInternalServerErrorResponse({ description: 'Server error', type: ErrorResponseDto }),
  );
}

export function CreateHabit() {
  return applyDecorators(
    ApiOperation({ summary: 'Create Habit', description: 'Create a new habit for the authenticated user.' }),
    ApiCreatedResponse({ description: 'Habit created successfully', type: HabitResponseDto }),
    ApiBadRequestResponse({ description: 'Validation error', type: ErrorResponseDto }),
    ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorResponseDto }),
    ApiForbiddenResponse({ description: 'Forbidden', type: ErrorResponseDto }),
    ApiInternalServerErrorResponse({ description: 'Server error', type: ErrorResponseDto }),
  );
}

export function UpdateHabit() {
  return applyDecorators(
    ApiOperation({ summary: 'Update Habit', description: 'Update an existing habit by its ID.' }),
    ApiOkResponse({ description: 'Habit updated successfully', type: HabitResponseDto }),
    ApiBadRequestResponse({ description: 'Validation error', type: ErrorResponseDto }),
    ApiNotFoundResponse({ description: 'Habit not found', type: ErrorResponseDto }),
    ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorResponseDto }),
    ApiForbiddenResponse({ description: 'Forbidden', type: ErrorResponseDto }),
    ApiInternalServerErrorResponse({ description: 'Server error', type: ErrorResponseDto }),
  );
}

export function DeleteHabit() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete Habit', description: 'Delete a habit by its ID.' }),
    ApiOkResponse({ description: 'Habit deleted successfully', type: HabitResponseDto }),
    ApiNotFoundResponse({ description: 'Habit not found', type: ErrorResponseDto }),
    ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorResponseDto }),
    ApiForbiddenResponse({ description: 'Forbidden', type: ErrorResponseDto }),
    ApiInternalServerErrorResponse({ description: 'Server error', type: ErrorResponseDto }),
  );
}