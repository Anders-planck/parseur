# 🚀 Quick Reference: Vercel Postgres + Prisma

## Essential Commands

```bash
# Setup
bunx prisma init                    # Initialize Prisma
vercel postgres create              # Create Vercel Postgres DB
vercel postgres connect             # Get connection string

# Development
bunx prisma migrate dev --name <name>  # Create & apply migration
bunx prisma generate                # Generate Prisma Client
bunx prisma studio                  # Open database GUI
bunx prisma db push                 # Push schema (prototype only)
bunx prisma db seed                 # Run seed script

# Production
bunx prisma migrate deploy          # Apply migrations in production
bunx prisma migrate status          # Check migration status

# Utilities
bunx prisma format                  # Format schema file
bunx prisma validate                # Validate schema
bunx prisma db pull                 # Introspect existing database
```

---

## Common Patterns Cheat Sheet

### 1. Prisma Client Singleton (CRITICAL)

```typescript
// lib/db/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### 2. Repository Method Templates

```typescript
// Find one
async findById(id: string): Promise<T | null> {
  return prisma.model.findUnique({ where: { id } })
}

// Find many with pagination
async findMany(cursor?: string, limit = 20) {
  return prisma.model.findMany({
    take: limit,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
  })
}

// Create
async create(data: CreateData): Promise<T> {
  return prisma.model.create({ data })
}

// Update
async update(id: string, data: UpdateData): Promise<T> {
  return prisma.model.update({ where: { id }, data })
}

// Delete (soft delete preferred)
async delete(id: string): Promise<void> {
  await prisma.model.update({
    where: { id },
    data: { deletedAt: new Date() }
  })
}

// Transaction
async createWithRelation(data: Data) {
  return prisma.$transaction(async (tx) => {
    const parent = await tx.parent.create({ data: data.parent })
    const child = await tx.child.create({ 
      data: { ...data.child, parentId: parent.id } 
    })
    return { parent, child }
  })
}
```

### 3. Query Optimization

```typescript
// ❌ N+1 Problem
const users = await prisma.user.findMany()
for (const user of users) {
  const posts = await prisma.post.findMany({ where: { userId: user.id } })
}

// ✅ Include
const users = await prisma.user.findMany({
  include: { posts: true }
})

// ✅ Select only needed fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    posts: {
      select: {
        id: true,
        title: true,
      }
    }
  }
})
```

### 4. Aggregations

```typescript
// Count
const count = await prisma.user.count()
const activeCount = await prisma.user.count({ where: { isActive: true } })

// Aggregate
const stats = await prisma.document.aggregate({
  _avg: { confidence: true },
  _sum: { fileSize: true },
  _count: { id: true },
})

// Group by
const byStatus = await prisma.document.groupBy({
  by: ['status'],
  _count: { id: true },
})
```

### 5. Error Handling

```typescript
import { Prisma } from '@prisma/client'

try {
  await prisma.user.create({ data })
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      throw new ConflictError('Email already exists')
    }
    if (error.code === 'P2025') {
      throw new NotFoundError('Record not found')
    }
  }
  throw error
}
```

---

## Prisma Error Codes Reference

| Code | Meaning | Action |
|------|---------|--------|
| P2000 | Value too long | Validate input length |
| P2002 | Unique constraint violated | Check for duplicates |
| P2003 | Foreign key constraint | Validate related record exists |
| P2025 | Record not found | Use findUnique → null check |
| P2016 | Query interpretation error | Check query syntax |

---

## Schema Best Practices

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  documents Document[]
  
  // Indexes for performance
  @@index([email])
  @@map("users") // Custom table name
}

model Document {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Use enums for fixed sets
  status    DocumentStatus @default(PROCESSING)
  
  // JSON for flexible data
  metadata  Json?
  
  // Composite indexes
  @@index([userId, status])
  @@map("documents")
}

enum DocumentStatus {
  PROCESSING
  COMPLETED
  FAILED
}
```

---

## Migration Workflow

```bash
# 1. Edit schema.prisma
# 2. Create migration
bunx prisma migrate dev --name add_user_role

# 3. Review generated SQL
cat prisma/migrations/<timestamp>_add_user_role/migration.sql

# 4. Test locally
bunx prisma studio

# 5. Deploy to production
bunx prisma migrate deploy
```

---

## Environment Variables

```bash
# .env
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
DATABASE_URL_UNPOOLED="postgresql://user:pass@host:5432/db?sslmode=require"
```

---

## Performance Tips

1. **Use connection pooling** (automatic with Vercel Postgres)
2. **Add indexes** for frequently queried fields
3. **Use select** to fetch only needed fields
4. **Use cursor pagination** for large datasets
5. **Batch operations** with `createMany`, `updateMany`
6. **Cache expensive queries** with Next.js `unstable_cache`
7. **Use transactions** for consistency, but keep them short

---

## Testing Pattern

```typescript
// test-helpers.ts
export async function resetDatabase() {
  await prisma.childModel.deleteMany()
  await prisma.parentModel.deleteMany()
}

// test.ts
beforeEach(async () => {
  await resetDatabase()
})

test('creates user', async () => {
  const user = await prisma.user.create({
    data: { email: 'test@example.com' }
  })
  expect(user.email).toBe('test@example.com')
})
```

---

## TypeScript Integration

```typescript
import { User, Prisma } from '@prisma/client'

// Generated type for User
type UserType = User

// Type for User with relations
type UserWithPosts = Prisma.UserGetPayload<{
  include: { posts: true }
}>

// Type for create input
type CreateUserInput = Prisma.UserCreateInput

// Validator for complex queries
const userWithPosts = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { posts: true },
})

type UserWithPostsType = Prisma.UserGetPayload<typeof userWithPosts>
```

---

## Common Issues & Solutions

### Issue: "Too many connections"
**Solution:** Use connection pooling URL from Vercel

### Issue: "Migration conflicts"
**Solution:** Never edit existing migrations. Create new one.

### Issue: "Type errors after schema change"
**Solution:** Run `bunx prisma generate` after every schema change

### Issue: "Slow queries"
**Solution:** Add indexes, use `select`, enable query logging

### Issue: "Transaction timeout"
**Solution:** Keep transactions short, use smaller chunks

---

## Next.js Integration

```typescript
// Server Component
import { prisma } from '@/lib/db/prisma'

export default async function Page() {
  const users = await prisma.user.findMany()
  return <UserList users={users} />
}

// Server Action
'use server'
import { prisma } from '@/lib/db/prisma'

export async function createUser(data: FormData) {
  const email = data.get('email') as string
  return prisma.user.create({ data: { email } })
}

// API Route
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  const users = await prisma.user.findMany()
  return Response.json(users)
}
```

---

## Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Prisma Examples](https://github.com/prisma/prisma-examples)
- [Error Reference](https://www.prisma.io/docs/reference/api-reference/error-reference)