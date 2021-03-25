import { Router } from "express";

import AuthController from "../controllers/AuthController";
import { logInSchema } from "../schemas/authSchema";
import validateSchema from "../middleware/validateSchema";

const router = Router();

router.post("/login", validateSchema(logInSchema), AuthController.login);

module.exports = router;
