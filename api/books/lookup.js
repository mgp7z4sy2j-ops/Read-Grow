require('dotenv').config();

const handlers = require('../../lib/handlers');
const { createHandler } = require('../../lib/http');

module.exports = createHandler(async (req) => {
  if (req.method !== 'GET') {
    const err = new Error('Method not allowed');
    err.status = 405;
    throw err;
  }
  const url = new URL(req.url, 'http://localhost');
  return {
    body: await handlers.lookupBooks({
      isbn: url.searchParams.get('isbn'),
      q: url.searchParams.get('q'),
    }),
  };
});
