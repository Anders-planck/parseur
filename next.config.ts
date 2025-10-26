import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

// @ts-expect-error - Package doesn't have TypeScript types but works at runtime
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

// Configure next-intl plugin
const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  /* config options here */

  // Ensure Prisma engine binaries are included in deployment
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/.prisma/client/**/*'],
    '/**': ['./node_modules/.prisma/client/**/*'],
  },

  // Externalize pino packages to avoid worker thread bundling issues
  // This prevents "Cannot find module '/ROOT/node_modules/thread-stream/lib/worker.js'" errors
  // Note: In Next.js 16+, this is now `serverExternalPackages` instead of experimental
  serverExternalPackages: ['pino', 'pino-pretty', 'thread-stream', '@prisma/client', '@prisma/engines'],

  // Additional Webpack config to ensure pino is not bundled in server chunks
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Tell Webpack not to bundle these modules into the server chunk
      config.externals = config.externals || []
      config.externals.push('pino', 'pino-pretty', 'thread-stream')
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }
    return config
  },
}

export default withNextIntl(nextConfig)
