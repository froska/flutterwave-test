import { Router } from "express";
import validatorRoutes from "./rule-validator.js";
import index from "../controllers/index.js";

const router = Router();

router.get("/", index);
router.use(validatorRoutes);

export { router as default };
