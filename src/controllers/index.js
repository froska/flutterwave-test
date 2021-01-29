import formatResponse from "../utils/format-response.js";
import Author from "../models/author.js";

async function index(req, res, next) {
  try {
    const data = new Author();

    return formatResponse(
      res,
      { message: "My Rule-Validation API", status: "success", data },
      200
    );
  } catch (error) {
    next(error);
  }
}

export { index as default };
