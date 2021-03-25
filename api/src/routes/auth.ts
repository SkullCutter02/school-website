import { Router } from "express";

import AuthController from "../controllers/AuthController";
import { logInSchema } from "../schemas/authSchema";
import validateSchema from "../middleware/validateSchema";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.post("/login", validateSchema(logInSchema), AuthController.login);

router.post("/logout", verifyToken(), AuthController.logout);

module.exports = router;
