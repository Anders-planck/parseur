# Smart Document Parser (Parseur)

Intelligent document parsing platform that extracts, validates, and auto-corrects structured data from PDFs and images using LLM-only approach.

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
bun install

# 2. Start Docker services (PostgreSQL + MinIO S3)
bun run docker:up

# 3. Copy environment variables
cp .env.local .env

# 4. Run database migrations
bun run db:migrate

# 5. Start development server
bun run dev
```

Your app will be running at **http://localhost:3000**

## 📦 Tech Stack

- **Framework**: Next.js 16 + React 19 + TypeScript
- **Database**: PostgreSQL (via Vercel Postgres in prod, Docker locally)
- **ORM**: Prisma
- **Storage**: AWS S3 (MinIO locally)
- **LLM**: OpenAI GPT-4o + Anthropic Claude 3.5 Sonnet
- **Jobs**: Inngest
- **UI**: shadcn/ui + Tailwind CSS
- **Validation**: Zod
- **Package Manager**: Bun

## 🛠️ Development Commands

### Docker Services
```bash
bun run docker:up      # Start PostgreSQL + MinIO
bun run docker:down    # Stop all services
bun run docker:logs    # View logs
```

### Database
```bash
bun run db:migrate     # Run migrations
bun run db:studio      # Open Prisma Studio
bun run db:seed        # Seed test data
bun run db:reset       # Reset database
```

### Development
```bash
bun run dev           # Start dev server
bun run build         # Build for production
bun run start         # Start production server
bun run typecheck     # Check TypeScript
bun run lint          # Lint code
```

## 🔗 Service URLs (Local)

| Service | URL | Credentials |
|---------|-----|-------------|
| **Next.js** | http://localhost:3000 | - |
| **PostgreSQL** | localhost:5432 | `parseur` / `parseur_dev_password` |
| **MinIO Console** | http://localhost:9001 | `minioadmin` / `minioadmin123` |
| **Prisma Studio** | http://localhost:5555 | Run `bun run db:studio` |

## 📂 Project Structure

```
parseur/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   └── (pages)/           # Application pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── features/         # Feature-specific components
├── lib/                   # Core business logic
│   ├── db/               # Database & Prisma client
│   ├── repositories/     # Data access layer
│   ├── llm/              # LLM integrations
│   ├── storage/          # S3/file storage
│   ├── validation/       # Zod schemas
│   ├── utils/            # Utilities
│   └── config/           # Configuration
├── prisma/               # Database schema & migrations
├── inngest/              # Background job functions
├── types/                # TypeScript type definitions
└── prompts/              # LLM prompt templates
```

## 📚 Documentation

- **[LOCAL_SETUP.md](./LOCAL_SETUP.md)** - Complete local development guide
- **[SETUP.md](./SETUP.md)** - Production services setup
- **[CLAUDE.md](./CLAUDE.md)** - Development principles & patterns
- **[DATABASE_RECOMMENDATIONS.md](./DATABASE_RECOMMENDATIONS.md)** - Database best practices
- **[tasks/todo.md](./tasks/todo.md)** - Development progress tracker

## 🎯 Current Status

**Phase 1-3 Complete** ✅ (34% of MVP)

✅ Project foundation
✅ Database schema & repositories
✅ Core infrastructure (errors, logging, validation, config)
🔄 Next: Authentication (Phase 4)

See [tasks/todo.md](./tasks/todo.md) for detailed progress.

## 🔐 Environment Variables

Required environment variables (see `.env.local` for local development):

```bash
# Database
DATABASE_URL="postgresql://..."

# AWS S3
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_S3_BUCKET="..."

# LLM Providers
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."

# Authentication
NEXTAUTH_SECRET="..."

# Inngest
INNGEST_SIGNING_KEY="..."
```

## 🧪 Testing

```bash
# Run type checking
bun run typecheck

# Run linting
bun run lint

# Run tests (when implemented)
bun test
```

## 🚢 Deployment

### Production Checklist

1. Set up Vercel Postgres database
2. Configure AWS S3 bucket
3. Obtain API keys (OpenAI, Anthropic, Inngest)
4. Deploy to Vercel:
   ```bash
   vercel
   ```

See [SETUP.md](./SETUP.md) for detailed production setup.

## 🤝 Contributing

This is a private project. Development follows strict TypeScript discipline:

- **Zero tolerance for `any` types**
- **Repository pattern for all DB operations**
- **DRY principle - reuse before creating**
- **Documentation first, code second**

See [CLAUDE.md](./CLAUDE.md) for complete development guidelines.

## 📝 License

Private project - All rights reserved

---

**Built with ❤️ using Bun, Next.js, and TypeScript**
