const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const exceptions = require('../exceptions');
const processEvents = require('../events/process');
const clearDownloadScheduler = require('../schedulers/clearDownloadScheduler');
const clearUploadScheduler = require('../schedulers/clearUploadScheduler');
const HttpException = require('../exceptions/httpException');

module.exports = function () {
  let server = express(),
    create,
    start,
    process;

  create = (config) => {
    let routes = require('../routes');

    server.set('environment', config.environment);
    server.set('name', config.serverName);
    server.set('port', config.serverPort);

    server.use(bodyParser.json());
    server.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );

    server.use(morgan('tiny'));

    const corsOptions = {
      origin: config.corsOrigin === '*' ? config.corsOrigin : (origin, callback) => {
        if (config.corsOrigin.split(',').indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          console.error(`Origem não autorizada: ${origin}`);
          callback(new HttpException(403, 'Origem não autorizada'));
        }
      },
      credentials: true,
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };
    server.use(cors(corsOptions));

    routes.init(server);

    server.use((err, req, res, next) => {
      exceptions.errors(err, req, res);
    });
  };

  start = () => {
    let name = server.get('name');
    let port = server.get('port');
    server.listen(port, function () {
      clearDownloadScheduler();
      clearUploadScheduler();
      console.info(`Servidor iniciado - http://${name}:${port}`);
    });
  };

  process = () => {
    processEvents();
  };

  return {
    create: create,
    start: start,
    process: process,
  };
};
