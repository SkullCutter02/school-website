import { Request, Response } from "express";
import type { TypeOf } from "yup";

import Opportunity from "../entity/Opportunity";
import { createOpportunitySchema, patchOpportunitySchema } from "../schemas/opportunitySchema";

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

  patch: async (req: Request, res: Response) => {
    try {
      const { uuid } = req.params;
      const { imageUrl, name, description, contactEmail }: TypeOf<typeof patchOpportunitySchema> = req.body;

      const opportunity = await Opportunity.findOneOrFail({ uuid });

      opportunity.imageUrl = imageUrl || opportunity.imageUrl;
      opportunity.name = name || opportunity.name;
      opportunity.description = description || opportunity.description;
      opportunity.contactEmail = contactEmail || opportunity.contactEmail;

      await opportunity.save();
      return res.json(opportunity);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { uuid } = req.params;

      const opportunity = await Opportunity.findOneOrFail({ uuid });

      await opportunity.remove();
      return res.json({ msg: "Opportunity deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  },
};

export default OpportunityController;
