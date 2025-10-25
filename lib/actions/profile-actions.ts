/**
 * Profile Management Server Actions
 *
 * Server actions for user profile operations
 */

'use server'

import { revalidatePath } from 'next/cache'
import { compare, hash } from 'bcryptjs'
import { getSessionOrThrow } from '@/lib/auth/middleware'
import { userRepository } from '@/lib/repositories/user-repository'
import {
  updateProfileSchema,
  changePasswordSchema,
  type UpdateProfileInput,
  type ChangePasswordInput,
} from '@/lib/validation/profile-schemas'
import { logger } from '@/lib/utils/logger'

/**
 * Server action result type
 */
type ActionResult<T = unknown> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string; field?: string }

/**
 * Get current user profile
 */
export async function getProfile(): Promise<
  ActionResult<{
    id: string
    email: string
    name: string | null
    createdAt: Date
    updatedAt: Date
  }>
> {
  try {
    const session = await getSessionOrThrow()
    const user = await userRepository.findByIdOrThrow(session.user.id)

    // Return user without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user

    return {
      success: true,
      data: userWithoutPassword,
    }
  } catch (error) {
    logger.error({ error }, 'Failed to get profile')
    return {
      success: false,
      error: 'Failed to load profile',
    }
  }
}

/**
 * Update user profile (name and/or email)
 */
export async function updateProfile(
  input: UpdateProfileInput
): Promise<ActionResult<{ name: string | null; email: string }>> {
  try {
    const session = await getSessionOrThrow()

    // Validate input
    const validationResult = updateProfileSchema.safeParse(input)
    if (!validationResult.success) {
      const firstError = Object.values(validationResult.error.flatten().fieldErrors)[0]?.[0]
      return {
        success: false,
        error: firstError || 'Invalid profile data',
      }
    }

    const { name, email } = validationResult.data

    // Check if email is being changed and if it's already taken
    if (email && email !== session.user.email) {
      const existingUser = await userRepository.findByEmail(email)
      if (existingUser && existingUser.id !== session.user.id) {
        return {
          success: false,
          error: 'Email is already in use',
          field: 'email',
        }
      }
    }

    // Update user
    const updatedUser = await userRepository.update(session.user.id, {
      name: name || undefined,
      email,
    })

    logger.info(
      { userId: session.user.id, changes: { name, email } },
      'Profile updated successfully'
    )

    // Revalidate settings page
    revalidatePath('/dashboard/settings')

    return {
      success: true,
      data: {
        name: updatedUser.name,
        email: updatedUser.email,
      },
      message: 'Profile updated successfully',
    }
  } catch (error) {
    logger.error({ error }, 'Failed to update profile')
    return {
      success: false,
      error: 'Failed to update profile',
    }
  }
}

/**
 * Change user password
 */
export async function changePassword(
  input: ChangePasswordInput
): Promise<ActionResult<null>> {
  try {
    const session = await getSessionOrThrow()

    // Validate input
    const validationResult = changePasswordSchema.safeParse(input)
    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors
      const firstError = Object.values(errors)[0]?.[0]
      return {
        success: false,
        error: firstError || 'Invalid password data',
      }
    }

    const { currentPassword, newPassword } = validationResult.data

    // Get user with password
    const user = await userRepository.findByIdOrThrow(session.user.id)

    // Verify current password
    const isValidPassword = await compare(currentPassword, user.password)
    if (!isValidPassword) {
      logger.warn(
        { userId: session.user.id },
        'Password change failed: incorrect current password'
      )
      return {
        success: false,
        error: 'Current password is incorrect',
        field: 'currentPassword',
      }
    }

    // Hash new password
    const hashedPassword = await hash(newPassword, 10)

    // Update password
    await userRepository.update(session.user.id, {
      password: hashedPassword,
    })

    logger.info({ userId: session.user.id }, 'Password changed successfully')

    // Revalidate settings page
    revalidatePath('/dashboard/settings')

    return {
      success: true,
      data: null,
      message: 'Password changed successfully',
    }
  } catch (error) {
    logger.error({ error }, 'Failed to change password')
    return {
      success: false,
      error: 'Failed to change password',
    }
  }
}
