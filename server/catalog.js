const fs = require('fs');
const path = require('path');
const { MAX_BUDGET_USD } = require('./constants');

const BOOKS_PATH = path.join(__dirname, '..', 'data', 'books.json');

let catalog = null;

function loadCatalog() {
  if (!catalog) {
    catalog = JSON.parse(fs.readFileSync(BOOKS_PATH, 'utf8'));
  }
  return catalog;
}

function reloadCatalog() {
  catalog = null;
  return loadCatalog();
}

function getBookById(id) {
  return loadCatalog().find((b) => b.id === id) || null;
}

function getEligibleBooks() {
  return loadCatalog().filter((b) => b.price <= MAX_BUDGET_USD && b.isAvailable !== false);
}

function addBook(book) {
  const books = loadCatalog();
  if (books.some((b) => b.id === book.id)) {
    throw new Error('A book with this ID already exists in the catalogue.');
  }
  books.push(book);
  fs.writeFileSync(BOOKS_PATH, JSON.stringify(books, null, 2) + '\n');
  reloadCatalog();
  return book;
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

function listBooksForAdmin() {
  return loadCatalog().map((book) => {
    const stats = demoStats(book.id);
    return {
      ...book,
      ...stats,
      level: book.difficulty,
    };
  });
}

module.exports = {
  loadCatalog,
  reloadCatalog,
  getBookById,
  getEligibleBooks,
  addBook,
  listBooksForAdmin,
  demoStats,
  BOOKS_PATH,
};
