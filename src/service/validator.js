import _ from "lodash";

class ValidatorService {
  constructor(ruleDto) {
    this.data = ruleDto.data;
    this.field = ruleDto.rule.field;
    this.condition = ruleDto.rule.condition;
    this.conditionValue = ruleDto.rule.condition_value;
    this.errs = ruleDto.rule.condition_value;
  }
  /**
   * helper method for the validation logic
   */
  getField() {
    if (_.isNaN(parseInt(this.field)) && this.field.split(".").length == 2) {
      const levels = this.field.split(".");
      return this.data[levels[0]][levels[1]];
    } else {
      return this.data[this.field];
    }
  }
  /**
   * helper method for the validation logic
   */
  validate(fieldValue) {
    let result = false;
    switch (this.condition) {
      case "eq":
        result = fieldValue === this.conditionValue;
        break;

      case "neq":
        result = fieldValue !== this.conditionValue;
        break;

      case "gt":
        result = fieldValue > this.conditionValue;
        break;

      case "gte":
        result = fieldValue >= this.conditionValue;
        break;

      case "contains":
        result = fieldValue.includes(this.conditionValue);
        break;

      default:
        result = false;
    }

    return result;
  }
  /**
   * main method that handles the validation logic
   */
  validateRule() {
    const fieldValue = this.getField();
    const isValid = this.validate(fieldValue);

    const dataResponsePayload = {
      validation: {
        error: !isValid,
        field: this.field,
        field_value: fieldValue,
        condition: this.condition,
        condition_value: this.conditionValue,
      },
    };

    return dataResponsePayload;
  }
}

export { ValidatorService as default };
