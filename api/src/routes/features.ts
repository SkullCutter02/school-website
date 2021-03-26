import { Router } from "express";

import FeatureController from "../controllers/FeatureController";
import verifyToken from "../middleware/verifyToken";
import validateSchema from "../middleware/validateSchema";
import { createFeatureSchema } from "../schemas/featureSchema";

const router = Router();

router.post("/", verifyToken(), validateSchema(createFeatureSchema), FeatureController.create);

module.exports = router;
