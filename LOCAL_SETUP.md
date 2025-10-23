# Local Development Setup Guide

Complete guide for setting up local development environment with Docker.

## Prerequisites

- **Bun** installed (https://bun.sh)
- **Docker** & **Docker Compose** installed
- **Git** initialized ✅

## Quick Start (5 minutes)

### 1. Start Local Services

```bash
# Start PostgreSQL + MinIO (S3)
docker-compose up -d

# Verify services are running
docker-compose ps

# Should see:
# - parseur-db (PostgreSQL) - healthy
# - parseur-s3 (MinIO) - healthy
# - parseur-s3-setup (exited - one-time bucket creation)
```

### 2. Configure Environment

```bash
# Copy local environment variables
cp .env.local .env

# Edit .env and add your API keys:
# - OPENAI_API_KEY (get from https://platform.openai.com/api-keys)
# - ANTHROPIC_API_KEY (get from https://console.anthropic.com/)
# - INNGEST_SIGNING_KEY (optional for now, see Inngest section below)
```

### 3. Initialize Database

```bash
# Run Prisma migrations
bunx prisma migrate dev --name init

# This will:
# ✅ Create all database tables
# ✅ Generate Prisma Client
# ✅ Apply schema to local PostgreSQL
```

### 4. Seed Database (Optional)

```bash
# Create seed script (if not exists)
# Then run:
bunx prisma db seed

# This creates test data for development
```

### 5. Start Development Server

```bash
# Start Next.js dev server
bun run dev

# App will be available at:
# http://localhost:3000
```

## Service URLs

| Service | URL | Credentials |
|---------|-----|-------------|
| **Next.js App** | http://localhost:3000 | - |
| **PostgreSQL** | localhost:5432 | User: `parseur`<br>Password: `parseur_dev_password`<br>Database: `parseur` |
| **MinIO (S3) API** | http://localhost:9000 | Access Key: `minioadmin`<br>Secret Key: `minioadmin123` |
| **MinIO Console** | http://localhost:9001 | Same as API credentials |
| **Prisma Studio** | http://localhost:5555 | Run: `bunx prisma studio` |

## Docker Services Explained

### PostgreSQL (parseur-db)
- **Image**: postgres:16-alpine
- **Port**: 5432
- **Data**: Persisted in `postgres_data` volume
- **Health Check**: Automatic with retry logic

### MinIO (parseur-s3)
- **Image**: minio/minio:latest
- **API Port**: 9000 (S3-compatible API)
- **Console Port**: 9001 (Web UI for bucket management)
- **Data**: Persisted in `minio_data` volume
- **Default Bucket**: `parseur-documents` (auto-created)

### MinIO Setup Container
- **Purpose**: One-time bucket creation
- **Status**: Exits after creating bucket
- **Can be safely removed**: `docker-compose rm minio-create-bucket`

## Common Commands

### Docker Management

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f postgres
docker-compose logs -f minio

# Restart services
docker-compose restart

# Stop and remove volumes (⚠️ deletes all data)
docker-compose down -v
```

### Database Management

```bash
# Open Prisma Studio (Database GUI)
bunx prisma studio

# Create new migration
bunx prisma migrate dev --name <migration-name>

# Reset database (⚠️ deletes all data)
bunx prisma migrate reset

# View database with psql
docker exec -it parseur-db psql -U parseur -d parseur

# Backup database
docker exec parseur-db pg_dump -U parseur parseur > backup.sql

# Restore database
docker exec -i parseur-db psql -U parseur parseur < backup.sql
```

### MinIO/S3 Management

```bash
# Access MinIO Console
# Open http://localhost:9001 in browser
# Login: minioadmin / minioadmin123

# List buckets
docker exec parseur-s3 mc ls myminio/

# Upload test file
docker exec parseur-s3 mc cp /data/test.pdf myminio/parseur-documents/

# Download file
docker exec parseur-s3 mc cp myminio/parseur-documents/test.pdf /data/
```

## Troubleshooting

### PostgreSQL Connection Issues

```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# View PostgreSQL logs
docker-compose logs postgres

# Test connection
docker exec -it parseur-db psql -U parseur -d parseur -c "SELECT version();"

# If "connection refused", check:
# 1. Docker is running
# 2. Port 5432 is not used by another service
lsof -i :5432
```

### MinIO Connection Issues

```bash
# Check if MinIO is running
docker-compose ps minio

# View MinIO logs
docker-compose logs minio

# Test MinIO API
curl http://localhost:9000/minio/health/live

# Access MinIO Console
open http://localhost:9001

# If bucket not found, recreate:
docker-compose up minio-create-bucket
```

### Prisma Client Issues

```bash
# Regenerate Prisma Client
bunx prisma generate

# If schema changes not detected:
rm -rf node_modules/.prisma
bunx prisma generate
```

### Port Conflicts

If ports are already in use:

```bash
# Check what's using ports
lsof -i :5432  # PostgreSQL
lsof -i :9000  # MinIO API
lsof -i :9001  # MinIO Console

# Change ports in docker-compose.yml if needed:
# ports:
#   - '5433:5432'  # Use 5433 instead of 5432
```

## Inngest Local Development

For testing Inngest workflows locally:

```bash
# Install Inngest CLI globally
bun add -g inngest-cli

# Start Inngest Dev Server
inngest-cli dev

# This will:
# ✅ Start local Inngest server
# ✅ Provide UI at http://localhost:8288
# ✅ Allow triggering events manually

# In another terminal, start your Next.js app
bun run dev
```

## Environment Variables Reference

| Variable | Local Value | Production Value |
|----------|-------------|------------------|
| `DATABASE_URL` | `postgresql://parseur:parseur_dev_password@localhost:5432/parseur` | Vercel Postgres URL |
| `AWS_S3_ENDPOINT` | `http://localhost:9000` | Not set (uses AWS) |
| `AWS_S3_FORCE_PATH_STYLE` | `true` | Not set |
| `AWS_ACCESS_KEY_ID` | `minioadmin` | AWS IAM key |
| `AWS_SECRET_ACCESS_KEY` | `minioadmin123` | AWS IAM secret |
| `AWS_S3_BUCKET` | `parseur-documents` | Production bucket name |

## Data Persistence

All data is persisted in Docker volumes:

```bash
# View volumes
docker volume ls | grep parseur

# Inspect volume
docker volume inspect parseur_postgres_data
docker volume inspect parseur_minio_data

# Backup volume
docker run --rm -v parseur_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres-backup.tar.gz /data

# Restore volume
docker run --rm -v parseur_postgres_data:/data -v $(pwd):/backup alpine tar xzf /backup/postgres-backup.tar.gz -C /
```

## Cleanup

```bash
# Stop services but keep data
docker-compose down

# Stop services and remove volumes (⚠️ deletes all data)
docker-compose down -v

# Remove all Parseur containers, networks, and volumes
docker-compose down -v --remove-orphans

# Remove Docker images (optional)
docker rmi postgres:16-alpine minio/minio:latest minio/mc:latest
```

## Next Steps

Once local development is working:

1. ✅ Database migrations complete
2. ✅ Local S3 (MinIO) working
3. 🔄 Proceed with Phase 4: Authentication
4. 🔄 Implement file upload with S3
5. 🔄 Add LLM integration
6. 🔄 Build UI components

## Production Deployment

When ready for production, update `.env` with:
- Vercel Postgres URL (remove local PostgreSQL)
- AWS S3 credentials (remove MinIO)
- Production API keys
- Remove `AWS_S3_ENDPOINT` and `AWS_S3_FORCE_PATH_STYLE`

See `SETUP.md` for production service setup instructions.
