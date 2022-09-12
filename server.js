const next = require('next');
const main = require('../nature-backend/src/main');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(main)
  .then((server) => {
    server.get('*', (req, res) => {
      return handle(req, res);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
