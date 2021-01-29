import expressValidator from "express-validator";
import formatResponse from "../utils/format-response.js";

const { validationResult } = expressValidator;

/**
 * Middleware that applies express validator on the rule-dto-constaints rules.
 *
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {func} next The next function
 * @returns next function if there's no error and the error object if there's a validation error
 */
const applyContraints = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));

  return formatResponse(
    res,
    { message: extractedErrors[0], status: "error", data: null },
    400
  );
};

export { applyContraints };
