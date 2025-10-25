'use client'

/**
 * Update Profile Form Component
 *
 * Allows users to update their name and email
 * Uses server actions with optimistic UI updates
 */

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { updateProfileSchema, type UpdateProfileInput } from '@/lib/validation/profile-schemas'
import { updateProfile } from '@/lib/actions/profile-actions'
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

interface UpdateProfileFormProps {
  defaultValues: {
    name: string | null
    email: string
  }
}

export function UpdateProfileForm({ defaultValues }: UpdateProfileFormProps) {
  const t = useTranslations('settings.profile')
  const [isPending, startTransition] = useTransition()

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: defaultValues.name ?? '',
      email: defaultValues.email,
    },
  })

  function onSubmit(data: UpdateProfileInput) {
    startTransition(async () => {
      const result = await updateProfile(data)

      if (result.success) {
        toast.success(t('profileUpdated'))
      } else {
        toast.error(result.error)
        // If there's a field-specific error, set it on the form
        if (result.field) {
          form.setError(result.field as keyof UpdateProfileInput, {
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('name')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('namePlaceholder')}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? t('updating') : t('updateProfile')}
        </Button>
      </form>
    </Form>
  )
}
