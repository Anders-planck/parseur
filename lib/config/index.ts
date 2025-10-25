/**
 * Configuration management
 * Centralized access to environment variables with type safety
 */

interface Config {
  // Database
  database: {
    url: string
    unpooledUrl: string
  }

  // Authentication
  auth: {
    nextAuthUrl: string
    nextAuthSecret: string
  }

  // AWS S3
  storage: {
    region: string
    accessKeyId: string
    secretAccessKey: string
    bucket: string
    endpoint?: string // For MinIO local development
    forcePathStyle: boolean // Required for MinIO
  }

  // OpenAI
  openai: {
    apiKey: string
    model: string
  }

  // Anthropic
  anthropic: {
    apiKey: string
    model: string
  }

  // LLM Configuration
  llm: {
    defaultProvider: 'openai' | 'anthropic'
  }

  // Inngest
  inngest: {
    eventKey: string
    signingKey: string
    appId: string
  }

  // Application
  app: {
    nodeEnv: string
    logLevel: string
    maxFileSize: number
    allowedFileTypes: string[]
  }
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

function getEnvVarOptional(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue
}

function getEnvVarNullable(key: string): string | undefined {
  return process.env[key]
}

export const config: Config = {
  database: {
    url: getEnvVar('DATABASE_URL'),
    unpooledUrl: getEnvVar('DATABASE_URL_UNPOOLED'),
  },

  auth: {
    nextAuthUrl: getEnvVar('NEXTAUTH_URL', 'http://localhost:3000'),
    nextAuthSecret: getEnvVar('NEXTAUTH_SECRET'),
  },

  storage: {
    region: getEnvVar('AWS_REGION', 'us-east-1'),
    accessKeyId: getEnvVar('AWS_ACCESS_KEY_ID'),
    secretAccessKey: getEnvVar('AWS_SECRET_ACCESS_KEY'),
    bucket: getEnvVar('AWS_S3_BUCKET'),
    endpoint: getEnvVarNullable('AWS_S3_ENDPOINT'), // For MinIO local dev
    forcePathStyle: getEnvVarOptional('AWS_S3_FORCE_PATH_STYLE', 'false') === 'true', // For MinIO
  },

  openai: {
    apiKey: getEnvVar('OPENAI_API_KEY'),
    model: getEnvVarOptional('OPENAI_MODEL', 'gpt-4o'),
  },

  anthropic: {
    apiKey: getEnvVar('ANTHROPIC_API_KEY'),
    model: getEnvVarOptional('ANTHROPIC_MODEL', 'claude-3-5-sonnet-20241022'),
  },

  llm: {
    defaultProvider: (getEnvVarOptional('LLM_DEFAULT_PROVIDER', 'openai') as 'openai' | 'anthropic'),
  },

  inngest: {
    eventKey: getEnvVar('INNGEST_EVENT_KEY'),
    signingKey: getEnvVar('INNGEST_SIGNING_KEY'),
    appId: getEnvVarOptional('INNGEST_APP_ID', 'parseur'),
  },

  app: {
    nodeEnv: getEnvVarOptional('NODE_ENV', 'development'),
    logLevel: getEnvVarOptional('LOG_LEVEL', 'info'),
    maxFileSize: parseInt(getEnvVarOptional('MAX_FILE_SIZE', '10485760'), 10),
    allowedFileTypes: getEnvVarOptional(
      'ALLOWED_FILE_TYPES',
      'application/pdf,image/jpeg,image/png,image/webp'
    ).split(','),
  },
}

export default config
