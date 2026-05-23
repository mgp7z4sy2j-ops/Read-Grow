const { MAX_BUDGET_USD } = require('./constants');

const API_BASE = 'https://www.googleapis.com/books/v1/volumes';

function normalizeIsbn(raw) {
  return String(raw || '').replace(/[-\s]/g, '');
}

function extractIsbn13(volume) {
  const ids = volume?.volumeInfo?.industryIdentifiers || [];
  const isbn13 = ids.find((i) => i.type === 'ISBN_13');
  if (isbn13) return isbn13.identifier;
  const isbn10 = ids.find((i) => i.type === 'ISBN_10');
  return isbn10?.identifier || null;
}

function extractPriceUsd(volume) {
  const sale = volume?.saleInfo || {};
  const candidates = [sale.retailPrice, sale.listPrice].filter(Boolean);

  for (const p of candidates) {
    if (p.currencyCode === 'USD' && typeof p.amount === 'number') {
      return { amount: p.amount, currency: 'USD', source: 'google' };
    }
  }

  const rates = { AUD: 0.65, GBP: 1.27, EUR: 1.08, CAD: 0.72, SGD: 0.74 };
  for (const p of candidates) {
    const rate = rates[p.currencyCode];
    if (rate && typeof p.amount === 'number') {
      return {
        amount: Math.round(p.amount * rate * 100) / 100,
        currency: 'USD',
        source: 'google-estimated',
        originalAmount: p.amount,
        originalCurrency: p.currencyCode,
      };
    }
  }

  return null;
}

function mapVolume(volume) {
  const info = volume.volumeInfo || {};
  const priceInfo = extractPriceUsd(volume);
  const priceUsd = priceInfo?.amount ?? null;

  return {
    googleId: volume.id,
    title: info.title || '',
    author: (info.authors || []).join(', '),
    isbn: extractIsbn13(volume),
    isbn13: extractIsbn13(volume),
    priceUsd,
    priceSource: priceInfo?.source || null,
    originalPrice: priceInfo?.originalAmount ?? null,
    originalCurrency: priceInfo?.originalCurrency ?? null,
    withinBudget: priceUsd == null ? null : priceUsd <= MAX_BUDGET_USD,
    maxBudgetUsd: MAX_BUDGET_USD,
    coverUrl: info.imageLinks?.thumbnail?.replace('http:', 'https:') || null,
    description: info.description || '',
    categories: info.categories || [],
    pageCount: info.pageCount || null,
    publishedDate: info.publishedDate || null,
    saleability: volume.saleInfo?.saleability || null,
  };
}

async function fetchGoogleBooks(params) {
  const key = process.env.GOOGLE_BOOKS_API_KEY?.trim();
  const url = new URL(API_BASE);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  if (key) url.searchParams.set('key', key);

  const res = await fetch(url.toString());
  if (!res.ok) {
    const text = await res.text();
    const err = new Error(`Google Books API error ${res.status}: ${text.slice(0, 160)}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

async function safeGoogleLookup(fn) {
  try {
    return await fn();
  } catch (err) {
    if (err.status === 429) {
      console.warn('[google-books] Daily quota exceeded — using catalogue price fallback');
    } else {
      console.warn('[google-books] Lookup failed:', err.message);
    }
    return null;
  }
}

async function lookupByIsbn(isbn) {
  const normalized = normalizeIsbn(isbn);
  if (!normalized) throw new Error('ISBN is required');

  const data = await safeGoogleLookup(() => fetchGoogleBooks({ q: `isbn:${normalized}`, maxResults: 1 }));
  if (!data) return null;
  const volume = data.items?.[0];
  if (!volume) return null;
  return mapVolume(volume);
}

async function lookupByQuery(query) {
  const q = String(query || '').trim();
  if (!q) throw new Error('Search query is required');

  const data = await safeGoogleLookup(() => fetchGoogleBooks({ q, maxResults: 8 }));
  if (!data) return [];
  return (data.items || []).map(mapVolume);
}

async function lookupByTitleAuthor(title, author) {
  const q = [`intitle:${title}`, author ? `inauthor:${author}` : ''].filter(Boolean).join('+');
  const data = await safeGoogleLookup(() => fetchGoogleBooks({ q, maxResults: 3 }));
  if (!data) return null;
  const volume = data.items?.[0];
  return volume ? mapVolume(volume) : null;
}

async function checkBudget({ isbn, title, author, catalogPrice }) {
  let google = null;

  if (isbn) {
    google = await lookupByIsbn(isbn);
  } else if (title) {
    google = await lookupByTitleAuthor(title, author);
  }

  const resolvedPrice =
    google?.priceUsd != null ? google.priceUsd : catalogPrice != null ? Number(catalogPrice) : null;

  const priceSource =
    google?.priceUsd != null ? google.priceSource || 'google' : catalogPrice != null ? 'catalog' : null;

  const withinBudget = resolvedPrice == null ? null : resolvedPrice <= MAX_BUDGET_USD;

  let message;
  if (withinBudget === false) {
    message = `This book is $${resolvedPrice?.toFixed(2)} — over the $${MAX_BUDGET_USD} quarterly budget. Orders cannot be placed.`;
  } else if (withinBudget === true) {
    message = `Within budget at $${resolvedPrice?.toFixed(2)} (source: ${priceSource}).`;
  } else if (catalogPrice != null && catalogPrice <= MAX_BUDGET_USD) {
    message = `Catalogue price $${Number(catalogPrice).toFixed(2)} is within budget (Google Books unavailable).`;
  } else {
    message = 'Price could not be verified. Enter a price under $80 or try again later.';
  }

  return {
    withinBudget: withinBudget ?? (catalogPrice != null ? catalogPrice <= MAX_BUDGET_USD : null),
    canOrder:
      withinBudget === true ||
      (withinBudget == null && catalogPrice != null && catalogPrice <= MAX_BUDGET_USD),
    priceUsd: resolvedPrice ?? (catalogPrice != null ? Number(catalogPrice) : null),
    priceSource,
    maxBudgetUsd: MAX_BUDGET_USD,
    google,
    googleAvailable: google != null,
    message,
  };
}

module.exports = {
  lookupByIsbn,
  lookupByQuery,
  lookupByTitleAuthor,
  checkBudget,
  normalizeIsbn,
  MAX_BUDGET_USD,
};
