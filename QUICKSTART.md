# ⚡ Quick Start Guide

Get your local development environment running in **5 minutes**!

## Prerequisites

- ✅ Docker Desktop installed and running
- ✅ Bun installed (`curl -fsSL https://bun.sh/install | bash`)
- ✅ Git installed

## 🚀 Setup Steps

### 1. Start Docker Services (30 seconds)

```bash
# Start PostgreSQL + MinIO (S3)
bun run docker:up

# Verify services are healthy
bun run docker:logs
```

You should see:
- ✅ `parseur-db` - PostgreSQL running on port 5432
- ✅ `parseur-s3` - MinIO running on ports 9000 (API) and 9001 (Console)

### 2. Configure Environment (1 minute)

```bash
# Copy local development environment
cp .env.local .env

# Open .env and add your API keys (optional for now)
# - OPENAI_API_KEY (from https://platform.openai.com/api-keys)
# - ANTHROPIC_API_KEY (from https://console.anthropic.com/)
```

**Note**: API keys are optional for initial setup. You can add them later when testing LLM features.

### 3. Initialize Database (1 minute)

```bash
# Run Prisma migrations
bun run db:migrate

# When prompted for migration name, press Enter (uses "init")
```

This will:
- ✅ Create all database tables
- ✅ Generate Prisma Client
- ✅ Set up database indexes

### 4. Start Development Server (30 seconds)

```bash
# Start Next.js
bun run dev
```

Open **http://localhost:3000** in your browser!

## 🎉 You're Ready!

Your local development environment is now running:

| Service | URL | What is it? |
|---------|-----|-------------|
| **App** | http://localhost:3000 | Your Next.js application |
| **Database** | localhost:5432 | PostgreSQL database |
| **S3 Console** | http://localhost:9001 | MinIO file storage UI |
| **Prisma Studio** | Run `bun run db:studio` | Database management GUI |

## 🔍 Test Everything Works

### Test Database Connection

```bash
# Open Prisma Studio
bun run db:studio

# You should see your database schema with 7 tables:
# - users, sessions, api_keys
# - documents, processing_jobs, audit_logs
# - prompt_templates
```

### Test S3 Storage

```bash
# Open MinIO Console
open http://localhost:9001

# Login with:
# Username: minioadmin
# Password: minioadmin123

# You should see a bucket named "parseur-documents"
```

### Test TypeScript

```bash
# Run type checking
bun run typecheck

# Should complete with no errors ✅
```

## 📝 What's Been Set Up

✅ **Next.js 16** with React 19 and TypeScript
✅ **PostgreSQL** database with complete schema
✅ **MinIO S3** for local file storage
✅ **Prisma ORM** with type-safe repositories
✅ **Error handling** with custom error classes
✅ **Logging** with structured pino logger
✅ **Validation** with Zod schemas
✅ **Configuration** system for environment variables

## 🎯 Next Steps

Now you can:

1. **Continue Development** - Proceed with Phase 4 (Authentication)
2. **Explore Database** - Run `bun run db:studio`
3. **Test File Upload** - Implement S3 upload functionality
4. **Add LLM Integration** - Connect OpenAI/Anthropic APIs

See [tasks/todo.md](./tasks/todo.md) for the complete roadmap.

## 🆘 Troubleshooting

### Docker Issues

```bash
# Check Docker is running
docker ps

# If services aren't starting:
bun run docker:down
bun run docker:up

# View logs
bun run docker:logs
```

### Database Issues

```bash
# Reset database completely
bun run db:reset

# Regenerate Prisma Client
bunx prisma generate
```

### Port Conflicts

If ports 5432, 9000, or 9001 are already in use:

```bash
# Check what's using the ports
lsof -i :5432
lsof -i :9000
lsof -i :9001

# Stop the conflicting service or change ports in docker-compose.yml
```

## 📖 Full Documentation

- **[LOCAL_SETUP.md](./LOCAL_SETUP.md)** - Complete local development guide
- **[README.md](./README.md)** - Project overview
- **[CLAUDE.md](./CLAUDE.md)** - Development principles

## 💡 Useful Commands

```bash
# Docker
bun run docker:up       # Start services
bun run docker:down     # Stop services
bun run docker:logs     # View logs

# Database
bun run db:migrate      # Run migrations
bun run db:studio       # Database GUI
bun run db:reset        # Reset database

# Development
bun run dev            # Start app
bun run typecheck      # Check types
bun run lint           # Lint code
```

---

**Time to first commit: ~5 minutes** ⚡

Ready to build something amazing! 🚀
