import formatResponse from "../utils/format-response.js";
import ValidatorService from "../service/validator.js";

async function validateRule(req, res, next) {
  try {
    const validatorService = new ValidatorService(req.body);
    const data = validatorService.validateRule();
    if (data.validation.error) {
      return formatResponse(
        res,
        {
          message: `field ${req.body.rule.field} failed validation.`,
          status: "error",
          data,
        },
        400
      );
    }
    return formatResponse(
      res,
      {
        message: `field ${req.body.rule.field} successfully validated.`,
        status: "success",
        data,
      },
      200
    );
  } catch (error) {
    next(error);
  }
}

export { validateRule as default };
