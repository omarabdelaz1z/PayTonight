/* eslint-disable max-classes-per-file */
class CustomError extends Error {
  constructor(message, status, type) {
    super(message);
    this.details = {
      type,
      status,
      message,
    };
  }
}

class ServerError extends CustomError {
  constructor(message) {
    super(message, 500, "INTERNAL_SERVER_ERROR");
  }
}

class ValidationError extends CustomError {
  constructor(message, status) {
    super(message, status, "VALIDATION_ERROR");
  }
}

class NotFound extends CustomError {
  constructor(message) {
    super(message, 404, "NOT_FOUND");
  }
}

module.exports = {
  ServerError,
  ValidationError,
  NotFound,
};
