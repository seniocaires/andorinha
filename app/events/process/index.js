module.exports = function () {
  process.on('exit', async () => {
    console.info('process event exit...');
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    console.info('process event SIGINT...');
    process.exit(0);
  });

  process.on('SIGUSR1', async () => {
    process.exit(0);
  });
  process.on('SIGUSR2', async () => {
    process.exit(0);
  });

  process.on('uncaughtException', async (err) => {
    console.info('process event uncaughtException...');
    console.error('error: ', err);
    process.exit(0);
  });
};
