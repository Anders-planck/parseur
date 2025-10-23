# Setup Guide for Parseur MVP

## Prerequisites
- Bun installed
- Git initialized ✅
- Project dependencies installed ✅

## External Services Setup

### 1. Vercel Postgres Database

```bash
# Install Vercel CLI if not already installed
bun add -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Create Postgres database
vercel postgres create

# Get connection strings
vercel postgres connect
```

After running these commands, copy the `DATABASE_URL` and `DATABASE_URL_UNPOOLED` to your `.env` file.

### 2. AWS S3 Bucket

1. Go to AWS Console → S3
2. Create a new bucket (e.g., `parseur-documents-prod`)
3. Configure CORS:
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "POST", "GET", "DELETE"],
    "AllowedOrigins": ["http://localhost:3000", "https://your-domain.com"],
    "ExposeHeaders": ["ETag"]
  }
]
```
4. Create IAM user with S3 access
5. Copy credentials to `.env` file

### 3. OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Create new secret key
3. Copy to `.env` file as `OPENAI_API_KEY`

### 4. Anthropic API Key

1. Go to https://console.anthropic.com/
2. Navigate to API Keys
3. Create new key
4. Copy to `.env` file as `ANTHROPIC_API_KEY`

### 5. Inngest

1. Go to https://www.inngest.com/
2. Create account and project
3. Get event key and signing key
4. Copy to `.env` file

## Database Setup

Once you have configured `DATABASE_URL` in `.env`:

```bash
# Create initial migration
bunx prisma migrate dev --name init

# Generate Prisma Client
bunx prisma generate

# Seed database with test data
bunx prisma db seed
```

## Development

```bash
# Start development server
bun run dev

# Run type checking
bun run typecheck

# Run linting
bun run lint
```

## Current Status

✅ Phase 1: Project Foundation Complete
- Next.js 16 + React 19 + TypeScript
- Strict TypeScript configuration
- Project structure created
- Git initialized

🔄 Phase 2: Database Setup In Progress
- Prisma installed and schema created
- **ACTION REQUIRED**: Configure external services (see above)

## Next Steps

1. **Set up external services** (Vercel Postgres, AWS S3, API keys)
2. Update `.env` with real credentials
3. Run database migrations
4. Continue with Phase 3: Core Infrastructure
