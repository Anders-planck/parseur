'use client'

/**
 * Change Password Form Component
 *
 * Allows users to change their password
 * Validates current password and requires confirmation
 */

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { changePasswordSchema, type ChangePasswordInput } from '@/lib/validation/profile-schemas'
import { changePassword } from '@/lib/actions/profile-actions'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export function ChangePasswordForm() {
  const t = useTranslations('settings.profile')
  const [isPending, startTransition] = useTransition()

  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  function onSubmit(data: ChangePasswordInput) {
    startTransition(async () => {
      const result = await changePassword(data)

      if (result.success) {
        toast.success(t('passwordChanged'))
        form.reset() // Clear form on success
      } else {
        toast.error(result.error)
        // If there's a field-specific error, set it on the form
        if (result.field) {
          form.setError(result.field as keyof ChangePasswordInput, {
            message: result.error,
          })
        }
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('currentPassword')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder={t('currentPasswordPlaceholder')}
                  disabled={isPending}
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('newPassword')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder={t('newPasswordPlaceholder')}
                  disabled={isPending}
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('confirmPassword')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder={t('confirmPasswordPlaceholder')}
                  disabled={isPending}
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? t('changing') : t('changePassword')}
        </Button>
      </form>
    </Form>
  )
}
