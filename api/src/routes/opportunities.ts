import { Router } from "express";

import OpportunityController from "../controllers/OpportunityController";
import verifyToken from "../middleware/verifyToken";
import validateSchema from "../middleware/validateSchema";
import { createOpportunitySchema, patchOpportunitySchema } from "../schemas/opportunitySchema";

const router = Router();

router.get("/", OpportunityController.find);

router.post("/", verifyToken(), validateSchema(createOpportunitySchema), OpportunityController.create);

router.patch("/:uuid", verifyToken(), validateSchema(patchOpportunitySchema), OpportunityController.patch);

router.delete("/:uuid", verifyToken(), OpportunityController.delete);

module.exports = router;
