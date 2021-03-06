import express from "express";
import { ruleDtoConstraints } from "../constraints/rule-dto-constraints.js";
import { applyContraints } from "../constraints/index.js";
import validateRule from "../controllers/rule-validator.js";

const router = express.Router();

router.post(
  "/validate-rule",
  ruleDtoConstraints(),
  applyContraints,
  validateRule
);

export { router as default };
