import { Request, Response } from "express";
import type { TypeOf } from "yup";

import { createPostSchema } from "../schemas/postSchema";
import Post from "../entity/Post";

const PostController = {
  findOne: async (req: Request, res: Response) => {
    try {
      const { uuid } = req.params;

      const post = await Post.findOneOrFail({ uuid });
      return res.json(post);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  },

  find: async (req: Request, res: Response) => {
    try {
      const posts = await Post.find();
      return res.json(posts);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  },

  create: async (req: Request, res: Response) => {
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
