const fs = require('fs');
const path = require('path');
const { getPrisma, hasDatabase } = require('./prisma');

const BOOKS_PATH = path.join(__dirname, '..', 'data', 'books.json');

let jsonCatalog = null;

function loadJsonCatalog() {
  if (!jsonCatalog) {
    jsonCatalog = JSON.parse(fs.readFileSync(BOOKS_PATH, 'utf8'));
  }
  return jsonCatalog;
}

function demoStats(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (Math.imul(31, h) + id.charCodeAt(i)) >>> 0;
  const inactive = id === 'hard-thing' || h % 17 === 0;
  return {
    requested: (h % 48) + 3,
    rating: (4.2 + (h % 8) * 0.1).toFixed(1),
    status: inactive ? 'inactive' : 'active',
  };
}

function mapBookForAdmin(book) {
  const stats = demoStats(book.id);
  return {
    ...book,
    ...stats,
    level: book.difficulty,
  };
}

function mapDbBook(book) {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    price: book.price,
    category: book.category,
    difficulty: book.difficulty,
    readingTime: book.readingTime,
    tags: book.tags,
    keywords: book.keywords,
    isbn: book.isbn,
    isAvailable: book.isAvailable,
    priceSource: book.priceSource,
  };
}

async function getBookById(id) {
  if (hasDatabase()) {
    const db = getPrisma();
    const book = await db.book.findUnique({ where: { id } });
    return book ? mapDbBook(book) : null;
  }
  return loadJsonCatalog().find((b) => b.id === id) || null;
}

async function getEligibleBooks() {
  const { MAX_BUDGET_USD } = require('./constants');
  if (hasDatabase()) {
    const db = getPrisma();
    const books = await db.book.findMany({
      where: { isAvailable: true, price: { lte: MAX_BUDGET_USD } },
    });
    return books.map(mapDbBook);
  }
  return loadJsonCatalog().filter((b) => b.price <= MAX_BUDGET_USD && b.isAvailable !== false);
}

async function listBooksForAdmin() {
  if (hasDatabase()) {
    const db = getPrisma();
    const books = await db.book.findMany({ orderBy: { title: 'asc' } });
    return books.map((b) => mapBookForAdmin(mapDbBook(b)));
  }
  return loadJsonCatalog().map(mapBookForAdmin);
}

async function addBook(book) {
  if (hasDatabase()) {
    const db = getPrisma();
    const existing = await db.book.findUnique({ where: { id: book.id } });
    if (existing) throw new Error('A book with this ID already exists in the catalogue.');

    const created = await db.book.create({
      data: {
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
        priceSource: book.priceSource || null,
      },
    });
    return mapDbBook(created);
  }

  const books = loadJsonCatalog();
  if (books.some((b) => b.id === book.id)) {
    throw new Error('A book with this ID already exists in the catalogue.');
  }
  books.push(book);
  fs.writeFileSync(BOOKS_PATH, JSON.stringify(books, null, 2) + '\n');
  jsonCatalog = null;
  return book;
}

module.exports = {
  getBookById,
  getEligibleBooks,
  listBooksForAdmin,
  addBook,
  demoStats,
  BOOKS_PATH,
};
