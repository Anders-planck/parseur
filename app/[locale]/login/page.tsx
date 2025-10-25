/**
 * Login Page
 *
 * Public page for user authentication
 * Features:
 * - Email + password form
 * - NextAuth.js v5 integration
 * - Form validation with Zod
 * - Redirect to callbackUrl or dashboard on success
 */

import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { LoginForm } from '@/components/features/auth/login-form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  params: Promise<{
    locale: string
  }>
  searchParams: Promise<{
    callbackUrl?: string
    error?: string
  }>
}

export default async function LoginPage({ params, searchParams }: Props) {
  const { locale } = await params
  const { callbackUrl, error } = await searchParams
  setRequestLocale(locale)

  const t = await getTranslations('auth')
  const tCommon = await getTranslations('common')
  const tErrors = await getTranslations('errors')

  return (
    <div className="container flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight">{tCommon('appName')}</h1>
          <p className="mt-2 text-muted-foreground">{t('login')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('login')}</CardTitle>
            <CardDescription>
              {t('noAccount')}{' '}
              <Link href="/register" className="font-medium text-primary hover:underline">
                {t('register')}
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                {error === 'CredentialsSignin'
                  ? 'Invalid email or password'
                  : tErrors('unauthorized')}
              </div>
            )}
            <LoginForm callbackUrl={callbackUrl} />
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <Link
              href="/forgot-password"
              className="text-sm text-muted-foreground hover:text-primary hover:underline"
            >
              {t('forgotPassword')}
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
