import { User } from '@prisma/client'
import { prisma } from '@/lib/db/prisma'
import { BaseRepository } from './base-repository'
import { handlePrismaError } from '@/lib/db/errors'

export interface CreateUserData {
  email: string
  password: string // Should be bcrypt hashed before passing here
  name?: string
}

export interface UpdateUserData {
  name?: string
  password?: string // Should be bcrypt hashed before passing here
  email?: string
}

export class UserRepository extends BaseRepository<
  User,
  CreateUserData,
  UpdateUserData
> {
  protected model = 'user' as const

  /**
   * Create a new user
   */
  async create(data: CreateUserData): Promise<User> {
    try {
      return await prisma.user.create({
        data: {
          email: data.email,
          password: data.password,
          name: data.name,
        },
      })
    } catch (error) {
      return handlePrismaError(error)
    }
  }

  /**
   * Update user
   */
  async update(id: string, data: UpdateUserData): Promise<User> {
    try {
      // Validate user exists
      await this.findByIdOrThrow(id)

      return await prisma.user.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      })
    } catch (error) {
      return handlePrismaError(error)
    }
  }

  /**
   * Delete user (hard delete with cascade)
   */
  async delete(id: string): Promise<void> {
    try {
      await prisma.user.delete({
        where: { id },
      })
    } catch (error) {
      handlePrismaError(error)
    }
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    })
  }

  /**
   * Find user by email or throw error
   */
  async findByEmailOrThrow(email: string): Promise<User> {
    const user = await this.findByEmail(email)
    if (!user) {
      throw new Error(`User with email ${email} not found`)
    }
    return user
  }

  /**
   * Check if user exists by email
   */
  async existsByEmail(email: string): Promise<boolean> {
    const count = await prisma.user.count({
      where: { email },
    })
    return count > 0
  }

  /**
   * Get user with document statistics
   */
  async findByIdWithStats(userId: string): Promise<User & {
    _count: {
      documents: number
      sessions: number
      apiKeys: number
    }
  } | null> {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            documents: true,
            sessions: true,
            apiKeys: true,
          },
        },
      },
    })
  }
}

// Export singleton instance
export const userRepository = new UserRepository()
