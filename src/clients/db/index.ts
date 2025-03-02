import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    },
});

export default prismaClient;