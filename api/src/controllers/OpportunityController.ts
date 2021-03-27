import { Request, Response } from "express";
import type { TypeOf } from "yup";

import Opportunity from "../entity/Opportunity";
import { createOpportunitySchema } from "../schemas/opportunitySchema";

const OpportunityController = {
  find: async (req: Request, res: Response) => {
    try {
      const opportunities = await Opportunity.find();
      return res.json(opportunities);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { imageUrl, name, description, contactEmail }: TypeOf<typeof createOpportunitySchema> = req.body;

      const opportunity = Opportunity.create({ imageUrl, name, description, contactEmail });

      await opportunity.save();
      return res.json(opportunity);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  },
};

export default OpportunityController;
