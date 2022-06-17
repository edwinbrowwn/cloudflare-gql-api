import { PrismaClient } from '@prisma/client/edge';

const db = new PrismaClient();

console.log(db);

export default db;
