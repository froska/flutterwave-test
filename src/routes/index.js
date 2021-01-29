import express from "express";
import validatorRoutes from "./rule-validator.js";
import index from "../controllers/index.js";

const router = express.Router();

router.get("/", index);
router.use(validatorRoutes);

export { router as default };
