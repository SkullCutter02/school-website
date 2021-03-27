import { Router } from "express";

import FeatureController from "../controllers/FeatureController";
import verifyToken from "../middleware/verifyToken";
import validateSchema from "../middleware/validateSchema";
import { createFeatureSchema, patchFeatureSchema } from "../schemas/featureSchema";

const router = Router();

router.get("/", FeatureController.find);

router.post("/", verifyToken(), validateSchema(createFeatureSchema), FeatureController.create);

router.patch("/:uuid", verifyToken(), validateSchema(patchFeatureSchema), FeatureController.patch);

router.delete("/:uuid", verifyToken(), FeatureController.delete);

module.exports = router;
