/**
 * Settings Page
 *
 * User preferences and configuration
 * Features:
 * - Profile information management (name, email)
 * - Password change functionality
 */

import { getTranslations } from 'next-intl/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getProfile } from '@/lib/actions/profile-actions'
import { UpdateProfileForm } from '@/components/features/settings/update-profile-form'
import { ChangePasswordForm } from '@/components/features/settings/change-password-form'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
  const t = await getTranslations('settings')
  const tNav = await getTranslations('nav')

  // Fetch user profile data
  const profileResult = await getProfile()

  // If failed to get profile, redirect to login
  if (!profileResult.success) {
    redirect('/login')
  }

  const profile = profileResult.data

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{tNav('settings')}</h1>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
      </div>

      <div className="grid gap-6 max-w-2xl">
        {/* Update Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t('profile.title')}</CardTitle>
            <CardDescription>{t('profile.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateProfileForm
              defaultValues={{
                name: profile.name,
                email: profile.email,
              }}
            />
          </CardContent>
        </Card>

        {/* Change Password Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t('profile.changePassword')}</CardTitle>
            <CardDescription>
              Ensure your account is using a long, random password to stay secure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
