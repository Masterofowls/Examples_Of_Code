const http = require('node:http');

const HOST = '127.0.0.1';
const PORT = 8000;

const sendJson = (res, statusCode, data) => {
  const payload = Buffer.from(JSON.stringify(data));
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': payload.length,
  });
  res.end(payload);
};

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    sendJson(res, 200, { message: 'Hello from simple JavaScript server!' });
    return;
  }

  if (req.method === 'GET' && req.url === '/health') {
    sendJson(res, 200, { status: 'ok' });
    return;
  }

  sendJson(res, 404, { error: 'Not found' });
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
  console.log('Endpoints: / and /health');
});

process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  server.close(() => process.exit(0));
});
