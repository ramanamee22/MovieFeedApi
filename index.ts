export {};
const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');

// Start the server
app.listen(config.port, () => {
  logger.info(`Server is listening on port ${config.port}`);
});