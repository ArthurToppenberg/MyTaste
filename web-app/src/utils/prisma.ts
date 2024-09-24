import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma; // Store in global variable in development
}

process.on('beforeExit', async () => {
    await prisma.$disconnect();
});

export default prisma;
