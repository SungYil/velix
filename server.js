const { createServer } = require('http');
const { parse } = require('url');
const path = require('path');
const next = require('next');

const dev = false;
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);
const dir = path.resolve(__dirname);

const app = next({ dev, dir, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> VelixENT Server ready on http://${hostname}:${port}`);
  });
}).catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
