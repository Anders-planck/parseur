import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;
/**
 * PrismaClient singleton for Next.js
 * Prevents multiple instances in development (hot reload)
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/*
  * Use Neon adapter in production for serverless compatibility
  * In development, use standard PrismaClient for better performance
*/
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaNeon({ connectionString });

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
    errorFormat: 'pretty',
    ...(process.env.NODE_ENV === 'production' ? { adapter } : {}),
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Graceful shutdown (only in Node.js runtime, not Edge)
if (typeof process !== 'undefined' && process.on) {
  process.on('beforeExit', async () => {
    await prisma.$disconnect()
  })
}

// Export Prisma types
export type { Prisma } from '@prisma/client'
