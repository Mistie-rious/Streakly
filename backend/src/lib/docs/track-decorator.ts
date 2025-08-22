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
import { TrackResponseDto } from '../../tracks/dto/habit-reponse.dto';
import { ErrorResponseDto } from '../../common/dto';

export function AddTrack() {
  return applyDecorators(
    ApiOperation({ summary: 'Add Track', description: 'Add a new track for a specific habit.' }),
    ApiCreatedResponse({ description: 'Track added successfully', type: TrackResponseDto }),
    ApiBadRequestResponse({ description: 'Validation error', type: ErrorResponseDto }),
    ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorResponseDto }),
    ApiForbiddenResponse({ description: 'Forbidden', type: ErrorResponseDto }),
    ApiInternalServerErrorResponse({ description: 'Server error', type: ErrorResponseDto }),
  );
}

export function ToggleToday() {
  return applyDecorators(
    ApiOperation({ summary: 'Toggle Track For Today', description: 'Toggle the track for today for a specific habit.' }),
    ApiOkResponse({ description: 'Today toggled successfully', type: TrackResponseDto }),
    ApiBadRequestResponse({ description: 'Invalid request', type: ErrorResponseDto }),
    ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorResponseDto }),
    ApiForbiddenResponse({ description: 'Forbidden', type: ErrorResponseDto }),
    ApiInternalServerErrorResponse({ description: 'Server error', type: ErrorResponseDto }),
  );
}

export function ListTracks() {
  return applyDecorators(
    ApiOperation({ summary: 'List Tracks', description: 'Retrieve all tracks for a habit with optional filters.' }),
    ApiOkResponse({ description: 'Tracks retrieved successfully', type: [TrackResponseDto] }),
    ApiBadRequestResponse({ description: 'Invalid request', type: ErrorResponseDto }),
    ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorResponseDto }),
    ApiForbiddenResponse({ description: 'Forbidden', type: ErrorResponseDto }),
    ApiInternalServerErrorResponse({ description: 'Server error', type: ErrorResponseDto }),
  );
}

export function RemoveTrack() {
  return applyDecorators(
    ApiOperation({ summary: 'Remove Track', description: 'Delete a specific track for a habit.' }),
    ApiOkResponse({ description: 'Track removed successfully', type: TrackResponseDto }),
    ApiNotFoundResponse({ description: 'Track not found', type: ErrorResponseDto }),
    ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorResponseDto }),
    ApiForbiddenResponse({ description: 'Forbidden', type: ErrorResponseDto }),
    ApiInternalServerErrorResponse({ description: 'Server error', type: ErrorResponseDto }),
  );
}
