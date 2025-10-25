/**
 * Registration Page
 *
 * Public page for new user registration
 * Features:
 * - Name, email, password, confirm password fields
 * - Password strength indicator
 * - Form validation with Zod
 * - Auto-login after successful registration
 */

import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { RegisterForm } from '@/components/features/auth/register-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  params: Promise<{
    locale: string
  }>
}

export default async function RegisterPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('auth')
  const tCommon = await getTranslations('common')

  return (
    <div className="container flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight">{tCommon('appName')}</h1>
          <p className="mt-2 text-muted-foreground">{t('register')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('register')}</CardTitle>
            <CardDescription>
              {t('haveAccount')}{' '}
              <Link href="/login" className="font-medium text-primary hover:underline">
                {t('login')}
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
