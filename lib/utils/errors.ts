/**
 * Custom application error classes
 * Provides structured error handling with HTTP status codes
 */

import { logger } from './logger'

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number,
    public details?: unknown
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }

  toJSON(): {
    name: string
    message: string
    code: string
    statusCode: number
    details?: unknown
  } {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      details: this.details,
    }
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, details)
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string) {
    super(message, 'AUTHENTICATION_ERROR', 401)
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string) {
    super(message, 'AUTHORIZATION_ERROR', 403)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 'NOT_FOUND', 404)
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 'CONFLICT', 409)
  }
}

export class RateLimitError extends AppError {
  constructor(message: string) {
    super(message, 'RATE_LIMIT_EXCEEDED', 429)
  }
}

export class LLMError extends AppError {
  constructor(message: string, provider: string, details?: unknown) {
    super(message, `LLM_ERROR_${provider.toUpperCase()}`, 502, details)
  }
}

export class StorageError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'STORAGE_ERROR', 503, details)
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'DATABASE_ERROR', 500, details)
  }
}

export class InternalServerError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'INTERNAL_SERVER_ERROR', 500, details)
  }
}

/**
 * Type guard to check if error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

/**
 * Handle API errors and convert to JSON response
 */
export function handleApiError(error: unknown): Response {
  // Known application errors
  if (isAppError(error)) {
    return Response.json(
      {
        error: {
          message: error.message,
          code: error.code,
          details: error.details,
        },
      },
      { status: error.statusCode }
    )
  }

  // Unknown errors - log and return generic message
  logger.error({ error }, 'Unhandled error')
  return Response.json(
    {
      error: {
        message: 'An unexpected error occurred',
        code: 'INTERNAL_ERROR',
      },
    },
    { status: 500 }
  )
}
