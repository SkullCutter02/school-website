import { Request, Response } from "express";
import type { TypeOf } from "yup";

import { createFeatureSchema } from "../schemas/featureSchema";
import Feature from "../entity/Feature";

const FeatureController = {
  create: async (req: Request, res: Response) => {
    try {
      const { title, body }: TypeOf<typeof createFeatureSchema> = req.body;

      const featureCount = await Feature.count();

      if (featureCount < 4) {
        const feature = Feature.create({ title, body });

        await feature.save();
        return res.json(feature);
      } else {
        return res.status(400).json({ msg: "Maximum number of features is 4" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  },
};

export default FeatureController;
