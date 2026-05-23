require('dotenv').config();

const handlers = require('../lib/handlers');
const { createHandler, readBody } = require('../lib/http');

module.exports = createHandler(async (req) => {
  if (req.method === 'GET') {
    return { body: await handlers.getBooks() };
  }
  if (req.method === 'POST') {
    const body = await readBody(req);
    const result = await handlers.createBook(body);
    return { status: 201, body: result };
  }
  const err = new Error('Method not allowed');
  err.status = 405;
  throw err;
});
