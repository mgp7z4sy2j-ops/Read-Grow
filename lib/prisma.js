const { PrismaClient } = require('@prisma/client');

let prisma;

function hasDatabase() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

function getPrisma() {
  if (!hasDatabase()) return null;
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

module.exports = { getPrisma, hasDatabase };
