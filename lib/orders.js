const fs = require('fs');
const path = require('path');
const { getPrisma, hasDatabase } = require('./prisma');

const ORDERS_PATH = path.join(__dirname, '..', 'data', 'orders.json');

function loadJsonOrders() {
  try {
    if (fs.existsSync(ORDERS_PATH)) {
      return JSON.parse(fs.readFileSync(ORDERS_PATH, 'utf8'));
    }
  } catch {
    /* empty */
  }
  return [];
}

function saveJsonOrders(orders) {
  fs.mkdirSync(path.dirname(ORDERS_PATH), { recursive: true });
  fs.writeFileSync(ORDERS_PATH, JSON.stringify(orders, null, 2) + '\n');
}

function formatSubmitted(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatSubmittedShort(date) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function initials(name) {
  const parts = String(name || '').trim().split(/\s+/);
  return ((parts[0]?.[0] || '') + (parts[parts.length - 1]?.[0] || '')).toUpperCase() || '?';
}

function avatarGradient(email) {
  let h = 0;
  for (let i = 0; i < (email || '').length; i++) h = (Math.imul(31, h) + email.charCodeAt(i)) >>> 0;
  const palettes = [
    'linear-gradient(135deg,#C07328,#8C4E10)',
    'linear-gradient(135deg,#1a3848,#2e7490)',
    'linear-gradient(135deg,#3a2060,#6e45b8)',
    'linear-gradient(135deg,#1e4020,#3a7a40)',
    'linear-gradient(135deg,#2A3290,#0047BB)',
  ];
  return palettes[h % palettes.length];
}

function mapOrderForClient(order) {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    bookId: order.bookId,
    isbn: order.isbn,
    title: order.title,
    author: order.author,
    price: order.price,
    employee: order.employee,
    email: order.email,
    department: order.department,
    company: order.company,
    quarter: order.quarter,
    aiInput: order.aiInput,
    status: order.status,
    goal: order.goal,
    address: order.address,
    expectedCompletion: order.expectedCompletion,
    trackingNumber: order.trackingNumber,
    priceSource: order.priceSource,
    pendingPriceVerification: order.pendingPriceVerification,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    submitted: formatSubmitted(order.createdAt),
    submittedShort: formatSubmittedShort(order.createdAt),
    priceFormatted: `$${Number(order.price).toFixed(2)}`,
    initials: initials(order.employee),
    avatarGradient: avatarGradient(order.email),
    ui: {
      id: order.orderNumber,
      employee: order.employee,
      email: order.email,
      dept: order.department,
      company: order.company,
      book: order.title,
      author: order.author,
      price: `$${Number(order.price).toFixed(2)}`,
      submitted: formatSubmitted(order.createdAt),
      goal: order.goal || '',
      address: order.address || '',
      completion: order.expectedCompletion || '',
      aiInput: order.aiInput || '',
      tracking: order.trackingNumber || '',
      trackingNumber: order.trackingNumber || '',
    },
  };
}

function mapDbOrder(order) {
  return mapOrderForClient({
    id: order.id,
    orderNumber: order.orderNumber,
    bookId: order.bookId,
    isbn: order.isbn,
    title: order.title,
    author: order.author,
    price: order.price,
    employee: order.employee,
    email: order.email,
    department: order.department,
    company: order.company,
    quarter: order.quarter,
    aiInput: order.aiInput,
    status: order.status,
    goal: order.goal,
    address: order.address,
    expectedCompletion: order.expectedCompletion,
    trackingNumber: order.trackingNumber,
    priceSource: order.priceSource,
    pendingPriceVerification: order.pendingPriceVerification,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  });
}

async function nextOrderNumber() {
  if (hasDatabase()) {
    const db = getPrisma();
    const count = await db.order.count();
    return `ORD-${1043 + count}`;
  }
  const orders = loadJsonOrders();
  return `ORD-${1043 + orders.length}`;
}

async function createOrder(data) {
  const orderNumber = await nextOrderNumber();
  const payload = {
    orderNumber,
    bookId: data.bookId || null,
    isbn: data.isbn || null,
    title: data.title,
    author: data.author,
    price: Number(data.price),
    employee: data.employee || 'Employee',
    email: data.email || '',
    department: data.department || '',
    company: data.company || '',
    quarter: data.quarter || 'Q2 2026',
    aiInput: data.aiInput || null,
    status: 'pending',
    goal: data.goal || null,
    address: data.address || null,
    expectedCompletion: data.expectedCompletion || null,
    priceSource: data.priceSource || null,
    pendingPriceVerification: Boolean(data.pendingPriceVerification),
  };

  if (hasDatabase()) {
    const db = getPrisma();
    const created = await db.order.create({ data: payload });
    return mapDbOrder(created);
  }

  const orders = loadJsonOrders();
  const created = {
    id: `local-${Date.now()}`,
    ...payload,
    trackingNumber: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orders.unshift(created);
  saveJsonOrders(orders);
  return mapOrderForClient({
    ...created,
    createdAt: new Date(created.createdAt),
    updatedAt: new Date(created.updatedAt),
  });
}

async function listOrders() {
  if (hasDatabase()) {
    const db = getPrisma();
    const orders = await db.order.findMany({ orderBy: { createdAt: 'desc' } });
    return orders.map(mapDbOrder);
  }
  return loadJsonOrders()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((o) =>
      mapOrderForClient({
        ...o,
        createdAt: new Date(o.createdAt),
        updatedAt: new Date(o.updatedAt || o.createdAt),
      })
    );
}

async function updateOrder(id, patch) {
  const data = {};
  if (patch.status != null) data.status = patch.status;
  if (patch.trackingNumber != null) data.trackingNumber = patch.trackingNumber;
  if (patch.goal != null) data.goal = patch.goal;
  if (patch.address != null) data.address = patch.address;
  if (patch.expectedCompletion != null) data.expectedCompletion = patch.expectedCompletion;

  if (hasDatabase()) {
    const db = getPrisma();
    const updated = await db.order.update({ where: { id }, data });
    return mapDbOrder(updated);
  }

  const orders = loadJsonOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) throw new Error('Order not found');
  orders[idx] = { ...orders[idx], ...data, updatedAt: new Date().toISOString() };
  saveJsonOrders(orders);
  return mapOrderForClient({
    ...orders[idx],
    createdAt: new Date(orders[idx].createdAt),
    updatedAt: new Date(orders[idx].updatedAt),
  });
}

module.exports = {
  createOrder,
  listOrders,
  updateOrder,
  mapOrderForClient,
};
