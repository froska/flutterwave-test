import app from "../server.mjs";

import supertest from "supertest";

const request = supertest(app);

it("Should return HTTP 400 status code including message: rule is required.", async (done) => {
  const res = await request.post("/validate-rule").send({});

  expect(res.status).toBe(400);
  expect(res.body.message).toBe("rule is required.");
  done();
});

it("Should return HTTP 400 status code including message: rule should be an object.", async (done) => {
  const res = await request.post("/validate-rule").send({ rule: 4 });

  expect(res.status).toBe(400);
  expect(res.body.message).toBe("rule should be an object.");
  done();
});

it("Should return HTTP 400 status code including message: Invalid JSON payload passed.", async (done) => {
  const res = await request
    .post("/validate-rule")
    .send('{"rule":"",}')
    .type("json")
    .expect("Content-Type", /json/);

  expect(res.status).toBe(400);
  expect(res.body.message).toBe("Invalid JSON payload passed.");
  done();
});

it("Should return HTTP 400 status code including message: field age is missing from data.", async (done) => {
  const res = await request
    .post("/validate-rule")
    .send(
      `{
      "rule": {
        "field": "age",
        "condition": "gte",
        "condition_value": 30
      },
      "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "position": "Captain",
        "missions": 45
      }
    }`
    )
    .type("json")
    .expect("Content-Type", /json/);

  expect(res.status).toBe(400);
  expect(res.body.message).toBe("field age is missing from data.");
  done();
});

it("Should return HTTP 200 status code including message: field missions successfully validated.", async (done) => {
  const res = await request
    .post("/validate-rule")
    .send(
      `{
      "rule": {
        "field": "missions",
        "condition": "gte",
        "condition_value": 30
      },
      "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "age": 34,
        "position": "Captain",
        "missions": 45
      }
    }`
    )
    .type("json")
    .expect("Content-Type", /json/);

  expect(res.status).toBe(200);
  expect(res.body.message).toBe("field missions successfully validated.");
  done();
});

it("Should return HTTP 400 status code including message: field missions failed validation.", async (done) => {
  const res = await request
    .post("/validate-rule")
    .send(
      `{
      "rule": {
        "field": "missions",
        "condition": "contains",
        "condition_value": 3
      },
      "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "age": 34,
        "position": "Captain",
        "missions": "45"
      }
    }`
    )
    .type("json")
    .expect("Content-Type", /json/);

  expect(res.status).toBe(400);
  expect(res.body.message).toBe("field missions failed validation.");
  done();
});
