const { MAX_BUDGET_USD } = require('./constants');
const { listBooksForAdmin, getBookById, addBook } = require('./catalog');
const { lookupByIsbn, lookupByQuery, checkBudget } = require('./google-books');
const { recommend } = require('./recommend');
const { createOrder, listOrders, updateOrder } = require('./orders');
const { hasDatabase } = require('./prisma');

async function health() {
  return {
    ok: true,
    ai: process.env.ANTHROPIC_API_KEY?.trim() ? 'claude' : 'local',
    maxBudgetUsd: MAX_BUDGET_USD,
    googleBooks: true,
    database: hasDatabase() ? 'neon' : 'json-fallback',
  };
}

async function getBooks() {
  const books = await listBooksForAdmin();
  return { count: books.length, books };
}

async function lookupBooks(query) {
  const { isbn, q } = query;
  if (isbn) {
    const book = await lookupByIsbn(String(isbn));
    if (!book) {
      const err = new Error('Book not found for this ISBN');
      err.status = 404;
      throw err;
    }
    return book;
  }
  if (q) {
    const books = await lookupByQuery(String(q));
    return { books };
  }
  const err = new Error('Provide isbn or q query parameter');
  err.status = 400;
  throw err;
}

async function checkBookBudget(body) {
  const { isbn, title, author, price, bookId } = body || {};
  const catalogBook = bookId ? await getBookById(bookId) : null;
  return checkBudget({
    isbn: isbn || catalogBook?.isbn,
    title: title || catalogBook?.title,
    author: author || catalogBook?.author,
    catalogPrice: price ?? catalogBook?.price,
  });
}

async function submitOrder(body) {
  const { bookId, isbn, title, author, price, employee, email, department, company, quarter, aiInput, goal, address, expectedCompletion } =
    body || {};

  if (!title && !bookId) {
    const err = new Error('title or bookId is required');
    err.status = 400;
    throw err;
  }

  const catalogBook = bookId ? await getBookById(bookId) : null;
  const catalogPrice = price ?? catalogBook?.price;

  if (catalogPrice != null && Number(catalogPrice) > MAX_BUDGET_USD) {
    const err = new Error(
      `This book is $${Number(catalogPrice).toFixed(2)} — over the $${MAX_BUDGET_USD} quarterly budget.`
    );
    err.status = 403;
    err.payload = {
      error: 'budget_exceeded',
      canOrder: false,
      withinBudget: false,
      priceUsd: Number(catalogPrice),
      maxBudgetUsd: MAX_BUDGET_USD,
      message: err.message,
    };
    throw err;
  }

  const validation = await checkBudget({
    isbn: isbn || catalogBook?.isbn,
    title: title || catalogBook?.title,
    author: author || catalogBook?.author,
    catalogPrice,
  });

  if (validation.withinBudget === false) {
    const err = new Error(validation.message || 'Budget exceeded');
    err.status = 403;
    err.payload = { error: 'budget_exceeded', ...validation };
    throw err;
  }

  if (!validation.canOrder) {
    const err = new Error(validation.message || 'Price unverified');
    err.status = 400;
    err.payload = { error: 'price_unverified', ...validation };
    throw err;
  }

  const resolvedPrice = validation.priceUsd ?? catalogPrice;
  const saved = await createOrder({
    bookId: bookId || catalogBook?.id,
    isbn: isbn || catalogBook?.isbn || validation.google?.isbn,
    title: title || catalogBook?.title,
    author: author || catalogBook?.author,
    price: resolvedPrice,
    employee,
    email,
    department,
    company,
    quarter: quarter || 'Q2 2026',
    aiInput,
    goal,
    address,
    expectedCompletion,
    priceSource: validation.priceSource,
    pendingPriceVerification: validation.withinBudget === null,
  });

  return {
    ok: true,
    order: {
      id: saved.id,
      orderNumber: saved.orderNumber,
      bookId: saved.bookId,
      isbn: saved.isbn,
      title: saved.title,
      author: saved.author,
      price: saved.price,
      employee: saved.employee,
      email: saved.email,
      department: saved.department,
      company: saved.company,
      quarter: saved.quarter,
      aiInput: saved.aiInput,
      status: saved.status,
      priceSource: saved.priceSource,
      pendingPriceVerification: saved.pendingPriceVerification,
    },
    validation,
  };
}

async function createBook(body) {
  const { title, author, isbn, price, category, difficulty, keywords, readingTime, tags } = body || {};

  if (!title?.trim() || !author?.trim()) {
    const err = new Error('title and author are required');
    err.status = 400;
    throw err;
  }

  const catalogPrice = price != null ? Number(price) : null;
  if (catalogPrice != null && catalogPrice > MAX_BUDGET_USD) {
    const err = new Error(`Books over $${MAX_BUDGET_USD} cannot be added to the catalogue.`);
    err.status = 403;
    err.payload = { error: 'budget_exceeded', message: err.message };
    throw err;
  }

  const validation = await checkBudget({ isbn, title, author, catalogPrice });
  if (validation.withinBudget === false) {
    const err = new Error(validation.message || 'Budget exceeded');
    err.status = 403;
    err.payload = { error: 'budget_exceeded', ...validation };
    throw err;
  }

  const resolvedPrice = validation.priceUsd ?? catalogPrice;
  if (resolvedPrice == null) {
    const err = new Error('Could not determine price from Google Books. Enter a catalogue price under $80.');
    err.status = 400;
    err.payload = { error: 'price_required', message: err.message };
    throw err;
  }

  const id = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);

  const book = await addBook({
    id,
    title: title.trim(),
    author: author.trim(),
    isbn: isbn || validation.google?.isbn || undefined,
    price: resolvedPrice,
    category: category || 'Leadership',
    difficulty: difficulty || 'Beginner',
    readingTime: readingTime || '~6 hours',
    tags: tags || [],
    keywords: typeof keywords === 'string' ? keywords.split(',').map((k) => k.trim()) : keywords || [],
    priceSource: validation.priceSource,
  });

  return { book, validation };
}

async function getRecommendations(body) {
  const { inputText, department, company } = body || {};
  if (!inputText || !String(inputText).trim()) {
    const err = new Error('inputText is required');
    err.status = 400;
    throw err;
  }
  return recommend(String(inputText).trim(), { department, company });
}

async function getOrders() {
  const orders = await listOrders();
  return { count: orders.length, orders };
}

async function patchOrder(id, body) {
  if (!id) {
    const err = new Error('Order id is required');
    err.status = 400;
    throw err;
  }
  const order = await updateOrder(id, body || {});
  return { ok: true, order };
}

module.exports = {
  health,
  getBooks,
  lookupBooks,
  checkBookBudget,
  submitOrder,
  createBook,
  getRecommendations,
  getOrders,
  patchOrder,
};
