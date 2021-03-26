import { Router } from "express";

import validateSchema from "../middleware/validateSchema";
import { createPostSchema } from "../schemas/postSchema";
import PostController from "../controllers/PostController";

const router = Router();

router.post("/", validateSchema(createPostSchema), PostController.createPost);

module.exports = router;
