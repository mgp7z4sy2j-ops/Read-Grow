const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const handlers = require('../lib/handlers');

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, '..');

app.use(cors());
app.use(express.json({ limit: '32kb' }));

function sendHandlerError(res, err) {
  console.error('[api]', err);
  if (err.payload) return res.status(err.status || 500).json(err.payload);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
}

app.get('/api/health', async (_req, res) => {
  try {
    res.json(await handlers.health());
  } catch (err) {
    sendHandlerError(res, err);
  }
});

app.get('/api/books', async (_req, res) => {
  try {
    res.json(await handlers.getBooks());
  } catch (err) {
    sendHandlerError(res, err);
  }
});

app.get('/api/books/lookup', async (req, res) => {
  try {
    res.json(await handlers.lookupBooks(req.query));
  } catch (err) {
    sendHandlerError(res, err);
  }
});

app.post('/api/books/check-budget', async (req, res) => {
  try {
    res.json(await handlers.checkBookBudget(req.body));
  } catch (err) {
    sendHandlerError(res, err);
  }
});

app.get('/api/orders', async (_req, res) => {
  try {
    res.json(await handlers.getOrders());
  } catch (err) {
    sendHandlerError(res, err);
  }
});

app.patch('/api/orders/:id', async (req, res) => {
  try {
    res.json(await handlers.patchOrder(req.params.id, req.body));
  } catch (err) {
    sendHandlerError(res, err);
  }
});

app.post('/api/orders/submit', async (req, res) => {
  try {
    res.json(await handlers.submitOrder(req.body));
  } catch (err) {
    sendHandlerError(res, err);
  }
});

app.post('/api/books', async (req, res) => {
  try {
    const result = await handlers.createBook(req.body);
    res.status(201).json(result);
  } catch (err) {
    sendHandlerError(res, err);
  }
});

app.post('/api/recommendations', async (req, res) => {
  try {
    res.json(await handlers.getRecommendations(req.body));
  } catch (err) {
    sendHandlerError(res, err);
  }
});

app.use(express.static(ROOT));

app.listen(PORT, () => {
  console.log(`\n  Good Book Program → http://localhost:${PORT}`);
  console.log(`  Dashboard       → http://localhost:${PORT}/dashboard.html`);
  console.log(`  Database        → ${process.env.DATABASE_URL?.trim() ? 'Neon (PostgreSQL)' : 'JSON fallback'}`);
  console.log(`  AI engine       → ${process.env.ANTHROPIC_API_KEY?.trim() ? 'Claude API (' + (process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6') + ')' : 'local fallback (add ANTHROPIC_API_KEY to .env for Claude)'}\n`);
});
