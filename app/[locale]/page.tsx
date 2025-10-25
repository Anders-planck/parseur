/**
 * Home Page
 *
 * Landing page for the Smart Document Parser application.
 * Redirects to dashboard for authenticated users.
 */

import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, FileText, CheckCircle } from 'lucide-react'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  // Load translations
  const t = await getTranslations('common')
  const tUpload = await getTranslations('upload')

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8 text-center">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{t('appName')}</h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            Intelligent document parsing platform with LLM-powered extraction
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <Upload className="mx-auto h-10 w-10 text-primary" />
              <CardTitle>{tUpload('title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Drag and drop or click to upload PDF, JPEG, PNG, or WebP documents
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="mx-auto h-10 w-10 text-primary" />
              <CardTitle>Smart Extraction</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                AI-powered data extraction with automatic classification and validation
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CheckCircle className="mx-auto h-10 w-10 text-primary" />
              <CardTitle>Auto-Correction</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Multi-step validation and correction loops for maximum accuracy
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/dashboard">{t('welcome')}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
