/**
 * Classe de exceção usada para enviar erros de validação para o Frontend.
 * 
 * Exemplo: HttpException(400, 'Parâmetro inválido: ID')
 */
 class HttpException extends Error {
    constructor(status, message) {
      super(message);
      Error.captureStackTrace(this, this.constructor);
  
      this.name = this.constructor.name;
      this.status = status;
    }
  
    statusCode() {
      return this.status;
    }
  }
  
  module.exports = HttpException;
  