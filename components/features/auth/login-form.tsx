'use client'

/**
 * Login Form Component
 *
 * Client component for user authentication
 * Features:
 * - Email + password validation with Zod
 * - NextAuth.js v5 signIn integration
 * - Error handling and display
 * - Loading states
 * - Redirect to callbackUrl or dashboard on success
 */

import { useState } from 'react'
import { useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { logger } from '@/lib/utils/logger'

/**
 * Login form validation schema factory
 * Creates schema with translated error messages
 */
const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t('emailInvalid')),
    password: z.string().min(1, t('passwordRequired')),
  })

type LoginFormData = {
  email: string
  password: string
}

interface LoginFormProps {
  callbackUrl?: string
}

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const router = useRouter()
  const t = useTranslations('auth')
  const tValidation = useTranslations('auth.validation')
  const tErrors = useTranslations('errors')
  const [isLoading, setIsLoading] = useState(false)

  // Create validation schema with translations
  const loginSchema = createLoginSchema((key: string) => {
    if (key === 'emailInvalid') return tValidation('emailInvalid')
    if (key === 'passwordRequired') return tValidation('passwordRequired')
    return key
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)

      logger.info({ email: data.email }, 'Login attempt')

      // Use NextAuth.js v5 signIn with credentials provider
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        logger.warn({ email: data.email, error: result.error }, 'Login failed')
        toast.error(t('loginFailed'), {
          description: t('invalidCredentials'),
        })
        return
      }

      logger.info({ email: data.email }, 'Login successful')
      toast.success(t('loginSuccess'), {
        description: t('redirecting'),
      })

      // Redirect to callbackUrl or dashboard
      const redirectUrl = callbackUrl || '/dashboard'
      router.push(redirectUrl)
    } catch (error) {
      logger.error({ error, email: data.email }, 'Login error')
      toast.error(tErrors('serverError'), {
        description: tErrors('tryAgain'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">{t('email')}</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          disabled={isLoading}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password">{t('password')}</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          disabled={isLoading}
          {...register('password')}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('loggingIn')}
          </>
        ) : (
          t('loginButton')
        )}
      </Button>
    </form>
  )
}
