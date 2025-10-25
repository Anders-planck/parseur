'use client'

/**
 * Registration Form Component
 *
 * Client component for new user registration
 * Features:
 * - Name, email, password, confirm password validation
 * - Password strength indicator
 * - Server action integration
 * - Auto-login after successful registration
 * - Error handling and display
 */

import { useTransition } from 'react'
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
import { Loader2, Check, X } from 'lucide-react'
import { registerUser } from '@/lib/actions/auth-actions'

/**
 * Registration form validation schema factory
 * Creates schema with translated error messages
 */
const createRegisterSchema = (t: (key: string) => string) =>
  z
    .object({
      name: z.string().min(2, t('nameMinLength')),
      email: z.string().email(t('emailInvalid')),
      password: z
        .string()
        .min(8, t('passwordMinLength'))
        .regex(/[A-Z]/, t('passwordUppercase'))
        .regex(/[a-z]/, t('passwordLowercase'))
        .regex(/[0-9]/, t('passwordNumber')),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordMismatch'),
      path: ['confirmPassword'],
    })

type RegisterFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

/**
 * Calculate password strength (0-100)
 */
function calculatePasswordStrength(password: string): number {
  if (!password) return 0

  let strength = 0

  // Length (max 40 points)
  strength += Math.min(password.length * 4, 40)

  // Uppercase letters (10 points)
  if (/[A-Z]/.test(password)) strength += 10

  // Lowercase letters (10 points)
  if (/[a-z]/.test(password)) strength += 10

  // Numbers (10 points)
  if (/[0-9]/.test(password)) strength += 10

  // Special characters (20 points)
  if (/[^A-Za-z0-9]/.test(password)) strength += 20

  // Variety bonus (10 points)
  const uniqueChars = new Set(password).size
  if (uniqueChars >= 8) strength += 10

  return Math.min(strength, 100)
}

export function RegisterForm() {
  const router = useRouter()
  const t = useTranslations('auth')
  const tValidation = useTranslations('auth.validation')
  const tPassword = useTranslations('auth.passwordStrength')
  const [isPending, startTransition] = useTransition()

  // Create validation schema with translations
  const registerSchema = createRegisterSchema((key: string) => {
    return tValidation(key as never)
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  // eslint-disable-next-line react-hooks/incompatible-library
  const password = watch('password')
 
  const passwordStrength = calculatePasswordStrength(password || '')

  // Password strength color and label
  const strengthColor =
    passwordStrength < 30 ? 'bg-destructive' : passwordStrength < 60 ? 'bg-yellow-500' : 'bg-green-500'

  const strengthLabel =
    passwordStrength < 30 ? tPassword('weak') : passwordStrength < 60 ? tPassword('medium') : tPassword('strong')

  // Password requirements
  const requirements = [
    { label: tPassword('minLength'), met: (password?.length || 0) >= 8 },
    { label: tPassword('uppercase'), met: /[A-Z]/.test(password || '') },
    { label: tPassword('lowercase'), met: /[a-z]/.test(password || '') },
    { label: tPassword('number'), met: /[0-9]/.test(password || '') },
  ]

  const onSubmit = async (data: RegisterFormData) => {
    startTransition(async () => {
      // Call registration server action
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      if (!result.success) {
        toast.error(t('registrationFailed'), {
          description: result.error,
        })
        return
      }

      // Auto-login after successful registration
      const signInResult = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (signInResult?.error) {
        toast.success(t('registrationSuccess'), {
          description: t('loginButton'),
        })
        router.push('/login')
        return
      }

      toast.success(t('registrationSuccess'), {
        description: t('accountCreated'),
      })

      router.push('/dashboard')
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">{t('name')}</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          autoComplete="name"
          disabled={isPending}
          {...register('name')}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">{t('email')}</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          disabled={isPending}
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
          autoComplete="new-password"
          disabled={isPending}
          {...register('password')}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}

        {/* Password Strength Indicator */}
        {password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{tPassword('label')}</span>
              <span className="font-medium">{strengthLabel}</span>
            </div>
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full transition-all ${strengthColor}`}
                style={{ width: `${passwordStrength}%` }}
              />
            </div>

            {/* Password Requirements */}
            <div className="space-y-1 pt-1">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  {req.met ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <X className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span className={req.met ? 'text-green-600' : 'text-muted-foreground'}>
                    {req.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          disabled={isPending}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('registering')}
          </>
        ) : (
          t('registerButton')
        )}
      </Button>
    </form>
  )
}
