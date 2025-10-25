/**
 * Authentication Server Actions
 *
 * Server actions for user authentication operations
 */

'use server'

import { hash } from 'bcryptjs'
import { userRepository } from '@/lib/repositories/user-repository'
import { logger } from '@/lib/utils/logger'
import { z } from 'zod'

/**
 * Server action result type
 */
type ActionResult<T = unknown> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string; field?: string }

/**
 * Registration request schema
 */
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z.string().optional(),
})

export type RegisterInput = z.infer<typeof registerSchema>

/**
 * Register a new user account
 */
export async function registerUser(
  input: RegisterInput
): Promise<
  ActionResult<{
    id: string
    email: string
    name: string | null
  }>
> {
  try {
    // Validate input
    const validationResult = registerSchema.safeParse(input)

    if (!validationResult.success) {
      const firstError = Object.values(validationResult.error.flatten().fieldErrors)[0]?.[0]
      return {
        success: false,
        error: firstError || 'Invalid registration data',
      }
    }

    const { email, password, name } = validationResult.data

    // Check if user already exists
    const existingUser = await userRepository.existsByEmail(email)

    if (existingUser) {
      return {
        success: false,
        error: 'A user with this email already exists',
        field: 'email',
      }
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create user
    const user = await userRepository.create({
      email,
      password: hashedPassword,
      name,
    })

    logger.info({ userId: user.id, email: user.email }, 'New user registered')

    // Return success response (exclude password)
    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      message: 'Account created successfully',
    }
  } catch (error) {
    logger.error({ error }, 'Registration failed')
    return {
      success: false,
      error: 'Failed to create account',
    }
  }
}
