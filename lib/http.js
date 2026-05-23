function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(res, status, data) {
  setCors(res);
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

async function handleApiError(res, err) {
  console.error('[api]', err);
  if (err.payload) {
    return sendJson(res, err.status || 500, err.payload);
  }
  sendJson(res, err.status || 500, {
    error: err.message || 'Internal server error',
  });
}

function createHandler(fn) {
  return async (req, res) => {
    if (req.method === 'OPTIONS') {
      setCors(res);
      res.statusCode = 204;
      return res.end();
    }

    try {
      const result = await fn(req, res);
      if (result !== undefined) {
        sendJson(res, result.status || 200, result.body);
      }
    } catch (err) {
      await handleApiError(res, err);
    }
  };
}

module.exports = {
  setCors,
  sendJson,
  readBody,
  handleApiError,
  createHandler,
};
