import { Prisma } from '@prisma/client'

/**
 * Custom error classes for database operations
 */

export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public meta?: unknown
  ) {
    super(message)
    this.name = 'DatabaseError'
    Error.captureStackTrace(this, this.constructor)
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ConflictError'
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Handle Prisma-specific errors and convert to application errors
 */
export function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        // Unique constraint violation
        throw new ConflictError('A record with this value already exists')

      case 'P2025':
        // Record not found
        throw new NotFoundError('Record not found')

      case 'P2003':
        // Foreign key constraint violation
        throw new ValidationError('Invalid reference to related record')

      case 'P2000':
        // Value too long
        throw new ValidationError('Input value is too long')

      case 'P2016':
        // Query interpretation error
        throw new ValidationError('Invalid query parameters')

      default:
        throw new DatabaseError(
          `Database error: ${error.message}`,
          error.code,
          error.meta
        )
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    throw new ValidationError('Invalid data provided to database')
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    throw new DatabaseError('Failed to connect to database')
  }

  // Unknown error
  throw new DatabaseError('An unexpected database error occurred')
}
