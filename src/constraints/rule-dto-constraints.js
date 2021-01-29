import expressValidator from "express-validator";
import _ from "lodash";

const { body } = expressValidator;
const ruleDtoConstraints = () => [
  body("rule")
    .not()
    .isEmpty()
    .withMessage("rule is required.")
    .custom((value) => {
      if (!_.isObject(value) && !_.isArray(value) && !_.isString(value))
        throw new Error("rule should be an object.");
      return true;
    }),

  body("rule.field")
    .not()
    .isEmpty()
    .withMessage("field field is missing from rule.")
    .custom((value) => {
      const levelsCount = value.split(".").length;
      if (_.isString(value) && levelsCount > 2)
        throw new Error(`field nesting should not be more than two levels.`);
      return true;
    }),
  body("rule.condition")
    .not()
    .isEmpty()
    .withMessage("field condition is missing from rule.")
    .custom((value) => {
      if (
        !_.isString(value) ||
        !["eq", "neq", "gt", "gte", "contains"].includes(value)
      )
        throw new Error(
          "rule condition should be 'eq', 'neq', 'gt', 'gte', or 'contains'."
        );
      return true;
    }),
  body("rule.condition_value")
    .not()
    .isEmpty()
    .withMessage("field condition_value is missing from rule."),
  body("data")
    .not()
    .isEmpty()
    .withMessage("data is required.")
    .custom((value) => {
      if (!_.isObject(value) && !_.isArray(value) && !_.isString(value))
        throw new Error("data should be an object or array or string.");
      return true;
    })
    .custom((value, { req }) => {
      const levels = req.body.rule.field?.split(".");

      if (_.isNaN(parseInt(req.body.rule.field)) && levels?.length == 2) {
        if (
          _.isUndefined(value[levels[0]]) ||
          _.isUndefined(value[levels[0]][levels[1]])
        )
          throw new Error(`field ${req.body.rule.field} is missing from data.`);
      } else {
        if (!value[req.body.rule.field])
          throw new Error(`field ${req.body.rule.field} is missing from data.`);
      }
      return true;
    }),
];

export { ruleDtoConstraints };
