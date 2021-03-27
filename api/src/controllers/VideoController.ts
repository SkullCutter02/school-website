import { Request, Response } from "express";
import type { TypeOf } from "yup";

import Video from "../entity/Video";
import { createVideoSchema, patchVideoSchema } from "../schemas/videoSchema";

const VideoController = {
  find: async (req: Request, res: Response) => {
    try {
      const videos = await Video.find();
      return res.json(videos);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { link }: TypeOf<typeof createVideoSchema> = req.body;

      const video = Video.create({ link });

      await video.save();
      return res.json(video);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  },

  patch: async (req: Request, res: Response) => {
    try {
      const { uuid } = req.params;
      const { link }: TypeOf<typeof patchVideoSchema> = req.body;

      const video = await Video.findOneOrFail({ uuid });

      video.link = link || video.link;

      await video.save();
      return res.json(video);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { uuid } = req.params;

      const video = await Video.findOneOrFail({ uuid });

      await video.remove();
      return res.json({ msg: "Video is successfully deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  },
};

export default VideoController;
