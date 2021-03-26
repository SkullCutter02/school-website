import { Request, Response } from "express";
import type { TypeOf } from "yup";

import { createPostSchema } from "../schemas/postSchema";
import Post from "../entity/Post";

const PostController = {
  createPost: async (req: Request, res: Response) => {
    try {
      const { user, title, body }: TypeOf<typeof createPostSchema> = req.body;

      const post = Post.create({ user, title, body });

      await post.save();
      return res.json(post);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  },
};

export default PostController;
