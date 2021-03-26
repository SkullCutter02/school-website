import { Request, Response } from "express";
import type { TypeOf } from "yup";
import { ILike } from "typeorm";

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
      const { page, limit, filter } = req.query;

      const postCount = await Post.count({ title: filter !== "" ? ILike(`%${filter}%`) : ILike("%") });

      const posts = (
        await Post.find({
          take: +limit,
          skip: (+page - 1) * +limit,
        })
      ).filter((post) => post.title.toLowerCase().includes(filter.toString().toLowerCase()));

      return res.json({
        posts,
        hasMore: postCount > +page * +limit,
      });
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
