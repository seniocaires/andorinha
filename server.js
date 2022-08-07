const server = require('./app/configs/server')();
const config = require('./app/configs/config');

server.create(config);

server.start();

server.process();
