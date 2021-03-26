import { Router } from "express";

import validateSchema from "../middleware/validateSchema";
import { createPostSchema, patchPostSchema } from "../schemas/postSchema";
import PostController from "../controllers/PostController";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.get("/", PostController.find);

router.get("/:uuid", PostController.findOne);

router.post("/", verifyToken(), validateSchema(createPostSchema), PostController.create);

router.patch("/:uuid", verifyToken(), validateSchema(patchPostSchema), PostController.patch);

module.exports = router;
