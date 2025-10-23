import { prisma } from '@/lib/db/prisma'
import { NotFoundError } from '@/lib/db/errors'

/**
 * Base repository providing common CRUD operations
 * All repository classes should extend this for consistency
 */
export abstract class BaseRepository<
  T,
  CreateInput,
  UpdateInput
> {
  protected abstract model: string

  /**
   * Find record by ID
   * @throws {NotFoundError} If record doesn't exist (when using findByIdOrThrow)
   */
  async findById(id: string): Promise<T | null> {
    const result = await (prisma as unknown as Record<string, {
      findUnique: (args: { where: { id: string } }) => Promise<T | null>
    }>)[this.model].findUnique({
      where: { id },
    })
    return result
  }

  /**
   * Find record by ID or throw error
   */
  async findByIdOrThrow(id: string): Promise<T> {
    const record = await this.findById(id)
    if (!record) {
      throw new NotFoundError(`${this.model} with id ${id} not found`)
    }
    return record
  }

  /**
   * Create new record
   */
  abstract create(data: CreateInput): Promise<T>

  /**
   * Update existing record
   */
  abstract update(id: string, data: UpdateInput): Promise<T>

  /**
   * Delete record (soft delete preferred)
   */
  abstract delete(id: string): Promise<void>
}
