import { Request, Response } from "express";
import type { TypeOf } from "yup";

import { createFeatureSchema } from "../schemas/featureSchema";
import Feature from "../entity/Feature";

const FeatureController = {
  create: async (req: Request, res: Response) => {
    try {
      const { title, body }: TypeOf<typeof createFeatureSchema> = req.body;

      const feature = Feature.create({ title, body });

      await feature.save();
      return res.json(feature);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  },
};

export default FeatureController;
