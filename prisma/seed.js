const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
const BOOKS_PATH = path.join(__dirname, '..', 'data', 'books.json');

async function main() {
  if (!process.env.DATABASE_URL?.trim()) {
    console.error('DATABASE_URL is required to seed the database.');
    process.exit(1);
  }

  const books = JSON.parse(fs.readFileSync(BOOKS_PATH, 'utf8'));

  for (const book of books) {
    await prisma.book.upsert({
      where: { id: book.id },
      update: {
        title: book.title,
        author: book.author,
        price: book.price,
        category: book.category,
        difficulty: book.difficulty,
        readingTime: book.readingTime || '~6 hours',
        tags: book.tags || [],
        keywords: book.keywords || [],
        isbn: book.isbn || null,
        isAvailable: book.isAvailable !== false,
      },
      create: {
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        category: book.category,
        difficulty: book.difficulty,
        readingTime: book.readingTime || '~6 hours',
        tags: book.tags || [],
        keywords: book.keywords || [],
        isbn: book.isbn || null,
        isAvailable: book.isAvailable !== false,
      },
    });
  }

  console.log(`Seeded ${books.length} books into Neon.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
