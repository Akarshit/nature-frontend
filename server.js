const next = require('next');
const main = require('../nature-backend/src/main');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

console.log('I am here');
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
