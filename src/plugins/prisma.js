import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const DATABASE_URL = process.env.DATABASE_URL;

const adapter = new PrismaPg({ 
            connectionString: DATABASE_URL
        });
const prisma = new PrismaClient({
	adapter
});

export default prisma;
