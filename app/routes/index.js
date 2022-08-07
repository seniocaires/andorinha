const apis = require('./apis');
var packageJson = require('../../package.json');

const inicializar = (server) => {
  server.get('/andorinha/', (request, response) => {
    response.json({ name: packageJson.name, version: packageJson.version, description: packageJson.description, environment: process.env.ENVIRONMENT });
  });
  server.use('/andorinha/api', apis);
};
module.exports = {
  init: inicializar,
};
