require('dotenv').config();

const handlers = require('../../lib/handlers');
const { createHandler, readBody } = require('../../lib/http');

module.exports = createHandler(async (req) => {
  if (req.method !== 'POST') {
    const err = new Error('Method not allowed');
    err.status = 405;
    throw err;
  }
  const body = await readBody(req);
  return { body: await handlers.submitOrder(body) };
});
