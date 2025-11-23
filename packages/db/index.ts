import { PrismaClient } from "./generated/prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const client = globalForPrisma.prisma;


export { client };