/**
 *
 * The Error constructor
 * @param {Number} statusCode - error code
 * @param {String} message - The error message
 * @param {Object} error - Optional object
 */
class ErrorHandler extends Error {
  constructor(statusCode, message = null, error = null) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}

/**
 *
 * A helper function that returns the formatted error response
 * @param {Object }err - error object
 * @param {Object} res - response object
 */
const handleError = (err, res) => {
  let { statusCode, message } = err;
  const code = statusCode ? statusCode : 500;
  if (statusCode === 400) {
    message = "Invalid JSON payload passed.";
  }
  res.status(code).send({
    message: message ? message : "Internal server error.",
    status: "error",
    data: null,
  });
};

/**
 *
 *
 * @param { Object } err - error
 * @param {Object } req - request
 * @param {Object } res - response
 * @param {Object } next - next function
 */
const catchInvalidJson = (err, req, res, next) => {
  handleError(err, res);
};

export { ErrorHandler, catchInvalidJson };
