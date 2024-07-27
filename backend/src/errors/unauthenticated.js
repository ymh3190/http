import CustomError from "./custom-error";

export class UnauthenticatedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
