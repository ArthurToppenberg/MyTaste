import { PrismaClient } from '@prisma/client';

// Disable ESLint for the global variable declaration to allow var
/* eslint-disable no-var */
declare global {
    var prisma: PrismaClient | undefined;
}
/* eslint-enable no-var */

// Use the existing Prisma instance if available, or create a new one
const prisma = global.prisma || new PrismaClient();

// In development, store the Prisma instance globally to prevent creating multiple instances
if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}

// Gracefully disconnect Prisma when the process exits
if (typeof process !== 'undefined' && process.on) {
    process.on('beforeExit', async () => {
        await prisma.$disconnect();
    });
}

export default prisma;
