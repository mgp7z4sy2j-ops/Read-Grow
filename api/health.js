require('dotenv').config();

const handlers = require('../lib/handlers');
const { createHandler } = require('../lib/http');

module.exports = createHandler(async () => ({
  body: await handlers.health(),
}));
