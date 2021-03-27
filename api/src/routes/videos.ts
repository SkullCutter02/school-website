import { Router } from "express";

import VideoController from "../controllers/VideoController";
import verifyToken from "../middleware/verifyToken";
import validateSchema from "../middleware/validateSchema";
import { createVideoSchema, patchVideoSchema } from "../schemas/videoSchema";

const router = Router();

router.get("/", VideoController.find);

router.post("/", verifyToken(), validateSchema(createVideoSchema), VideoController.create);

router.patch("/:uuid", verifyToken(), validateSchema(patchVideoSchema), VideoController.patch);

router.delete("/:uuid", verifyToken(), VideoController.delete);

module.exports = router;
