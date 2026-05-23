require('dotenv').config();

const handlers = require('../../lib/handlers');
const { createHandler, readBody } = require('../../lib/http');

module.exports = createHandler(async (req) => {
  const id = req.query.id;
  if (req.method === 'PATCH') {
    const body = await readBody(req);
    return { body: await handlers.patchOrder(id, body) };
  }
  const err = new Error('Method not allowed');
  err.status = 405;
  throw err;
});
