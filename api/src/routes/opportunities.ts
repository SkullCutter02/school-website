import { Router } from "express";

import OpportunityController from "../controllers/OpportunityController";
import verifyToken from "../middleware/verifyToken";
import validateSchema from "../middleware/validateSchema";
import { createOpportunitySchema } from "../schemas/opportunitySchema";

const router = Router();

router.post("/", verifyToken(), validateSchema(createOpportunitySchema), OpportunityController.create);

module.exports = router;
