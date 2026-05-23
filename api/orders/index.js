require('dotenv').config();

const handlers = require('../../lib/handlers');
const { createHandler, readBody } = require('../../lib/http');

module.exports = createHandler(async (req) => {
  if (req.method === 'GET') {
    return { body: await handlers.getOrders() };
  }
  const err = new Error('Method not allowed');
  err.status = 405;
  throw err;
});
