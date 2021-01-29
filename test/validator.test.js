import { jest } from "@jest/globals";
import validatorService from "../src/service/validator";

test("should return the field value to be validated from the data field", () => {
  const dto = {
    rule: {
      field: "0",
      condition: "eq",
      condition_value: "a",
    },
    data: "damien-marley",
  };

  const fieldValue = new validatorService(dto).getField();

  expect(fieldValue).toEqual(dto.data[dto.rule.field]);

  const twoLevelsDto = {
    rule: {
      field: "missions.count",
      condition: "gte",
      condition_value: 30,
    },
    data: {
      name: "James Holden",
      crew: "Rocinante",
      age: 34,
      position: "Captain",
      missions: {
        count: 45,
        successful: 44,
        failed: 1,
      },
    },
  };

  const nestedFieldValue = new validatorService(twoLevelsDto).getField(
    twoLevelsDto
  );
  expect(nestedFieldValue).toEqual(45);
});

test("should return perform validation of the rule and return result true or false", () => {
  const dto = {
    rule: {
      field: "0",
      condition: "eq",
      condition_value: "a",
    },
    data: "damien-marley",
  };

  const result = new validatorService(dto).validate();

  expect(result).toBe(false);
});

test("should return validation data object with error property false", () => {
  const dto = {
    rule: {
      field: "missions.count",
      condition: "gte",
      condition_value: 30,
    },
    data: {
      name: "James Holden",
      crew: "Rocinante",
      age: 34,
      position: "Captain",
      missions: {
        count: 45,
        successful: 44,
        failed: 1,
      },
    },
  };

  const data = new validatorService(dto).validateRule();

  expect(data).toEqual({
    validation: {
      error: false,
      field: "missions.count",
      field_value: 45,
      condition: "gte",
      condition_value: 30,
    },
  });
});
