import { Router } from "express";

import validateSchema from "../middleware/validateSchema";
import { createPostSchema } from "../schemas/postSchema";
import PostController from "../controllers/PostController";

const router = Router();

router.get("/", PostController.find);

router.get("/:uuid", PostController.findOne);

router.post("/", validateSchema(createPostSchema), PostController.create);

module.exports = router;
