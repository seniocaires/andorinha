const HttpException = require('./httpException');

const errors = (error, request, response) => {

  console.error('\n-------------------------------');
  console.error('Error: ', error.name);
  console.error('Stack: ', error.stack);
  console.error(error);
  console.error('\n-------------------------------');

  if (error instanceof HttpException) {
    response.status(error.status).json({ message: error.message });
  } else {
    response.status(500).json({ message: 'Ocorreu um erro inesperado, por favor tente mais tarde.' });
  }
};

module.exports = {
  errors,
};
