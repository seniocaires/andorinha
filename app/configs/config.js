const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  environment: process.env.ENVIRONMENT,
  serverName: process.env.SERVER_NAME,
  serverPort: process.env.SERVER_PORT,
  corsOrigin: process.env.CORS_ORIGIN
};
