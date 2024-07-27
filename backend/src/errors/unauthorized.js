import CustomError from './custom-error';

export class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}
